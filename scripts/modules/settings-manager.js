/**
 * Settings Manager for Dragonbane Status Effects Module
 * Handles all settings registration and change notifications
 */

import { MODULE_ID } from '../constants.js';
import { StatusEffectDescriptionEditor } from './description-editor.js';
import { CustomStatusEffectsEditor } from './custom-effects-editor.js';

/**
 * Register all module settings
 */
export function registerSettings() {
    // Settings configuration - much cleaner than individual registrations
    const settings = [
        {
            key: "replaceAll",
            type: Boolean,
            default: true,
            localized: true
        },
        {
            key: "showSpellEffects", 
            type: Boolean,
            default: false,
            localized: true
        },
        {
            key: "showHeroicAbilities",
            type: Boolean, 
            default: false,
            localized: true
        },
        {
            key: "enableTokenHudStyling",
            type: Boolean,
            default: true,
            localized: true
        },
        {
            key: "customStatusEffects",
            type: String,
            default: "",
            localized: false,
            scope: "world",
            config: false // Hidden setting for storing JSON - now managed by editor
        },
        {
            key: "effectDescriptions",
            type: Object,
            default: {},
            localized: false,
            scope: "world",
            config: false // Hidden setting for storing descriptions
        }
    ];

    // Register all settings with shared configuration
    settings.forEach(setting => {
        const config = {
            scope: setting.scope || "world",
            config: setting.config !== undefined ? setting.config : true,
            type: setting.type,
            default: setting.default,
            requiresReload: setting.key !== "effectDescriptions" // Descriptions don't need reload
        };

        // Add localized name/hint if specified
        if (setting.localized) {
            config.name = `DRAGONBANE_STATUS.settings.${setting.key}.name`;
            config.hint = `DRAGONBANE_STATUS.settings.${setting.key}.hint`;
        }

        game.settings.register(MODULE_ID, setting.key, config);
    });

    // Register the custom effects editor menu
    game.settings.registerMenu(MODULE_ID, "customEffectsEditor", {
        name: "DRAGONBANE_STATUS.settings.customEffectsEditor.name",
        hint: "DRAGONBANE_STATUS.settings.customEffectsEditor.hint", 
        label: "DRAGONBANE_STATUS.settings.customEffectsEditor.label",
        icon: "fas fa-magic",
        type: CustomStatusEffectsEditor,
        restricted: true
    });

    // Register the description editor menu
    game.settings.registerMenu(MODULE_ID, "descriptionEditor", {
        name: "DRAGONBANE_STATUS.settings.descriptionEditor.name",
        hint: "DRAGONBANE_STATUS.settings.descriptionEditor.hint", 
        label: "DRAGONBANE_STATUS.settings.descriptionEditor.label",
        icon: "fas fa-edit",
        type: StatusEffectDescriptionEditor,
        restricted: true
    });
}

/**
 * Enhance settings UI - no longer needed since we use editor menus
 */
export function enhanceSettingsUI() {
    // No UI enhancements needed - both custom effects and descriptions use editor menus
}