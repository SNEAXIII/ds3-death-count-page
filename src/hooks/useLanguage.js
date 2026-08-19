// Langue de l'interface : anglais par défaut, choix mémorisé d'une visite à
// l'autre. Lu en initialiseur (et non dans un effet) pour éviter d'afficher
// brièvement l'anglais à un lecteur qui a choisi le français.
function useLanguage() {
  const [lang, setLang] = useState(() => {
    const stored = readStored(LANG_KEY, DEFAULT_LANG);
    return LANGUAGES.some(l => l.id === stored) ? stored : DEFAULT_LANG;
  });

  useEffect(() => {
    localStorage.setItem(LANG_KEY, JSON.stringify(lang));
    document.documentElement.lang = lang;
    document.title = STRINGS[lang].title;
  }, [lang]);

  // t('clé') pour un texte simple, t('clé', ...args) quand la traduction est
  // une fonction (pluriels, valeurs interpolées).
  const t = useMemo(() => {
    const table = STRINGS[lang] || STRINGS[DEFAULT_LANG];
    return (key, ...args) => {
      const value = table[key];
      if (typeof value === 'function') return value(...args);
      return value !== undefined ? value : key;
    };
  }, [lang]);

  return useMemo(() => ({ lang, setLang, t }), [lang, t]);
}
