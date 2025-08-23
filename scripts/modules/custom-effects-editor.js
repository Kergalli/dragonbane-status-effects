/**
 * Custom Status Effects Editor for Dragonbane Status Effects Module
 * Visual interface for creating and managing custom status effects
 */

import { MODULE_ID } from '../constants.js';
import { parseUserCustomEffects } from './effects-manager.js';

export class CustomStatusEffectsEditor extends FormApplication {
    
    constructor(options = {}) {
        super({}, options);
        this.customEffects = [];
        this.editingIndex = null; // null means not editing, -1 means adding new, >= 0 means editing existing
    }

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "dragonbane-custom-effects-editor",
            title: game.i18n.localize("DRAGONBANE_STATUS.customEditor.title"),
            template: "modules/dragonbane-status-effects/templates/custom-effects-editor.html",
            width: 800,
            height: 600,
            resizable: true,
            closeOnSubmit: false,
            submitOnChange: false,
            classes: ["dragonbane-status-effects", "custom-effects-editor"]
        });
    }

    /** @override */
    async getData(options = {}) {
        // Load current custom effects
        this.customEffects = parseUserCustomEffects(false) || []; // Don't show errors in editor
        
        return {
            effects: this.customEffects,
            categories: [
                { key: "general", label: game.i18n.localize("DRAGONBANE_STATUS.sections.generalEffects") },
                { key: "spell", label: game.i18n.localize("DRAGONBANE_STATUS.sections.spellEffects") },
                { key: "ability", label: game.i18n.localize("DRAGONBANE_STATUS.sections.heroicAbilities") }
            ],
            editingIndex: this.editingIndex,
            isEditing: this.editingIndex !== null && this.editingIndex !== undefined,
            editingEffect: this.editingIndex >= 0 ? this.customEffects[this.editingIndex] : null
        };
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        
        // Add effect button
        html.find('[data-action="add-effect"]').click(this._onAddEffect.bind(this));
        
        // Edit effect buttons
        html.find('[data-action="edit-effect"]').click(this._onEditEffect.bind(this));
        
        // Delete effect buttons
        html.find('[data-action="delete-effect"]').click(this._onDeleteEffect.bind(this));
        
        // Save effect button
        html.find('[data-action="save-effect"]').click(this._onSaveEffect.bind(this));
        
        // Cancel editing button
        html.find('[data-action="cancel-edit"]').click(this._onCancelEdit.bind(this));
        
        // Save all button
        html.find('[data-action="save-all"]').click(this._onSaveAll.bind(this));
        
        // Clear all button
        html.find('[data-action="clear-all"]').click(this._onClearAll.bind(this));
        
        // Image picker button
        html.find('[data-action="pick-image"]').click(this._onPickImage.bind(this));
        
        // Auto-generate ID from name
        html.find('input[name="effect-name"]').on('input', this._onNameInput.bind(this));
        
        // Handle file input change for import
        html.find('#import-file-input').change(this._onFileSelected.bind(this));
    }

    /** @override */
    _getHeaderButtons() {
        let buttons = super._getHeaderButtons();

        buttons.unshift(
            {
                label: game.i18n.localize("DRAGONBANE_STATUS.customEditor.import"),
                class: "import",
                icon: "fas fa-file-import",
                onclick: async (ev) => {
                    this._onImport(ev);
                }
            },
            {
                label: game.i18n.localize("DRAGONBANE_STATUS.customEditor.export"), 
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
     * Handle adding a new effect
     */
    _onAddEffect(event) {
        event.preventDefault();
        this.editingIndex = -1; // New effect
        this.render(true);
    }

    /**
     * Handle editing an existing effect
     */
    _onEditEffect(event) {
        event.preventDefault();
        const index = parseInt(event.currentTarget.dataset.index);
        this.editingIndex = index;
        this.render(true);
    }

    /**
     * Handle deleting an effect
     */
    async _onDeleteEffect(event) {
        event.preventDefault();
        const index = parseInt(event.currentTarget.dataset.index);
        const effect = this.customEffects[index];
        
        const confirm = await Dialog.confirm({
            title: game.i18n.localize("DRAGONBANE_STATUS.customEditor.dialogs.delete.title"),
            content: game.i18n.format("DRAGONBANE_STATUS.customEditor.dialogs.delete.content", { name: effect.name })
        });
        
        if (confirm) {
            this.customEffects.splice(index, 1);
            if (this.editingIndex === index) {
                this.editingIndex = null; // Cancel editing if we deleted the effect being edited
            } else if (this.editingIndex > index) {
                this.editingIndex--; // Adjust index if we deleted an effect before the one being edited
            }
            this.render(true);
        }
    }

    /**
     * Handle saving the current effect being edited
     */
    async _onSaveEffect(event) {
        event.preventDefault();
        
        // Manually collect form data from input elements
        const formData = {
            'effect-id': this.element.find('input[name="effect-id"]').val(),
            'effect-name': this.element.find('input[name="effect-name"]').val(),
            'effect-img': this.element.find('input[name="effect-img"]').val(),
            'effect-category': this.element.find('select[name="effect-category"]').val()
        };
        
        // Validate required fields
        if (!formData['effect-id'] || !formData['effect-name'] || !formData['effect-img']) {
            ui.notifications.error(game.i18n.localize("DRAGONBANE_STATUS.customEditor.validation.required"));
            return;
        }
        
        // Check for duplicate IDs (but allow editing the same effect)
        const existingIndex = this.customEffects.findIndex(effect => effect.id === formData['effect-id']);
        if (existingIndex >= 0 && existingIndex !== this.editingIndex) {
            ui.notifications.error(game.i18n.localize("DRAGONBANE_STATUS.customEditor.validation.duplicateId"));
            return;
        }
        
        // Create effect object
        const effect = {
            id: formData['effect-id'],
            name: formData['effect-name'],
            img: formData['effect-img'],
            category: formData['effect-category'] || 'general'
        };
        
        // Add or update effect
        if (this.editingIndex >= 0) {
            // Editing existing effect
            this.customEffects[this.editingIndex] = effect;
        } else {
            // Adding new effect
            this.customEffects.push(effect);
        }
        
        // Save to settings automatically and reload world
        try {
            const jsonString = JSON.stringify(this.customEffects, null, 2);
            await game.settings.set(MODULE_ID, "customStatusEffects", jsonString);
            
            // Close the editor
            this.close();
            
            // Show notification and reload
            ui.notifications.info(game.i18n.localize("DRAGONBANE_STATUS.customEditor.notifications.savedReloading"));
            setTimeout(() => {
                window.location.reload();
            }, 1000); // 1 second delay to show the notification
            
        } catch (error) {
            console.error("Dragonbane Status Effects | Error saving custom effect to settings:", error);
            ui.notifications.error(game.i18n.localize("DRAGONBANE_STATUS.customEditor.notifications.saveError"));
        }
    }

    /**
     * Handle canceling edit
     */
    _onCancelEdit(event) {
        event.preventDefault();
        this.editingIndex = null;
        this.render(true);
    }

    /**
     * Handle saving all effects to settings
     */
    async _onSaveAll(event) {
        event.preventDefault();
        
        try {
            const jsonString = JSON.stringify(this.customEffects, null, 2);
            await game.settings.set(MODULE_ID, "customStatusEffects", jsonString);
            
            // Close the editor
            this.close();
            
            // Show notification and reload
            ui.notifications.info(game.i18n.localize("DRAGONBANE_STATUS.customEditor.notifications.allSavedReloading"));
            setTimeout(() => {
                window.location.reload();
            }, 1000); // 1 second delay to show the notification
            
        } catch (error) {
            console.error("Dragonbane Status Effects | Error saving custom effects:", error);
            ui.notifications.error(game.i18n.localize("DRAGONBANE_STATUS.customEditor.notifications.saveError"));
        }
    }

    /**
     * Handle clearing all effects
     */
    async _onClearAll(event) {
        event.preventDefault();
        
        const confirm = await Dialog.confirm({
            title: game.i18n.localize("DRAGONBANE_STATUS.customEditor.dialogs.clearAll.title"),
            content: game.i18n.localize("DRAGONBANE_STATUS.customEditor.dialogs.clearAll.content")
        });
        
        if (confirm) {
            this.customEffects = [];
            this.editingIndex = null;
            this.render(true);
        }
    }

    /**
     * Handle image picker
     */
    async _onPickImage(event) {
        event.preventDefault();
        
        const current = this.element.find('input[name="effect-img"]').val();
        
        const fp = new FilePicker({
            type: "image",
            current: current,
            callback: (path) => {
                this.element.find('input[name="effect-img"]').val(path);
                this.element.find('.image-preview img').attr('src', path);
            }
        });
        
        fp.render(true);
    }

    /**
     * Auto-generate ID from name
     */
    _onNameInput(event) {
        const name = event.target.value;
        const idField = this.element.find('input[name="effect-id"]');
        
        // Always auto-generate ID from name (ID field is now readonly)
        const id = name.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
        
        idField.val(id || 'custom-effect');
    }

    /**
     * Handle export
     */
    async _onExport(event) {
        event.preventDefault();
        
        try {
            const exportData = {
                module: MODULE_ID,
                version: game.modules.get(MODULE_ID).version,
                timestamp: new Date().toISOString(),
                effects: this.customEffects
            };
            
            const filename = `dragonbane-custom-effects-${new Date().toISOString().split('T')[0]}.json`;
            const dataStr = JSON.stringify(exportData, null, 2);
            
            saveDataToFile(dataStr, "text/json", filename);
            
        } catch (error) {
            console.error("Dragonbane Status Effects | Error exporting custom effects:", error);
            ui.notifications.error(game.i18n.localize("DRAGONBANE_STATUS.customEditor.notifications.exportFailed"));
        }
    }

    /**
     * Handle import button
     */
    _onImport(event) {
        event.preventDefault();
        
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
            
            if (typeof readTextFromFile === 'function') {
                jsonText = await readTextFromFile(file);
            } else {
                jsonText = await file.text();
            }
            
            const importData = JSON.parse(jsonText);
            
            // Validate import data
            const effects = foundry.utils.getProperty(importData, "effects");
            if (!effects || !Array.isArray(effects)) {
                throw new Error(game.i18n.localize("DRAGONBANE_STATUS.customEditor.errors.invalidFile"));
            }
            
            // Show confirmation dialog
            const effectCount = effects.length;
            const sourceModule = foundry.utils.getProperty(importData, "module");
            const sourceVersion = foundry.utils.getProperty(importData, "version") || 'unknown';
            
            const content = await renderTemplate("modules/dragonbane-status-effects/templates/dialogs/import-custom-effects-confirmation.hbs", {
                effectCount,
                sourceModule,
                sourceVersion
            });
            
            const confirm = await Dialog.confirm({
                title: game.i18n.localize("DRAGONBANE_STATUS.customEditor.dialogs.import.title"),
                content
            });
            
            if (confirm) {
                this.customEffects = effects;
                this.editingIndex = null;
                this.render(true);
                
                ui.notifications.info(game.i18n.format("DRAGONBANE_STATUS.customEditor.notifications.importSuccess", {
                    count: effectCount
                }));
            }
            
            // Clear the file input
            event.target.value = '';
            
        } catch (error) {
            console.error("Dragonbane Status Effects | Error importing custom effects:", error);
            ui.notifications.error(game.i18n.format("DRAGONBANE_STATUS.customEditor.notifications.importFailed", { 
                error: error.message 
            }));
            
            // Clear the file input
            event.target.value = '';
        }
    }
}