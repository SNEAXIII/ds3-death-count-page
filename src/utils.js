// Helpers génériques, sans dépendance sur les données du jeu.

// Identifiant local, suffisant pour distinguer deux entrées créées dans la même ms.
function uid() {
  return Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}

const DATE_LOCALES = { en: 'en-GB', fr: 'fr-FR' };

function formatTime(ts, lang) {
  const locale = DATE_LOCALES[lang] || DATE_LOCALES.en;
  const d = new Date(ts);
  return d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit' }) + ' ' +
         d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}

function indexBy(list, getKey) {
  const index = {};
  list.forEach(item => { index[getKey(item)] = item; });
  return index;
}

// Clé de comparaison tolérante (casse, accents, ponctuation, espaces) : les
// journaux d'avant les identifiants contiennent les libellés tels qu'ils
// étaient affichés, à la virgule et à la majuscule près.
function labelKey(label) {
  return String(label)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

// Index d'une liste traduite par chacun de ses libellés — toutes langues
// confondues, plus les noms abandonnés listés dans `aliases`.
function indexByLabels(list) {
  const index = {};
  list.forEach(item => {
    [item.en, item.fr, ...(item.aliases || [])].forEach(label => {
      if (label) index[labelKey(label)] = item;
    });
  });
  return index;
}

function readStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

// Fusionne des entrées importées dans une liste existante, sans écraser
// les identifiants déjà utilisés, puis retrie du plus récent au plus ancien.
function mergeEntries(existing, incoming, toFields) {
  const usedIds = new Set(existing.map(e => e.id));
  const merged = [...existing];
  incoming.forEach(entry => {
    const id = (typeof entry.id === 'string' && !usedIds.has(entry.id)) ? entry.id : uid();
    usedIds.add(id);
    merged.push({ id, ts: typeof entry.ts === 'number' ? entry.ts : Date.now(), ...toFields(entry) });
  });
  merged.sort((a, b) => b.ts - a.ts);
  return merged;
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
