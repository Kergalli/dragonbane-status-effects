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

/**
 * V13 Compatibility Fix - Filter malformed effects from Token HUD render data
 * This fixes the blank effect issue caused by the Dragonbane system adding malformed effects
 */
function setupV13CompatibilityFix() {
    console.log(`${MODULE_ID} | Setting up Foundry v13 compatibility fixes...`);
    
    // Fix 1: Filter malformed effects from render data before Token HUD processes them
    Hooks.on('renderTokenHUD', (app, html, data) => {
        if (!data.statusEffects) return;
        
        const originalCount = Object.keys(data.statusEffects).length;
        const malformedEffects = [];
        
        // Check each effect for required properties
        Object.keys(data.statusEffects).forEach(key => {
            const effect = data.statusEffects[key];
            
            // Only filter out effects that are truly malformed
            // The main issue is effects missing ID and src properties
            const hasValidId = effect.id !== undefined && effect.id !== '';
            const hasValidSrc = effect.src !== undefined && effect.src !== '' && effect.src !== 'game';
            
            // Note: Don't filter on label - Token HUD render data doesn't always have labels
            // but that's okay, the effects will still render properly with just id and src
            
            if (!hasValidId || !hasValidSrc) {
                malformedEffects.push({ key, effect });
                delete data.statusEffects[key];
            }
        });
        
        const newCount = Object.keys(data.statusEffects).length;
        if (newCount !== originalCount) {
            console.log(`${MODULE_ID} | V13 Fix: Filtered ${originalCount - newCount} malformed effects from Token HUD render data`);
            
            // Log details of what was filtered (for debugging)
            malformedEffects.forEach(({ key, effect }) => {
                console.log(`${MODULE_ID} | V13 Fix: Removed malformed effect '${key}':`, {
                    hasId: effect.id !== undefined && effect.id !== '',
                    hasSrc: effect.src !== undefined && effect.src !== '' && effect.src !== 'game',
                    effect: effect
                });
            });
        }
    });
    
    // Fix 2: Clean up any remaining malformed DOM elements after rendering
    Hooks.on('renderTokenHUD', (app, html, data) => {
        // Use setTimeout to run after all other Token HUD processing
        setTimeout(() => {
            try {
                // Find the status effects container (handle both jQuery and native DOM)
                const statusContainer = html[0]?.querySelector('.status-effects') || 
                                      html.querySelector?.('.status-effects') ||
                                      document.querySelector('#token-hud .status-effects');
                
                if (!statusContainer) {
                    console.log(`${MODULE_ID} | V13 Fix: No status effects container found for cleanup`);
                    return;
                }
                
                // Remove any effect controls that don't have proper attributes
                const effectControls = statusContainer.querySelectorAll('.effect-control');
                let removedCount = 0;
                
                effectControls.forEach(control => {
                    const statusId = control.dataset.statusId || 
                                   control.dataset.overlay || 
                                   control.dataset.effect;
                    
                    // Check for valid image source
                    const imgSrc = control.src || control.querySelector?.('img')?.src;
                    
                    // Determine if this control should be removed
                    const hasBlankId = !statusId || statusId.trim() === '';
                    const hasBrokenImage = !imgSrc || 
                                         imgSrc.includes('/game') || 
                                         imgSrc.endsWith('/game') ||
                                         imgSrc === 'game';
                    
                    if (hasBlankId || hasBrokenImage) {
                        console.log(`${MODULE_ID} | V13 Fix: Removing malformed DOM element:`, {
                            statusId: statusId || 'BLANK',
                            imgSrc: imgSrc || 'NONE',
                            element: control.tagName
                        });
                        control.remove();
                        removedCount++;
                    }
                });
                
                if (removedCount > 0) {
                    console.log(`${MODULE_ID} | V13 Fix: Removed ${removedCount} malformed effect controls from DOM`);
                }
                
            } catch (error) {
                console.error(`${MODULE_ID} | Error in V13 compatibility DOM cleanup:`, error);
            }
        }, 100); // 100ms delay to ensure all other processing is complete
    });
    
    console.log(`${MODULE_ID} | V13 compatibility fixes installed successfully`);
}

/* ------------------------------------------ */
/*  Module Initialization                     */
/* ------------------------------------------ */

Hooks.once('init', () => {
    // Early initialization - validate system and register settings
    console.log(`${MODULE_ID} | Initializing for Foundry ${game.version}...`);
    validateSystem();
    registerSettings();
});

Hooks.once('ready', () => {
    // Main initialization after all modules are loaded
    console.log(`${MODULE_ID} | Ready hook - setting up main functionality...`);
    
    initializeStatusEffects();
    initializeTokenHudStyling();
    showSystemCompatibilityWarning();
    
    // Setup UI enhancements
    enhanceSettingsUI();
    setupTokenHudEnhancement();
    setupActorUpdateMonitoring();
    
    // Setup V13 compatibility fixes
    // Only needed for Foundry v13+ and Dragonbane system
    if (game.version?.startsWith('13') && game.system.id === "dragonbane") {
        setupV13CompatibilityFix();
    }
    
    console.log(`${MODULE_ID} | Module initialization complete`);
});