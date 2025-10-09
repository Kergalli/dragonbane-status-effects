# Changelog

All notable changes to the Dragonbane Status Effects module will be documented in this file.

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

### ⚠️ Breaking Changes

- **Custom Effect IDs Updated**: Changed all custom status effect IDs from dot notation (`dse.`) to hyphen notation (`dse-`) to improve compatibility and prepare for V13 migration
- **Migration Impact**: Existing custom effects using the old dot notation will need to be reapplied after updating to v1.0.2
- **Affected Effects**: All custom status effects (general, spell, and heroic ability categories) now use hyphenated IDs

**Examples of ID changes:**

- `dse.amnesia` → `dse-amnesia`
- `dse.poison-lethal` → `dse-poison-lethal`
- `dse.stone-skin` → `dse-stone-skin`

This change ensures smoother transition to the upcoming Foundry V13 version and follows better naming conventions for status effect identifiers. Example English import file can be [found here](https://www.dropbox.com/scl/fi/6heeaoc5x43nepq5tbyri/dragonbane-status-descriptions-2025-08-28.json?rlkey=vykv4gfcciogwvrqcaflexig2&dl=0)

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
