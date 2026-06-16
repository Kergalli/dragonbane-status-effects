# 🐉 Dragonbane Status Effects

[![Foundry Version](https://img.shields.io/badge/Foundry-V14-informational)](https://foundryvtt.com/)
[![Module Version](https://img.shields.io/badge/Version-3.0.0-brightgreen)](https://github.com/Kergalli/dragonbane-status-effects/releases)
[![License](https://img.shields.io/badge/License-MIT-green)](https://github.com/Kergalli/dragonbane-status-effects/blob/main/LICENSE)

**Dragonbane Status Effects** provides a comprehensive status effects library with visual editors, enhanced Token HUD styling, and seamless system integration for the Dragonbane RPG system in Foundry VTT V14.

---

## 🚀 **Installation**

### **From Foundry (Recommended)**

1. Open Foundry VTT → **Add-on Modules** → **Install Module**
2. Paste manifest URL: `https://github.com/Kergalli/dragonbane-status-effects/releases/latest/download/module.json`
3. Click **Install** → Enable in **Manage Modules**

### **Manual Installation**

1. Download latest release from [GitHub repository](https://github.com/Kergalli/dragonbane-status-effects)
2. Extract to `Data/modules/` directory → Restart Foundry → Enable module

---

## ✨ **Key Features**

### 🎨 **Enhanced Token HUD**

- **Beautiful 6-column grid layout** with color-coded section headers
- **Visual organization** by effect categories (General, Spell, Heroic Abilities)
- **Seamless integration** with Foundry V14's modern interface
- **Customizable display** options for different effect types

### 📚 **Comprehensive Status Library**

- **41 pre-built effects** across multiple categories
- **Dragonbane-specific integration** with attribute conditions (STR, CON, AGL, INT, WIL, CHA)
- **Rich visual icons** from game-icons.net with thematic consistency
- **Active effect support** (Longstrider automatically doubles movement speed)

### 📝 **Visual Editors**

- **No-code effect creation** with intuitive interfaces
- **Drag & drop linking** - Create @UUID links by dragging items, spells, journal entries
- **Rich description support** compatible with Visual Active Effects and Dfreds Effects Panel
- **Import/Export system** for backup and sharing between worlds

### 🔄 **Foundry V14 Compatibility**

- **Full V14 architecture support** with modern APIs
- **Enhanced stability** with defensive error handling
- **V14 Active Effect schema** (string-typed change modes, `system.changes`)
- **Updated for Dragonbane v4.0.1**

---

## 📊 **Status Effects Library**

| Category                    | Count | Examples                                     | Special Features                              |
| --------------------------- | ----- | -------------------------------------------- | --------------------------------------------- |
| **🛡️ General Effects**      | 27    | Amnesia, Blind, Burning, Poison, Prone, Rage | Core gameplay conditions                      |
| **✨ Spell Effects**        | 9     | Birdsong, Frozen, Protector, Stone Skin      | **Longstrider** with active movement doubling |
| **⚔️ Heroic Abilities**     | 5     | Berserk, Disguised, Musician effects         | Character ability enhancements                |
| **💪 Attribute Conditions** | 6     | STR/CON/AGL/INT/WIL/CHA Damaged              | Auto-integrated from Dragonbane system        |

### **Featured Effects**

- **Longstrider**: Includes active effect that automatically doubles movement speed
- **Attribute Conditions**: Direct integration with Dragonbane system conditions
- **Poison Variants**: Lethal, Paralyzing, and Sleeping poison types
- **Combat States**: Grappled, Ensnared, Prone, Unconscious with visual clarity

---

## ⚙️ **Configuration**

**Access**: Game Settings → Configure Settings → Dragonbane Status Effects

### **Core Settings**

- **Replace Default Status Effects**: Override Foundry defaults with Dragonbane-themed effects
- **Enhanced Token HUD Layout**: Enable styled 6-column grid with section headers
- **Show Spell Effects**: Include spell-related status effects in Token HUD
- **Show Heroic Abilities**: Include heroic ability status effects in Token HUD

### **Visual Editors**

- **Manage Custom Status Effects**: Create, edit, and manage custom effects with visual interface
- **Edit Status Effect Descriptions**: Add rich descriptions for compatibility with effect panels
- **Import/Export Support**: Backup and share custom effects and descriptions as JSON files

### **Editor Usage**

#### **Custom Effects Editor**

1. **Access**: Settings → "Open Custom Effects Editor"
2. **Create**: "Add Effect" → Configure name, icon, categories
3. **Edit**: Click edit button on any existing effect
4. **Save**: **Always click "Save All Effects"** after changes (requires reload)
5. **Backup**: Export/import custom effects as JSON files

#### **Description Editor**

1. **Access**: Settings → "Open Description Editor"
2. **Rich Text**: Add detailed descriptions with HTML formatting
3. **UUID Links**: Drag items/spells/journals directly into text fields
4. **Line Breaks**: Use `<br>` tags for formatting
5. **Instant Save**: Changes apply immediately to new effects

**📥 Example Import**: [English descriptions file](https://github.com/Kergalli/dragonbane_macros/blob/main/status-effect-descriptions)

---

## 🔗 **Integration & Compatibility**

### **System Requirements**

| Requirement           | Version | Notes                                        |
| --------------------- | ------- | -------------------------------------------- |
| **Foundry VTT**       | v14+    | v3.x for V14; v2.x for V13; v1.x for V12     |
| **Dragonbane System** | v4.0.0+ | Required for attribute condition integration |

### **Recommended Integrations**

| Module                                                                                     | Integration | Benefits                                                   |
| ------------------------------------------------------------------------------------------ | ----------- | ---------------------------------------------------------- |
| **[Dragonbane Combat Assistant](https://foundryvtt.com/packages/dragonbane-action-rules)** | Automatic   | "Set it and forget it" - auto-applies spell status effects |
| **[Year Zero Engine Combat](https://foundryvtt.com/packages/yze-combat)**                  | Seamless    | Action button integration in Token HUD and combat tracker  |
| **[Token Action HUD Dragonbane](https://github.com/kergalli/token-action-hud-dragonbane)** | Native      | Status effects appear in TAH for quick application         |

### **Visual Enhancement Modules**

| Module                    | Purpose           | Integration Details                                   |
| ------------------------- | ----------------- | ----------------------------------------------------- |
| **Visual Active Effects** | Rich descriptions | Displays detailed effect descriptions in visual panel |
| **Dfreds Effects Panel**  | Effect management | Enhanced effect descriptions and management options   |

### **Installation Notes**

- **Combat Assistant strongly recommended** for automated spell workflow
- **Manual application required** without Combat Assistant (via Token HUD)
- **All integrations work independently** - install only what you need

---

## 🔧 **V14 Migration & Compatibility**

### **Upgrading to V14**

- **Version Path**: V14 users use v3.x; V13 users stay on v2.x; V12 users stay on v1.x
- **Foundry & System**: v3.0.0 targets Foundry V14 and Dragonbane v4.0.1 (a clean cut — there is no build spanning V13 and V14)
- **Active Effects**: Effect change data migrated to the V14 schema (numeric `mode` → string `type`, changes stored on `system.changes`). Built-in effects (e.g. Longstrider) are updated automatically
- **Custom Effects**: Any custom effect you authored with a functional change array under the old `mode` format must be re-saved in the Custom Effects Editor to apply under v3.0.0

### **V14 Improvements**

- **Modern APIs**: V14 namespaced functions with enhanced error handling
- **Enhanced Stability**: Defensive filtering prevents rendering issues
- **Active Effect Support**: Custom keys now apply natively under the rewritten Dragonbane v4 effects pipeline

---

## 🛠️ **Troubleshooting**

### **Common Issues & Solutions**

| Issue                                     | Solution                                              |
| ----------------------------------------- | ----------------------------------------------------- |
| **Custom effects not appearing**          | Click "Save All Effects" in editor → Reload world     |
| **Token HUD not styled**                  | Enable "Enhanced Token HUD Layout" in module settings |
| **Effects disappeared after V14 upgrade** | Expected — reapply effects after upgrading            |
| **Token HUD conflicts**                   | Disable Monk's Little Details Token HUD options       |

### **Known Conflicts**

- **⚠️ Condition Lab & Triggler**: Similar functionality causes conflicts
- **⚠️ Monk's Little Details**: Disable these Token HUD options:
  - "Alter the Token HUD status effects"
  - "Clear All"
  - "Highlight Token HUD status effects"

---

## 🌍 **Credits & Support**

### **Community & Support**

- **Issues**: [GitHub Issues](https://github.com/Kergalli/dragonbane-status-effects/issues)
- **Documentation**: [Complete Changelog](CHANGELOG.md)
- **Community**: Dragonbane Community Discord

### **Community Contributors**

- **dgladkov** - Attribute conditions addtion to custom description editor
- **LuckyFrico** - Italian language localization
- **xdy** - Swedish language improvements and localization fixes

### **Attribution**

- **Icons**: [game-icons.net](https://game-icons.net) by Lorc, Delapouite, Skoll, and contributors
- **License**: [Creative Commons 3.0 BY](https://creativecommons.org/licenses/by/3.0/)
- **Inspiration**: Condition Lab & Triggler by Matheus Clemente

---

## ⚖️ **License & Disclaimer**

MIT License.

This VTT module is not affiliated with, sponsored, or endorsed by Fria Ligan AB. This Supplement was created under Fria Ligan AB’s [Dragonbane Third Party Supplement License](https://freeleaguepublishing.com/wp-content/uploads/2023/11/Dragonbane-License-Agreement.pdf).

![A Supplement For Dragonbane](https://raw.githubusercontent.com/Kergalli/dragonbane_macros/refs/heads/main/dragonbane-license-logo-red.png)
