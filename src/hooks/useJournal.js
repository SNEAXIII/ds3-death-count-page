// Source de vérité du journal : morts, notes, kills de boss.
// Charge depuis localStorage au montage, y réécrit à chaque changement,
// et expose les mutations ainsi que les statistiques dérivées.
function useJournal() {
  const [deaths, setDeaths] = useState([]);
  const [notes, setNotes] = useState([]);
  const [bossKills, setBossKills] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setDeaths(readStored(STORAGE_KEY, []));
    setNotes(readStored(NOTES_KEY, []));
    setBossKills(readStored(BOSS_KILLS_KEY, {}));
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
      if (d.source.startsWith(BOSS_PREFIX)) {
        const name = d.source.slice(BOSS_PREFIX.length);
        counts[name] = (counts[name] || 0) + 1;
      }
    });
    return counts;
  }, [deaths]);

  const knownCreatures = useMemo(() => Array.from(new Set(
    deaths.filter(d => d.source.startsWith(CREATURE_PREFIX)).map(d => d.source.slice(CREATURE_PREFIX.length))
  )).sort((a, b) => a.localeCompare(b, 'fr')), [deaths]);

  const knownCustomCauses = useMemo(() => Array.from(new Set(
    deaths.map(d => d.source).filter(s =>
      !QUICK_CAUSES.includes(s) && !s.startsWith(BOSS_PREFIX) && !s.startsWith(CREATURE_PREFIX)
    )
  )).sort((a, b) => a.localeCompare(b, 'fr')), [deaths]);

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

  function adjustBossKill(name, dir) {
    setBossKills(prev => ({ ...prev, [name]: Math.max(0, (prev[name] || 0) + dir) }));
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

  // Fusionne un fichier importé avec le journal courant.
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

    setDeaths(prev => mergeEntries(prev, importedDeaths, e => ({ source: e.source })));
    setNotes(prev => mergeEntries(prev, importedNotes, e => ({
      label: (typeof e.label === 'string' && e.label) ? e.label : 'Note',
      content: e.content
    })));
    setBossKills(prev => {
      const next = { ...prev };
      Object.entries(rawBossKills).forEach(([name, count]) => {
        if (typeof count !== 'number' || count < 0) return;
        next[name] = Math.max(next[name] || 0, count);
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
