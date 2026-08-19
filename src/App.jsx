function App() {
  const journal = useJournal();
  const { flash, showFlash } = useFlash();

  function recordDeath(source) {
    journal.addDeath(source);
    showFlash('VOUS ÊTES MORT', 'death');
  }

  function recordBossKill(name, dir) {
    journal.adjustBossKill(name, dir);
    if (dir > 0) showFlash('BOSS VAINCU', 'victory');
  }

  return (
    <div
      className="min-h-screen bg-[#0b0a08] text-[#b8ae98] font-body px-6 pt-10 pb-16 relative"
      style={{ backgroundImage: "radial-gradient(ellipse at 50% -10%, rgba(156,28,28,0.10), transparent 60%)" }}
    >
      <div className="text-center tracking-[0.35em] text-[12px] text-[#a9852f] uppercase mb-1.5 opacity-85">Lothric se souvient</div>
      <div className="font-display text-center text-[15px] tracking-[0.18em] text-[#746c5c] uppercase mb-7">Dark Souls III — Journal des trépas</div>

      <div className="max-w-[900px] mx-auto">
        <DeathCounter count={journal.deaths.length} />

        <BossTracker
          bossKills={journal.bossKills}
          bossDeathCounts={journal.bossDeathCounts}
          onAdjust={recordBossKill}
        />

        <DeathForm
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
          onReset={journal.clearDeaths}
        />
      </div>

      <FlashOverlay flash={flash} />
    </div>
  );
}
