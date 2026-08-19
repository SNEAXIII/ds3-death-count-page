const HISTORY_LIMIT = 25;

function DeathHistory({ deaths, onRemove }) {
  return (
    <>
      <SectionLabel>Historique récent</SectionLabel>
      <div className="mb-8">
        {deaths.length === 0 ? (
          <div className="text-[#746c5c] italic text-[16px] py-2 pb-5">L'historique est vide.</div>
        ) : deaths.slice(0, HISTORY_LIMIT).map(d => (
          <div key={d.id} className="flex justify-between items-center py-2 px-1 border-b border-[#332c20] last:border-b-0 text-[16px]">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[#b8ae98]">{d.source}</span>
              <span className="text-[#746c5c] text-[12.5px]">{formatTime(d.ts)}</span>
            </div>
            <button onClick={() => onRemove(d.id)} className="text-[#746c5c] text-[13px] underline opacity-60 hover:text-[#d4302f] hover:opacity-100">retirer</button>
          </div>
        ))}
      </div>
    </>
  );
}
