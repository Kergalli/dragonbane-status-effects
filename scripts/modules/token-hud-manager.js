/**
 * Token HUD Manager for Dragonbane Status Effects Module
 * Handles Token HUD styling, organization, and enhancement
 */

import { MODULE_ID, SELECTORS, UI_CONFIG } from '../constants.js';
import { categorizeEffect } from './effects-manager.js';
import { addDragonbaneConditionsToHUD } from './dragonbane-integration.js';

/**
 * Initialize Token HUD styling if enabled
 */
export function initializeTokenHudStyling() {
    // Only apply styling if the setting is enabled
    if (!game.settings.get(MODULE_ID, "enableTokenHudStyling")) {
        return;
    }
    
    const css = `
        /* ONLY target the status effects container - don't touch anything else */
        #token-hud .col.right .status-effects {
            display: grid !important;
            grid-template-columns: repeat(${UI_CONFIG.COLUMNS}, minmax(${UI_CONFIG.ICON_SIZE}px, 1fr)) !important;
            gap: ${UI_CONFIG.GAP}px !important;
            padding: ${UI_CONFIG.PADDING} !important; /* More padding on right side */
            background: rgba(0, 0, 0, 0.45) !important; /* Dark background matching default Foundry styling */
            border-radius: 6px !important;
            width: 100% !important;
            max-width: none !important;
            min-width: ${UI_CONFIG.MIN_WIDTH}px !important; /* Increased to accommodate columns + padding */
            box-sizing: border-box !important;
            justify-items: center !important;
            align-items: center !important;
            margin-right: 2px !important; /* Small adjustment to balance container */
        }

        /* Only status effect icons */
        #token-hud .col.right .status-effects .effect-control {
            width: ${UI_CONFIG.ICON_SIZE}px !important;
            height: ${UI_CONFIG.ICON_SIZE}px !important;
            min-width: ${UI_CONFIG.ICON_SIZE}px !important;
            min-height: ${UI_CONFIG.ICON_SIZE}px !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            border-radius: 4px !important;
            background: rgba(0, 0, 0, 0.7) !important; /* Much darker background for better contrast */
            transition: transform 0.2s ease !important;
            cursor: pointer !important;
            display: block !important;
            position: relative !important;
            flex-shrink: 0 !important;
            object-fit: contain !important;
            filter: brightness(1.5) contrast(1.1) !important; /* Even brighter, more white icons */
        }

        #token-hud .col.right .status-effects .effect-control:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.6) !important;
            z-index: 100 !important;
        }

        #token-hud .col.right .status-effects .effect-control.active {
            border-color: #e93031 !important;
            box-shadow: 0 0 8px rgba(233, 48, 49, 0.8) !important;
            background: rgba(233, 48, 49, 0.35) !important;
        }

        /* Only section headers within status effects */
        #token-hud .col.right .status-effects .status-section-header {
            grid-column: 1 / -1 !important;
            background: linear-gradient(135deg, #2c5530, #4a7c59) !important;
            color: #ffffff !important;
            font-family: "Signika", Arial, sans-serif !important;
            font-size: 11px !important;
            font-weight: bold !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            text-align: center !important;
            padding: 6px 12px !important;
            margin: 4px 0 2px 0 !important;
            border-radius: 4px !important;
            border: 1px solid #1a331d !important;
            box-shadow: 
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                0 2px 4px rgba(0, 0, 0, 0.5) !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8) !important;
            line-height: 1.2 !important;
            display: block !important;
            width: 100% !important;
            box-sizing: border-box !important;
        }

        /* Section header category styling */
        #token-hud .col.right .status-effects .status-section-header.attribute {
            background: linear-gradient(135deg, #552c2c, #7c4a4a) !important;
            border-color: #331d1d !important;
        }

        #token-hud .col.right .status-effects .status-section-header.general {
            background: linear-gradient(135deg, #00604d, #007d66) !important;
            border-color: #004538 !important;
        }

        #token-hud .col.right .status-effects .status-section-header.spell {
            background: linear-gradient(135deg, #4a2c55, #7c4a7c) !important;
            border-color: #331d33 !important;
        }

        #token-hud .col.right .status-effects .status-section-header.ability {
            background: linear-gradient(135deg, #554a2c, #8c7a4a) !important;
            border-color: #33291a !important;
        }

        /* Category Styling - Only within status effects */
        #token-hud .col.right .status-effects .effect-control[data-category="attribute"] {
            border-color: rgba(74, 124, 89, 0.5) !important;
        }

        #token-hud .col.right .status-effects .effect-control[data-category="general"] {
            border-color: rgba(74, 124, 89, 0.5) !important;
        }

        #token-hud .col.right .status-effects .effect-control[data-category="spell"] {
            border-color: rgba(124, 74, 124, 0.5) !important;
        }

        #token-hud .col.right .status-effects .effect-control[data-category="ability"] {
            border-color: rgba(140, 122, 74, 0.5) !important;
        }


    `;
    
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

/**
 * Template function to build Token HUD sections with effects and headers
 */
function buildTokenHudSections(container, sections) {
    sections.forEach(section => {
        // Skip if section has no effects
        if (section.effects.length === 0) return;
        
        // Skip if section requires setting that's disabled
        if (section.requiresSetting && !game.settings.get(MODULE_ID, section.requiresSetting)) {
            return;
        }
        
        // Add section header
        const title = game.i18n.localize(section.titleKey);
        container.append($(`<div class="status-section-header ${section.key}">${title}</div>`));
        
        // Add all effects for this section
        section.effects.forEach($effect => container.append($effect));
    });
}

/**
 * Add section headers and organize status effects in the Token HUD
 */
function enhanceTokenHUD(html) {
    const statusEffectsContainer = html.find(SELECTORS.STATUS_EFFECTS);
    if (statusEffectsContainer.length === 0) return;
    
    const effectElements = statusEffectsContainer.find(SELECTORS.EFFECT_CONTROL);
    if (effectElements.length === 0) return;
    
    // Get the token and actor to check actor type
    const token = canvas.tokens.controlled[0];
    const actor = token?.actor;
    const isCharacter = actor?.type === "character";
    
    // Group effects by category
    const groupedEffects = {
        attribute: [], // Dragonbane system conditions
        general: [],
        spell: [],
        ability: []
    };
    
    // Categorize each effect
    effectElements.each((index, element) => {
        const $element = $(element);
        const statusId = $element.data('status-id') || $element.data('overlay') || $element.data('effect');
        
        // Filter out YZE Combat action effects - don't show them in token HUD
        if (statusId && statusId.match(/^action\d+$/)) {
            return; // Skip YZE action effects
        }
        
        // Handle Dragonbane conditions (both CONFIG-based and our custom ones)
        if (statusId && (statusId.startsWith('dragonbane.condition') || $element.hasClass('dragonbane-condition'))) {
            $element.attr('data-category', 'attribute');
            groupedEffects.attribute.push($element.detach());
            return;
        }
        
        // Determine category based on effect ID using helper function
        const category = categorizeEffect(statusId);
        
        // Add data attribute for CSS styling if it's one of our effects
        if (category !== 'unknown') {
            $element.attr('data-category', category);
        }
        
        // Use the determined category, defaulting to 'general' for unknown effects
        const finalCategory = category !== 'unknown' ? category : 'general';
        groupedEffects[finalCategory].push($element.detach());
    });
    
    // Clear the container and rebuild with sections
    statusEffectsContainer.empty();
    
    // Section configuration for organized display
    const sections = [];
    
    // Only add attribute section for character actors
    if (isCharacter) {
        sections.push({
            key: 'attribute',
            effects: groupedEffects.attribute,
            titleKey: 'DRAGONBANE_STATUS.sections.attributeConditions'
        });
    }
    
    // Add other sections for all actor types
    sections.push(
        {
            key: 'general', 
            effects: groupedEffects.general,
            titleKey: 'DRAGONBANE_STATUS.sections.generalEffects'
        },
        {
            key: 'spell',
            effects: groupedEffects.spell,
            titleKey: 'DRAGONBANE_STATUS.sections.spellEffects',
            requiresSetting: 'showSpellEffects'
        },
        {
            key: 'ability',
            effects: groupedEffects.ability, 
            titleKey: 'DRAGONBANE_STATUS.sections.heroicAbilities',
            requiresSetting: 'showHeroicAbilities'
        }
    );
    
    // Build sections with proper dividers
    buildTokenHudSections(statusEffectsContainer, sections);
}

/**
 * Setup Token HUD enhancement hooks
 */
export function setupTokenHudEnhancement() {
    /**
     * Enhanced Token HUD with section headers and organization
     * Now includes direct Dragonbane condition integration
     */
    Hooks.on('renderTokenHUD', (hud, html, data) => {
        // Only enhance if we're using the Dragonbane system and styling is enabled
        if (game.system.id !== "dragonbane" || !game.settings.get(MODULE_ID, "enableTokenHudStyling")) {
            return;
        }
        
        // Add Dragonbane conditions using the proper actor methods
        addDragonbaneConditionsToHUD(html, data);
        
        // Then enhance the HUD layout
        enhanceTokenHUD(html);
    });
}