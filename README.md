# 🐉 Dragonbane Status Effects

[![Foundry Version](https://img.shields.io/badge/Foundry-V12-informational)](https://foundryvtt.com/)
[![Module Version](https://img.shields.io/badge/Version-1.0.9-brightgreen)](https://github.com/Kergalli/dragonbane-status-effects/releases)
[![License](https://img.shields.io/badge/License-MIT-green)](https://github.com/Kergalli/dragonbane-status-effects/blob/main/LICENSE)

**Dragonbane Status Effects** provides a comprehensive status effects library with visual editors, enhanced Token HUD styling, and seamless system integration for the Dragonbane RPG system in Foundry VTT V12.

**NOTE**: With the release of [Dragonbane v3.0](https://github.com/pafvel/dragonbane/releases/tag/v3.0.0), and the removal of support for Foundry v11/v12, this branch will no longer be updated. Future updates will only apply to the [main/v13 compatible](https://github.com/Kergalli/dragonbane-status-effects) branch.

---

## 🚀 **Installation**

### **From Foundry (Recommended)**

1. Open Foundry VTT → **Add-on Modules** → **Install Module**
2. Paste manifest URL: `https://github.com/Kergalli/dragonbane-status-effects/releases/download/v1.0.9/module.json`
3. Click **Install** → Enable in **Manage Modules**

### **Manual Installation**

1. Download v1.0.9 release from [GitHub repository](https://github.com/Kergalli/dragonbane-status-effects/releases/tag/v1.0.9)
2. Extract to `Data/modules/` directory → Restart Foundry → Enable module

---

## ✨ **Key Features**

### 🎨 **Enhanced Token HUD**

- **Beautiful 6-column grid layout** with color-coded section headers
- **Visual organization** by effect categories (General, Spell, Heroic Abilities)
- **Seamless integration** with Foundry V12's interface
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

### 🔄 **Foundry V12 Stability**

- **Full V12 compatibility** with stable APIs
- **Reliable performance** with extensive testing
- **Backward compatibility** with existing V12 workflows

---

## 📊 **Status Effects Library**

| Category                    | Count | Examples                                     | Special Features                              |
| --------------------------- | ----- | -------------------------------------------- | --------------------------------------------- |
| **🛡️ General Effects**      | 27    | Amnesia, Blind, Burning, Poison, Prone, Rage | Core gameplay conditions                      |
| **✨ Spell Effects**        | 9     | Birdsong, Frozen, Protector, Stone Skin      | **Longstrider** with active movement doubling |
| **⚔️ Heroic Abilities**     | 5     | Berserk, Disguised, Musician effects         | Character ability enhancements                |
| **💪 Attribute Conditions** | 6     | STR/CON/AGL/INT/WIL/CHA Damaged              | Auto-integrated from Dragonbane system        |

### **Featured Effects**

- **Longstrider**: Includes active effect that automatically doubles movement speed (requires Dragonbane Combat Assistant)
- **Attribute Conditions**: Direct integration with Dragonbane system conditions
- **Poison Variants**: Lethal, Paralyzing, and Sleeping poison types
- **Combat States**: Grappled, Ensnared, Prone, Unconscious, Petrified with visual clarity

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

**📥 Example Import**: [English descriptions file](https://www.dropbox.com/scl/fi/ei2rvsgxfaynkligrhgj2/dragonbane-status-descriptions-2025-12-22.json?rlkey=i97wknkfvhdogvqev7rsqw00o&dl=0)

---

## 🔗 **Integration & Compatibility**

### **System Requirements**

| Requirement           | Version | Notes                                          |
| --------------------- | ------- | ---------------------------------------------- |
| **Foundry VTT**       | v12     | Stable V12 support - for V13 use v2.x releases |
| **Dragonbane System** | v2.0.0+ | Required for attribute condition integration   |

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
- **YZE Combat** requires "Single Action" feature enabled for full integration

---

## 🛠️ **Troubleshooting**

### **Common Issues & Solutions**

| Issue                            | Solution                                                |
| -------------------------------- | ------------------------------------------------------- |
| **Custom effects not appearing** | Click "Save All Effects" in editor → Reload world       |
| **Token HUD not styled**         | Enable "Enhanced Token HUD Layout" in module settings   |
| **Longstrider not working**      | Requires Dragonbane Combat Assistant for active effects |
| **Token HUD conflicts**          | Disable Monk's Little Details Token HUD options         |

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
- **Community**: Dragonbane Discord Community

### **Attribution**

- **Icons**: [game-icons.net](https://game-icons.net) by Lorc, Delapouite, Skoll, and contributors
- **License**: [Creative Commons 3.0 BY](https://creativecommons.org/licenses/by/3.0/)
- **Inspiration**: Condition Lab & Triggler by Matheus Clemente

---

## ⚖️ **License & Disclaimer**

MIT License. This is an unofficial, fan-created module not affiliated with Free League Publishing. **Dragonbane™** is a trademark of Free League Publishing.
