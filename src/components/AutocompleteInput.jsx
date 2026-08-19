// Champ texte libre avec suggestions issues des saisies précédentes.
// Entrée valide la suggestion active, sinon soumet la saisie brute.
function AutocompleteInput({ value, onChange, options, placeholder, onSubmit }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);

  const query = value.trim().toLowerCase();
  const matches = (query ? options.filter(o => o.toLowerCase().includes(query)) : options).slice(0, 8);

  function handleKeyDown(e) {
    if (open && matches.length > 0 && e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, matches.length - 1));
    } else if (open && matches.length > 0 && e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (open && e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open && activeIndex >= 0 && matches[activeIndex]) {
        onChange(matches[activeIndex]);
        setOpen(false);
        setActiveIndex(-1);
      } else {
        setOpen(false);
        onSubmit();
      }
    }
  }

  return (
    <div className="relative flex-1">
      <input
        ref={inputRef}
        type="text"
        autoComplete="off"
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); setActiveIndex(-1); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-[#16130f] border border-[#332c20] text-[#b8ae98] font-body text-[17px] px-3.5 py-2.5 outline-none focus:border-[#a9852f] placeholder:text-[#746c5c] placeholder:italic"
      />
      {open && matches.length > 0 && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-[#1d1911] border border-[#a9852f] max-h-[220px] overflow-y-auto z-50">
          {matches.map((m, i) => (
            <div
              key={m}
              onMouseDown={(e) => { e.preventDefault(); onChange(m); setOpen(false); inputRef.current && inputRef.current.focus(); }}
              className={
                "px-3.5 py-2.5 font-body text-[15px] cursor-pointer border-b border-[#332c20] last:border-b-0 " +
                (i === activeIndex ? "bg-[#9c1c1c] text-[#eee2c8]" : "text-[#b8ae98] hover:bg-[#9c1c1c] hover:text-[#eee2c8]")
              }
            >
              {m}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
