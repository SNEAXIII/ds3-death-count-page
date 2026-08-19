// Une mort est stockée sous forme d'une chaîne `source` indépendante de la
// langue : "cause:<id>", "boss:<id>", "creature:<nom saisi>", ou du texte
// libre pour une cause personnalisée. L'affichage est localisé à la volée.
const CAUSE_SOURCE = 'cause:';
const BOSS_SOURCE = 'boss:';
const CREATURE_SOURCE = 'creature:';

// Préfixes des journaux d'avant l'i18n, encore présents en localStorage
// et dans les fichiers d'export déjà téléchargés.
const LEGACY_BOSS_PREFIXES = ['Boss : ', 'Boss: '];
const LEGACY_CREATURE_PREFIXES = ['Créature : ', 'Creature: '];

const causeSource = id => CAUSE_SOURCE + id;
const bossSource = id => BOSS_SOURCE + id;
const creatureSource = name => CREATURE_SOURCE + name;

function stripPrefix(text, prefixes) {
  const prefix = prefixes.find(p => text.startsWith(p));
  return prefix ? text.slice(prefix.length) : null;
}

function parseSource(source) {
  if (source.startsWith(CAUSE_SOURCE)) return { kind: 'cause', value: source.slice(CAUSE_SOURCE.length) };
  if (source.startsWith(BOSS_SOURCE)) return { kind: 'boss', value: source.slice(BOSS_SOURCE.length) };
  if (source.startsWith(CREATURE_SOURCE)) return { kind: 'creature', value: source.slice(CREATURE_SOURCE.length) };
  return { kind: 'custom', value: source };
}

function formatSource(source, t, lang) {
  const { kind, value } = parseSource(source);
  if (kind === 'cause') return labelOf(CAUSE_BY_ID[value], lang) || value;
  if (kind === 'boss') return t('bossPrefix') + (labelOf(BOSS_BY_ID[value], lang) || value);
  if (kind === 'creature') return t('creaturePrefix') + value;
  return value;
}

function formatNoteLabel(label, lang) {
  return labelOf(NOTE_LABEL_BY_ID[label], lang) || label;
}

// ---------- reprise des journaux d'avant l'i18n ----------
function migrateSource(source) {
  const { kind } = parseSource(source);
  if (kind !== 'custom') return source;

  const cause = CAUSE_BY_LABEL[source];
  if (cause) return causeSource(cause.id);

  const bossName = stripPrefix(source, LEGACY_BOSS_PREFIXES);
  if (bossName !== null) {
    const boss = BOSS_BY_LABEL[bossName];
    return bossSource(boss ? boss.id : bossName);
  }

  const creatureName = stripPrefix(source, LEGACY_CREATURE_PREFIXES);
  if (creatureName !== null) return creatureSource(creatureName);

  return source;
}

function migrateNoteLabel(label) {
  if (NOTE_LABEL_BY_ID[label]) return label;
  const preset = NOTE_LABEL_BY_LABEL[label];
  return preset ? preset.id : label;
}

function migrateBossKills(bossKills) {
  const migrated = {};
  Object.entries(bossKills).forEach(([key, count]) => {
    const boss = BOSS_BY_ID[key] || BOSS_BY_LABEL[key];
    const id = boss ? boss.id : key;
    migrated[id] = Math.max(migrated[id] || 0, count);
  });
  return migrated;
}
