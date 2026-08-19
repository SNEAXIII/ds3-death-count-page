const DEFAULT_LANG = 'en';
const LANGUAGES = [
  { id: 'en', label: 'EN', name: 'English' },
  { id: 'fr', label: 'FR', name: 'Français' }
];

// Libellé d'une entrée traduite ({ id, en, fr }), avec repli sur l'anglais.
function labelOf(entry, lang) {
  if (!entry) return '';
  return entry[lang] || entry[DEFAULT_LANG] || entry.id;
}

// Textes d'interface. Une valeur peut être une fonction quand elle dépend
// d'un nombre ou d'une donnée (accords, pluriels).
const STRINGS = {
  en: {
    tagline: 'Lothric remembers',
    title: 'Dark Souls III — Death journal',
    languageLabel: 'Language',

    deathsRecorded: 'Deaths recorded',

    bossSection: 'Bosses felled',
    bossesDefeated: 'Bosses felled',
    totalKills: 'Total kills',
    deathCount: n => `${n} ${n === 1 ? 'death' : 'deaths'}`,
    killCount: n => `${n} ${n === 1 ? 'kill' : 'kills'}`,

    causeSection: 'Cause of death',
    bossPrefix: 'Boss: ',
    creaturePrefix: 'Creature: ',
    bossButton: 'Boss',
    creatureButton: 'Creature',
    customButton: 'Record',
    creaturePlaceholder: 'Creature name (e.g. Black Knight, Starved Hound)',
    customPlaceholder: 'Other cause…',

    breakdownSection: 'Breakdown',
    breakdownEmpty: 'No death recorded yet. The journey begins.',

    notesSection: 'Travel notes',
    customLabelPlaceholder: 'Custom label (e.g. Elevator, Merchant)',
    notePlaceholder: 'e.g. Door locked from the inside, opens up after the area boss.',
    addNote: 'Add note',
    allNotes: 'All notes',
    notesEmptyFiltered: 'No note with this label.',
    notesEmpty: 'No note yet. Doors, shortcuts, ideas: it all goes here.',
    saveNote: 'Save',
    cancelEdit: 'Cancel',
    editNote: 'Edit',
    defaultNoteLabel: 'Note',

    historySection: 'Recent history',
    historyEmpty: 'History is empty.',
    remove: 'remove',

    exportButton: 'Export (JSON)',
    importButton: 'Import (JSON)',
    exportDone: (d, n) => `${d} death(s) and ${n} note(s) exported.`,
    importDone: (d, n) => `${d} death(s) and ${n} note(s) imported and merged.`,
    importFailed: 'Import failed: invalid JSON file.',

    resetIdle: 'Clear the journal',
    resetArmed: 'Confirm clearing',
    resetHint: 'Click again to confirm (irreversible)',

    flashDeath: 'YOU DIED',
    flashVictory: 'VICTORY ACHIEVED'
  },

  fr: {
    tagline: 'Lothric se souvient',
    title: 'Dark Souls III — Journal des trépas',
    languageLabel: 'Langue',

    deathsRecorded: 'Morts enregistrées',

    bossSection: 'Boss vaincus',
    bossesDefeated: 'Boss vaincus',
    totalKills: 'Kills au total',
    deathCount: n => `${n} ${n === 1 ? 'mort' : 'morts'}`,
    killCount: n => `${n} ${n === 1 ? 'kill' : 'kills'}`,

    causeSection: 'Cause de la mort',
    bossPrefix: 'Boss : ',
    creaturePrefix: 'Créature : ',
    bossButton: 'Boss',
    creatureButton: 'Créature',
    customButton: 'Consigner',
    creaturePlaceholder: 'Nom de la créature (ex: Chevalier noir, Loup affamé)',
    customPlaceholder: 'Autre cause…',

    breakdownSection: 'Répartition',
    breakdownEmpty: "Aucune mort consignée pour l'instant. Le voyage commence.",

    notesSection: 'Notes de voyage',
    customLabelPlaceholder: 'Label personnalisé (ex: Ascenseur, Marchand)',
    notePlaceholder: "Ex: Porte verrouillée depuis l'intérieur, s'ouvre après le boss de la zone.",
    addNote: 'Ajouter la note',
    allNotes: 'Toutes les notes',
    notesEmptyFiltered: 'Aucune note avec ce label.',
    notesEmpty: "Aucune note pour l'instant. Portes, raccourcis, idées : tout se note ici.",
    saveNote: 'Enregistrer',
    cancelEdit: 'Annuler',
    editNote: 'Éditer',
    defaultNoteLabel: 'Note',

    historySection: 'Historique récent',
    historyEmpty: "L'historique est vide.",
    remove: 'retirer',

    exportButton: 'Exporter (JSON)',
    importButton: 'Importer (JSON)',
    exportDone: (d, n) => `${d} mort(s) et ${n} note(s) exportées.`,
    importDone: (d, n) => `${d} mort(s) et ${n} note(s) importées et fusionnées.`,
    importFailed: "Échec de l'import : fichier JSON invalide.",

    resetIdle: 'Effacer le journal',
    resetArmed: "Confirmer l'effacement",
    resetHint: 'Clique à nouveau pour confirmer (irréversible)',

    flashDeath: 'VOUS ÊTES MORT',
    flashVictory: 'BOSS VAINCU'
  }
};

// Contexte partagé : chaque composant récupère { lang, setLang, t } sans
// que la langue ait à traverser toute la hiérarchie en props.
const I18nContext = React.createContext(null);

function useI18n() {
  return useContext(I18nContext);
}
