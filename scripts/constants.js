/**
 * Constants and Data for Dragonbane Status Effects Module
 */

export const MODULE_ID = "dragonbane-status-effects";

export const DRAGONBANE_ATTRIBUTES = ["STR", "CON", "AGL", "INT", "WIL", "CHA"];

// UI Configuration Constants
export const UI_CONFIG = {
    // Timing
    DEBOUNCE_DELAY: 500,
    UPDATE_DELAY: 100,
    
    // Token HUD Layout
    COLUMNS: 6,
    ICON_SIZE: 40,
    MIN_WIDTH: 320,
    GAP: 6,
    PADDING: '14px 18px 14px 14px'
};

// Dragonbane attribute condition icons
export const DRAGONBANE_CONDITION_ICONS = {
    "str": "systems/dragonbane/art/icons/back-pain.webp",
    "con": "systems/dragonbane/art/icons/death-juice.webp", 
    "agl": "systems/dragonbane/art/icons/surprised.webp",
    "int": "systems/dragonbane/art/icons/angry-eyes.webp",
    "wil": "systems/dragonbane/art/icons/terror.webp",
    "cha": "systems/dragonbane/art/icons/worried-eyes.webp"
};

// DOM Selectors
export const SELECTORS = {
    STATUS_EFFECTS: '.status-effects',
    EFFECT_CONTROL: '.effect-control',
    DRAGONBANE_CONDITION: '.dragonbane-condition',
    TOKEN_HUD: '#token-hud'
};

