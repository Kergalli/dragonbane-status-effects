/**
 * Custom Dragonbane-themed status effects to replace default Foundry ones
 * Uses existing Dragonbane localization keys where possible for easy translation
 */
const CUSTOM_STATUS_EFFECTS = [
    // General Effects (appear first) - Mix of existing DoD keys and new EFFECT keys
    {
        id: "blind",
        name: "EFFECT.StatusBlind",
        icon: "icons/svg/blind.svg",
        category: "general"
    },
    {
        id: "burning",
        name: "EFFECT.StatusBurning",
        icon: "icons/svg/fire.svg",
        category: "general"
    },
    {
        id: "cold",
        name: "EFFECT.StatusCold",
        icon: "icons/svg/frozen.svg",
        category: "general"
    },
    {
        id: "concentration",
        name: "EFFECT.StatusConcentration",
        icon: "modules/dragonbane-status-effects/assets/icons/rear-aura.svg",
        category: "general"
    },
    {
        id: "dead",
        name: "EFFECT.StatusDead",  // Dragonbane handles this automatically
        icon: "icons/svg/skull.svg",
        category: "general"
    },
    {
        id: "disease",
        name: "EFFECT.StatusDisease",
        icon: "icons/svg/biohazard.svg",
        category: "general"
    },
    {
        id: "encumbered",
        name: "EFFECT.StatusEncumbered",
        icon: "icons/svg/anchor.svg",
        category: "general"
    },
    {
        id: "ensnared",
        name: "EFFECT.StatusEnsnared",
        icon: "icons/svg/net.svg",
        category: "general"
    },
    {
        id: "famished",
        name: "EFFECT.StatusFamished",
        icon: "modules/dragonbane-status-effects/assets/icons/stomach.svg",
        category: "general"
    },
    {
        id: "flight",
        name: "EFFECT.StatusFlight",
        icon: "icons/svg/wing.svg",
        category: "general"
    },
    {
        id: "invisible",
        name: "EFFECT.StatusInvisible",
        icon: "icons/svg/invisible.svg",
        category: "general"
    },
    {
        id: "paralyzed",
        name: "EFFECT.StatusParalyzed",
        icon: "icons/svg/paralysis.svg",
        category: "general"
    },
    {
        id: "poison",
        name: "EFFECT.StatusPoison",
        icon: "icons/svg/poison.svg",
        category: "general"
    },
    {
        id: "prone",
        name: "EFFECT.StatusProne",  // Dragonbane handles this automatically
        icon: "icons/svg/falling.svg",
        category: "general"
    },
    {
        id: "rage",
        name: "EFFECT.StatusRage",
        icon: "modules/dragonbane-status-effects/assets/icons/enrage.svg",
        category: "general"
    },
    {
        id: "sleep",
        name: "EFFECT.StatusAsleep",
        icon: "icons/svg/sleep.svg",
        category: "general"
    },
    {
        id: "sleep-deprived",
        name: "EFFECT.StatusSleepDeprived",
        icon: "modules/dragonbane-status-effects/assets/icons/tired-eye.svg",
        category: "general"
    },
    {
        id: "unconscious",
        name: "EFFECT.StatusUnconscious",
        icon: "icons/svg/unconscious.svg",
        category: "general"
    },
    {
        id: "wild-panic",
        name: "EFFECT.StatusWildPanic",
        icon: "modules/dragonbane-status-effects/assets/icons/screaming.svg",
        category: "general"
    },
    
    // Spell Effects (appear at bottom if enabled)
    {
        id: "birdsong",
        name: "EFFECT.StatusBirdsong",
        icon: "modules/dragonbane-status-effects/assets/icons/bird-twitter.svg",
        category: "spell"
    },
    {
        id: "floral-trail",
        name: "EFFECT.StatusFloralTrail",
        icon: "modules/dragonbane-status-effects/assets/icons/flowers.svg",
        category: "spell"
    },
    {
        id: "heat",
        name: "EFFECT.StatusHeat",
        icon: "modules/dragonbane-status-effects/assets/icons/heat-haze.svg",
        category: "spell"
    },
    {
        id: "longstrider",
        name: "EFFECT.StatusLongstrider",
        icon: "icons/svg/wingfoot.svg",
        category: "spell"
    },
    {
        id: "power-fist",
        name: "EFFECT.StatusPowerFist",
        icon: "modules/dragonbane-status-effects/assets/icons/fist.svg",
        category: "spell"
    },
    {
        id: "protector",
        name: "EFFECT.StatusProtector",
        icon: "icons/svg/shield.svg",
        category: "spell"
    },
    {
        id: "stone-skin",
        name: "EFFECT.StatusStoneSkin",
        icon: "modules/dragonbane-status-effects/assets/icons/rock-golem.svg",
        category: "spell"
    },
    
    // Ability Effects (appear at very bottom if enabled)
    {
        id: "berserk",
        name: "EFFECT.StatusBerserk",
        icon: "modules/dragonbane-status-effects/assets/icons/mighty-force.svg",
        category: "ability"
    },
    {
        id: "wolfkin-prey",
        name: "EFFECT.StatusWolfkinPrey",
        icon: "icons/svg/target.svg",
        category: "ability"
    }
];