# Changelog

All notable changes to the Dragonbane Status Effects module will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-22

### Added
- Initial release of Dragonbane Status Effects module
- **Test Effect**: Single test status effect to validate functionality
  - ID: `test-effect`
  - Name: "Test Effect" 
  - Description: "This is a test effect to see if things work"
  - Icon: `icons/svg/anchor.svg`
- Module settings for customization:
  - Toggle to replace all status effects vs. add to existing
- **Clean separation approach**: Module only handles theming, not functional effects
- Dragonbane system dependency validation
- English language support for module settings
- Compatibility with Foundry v11+ (verified v12)

### Design Philosophy
- **Focused scope**: Replace default Foundry status effects with Dragonbane-themed versions
- **Non-interference**: Allow Dragonbane system to add its own condition effects
- **YZE Combat compatible**: Allow YZE Combat to add its own action tracking effects
- **No conflicts**: Avoid replicating or interfering with other module functionality

### Technical Details
- Single JavaScript file architecture for simplicity
- Dragonbane system dependency validation
- Simple status effect replacement without complex integration
- Settings-driven customization
- Clean module loading order

### Known Issues
- None at initial release

### Compatibility Notes
- Requires Dragonbane system v1.9.0+
- **Does not interfere** with Dragonbane system condition functionality
- **Does not interfere** with Year Zero Engine: Combat module
- Tested with Foundry VTT v12
- Compatible with other status effect modules (no conflicts expected)

---

## Future Planned Features

### [1.1.0] - Planned
- Additional Dragonbane-themed status effects to replace common Foundry defaults:
  - Dead → Dragonbane-themed death effect
  - Unconscious → Dragonbane-themed unconscious
  - Stunned → Dragonbane-themed stunned
  - Poisoned → Dragonbane-themed poisoned
  - Prone → Dragonbane-themed prone
  - Blinded → Dragonbane-themed blinded

### [1.2.0] - Planned
- Custom icon artwork for themed effects
- Additional language translations
- More comprehensive Dragonbane theming

### Long-term Roadmap
- Community-submitted themed effects
- Integration with Dragonbane artwork style
- Optional sound effects for themed status changes
- Macro support for quick status application