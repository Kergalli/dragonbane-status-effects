/**
 * Effects Manager for Dragonbane Status Effects Module
 * Handles status effects initialization, categorization, and custom effects
 */

import { MODULE_ID, CUSTOM_STATUS_EFFECTS } from '../constants.js';

/**
 * Parse and validate user-defined custom effects from settings
 * @param {boolean} showErrors - Whether to show error notifications (default: true)
 * @returns {Array} Array of valid user-defined effects
 */
export function parseUserCustomEffects(showErrors = true) {
    const userCustomEffectsJson = game.settings.get(MODULE_ID, "customStatusEffects");
    if (!userCustomEffectsJson || !userCustomEffectsJson.trim()) {
        return [];
    }
    
    try {
        const userCustomEffects = JSON.parse(userCustomEffectsJson);
        
        if (!Array.isArray(userCustomEffects)) {
            if (showErrors) {
                console.error(`${MODULE_ID} | Custom status effects must be an array`);
                ui.notifications.error(game.i18n.localize("DRAGONBANE_STATUS.errors.invalidFormat"));
            }
            return [];
        }
        
        // Validate each effect has required properties
        return userCustomEffects.filter(effect => {
            const isValid = effect.id && effect.name && effect.img;
            if (!isValid && showErrors) {
                console.warn(`${MODULE_ID} | Invalid custom effect (missing required properties):`, effect);
            }
            return isValid;
        }).map(effect => ({
            ...effect,
            category: effect.category || 'general' // Default category if not specified
        }));
        
    } catch (error) {
        if (showErrors) {
            console.error(`${MODULE_ID} | Error parsing custom status effects JSON:`, error);
            ui.notifications.error(game.i18n.localize("DRAGONBANE_STATUS.errors.invalidJSON") + ` - ${error.message}`);
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
    const builtInEffects = [...CUSTOM_STATUS_EFFECTS];
    const userEffects = parseUserCustomEffects(showErrors);
    const allEffects = [...builtInEffects, ...userEffects];
    
    if (!applySettingsFilter) {
        return allEffects;
    }
    
    // Filter based on settings
    return allEffects.filter(effect => {
        if (effect.category === "spell" && !game.settings.get(MODULE_ID, "showSpellEffects")) {
            return false;
        }
        if (effect.category === "ability" && !game.settings.get(MODULE_ID, "showHeroicAbilities")) {
            return false;
        }
        return true;
    });
}

/**
 * Get the category for a specific effect ID
 * @param {string} effectId - The effect ID to categorize
 * @param {Array} allEffects - Optional array of all effects (will be fetched if not provided)
 * @returns {string} The effect category ('general', 'spell', 'ability', or 'unknown')
 */
export function categorizeEffect(effectId, allEffects = null) {
    if (!allEffects) {
        allEffects = getAllEffects(false, false); // Get all effects, no filtering, no error notifications
    }
    
    const effect = allEffects.find(effect => effect.id === effectId);
    return effect ? (effect.category || 'general') : 'unknown';
}

/**
 * Sort effects alphabetically by localized label within categories
 * @param {Array} effects - Array of localized effect objects
 * @returns {Array} Array of effects sorted by category, with general/spell/ability sorted alphabetically
 */
function sortEffectsByCategory(effects) {
    // Group effects by category
    const categorizedEffects = {
        general: [],
        spell: [],
        ability: [],
        other: [] // For any effects without a category flag
    };
    
    effects.forEach(effect => {
        const category = effect.flags?.[MODULE_ID]?.category || 'other';
        if (categorizedEffects[category]) {
            categorizedEffects[category].push(effect);
        } else {
            categorizedEffects.other.push(effect);
        }
    });
    
    // Sort general, spell, and ability categories alphabetically by localized label
    ['general', 'spell', 'ability'].forEach(category => {
        categorizedEffects[category].sort((a, b) => 
            a.label.localeCompare(b.label, game.i18n.lang || 'en', { 
                sensitivity: 'base',
                numeric: true,
                caseFirst: 'lower'
            })
        );
    });
    
    // Return in order: general → spell → ability → other (other unsorted to preserve original order)
    return [
        ...categorizedEffects.general,
        ...categorizedEffects.spell,
        ...categorizedEffects.ability,
        ...categorizedEffects.other
    ];
}

/**
 * Initialize status effects - main entry point
 */
export function initializeStatusEffects() {
    // Get all effects with settings filtering applied
    const allCustomEffects = getAllEffects(true, true);
    
    // Create localized effect objects
    const customEffects = allCustomEffects.map(effect => {
        const effectObj = {
            id: effect.id,
            label: effect.name.startsWith("EFFECT.") ? game.i18n.localize(effect.name) : effect.name,
            icon: effect.img,
            changes: [],
            flags: {
                [MODULE_ID]: {
                    category: effect.category
                }
            }
        };
        
        // Make Dead an overlay effect
        if (effect.id === "dead") {
            effectObj.flags.core = { overlay: true };
        }
        
        return effectObj;
    });
    
    // Sort effects alphabetically by localized names within categories
    const sortedEffects = sortEffectsByCategory(customEffects);
    
    // Preserve existing effects from other modules
    const existingEffects = CONFIG.statusEffects.filter(effect =>
        effect.id && (effect.id.startsWith('dragonbane.condition') || effect.id.match(/^action\d+$/))
    );
    
    if (game.settings.get(MODULE_ID, "replaceAll")) {
        // Replace defaults but preserve other module effects
        CONFIG.statusEffects = [...sortedEffects, ...existingEffects];
    } else {
        CONFIG.statusEffects.push(...sortedEffects);
    }
}