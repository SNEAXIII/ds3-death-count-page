// Les trois façons de consigner une mort : cause rapide, boss, créature ou saisie libre.
function DeathForm({ game, causeCounts, knownCreatures, knownCustomCauses, onRecord }) {
  const { lang, t } = useI18n();

  const [bossId, setBossId] = useState(bossesOf(game)[0].id);

  // Changer le jeu du profil laisse une sélection qui n'existe plus dans le
  // nouveau roster : on retombe alors sur son premier boss.
  const roster = bossesOf(game);
  const selectedBossId = roster.some(boss => boss.id === bossId) ? bossId : roster[0].id;
  const [creatureVal, setCreatureVal] = useState('');
  const [customVal, setCustomVal] = useState('');

  function submitCreature() {
    const val = creatureVal.trim();
    if (!val) return;
    onRecord(creatureSource(val));
    setCreatureVal('');
  }

  function submitCustom() {
    const val = customVal.trim();
    if (!val) return;
    onRecord(val);
    setCustomVal('');
  }

  // Largeur commune : sans elle, chaque bouton se cale sur son libellé et la
  // colonne de droite part en escalier.
  const actionButtonClass =
    "w-[150px] shrink-0 bg-[#9c1c1c] border border-[#d4302f] text-[#eee2c8] font-display text-[12px] tracking-[0.12em] uppercase px-3 hover:bg-[#d4302f]";

  return (
    <>
      <SectionLabel>{t('causeSection')}</SectionLabel>

      <div className="grid grid-cols-3 gap-2.5 mb-3.5">
        {QUICK_CAUSES.map(cause => {
          const n = causeCounts[causeSource(cause.id)] || 0;
          // Le compteur est en surimpression : réservé dans le flux, il
          // décalerait le libellé vers le haut sur les causes sans mort.
          return (
            <button
              key={cause.id}
              onClick={() => onRecord(causeSource(cause.id))}
              className="relative flex items-center justify-center min-h-[76px] bg-[#16130f] border border-[#332c20] text-[#b8ae98] font-body text-[17px] px-2 hover:border-[#9c1c1c] hover:bg-[#1d1911] active:scale-[0.97] transition"
            >
              <span>{labelOf(cause, lang)}</span>
              {n > 0 && (
                <span className="absolute bottom-2 left-0 right-0 font-display text-[11px] text-[#d4302f] opacity-80">
                  {t('deathCount', n)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 mb-8">
        <ThemedSelect value={selectedBossId} onChange={(e) => setBossId(e.target.value)}>
          {game.groups.map(group => (
            <optgroup key={group.id} label={labelOf(group, lang)}>
              {group.bosses.map(boss => <option key={boss.id} value={boss.id}>{labelOf(boss, lang)}</option>)}
            </optgroup>
          ))}
        </ThemedSelect>
        <button onClick={() => onRecord(bossSource(selectedBossId))} className={actionButtonClass}>{t('bossButton')}</button>
      </div>

      <div className="flex gap-2 mb-8">
        <AutocompleteInput
          value={creatureVal}
          onChange={setCreatureVal}
          options={knownCreatures}
          placeholder={t('creaturePlaceholder')}
          onSubmit={submitCreature}
        />
        <button onClick={submitCreature} className={actionButtonClass}>{t('creatureButton')}</button>
      </div>

      <div className="flex gap-2 mb-8">
        <AutocompleteInput
          value={customVal}
          onChange={setCustomVal}
          options={knownCustomCauses}
          placeholder={t('customPlaceholder')}
          onSubmit={submitCustom}
        />
        <button onClick={submitCustom} className={actionButtonClass}>{t('customButton')}</button>
      </div>
    </>
  );
}
