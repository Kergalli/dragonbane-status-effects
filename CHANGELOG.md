# Changelog

All notable changes to the Dragonbane Status Effects module will be documented in this file.

## [1.0.0] - 2025-08-22

### 🎉 Major Release - Complete Status Effects System

This is the first full release of Dragonbane Status Effects, featuring a comprehensive status effects management system with Dragonbane integration.

### ✨ Added - Core Features

**Comprehensive Status Effects**
- **22 General Status Effects**: Blind, Burning, Cold, Concentration, Dead, Disease, Drowning, Encumbered, Ensnared, Famished, Flight, Invisible, Paralyzed, Poison (Lethal), Poison (Paralyzing), Poison (Sleeping), Prone, Rage, Sleeping, Sleep Deprived, Unconscious, Wild Panic
- **7 Spell Status Effects**: Birdsong, Floral Trail, Heat, Longstrider, Power Fist, Protector, Stone Skin
- **2 Heroic Ability Effects**: Berserk, Wolfkin Prey
- **Custom Effects Support**: JSON-based custom effect definition system

**Enhanced Token HUD**
- **6-Column Responsive Grid Layout**: Automatically adapts to screen size (6→4→3 columns)
- **Organized Section Headers**: Attribute Conditions, General Effects, Spell Effects, Heroic Abilities
- **Sleek Styling**: Modern dark theme with hover effects, transitions, and visual feedback
- **Category Color Coding**: Visual distinction between effect types with colored borders

**Dragonbane System Integration**
- **Direct Condition Integration**: Seamlessly integrates with Dragonbane's attribute conditions (STR, CON, AGL, INT, WIL, CHA)
- **Real-time State Synchronization**: Condition states automatically sync with character sheet changes
- **Authentic Dragonbane Icons**: Uses official Dragonbane system condition artwork

### ⚙️ Added - Configuration & Settings

**Flexible Module Settings**
- **Replace Default Status Effects**: Toggle between replacing or adding to Foundry defaults
- **Enhanced Token HUD Layout**: Enable/disable the professional Token HUD styling
- **Show Spell Effects**: Control visibility of spell-related status effects
- **Show Heroic Abilities**: Control visibility of heroic ability status effects

### 🔧 Technical Details

**System Compatibility**
- **Dragonbane System**: v2.0.0+ required for full functionality
- **Foundry VTT**: v11 minimum, verified for v12+
- **YZE Combat Compatibility**: Preserves all YZE Combat action tracking functionality
- **Non-interfereing Design**: Works alongside other modules without conflicts

---