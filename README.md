# Dragonbane Status Effects

A comprehensive Foundry VTT module that enhances the status effects system for the Dragonbane RPG with beautiful theming, organized Token HUD, and seamless system integration.

## ✨ Features

### 🎨 Comprehensive Status Effects
- **22+ General Effects**: Blind, Burning, Cold, Concentration, Dead, Disease, Drowning, Encumbered, Ensnared, Famished, Flight, Invisible, Paralyzed, Poison variants (Lethal, Paralyzing, Sleeping), Prone, Rage, Sleeping, Sleep Deprived, Unconscious, Wild Panic
- **7 Spell Effects**: Birdsong, Floral Trail, Heat, Longstrider, Power Fist, Protector, Stone Skin  
- **2 Heroic Ability Effects**: Berserk, Wolfkin Prey
- **Custom Effects Support**: Add your own effects via JSON configuration

### 🖼️ Enhanced Token HUD
- **6-Column Responsive Grid**: Automatically adapts to different screen sizes (6→4→3 columns)
- **Organized Sections**: Attribute Conditions, General Effects, Spell Effects, Heroic Abilities
- **Sleek Styling**: Modern dark theme with hover effects and visual feedback
- **Category Color Coding**: Visual distinction between effect types

### 🐉 Dragonbane Integration
- **Seamless Condition Handling**: Direct integration with Dragonbane's attribute conditions (STR, CON, AGL, INT, WIL, CHA)
- **Real-time Updates**: Condition states sync automatically with character sheet changes
- **System Compatibility**: Preserves all existing Dragonbane and YZE Combat functionality

### ⚙️ Flexible Configuration
- **Module Settings**: Toggle spell/ability effects, customize Token HUD, replace default effects
- **Custom Effects**: Define your own status effects with JSON
- **User-Friendly UI**: Enhanced settings interface with examples and validation

## 📋 Requirements

- **Foundry VTT**: v11 minimum, verified for v12+
- **Dragonbane System**: v2.0.0+ (required)

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

### Custom Effects
Define your own status effects using JSON format:

```json
[{"id":"custom-stunned","name":"Custom Stunned","img":"icons/svg/daze.svg","category":"general"},{"id":"magic-shield","name":"Magic Shield","img":"icons/svg/shield.svg","category":"spell"}]
```

**Valid Categories**: `general`, `spell`, `ability`

## 🤝 Compatibility

- ✅ **Dragonbane System**: Full integration with conditions and mechanics
- ✅ **YZE Combat**: Preserves action tracking functionality  
- ✅ **Other Modules**: Non-interfering design works with most modules

## 🐛 Troubleshooting

### Common Issues

**Token HUD not styled**: Check that "Enhanced Token HUD Layout" is enabled in settings.

**Custom effects error**: Validate your JSON syntax using an online JSON validator.

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## 🤝 Contributing

Found a bug or have a suggestion for a new effect? Please [open an issue](https://github.com/Kergalli/dragonbane-status-effects/issues) on GitHub.

## 📄 License

This module is available under the MIT License. See the LICENSE file for details.

## 🎨 Credits & Attribution

**Icons**: Some icons used in this module are from [game-icons.net](https://game-icons.net), created by **Lorc**, **Delapouite**, **Skoll**, and other contributors. Available under [Creative Commons 3.0 BY](https://creativecommons.org/licenses/by/3.0/) license.

---

**Dragonbane** is a trademark of Free League Publishing. This module is not affiliated with or endorsed by Free League Publishing.