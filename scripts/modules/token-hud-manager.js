// scripts/modules/token-hud-manager.js
/**
 * Token HUD Manager for Dragonbane Status Effects Module
 * Handles Token HUD styling, organization, and enhancement
 */

import { MODULE_ID, SELECTORS, UI_CONFIG } from "../constants.js";
import { addDragonbaneConditionsToHUD } from "./dragonbane-integration.js";
import { categorizeEffect } from "./effects-manager.js";

/**
 * Initialize Token HUD styling if enabled
 */
export function initializeTokenHudStyling() {
  // Only apply styling if the setting is enabled
  if (!game.settings.get(MODULE_ID, "enableTokenHudStyling")) {
    return;
  }

  const css = `
    /* V13 Compatible - Target .palette.status-effects instead of .col.right .status-effects */
    #token-hud .palette.status-effects {
        display: grid !important;
        grid-template-columns: repeat(${UI_CONFIG.COLUMNS}, minmax(${UI_CONFIG.ICON_SIZE}px, 1fr)) !important;
        gap: ${UI_CONFIG.GAP}px !important;
        padding: ${UI_CONFIG.PADDING} !important;
        background: rgba(0, 0, 0, 0.45) !important;
        border-radius: 6px !important;
        width: 100% !important;
        max-width: none !important;
        min-width: ${UI_CONFIG.MIN_WIDTH}px !important;
        box-sizing: border-box !important;
        justify-items: center !important;
        align-items: center !important;
        margin-right: 2px !important;
    }

    /* V13 Compatible - Status effect icons */
    #token-hud .palette.status-effects .effect-control,
    #token-hud .palette.status-effects img.effect-control {
        width: ${UI_CONFIG.ICON_SIZE}px !important;
        height: ${UI_CONFIG.ICON_SIZE}px !important;
        min-width: ${UI_CONFIG.ICON_SIZE}px !important;
        min-height: ${UI_CONFIG.ICON_SIZE}px !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        border-radius: 4px !important;
        background: rgba(0, 0, 0, 0.7) !important;
        transition: transform 0.2s ease !important;
        cursor: pointer !important;
        display: block !important;
        position: relative !important;
        flex-shrink: 0 !important;
        object-fit: contain !important;
        filter: brightness(1.5) contrast(1.1) !important;
    }

    #token-hud .palette.status-effects .effect-control:hover,
    #token-hud .palette.status-effects img.effect-control:hover {
        transform: scale(1.1) !important;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.6) !important;
        z-index: 100 !important;
    }

    #token-hud .palette.status-effects .effect-control.active,
    #token-hud .palette.status-effects img.effect-control.active {
        border-color: #e93031 !important;
        box-shadow: 0 0 8px rgba(233, 48, 49, 0.8) !important;
        background: rgba(233, 48, 49, 0.35) !important;
    }

    /* V13 Compatible - Section headers */
    #token-hud .palette.status-effects .status-section-header {
        grid-column: 1 / -1 !important;
        background: linear-gradient(135deg, #2c5530, #4a7c59) !important;
        color: #ffffff !important;
        font-family: "Signika", Arial, sans-serif !important;
        font-size: 11px !important;
        font-weight: bold !important;
        text-transform: uppercase !important;
        letter-spacing: 1px !important;
        text-align: center !important;
        padding: 6px 12px !important;
        margin: 4px 0 2px 0 !important;
        border-radius: 4px !important;
        border: 1px solid #1a331d !important;
        box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 2px 4px rgba(0, 0, 0, 0.5) !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8) !important;
        line-height: 1.2 !important;
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
    }

    /* Section header category styling */
    #token-hud .palette.status-effects .status-section-header.attribute {
        background: linear-gradient(135deg, #52c2c, #7c4a4a) !important;
        border-color: #331d1d !important;
    }

    #token-hud .palette.status-effects .status-section-header.general {
        background: linear-gradient(135deg, #00604d, #007d66) !important;
        border-color: #004538 !important;
    }

    #token-hud .palette.status-effects .status-section-header.spell {
        background: linear-gradient(135deg, #4a2c55, #7c4a7c) !important;
        border-color: #331d33 !important;
    }

    #token-hud .palette.status-effects .status-section-header.ability {
        background: linear-gradient(135deg, #554a2c, #8c7a4a) !important;
        border-color: #33291a !important;
    }

    /* Category Styling - V13 Compatible */
    #token-hud .palette.status-effects .effect-control[data-category="attribute"],
    #token-hud .palette.status-effects img.effect-control[data-category="attribute"] {
        border-color: rgba(74, 124, 89, 0.5) !important;
    }

    #token-hud .palette.status-effects .effect-control[data-category="general"],
    #token-hud .palette.status-effects img.effect-control[data-category="general"] {
        border-color: rgba(74, 124, 89, 0.5) !important;
    }

    #token-hud .palette.status-effects .effect-control[data-category="spell"],
    #token-hud .palette.status-effects img.effect-control[data-category="spell"] {
        border-color: rgba(124, 74, 124, 0.5) !important;
    }

    #token-hud .palette.status-effects .effect-control[data-category="ability"],
    #token-hud .palette.status-effects img.effect-control[data-category="ability"] {
        border-color: rgba(140, 122, 74, 0.5) !important;
    }

    /* Clear All Button Styling */
    #token-hud .palette.status-effects .clear-all-effects-btn {
        grid-column: 1 / -1 !important;
        background: linear-gradient(135deg, #8b0000, #a52a2a) !important;
        color: #ffffff !important;
        font-family: "Signika", Arial, sans-serif !important;
        font-size: 10px !important;
        font-weight: bold !important;
        text-transform: uppercase !important;
        letter-spacing: 0.5px !important;
        text-align: center !important;
        padding: 6px 12px !important;
        margin: 6px 0 2px 0 !important;
        border-radius: 4px !important;
        border: 1px solid #660000 !important;
        box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 2px 4px rgba(0, 0, 0, 0.5) !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8) !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 6px !important;
    }

    #token-hud .palette.status-effects .clear-all-effects-btn:hover {
        background: linear-gradient(135deg, #a52a2a, #c94040) !important;
        transform: translateY(-1px) !important;
        box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 3px 6px rgba(0, 0, 0, 0.6) !important;
    }

    #token-hud .palette.status-effects .clear-all-effects-btn:active {
        transform: translateY(0px) !important;
        box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.4),
            0 1px 2px rgba(0, 0, 0, 0.5) !important;
    }

    #token-hud .palette.status-effects .clear-all-effects-btn i {
        font-size: 12px !important;
    }
`;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Apply defensive filtering to remove empty status IDs that break V13 Token HUD
 * This runs ALWAYS, regardless of enhanced styling setting
 */
function applyDefensiveFiltering(html) {
  const $html = html.jquery ? html : $(html);
  const statusEffectsContainer = $html.find(SELECTORS.STATUS_EFFECTS);

  if (statusEffectsContainer.length === 0) return;

  const effectElements = statusEffectsContainer.find(SELECTORS.EFFECT_CONTROL);
  if (effectElements.length === 0) return;

  // Remove effects with empty status IDs to prevent Actor#toggleStatusEffect errors
  effectElements.each((index, element) => {
    const $element = $(element);
    const statusId =
      $element.data("status-id") || $element.attr("data-status-id");

    // Remove effects with empty status ID - these cause "Invalid status ID" errors in V13
    if (!statusId || statusId === "") {
      $element.remove();
      return;
    }
  });
}

/**
 * Template function to build Token HUD sections with effects and headers
 */
function buildTokenHudSections(container, sections) {
  sections.forEach((section) => {
    // Skip if section has no effects
    if (section.effects.length === 0) return;

    // Skip if section requires setting that's disabled
    if (
      section.requiresSetting &&
      !game.settings.get(MODULE_ID, section.requiresSetting)
    ) {
      return;
    }

    // Add section header
    const title = game.i18n.localize(section.titleKey);
    container.append(
      $(`<div class="status-section-header ${section.key}">${title}</div>`)
    );

    // Add all effects for this section
    section.effects.forEach(($effect) => container.append($effect));
  });
}

/**
 * Clear all status effects from the selected token
 */
async function clearAllStatusEffects(token) {
  if (!token || !token.actor) return;

  // Get the token/character name for the dialog
  const tokenName = token.name || token.actor.name || "Unknown";

  // Confirm with user
  const confirm = await Dialog.confirm({
    title: game.i18n.localize("DRAGONBANE_STATUS.clearAll.title"),
    content: `<p>${game.i18n.format("DRAGONBANE_STATUS.clearAll.content", {
      name: tokenName,
    })}</p>`,
    defaultYes: false,
  });

  if (!confirm) return;

  // Get all active status effects
  const activeEffects = Array.from(token.actor.statuses || []);

  // Remove each status effect
  for (const statusId of activeEffects) {
    try {
      await token.actor.toggleStatusEffect(statusId, { active: false });
    } catch (error) {
      console.warn(
        `${MODULE_ID} | Failed to remove status effect ${statusId}:`,
        error
      );
    }
  }
}

/**
 * Add "Clear All" button to the Token HUD
 */
function addClearAllButton(container) {
  const clearAllBtn = $(`
    <div class="clear-all-effects-btn" data-action="clear-all">
      <i class="fas fa-times-circle"></i>
      <span>${game.i18n.localize("DRAGONBANE_STATUS.clearAll.button")}</span>
    </div>
  `);

  // Add click handler
  clearAllBtn.on("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const token = canvas.tokens.controlled[0];
    if (token) {
      await clearAllStatusEffects(token);
    }
  });

  container.append(clearAllBtn);
}

