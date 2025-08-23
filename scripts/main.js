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
 * Validate system compatibility - early exit if not Dragonbane
 */
function validateSystem() {
    if (game.system.id !== "dragonbane") {
        console.error(`${MODULE_ID} | This module is designed exclusively for the Dragonbane system. Current system: ${game.system.id}`);
        ui.notifications.error(game.i18n.localize("DRAGONBANE_STATUS.errors.systemRequired"));
        return false;
    }
    return true;
}

/* ------------------------------------------ */
/*  Module Initialization                     */
/* ------------------------------------------ */

Hooks.once('init', () => {
    // Early system validation - exit immediately if not Dragonbane
    if (!validateSystem()) {
        return; // Stop all initialization
    }
    
    // Continue with normal initialization only for Dragonbane
    registerSettings();
});

Hooks.once('ready', () => {
    // Double-check system compatibility (in case something changed)
    if (!validateSystem()) {
        return; // Stop all initialization
    }
    
    // Main initialization - only runs on Dragonbane system
    initializeStatusEffects();
    initializeTokenHudStyling();
    
    // Setup UI enhancements
    enhanceSettingsUI();
    setupTokenHudEnhancement();
    setupActorUpdateMonitoring();
    
    console.log(`${MODULE_ID} | Module loaded successfully on Dragonbane system`);
});

console.log(`${MODULE_ID} | Module loaded`);