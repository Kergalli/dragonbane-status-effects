/**
 * Settings Manager for Dragonbane Status Effects Module
 * Handles all settings registration and change notifications
 */

import { MODULE_ID } from '../constants.js';
import { StatusEffectDescriptionEditor } from './description-editor.js';

// Debounced notification to prevent spam when changing multiple settings
let reloadNotificationTimeout;
function showReloadNotification() {
    clearTimeout(reloadNotificationTimeout);
    reloadNotificationTimeout = setTimeout(() => {
        ui.notifications.info(game.i18n.localize("DRAGONBANE_STATUS.settings.reloadRequired"));
    }, 500); // Show notification 500ms after last setting change
}

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
            localized: true
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
            requiresReload: setting.key !== "effectDescriptions", // Descriptions don't need reload
            onChange: setting.key !== "effectDescriptions" ? showReloadNotification : undefined
        };

        // Add localized name/hint if specified
        if (setting.localized) {
            config.name = `DRAGONBANE_STATUS.settings.${setting.key}.name`;
            config.hint = `DRAGONBANE_STATUS.settings.${setting.key}.hint`;
        }

        game.settings.register(MODULE_ID, setting.key, config);
    });

    // Register the description editor button
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
 * Enhance settings UI - make JSON input a proper textarea
 */
export function enhanceSettingsUI() {
    // Hook to customize the settings form rendering
    Hooks.on('renderSettingsConfig', (app, html, data) => {
        // Find our custom JSON setting input and make it a proper textarea
        const jsonInput = html.find(`input[name="${MODULE_ID}.customStatusEffects"]`);
        if (jsonInput.length > 0) {
            // Replace the input with a textarea
            const currentValue = jsonInput.val();
            const textarea = $(`<textarea 
                name="${MODULE_ID}.customStatusEffects" 
                rows="8" 
                style="font-family: 'Courier New', monospace; font-size: 12px; width: 100%; resize: vertical;"
                placeholder='${game.i18n.localize("DRAGONBANE_STATUS.settings.customStatusEffects.placeholder")}'
            >${currentValue}</textarea>`);
            
            jsonInput.replaceWith(textarea);
        }
    });
}