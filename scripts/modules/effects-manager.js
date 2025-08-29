/**
 * Effects Manager for Dragonbane Status Effects Module
 * Handles status effects initialization, categorization, and custom effects
 */

import { CUSTOM_STATUS_EFFECTS, MODULE_ID } from "../constants.js";

/**
 * Parse and validate user-defined custom effects from settings
 * @param {boolean} showErrors - Whether to show error notifications (default: true)
 * @returns {Array} Array of valid user-defined effects
 */
export function parseUserCustomEffects(showErrors = true) {
  const userCustomEffectsJson = game.settings.get(
    MODULE_ID,
    "customStatusEffects"
  );
  if (!userCustomEffectsJson || !userCustomEffectsJson.trim()) {
    return [];
  }

  try {
    const userCustomEffects = JSON.parse(userCustomEffectsJson);

    if (!Array.isArray(userCustomEffects)) {
      if (showErrors) {
        console.error(`${MODULE_ID} | Custom status effects must be an array`);
        ui.notifications.error(
          game.i18n.localize(
            "DRAGONBANE_STATUS.validation.errors.invalidFormat"
          )
        );
      }
      return [];
    }

    // Validate each effect has required properties
    return userCustomEffects
      .filter((effect) => {
        const isValid = effect.id && effect.name && effect.img;
        if (!isValid && showErrors) {
          console.warn(
            `${MODULE_ID} | Invalid custom effect (missing required properties):`,
            effect
          );
        }
        return isValid;
      })
      .map((effect) => ({
        ...effect,
        category: effect.category || "general", // Default category if not specified
      }));
  } catch (error) {
    if (showErrors) {
      console.error(
        `${MODULE_ID} | Error parsing custom status effects JSON:`,
        error
      );
      ui.notifications.error(
        game.i18n.localize("DRAGONBANE_STATUS.validation.errors.invalidJSON") +
          ` - ${error.message}`
      );
    }
    return [];
  }
}

/**
 * Get all effects (built-in + user-defined) with optional filtering
 * @param {boolean} applySettingsFilter - Whether to filter based on spell/ability settings
 * @param {boolean} showErrors - Whether to show error notifications for user effects
 * @returns {Array} Combined array of all effects
 */
export function getAllEffects(applySettingsFilter = false, showErrors = true) {
  // Get override settings to apply category changes
  const builtinOverrides =
    game.settings.get(MODULE_ID, "builtinEffectOverrides") || {};

  const builtInEffects = [...CUSTOM_STATUS_EFFECTS].map((effect) => {
    // Apply overrides to built-in effects before filtering
    if (builtinOverrides[effect.id]) {
      return {
        ...effect,
        ...builtinOverrides[effect.id],
        id: effect.id, // Ensure ID never changes
      };
    }
    return effect;
  });

  const userEffects = parseUserCustomEffects(showErrors);
  const allEffects = [...builtInEffects, ...userEffects];

  if (!applySettingsFilter) {
    return allEffects;
  }

  // Filter based on settings (now using potentially overridden categories)
  return allEffects.filter((effect) => {
    if (
      effect.category === "spell" &&
      !game.settings.get(MODULE_ID, "showSpellEffects")
    ) {
      return false;
    }
    if (
      effect.category === "ability" &&
      !game.settings.get(MODULE_ID, "showHeroicAbilities")
    ) {
      return false;
    }
    return true;
  });
}

/**
 * Get user-defined description for an effect
 * @param {string} effectId - The effect ID
 * @returns {string} User-defined description or empty string
 */
export function getUserDescription(effectId) {
  const descriptions = game.settings.get(MODULE_ID, "effectDescriptions") || {};
  return descriptions[effectId] || "";
}

/**
 * Save user-defined description for an effect
 * @param {string} effectId - The effect ID
 * @param {string} description - The description text
 */
export function saveUserDescription(effectId, description) {
  const descriptions = game.settings.get(MODULE_ID, "effectDescriptions") || {};

  if (description && description.trim()) {
    descriptions[effectId] = description.trim();
  } else {
    delete descriptions[effectId];
  }

  return game.settings.set(MODULE_ID, "effectDescriptions", descriptions);
}

/**
 * Get all effects with their current descriptions for the editor
 * @returns {Object} Effects grouped by category with descriptions
 */
export function getAllEffectsWithDescriptions() {
  const allEffects = getAllEffects(true, false); // Get filtered effects, no error notifications
  const descriptions = game.settings.get(MODULE_ID, "effectDescriptions") || {};

  // Group by category
  const groupedEffects = {
    general: [],
    spell: [],
    ability: [],
  };

  allEffects.forEach((effect) => {
    const effectData = {
      id: effect.id,
      name: effect.name.startsWith("EFFECT.")
        ? game.i18n.localize(effect.name)
        : effect.name,
      img: effect.img,
      category: effect.category,
      description: descriptions[effect.id] || "",
    };

    if (groupedEffects[effect.category]) {
      groupedEffects[effect.category].push(effectData);
    }
  });

  // Sort each category alphabetically
  Object.keys(groupedEffects).forEach((category) => {
    groupedEffects[category].sort((a, b) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return nameA.localeCompare(nameB, game.i18n.lang || "en", {
        sensitivity: "base",
        numeric: true,
        caseFirst: "lower",
      });
    });
  });

  return groupedEffects;
}

