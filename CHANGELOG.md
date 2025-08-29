# Changelog

All notable changes to the Dragonbane Status Effects module will be documented in this file.

## [2.0.0] - 2025-08-29

### 🚀 Major Release - Foundry V13 Compatibility

This major release brings full Foundry V13 compatibility while maintaining all existing features and functionality.

### ✨ Added - V13 Compatibility

**Core Architecture Updates**

- **Foundry V13 Support**: Complete compatibility with Foundry V13 while maintaining V12 feature parity
- **Modern Module Format**: Updated to esmodules architecture and V13 manifest format

**Token HUD Enhancements**

- **V13 DOM Compatibility**: Updated CSS selectors for V13's new Token HUD structure (`.palette.status-effects`)
- **Enhanced Layout Flexibility**: Token HUD works perfectly in both enhanced and default modes

### 🔧 Technical Improvements

**API Modernization**

- **Updated Deprecation Warnings**: All V13 deprecated functions updated to namespaced versions
  - `FormDataExtended` → `foundry.applications.ux.FormDataExtended`
  - `readTextFromFile` → `foundry.utils.readTextFromFile`
  - `renderTemplate` → `foundry.applications.handlebars.renderTemplate`
  - `saveDataToFile` → `foundry.utils.saveDataToFile`
  - `FilePicker` → `foundry.applications.apps.FilePicker.implementation`
  - `SettingsConfig` → `foundry.applications.settings.SettingsConfig`
  - `TextEditor` → `foundry.applications.ux.TextEditor.implementation`

**Editor Reliability**

- **FormApplication Maintained**: Kept stable FormApplication architecture instead of risky ApplicationV2 conversion
- **Drag-and-Drop Enhanced**: Improved @UUID link creation with V13-compatible TextEditor API
- **Import/Export Stability**: All file operations use V13-compatible utilities

### 📋 Breaking Changes

**Status Effect ID Format**

- **Effect IDs Updated**: All built-in effect IDs changed from dots to hyphens for V13 compatibility
  - V12: `dse.burning`, `dse.blind`, `dse.cold` → V13: `dse-burning`, `dse-blind`, `dse-cold`
  - **Impact**: Active effects on tokens will need to be reapplied
  - **Impact**: Custom descriptions will need to be re-entered or manually migrated
  - **Impact**: Built-in effect customizations will need to be reconfigured
- **Minimum Foundry**: Now requires Foundry V13 (use v1.x for V12 compatibility)
- **Module Version**: Bumped to 2.0.0 to reflect major Foundry version support change

### 🔄 Migration Notes

**From V12 to V13**

- **Seamless from v1.0.2**: Users upgrading from v1.0.2 (V12 with hyphens) will experience seamless migration with no breaking changes
- **Breaking from v1.0.1**: Users upgrading directly from v1.0.1 (V12 with dots) will experience breaking changes due to ID format differences
- **Effect ID Changes**: The dot-to-hyphen change was required for V13's HandlebarsApplicationMixin compatibility
- **Why This Change**: V13's template rendering system cannot handle object paths with dots in property names

---

## [1.0.1] - 2025-08-23

- **Prone Condition**: Updated id to match the Dragonbane system so application of boon and extra damage occurs when attacking a prone target.

## [1.0.0] - 2025-08-23

### 🎉 Major Release - Complete Status Effects Management System

This is the first major release of Dragonbane Status Effects, featuring a comprehensive status effects management system with visual editors, enhanced Token HUD, and Dragonbane integration.

### ✨ Added - Major Features

**Visual Editors**

- **Custom Status Effects Editor**: Visual interface for creating, editing, and managing custom status effects without JSON editing
- **Built-in Effects Editing**: Toggle "Show Built-in Effects" to customize any built-in effect's icon, name, duration, and category
- **Status Effect Description Editor**: Rich text editor with drag-and-drop @UUID link creation for items, spells, and journal entries (create line breaks with `<br>`)
- **Import/Export System**: Full backup and restore functionality with validation and error handling for both custom effects and descriptions

**Comprehensive Status Effects Library**

- **25+ General Status Effects**: Amnesia, Blind, Burning, Cold, Concentration, Dead, Disease, Drowning, Ensnared, Famished, Flying, Grappled, Invisible, Mounted, Nightmares, Over-Encumbered, Paralyzed, Poison (Lethal/Paralyzing/Sleeping), Prone, Rage, Sleeping, Sleep Deprived, Unconscious, Wild Panic
- **9 Spell Status Effects**: Birdsong, Chill, Enchanted Weapon, Frozen, Heat, Longstrider, Power Fist, Protector, Stone Skin
- **5 Heroic Ability Effects**: Berserk, Disguised, Musician (Bane), Musician (Boon), Wolfkin Prey

**Enhanced Token HUD**

- **6-Column Responsive Grid Layout**: Perfect for displaying attribute conditions
- **Organized Section Headers**: Attribute Conditions, General Effects, Spell Effects, Heroic Abilities with color-coded styling
- **Sleek Styling**: Modern dark theme with hover effects, transitions, and visual feedback
- **Alphabetical Organization**: Effects sorted alphabetically within categories for easy browsing

**Advanced Configuration**

- **Visual Settings Interface**: Professional settings with editor menu buttons
- **Flexible Toggle Options**: Control visibility of spell effects, heroic abilities, and Token HUD styling

### 🎨 Enhanced - Improvements

**Dragonbane System Integration**

- **Direct Condition Integration**: Seamless integration with Dragonbane's attribute conditions (STR, CON, AGL, INT, WIL, CHA) using official system artwork
- **Real-time State Synchronization**: Condition states automatically sync with character sheet changes without manual refresh
- **Hidden for Monsters & NPCs**: Attribute conditions do not show for Monsters or NPCs
- **YZE Combat Compatibility**: Preserves all YZE Combat action tracking functionality without interference

---
