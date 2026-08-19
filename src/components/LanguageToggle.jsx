function LanguageToggle() {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="flex gap-1 justify-center" role="group" aria-label={t('languageLabel')}>
      {LANGUAGES.map(({ id, label, name }) => (
        <button
          key={id}
          onClick={() => setLang(id)}
          aria-pressed={lang === id}
          title={name}
          className={
            "font-display text-[11px] tracking-[0.15em] uppercase px-2.5 py-1 border " +
            (lang === id
              ? "border-[#a9852f] bg-[#1d1911] text-[#d4af5a]"
              : "border-[#332c20] text-[#746c5c] hover:border-[#a9852f] hover:text-[#d4af5a]")
          }
        >{label}</button>
      ))}
    </div>
  );
}
