/**
 * Main Entry Point for Dragonbane Status Effects Module
 * Coordinates all module functionality and initialization
 */

import { MODULE_ID } from './constants.js';
import { registerSettings, enhanceSettingsUI } from './modules/settings-manager.js';
import { initializeStatusEffects } from './modules/effects-manager.js';
import { initializeTokenHudStyling, setupTokenHudEnhancement } from './modules/token-hud-manager.js';
import { setupActorUpdateMonitoring } from './modules/dragonbane-integration.js';

/**
 * Validate system compatibility
 */
function validateSystem() {
    if (game.system.id !== "dragonbane") {
        console.error(`${MODULE_ID} | This module requires the Dragonbane system. Current system: ${game.system.id}`);
        ui.notifications.error(game.i18n.localize("DRAGONBANE_STATUS.errors.systemRequired"));
    }
}

/**
 * Show system compatibility warning if not using Dragonbane
 */
function showSystemCompatibilityWarning() {
    if (game.system.id !== "dragonbane") {
        ui.notifications.warn(game.i18n.localize("DRAGONBANE_STATUS.warnings.systemCompatibility"));
    }
}

/* ------------------------------------------ */
/*  Module Initialization                     */
/* ------------------------------------------ */

Hooks.once('init', () => {
    // Early initialization - validate system and register settings
    validateSystem();
    registerSettings();
});

Hooks.once('ready', () => {
    // Main initialization after all modules are loaded
    initializeStatusEffects();
    initializeTokenHudStyling();
    showSystemCompatibilityWarning();
    
    // Setup UI enhancements
    enhanceSettingsUI();
    setupTokenHudEnhancement();
    setupActorUpdateMonitoring();
});

console.log(`${MODULE_ID} | Module loaded successfully`);