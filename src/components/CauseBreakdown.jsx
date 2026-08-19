// Barres de répartition des morts par cause, de la plus fréquente à la plus rare.
function CauseBreakdown({ causeCounts }) {
  const { lang, t } = useI18n();

  const sortedCauses = useMemo(
    () => Object.entries(causeCounts).sort((a, b) => b[1] - a[1]),
    [causeCounts]
  );
  const maxCount = sortedCauses.length ? sortedCauses[0][1] : 1;

  return (
    <>
      <SectionLabel>{t('breakdownSection')}</SectionLabel>
      <div className="mb-8">
        {sortedCauses.length === 0 ? (
          <div className="text-[#746c5c] italic text-[16px] py-2 pb-5">{t('breakdownEmpty')}</div>
        ) : sortedCauses.map(([source, count]) => {
          const pct = Math.max(6, Math.round((count / maxCount) * 100));
          const label = formatSource(source, t, lang);
          return (
            <div key={source} className="grid grid-cols-[280px_1fr_40px] items-center gap-3.5 mb-2.5 text-[16px]">
              <div className="text-[#b8ae98] whitespace-nowrap overflow-hidden text-ellipsis" title={label}>{label}</div>
              <div className="bg-[#16130f] h-2 border border-[#332c20] relative">
                <div className="h-full bg-gradient-to-r from-[#9c1c1c] to-[#a9852f]" style={{ width: pct + '%' }} />
              </div>
              <div className="text-[#746c5c] text-right tabular-nums">{count}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
