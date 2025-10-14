/**
 * Main Entry Point for Dragonbane Status Effects Module
 * Coordinates all module functionality and initialization
 */

import { MODULE_ID } from "./constants.js";
import { setupActorUpdateMonitoring } from "./modules/dragonbane-integration.js";
import { initializeStatusEffects } from "./modules/effects-manager.js";
import {
  enhanceSettingsUI,
  registerSettings,
} from "./modules/settings-manager.js";
import {
  initializeTokenHudStyling,
  setupTokenHudEnhancement,
} from "./modules/token-hud-manager.js";

/**
 * Validate system compatibility
 */
function validateSystem() {
  if (game.system.id !== "dragonbane") {
    console.error(
      `${MODULE_ID} | This module requires the Dragonbane system. Current system: ${game.system.id}`
    );
    ui.notifications.error(
      game.i18n.localize("DRAGONBANE_STATUS.errors.systemRequired")
    );
  }
}

/**
 * Show system compatibility warning if not using Dragonbane
 */
function showSystemCompatibilityWarning() {
  if (game.system.id !== "dragonbane") {
    ui.notifications.warn(
      game.i18n.localize("DRAGONBANE_STATUS.warnings.systemCompatibility")
    );
  }
}

/* ------------------------------------------ */
/*  Module Initialization                     */
/* ------------------------------------------ */

Hooks.once("init", () => {
  // Early initialization - validate system and register settings
  console.log(`${MODULE_ID} | Initializing for Foundry ${game.version}...`);
  validateSystem();
  registerSettings();
});

Hooks.once("ready", () => {
  // Main initialization after all modules are loaded
  console.log(`${MODULE_ID} | Ready hook - setting up main functionality...`);

  initializeStatusEffects();
  initializeTokenHudStyling();
  showSystemCompatibilityWarning();

  // Setup UI enhancements
  enhanceSettingsUI();
  setupTokenHudEnhancement();
  setupActorUpdateMonitoring();

  console.log(`${MODULE_ID} | Module initialization complete`);
});

/**
 * Hook to inject changes from status effect definitions into created active effects
 */
Hooks.on("preCreateActiveEffect", (effect, data, options, userId) => {
  // Only run on the client that's creating the effect
  if (game.user.id !== userId) return;

  // Check if this effect is from a status effect (has a status ID)
  const statusId = effect.statuses?.first() || data.statuses?.[0];

  if (statusId) {
    // Find the matching status effect definition in CONFIG
    const statusEffect = CONFIG.statusEffects.find((e) => e.id === statusId);

    // If the status effect has changes defined, copy them to the effect being created
    if (statusEffect?.changes && statusEffect.changes.length > 0) {
      effect.updateSource({ changes: statusEffect.changes });
      console.log(
        `${MODULE_ID} | Injected ${statusEffect.changes.length} changes into ${statusEffect.name}`
      );
    }

    // Also copy duration if it exists and isn't already set
    if (statusEffect?.duration && !data.duration) {
      effect.updateSource({ duration: statusEffect.duration });
    }
  }
});
