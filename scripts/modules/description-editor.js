/**
 * Status Effect Description Editor for Dragonbane Status Effects Module
 * Allows users to define custom descriptions for status effects
 */

import { MODULE_ID } from "../constants.js";
import {
  getAllEffectsWithDescriptions,
  initializeStatusEffects,
  saveUserDescription,
} from "./effects-manager.js";

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
      template:
        "modules/dragonbane-status-effects/templates/description-editor.html",
      width: 700,
      height: 600,
      resizable: true,
      closeOnSubmit: false,
      submitOnChange: false,
      classes: ["dragonbane-status-effects", "description-editor"],
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
      hasCondition: this.effectsData.condition.length > 0,
      categories: {
        general: game.i18n.localize(
          "DRAGONBANE_STATUS.sections.generalEffects"
        ),
        spell: game.i18n.localize("DRAGONBANE_STATUS.sections.spellEffects"),
        ability: game.i18n.localize(
          "DRAGONBANE_STATUS.sections.heroicAbilities"
        ),
        condition: game.i18n.localize(
          "DRAGONBANE_STATUS.sections.attributeConditions"
        ),
      },
    };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Save button
    html.find('[data-action="save"]').click(this._onSave.bind(this));

    // Clear all button
    html.find('[data-action="clear-all"]').click(this._onClearAll.bind(this));

    // Handle file input change (still needed for import)
    html.find("#import-file-input").change(this._onFileSelected.bind(this));

    // Auto-resize textareas with debouncing for better performance
    const resizeTextarea = foundry.utils.debounce(function (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }, 150);

    html.find("textarea").on("input", function () {
      resizeTextarea(this);
    });

    // Drag and drop support
    html.find("textarea").on("dragover", this._onDragOver.bind(this));
    html.find("textarea").on("drop", this._onDrop.bind(this));
    html.find("textarea").on("dragenter", this._onDragEnter.bind(this));
    html.find("textarea").on("dragleave", this._onDragLeave.bind(this));
  }

  /** @override */
  _getHeaderButtons() {
    let buttons = super._getHeaderButtons();

    buttons.unshift(
      {
        label: game.i18n.localize("DRAGONBANE_STATUS.editor.import"),
        class: "import",
        icon: "fas fa-file-import",
        onclick: async (ev) => {
          this._onImport(ev);
        },
      },
      {
        label: game.i18n.localize("DRAGONBANE_STATUS.editor.export"),
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
    $(event.target).addClass("drag-over");
  }

  /**
   * Handle drag leave events - remove visual feedback
   */
  _onDragLeave(event) {
    event.preventDefault();
    $(event.target).removeClass("drag-over");
  }

  /**
   * Handle drop events - convert dropped items to UUID links
   */
  async _onDrop(event) {
    event.preventDefault();
    $(event.target).removeClass("drag-over");

    try {
      // Get the original DOM event (not jQuery wrapped)
      const originalEvent = event.originalEvent || event;

      // Get the dropped data using the original event
      const data =
        foundry.applications.ux.TextEditor.implementation.getDragEventData(
          originalEvent
        );
      if (!data || !data.uuid) {
        console.warn(
          "Dragonbane Status Effects | No UUID found in dropped data"
        );
        return;
      }

      // Get the document from UUID
      const doc = await fromUuid(data.uuid);
      if (!doc) {
        console.warn(
          "Dragonbane Status Effects | Could not resolve UUID:",
          data.uuid
        );
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
      textarea.value =
        currentText.substring(0, start) + link + currentText.substring(end);

      // Update cursor position to after the inserted link
      const newPosition = start + link.length;
      textarea.setSelectionRange(newPosition, newPosition);

      // Trigger input event to update auto-resize
      textarea.dispatchEvent(new Event("input", { bubbles: true }));

      // Focus back on textarea
      textarea.focus();

      ui.notifications.info(
        game.i18n.format("DRAGONBANE_STATUS.editor.notifications.linkAdded", {
          name: doc.name,
        })
      );
    } catch (error) {
      console.error("Dragonbane Status Effects | Error handling drop:", error);
      ui.notifications.error(
        game.i18n.localize("DRAGONBANE_STATUS.editor.notifications.linkFailed")
      );
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

    // Get form data manually since we're not using form submission
    const formData = new foundry.applications.ux.FormDataExtended(this.form)
      .object;
    await this._saveDescriptions(formData);
  }

  /**
   * Handle clear all button click - clear all descriptions
   */
  async _onClearAll(event) {
    event.preventDefault();

    const confirm = await Dialog.confirm({
      title: game.i18n.localize(
        "DRAGONBANE_STATUS.editor.dialogs.clearAll.title"
      ),
      content: game.i18n.localize(
        "DRAGONBANE_STATUS.editor.dialogs.clearAll.content"
      ),
    });

    if (confirm) {
      await this._clearAllDescriptions();
    }
  }

  /**
   * Save all descriptions from the form
   */
  async _saveDescriptions(formData) {
    try {
      const promises = [];

      // Save all descriptions from form data
      Object.entries(formData).forEach(([key, value]) => {
        if (key.startsWith("description-")) {
          const effectId = key.replace("description-", "");
          promises.push(saveUserDescription(effectId, value));
        }
      });

      await Promise.all(promises);

      // Refresh CONFIG.statusEffects with new descriptions
      await this._refreshStatusEffects();

      ui.notifications.info(
        game.i18n.localize("DRAGONBANE_STATUS.editor.notifications.saved")
      );
    } catch (error) {
      console.error(
        "Dragonbane Status Effects | Error saving descriptions:",
        error
      );
      ui.notifications.error(
        game.i18n.localize("DRAGONBANE_STATUS.editor.notifications.importError")
      );
    }
  }

  /**
   * Clear all descriptions
   */
  async _clearAllDescriptions() {
    try {
      const promises = [];

      // Clear all descriptions using foundry.utils
      ["general", "spell", "ability"].forEach((category) => {
        const categoryEffects = foundry.utils.getProperty(
          this.effectsData,
          category
        );
        if (categoryEffects && categoryEffects.length > 0) {
          categoryEffects.forEach((effect) => {
            promises.push(saveUserDescription(effect.id, ""));
          });
        }
      });

      await Promise.all(promises);
      await this._refreshStatusEffects();
      this.render(true);

      ui.notifications.info(
        game.i18n.localize("DRAGONBANE_STATUS.editor.notifications.cleared")
      );
    } catch (error) {
      console.error(
        "Dragonbane Status Effects | Error clearing descriptions:",
        error
      );
      ui.notifications.error(
        game.i18n.localize("DRAGONBANE_STATUS.editor.notifications.importError")
      );
    }
  }

  /**
   * Refresh CONFIG.statusEffects to pick up new descriptions
   */
  async _refreshStatusEffects() {
    // Re-run the effects setup to refresh CONFIG.statusEffects with new descriptions
    initializeStatusEffects();
  }

  /**
   * Handle export button - export all descriptions as JSON
   */
  async _onExport(event) {
    event.preventDefault();

    try {
      // Collect all current descriptions using foundry.utils
      const descriptions = {};

      ["general", "spell", "ability"].forEach((category) => {
        const categoryEffects = foundry.utils.getProperty(
          this.effectsData,
          category
        );
        if (categoryEffects && categoryEffects.length > 0) {
          categoryEffects.forEach((effect) => {
            descriptions[effect.id] = effect.description || "";
          });
        }
      });

      // Create export data
      const exportData = {
        module: MODULE_ID,
        version: game.modules.get(MODULE_ID).version,
        timestamp: new Date().toISOString(),
        descriptions: descriptions,
      };

      const filename = `dragonbane-status-descriptions-${
        new Date().toISOString().split("T")[0]
      }.json`;
      const dataStr = JSON.stringify(exportData, null, 2);

      // Use Foundry's native file saver
      foundry.utils.saveDataToFile(dataStr, "text/json", filename);
    } catch (error) {
      console.error(
        "Dragonbane Status Effects | Error exporting descriptions:",
        error
      );
      ui.notifications.error(
        game.i18n.localize(
          "DRAGONBANE_STATUS.editor.notifications.exportFailed"
        )
      );
    }
  }

  /**
   * Handle import button - trigger file selection
   */
  _onImport(event) {
    event.preventDefault();

    // Trigger the hidden file input
    const fileInput = this.element.find("#import-file-input")[0];
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
      if (typeof foundry.utils.readTextFromFile === "function") {
        jsonText = await foundry.utils.readTextFromFile(file);
      } else {
        jsonText = await file.text();
      }

      const importData = JSON.parse(jsonText);

      // Basic validation using foundry.utils
      const descriptions = foundry.utils.getProperty(
        importData,
        "descriptions"
      );
      if (!descriptions || typeof descriptions !== "object") {
        throw new Error(
          game.i18n.localize("DRAGONBANE_STATUS.editor.errors.invalidFile")
        );
      }

      // Show confirmation dialog with details
      const effectCount = Object.keys(descriptions).length;
      const nonEmptyCount = Object.values(descriptions).filter(
        (desc) => desc && desc.trim()
      ).length;
      const emptyCount = effectCount - nonEmptyCount;

      // Prepare source info for template
      const sourceModule = foundry.utils.getProperty(importData, "module");
      const sourceVersion =
        foundry.utils.getProperty(importData, "version") || "unknown";

      const content = await foundry.applications.handlebars.renderTemplate(
        "modules/dragonbane-status-effects/templates/dialogs/import-confirmation.hbs",
        {
          effectCount,
          nonEmptyCount,
          emptyCount,
          sourceModule,
          sourceVersion,
        }
      );

      const confirm = await Dialog.confirm({
        title: game.i18n.localize(
          "DRAGONBANE_STATUS.editor.dialogs.import.title"
        ),
        content,
      });

      if (confirm) {
        await this._performImport(descriptions);

        // Clear the file input
        event.target.value = "";
      }
    } catch (error) {
      console.error(
        "Dragonbane Status Effects | Error importing descriptions:",
        error
      );
      ui.notifications.error(
        game.i18n.format(
          "DRAGONBANE_STATUS.editor.notifications.importFailed",
          { error: error.message }
        )
      );

      // Clear the file input
      event.target.value = "";
    }
  }

  /**
   * Perform the actual import of descriptions
   */
  async _performImport(descriptions) {
    try {
      // First clear all existing descriptions using foundry.utils
      const clearPromises = [];
      ["general", "spell", "ability"].forEach((category) => {
        const categoryEffects = foundry.utils.getProperty(
          this.effectsData,
          category
        );
        if (categoryEffects && categoryEffects.length > 0) {
          categoryEffects.forEach((effect) => {
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
      const nonEmptyCount = Object.values(descriptions).filter(
        (desc) => desc && desc.trim()
      ).length;

      ui.notifications.info(
        game.i18n.format(
          "DRAGONBANE_STATUS.editor.notifications.importSuccess",
          {
            count: effectCount,
            nonEmpty: nonEmptyCount,
          }
        )
      );
    } catch (error) {
      console.error("Dragonbane Status Effects | Error during import:", error);
      ui.notifications.error(
        game.i18n.localize("DRAGONBANE_STATUS.editor.notifications.importError")
      );
    }
  }
}
