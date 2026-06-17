# Changelog

All notable changes to the Dragonbane Status Effects module will be documented in this file.

## [3.0.0] - 2026-06-16

### 🚀 Major Release - Foundry V14 & Dragonbane v4.x Compatibility

This major release brings full Foundry V14 compatibility and updates the module to the Dragonbane system v4.0.1. This is a clean cut to V14 — v3.x targets Foundry V14 only.

### ✨ Added - V14 Compatibility

**Active Effect Schema Migration**

- **V14 Active Effect Format**: Effect changes migrated to the Foundry V14 schema — string-typed change modes (`type`) replace the numeric `mode`, and changes are stored on `system.changes`
  - **Longstrider**: The movement-doubling active effect is updated to apply correctly through the rewritten Dragonbane v4 effects pipeline
- **Native Custom Keys**: Custom active-effect keys now apply correctly under Dragonbane v4, which removed the previous hardcoded key restrictions

### 🔧 Technical Improvements

- **Effect Injection Updated**: The `preCreateActiveEffect` hook now writes injected changes to `system.changes` (V14) instead of the legacy top-level `changes` array
- **Active Effect Phase Handling**: Injected changes are now stamped with the correct application phase (matching Dragonbane v4's pipeline) at creation time, so attribute modifiers like Longstrider's movement doubling apply correctly
- **Token HUD V14 Layout**: Adjusted Token HUD styling for V14's status-effects palette so the full effect grid displays without scrolling or background clipping
- **DialogV2 Migration**: Converted confirmation dialogs (Token HUD Clear All, custom effects editor) from the deprecated V1 `Dialog` to `DialogV2`
- **Compatibility Band**: Foundry minimum/verified/maximum set to V14 (14.364); Dragonbane system requirement raised to v4.0.0+ (verified 4.0.1)

### 📋 Breaking Changes

**Foundry V14 Required**

- **Minimum Foundry**: Now requires Foundry V14 and Dragonbane v4.x
  - **Impact**: Not compatible with Foundry V13 / Dragonbane v3.x. There is no build spanning both
  - **Impact**: V13 users should stay on the v2.x line; V12 users on v1.x
- **Custom Effects with Functional Changes**: Any custom effect authored with a change array in the old numeric `mode` format must be re-saved in the Custom Effects Editor to apply under v3.0.0
  - **Impact**: Built-in effects (including Longstrider) are updated automatically — this only affects user-authored custom effects that defined a functional `changes` array

---

## [2.0.9] - 2025-01-03

### 🐛 Bug Fixes

**Description Editor - Attribute Conditions Support**

- **Fixed Import/Export/Clear Operations for Attribute Conditions**: Resolved issue where Attribute condition descriptions were not properly handled by the description editor's import, export, and clear all operations
  - **Import**: Attribute condition descriptions now properly import from JSON files
  - **Export**: Attribute condition descriptions now properly export to JSON files
  - **Clear All**: Attribute conditions now properly clear when using "Clear All Descriptions"

---

## [2.0.8] - 2026-01-01

### ✨ Added - Attribute Conditions Descriptions

**Custom Descriptions Expansion**

- Added the ability to define custom descriptions for Attribute conditions in the description editor (contribution by **dgladkov**)
- Updated example import [English descriptions file](https://github.com/Kergalli/dragonbane_macros/blob/main/status-effect-descriptions)

### 🌍 Localization Improvements

#### 🇮🇹 Italian Language Support

- **Italian Localization**: Complete Italian translation now available (contribution by **LuckyFrico**)
- **Full Coverage**: All settings, actions, combat rules, journey actions, and UI elements fully translated

---

## [2.0.7] - 2025-12-22

### 🐛 Bug Fixes

**Petrified Status Effect Icon**

- **Fixed Icon Path**: Corrected Petrified status effect to use custom module icon instead of non-existent core Foundry icon
  - Changed from `icons/svg/stone.svg` to `modules/dragonbane-status-effects/assets/icons/petrified.svg`

---

## [2.0.6] - 2025-12-22

### ✨ Added - New Status Effects

**General Effects Expansion**

- **Deafened**: New status effect for characters unable to hear
- **Petrified**: New status effect for characters turned to stone

---

## [2.0.5] - 2025-11-03

### 🐛 Bug Fixes

**Blind Status Effect**

- **Fixed Blind Effect Integration**: Resolved compatibility issues with the blind status effect in the Token HUD
  - **Impact**: Blind status now properly handles blinded token effects in alignment with core Foundry

---

## [2.0.4] - 2025-11-01

### 🐛 Bug Fixes

**Invisibility Status Effect**

- **Fixed Invisibility Effect Integration**: Resolved compatibility issues with the invisibility status effect in the Token HUD
  - **Impact**: Invisibility status now properly handles hidden token effects in alignment with core Foundry

### 🎨 Enhanced - UI/UX Improvements

**Token HUD Size Optimization**

- **Reduced Overall HUD Size**: Optimized CSS styling to create a more compact Token HUD that better integrates with core Foundry
  - **Smaller Icon Spacing**: Reduced gaps and padding for a more streamlined appearance
  - **Foundry Alignment**: Brought icon sizing and positioning in line with core Foundry VTT standards

---

## [2.0.3] - 2025-10-14

### ✨ Added - New Features

**Active Effect Integration (V13 Only)**

- **Basic Architecture**: Added the ability to create active effects via contants.js
  - Not many spells or effects easily lend themselves to simple active effects, but perhaps we will see more in the Book of Magic
  - Power level scaling and skill-specific limitations make simple active effects difficult

- **Example: Longstrider Spell**: Added active effect automation that doubles movement speed
  - Automatically applies 2x multiplier to `system.movement.value` when effect is active
  - Integrates seamlessly with Dragonbane character sheets, modified movement value is highlighted
  - Movement changes reflect immediately without manual calculation

**Action Button and Tracking (V13 Only)**

- **YZE Combat Integration**: Full compatibility with YZE Combat's action tracking system
  - Action button now shows available actions for all actor types
  - Actions are assignable through the button in the Token Action HUD, the combat tracker, or via Dragonbane Combat Assistant's auto-tracking
  - Make sure Single Action is enabled in the YZE Combat module
  - Right-click the action button to remove all action markers at once

### 🐛 Bug Fixes

- Corrected color of Attribute Conditions header in HUD

---

## [2.0.2] - 2025-10-09

### 🐛 Bug Fixes

- Fixed download URL in module.json

---

## [2.0.1] - 2025-10-09

### 🐛 Bug Fixes

**Dead Status Effect Integration**

- **Fixed Dead Status ID**: Changed from custom `dse-dead` to core `dead` ID to match Dragonbane system automation
  - **Impact**: NPCs and Monsters are now correctly marked as dead when reaching 0 HP after damage application (requires "Automate NPC/Monster Death" setting enabled in Dragonbane system)

### ✨ Added - Quality of Life Improvements

**Token HUD Enhancements**

- **Clear All Button**: Added "Clear All" button at bottom of Token HUD status effects panel
  - Removes all active status effects from selected token with confirmation dialog

**Custom Effects Editor Improvements (V13 Only)**

- **Icon Selection Clarity**: Improved visual feedback for icon selection when creating custom effects
  - Changed text to Select Icon
  - Changes placeholder icon to cancel.svg to better indicate no icon is currently selected.

---

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

## [1.0.4] - 2025-10-09

### 🐛 Bug Fixes

Fixed download URL in module.json

---

## [1.0.3] - 2025-10-09

### 🐛 Bug Fixes

**Dead Status Effect Integration**

- **Fixed Dead Status ID**: Changed from custom `dse-dead` to core `dead` ID to match Dragonbane system automation
  - **Impact**: NPCs and Monsters are now correctly marked as dead when reaching 0 HP after damage application (requires "Automate NPC/Monster Death" setting enabled in Dragonbane system)

### ✨ Added - Quality of Life Improvements

**Token HUD Enhancements**

- **Clear All Button**: Added "Clear All" button at bottom of Token HUD status effects panel
  - Removes all active status effects from selected token with confirmation dialog

---

## [1.0.2] - 2025-08-29

## Foundry V12 Legacy Release

⚠️ **Breaking Changes**: Custom effect IDs changed from `dse.` to `dse-` format

### What's Changed

- Updated all custom status effect IDs to use hyphens instead of dots
- Prepares for smooth V13 migration
- Users will need to reapply existing custom effects

### Installation

Compatible with Foundry V12. For V13 support, use v2.0.0+.

---

## [1.0.1] - 2025-08-23

- **Prone Condition**: Updated id to match the Dragonbane system so application of boon and extra damage occurs when attacking a prone target.

---

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
