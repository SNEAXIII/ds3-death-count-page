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

    profileSection: 'Profile',
    profileNamePlaceholder: 'Profile name',
    newProfile: 'New',
    renameProfile: 'Rename',
    deleteProfile: 'Delete',
    deleteProfileArmed: 'Confirm deletion',
    deleteProfileHint: "Click again to confirm — this profile's journal is lost for good.",
    lastProfileTitle: 'The last profile cannot be deleted.',
    defaultProfileName: n => `Profile ${n}`,
    save: 'Save',
    cancel: 'Cancel',

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
    editNote: 'Edit',
    defaultNoteLabel: 'Note',

    historySection: 'Recent history',
    historyEmpty: 'History is empty.',
    remove: 'remove',

    exportButton: 'Export (JSON)',
    importButton: 'Import (JSON)',
    exportDone: (d, n, b) => `${d} death(s), ${n} note(s) and ${b} boss(es) exported.`,
    importDone: (d, n, b, skipped) =>
      `${d} death(s), ${n} note(s) and ${b} boss(es) imported.` +
      (skipped ? ` ${skipped} duplicate(s) already present, ignored.` : ''),
    importFailed: 'Import failed: invalid JSON file.',

    resetIdle: 'Clear the journal',
    resetArmed: 'Confirm clearing',
    resetHint: 'Click again to confirm — deaths, notes and boss kills of this profile are lost.',

    flashDeath: 'YOU DIED',
    flashVictory: 'VICTORY ACHIEVED'
  },

  fr: {
    tagline: 'Lothric se souvient',
    title: 'Dark Souls III — Journal des trépas',
    languageLabel: 'Langue',

    profileSection: 'Profil',
    profileNamePlaceholder: 'Nom du profil',
    newProfile: 'Nouveau',
    renameProfile: 'Renommer',
    deleteProfile: 'Supprimer',
    deleteProfileArmed: 'Confirmer la suppression',
    deleteProfileHint: 'Clique à nouveau pour confirmer — le journal de ce profil sera définitivement perdu.',
    lastProfileTitle: 'Le dernier profil ne peut pas être supprimé.',
    defaultProfileName: n => `Profil ${n}`,
    save: 'Enregistrer',
    cancel: 'Annuler',

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
    editNote: 'Éditer',
    defaultNoteLabel: 'Note',

    historySection: 'Historique récent',
    historyEmpty: "L'historique est vide.",
    remove: 'retirer',

    exportButton: 'Exporter (JSON)',
    importButton: 'Importer (JSON)',
    exportDone: (d, n, b) => `${d} mort(s), ${n} note(s) et ${b} boss exportés.`,
    importDone: (d, n, b, skipped) =>
      `${d} mort(s), ${n} note(s) et ${b} boss importés.` +
      (skipped ? ` ${skipped} doublon(s) déjà présent(s), ignoré(s).` : ''),
    importFailed: "Échec de l'import : fichier JSON invalide.",

    resetIdle: 'Effacer le journal',
    resetArmed: "Confirmer l'effacement",
    resetHint: 'Clique à nouveau pour confirmer — morts, notes et kills de boss de ce profil seront perdus.',

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
