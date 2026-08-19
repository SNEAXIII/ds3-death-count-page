function DeathCounter({ count }) {
  const { t } = useI18n();
  return (
    <div className="text-center border-t border-b border-[#332c20] py-5 mb-9">
      <div className="font-display font-black text-[76px] leading-none text-[#d4302f] [text-shadow:0_0_24px_rgba(212,48,47,0.35)]">{count}</div>
      <div className="font-display text-[13px] tracking-[0.3em] uppercase text-[#746c5c] mt-1.5">{t('deathsRecorded')}</div>
    </div>
  );
}
