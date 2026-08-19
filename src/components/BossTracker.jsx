function BossRow({ name, kills, deathCount, onAdjust }) {
  return (
    <div className="grid grid-cols-[20px_1fr_auto_auto_auto] items-center gap-2.5 py-2 px-1 border-b border-[#332c20] last:border-b-0">
      <span className="text-[#d4af5a] text-[15px] text-center">{kills > 0 ? '✓' : ''}</span>
      <span className={"text-[15px] " + (kills > 0 ? "text-[#d4af5a]" : "text-[#b8ae98]")}>{name}</span>
      <span className="text-[12.5px] text-[#d4302f] opacity-85 min-w-[46px] text-right tabular-nums">
        {deathCount > 0 ? `${deathCount} ${deathCount === 1 ? 'mort' : 'morts'}` : '—'}
      </span>
      <span className={"text-[13.5px] min-w-[54px] text-right tabular-nums " + (kills > 0 ? "text-[#d4af5a]" : "text-[#746c5c]")}>
        {kills} {kills === 1 ? 'kill' : 'kills'}
      </span>
      <span className="flex gap-1.5">
        <button
          disabled={kills === 0}
          onClick={() => onAdjust(name, -1)}
          className={
            "w-[26px] h-[26px] font-display text-[12px] border border-[#332c20] bg-[#16130f] text-[#b8ae98] " +
            (kills === 0 ? "opacity-35 cursor-default" : "cursor-pointer hover:border-[#9c1c1c] hover:text-[#d4302f]")
          }
        >−</button>
        <button
          onClick={() => onAdjust(name, 1)}
          className="w-[26px] h-[26px] font-display text-[12px] border border-[#332c20] bg-[#16130f] text-[#b8ae98] cursor-pointer hover:border-[#a9852f] hover:text-[#d4af5a]"
        >+</button>
      </span>
    </div>
  );
}

function BossTracker({ bossKills, bossDeathCounts, onAdjust }) {
  const defeatedCount = ALL_BOSSES.filter(name => (bossKills[name] || 0) > 0).length;
  const totalKills = ALL_BOSSES.reduce((sum, name) => sum + (bossKills[name] || 0), 0);

  return (
    <>
      <SectionLabel>Boss vaincus</SectionLabel>

      <div className="flex gap-8 justify-center border-t border-b border-[#332c20] py-4 mb-4">
        <div className="text-center">
          <span className="font-display font-bold text-[32px] text-[#d4af5a]">{defeatedCount}</span>
          <span className="text-[#746c5c] text-[20px] mx-1">/</span>
          <span className="font-display text-[20px] text-[#746c5c]">{ALL_BOSSES.length}</span>
          <div className="font-display text-[10.5px] tracking-[0.15em] uppercase text-[#746c5c] mt-1">Boss vaincus</div>
        </div>
        <div className="text-center">
          <span className="font-display font-bold text-[32px] text-[#d4af5a]">{totalKills}</span>
          <div className="font-display text-[10.5px] tracking-[0.15em] uppercase text-[#746c5c] mt-1">Kills au total</div>
        </div>
      </div>

      <div className="mb-9">
        {Object.entries(BOSS_GROUPS).map(([group, bosses]) => (
          <div key={group}>
            <div className="font-display text-[11px] tracking-[0.12em] uppercase text-[#746c5c] mt-4 mb-2">{group}</div>
            {bosses.map(name => (
              <BossRow
                key={name}
                name={name}
                kills={bossKills[name] || 0}
                deathCount={bossDeathCounts[name] || 0}
                onAdjust={onAdjust}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
