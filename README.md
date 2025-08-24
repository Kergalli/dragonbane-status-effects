# Dragonbane Status Effects

A comprehensive Foundry VTT module that enhances the status effects system for the Dragonbane RPG with sleek theming, visual editors, organized Token HUD, and seamless system integration.

## ✨ Features

### 🎨 Comprehensive Status Effects
- **25+ General Effects**: Blind, Burning, Cold, Concentration, Dead, Disease, Drowning, Encumbered, Ensnared, Famished, Flight, Grappled, Invisible, Mounted, Paralyzed, Poison variants (Lethal, Paralyzing, Sleeping), Prone, Rage, Sleeping, Sleep Deprived, Unconscious, Wild Panic, and more
- **8 Spell Effects**: Birdsong, Chill, Enchanted Weapon, Floral Trail, Heat, Longstrider, Power Fist, Protector, Stone Skin  
- **5 Heroic Ability Effects**: Berserk, Disguised, Musician (Bane/Boon), Wolfkin Prey
- **Custom Effects Support**: Create unlimited custom effects with the visual editor

### 🛠️ Visual Editors
- **Custom Effects Editor**: Visual interface for creating, editing, and managing custom status effects - no more JSON editing!
- **Description Editor**: Add rich descriptions to status effects with drag-and-drop support for creating @UUID links to items, spells, and journal entries
- **Import/Export**: Full backup and restore functionality for both custom effects and descriptions

### 🖼️ Enhanced Token HUD
- **6-Column Responsive Grid**: Automatically adapts to different screen sizes (6→4→3 columns)
- **Organized Sections**: Attribute Conditions, General Effects, Spell Effects, Heroic Abilities with color-coded headers
- **Sleek Styling**: Modern dark theme with hover effects, transitions, and visual feedback
- **Smart Organization**: Alphabetically sorted effects with category-based grouping

### 🐉 Dragonbane Integration
- **Seamless Condition Handling**: Direct integration with Dragonbane's attribute conditions (STR, CON, AGL, INT, WIL, CHA)
- **Real-time Updates**: Condition states sync automatically with character sheet changes
- **System Compatibility**: Preserves all existing Dragonbane and YZE Combat functionality

### ⚙️ Configuration
- **Visual Settings Interface**: Easy-to-use settings with editor menus instead of complex JSON
- **Flexible Options**: Toggle spell/ability effects, customize Token HUD, replace default effects
- **Data Management**: Robust import/export with validation and error handling
- **Multi-language Support**: Full English and Swedish localization

## 📋 Requirements

- **Foundry VTT**: v11 minimum, verified for v12+
- **Dragonbane System**: v2.0.0+ (required for full functionality)

## 🚀 Installation

### Automatic Installation
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
- **Enhanced Token HUD Layout**: Enable the beautiful 6-column grid with section headers
- **Show Spell Effects**: Include spell-related status effects
- **Show Heroic Abilities**: Include heroic ability status effects

### Visual Editors
- **Manage Custom Status Effects**: Open the visual editor to create, edit, and manage custom status effects
- **Edit Status Effect Descriptions**: Add rich descriptions that work with Visual Active Effects and other modules

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
3. **Create Links**: Drag items, spells, or journal entries directly into text fields to create @UUID links
4. **Save**: Changes apply immediately to new effects
5. **Backup**: Export/import descriptions for sharing between worlds

### ✅ Compatibility
- **Dragonbane System**: Complete integration with conditions and mechanics  
- **YZE Combat**: Preserves action tracking functionality perfectly
- **Visual Active Effects**: Status effect descriptions work seamlessly
- **Most Other Modules**: Non-interfering design

### ⚠️ Known Issues

**Monk's Little Details**: The Enhanced Token HUD Layout may conflict with some Monk's Little Details settings. If status effect icons appear incorrectly, disable these options in Monk's Little Details:
- "Alter the Token HUD status effects"  
- "Clear All"
- "Highlight Token HUD status effects"

## 🛠️ Troubleshooting

### Common Issues

**Custom effects not appearing**: Make sure to click "Save All Effects" in the Custom Effects Editor and reload the world.

**Token HUD not styled**: Check that "Enhanced Token HUD Layout" is enabled in module settings.

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