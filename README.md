# Dragonbane Status Effects

A simple Foundry VTT module that replaces the default Foundry status effects with Dragonbane-themed effects while allowing the Dragonbane system and other modules to add their own functional effects.

## Purpose

This module focuses on **theming** rather than functionality:
- **Replaces default Foundry effects** (Dead, Unconscious, Stunned, etc.) with Dragonbane-themed versions
- **Allows Dragonbane system** to add its functional condition effects (Exhausted, Sickly, etc.) as normal
- **Allows YZE Combat** to add its action tracking effects as normal
- **Avoids conflicts** by not interfering with other module functionality

## Features

### Custom Dragonbane-Themed Effects
Currently includes:
- **Test Effect** - A test effect to verify functionality

### Module Compatibility
- **Dragonbane system conditions** - Added by the system itself (Exhausted, Sickly, Dazed, Angry, Scared, Disheartened)
- **YZE Combat actions** - Added by YZE Combat module if installed (action tracking)
- **No interference** - Other modules work exactly as intended

## Requirements

- **Foundry VTT**: v11 minimum, verified for v12
- **Dragonbane System**: v1.9.0+ (required)

## Installation

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

## Configuration

The module includes one setting accessible through **Game Settings > Module Settings**:

- **Replace Default Status Effects**: When enabled (default), replaces all Foundry default status effects with Dragonbane-themed effects. When disabled, adds Dragonbane effects to the existing list.

## How It Works

1. **Module loads** and replaces default Foundry status effects
2. **Dragonbane system loads** and adds its condition effects
3. **YZE Combat loads** (if installed) and adds its action effects
4. **Result**: Themed default effects + functional system effects

## Usage

1. Enable the module in your world
2. Configure settings as desired
3. Reload your world
4. Status effects will now include:
   - Custom Dragonbane-themed effects (replacing Foundry defaults)
   - Dragonbane condition effects (added by system)
   - YZE Combat action effects (added by YZE Combat if installed)

## Development

This module follows a simple, focused approach:
1. **Validates Dragonbane system compatibility**
2. **Registers minimal settings**
3. **Defines custom themed status effects**
4. **Replaces default Foundry status effects**
5. **Stays out of the way** of other modules

## Changelog

### Version 1.0.0
- Initial release
- Test Effect for validation
- Simple status effect replacement
- Dragonbane system integration
- Clean separation from functional effects

## Contributing

Found a bug or have a suggestion? Please [open an issue](https://github.com/Kergalli/dragonbane-status-effects/issues) on GitHub.

## License

This module is available under the MIT License. See the LICENSE file for details.

Dragonbane is a trademark of Free League Publishing. This module is not affiliated with or endorsed by Free League Publishing.