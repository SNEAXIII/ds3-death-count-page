// Clés de persistance (localStorage).
const STORAGE_KEY = 'ds3-deaths-log';
const NOTES_KEY = 'ds3-notes-log';
const BOSS_KILLS_KEY = 'ds3-boss-kills';

// Préfixes utilisés pour typer la source d'une mort.
const BOSS_PREFIX = 'Boss : ';
const CREATURE_PREFIX = 'Créature : ';

const QUICK_CAUSES = ['Chute', 'Embuscade', 'Piège', 'Environnement', 'Invasion PvP', 'Ami (griefing)'];
const NOTE_LABELS = ['Porte', 'Raccourci', 'Objet', 'PNJ', 'Piège', 'Idée / stratégie'];

const BOSS_GROUPS = {
  'Jeu de base': [
    'Iudex Gundyr', 'Vordt de la Vallée Boréale', "Le Grand Bois putréfié",
    'Sage de Cristal', 'Diacres des Profondeurs', "Guetteurs de l'Abîme",
    'Wolnir le Grand Immonde', 'Vieux Roi Démon', 'Pontife Sulyvahn',
    'Yhorm le Géant', 'Aldrich Dévoreur de Dieux', 'Danseuse de la Vallée Boréale',
    'Oceiros le Roi Consumé', 'Champion Gundyr', 'Ancienne Vouivre',
    'Armure Pourfendeuse de Dragons', 'Lorian & Lothric', 'Princes Jumeaux',
    'Âme de Cendre', 'Roi sans Nom'
  ],
  "Cendres d'Ariandel": [
    'Sœur Friede & Père Ariandel', 'Gardienne du Champion & Grand Loup Gardien'
  ],
  'La Cité Annelée': [
    "Demi-Lumière, Lance de l'Église", 'Chevalier Esclave Gael',
    'Darkeater Midir', 'Prince Démon'
  ]
};

const ALL_BOSSES = Object.values(BOSS_GROUPS).flat();
