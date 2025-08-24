# Changelog

All notable changes to the Dragonbane Status Effects module will be documented in this file.

## [1.0.0] - 2025-08-23

### 🎉 Major Release - Complete Status Effects Management System

This is the first major release of Dragonbane Status Effects, featuring a comprehensive status effects management system with visual editors, enhanced Token HUD, and Dragonbane integration.

### ✨ Added - Major Features

**Visual Editors**
- **Custom Status Effects Editor**: Visual interface for creating, editing, and managing custom status effects without JSON editing
- **Status Effect Description Editor**: Rich text editor with drag-and-drop @UUID link creation for items, spells, and journal entries
- **Import/Export System**: Full backup and restore functionality with validation and error handling for both custom effects and descriptions

**Comprehensive Status Effects Library**
- **25+ General Status Effects**: Amnesia, Blind, Burning, Cold, Concentration, Dead, Disease, Drowning, Encumbered, Ensnared, Famished, Flight, Frozen, Grappled, Invisible, Mounted, Paralyzed, Poison (Lethal/Paralyzing/Sleeping), Prone, Rage, Sleeping, Sleep Deprived, Unconscious, Wild Panic
- **8 Spell Status Effects**: Birdsong, Chill, Enchanted Weapon, Floral Trail, Heat, Longstrider, Power Fist, Protector, Stone Skin
- **5 Heroic Ability Effects**: Berserk, Disguised, Musician (Bane), Musician (Boon), Wolfkin Prey

**Enhanced Token HUD**
- **6-Column Responsive Grid Layout**: Automatically adapts to screen size (6→4→3 columns)
- **Organized Section Headers**: Attribute Conditions, General Effects, Spell Effects, Heroic Abilities with color-coded styling
- **PSleek Styling**: Modern dark theme with hover effects, transitions, and visual feedback
- **Alphabetical Organization**: Effects sorted alphabetically within categories for easy browsing

**Advanced Configuration**
- **Visual Settings Interface**: Professional settings with editor menu buttons instead of complex JSON fields
- **Flexible Toggle Options**: Control visibility of spell effects, heroic abilities, and Token HUD styling

### 🎨 Enhanced - Improvements

**Dragonbane System Integration**
- **Direct Condition Integration**: Seamless integration with Dragonbane's attribute conditions (STR, CON, AGL, INT, WIL, CHA) using official system artwork
- **Real-time State Synchronization**: Condition states automatically sync with character sheet changes without manual refresh
- **YZE Combat Compatibility**: Preserves all YZE Combat action tracking functionality without interference

---