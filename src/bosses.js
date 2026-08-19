// Rosters de boss, un par jeu, DLC inclus. Chaque entrée porte un `id` stable
// et indépendant de la langue : c'est lui qui est stocké et exporté.
// Les identifiants sont préfixés par jeu, sauf ceux de Dark Souls III, écrits
// avant l'arrivée des autres jeux et conservés tels quels pour ne pas détacher
// les journaux existants. `aliases` retient les noms abandonnés.
const GAMES = [
  {
    id: 'ds1',
    label: 'Dark Souls',
    groups: [
      {
        id: 'ds1-base',
        en: 'Base game',
        fr: 'Jeu de base',
        bosses: [
          { id: 'ds1-asylum-demon', en: 'Asylum Demon', fr: "Démon de l'Asile" },
          { id: 'ds1-taurus-demon', en: 'Taurus Demon', fr: 'Démon Taureau' },
          { id: 'ds1-bell-gargoyles', en: 'Bell Gargoyles', fr: 'Gargouilles du Beffroi' },
          { id: 'ds1-moonlight-butterfly', en: 'Moonlight Butterfly', fr: 'Papillon Lunaire' },
          { id: 'ds1-capra-demon', en: 'Capra Demon', fr: 'Démon Capra' },
          { id: 'ds1-gaping-dragon', en: 'Gaping Dragon', fr: 'Dragon Béant' },
          { id: 'ds1-quelaag', en: 'Chaos Witch Quelaag', fr: 'Quelaag, sorcière du Chaos' },
          { id: 'ds1-sif', en: 'Great Grey Wolf Sif', fr: 'Sif, le grand loup gris' },
          { id: 'ds1-iron-golem', en: 'Iron Golem', fr: 'Golem de fer' },
          { id: 'ds1-ornstein-smough', en: 'Ornstein & Smough', fr: 'Ornstein et Smough' },
          { id: 'ds1-pinwheel', en: 'Pinwheel', fr: 'Pinwheel' },
          { id: 'ds1-nito', en: 'Gravelord Nito', fr: 'Nito, seigneur des tombes' },
          { id: 'ds1-four-kings', en: 'The Four Kings', fr: 'Les Quatre Rois' },
          { id: 'ds1-seath', en: 'Seath the Scaleless', fr: "Seath l'Immaculé" },
          { id: 'ds1-ceaseless-discharge', en: 'Ceaseless Discharge', fr: 'Flux incessant' },
          { id: 'ds1-centipede-demon', en: 'Centipede Demon', fr: 'Démon mille-pattes' },
          { id: 'ds1-demon-firesage', en: 'Demon Firesage', fr: 'Démon sage du feu' },
          { id: 'ds1-bed-of-chaos', en: 'Bed of Chaos', fr: 'Lit du Chaos' },
          { id: 'ds1-stray-demon', en: 'Stray Demon', fr: 'Démon errant' },
          { id: 'ds1-priscilla', en: 'Crossbreed Priscilla', fr: 'Priscilla la sang-mêlé' },
          { id: 'ds1-gwyndolin', en: 'Dark Sun Gwyndolin', fr: 'Gwyndolin, le soleil noir' },
          { id: 'ds1-gwyn', en: 'Gwyn, Lord of Cinder', fr: 'Gwyn, seigneur des cendres' }
        ]
      },
      {
        id: 'ds1-artorias',
        en: 'Artorias of the Abyss',
        fr: "Artorias of the Abyss",
        bosses: [
          { id: 'ds1-sanctuary-guardian', en: 'Sanctuary Guardian', fr: 'Gardien du sanctuaire' },
          { id: 'ds1-knight-artorias', en: 'Knight Artorias', fr: 'Chevalier Artorias' },
          { id: 'ds1-manus', en: 'Manus, Father of the Abyss', fr: "Manus, père de l'Abîme" },
          { id: 'ds1-kalameet', en: 'Black Dragon Kalameet', fr: 'Kalameet, le dragon noir' }
        ]
      }
    ]
  },

  {
    id: 'ds2',
    label: 'Dark Souls II',
    groups: [
      {
        id: 'ds2-base',
        en: 'Base game',
        fr: 'Jeu de base',
        bosses: [
          { id: 'ds2-last-giant', en: 'The Last Giant', fr: 'Le dernier géant' },
          { id: 'ds2-pursuer', en: 'The Pursuer', fr: 'Le Traqueur' },
          { id: 'ds2-dragonrider', en: 'Dragonrider', fr: 'Chevaucheur de dragon' },
          { id: 'ds2-old-dragonslayer', en: 'Old Dragonslayer', fr: 'Ancien tueur de dragons' },
          { id: 'ds2-flexile-sentry', en: 'Flexile Sentry', fr: 'Sentinelle flexible' },
          { id: 'ds2-ruin-sentinels', en: 'Ruin Sentinels', fr: 'Sentinelles des ruines' },
          { id: 'ds2-belfry-gargoyles', en: 'Belfry Gargoyles', fr: 'Gargouilles du campanile' },
          { id: 'ds2-lost-sinner', en: 'Lost Sinner', fr: 'La pécheresse perdue' },
          { id: 'ds2-skeleton-lords', en: 'Skeleton Lords', fr: 'Seigneurs squelettes' },
          { id: 'ds2-executioners-chariot', en: "Executioner's Chariot", fr: 'Char du bourreau' },
          { id: 'ds2-covetous-demon', en: 'Covetous Demon', fr: 'Démon avide' },
          { id: 'ds2-mytha', en: 'Mytha, the Baneful Queen', fr: 'Mytha, la reine funeste' },
          { id: 'ds2-smelter-demon', en: 'Smelter Demon', fr: 'Démon fondeur' },
          { id: 'ds2-old-iron-king', en: 'Old Iron King', fr: 'Ancien roi de fer' },
          { id: 'ds2-scorpioness-najka', en: 'Scorpioness Najka', fr: 'Najka la scorpionne' },
          { id: 'ds2-royal-rat-vanguard', en: 'Royal Rat Vanguard', fr: 'Avant-garde des rats royaux' },
          { id: 'ds2-royal-rat-authority', en: 'Royal Rat Authority', fr: 'Autorité des rats royaux' },
          { id: 'ds2-prowling-magus', en: 'Prowling Magus and Congregation', fr: 'Mage rôdeur et sa congrégation' },
          { id: 'ds2-the-rotten', en: 'The Rotten', fr: 'Le Putride' },
          { id: 'ds2-freja', en: "Duke's Dear Freja", fr: 'Freja, la chère du duc' },
          { id: 'ds2-looking-glass-knight', en: 'Looking Glass Knight', fr: 'Chevalier au miroir' },
          { id: 'ds2-demon-of-song', en: 'Demon of Song', fr: 'Démon chanteur' },
          { id: 'ds2-velstadt', en: 'Velstadt, the Royal Aegis', fr: "Velstadt, l'égide royale" },
          { id: 'ds2-guardian-dragon', en: 'Guardian Dragon', fr: 'Dragon gardien' },
          { id: 'ds2-ancient-dragon', en: 'Ancient Dragon', fr: 'Dragon ancestral' },
          { id: 'ds2-darklurker', en: 'Darklurker', fr: 'Rôdeur des ténèbres' },
          { id: 'ds2-giant-lord', en: 'Giant Lord', fr: 'Seigneur des géants' },
          { id: 'ds2-vendrick', en: 'Vendrick', fr: 'Vendrick' },
          { id: 'ds2-throne-duo', en: 'Throne Watcher & Throne Defender', fr: 'Gardien et Défenseur du trône' },
          { id: 'ds2-nashandra', en: 'Nashandra', fr: 'Nashandra' },
          { id: 'ds2-aldia', en: 'Aldia, Scholar of the First Sin', fr: 'Aldia, érudit du premier péché' }
        ]
      },
      {
        id: 'ds2-sunken-king',
        en: 'Crown of the Sunken King',
        fr: 'La Couronne du roi englouti',
        bosses: [
          { id: 'ds2-elana', en: 'Elana, Squalid Queen', fr: 'Elana, la reine sordide' },
          { id: 'ds2-sinh', en: 'Sinh, the Slumbering Dragon', fr: 'Sinh, le dragon endormi' },
          { id: 'ds2-graverobber-trio', en: 'Afflicted Graverobber, Ancient Soldier Varg & Cerah the Old Explorer', fr: 'Pilleuse de tombes, Varg le soldat antique et Cerah la vieille exploratrice' }
        ]
      },
      {
        id: 'ds2-old-iron-king',
        en: 'Crown of the Old Iron King',
        fr: "La Couronne de l'ancien roi de fer",
        bosses: [
          { id: 'ds2-fume-knight', en: 'Fume Knight', fr: 'Chevalier des fumées' },
          { id: 'ds2-sir-alonne', en: 'Sir Alonne', fr: 'Sire Alonne' },
          { id: 'ds2-blue-smelter-demon', en: 'Blue Smelter Demon', fr: 'Démon fondeur bleu' }
        ]
      },
      {
        id: 'ds2-ivory-king',
        en: 'Crown of the Ivory King',
        fr: "La Couronne du roi d'ivoire",
        bosses: [
          { id: 'ds2-aava', en: "Aava, the King's Pet", fr: "Aava, l'animal du roi" },
          { id: 'ds2-burnt-ivory-king', en: 'Burnt Ivory King', fr: "Roi d'ivoire calciné" },
          { id: 'ds2-lud-zallen', en: "Lud & Zallen, the King's Pets", fr: 'Lud et Zallen, les animaux du roi' }
        ]
      }
    ]
  },

  {
    id: 'ds3',
    label: 'Dark Souls III',
    groups: [
      {
        id: 'base',
        en: 'Base game',
        fr: 'Jeu de base',
        bosses: [
          { id: 'iudex-gundyr', en: 'Iudex Gundyr', fr: 'Iudex Gundyr' },
          { id: 'vordt', en: 'Vordt of the Boreal Valley', fr: 'Vordt du Val Boréal', aliases: ['Vordt de la Vallée Boréale'] },
          { id: 'greatwood', en: 'Curse-Rotted Greatwood', fr: 'Grand arbre pourri par la malédiction', aliases: ['Le Grand Bois putréfié'] },
          { id: 'crystal-sage', en: 'Crystal Sage', fr: 'Sage de cristal' },
          { id: 'deacons', en: 'Deacons of the Deep', fr: 'Diacres des Profondeurs' },
          { id: 'abyss-watchers', en: 'Abyss Watchers', fr: "Guetteurs de l'Abîme" },
          { id: 'wolnir', en: 'High Lord Wolnir', fr: 'Grand seigneur Wolnir', aliases: ['Wolnir le Grand Immonde'] },
          { id: 'old-demon-king', en: 'Old Demon King', fr: 'Vieux roi démon' },
          { id: 'pontiff', en: 'Pontiff Sulyvahn', fr: 'Pontife Sulyvahn' },
          { id: 'yhorm', en: 'Yhorm the Giant', fr: 'Yhorm le Géant' },
          { id: 'aldrich', en: 'Aldrich, Devourer of Gods', fr: 'Aldrich, dévoreur de dieux' },
          { id: 'dancer', en: 'Dancer of the Boreal Valley', fr: 'Danseuse du Val Boréal', aliases: ['Danseuse de la Vallée Boréale'] },
          { id: 'oceiros', en: 'Oceiros, the Consumed King', fr: 'Oceiros, le roi consumé' },
          { id: 'champion-gundyr', en: 'Champion Gundyr', fr: 'Champion Gundyr' },
          { id: 'ancient-wyvern', en: 'Ancient Wyvern', fr: 'Vouivre ancestrale', aliases: ['Ancienne Vouivre'] },
          { id: 'dragonslayer-armour', en: 'Dragonslayer Armour', fr: 'Armure du tueur de dragons', aliases: ['Armure Pourfendeuse de Dragons'] },
          { id: 'twin-princes', en: 'Twin Princes', fr: 'Princes jumeaux', aliases: ['Lorian & Lothric'] },
          { id: 'soul-of-cinder', en: 'Soul of Cinder', fr: 'Âme de Cendre' },
          { id: 'nameless-king', en: 'Nameless King', fr: 'Roi sans nom' }
        ]
      },
      {
        id: 'ariandel',
        en: 'Ashes of Ariandel',
        fr: "Cendres d'Ariandel",
        bosses: [
          { id: 'gravetender', en: "Champion's Gravetender & Gravetender Greatwolf", fr: 'Gardienne des tombes du Champion et grand loup gardien', aliases: ['Gardienne du Champion & Grand Loup Gardien'] },
          { id: 'friede', en: 'Sister Friede', fr: 'Sœur Friede', aliases: ['Sister Friede & Father Ariandel', 'Sœur Friede & Père Ariandel'] }
        ]
      },
      {
        id: 'ringed-city',
        en: 'The Ringed City',
        fr: 'La Cité Annelée',
        bosses: [
          { id: 'demon-prince', en: 'Demon Prince', fr: 'Prince démon' },
          { id: 'halflight', en: 'Halflight, Spear of the Church', fr: "Demi-Lumière, lance de l'Église" },
          { id: 'midir', en: 'Darkeater Midir', fr: "Midir le dévoreur d'obscurité" },
          { id: 'gael', en: 'Slave Knight Gael', fr: 'Chevalier esclave Gael' }
        ]
      }
    ]
  }
];

// Jeu des profils qui n'en portent pas : ceux d'avant la sélection de jeu.
const DEFAULT_GAME = 'ds3';

const GAME_BY_ID = indexBy(GAMES, game => game.id);

function bossesOf(game) {
  return game.groups.flatMap(group => group.bosses);
}

function gameOf(profile) {
  return GAME_BY_ID[profile && profile.game] || GAME_BY_ID[DEFAULT_GAME];
}

// Index global : une mort ou un kill se relit quel que soit le jeu du profil.
const BOSS_BY_ID = indexBy(GAMES.flatMap(bossesOf), boss => boss.id);

// Index par libellé, limité à Dark Souls III : il ne sert qu'à rattacher les
// journaux d'avant les identifiants, et l'application n'a connu que ce jeu.
// L'étendre ferait entrer en collision des noms partagés entre deux jeux.
const BOSS_BY_LABEL = indexByLabels(bossesOf(GAME_BY_ID[DEFAULT_GAME]));
