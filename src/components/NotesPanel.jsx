function NoteEditor({ note, onSave, onCancel }) {
  const { lang, t } = useI18n();
  const [label, setLabel] = useState(formatNoteLabel(note.label, lang));
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
          onClick={() => onSave({ label: migrateNoteLabel(label.trim()), content: content.trim() })}
          className="bg-[#9c1c1c] border border-[#d4302f] text-[#eee2c8] font-display text-[12px] tracking-[0.12em] uppercase px-4 py-2 hover:bg-[#d4302f]"
        >{t('saveNote')}</button>
        <button
          onClick={onCancel}
          className="border border-[#332c20] text-[#746c5c] font-display text-[11px] tracking-[0.1em] uppercase px-4 hover:border-[#9c1c1c] hover:text-[#d4302f]"
        >{t('cancelEdit')}</button>
      </div>
    </div>
  );
}

function NoteCard({ note, onEdit, onRemove }) {
  const { lang, t } = useI18n();

  return (
    <div className="border border-[#332c20] bg-[#16130f] p-3.5 mb-2">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-display text-[10.5px] tracking-[0.1em] uppercase text-[#d4af5a] border border-[#a9852f] px-2 py-0.5 inline-block">{formatNoteLabel(note.label, lang)}</span>
        <span className="text-[#746c5c] text-[12px]">{formatTime(note.ts, lang)}</span>
      </div>
      <div className="text-[17px] text-[#b8ae98] leading-snug mb-1.5 whitespace-pre-wrap">{note.content}</div>
      <div className="flex items-center gap-3">
        <button onClick={onEdit} title={t('editNote')} aria-label={t('editNote')} className="text-[#746c5c] text-[14px] opacity-70 hover:text-[#d4af5a] hover:opacity-100">✎</button>
        <button onClick={onRemove} className="text-[#746c5c] text-[12.5px] underline opacity-60 hover:text-[#d4302f] hover:opacity-100">{t('remove')}</button>
      </div>
    </div>
  );
}

// Saisie, filtrage et édition des notes de voyage.
function NotesPanel({ notes, onAdd, onUpdate, onRemove }) {
  const { lang, t } = useI18n();

  const [labelId, setLabelId] = useState(NOTE_LABELS[0].id);
  const [customLabel, setCustomLabel] = useState('');
  const [content, setContent] = useState('');
  const [filter, setFilter] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Les labels stockés sont soit un identifiant de préréglage, soit du texte libre.
  const usedLabels = useMemo(
    () => Array.from(new Set(notes.map(n => n.label)))
      .sort((a, b) => formatNoteLabel(a, lang).localeCompare(formatNoteLabel(b, lang))),
    [notes, lang]
  );
  const visibleNotes = filter ? notes.filter(n => n.label === filter) : notes;

  function submit() {
    const trimmed = content.trim();
    if (!trimmed) return;
    const custom = customLabel.trim();
    onAdd(custom ? migrateNoteLabel(custom) : labelId, trimmed);
    setContent('');
  }

  return (
    <>
      <SectionLabel>{t('notesSection')}</SectionLabel>

      <div className="grid grid-cols-3 gap-2.5 mb-3.5">
        {NOTE_LABELS.map(preset => (
          <button
            key={preset.id}
            onClick={() => { setLabelId(preset.id); setCustomLabel(''); }}
            className={
              "bg-[#16130f] border text-[15px] py-3.5 px-2 hover:border-[#a9852f] hover:bg-[#1d1911] active:scale-[0.97] transition " +
              (labelId === preset.id && !customLabel.trim() ? "border-[#a9852f] bg-[#1d1911] text-[#d4af5a]" : "border-[#332c20] text-[#b8ae98]")
            }
          >{labelOf(preset, lang)}</button>
        ))}
      </div>

      <div className="flex gap-2 mb-3">
        <input
          value={customLabel}
          onChange={(e) => setCustomLabel(e.target.value)}
          type="text"
          placeholder={t('customLabelPlaceholder')}
          className="flex-1 bg-[#16130f] border border-[#332c20] text-[#b8ae98] font-body text-[17px] px-3.5 py-2.5 outline-none focus:border-[#a9852f] placeholder:italic placeholder:text-[#746c5c]"
        />
      </div>

      <div className="mb-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t('notePlaceholder')}
          className="w-full min-h-[70px] bg-[#16130f] border border-[#332c20] text-[#b8ae98] font-body text-[17px] px-3.5 py-2.5 outline-none focus:border-[#a9852f] mb-2 resize-y placeholder:italic placeholder:text-[#746c5c]"
        />
        <button
          onClick={submit}
          className="w-full bg-[#9c1c1c] border border-[#d4302f] text-[#eee2c8] font-display text-[12px] tracking-[0.12em] uppercase py-2.5 hover:bg-[#d4302f]"
        >{t('addNote')}</button>
      </div>

      <div className="mb-3.5">
        <ThemedSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">{t('allNotes')}</option>
          {usedLabels.map(l => <option key={l} value={l}>{formatNoteLabel(l, lang)}</option>)}
        </ThemedSelect>
      </div>

      <div className="mb-8">
        {visibleNotes.length === 0 ? (
          <div className="text-[#746c5c] italic text-[16px] py-2 pb-5">
            {t(filter ? 'notesEmptyFiltered' : 'notesEmpty')}
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
