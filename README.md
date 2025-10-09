# 🐉 Dragonbane Status Effects

[![Foundry Version](https://img.shields.io/badge/Foundry-V13-informational)](https://foundryvtt.com/)
[![Module Version](https://img.shields.io/badge/Version-2.0.1-brightgreen)](https://github.com/Kergalli/dragonbane-status-effects/releases)
[![License](https://img.shields.io/badge/License-MIT-green)](https://github.com/Kergalli/dragonbane-status-effects/blob/main/LICENSE)

A comprehensive status effects module for the **Dragonbane** system in **Foundry Virtual Tabletop V13**. This module provides 39 carefully curated status effects with visual editors, enhanced Token HUD styling, and seamless Dragonbane system integration.

## ✨ Key Features

- **🎨 Enhanced Token HUD**: Beautiful 6-column grid layout with color-coded section headers
- **📝 Visual Editors**: No-code interfaces for creating custom effects and descriptions
- **🐉 Dragonbane Integration**: Direct support for attribute conditions (STR, CON, AGL, INT, WIL, CHA)
- **📚 Rich Status Library**: 39 pre-built effects across General, Spell, and Heroic Ability categories
- **💾 Import/Export**: Backup and share your custom effects and descriptions
- **🔄 Drag & Drop**: Create @UUID links by dragging items, spells, and journal entries

## 📋 System Requirements

- **Foundry VTT**: V13 (for V12 support, use v1.x releases)
- **Game System**: Dragonbane v2.0.0+
- **Dependencies**: None

## 🚀 Installation

### From Foundry (Recommended)

1. Open Foundry VTT and go to the **Add-on Modules** tab
2. Click **Install Module**
3. Paste this manifest URL: `https://github.com/Kergalli/dragonbane-status-effects/releases/latest/download/module.json`
4. Click **Install**

### Manual Installation

1. Download the latest release from the [GitHub repository](https://github.com/Kergalli/dragonbane-status-effects)
2. Extract the zip file to your `Data/modules/` directory
3. Restart Foundry VTT
4. Enable the module in your world's **Manage Modules** settings

## ⚙️ Configuration

Access settings through **Game Settings → Module Settings → Dragonbane Status Effects**:

### Core Settings

- **Replace Default Status Effects**: Replace Foundry defaults with Dragonbane-themed effects
- **Enhanced Token HUD Layout**: Enable the styled 6-column grid with section headers
- **Show Spell Effects**: Include spell-related status effects
- **Show Heroic Abilities**: Include heroic ability status effects

### Visual Editors

- **Manage Custom Status Effects**: Open the visual editor to create, edit, and manage custom status effects
- **Edit Status Effect Descriptions**: Add rich descriptions that work with Visual Active Effects, Dfreds Effects Panel and other modules - example English import file can be [found here](https://www.dropbox.com/scl/fi/6heeaoc5x43nepq5tbyri/dragonbane-status-descriptions-2025-08-28.json?rlkey=vykv4gfcciogwvrqcaflexig2&dl=0)

## 🎯 Using the Editors

### Custom Effects Editor (Make sure to click Save All Effects after you finished adding, deleting, and editing effects)

1. **Open**: Game Settings → Dragonbane Status Effects → "Open Custom Effects Editor"
2. **Create**: Click "Add Effect" to create new status effects
3. **Edit**: Click the edit button on any existing effect
4. **Delete**: Remove unwanted effects with confirmation dialogs
5. **Save**: Use "Save All Effects" to apply changes (requires reload)
6. **Backup**: Export/import your custom effects as JSON files

### Description Editor

1. **Open**: Game Settings → Dragonbane Status Effects → "Open Description Editor"
2. **Add Descriptions**: Type rich descriptions for any status effect
3. **Create Links**: Drag items, spells, or journal entries directly into text fields to create @UUID links (create line breaks with `<br>`)
4. **Save**: Changes apply immediately to new effects
5. **Backup**: Export/import descriptions for sharing between worlds

## 📊 Status Effects Library

### 🛡️ General Effects (25)

Amnesia, Blind, Burning, Cold, Concentration, Dead, Disease, Drowning, Ensnared, Famished, Flying, Grappled, Invisible, Mounted, Nightmares, Over-Encumbered, Paralyzed, Poison (Lethal), Poison (Paralyzing), Poison (Sleeping), Prone, Rage, Sleeping, Sleep Deprived, Unconscious, Wild Panic

### ✨ Spell Effects (9)

Birdsong, Chill, Enchanted Weapon, Frozen, Heat, Longstrider, Power Fist, Protector, Stone Skin

### ⚔️ Heroic Abilities (5)

Berserk, Disguised, Musician (Bane), Musician (Boon), Wolfkin Prey

### 💪 Attribute Conditions (6)

Strength Damaged, Constitution Damaged, Agility Damaged, Intelligence Damaged, Willpower Damaged, Charisma Damaged _(automatically integrated from Dragonbane system)_

## 🔧 Foundry V13 Compatibility

### ✅ What's New in V13

- **Full V13 Support**: Complete compatibility with Foundry VTT V13's new architecture
- **Modern APIs**: Updated to use V13's namespaced functions and improved error handling
- **Enhanced Stability**: Defensive filtering prevents V13-specific rendering issues
- **ID Format Update**: Effect IDs changed from dots to hyphens for V13 template compatibility

### 🔄 Upgrading from V12

- **⚠️ Migration Path Matters**:
  - **From v1.0.2**: Seamless upgrade with no breaking changes
  - **From v1.0.1**: Breaking changes due to status effect ID format differences
- **ID Format Changes**: Effect IDs use hyphens in v1.0.2+ for V13 template compatibility
- **Version Requirement**: V13 users should use v2.x releases; V12 users should stay on v1.x releases

## ✅ Compatibility

### 🎯 Total Compatibility

- **Dragonbane System**: Complete integration with conditions and mechanics
- **YZE Combat**: Preserves action tracking functionality perfectly
- **Visual Active Effects**: Status effect descriptions work seamlessly
- **Dfreds Effects Panel**: Status effect descriptions work seamlessly

### ⚠️ Known Issues

**Condition Lab & Triggler**: Essentially trying to do the same thing, will conflict on several levels

**Monk's Little Details**: The Enhanced Token HUD Layout may conflict with some Monk's Little Details settings.

If status effect icons appear incorrectly, disable these options in Monk's Little Details:

- "Alter the Token HUD status effects"
- "Clear All"
- "Highlight Token HUD status effects"

## 🛠️ Troubleshooting

### Common Issues

**Custom effects not appearing**: Make sure to click "Save All Effects" in the Custom Effects Editor and reload the world.

**Token HUD not styled**: Check that "Enhanced Token HUD Layout" is enabled in module settings.

**Token effects disappeared after V13 upgrade**: This is expected due to the ID format change. Simply reapply the effects - they'll work correctly with the new format.

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## 🤝 Contributing

Found a bug or have a suggestion? Please [open an issue](https://github.com/Kergalli/dragonbane-status-effects/issues) on GitHub.

## 📄 License

This module is available under the MIT License. See the LICENSE file for details.

## 🎨 Credits & Attribution

**Icons**: Some icons used in this module are from [game-icons.net](https://game-icons.net), created by **Lorc**, **Delapouite**, **Skoll**, and other contributors. Available under [Creative Commons 3.0 BY](https://creativecommons.org/licenses/by/3.0/) license.

**Inspiration**: The Dragonbane Discord Community and [Condition Lab & Triggler](https://foundryvtt.com/packages/condition-lab-triggler) by Matheus Clemente

---

**Dragonbane** is a trademark of Free League Publishing. This module is not affiliated with or endorsed by Free League Publishing.