/**
 * Add section headers and organize status effects in the Token HUD - V13 Compatible
 * Note: Defensive filtering is now handled separately, this focuses on enhancement
 */
function enhanceTokenHUD(html) {
  const $html = html.jquery ? html : $(html);
  const statusEffectsContainer = $html.find(SELECTORS.STATUS_EFFECTS);

  if (statusEffectsContainer.length === 0) return;

  const effectElements = statusEffectsContainer.find(SELECTORS.EFFECT_CONTROL);
  if (effectElements.length === 0) return;

  // Note: Defensive filtering already applied, proceed with categorization
  const token = canvas.tokens.controlled[0];
  const actor = token?.actor;
  const isCharacter = actor?.type === "character";

  const groupedEffects = {
    attribute: [],
    general: [],
    spell: [],
    ability: [],
  };

  effectElements.each((index, element) => {
    const $element = $(element);
    const statusId =
      $element.data("status-id") || $element.attr("data-status-id");

    // Filter out YZE Combat action effects
    if (statusId && statusId.match(/^action\d+$/)) {
      return;
    }

    // Handle Dragonbane conditions
    if (
      statusId &&
      (statusId.startsWith("dragonbane.condition") ||
        $element.hasClass("dragonbane-condition"))
    ) {
      $element.attr("data-category", "attribute");
      groupedEffects.attribute.push($element.detach());
      return;
    }

    // Determine category
    const category = categorizeEffect(statusId);

    if (category !== "unknown") {
      $element.attr("data-category", category);
    }

    const finalCategory = category !== "unknown" ? category : "general";
    groupedEffects[finalCategory].push($element.detach());
  });

  // Continue with section building...
  statusEffectsContainer.empty();

  const sections = [];

  if (isCharacter) {
    sections.push({
      key: "attribute",
      effects: groupedEffects.attribute,
      titleKey: "DRAGONBANE_STATUS.sections.attributeConditions",
    });
  }

  sections.push(
    {
      key: "general",
      effects: groupedEffects.general,
      titleKey: "DRAGONBANE_STATUS.sections.generalEffects",
    },
    {
      key: "spell",
      effects: groupedEffects.spell,
      titleKey: "DRAGONBANE_STATUS.sections.spellEffects",
      requiresSetting: "showSpellEffects",
    },
    {
      key: "ability",
      effects: groupedEffects.ability,
      titleKey: "DRAGONBANE_STATUS.sections.heroicAbilities",
      requiresSetting: "showHeroicAbilities",
    }
  );

  buildTokenHudSections(statusEffectsContainer, sections);

  // Add the Clear All button at the bottom
  addClearAllButton(statusEffectsContainer);
}

/**
 * Setup Token HUD enhancement hooks
 */
export function setupTokenHudEnhancement() {
  /**
   * V13 Compatibility: Always apply defensive filtering, conditionally apply enhancements
   */
  Hooks.on("renderTokenHUD", (hud, html, data) => {
    // ALWAYS apply defensive filtering to prevent V13 empty status ID errors
    applyDefensiveFiltering(html);

    // Only apply enhanced styling and organization if setting is enabled
    if (
      game.system.id === "dragonbane" &&
      game.settings.get(MODULE_ID, "enableTokenHudStyling")
    ) {
      // Add Dragonbane conditions using the proper actor methods
      addDragonbaneConditionsToHUD(html, data);

      // Then enhance the HUD layout
      enhanceTokenHUD(html);
    }
  });
}