// Custom Status Effects Data
export const CUSTOM_STATUS_EFFECTS = [
    // General Effects (alphabetical order)
    {
        id: "amnesia",
        name: "EFFECT.StatusAmnesia",
        img: "icons/svg/daze.svg",
        category: "general"
    },
{
        id: "blind",
        name: "EFFECT.StatusBlind",
        img: "icons/svg/blind.svg",
        category: "general"
    },
    {
        id: "burning",
        name: "EFFECT.StatusBurning",
        img: "icons/svg/fire.svg",
        category: "general"
    },
    {
        id: "cold",
        name: "EFFECT.StatusCold",
        img: "modules/dragonbane-status-effects/assets/icons/thermometer-cold.svg",
        category: "general"
    },
    {
        id: "concentration",
        name: "EFFECT.StatusConcentration",
        img: "modules/dragonbane-status-effects/assets/icons/rear-aura.svg",
        category: "general"
    },
    {
        id: "dead",
        name: "EFFECT.StatusDead",
        img: "icons/svg/skull.svg",
        category: "general"
    },
    {
        id: "disease",
        name: "EFFECT.StatusDisease",
        img: "icons/svg/biohazard.svg",
        category: "general"
    },
    {
        id: "drowning",
        name: "EFFECT.StatusDrowning",
        img: "modules/dragonbane-status-effects/assets/icons/drowning.svg",
        category: "general"
    },
    {
        id: "encumbered",
        name: "EFFECT.StatusEncumbered",
        img: "icons/svg/anchor.svg",
        category: "general"
    },
    {
        id: "ensnared",
        name: "EFFECT.StatusEnsnared",
        img: "icons/svg/net.svg",
        category: "general"
    },
    {
        id: "famished",
        name: "EFFECT.StatusFamished",
        img: "modules/dragonbane-status-effects/assets/icons/stomach.svg",
        category: "general"
    },
    {
        id: "flight",
        name: "EFFECT.StatusFlight",
        img: "icons/svg/wing.svg",
        category: "general"
    },
    {
        id: "frozen",
        name: "EFFECT.StatusFrozen",
        img: "icons/svg/frozen.svg",
        category: "general"
    },
    {
        id: "grappled",
        name: "EFFECT.StatusGrappled",
        img: "modules/dragonbane-status-effects/assets/icons/grab.svg",
        category: "general"
    },
    {
        id: "invisible",
        name: "EFFECT.StatusInvisible",
        img: "icons/svg/invisible.svg",
        category: "general"
    },
    {
        id: "mounted",
        name: "EFFECT.StatusMounted",
        img: "modules/dragonbane-status-effects/assets/icons/cavalry.svg",
        category: "general"
    },
    {
        id: "paralyzed",
        name: "EFFECT.StatusParalyzed",
        img: "icons/svg/paralysis.svg",
        category: "general"
    },
    {
        id: "poison-lethal",
        name: "EFFECT.StatusPoisonLethal",
        img: "icons/svg/poison.svg",
        category: "general"
    },
    {
        id: "poison-paralyzing",
        name: "EFFECT.StatusPoisonParalyzing",
        img: "modules/dragonbane-status-effects/assets/icons/deathcab.svg",
        category: "general"
    },
    {
        id: "poison-sleeping",
        name: "EFFECT.StatusPoisonSleeping",
        img: "modules/dragonbane-status-effects/assets/icons/coma.svg",
        category: "general"
    },
    {
        id: "prone",
        name: "EFFECT.StatusProne",
        img: "icons/svg/falling.svg",
        category: "general"
    },
    {
        id: "rage",
        name: "EFFECT.StatusRage",
        img: "modules/dragonbane-status-effects/assets/icons/enrage.svg",
        category: "general"
    },
    {
        id: "sleep",
        name: "EFFECT.StatusAsleep",
        img: "icons/svg/sleep.svg",
        category: "general"
    },
    {
        id: "sleep-deprived",
        name: "EFFECT.StatusSleepDeprived",
        img: "modules/dragonbane-status-effects/assets/icons/tired-eye.svg",
        category: "general"
    },
    {
        id: "unconscious",
        name: "EFFECT.StatusUnconscious",
        img: "icons/svg/unconscious.svg",
        category: "general"
    },
    {
        id: "wild-panic",
        name: "EFFECT.StatusWildPanic",
        img: "modules/dragonbane-status-effects/assets/icons/screaming.svg",
        category: "general"
    },
    
    // Spell Effects (alphabetical order)
    {
        id: "birdsong",
        name: "EFFECT.StatusBirdsong",
        img: "modules/dragonbane-status-effects/assets/icons/bird-twitter.svg",
        category: "spell"
    },
    {
        id: "chill",
        name: "EFFECT.StatusChill",
        img: "modules/dragonbane-status-effects/assets/icons/ice-spell-cast.svg",
        category: "spell"
    },
    {
        id: "enchanted-weapon",
        name: "EFFECT.StatusEnchantedWeapon",
        img: "modules/dragonbane-status-effects/assets/icons/magic-axe.svg",
        category: "spell"
    },
    {
        id: "floral-trail",
        name: "EFFECT.StatusFloralTrail",
        img: "modules/dragonbane-status-effects/assets/icons/flowers.svg",
        category: "spell"
    },
    {
        id: "heat",
        name: "EFFECT.StatusHeat",
        img: "modules/dragonbane-status-effects/assets/icons/heat-haze.svg",
        category: "spell"
    },
    {
        id: "longstrider",
        name: "EFFECT.StatusLongstrider",
        img: "icons/svg/wingfoot.svg",
        category: "spell"
    },
    {
        id: "power-fist",
        name: "EFFECT.StatusPowerFist",
        img: "modules/dragonbane-status-effects/assets/icons/fist.svg",
        category: "spell"
    },
    {
        id: "protector",
        name: "EFFECT.StatusProtector",
        img: "icons/svg/shield.svg",
        category: "spell"
    },
    {
        id: "stone-skin",
        name: "EFFECT.StatusStoneSkin",
        img: "modules/dragonbane-status-effects/assets/icons/rock-golem.svg",
        category: "spell"
    },
    
    // Heroic Ability Effects (alphabetical order)
    {
        id: "berserk",
        name: "EFFECT.StatusBerserk",
        img: "modules/dragonbane-status-effects/assets/icons/mighty-force.svg",
        category: "ability"
    },
    {
        id: "disguised",
        name: "EFFECT.StatusDisguised",
        img: "modules/dragonbane-status-effects/assets/icons/domino-mask.svg",
        category: "ability"
    },
    {
        id: "musician-bane",
        name: "EFFECT.StatusMusicianBane",
        img: "modules/dragonbane-status-effects/assets/icons/shouting.svg",
        category: "ability"
    },
    {
        id: "musician-boon",
        name: "EFFECT.StatusMusicianBoon",
        img: "modules/dragonbane-status-effects/assets/icons/music-spell.svg",
        category: "ability"
    },
    {
        id: "wolfkin-prey",
        name: "EFFECT.StatusWolfkinPrey",
        img: "icons/svg/target.svg",
        category: "ability"
    }
];