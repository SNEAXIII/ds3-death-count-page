// Clés de persistance (localStorage).
const STORAGE_KEY = 'ds3-deaths-log';
const NOTES_KEY = 'ds3-notes-log';
const BOSS_KILLS_KEY = 'ds3-boss-kills';
const LANG_KEY = 'ds3-lang';

// Les entrées ci-dessous portent un `id` stable, indépendant de la langue :
// c'est lui qui est stocké et exporté, les libellés ne servent qu'à l'affichage.
const QUICK_CAUSES = [
  { id: 'fall', en: 'Fall', fr: 'Chute' },
  { id: 'ambush', en: 'Ambush', fr: 'Embuscade' },
  { id: 'trap', en: 'Trap', fr: 'Piège' },
  { id: 'environment', en: 'Environment', fr: 'Environnement' },
  { id: 'pvp', en: 'PvP invasion', fr: 'Invasion PvP' },
  { id: 'friend', en: 'Friend (griefing)', fr: 'Ami (griefing)' }
];

const NOTE_LABELS = [
  { id: 'door', en: 'Door', fr: 'Porte' },
  { id: 'shortcut', en: 'Shortcut', fr: 'Raccourci' },
  { id: 'item', en: 'Item', fr: 'Objet' },
  { id: 'npc', en: 'NPC', fr: 'PNJ' },
  { id: 'trap', en: 'Trap', fr: 'Piège' },
  { id: 'idea', en: 'Idea / strategy', fr: 'Idée / stratégie' }
];

const BOSS_GROUPS = [
  {
    id: 'base',
    en: 'Base game',
    fr: 'Jeu de base',
    bosses: [
      { id: 'iudex-gundyr', en: 'Iudex Gundyr', fr: 'Iudex Gundyr' },
      { id: 'vordt', en: 'Vordt of the Boreal Valley', fr: 'Vordt de la Vallée Boréale' },
      { id: 'greatwood', en: 'Curse-Rotted Greatwood', fr: 'Le Grand Bois putréfié' },
      { id: 'crystal-sage', en: 'Crystal Sage', fr: 'Sage de Cristal' },
      { id: 'deacons', en: 'Deacons of the Deep', fr: 'Diacres des Profondeurs' },
      { id: 'abyss-watchers', en: 'Abyss Watchers', fr: "Guetteurs de l'Abîme" },
      { id: 'wolnir', en: 'High Lord Wolnir', fr: 'Wolnir le Grand Immonde' },
      { id: 'old-demon-king', en: 'Old Demon King', fr: 'Vieux Roi Démon' },
      { id: 'pontiff', en: 'Pontiff Sulyvahn', fr: 'Pontife Sulyvahn' },
      { id: 'yhorm', en: 'Yhorm the Giant', fr: 'Yhorm le Géant' },
      { id: 'aldrich', en: 'Aldrich, Devourer of Gods', fr: 'Aldrich Dévoreur de Dieux' },
      { id: 'dancer', en: 'Dancer of the Boreal Valley', fr: 'Danseuse de la Vallée Boréale' },
      { id: 'oceiros', en: 'Oceiros, the Consumed King', fr: 'Oceiros le Roi Consumé' },
      { id: 'champion-gundyr', en: 'Champion Gundyr', fr: 'Champion Gundyr' },
      { id: 'ancient-wyvern', en: 'Ancient Wyvern', fr: 'Ancienne Vouivre' },
      { id: 'dragonslayer-armour', en: 'Dragonslayer Armour', fr: 'Armure Pourfendeuse de Dragons' },
      { id: 'lorian-lothric', en: 'Lorian & Lothric', fr: 'Lorian & Lothric' },
      { id: 'twin-princes', en: 'Twin Princes', fr: 'Princes Jumeaux' },
      { id: 'soul-of-cinder', en: 'Soul of Cinder', fr: 'Âme de Cendre' },
      { id: 'nameless-king', en: 'Nameless King', fr: 'Roi sans Nom' }
    ]
  },
  {
    id: 'ariandel',
    en: 'Ashes of Ariandel',
    fr: "Cendres d'Ariandel",
    bosses: [
      { id: 'friede', en: 'Sister Friede & Father Ariandel', fr: 'Sœur Friede & Père Ariandel' },
      { id: 'gravetender', en: "Champion's Gravetender & Gravetender Greatwolf", fr: 'Gardienne du Champion & Grand Loup Gardien' }
    ]
  },
  {
    id: 'ringed-city',
    en: 'The Ringed City',
    fr: 'La Cité Annelée',
    bosses: [
      { id: 'halflight', en: 'Halflight, Spear of the Church', fr: "Demi-Lumière, Lance de l'Église" },
      { id: 'gael', en: 'Slave Knight Gael', fr: 'Chevalier Esclave Gael' },
      { id: 'midir', en: 'Darkeater Midir', fr: 'Darkeater Midir' },
      { id: 'demon-prince', en: 'Demon Prince', fr: 'Prince Démon' }
    ]
  }
];

const ALL_BOSSES = BOSS_GROUPS.flatMap(group => group.bosses);

// Index par id, et par libellé pour reconnaître les données d'avant l'i18n.
const BOSS_BY_ID = indexBy(ALL_BOSSES, b => b.id);
const BOSS_BY_LABEL = indexByLabels(ALL_BOSSES);
const CAUSE_BY_ID = indexBy(QUICK_CAUSES, c => c.id);
const CAUSE_BY_LABEL = indexByLabels(QUICK_CAUSES);
const NOTE_LABEL_BY_ID = indexBy(NOTE_LABELS, l => l.id);
const NOTE_LABEL_BY_LABEL = indexByLabels(NOTE_LABELS);
