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
        
        // Handle file input change (still needed for import)
        html.find('#import-file-input').change(this._onFileSelected.bind(this));
        
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

    /** @override */
    _getHeaderButtons() {
        let buttons = super._getHeaderButtons();

        buttons.unshift(
            {
                label: "Import",
                class: "import",
                icon: "fas fa-file-import",
                onclick: async (ev) => {
                    this._onImport(ev);
                }
            },
            {
                label: "Export", 
                class: "export",
                icon: "fas fa-file-export",
                onclick: async (ev) => {
                    this._onExport(ev);
                }
            }
        );

        return buttons;
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
        
        // Convert FormData to object using foundry utility
        foundry.utils.mergeObject(data, Object.fromEntries(formData.entries()));
        
        await this._saveDescriptions(data);
        
        ui.notifications.info(game.i18n.localize("DRAGONBANE_STATUS.editor.saved"));
        ui.notifications.warn(game.i18n.localize("DRAGONBANE_STATUS.editor.reapplyEffects"));
    }

    /**
     * Save descriptions from form data
     */
    async _saveDescriptions(data) {
        const promises = [];
        
        // Process all effects using foundry.utils for safe property access
        ['general', 'spell', 'ability'].forEach(category => {
            const categoryEffects = foundry.utils.getProperty(this.effectsData, category);
            if (categoryEffects && categoryEffects.length > 0) {
                categoryEffects.forEach(effect => {
                    const description = foundry.utils.getProperty(data, `description-${effect.id}`) || "";
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
     * Handle clear all button - clear all descriptions and save immediately
     */
    async _onClearAll(event) {
        event.preventDefault();
        
        const confirm = await Dialog.confirm({
            title: game.i18n.localize("DRAGONBANE_STATUS.editor.clearAllTitle"),
            content: game.i18n.localize("DRAGONBANE_STATUS.editor.clearAllContent")
        });
        
        if (confirm) {
            try {
                // Clear all descriptions and save immediately
                const promises = [];
                ['general', 'spell', 'ability'].forEach(category => {
                    const categoryEffects = foundry.utils.getProperty(this.effectsData, category);
                    if (categoryEffects && categoryEffects.length > 0) {
                        categoryEffects.forEach(effect => {
                            promises.push(saveUserDescription(effect.id, ""));
                        });
                    }
                });
                
                // Wait for all saves to complete
                await Promise.all(promises);
                
                // Refresh CONFIG.statusEffects with cleared descriptions
                await this._refreshStatusEffects();
                
                // Re-render form to show cleared state
                this.render(true);
                
                // Clear success feedback
                ui.notifications.info(game.i18n.localize("DRAGONBANE_STATUS.editor.cleared"));
                
            } catch (error) {
                console.error("Dragonbane Status Effects | Error clearing descriptions:", error);
                ui.notifications.error("Failed to clear descriptions. Please try again.");
            }
        }
    }

    /**
     * Handle export button - create and download JSON file with all descriptions
     */
    async _onExport(event) {
        event.preventDefault();
        
        try {
            // Get current descriptions data (includes all effects, even empty ones)
            const effectsData = getAllEffectsWithDescriptions();
            
            // Flatten all descriptions into a single object using foundry.utils
            const descriptions = {};
            ['general', 'spell', 'ability'].forEach(category => {
                const categoryEffects = foundry.utils.getProperty(effectsData, category);
                if (categoryEffects && categoryEffects.length > 0) {
                    categoryEffects.forEach(effect => {
                        foundry.utils.setProperty(descriptions, effect.id, effect.description || "");
                    });
                }
            });
            
            // Create export object with metadata using foundry.utils
            const baseExportData = {
                module: MODULE_ID,
                version: foundry.utils.getProperty(game.modules.get(MODULE_ID), "version"),
                exportDate: new Date().toISOString(),
                foundryVersion: game.version
            };
            
            const exportData = foundry.utils.mergeObject(baseExportData, { descriptions });
            
            const dataStr = JSON.stringify(exportData, null, 2);
            const filename = `dragonbane-status-descriptions-${new Date().toISOString().split('T')[0]}.json`;
            
            // Use Foundry's native file save function
            if (typeof saveDataToFile === 'function') {
                saveDataToFile(dataStr, "text/json", filename);
                ui.notifications.info("Status effect descriptions exported successfully!");
            } else {
                this._fallbackExport(dataStr, filename);
            }
            
        } catch (error) {
            console.error("Dragonbane Status Effects | Error exporting descriptions:", error);
            ui.notifications.error("Failed to export descriptions. Please try again.");
        }
    }

    /**
     * Fallback export using copy-to-clipboard dialog
     */
    _fallbackExport(dataStr, filename) {
        const dialog = new Dialog({
            title: "Export Status Effect Descriptions",
            content: `<div style="margin-bottom: 1rem;">
                        <p>Copy the JSON below and save it as <code>${filename}</code>:</p>
                      </div>
                      <textarea readonly onclick="this.select()" style="width: 100%; height: 350px; font-family: 'Courier New', monospace; font-size: 11px; padding: 8px; border: 1px solid #ccc;">${dataStr}</textarea>`,
            buttons: {
                copy: {
                    icon: '<i class="fas fa-copy"></i>',
                    label: "Copy to Clipboard",
                    callback: () => {
                        navigator.clipboard.writeText(dataStr).then(() => {
                            ui.notifications.info("JSON copied to clipboard!");
                        }).catch(() => {
                            ui.notifications.warn("Could not copy to clipboard - please select and copy manually.");
                        });
                    }
                },
                close: {
                    icon: '<i class="fas fa-times"></i>',
                    label: "Close"
                }
            },
            default: "copy"
        }, {
            width: 650,
            height: 500
        });
        
        dialog.render(true);
    }

    /**
     * Handle import button - trigger file selection
     */
    _onImport(event) {
        event.preventDefault();
        
        // Trigger the hidden file input
        const fileInput = this.element.find('#import-file-input')[0];
        if (fileInput) {
            fileInput.click();
        }
    }

    /**
     * Handle file selection for import
     */
    async _onFileSelected(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        try {
            let jsonText;
            
            // Try Foundry's native file reader, fallback to standard method
            if (typeof readTextFromFile === 'function') {
                jsonText = await readTextFromFile(file);
            } else {
                jsonText = await file.text();
            }
            
            const importData = JSON.parse(jsonText);
            
            // Basic validation using foundry.utils
            const descriptions = foundry.utils.getProperty(importData, "descriptions");
            if (!descriptions || typeof descriptions !== 'object') {
                throw new Error("Invalid file format: missing or invalid descriptions object");
            }
            
            // Show confirmation dialog with details
            const effectCount = Object.keys(descriptions).length;
            const nonEmptyCount = Object.values(descriptions).filter(desc => desc && desc.trim()).length;
            
            const confirm = await Dialog.confirm({
                title: "Import Status Effect Descriptions",
                content: `<p>This will <strong>replace all current descriptions</strong> with the imported ones.</p>
                         <p><strong>Import Details:</strong></p>
                         <ul>
                           <li>Total effects: ${effectCount}</li>
                           <li>With descriptions: ${nonEmptyCount}</li>
                           <li>Empty templates: ${effectCount - nonEmptyCount}</li>
                           ${foundry.utils.getProperty(importData, "module") ? `<li>Source: ${importData.module} v${foundry.utils.getProperty(importData, "version") || 'unknown'}</li>` : ''}
                         </ul>
                         <p>Are you sure you want to continue?</p>`
            });
            
            if (confirm) {
                await this._performImport(descriptions);
                
                // Clear the file input
                event.target.value = '';
            }
            
        } catch (error) {
            console.error("Dragonbane Status Effects | Error importing descriptions:", error);
            ui.notifications.error(`Failed to import descriptions: ${error.message}`);
            
            // Clear the file input
            event.target.value = '';
        }
    }

    /**
     * Perform the actual import of descriptions
     */
    async _performImport(descriptions) {
        try {
            // First clear all existing descriptions using foundry.utils
            const clearPromises = [];
            ['general', 'spell', 'ability'].forEach(category => {
                const categoryEffects = foundry.utils.getProperty(this.effectsData, category);
                if (categoryEffects && categoryEffects.length > 0) {
                    categoryEffects.forEach(effect => {
                        clearPromises.push(saveUserDescription(effect.id, ""));
                    });
                }
            });
            
            await Promise.all(clearPromises);
            
            // Then import all new descriptions (including empty ones)
            const importPromises = [];
            for (const [effectId, description] of Object.entries(descriptions)) {
                importPromises.push(saveUserDescription(effectId, description || ""));
            }
            
            await Promise.all(importPromises);
            
            // Refresh CONFIG.statusEffects and form
            await this._refreshStatusEffects();
            this.render(true);
            
            const effectCount = Object.keys(descriptions).length;
            const nonEmptyCount = Object.values(descriptions).filter(desc => desc && desc.trim()).length;
            
            ui.notifications.info(`Successfully imported ${effectCount} effects (${nonEmptyCount} with descriptions)!`);
            
        } catch (error) {
            console.error("Dragonbane Status Effects | Error during import:", error);
            ui.notifications.error("Failed to import descriptions. Please try again.");
        }
    }
}