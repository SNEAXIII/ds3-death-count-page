function NoteEditor({ note, onSave, onCancel }) {
  const [label, setLabel] = useState(note.label);
  const [content, setContent] = useState(note.content);

  return (
    <div className="border border-[#332c20] bg-[#16130f] p-3.5 mb-2 flex flex-col gap-2">
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="bg-[#16130f] border border-[#332c20] text-[#b8ae98] text-[14px] px-3 py-2 outline-none focus:border-[#a9852f]"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[60px] bg-[#16130f] border border-[#332c20] text-[#b8ae98] text-[17px] px-3.5 py-2.5 outline-none focus:border-[#a9852f] resize-y"
      />
      <div className="flex gap-2">
        <button
          onClick={() => onSave({ label: label.trim(), content: content.trim() })}
          className="bg-[#9c1c1c] border border-[#d4302f] text-[#eee2c8] font-display text-[12px] tracking-[0.12em] uppercase px-4 py-2 hover:bg-[#d4302f]"
        >Enregistrer</button>
        <button
          onClick={onCancel}
          className="border border-[#332c20] text-[#746c5c] font-display text-[11px] tracking-[0.1em] uppercase px-4 hover:border-[#9c1c1c] hover:text-[#d4302f]"
        >Annuler</button>
      </div>
    </div>
  );
}

function NoteCard({ note, onEdit, onRemove }) {
  return (
    <div className="border border-[#332c20] bg-[#16130f] p-3.5 mb-2">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-display text-[10.5px] tracking-[0.1em] uppercase text-[#d4af5a] border border-[#a9852f] px-2 py-0.5 inline-block">{note.label}</span>
        <span className="text-[#746c5c] text-[12px]">{formatTime(note.ts)}</span>
      </div>
      <div className="text-[17px] text-[#b8ae98] leading-snug mb-1.5 whitespace-pre-wrap">{note.content}</div>
      <div className="flex items-center gap-3">
        <button onClick={onEdit} title="Éditer" aria-label="Éditer" className="text-[#746c5c] text-[14px] opacity-70 hover:text-[#d4af5a] hover:opacity-100">✎</button>
        <button onClick={onRemove} className="text-[#746c5c] text-[12.5px] underline opacity-60 hover:text-[#d4302f] hover:opacity-100">retirer</button>
      </div>
    </div>
  );
}

// Saisie, filtrage et édition des notes de voyage.
function NotesPanel({ notes, onAdd, onUpdate, onRemove }) {
  const [label, setLabel] = useState(NOTE_LABELS[0]);
  const [customLabel, setCustomLabel] = useState('');
  const [content, setContent] = useState('');
  const [filter, setFilter] = useState('');
  const [editingId, setEditingId] = useState(null);

  const labelSet = useMemo(() => Array.from(new Set(notes.map(n => n.label))).sort(), [notes]);
  const visibleNotes = filter ? notes.filter(n => n.label === filter) : notes;

  function submit() {
    const trimmed = content.trim();
    if (!trimmed) return;
    onAdd(customLabel.trim() || label || 'Note', trimmed);
    setContent('');
  }

  return (
    <>
      <SectionLabel>Notes de voyage</SectionLabel>

      <div className="grid grid-cols-3 gap-2.5 mb-3.5">
        {NOTE_LABELS.map(l => (
          <button
            key={l}
            onClick={() => { setLabel(l); setCustomLabel(''); }}
            className={
              "bg-[#16130f] border text-[15px] py-3.5 px-2 hover:border-[#a9852f] hover:bg-[#1d1911] active:scale-[0.97] transition " +
              (label === l && !customLabel.trim() ? "border-[#a9852f] bg-[#1d1911] text-[#d4af5a]" : "border-[#332c20] text-[#b8ae98]")
            }
          >{l}</button>
        ))}
      </div>

      <div className="flex gap-2 mb-3">
        <input
          value={customLabel}
          onChange={(e) => setCustomLabel(e.target.value)}
          type="text"
          placeholder="Label personnalisé (ex: Ascenseur, Marchand)"
          className="flex-1 bg-[#16130f] border border-[#332c20] text-[#b8ae98] font-body text-[17px] px-3.5 py-2.5 outline-none focus:border-[#a9852f] placeholder:italic placeholder:text-[#746c5c]"
        />
      </div>

      <div className="mb-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ex: Porte verrouillée depuis l'intérieur, s'ouvre après le boss de la zone."
          className="w-full min-h-[70px] bg-[#16130f] border border-[#332c20] text-[#b8ae98] font-body text-[17px] px-3.5 py-2.5 outline-none focus:border-[#a9852f] mb-2 resize-y placeholder:italic placeholder:text-[#746c5c]"
        />
        <button
          onClick={submit}
          className="w-full bg-[#9c1c1c] border border-[#d4302f] text-[#eee2c8] font-display text-[12px] tracking-[0.12em] uppercase py-2.5 hover:bg-[#d4302f]"
        >Ajouter la note</button>
      </div>

      <div className="mb-3.5">
        <ThemedSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Toutes les notes</option>
          {labelSet.map(l => <option key={l} value={l}>{l}</option>)}
        </ThemedSelect>
      </div>

      <div className="mb-8">
        {visibleNotes.length === 0 ? (
          <div className="text-[#746c5c] italic text-[16px] py-2 pb-5">
            {filter ? 'Aucune note avec ce label.' : "Aucune note pour l'instant. Portes, raccourcis, idées : tout se note ici."}
          </div>
        ) : visibleNotes.map(n => (
          editingId === n.id ? (
            <NoteEditor
              key={n.id}
              note={n}
              onSave={(fields) => { onUpdate(n.id, fields); setEditingId(null); }}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <NoteCard
              key={n.id}
              note={n}
              onEdit={() => setEditingId(n.id)}
              onRemove={() => onRemove(n.id)}
            />
          )
        ))}
      </div>
    </>
  );
}
