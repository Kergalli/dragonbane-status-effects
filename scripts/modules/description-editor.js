/**
 * Status Effect Description Editor for Dragonbane Status Effects Module
 * Allows users to define custom descriptions for status effects
 */

import { MODULE_ID } from '../constants.js';
import { getAllEffectsWithDescriptions, saveUserDescription } from './effects-manager.js';

export class StatusEffectDescriptionEditor extends FormApplication {
    
    constructor(options = {}) {
        super({}, options);
        this.effectsData = null;
    }

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "dragonbane-status-description-editor",
            title: game.i18n.localize("DRAGONBANE_STATUS.editor.title"),
            template: "modules/dragonbane-status-effects/templates/description-editor.html",
            width: 700,
            height: 600,
            resizable: true,
            closeOnSubmit: false,
            submitOnChange: false,
            classes: ["dragonbane-status-effects", "description-editor"]
        });
    }

    /** @override */
    async getData(options = {}) {
        this.effectsData = getAllEffectsWithDescriptions();
        
        return {
            effects: this.effectsData,
            hasGeneral: this.effectsData.general.length > 0,
            hasSpell: this.effectsData.spell.length > 0,
            hasAbility: this.effectsData.ability.length > 0,
            categories: {
                general: game.i18n.localize("DRAGONBANE_STATUS.sections.generalEffects"),
                spell: game.i18n.localize("DRAGONBANE_STATUS.sections.spellEffects"),
                ability: game.i18n.localize("DRAGONBANE_STATUS.sections.heroicAbilities")
            }
        };
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        
        // Save button
        html.find('[data-action="save"]').click(this._onSave.bind(this));
        
        // Reset button  
        html.find('[data-action="reset"]').click(this._onReset.bind(this));
        
        // Clear all button
        html.find('[data-action="clear-all"]').click(this._onClearAll.bind(this));
        
        // Auto-resize textareas
        html.find('textarea').on('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        
        // Drag and drop support
        html.find('textarea').on('dragover', this._onDragOver.bind(this));
        html.find('textarea').on('drop', this._onDrop.bind(this));
        html.find('textarea').on('dragenter', this._onDragEnter.bind(this));
        html.find('textarea').on('dragleave', this._onDragLeave.bind(this));
    }

    /**
     * Handle drag over events
     */
    _onDragOver(event) {
        event.preventDefault();
        const originalEvent = event.originalEvent || event;
        if (originalEvent.dataTransfer) {
            originalEvent.dataTransfer.dropEffect = "copy";
        }
    }

    /**
     * Handle drag enter events - add visual feedback
     */
    _onDragEnter(event) {
        event.preventDefault();
        $(event.target).addClass('drag-over');
    }

    /**
     * Handle drag leave events - remove visual feedback
     */
    _onDragLeave(event) {
        event.preventDefault();
        $(event.target).removeClass('drag-over');
    }

    /**
     * Handle drop events - convert dropped items to UUID links
     */
    async _onDrop(event) {
        event.preventDefault();
        $(event.target).removeClass('drag-over');
        
        try {
            // Get the original DOM event (not jQuery wrapped)
            const originalEvent = event.originalEvent || event;
            
            // Get the dropped data using the original event
            const data = TextEditor.getDragEventData(originalEvent);
            if (!data || !data.uuid) {
                console.warn("Dragonbane Status Effects | No UUID found in dropped data");
                return;
            }
            
            // Get the document from UUID
            const doc = await fromUuid(data.uuid);
            if (!doc) {
                console.warn("Dragonbane Status Effects | Could not resolve UUID:", data.uuid);
                return;
            }
            
            // Create the UUID link with the document name
            const link = `@UUID[${data.uuid}]{${doc.name}}`;
            
            // Insert at cursor position
            const textarea = event.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const currentText = textarea.value;
            
            // Insert the link
            textarea.value = currentText.substring(0, start) + link + currentText.substring(end);
            
            // Update cursor position to after the inserted link
            const newPosition = start + link.length;
            textarea.setSelectionRange(newPosition, newPosition);
            
            // Trigger input event to update auto-resize
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            
            // Focus back on textarea
            textarea.focus();
            
            ui.notifications.info(`Added link to ${doc.name}`);
            
        } catch (error) {
            console.error("Dragonbane Status Effects | Error handling drop:", error);
            ui.notifications.error("Failed to create link from dropped item");
        }
    }

    /** @override */
    async _updateObject(event, formData) {
        // This handles the form submission
        return this._saveDescriptions(formData);
    }

    /**
     * Handle save button click
     */
    async _onSave(event) {
        event.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        await this._saveDescriptions(data);
        
        ui.notifications.info(game.i18n.localize("DRAGONBANE_STATUS.editor.saved"));
        ui.notifications.warn(game.i18n.localize("DRAGONBANE_STATUS.editor.reapplyEffects"));
    }

    /**
     * Save descriptions from form data
     */
    async _saveDescriptions(data) {
        const promises = [];
        
        // Process all effects
        ['general', 'spell', 'ability'].forEach(category => {
            if (this.effectsData[category]) {
                this.effectsData[category].forEach(effect => {
                    const description = data[`description-${effect.id}`] || "";
                    promises.push(saveUserDescription(effect.id, description));
                });
            }
        });
        
        await Promise.all(promises);
        
        // Refresh CONFIG.statusEffects with new descriptions
        await this._refreshStatusEffects();
        
        // Refresh the form to show saved state
        this.render(false);
        
        return true;
    }

    /**
     * Refresh CONFIG.statusEffects with updated descriptions
     */
    async _refreshStatusEffects() {
        try {
            // Re-run the status effects initialization to update CONFIG.statusEffects
            const { initializeStatusEffects } = await import('./effects-manager.js');
            initializeStatusEffects();
            
            console.log("Dragonbane Status Effects | CONFIG.statusEffects refreshed with updated descriptions");
        } catch (error) {
            console.error("Dragonbane Status Effects | Error refreshing status effects:", error);
        }
    }

    /**
     * Handle reset button - reload from saved settings
     */
    async _onReset(event) {
        event.preventDefault();
        
        const confirm = await Dialog.confirm({
            title: game.i18n.localize("DRAGONBANE_STATUS.editor.resetTitle"),
            content: game.i18n.localize("DRAGONBANE_STATUS.editor.resetContent")
        });
        
        if (confirm) {
            this.render(true); // Re-render to reload from settings
            ui.notifications.info(game.i18n.localize("DRAGONBANE_STATUS.editor.resetComplete"));
        }
    }

    /**
     * Handle clear all button - clear all descriptions
     */
    async _onClearAll(event) {
        event.preventDefault();
        
        const confirm = await Dialog.confirm({
            title: game.i18n.localize("DRAGONBANE_STATUS.editor.clearAllTitle"),
            content: game.i18n.localize("DRAGONBANE_STATUS.editor.clearAllContent")
        });
        
        if (confirm) {
            // Clear all descriptions
            const promises = [];
            ['general', 'spell', 'ability'].forEach(category => {
                if (this.effectsData[category]) {
                    this.effectsData[category].forEach(effect => {
                        promises.push(saveUserDescription(effect.id, ""));
                    });
                }
            });
            
            await Promise.all(promises);
            this.render(true); // Re-render to show cleared state
            ui.notifications.info(game.i18n.localize("DRAGONBANE_STATUS.editor.cleared"));
        }
    }
}