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

// Signature de contenu d'une entrée de journal : deux entrées qui la partagent
// désignent le même évènement, quels que soient leurs identifiants.
function entrySignature(entry) {
  return [entry.ts, entry.source || '', entry.label || '', entry.content || ''].join('\u0000');
}

// Fusionne des entrées importées dans une liste existante, du plus récent au
// plus ancien. Une entrée déjà présente — même identifiant, ou même contenu au
// même horodatage — est ignorée : réimporter un fichier ne duplique rien.
function mergeEntries(existing, incoming, toFields) {
  const usedIds = new Set(existing.map(e => e.id));
  const seen = new Set(existing.map(entrySignature));
  const merged = [...existing];
  let skipped = 0;

  incoming.forEach(entry => {
    const candidate = {
      id: typeof entry.id === 'string' ? entry.id : uid(),
      ts: typeof entry.ts === 'number' ? entry.ts : Date.now(),
      ...toFields(entry)
    };
    const signature = entrySignature(candidate);
    if (usedIds.has(candidate.id) || seen.has(signature)) {
      skipped++;
      return;
    }
    usedIds.add(candidate.id);
    seen.add(signature);
    merged.push(candidate);
  });

  merged.sort((a, b) => b.ts - a.ts);
  return { entries: merged, added: merged.length - existing.length, skipped };
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
