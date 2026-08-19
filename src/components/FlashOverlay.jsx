function FlashOverlay({ flash }) {
  if (!flash) return null;
  return (
    <div key={flash.key} className="fixed inset-0 flex items-center justify-center pointer-events-none z-[999]">
      <div
        className={
          "font-display font-bold text-[56px] tracking-[0.15em] animate-[ds3-die_1.6s_ease-out_forwards] " +
          (flash.kind === 'victory'
            ? "text-[#d4af5a] [text-shadow:0_0_30px_rgba(212,175,90,0.8),0_0_60px_rgba(212,175,90,0.4)]"
            : "text-[#d4302f] [text-shadow:0_0_30px_rgba(212,48,47,0.8),0_0_60px_rgba(212,48,47,0.4)]")
        }
      >
        {flash.msg}
      </div>
    </div>
  );
}
