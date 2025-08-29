/**
 * Custom Status Effects Editor for Dragonbane Status Effects Module
 * Visual interface for creating and managing custom status effects
 * Now includes built-in effect editing capabilities
 */

import { CUSTOM_STATUS_EFFECTS, MODULE_ID } from "../constants.js";
import {
  initializeStatusEffects,
  parseUserCustomEffects,
} from "./effects-manager.js";

export class CustomStatusEffectsEditor extends FormApplication {
  constructor(options = {}) {
    super({}, options);
    this.customEffects = [];
    this.editingIndex = null; // null means not editing, -1 means adding new, >= 0 means editing existing
    this.showBuiltinEffects = false; // Always starts unchecked per requirements
    this.editingBuiltin = false; // Track if we're editing a built-in effect
    this.builtinEffects = []; // Store processed built-in effects
    this.allEffects = []; // Combined list for display
  }

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "dragonbane-custom-effects-editor",
      title: game.i18n.localize("DRAGONBANE_STATUS.customEditor.title"),
      template:
        "modules/dragonbane-status-effects/templates/custom-effects-editor.html",
      width: 800,
      height: 600,
      resizable: true,
      closeOnSubmit: false,
      submitOnChange: false,
      classes: ["dragonbane-status-effects", "custom-effects-editor"],
    });
  }

  /** @override */
  async getData(options = {}) {
    // Load current custom effects
    this.customEffects = parseUserCustomEffects(false) || []; // Don't show errors in editor

    // Process built-in effects if checkbox is enabled
    if (this.showBuiltinEffects) {
      await this._processBuiltinEffects();
      // Combine built-in and custom effects
      this.allEffects = [...this.builtinEffects, ...this.customEffects];
    } else {
      // Only show custom effects
      this.allEffects = [...this.customEffects];
    }

    // Sort effects alphabetically by name
    const sortedEffects = [...this.allEffects].sort((a, b) =>
      a.name.localeCompare(b.name, game.i18n.lang || "en", {
        sensitivity: "base",
        numeric: true,
        caseFirst: "lower",
      })
    );

    // Get the effect being edited
    let editingEffect = null;
    if (this.editingIndex !== null && this.editingIndex >= 0) {
      if (this.editingBuiltin) {
        // Find the built-in effect by ID
        editingEffect = this.builtinEffects.find(
          (e) => e._originalIndex === this.editingIndex
        );
      } else {
        // Find the custom effect
        editingEffect = this.customEffects[this.editingIndex];
      }
    }

    return {
      effects: sortedEffects,
      customEffects: this.customEffects, // Keep original order for indexing
      showingBuiltin: this.showBuiltinEffects,
      categories: [
        {
          key: "general",
          label: game.i18n.localize(
            "DRAGONBANE_STATUS.sections.generalEffects"
          ),
        },
        {
          key: "spell",
          label: game.i18n.localize("DRAGONBANE_STATUS.sections.spellEffects"),
        },
        {
          key: "ability",
          label: game.i18n.localize(
            "DRAGONBANE_STATUS.sections.heroicAbilities"
          ),
        },
      ],
      editingIndex: this.editingIndex,
      isEditing: this.editingIndex !== null && this.editingIndex !== undefined,
      editingEffect: editingEffect,
      editingBuiltin: this.editingBuiltin,
    };
  }

  /**
   * Store current scroll position of effects container
   * @private
   */
  _storeScrollPosition() {
    const container = this.element?.find(".effects-container")[0];
    if (container) {
      this._scrollTop = container.scrollTop;
    }
  }

  /**
   * Restore scroll position of effects container
   * @private
   */
  _restoreScrollPosition() {
    if (this._scrollTop !== undefined) {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        const container = this.element?.find(".effects-container")[0];
        if (container) {
          container.scrollTop = this._scrollTop;
        }
      }, 50);
    }
  }

  /**
   * Render with scroll position preservation
   * @param {boolean} force - Whether to force re-render
   * @param {Object} options - Render options
   */
  render(force = false, options = {}) {
    // Store scroll position before rendering (unless this is initial render)
    if (this.rendered) {
      this._storeScrollPosition();
    }

    // Call parent render
    const result = super.render(force, options);

    // Restore scroll position after rendering
    if (this._scrollTop !== undefined) {
      this._restoreScrollPosition();
    }

    return result;
  }

  /**
   * Process built-in effects with overrides and hidden states
   * @private
   */
  async _processBuiltinEffects() {
    const overrides =
      game.settings.get(MODULE_ID, "builtinEffectOverrides") || {};
    const hiddenEffects =
      game.settings.get(MODULE_ID, "hiddenBuiltinEffects") || {};

    this.builtinEffects = CUSTOM_STATUS_EFFECTS.map((builtin, index) => {
      const override = overrides[builtin.id];
      const isHidden = hiddenEffects[builtin.id] === true;

      // Localize the name if it's a translation key
      const baseName = builtin.name.startsWith("EFFECT.")
        ? game.i18n.localize(builtin.name)
        : builtin.name;

      // Create the effect object
      let effect = {
        ...builtin,
        name: baseName,
        isBuiltin: true,
        isHidden: isHidden,
        _originalIndex: index, // Store original index for reference
      };

      // Apply overrides if they exist
      if (override) {
        effect = {
          ...effect,
          ...override,
          isOverridden: true,
          id: builtin.id, // Ensure ID never changes
        };
      }

      return effect;
    });
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Built-in effects toggle
    html
      .find("#show-builtin-effects")
      .change(this._onToggleBuiltinEffects.bind(this));

    // Add effect button
    html.find('[data-action="add-effect"]').click(this._onAddEffect.bind(this));

    // Edit effect buttons
    html
      .find('[data-action="edit-effect"]')
      .click(this._onEditEffect.bind(this));

    // Delete effect buttons
    html
      .find('[data-action="delete-effect"]')
      .click(this._onDeleteEffect.bind(this));

    // Hide/Show effect buttons (for built-in effects)
    html
      .find('[data-action="hide-effect"]')
      .click(this._onHideEffect.bind(this));
    html
      .find('[data-action="show-effect"]')
      .click(this._onShowEffect.bind(this));

    // Reset effect button (for overridden built-in effects)
    html
      .find('[data-action="reset-effect"]')
      .click(this._onResetEffect.bind(this));

    // Save effect button
    html
      .find('[data-action="save-effect"]')
      .click(this._onSaveEffect.bind(this));

    // Cancel editing button
    html
      .find('[data-action="cancel-edit"]')
      .click(this._onCancelEdit.bind(this));

    // Save all button
    html.find('[data-action="save-all"]').click(this._onSaveAll.bind(this));

    // Reset all button
    html.find('[data-action="reset-all"]').click(this._onResetAll.bind(this));

    // Clear all button (keeping for backwards compatibility)
    html.find('[data-action="clear-all"]').click(this._onClearAll.bind(this));

    // Image picker button
    html.find('[data-action="pick-image"]').click(this._onPickImage.bind(this));

    // Auto-generate ID from name (only for custom effects)
    html
      .find('input[name="effect-name"]')
      .on("input", this._onNameInput.bind(this));

    // Handle file input change for import
    html.find("#import-file-input").change(this._onFileSelected.bind(this));
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
        },
      },
      {
        label: game.i18n.localize("DRAGONBANE_STATUS.customEditor.export"),
        class: "export",
        icon: "fas fa-file-export",
        onclick: async (ev) => {
          this._onExport(ev);
        },
      }
    );

    return buttons;
  }

  /**
   * Handle toggling the display of built-in effects
   */
  _onToggleBuiltinEffects(event) {
    this.showBuiltinEffects = event.target.checked;
    // Cancel any editing if switching modes
    if (this.editingIndex !== null) {
      this.editingIndex = null;
      this.editingBuiltin = false;
    }
    this.render(true);
  }

  /**
   * Handle hiding a built-in effect
   */
  async _onHideEffect(event) {
    event.preventDefault();
    const effectId = event.currentTarget.dataset.effectId;

    const hiddenEffects =
      game.settings.get(MODULE_ID, "hiddenBuiltinEffects") || {};
    hiddenEffects[effectId] = true;

    await game.settings.set(MODULE_ID, "hiddenBuiltinEffects", hiddenEffects);

    // Re-initialize status effects to apply the change
    initializeStatusEffects();

    ui.notifications.info(
      game.i18n.localize("DRAGONBANE_STATUS.customEditor.notifications.hidden")
    );
    this.render(true);
  }

  /**
   * Handle showing a previously hidden built-in effect
   */
  async _onShowEffect(event) {
    event.preventDefault();
    const effectId = event.currentTarget.dataset.effectId;

    const hiddenEffects =
      game.settings.get(MODULE_ID, "hiddenBuiltinEffects") || {};
    delete hiddenEffects[effectId];

    await game.settings.set(MODULE_ID, "hiddenBuiltinEffects", hiddenEffects);

    // Re-initialize status effects to apply the change
    initializeStatusEffects();

    ui.notifications.info(
      game.i18n.localize("DRAGONBANE_STATUS.customEditor.notifications.shown")
    );
    this.render(true);
  }

  /**
   * Handle resetting a built-in effect to its defaults
   */
  async _onResetEffect(event) {
    event.preventDefault();

    const effectId = this.element.find('input[name="effect-id"]').val();
    const effect = this.builtinEffects.find((e) => e.id === effectId);

    if (!effect) return;

    const confirm = await Dialog.confirm({
      title: game.i18n.localize(
        "DRAGONBANE_STATUS.customEditor.dialogs.reset.title"
      ),
      content: game.i18n.format(
        "DRAGONBANE_STATUS.customEditor.dialogs.reset.content",
        { name: effect.name }
      ),
    });

    if (confirm) {
      const overrides =
        game.settings.get(MODULE_ID, "builtinEffectOverrides") || {};
      delete overrides[effectId];
      await game.settings.set(MODULE_ID, "builtinEffectOverrides", overrides);

      // Re-initialize status effects to apply the change
      initializeStatusEffects();

      ui.notifications.info(
        game.i18n.localize("DRAGONBANE_STATUS.customEditor.notifications.reset")
      );

      // Cancel editing mode and refresh
      this.editingIndex = null;
      this.editingBuiltin = false;
      this.render(true);
    }
  }

  /**
   * Handle adding a new effect
   */
  _onAddEffect(event) {
    event.preventDefault();
    this.editingIndex = -1; // New effect
    this.editingBuiltin = false; // New effects are always custom
    this.render(true);
  }

  /**
   * Handle editing an existing effect
   */
  _onEditEffect(event) {
    event.preventDefault();
    const effectId = event.currentTarget.dataset.effectId;
    const isBuiltin = event.currentTarget.dataset.isBuiltin === "true";

    if (isBuiltin) {
      // Find the built-in effect
      const builtinIndex = this.builtinEffects.findIndex(
        (effect) => effect.id === effectId
      );
      if (builtinIndex >= 0) {
        this.editingIndex = this.builtinEffects[builtinIndex]._originalIndex;
        this.editingBuiltin = true;
        this.render(true);
      }
    } else {
      // Find the custom effect
      const actualIndex = this.customEffects.findIndex(
        (effect) => effect.id === effectId
      );
      if (actualIndex >= 0) {
        this.editingIndex = actualIndex;
        this.editingBuiltin = false;
        this.render(true);
      }
    }
  }

  /**
   * Handle deleting an effect (custom effects only)
   */
  async _onDeleteEffect(event) {
    event.preventDefault();

    try {
      const button = event.currentTarget;
      const effectId = button.getAttribute("data-effect-id");

      // Find the actual index and effect in the original customEffects array
      const actualIndex = this.customEffects.findIndex(
        (effect) => effect.id === effectId
      );

      if (actualIndex < 0) {
        console.error("Effect not found in customEffects array:", effectId);
        ui.notifications.error("Effect not found");
        return;
      }

      const effect = this.customEffects[actualIndex];

      const confirm = await Dialog.confirm({
        title: game.i18n.localize(
          "DRAGONBANE_STATUS.customEditor.dialogs.delete.title"
        ),
        content: game.i18n.format(
          "DRAGONBANE_STATUS.customEditor.dialogs.delete.content",
          { name: effect.name }
        ),
      });

      if (confirm) {
        // Remove from array
        this.customEffects.splice(actualIndex, 1);

        // Save the updated array to settings immediately
        try {
          const jsonString = JSON.stringify(this.customEffects, null, 2);
          await game.settings.set(MODULE_ID, "customStatusEffects", jsonString);

          ui.notifications.info(
            game.i18n.format(
              "DRAGONBANE_STATUS.customEditor.notifications.deleted",
              { name: effect.name }
            )
          );
        } catch (saveError) {
          console.error("Error saving after delete:", saveError);
          ui.notifications.error(
            game.i18n.localize(
              "DRAGONBANE_STATUS.customEditor.notifications.saveError"
            )
          );
          return;
        }

        // Adjust editing index if needed
        if (!this.editingBuiltin && this.editingIndex === actualIndex) {
          this.editingIndex = null; // Cancel editing if we deleted the effect being edited
        } else if (!this.editingBuiltin && this.editingIndex > actualIndex) {
          this.editingIndex--; // Adjust index if we deleted an effect before the one being edited
        }

        // Re-render the form
        this.render(true);
      }
    } catch (error) {
      console.error("Error in _onDeleteEffect:", error);
      ui.notifications.error("Error deleting effect: " + error.message);
    }
  }

  /**
   * Handle saving the current effect being edited
   */
  async _onSaveEffect(event) {
    event.preventDefault();

    // Manually collect form data from input elements
    const formData = {
      "effect-id": this.element.find('input[name="effect-id"]').val(),
      "effect-name": this.element.find('input[name="effect-name"]').val(),
      "effect-img": this.element.find('input[name="effect-img"]').val(),
      "effect-category": this.element
        .find('select[name="effect-category"]')
        .val(),
      "effect-duration": this.element
        .find('input[name="effect-duration"]')
        .val(),
    };

    // Branch based on whether we're editing a built-in or custom effect
    if (this.editingBuiltin) {
      await this._saveBuiltinOverride(formData);
    } else {
      await this._saveCustomEffect(formData);
    }
  }

  /**
   * Save override for a built-in effect
   * @private
   */
  async _saveBuiltinOverride(formData) {
    const effectId = formData["effect-id"];
    const overrides =
      game.settings.get(MODULE_ID, "builtinEffectOverrides") || {};

    // Parse duration as number (allow empty/0)
    const duration = formData["effect-duration"]
      ? parseInt(formData["effect-duration"])
      : 0;

    // Create override object
    overrides[effectId] = {
      name: formData["effect-name"],
      img: formData["effect-img"],
      category: formData["effect-category"] || "general",
    };

    // Add duration if specified
    if (duration > 0) {
      overrides[effectId].duration = { seconds: duration };
    }

    // Save to settings
    try {
      await game.settings.set(MODULE_ID, "builtinEffectOverrides", overrides);

      // Re-initialize status effects to apply the change immediately
      initializeStatusEffects();

      ui.notifications.info(
        game.i18n.localize("DRAGONBANE_STATUS.customEditor.notifications.saved")
      );

      // Exit editing mode completely - this restores the Add Effect button
      this.editingIndex = null;
      this.editingBuiltin = false;

      // Refresh the form to show updated state
      this.render(true);
    } catch (error) {
      console.error(
        "Dragonbane Status Effects | Error saving built-in override:",
        error
      );
      ui.notifications.error(
        game.i18n.localize(
          "DRAGONBANE_STATUS.customEditor.notifications.saveError"
        )
      );
    }
  }

  /**
   * Save a custom effect (existing functionality)
   * @private
   */
  async _saveCustomEffect(formData) {
    // Validate required fields
    if (
      !formData["effect-id"] ||
      !formData["effect-name"] ||
      !formData["effect-img"]
    ) {
      ui.notifications.error(
        game.i18n.localize("DRAGONBANE_STATUS.customEditor.validation.required")
      );
      return;
    }

    // Check for duplicate IDs (but allow editing the same effect)
    const existingIndex = this.customEffects.findIndex(
      (effect) => effect.id === formData["effect-id"]
    );
    if (existingIndex >= 0 && existingIndex !== this.editingIndex) {
      ui.notifications.error(
        game.i18n.localize(
          "DRAGONBANE_STATUS.customEditor.validation.duplicateId"
        )
      );
      return;
    }

    // Parse duration as number (allow empty/0)
    const duration = formData["effect-duration"]
      ? parseInt(formData["effect-duration"])
      : 0;

    // Create effect object
    const effect = {
      id: formData["effect-id"],
      name: formData["effect-name"],
      img: formData["effect-img"],
      category: formData["effect-category"] || "general",
    };

    // Add duration if specified (in Foundry's expected format)
    if (duration > 0) {
      effect.duration = {
        seconds: duration,
      };
    }

    // Add or update effect
    if (this.editingIndex >= 0) {
      // Editing existing effect
      this.customEffects[this.editingIndex] = effect;
    } else {
      // Adding new effect
      this.customEffects.push(effect);
    }

    // Save to settings (individual effect save)
    try {
      const jsonString = JSON.stringify(this.customEffects, null, 2);
      await game.settings.set(MODULE_ID, "customStatusEffects", jsonString);

      // Re-initialize status effects to apply the change immediately
      initializeStatusEffects();

      ui.notifications.info(
        game.i18n.localize("DRAGONBANE_STATUS.customEditor.notifications.saved")
      );

      // Cancel editing mode and refresh the form
      this.editingIndex = null;
      this.editingBuiltin = false;
      this.render(true);
    } catch (error) {
      console.error(
        "Dragonbane Status Effects | Error saving custom effect to settings:",
        error
      );
      ui.notifications.error(
        game.i18n.localize(
          "DRAGONBANE_STATUS.customEditor.notifications.saveError"
        )
      );
    }
  }

  /**
   * Handle canceling edit
   */
  _onCancelEdit(event) {
    event.preventDefault();
    this.editingIndex = null;
    this.editingBuiltin = false;
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

      // Show Foundry's built-in reload confirmation dialog
      ui.notifications.info(
        game.i18n.localize(
          "DRAGONBANE_STATUS.customEditor.notifications.allSaved"
        )
      );
      foundry.applications.settings.SettingsConfig.reloadConfirm({
        world: true,
      });
    } catch (error) {
      console.error(
        "Dragonbane Status Effects | Error saving custom effects:",
        error
      );
      ui.notifications.error(
        game.i18n.localize(
          "DRAGONBANE_STATUS.customEditor.notifications.saveError"
        )
      );
    }
  }

  /**
   * Handle resetting all effects (custom effects + built-in overrides + hidden effects)
   */
  async _onResetAll(event) {
    event.preventDefault();

    const confirm = await Dialog.confirm({
      title: game.i18n.localize(
        "DRAGONBANE_STATUS.customEditor.dialogs.resetAll.title"
      ),
      content: game.i18n.localize(
        "DRAGONBANE_STATUS.customEditor.dialogs.resetAll.content"
      ),
    });

    if (confirm) {
      try {
        // Clear all custom effects
        this.customEffects = [];
        await game.settings.set(MODULE_ID, "customStatusEffects", "");

        // Clear all built-in overrides
        await game.settings.set(MODULE_ID, "builtinEffectOverrides", {});

        // Clear all hidden built-in effects
        await game.settings.set(MODULE_ID, "hiddenBuiltinEffects", {});

        // Re-initialize status effects to apply changes immediately
        initializeStatusEffects();

        // Reset editing state
        this.editingIndex = null;
        this.editingBuiltin = false;

        // Re-render the form to show updated state
        this.render(true);

        ui.notifications.info(
          game.i18n.localize(
            "DRAGONBANE_STATUS.customEditor.notifications.allReset"
          )
        );
      } catch (error) {
        console.error(
          "Dragonbane Status Effects | Error resetting all effects:",
          error
        );
        ui.notifications.error(
          game.i18n.localize(
            "DRAGONBANE_STATUS.customEditor.notifications.saveError"
          )
        );
      }
    }
  }

  /**
   * Handle clearing all custom effects only (legacy)
   */
  async _onClearAll(event) {
    event.preventDefault();

    const confirm = await Dialog.confirm({
      title: game.i18n.localize(
        "DRAGONBANE_STATUS.customEditor.dialogs.clearAll.title"
      ),
      content: game.i18n.localize(
        "DRAGONBANE_STATUS.customEditor.dialogs.clearAll.content"
      ),
    });

    if (confirm) {
      this.customEffects = [];
      this.editingIndex = null;
      this.editingBuiltin = false;
      this.render(true);
    }
  }

  /**
   * Handle image picker
   */
  async _onPickImage(event) {
    event.preventDefault();

    const current = this.element.find('input[name="effect-img"]').val();

    const fp = new foundry.applications.apps.FilePicker.implementation({
      type: "image",
      current: current,
      callback: (path) => {
        this.element.find('input[name="effect-img"]').val(path);
        this.element.find(".image-preview img").attr("src", path);
      },
    });

    fp.render(true);
  }

  /**
   * Auto-generate ID from name (only for custom effects)
   */
  _onNameInput(event) {
    // Only auto-generate for custom effects, not built-in
    if (this.editingBuiltin) return;

    const name = event.target.value;
    const idField = this.element.find('input[name="effect-id"]');

    // Always auto-generate ID from name (ID field is now readonly)
    const id = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens

    idField.val(id || "custom-effect");
  }

  /**
   * Handle export - now includes built-in overrides and hidden states
   */
  async _onExport(event) {
    event.preventDefault();

    try {
      const exportData = {
        module: MODULE_ID,
        version: game.modules.get(MODULE_ID).version,
        timestamp: new Date().toISOString(),
        effects: this.customEffects,
        builtinOverrides:
          game.settings.get(MODULE_ID, "builtinEffectOverrides") || {},
        hiddenBuiltinEffects:
          game.settings.get(MODULE_ID, "hiddenBuiltinEffects") || {},
      };

      const filename = `dragonbane-custom-effects-${
        new Date().toISOString().split("T")[0]
      }.json`;
      const dataStr = JSON.stringify(exportData, null, 2);

      foundry.utils.saveDataToFile(dataStr, "text/json", filename);
    } catch (error) {
      console.error(
        "Dragonbane Status Effects | Error exporting custom effects:",
        error
      );
      ui.notifications.error(
        game.i18n.localize(
          "DRAGONBANE_STATUS.customEditor.notifications.exportFailed"
        )
      );
    }
  }

  /**
   * Handle import button
   */
  _onImport(event) {
    event.preventDefault();

    const fileInput = this.element.find("#import-file-input")[0];
    if (fileInput) {
      fileInput.click();
    }
  }

  /**
   * Handle file selection for import - now includes built-in overrides
   */
  async _onFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      let jsonText;

      if (typeof foundry.utils.readTextFromFile === "function") {
        jsonText = await foundry.utils.readTextFromFile(file);
      } else {
        jsonText = await file.text();
      }

      const importData = JSON.parse(jsonText);

      // Validate import data
      const effects = foundry.utils.getProperty(importData, "effects");
      if (!effects || !Array.isArray(effects)) {
        throw new Error(
          game.i18n.localize(
            "DRAGONBANE_STATUS.customEditor.errors.invalidFile"
          )
        );
      }

      // Show confirmation dialog
      const effectCount = effects.length;
      const overrideCount = Object.keys(
        importData.builtinOverrides || {}
      ).length;
      const hiddenCount = Object.keys(
        importData.hiddenBuiltinEffects || {}
      ).length;
      const sourceModule = foundry.utils.getProperty(importData, "module");
      const sourceVersion =
        foundry.utils.getProperty(importData, "version") || "unknown";

      const content = await foundry.applications.handlebars.renderTemplate(
        "modules/dragonbane-status-effects/templates/dialogs/import-custom-effects-confirmation.hbs",
        {
          effectCount,
          overrideCount,
          hiddenCount,
          sourceModule,
          sourceVersion,
        }
      );

      const confirm = await Dialog.confirm({
        title: game.i18n.localize(
          "DRAGONBANE_STATUS.customEditor.dialogs.import.title"
        ),
        content,
      });

      if (confirm) {
        // Import custom effects
        this.customEffects = effects;

        // Save custom effects immediately
        const jsonString = JSON.stringify(this.customEffects, null, 2);
        await game.settings.set(MODULE_ID, "customStatusEffects", jsonString);

        // Import built-in overrides if present
        if (importData.builtinOverrides) {
          await game.settings.set(
            MODULE_ID,
            "builtinEffectOverrides",
            importData.builtinOverrides
          );
        }

        // Import hidden states if present
        if (importData.hiddenBuiltinEffects) {
          await game.settings.set(
            MODULE_ID,
            "hiddenBuiltinEffects",
            importData.hiddenBuiltinEffects
          );
        }

        // Re-initialize status effects to apply all changes
        initializeStatusEffects();

        this.editingIndex = null;
        this.editingBuiltin = false;
        this.render(true);

        ui.notifications.info(
          game.i18n.format(
            "DRAGONBANE_STATUS.customEditor.notifications.importSuccess",
            {
              count: effectCount,
            }
          )
        );
      }

      // Clear the file input
      event.target.value = "";
    } catch (error) {
      console.error(
        "Dragonbane Status Effects | Error importing custom effects:",
        error
      );
      ui.notifications.error(
        game.i18n.format(
          "DRAGONBANE_STATUS.customEditor.notifications.importFailed",
          {
            error: error.message,
          }
        )
      );

      // Clear the file input
      event.target.value = "";
    }
  }
}
