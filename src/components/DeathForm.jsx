// Les trois façons de consigner une mort : cause rapide, boss, créature ou saisie libre.
function DeathForm({ causeCounts, knownCreatures, knownCustomCauses, onRecord }) {
  const { lang, t } = useI18n();

  const [bossId, setBossId] = useState(ALL_BOSSES[0].id);
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

  const actionButtonClass =
    "bg-[#9c1c1c] border border-[#d4302f] text-[#eee2c8] font-display text-[12px] tracking-[0.12em] uppercase px-5 hover:bg-[#d4302f]";

  return (
    <>
      <SectionLabel>{t('causeSection')}</SectionLabel>

      <div className="grid grid-cols-3 gap-2.5 mb-3.5">
        {QUICK_CAUSES.map(cause => {
          const n = causeCounts[causeSource(cause.id)] || 0;
          return (
            <button
              key={cause.id}
              onClick={() => onRecord(causeSource(cause.id))}
              className="flex flex-col items-center gap-0.5 bg-[#16130f] border border-[#332c20] text-[#b8ae98] font-body text-[17px] py-3.5 px-2 hover:border-[#9c1c1c] hover:bg-[#1d1911] active:scale-[0.97] transition"
            >
              <span>{labelOf(cause, lang)}</span>
              <span className="font-display text-[11px] text-[#d4302f] opacity-80 min-h-[13px]">
                {n > 0 ? t('deathCount', n) : ''}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 mb-8">
        <ThemedSelect value={bossId} onChange={(e) => setBossId(e.target.value)}>
          {BOSS_GROUPS.map(group => (
            <optgroup key={group.id} label={labelOf(group, lang)}>
              {group.bosses.map(boss => <option key={boss.id} value={boss.id}>{labelOf(boss, lang)}</option>)}
            </optgroup>
          ))}
        </ThemedSelect>
        <button onClick={() => onRecord(bossSource(bossId))} className={actionButtonClass}>{t('bossButton')}</button>
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
