function SectionLabel({ children }) {
  return (
    <div className="font-display text-[12px] tracking-[0.22em] uppercase text-[#d4af5a] flex items-center gap-2.5 mb-3 mt-2">
      <span>{children}</span>
      <span className="flex-1 h-px bg-gradient-to-r from-[#332c20] to-transparent" />
    </div>
  );
}
