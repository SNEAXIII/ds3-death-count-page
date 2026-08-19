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

// Index d'une liste traduite par chacun de ses libellés, toutes langues confondues :
// sert à reconnaître les données enregistrées avant l'introduction des identifiants.
function indexByLabels(list) {
  const index = {};
  list.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key !== 'id' && key !== 'bosses') index[item[key]] = item;
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
