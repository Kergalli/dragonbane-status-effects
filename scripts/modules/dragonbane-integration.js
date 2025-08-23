/**
 * Dragonbane Integration for Status Effects Module
 * Handles Dragonbane-specific condition functionality
 */

import { MODULE_ID, DRAGONBANE_ATTRIBUTES, DRAGONBANE_CONDITION_ICONS, SELECTORS, UI_CONFIG } from '../constants.js';

/**
 * Get the proper Dragonbane icon for a condition
 */
export function getConditionIcon(attribute) {
    const attrLower = attribute.toLowerCase();
    return DRAGONBANE_CONDITION_ICONS[attrLower] || "icons/svg/affliction.svg";
}

/**
 * Template function to create condition buttons
 */
function createConditionButton(attribute, name, icon, isActive, toggleCallback) {
    const fallbackIcon = "icons/svg/affliction.svg";
    
    const button = $(`
        <div class="effect-control dragonbane-condition" 
             data-status-id="dragonbane.condition.${attribute}" 
             data-category="attribute" 
             data-attribute="${attribute}"
             title="${name}">
            <img src="${icon}" 
                 width="40" height="40" 
                 alt="${name}"
                 onerror="this.onerror=null; this.src='${fallbackIcon}';">
        </div>
    `);
    
    if (isActive) button.addClass('active');
    
    // Add click handler
    button.click((event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const currentState = button.hasClass('active');
        toggleCallback(currentState);
        button.toggleClass('active', !currentState);
    });
    
    return button;
}

/**
 * Create custom Dragonbane condition buttons using the actor's condition methods
 * This bypasses the CONFIG.statusEffects system and works directly with Dragonbane
 */
export function addDragonbaneConditionsToHUD(html, data) {
    const statusEffectsContainer = html.find(SELECTORS.STATUS_EFFECTS);
    if (statusEffectsContainer.length === 0) return;
    
    // Check if we already added conditions (prevent duplicates)
    if (statusEffectsContainer.find(SELECTORS.DRAGONBANE_CONDITION).length > 0) {
        return;
    }
    
    // Get the token's actor
    const token = canvas.tokens.controlled[0];
    if (!token || !token.actor) return;
    
    const actor = token.actor;
    
    // Check if the actor has the hasCondition method (confirms it's a Dragonbane actor)
    if (typeof actor.hasCondition !== 'function') {
        return;
    }
    
    // Map attributes to condition names for better icons and labels
    const attributeMapping = {
        "STR": { condition: "exhausted", icon: DRAGONBANE_CONDITION_ICONS["str"] },
        "CON": { condition: "sickly", icon: DRAGONBANE_CONDITION_ICONS["con"] },
        "AGL": { condition: "dazed", icon: DRAGONBANE_CONDITION_ICONS["agl"] },
        "INT": { condition: "angry", icon: DRAGONBANE_CONDITION_ICONS["int"] },
        "WIL": { condition: "scared", icon: DRAGONBANE_CONDITION_ICONS["wil"] },
        "CHA": { condition: "disheartened", icon: DRAGONBANE_CONDITION_ICONS["cha"] }
    };
    
    // Create and add condition buttons
    DRAGONBANE_ATTRIBUTES.forEach(attr => {
        const attrLower = attr.toLowerCase();
        const isActive = actor.hasCondition(attrLower);
        const conditionName = game.i18n.localize(`DoD.conditions.${attrLower}`);
        const mapping = attributeMapping[attr];
        
        // Create condition button using template
        const conditionButton = createConditionButton(
            attrLower, 
            conditionName, 
            mapping.icon, 
            isActive,
            (currentState) => actor.updateCondition(attrLower, !currentState)
        );
        
        statusEffectsContainer.append(conditionButton);
    });
}

/**
 * Update condition button states when actor changes
 */
export function updateDragonbaneConditionStates(html) {
    const token = canvas.tokens.controlled[0];
    if (!token || !token.actor || typeof token.actor.hasCondition !== 'function') return;
    
    const actor = token.actor;
    
    // Update each condition button efficiently
    DRAGONBANE_ATTRIBUTES.forEach(attr => {
        const attrLower = attr.toLowerCase();
        const conditionButton = html.find(`${SELECTORS.DRAGONBANE_CONDITION}[data-attribute="${attrLower}"]`);
        
        if (conditionButton.length > 0) {
            const isActive = actor.hasCondition(attrLower);
            conditionButton.toggleClass('active', isActive);
        }
    });
}

/**
 * Setup actor update monitoring for condition states
 */
export function setupActorUpdateMonitoring() {
    let updateConditionTimeout;
    
    Hooks.on('updateActor', (actor, data, options, userId) => {
        // Only process if this is a condition update and we have a selected token
        if (!data.system?.conditions) return;
        
        const token = canvas.tokens.controlled[0];
        if (!token || token.actor.id !== actor.id) return;
        
        // Debounce the update to prevent rapid flickering
        clearTimeout(updateConditionTimeout);
        updateConditionTimeout = setTimeout(() => {
            // Find the token HUD and update condition states
            const tokenHUD = document.querySelector(SELECTORS.TOKEN_HUD);
            if (tokenHUD) {
                updateDragonbaneConditionStates($(tokenHUD));
            }
        }, UI_CONFIG.UPDATE_DELAY); // Use constant for debounce delay
    });
}