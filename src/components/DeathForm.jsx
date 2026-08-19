// Les trois façons de consigner une mort : cause rapide, boss, créature ou saisie libre.
function DeathForm({ causeCounts, knownCreatures, knownCustomCauses, onRecord }) {
  const [bossChoice, setBossChoice] = useState(ALL_BOSSES[0]);
  const [creatureVal, setCreatureVal] = useState('');
  const [customVal, setCustomVal] = useState('');

  function submitCreature() {
    const val = creatureVal.trim();
    if (!val) return;
    onRecord(CREATURE_PREFIX + val);
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
      <SectionLabel>Cause de la mort</SectionLabel>

      <div className="grid grid-cols-3 gap-2.5 mb-3.5">
        {QUICK_CAUSES.map(cause => {
          const n = causeCounts[cause] || 0;
          return (
            <button
              key={cause}
              onClick={() => onRecord(cause)}
              className="flex flex-col items-center gap-0.5 bg-[#16130f] border border-[#332c20] text-[#b8ae98] font-body text-[17px] py-3.5 px-2 hover:border-[#9c1c1c] hover:bg-[#1d1911] active:scale-[0.97] transition"
            >
              <span>{cause}</span>
              <span className="font-display text-[11px] text-[#d4302f] opacity-80 min-h-[13px]">
                {n > 0 ? `${n} ${n > 1 ? 'morts' : 'mort'}` : ''}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 mb-8">
        <ThemedSelect value={bossChoice} onChange={(e) => setBossChoice(e.target.value)}>
          {Object.entries(BOSS_GROUPS).map(([group, bosses]) => (
            <optgroup key={group} label={group}>
              {bosses.map(name => <option key={name} value={name}>{name}</option>)}
            </optgroup>
          ))}
        </ThemedSelect>
        <button onClick={() => onRecord(BOSS_PREFIX + bossChoice)} className={actionButtonClass}>Boss</button>
      </div>

      <div className="flex gap-2 mb-8">
        <AutocompleteInput
          value={creatureVal}
          onChange={setCreatureVal}
          options={knownCreatures}
          placeholder="Nom de la créature (ex: Chevalier noir, Loup affamé)"
          onSubmit={submitCreature}
        />
        <button onClick={submitCreature} className={actionButtonClass}>Créature</button>
      </div>

      <div className="flex gap-2 mb-8">
        <AutocompleteInput
          value={customVal}
          onChange={setCustomVal}
          options={knownCustomCauses}
          placeholder="Autre cause…"
          onSubmit={submitCustom}
        />
        <button onClick={submitCustom} className={actionButtonClass}>Consigner</button>
      </div>
    </>
  );
}
