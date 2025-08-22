/**
 * Dragonbane Status Effects Module
 * Replaces default Foundry status effects with Dragonbane-themed effects
 * @author Matthias Weeks
 * @version 1.0.0
 */

const MODULE_ID = "dragonbane-status-effects";

/**
 * Custom Dragonbane-themed status effects to replace default Foundry ones
 */
const CUSTOM_STATUS_EFFECTS = [
    {
        id: "test-effect",
        name: "Test Effect",
        description: "This is a test effect to see if things work",
        icon: "icons/svg/anchor.svg"
    }
];

/**
 * Register module settings
 */
function registerSettings() {
    game.settings.register(MODULE_ID, "replaceAll", {
        name: "DRAGONBANE_STATUS.settings.replaceAll.name",
        hint: "DRAGONBANE_STATUS.settings.replaceAll.hint",
        scope: "world", 
        config: true,
        type: Boolean,
        default: true,
        onChange: () => {
            ui.notifications.info("DRAGONBANE_STATUS.settings.reloadRequired");
        }
    });
}

/**
 * Setup custom status effects
 */
function setupStatusEffects() {
    // Preserve any existing Dragonbane condition effects
    const existingDragonbaneEffects = CONFIG.statusEffects.filter(effect => 
        effect.id && effect.id.startsWith('dragonbane.condition.')
    );
    
    // Preserve any existing YZE Combat action effects
    const existingYzeEffects = CONFIG.statusEffects.filter(effect =>
        effect.statuses && effect.statuses.some(status => status.match(/^action\d+$/))
    );
    
    if (game.settings.get(MODULE_ID, "replaceAll")) {
        // Replace defaults but preserve Dragonbane and YZE effects
        CONFIG.statusEffects = [
            ...CUSTOM_STATUS_EFFECTS,
            ...existingDragonbaneEffects,
            ...existingYzeEffects
        ];
        console.log(`${MODULE_ID} | Replaced default Foundry status effects, preserved ${existingDragonbaneEffects.length} Dragonbane conditions and ${existingYzeEffects.length} YZE actions`);
    } else {
        CONFIG.statusEffects.push(...CUSTOM_STATUS_EFFECTS);
        console.log(`${MODULE_ID} | Added custom Dragonbane status effects to existing effects`);
    }
    
    console.log(`${MODULE_ID} | Total status effects loaded: ${CONFIG.statusEffects.length}`);
}

/**
 * Validate system compatibility
 */
function validateSystem() {
    if (game.system.id !== "dragonbane") {
        ui.notifications.error(`${MODULE_ID} | This module requires the Dragonbane system. Current system: ${game.system.id}`);
        return false;
    }
    return true;
}

/**
 * Initialize module
 */
Hooks.once('init', () => {
    console.log(`${MODULE_ID} | Initializing Dragonbane Status Effects v1.0.0`);
    
    if (!validateSystem()) {
        return;
    }
    
    registerSettings();
});

/**
 * Setup status effects when Foundry is ready
 * This runs after init, allowing other modules to add their effects first
 */
Hooks.once('ready', () => {
    if (!validateSystem()) {
        return;
    }
    
    console.log(`${MODULE_ID} | Setting up custom status effects`);
    console.log(`${MODULE_ID} | Default Foundry effects will be replaced, Dragonbane and YZE Combat will add their own`);
    
    setupStatusEffects();
    
    // Log what other modules are doing
    if (game.modules.get("yze-combat")?.active) {
        console.log(`${MODULE_ID} | Year Zero Engine Combat is active - it will add its own action effects`);
    }
    
    console.log(`${MODULE_ID} | Dragonbane system will add its own condition effects`);
});