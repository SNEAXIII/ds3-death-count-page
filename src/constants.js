// Clés de persistance (localStorage). Les trois clés de journal sont suffixées
// par l'identifiant du profil auquel elles appartiennent (voir profiles.js).
const STORAGE_KEY = 'ds3-deaths-log';
const NOTES_KEY = 'ds3-notes-log';
const BOSS_KILLS_KEY = 'ds3-boss-kills';
const JOURNAL_KEYS = [STORAGE_KEY, NOTES_KEY, BOSS_KILLS_KEY];

const PROFILES_KEY = 'ds3-profiles';
const ACTIVE_PROFILE_KEY = 'ds3-active-profile';
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

// Index par identifiant, et par libellé pour reconnaître les données d'avant
// l'introduction des identifiants. Les boss vivent dans src/bosses.js.
const CAUSE_BY_ID = indexBy(QUICK_CAUSES, c => c.id);
const CAUSE_BY_LABEL = indexByLabels(QUICK_CAUSES);
const NOTE_LABEL_BY_ID = indexBy(NOTE_LABELS, l => l.id);
const NOTE_LABEL_BY_LABEL = indexByLabels(NOTE_LABELS);