/**
 * Categorize an effect by its ID
 * @param {string} effectId - The effect ID to categorize
 * @param {Array|null} allEffects - Optional array of effects to search (for performance)
 * @returns {string} The category of the effect or 'unknown'
 */
export function categorizeEffect(effectId, allEffects = null) {
  if (!allEffects) {
    allEffects = getAllEffects(false, false); // Get all effects, no filtering, no error notifications
  }

  const effect = allEffects.find((effect) => effect.id === effectId);
  return effect ? effect.category || "general" : "unknown";
}

/**
 * Sort effects alphabetically by localized name within categories
 * @param {Array} effects - Array of localized effect objects
 * @returns {Array} Array of effects sorted by category, with general/spell/ability sorted alphabetically
 */
function sortEffectsByCategory(effects) {
  // Group effects by category
  const categorizedEffects = {
    general: [],
    spell: [],
    ability: [],
    other: [], // For any effects without a category flag
  };

  effects.forEach((effect) => {
    const category = effect.flags?.[MODULE_ID]?.category || "other";
    if (categorizedEffects[category]) {
      categorizedEffects[category].push(effect);
    } else {
      categorizedEffects.other.push(effect);
    }
  });

  // Sort general, spell, and ability categories alphabetically by localized name
  ["general", "spell", "ability"].forEach((category) => {
    categorizedEffects[category].sort((a, b) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return nameA.localeCompare(nameB, game.i18n.lang || "en", {
        // ✅ Added safety checks
        sensitivity: "base",
        numeric: true,
        caseFirst: "lower",
      });
    });
  });

  // Return in order: general → spell → ability → other (other unsorted to preserve original order)
  return [
    ...categorizedEffects.general,
    ...categorizedEffects.spell,
    ...categorizedEffects.ability,
    ...categorizedEffects.other,
  ];
}

/**
 * Initialize status effects - main entry point
 */
export function initializeStatusEffects() {
  // Get override settings
  const builtinOverrides =
    game.settings.get(MODULE_ID, "builtinEffectOverrides") || {};
  const hiddenEffects =
    game.settings.get(MODULE_ID, "hiddenBuiltinEffects") || {};

  // Get all effects with settings filtering applied
  const allCustomEffects = getAllEffects(true, true);

  // Create localized effect objects
  const customEffects = allCustomEffects
    .map((effect) => {
      // Check if this is a built-in effect that's hidden
      if (hiddenEffects[effect.id] === true) {
        return null; // Filter out hidden effects
      }

      // Apply overrides if this is a built-in effect
      let finalEffect = effect;
      if (builtinOverrides[effect.id]) {
        finalEffect = {
          ...effect,
          ...builtinOverrides[effect.id],
          id: effect.id, // Ensure ID never changes
        };
      }

      const effectObj = {
        id: finalEffect.id,
        name: finalEffect.name.startsWith("EFFECT.")
          ? game.i18n.localize(finalEffect.name)
          : finalEffect.name, // ✅ Updated from 'label'
        img: finalEffect.img, // ✅ Updated from 'icon'
        description:
          getUserDescription(finalEffect.id) || finalEffect.description || "",
        changes: [],
        flags: {
          [MODULE_ID]: {
            category: finalEffect.category || "general",
          },
        },
      };

      // Add duration if specified (copy from effect or override)
      if (finalEffect.duration && finalEffect.duration.seconds > 0) {
        effectObj.duration = finalEffect.duration;
      }

      // Make Dead an overlay effect
      if (finalEffect.id === "dead") {
        effectObj.flags.core = { overlay: true };
      }

      return effectObj;
    })
    .filter((effect) => effect !== null); // Remove hidden effects

  // Sort effects alphabetically by localized names within categories
  const sortedEffects = sortEffectsByCategory(customEffects);

  // Preserve existing effects from other modules
  const existingEffects = CONFIG.statusEffects.filter(
    (effect) =>
      effect.id &&
      (effect.id.startsWith("dragonbane.condition") ||
        effect.id.match(/^action\d+$/))
  );

  if (game.settings.get(MODULE_ID, "replaceAll")) {
    // Filter out dragonbane conditions since they're handled by dragonbane-integration.js
    const filteredSortedEffects = sortedEffects.filter(
      (effect) => !effect.id?.startsWith("dragonbane.condition")
    );

    CONFIG.statusEffects = [...filteredSortedEffects, ...existingEffects];
  } else {
    // Same filtering for append mode
    const filteredSortedEffects = sortedEffects.filter(
      (effect) => !effect.id?.startsWith("dragonbane.condition")
    );
    CONFIG.statusEffects.push(...filteredSortedEffects);
  }
}
