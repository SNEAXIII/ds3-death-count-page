function App() {
  const i18n = useLanguage();
  const profiles = useProfiles(n => i18n.t('defaultProfileName', n));
  const journal = useJournal(profiles.active);
  const game = gameOf(profiles.active);
  const { flash, showFlash } = useFlash();

  function recordDeath(source) {
    journal.addDeath(source);
    showFlash('death');
  }

  function recordBossKill(bossId, dir) {
    journal.adjustBossKill(bossId, dir);
    if (dir > 0) showFlash('victory');
  }

  return (
    <I18nContext.Provider value={i18n}>
      <div
        className="min-h-screen bg-[#0b0a08] text-[#b8ae98] font-body px-6 pt-10 pb-16 relative"
        style={{ backgroundImage: "radial-gradient(ellipse at 50% -10%, rgba(156,28,28,0.10), transparent 60%)" }}
      >
        <div className="text-center tracking-[0.35em] text-[12px] text-[#a9852f] uppercase mb-1.5 opacity-85">{i18n.t('tagline')}</div>
        <div className="font-display text-center text-[15px] tracking-[0.18em] text-[#746c5c] uppercase mb-4">{i18n.t('title')}</div>

        <div className="mb-7">
          <LanguageToggle />
        </div>

        <div className="max-w-[900px] mx-auto">
          <ProfileBar
            profiles={profiles.profiles}
            active={profiles.active}
            onSelect={profiles.selectProfile}
            onCreate={profiles.createProfile}
            nextName={profiles.nextProfileName}
            onRename={profiles.renameProfile}
            onDelete={profiles.deleteProfile}
          />

          <DeathCounter count={journal.deaths.length} />

          <BossTracker
            game={game}
            bossKills={journal.bossKills}
            bossDeathCounts={journal.bossDeathCounts}
            onAdjust={recordBossKill}
          />

          <DeathForm
            game={game}
            causeCounts={journal.causeCounts}
            knownCreatures={journal.knownCreatures}
            knownCustomCauses={journal.knownCustomCauses}
            onRecord={recordDeath}
          />

          <CauseBreakdown causeCounts={journal.causeCounts} />

          <NotesPanel
            notes={journal.notes}
            onAdd={journal.addNote}
            onUpdate={journal.updateNote}
            onRemove={journal.removeNote}
          />

          <DeathHistory deaths={journal.deaths} onRemove={journal.removeDeath} />

          <JournalActions
            onExport={journal.exportJournal}
            onImport={journal.importJournal}
            onReset={journal.clearJournal}
          />
        </div>

        <FlashOverlay flash={flash} />
      </div>
    </I18nContext.Provider>
  );
}
