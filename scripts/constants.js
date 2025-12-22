/**
 * Constants and Data for Dragonbane Status Effects Module
 * V13 Compatible - Effect IDs use hyphens instead of dots to avoid HandlebarsApplicationMixin nested object conversion
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
  ICON_SIZE: 35,
  MIN_WIDTH: 260,
  GAP: 4,
  PADDING: "5px 8px 5px 8px",
};

// Dragonbane attribute condition icons
export const DRAGONBANE_CONDITION_ICONS = {
  str: "systems/dragonbane/art/icons/back-pain.webp",
  con: "systems/dragonbane/art/icons/death-juice.webp",
  agl: "systems/dragonbane/art/icons/surprised.webp",
  int: "systems/dragonbane/art/icons/angry-eyes.webp",
  wil: "systems/dragonbane/art/icons/terror.webp",
  cha: "systems/dragonbane/art/icons/worried-eyes.webp",
};

// DOM Selectors - V13 Compatible
export const SELECTORS = {
  STATUS_EFFECTS: ".palette.status-effects",
  EFFECT_CONTROL: ".effect-control",
  DRAGONBANE_CONDITION: ".dragonbane-condition",
  TOKEN_HUD: "#token-hud",
};

// Custom Status Effects Data - V13 Compatible IDs (hyphens instead of dots)
export const CUSTOM_STATUS_EFFECTS = [
  // General Effects (alphabetical order)
  {
    id: "dse-amnesia",
    name: "EFFECT.StatusAmnesia",
    img: "icons/svg/daze.svg",
    category: "general",
  },
  {
    id: "blind",
    name: "EFFECT.StatusBlind",
    img: "icons/svg/blind.svg",
    category: "general",
  },
  {
    id: "dse-burning",
    name: "EFFECT.StatusBurning",
    img: "icons/svg/fire.svg",
    category: "general",
  },
  {
    id: "dse-cold",
    name: "EFFECT.StatusCold",
    img: "modules/dragonbane-status-effects/assets/icons/thermometer-cold.svg",
    category: "general",
  },
  {
    id: "dse-concentration",
    name: "EFFECT.StatusConcentration",
    img: "modules/dragonbane-status-effects/assets/icons/rear-aura.svg",
    category: "general",
  },
  {
    id: "dse-deafened",
    name: "EFFECT.StatusDeafened",
    img: "icons/svg/deaf.svg",
    category: "general",
  },
  {
    id: "dead",
    name: "EFFECT.StatusDead",
    img: "icons/svg/skull.svg",
    category: "general",
  },
  {
    id: "dse-disease",
    name: "EFFECT.StatusDisease",
    img: "icons/svg/biohazard.svg",
    category: "general",
  },
  {
    id: "dse-drowning",
    name: "EFFECT.StatusDrowning",
    img: "modules/dragonbane-status-effects/assets/icons/drowning.svg",
    category: "general",
  },
  {
    id: "dse-encumbered",
    name: "EFFECT.StatusEncumbered",
    img: "icons/svg/anchor.svg",
    category: "general",
  },
  {
    id: "dse-ensnared",
    name: "EFFECT.StatusEnsnared",
    img: "icons/svg/net.svg",
    category: "general",
  },
  {
    id: "dse-famished",
    name: "EFFECT.StatusFamished",
    img: "modules/dragonbane-status-effects/assets/icons/stomach.svg",
    category: "general",
  },
  {
    id: "dse-flying",
    name: "EFFECT.StatusFlying",
    img: "icons/svg/wing.svg",
    category: "general",
  },
  {
    id: "dse-grappled",
    name: "EFFECT.StatusGrappled",
    img: "modules/dragonbane-status-effects/assets/icons/grab.svg",
    category: "general",
  },
  {
    id: "invisible",
    name: "EFFECT.StatusInvisible",
    img: "icons/svg/invisible.svg",
    category: "general",
  },
  {
    id: "dse-mounted",
    name: "EFFECT.StatusMounted",
    img: "modules/dragonbane-status-effects/assets/icons/cavalry.svg",
    category: "general",
  },
  {
    id: "dse-nightmares",
    name: "EFFECT.StatusNightmares",
    img: "modules/dragonbane-status-effects/assets/icons/shadow-grasp.svg",
    category: "general",
  },
  {
    id: "dse-paralyzed",
    name: "EFFECT.StatusParalyzed",
    img: "icons/svg/paralysis.svg",
    category: "general",
  },
  {
    id: "dse-petrified",
    name: "EFFECT.StatusPetrified",
    img: "icons/svg/stone.svg",
    category: "general",
  },
  {
    id: "dse-poison-lethal",
    name: "EFFECT.StatusPoisonLethal",
    img: "icons/svg/poison.svg",
    category: "general",
  },
  {
    id: "dse-poison-paralyzing",
    name: "EFFECT.StatusPoisonParalyzing",
    img: "modules/dragonbane-status-effects/assets/icons/deathcab.svg",
    category: "general",
  },
  {
    id: "dse-poison-sleeping",
    name: "EFFECT.StatusPoisonSleeping",
    img: "modules/dragonbane-status-effects/assets/icons/coma.svg",
    category: "general",
  },
  {
    id: "prone",
    name: "EFFECT.StatusProne",
    img: "icons/svg/falling.svg",
    category: "general",
  },
  {
    id: "dse-rage",
    name: "EFFECT.StatusRage",
    img: "modules/dragonbane-status-effects/assets/icons/enrage.svg",
    category: "general",
  },
  {
    id: "dse-sleep",
    name: "EFFECT.StatusAsleep",
    img: "icons/svg/sleep.svg",
    category: "general",
  },
  {
    id: "dse-sleep-deprived",
    name: "EFFECT.StatusSleepDeprived",
    img: "modules/dragonbane-status-effects/assets/icons/tired-eye.svg",
    category: "general",
  },
  {
    id: "dse-unconscious",
    name: "EFFECT.StatusUnconscious",
    img: "icons/svg/unconscious.svg",
    category: "general",
  },
  {
    id: "dse-wild-panic",
    name: "EFFECT.StatusWildPanic",
    img: "modules/dragonbane-status-effects/assets/icons/screaming.svg",
    category: "general",
  },

  // Spell Effects (alphabetical order)
  {
    id: "dse-birdsong",
    name: "EFFECT.StatusBirdsong",
    img: "modules/dragonbane-status-effects/assets/icons/bird-twitter.svg",
    category: "spell",
    duration: {
      seconds: 900,
    },
  },
  {
    id: "dse-chill",
    name: "EFFECT.StatusChill",
    img: "modules/dragonbane-status-effects/assets/icons/ice-spell-cast.svg",
    category: "spell",
    duration: {
      seconds: 900,
    },
  },
  {
    id: "dse-enchanted-weapon",
    name: "EFFECT.StatusEnchantedWeapon",
    img: "modules/dragonbane-status-effects/assets/icons/magic-axe.svg",
    category: "spell",
    duration: {
      seconds: 900,
    },
  },
  {
    id: "dse-frozen",
    name: "EFFECT.StatusFrozen",
    img: "icons/svg/frozen.svg",
    category: "spell",
  },
  {
    id: "dse-heat",
    name: "EFFECT.StatusHeat",
    img: "modules/dragonbane-status-effects/assets/icons/heat-haze.svg",
    category: "spell",
    duration: {
      seconds: 900,
    },
  },
  {
    id: "dse-longstrider",
    name: "EFFECT.StatusLongstrider",
    img: "icons/svg/wingfoot.svg",
    category: "spell",
    duration: {
      seconds: 900,
    },
    changes: [
      {
        key: "system.movement.value",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "2",
      },
    ],
  },
  {
    id: "dse-power-fist",
    name: "EFFECT.StatusPowerFist",
    img: "modules/dragonbane-status-effects/assets/icons/fist.svg",
    category: "spell",
    duration: {
      seconds: 900,
    },
  },
  {
    id: "dse-protector",
    name: "EFFECT.StatusProtector",
    img: "icons/svg/shield.svg",
    category: "spell",
    duration: {
      seconds: 21600,
    },
  },
  {
    id: "dse-stone-skin",
    name: "EFFECT.StatusStoneSkin",
    img: "modules/dragonbane-status-effects/assets/icons/rock-golem.svg",
    category: "spell",
    duration: {
      seconds: 900,
    },
  },

  // Heroic Ability Effects (alphabetical order)
  {
    id: "dse-berserk",
    name: "EFFECT.StatusBerserk",
    img: "modules/dragonbane-status-effects/assets/icons/mighty-force.svg",
    category: "ability",
  },
  {
    id: "dse-disguised",
    name: "EFFECT.StatusDisguised",
    img: "modules/dragonbane-status-effects/assets/icons/domino-mask.svg",
    category: "ability",
  },
  {
    id: "dse-musician-bane",
    name: "EFFECT.StatusMusicianBane",
    img: "modules/dragonbane-status-effects/assets/icons/shouting.svg",
    category: "ability",
  },
  {
    id: "dse-musician-boon",
    name: "EFFECT.StatusMusicianBoon",
    img: "modules/dragonbane-status-effects/assets/icons/music-spell.svg",
    category: "ability",
  },
  {
    id: "dse-wolfkin-prey",
    name: "EFFECT.StatusWolfkinPrey",
    img: "icons/svg/target.svg",
    category: "ability",
    duration: {
      seconds: 86400,
    },
  },
];
