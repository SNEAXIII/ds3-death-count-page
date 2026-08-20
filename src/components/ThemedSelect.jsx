function ThemedSelect({ value, onChange, ariaLabel, children }) {
  return (
    <div className="relative flex-1">
      <select
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        className="w-full appearance-none bg-[#16130f] border border-[#332c20] text-[#b8ae98] font-body text-[17px] px-3.5 py-2.5 pr-8 outline-none focus:border-[#a9852f] cursor-pointer"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a9852f] text-[10px]">▼</span>
    </div>
  );
}
