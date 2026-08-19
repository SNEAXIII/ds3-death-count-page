// Identifiant local, suffisant pour distinguer deux entrées créées dans la même ms.
function uid() {
  return Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }) + ' ' +
         d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
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
