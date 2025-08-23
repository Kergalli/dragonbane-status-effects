/**
 * Settings Manager for Dragonbane Status Effects Module
 * Handles all settings registration and change notifications
 */

import { MODULE_ID } from '../constants.js';
import { parseUserCustomEffects } from './effects-manager.js';

// Debounced notification to prevent spam when changing multiple settings
let reloadNotificationTimeout;
function showReloadNotification() {
    clearTimeout(reloadNotificationTimeout);
    reloadNotificationTimeout = setTimeout(() => {
        ui.notifications.info(game.i18n.localize("DRAGONBANE_STATUS.settings.reloadRequired"));
    }, 500); // Show notification 500ms after last setting change
}

/**
 * Custom onChange handler for customStatusEffects setting that validates JSON
 */
function onCustomEffectsChange(value) {
    // Validate the JSON and show errors immediately on setting change
    parseUserCustomEffects(true); // Show errors = true for settings changes
    showReloadNotification();
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
            localized: true,
            onChange: showReloadNotification
        },
        {
            key: "showSpellEffects", 
            type: Boolean,
            default: false,
            localized: true,
            onChange: showReloadNotification
        },
        {
            key: "showHeroicAbilities",
            type: Boolean, 
            default: false,
            localized: true,
            onChange: showReloadNotification
        },
        {
            key: "enableTokenHudStyling",
            type: Boolean,
            default: true,
            localized: true,
            onChange: showReloadNotification
        },
        {
            key: "customStatusEffects",
            type: String,
            default: "",
            localized: true,
            onChange: onCustomEffectsChange // Special handler for JSON validation
        }
    ];

    // Register all settings with shared configuration
    settings.forEach(setting => {
        const config = {
            scope: "world",
            config: true,
            type: setting.type,
            default: setting.default,
            requiresReload: true,
            onChange: setting.onChange
        };

        // Add localized name/hint if specified
        if (setting.localized) {
            config.name = `DRAGONBANE_STATUS.settings.${setting.key}.name`;
            config.hint = `DRAGONBANE_STATUS.settings.${setting.key}.hint`;
        }

        game.settings.register(MODULE_ID, setting.key, config);
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