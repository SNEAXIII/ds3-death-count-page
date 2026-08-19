// Source de vérité du journal : morts, notes, kills de boss.
// Charge depuis localStorage au montage, y réécrit à chaque changement,
// et expose les mutations ainsi que les statistiques dérivées.
function useJournal() {
  const [deaths, setDeaths] = useState([]);
  const [notes, setNotes] = useState([]);
  const [bossKills, setBossKills] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setDeaths(readStored(STORAGE_KEY, []).map(d => ({ ...d, source: migrateSource(d.source) })));
    setNotes(readStored(NOTES_KEY, []).map(n => ({ ...n, label: migrateNoteLabel(n.label) })));
    setBossKills(migrateBossKills(readStored(BOSS_KILLS_KEY, {})));
    setLoaded(true);
  }, []);

  useEffect(() => { if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(deaths)); }, [deaths, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); }, [notes, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem(BOSS_KILLS_KEY, JSON.stringify(bossKills)); }, [bossKills, loaded]);

  // ---------- statistiques dérivées ----------
  const causeCounts = useMemo(() => {
    const counts = {};
    deaths.forEach(d => { counts[d.source] = (counts[d.source] || 0) + 1; });
    return counts;
  }, [deaths]);

  const bossDeathCounts = useMemo(() => {
    const counts = {};
    deaths.forEach(d => {
      const { kind, value } = parseSource(d.source);
      if (kind === 'boss') counts[value] = (counts[value] || 0) + 1;
    });
    return counts;
  }, [deaths]);

  const knownCreatures = useMemo(() => sortedUniqueValues(deaths, 'creature'), [deaths]);
  const knownCustomCauses = useMemo(() => sortedUniqueValues(deaths, 'custom'), [deaths]);

  // ---------- mutations ----------
  function addDeath(source) {
    setDeaths(prev => [{ id: uid(), source, ts: Date.now() }, ...prev]);
  }

  function removeDeath(id) {
    setDeaths(prev => prev.filter(d => d.id !== id));
  }

  function clearDeaths() {
    setDeaths([]);
  }

  function adjustBossKill(id, dir) {
    setBossKills(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + dir) }));
  }

  function addNote(label, content) {
    setNotes(prev => [{ id: uid(), label, content, ts: Date.now() }, ...prev]);
  }

  function updateNote(id, fields) {
    setNotes(prev => prev.map(n => n.id === id
      ? { ...n, label: fields.label || n.label, content: fields.content || n.content }
      : n
    ));
  }

  function removeNote(id) {
    setNotes(prev => prev.filter(n => n.id !== id));
  }

  // ---------- import / export ----------
  function exportJournal() {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadJson(`ds3-journal-${stamp}.json`, { deaths, notes, bossKills });
    return { deaths: deaths.length, notes: notes.length };
  }

  // Fusionne un fichier importé avec le journal courant, en reprenant au
  // passage les fichiers exportés avant l'i18n.
  // Lève une erreur si le contenu n'est reconnaissable dans aucun des trois formats.
  function importJournal(parsed) {
    const rawDeaths = Array.isArray(parsed) ? parsed
      : Array.isArray(parsed && parsed.deaths) ? parsed.deaths : [];
    const rawNotes = Array.isArray(parsed && parsed.notes) ? parsed.notes : [];
    const rawBossKills = (parsed && typeof parsed.bossKills === 'object' && parsed.bossKills && !Array.isArray(parsed.bossKills))
      ? parsed.bossKills : {};

    if (rawDeaths.length === 0 && rawNotes.length === 0 && Object.keys(rawBossKills).length === 0) {
      throw new Error('format invalide');
    }

    const importedDeaths = rawDeaths.filter(e => e && typeof e.source === 'string');
    const importedNotes = rawNotes.filter(e => e && typeof e.content === 'string');

    setDeaths(prev => mergeEntries(prev, importedDeaths, e => ({ source: migrateSource(e.source) })));
    setNotes(prev => mergeEntries(prev, importedNotes, e => ({
      label: migrateNoteLabel((typeof e.label === 'string' && e.label) ? e.label : STRINGS[DEFAULT_LANG].defaultNoteLabel),
      content: e.content
    })));
    setBossKills(prev => {
      const next = { ...prev };
      // Réimporter son propre export ne doit pas doubler les compteurs.
      Object.entries(migrateBossKills(rawBossKills)).forEach(([id, count]) => {
        next[id] = Math.max(next[id] || 0, count);
      });
      return next;
    });

    return { deaths: importedDeaths.length, notes: importedNotes.length };
  }

  return {
    deaths, notes, bossKills,
    causeCounts, bossDeathCounts, knownCreatures, knownCustomCauses,
    addDeath, removeDeath, clearDeaths, adjustBossKill,
    addNote, updateNote, removeNote,
    exportJournal, importJournal
  };
}

// Valeurs distinctes d'un type de source, triées pour l'autocomplétion.
function sortedUniqueValues(deaths, kind) {
  const values = deaths
    .map(d => parseSource(d.source))
    .filter(s => s.kind === kind)
    .map(s => s.value);
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}
