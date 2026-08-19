const DELETE_ARM_TIMEOUT_MS = 4000;

// Sélection du profil courant, création, renommage et suppression.
// Chaque profil est une partie : il a son propre journal.
function ProfileBar({ profiles, active, onSelect, onCreate, onRename, onDelete }) {
  const { t } = useI18n();

  const [renaming, setRenaming] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [deleteArmed, setDeleteArmed] = useState(false);
  const deleteTimeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(deleteTimeoutRef.current), []);

  // Changer de profil en cours de renommage ou d'armement laisserait des
  // contrôles pointant vers le profil précédent.
  useEffect(() => {
    setRenaming(false);
    setDeleteArmed(false);
    clearTimeout(deleteTimeoutRef.current);
  }, [active.id]);

  const isLast = profiles.length <= 1;

  function startRename() {
    setDraftName(active.name);
    setRenaming(true);
  }

  function submitRename() {
    onRename(active.id, draftName);
    setRenaming(false);
  }

  // Premier clic : on arme. Second clic dans les 4 s : on supprime.
  function handleDeleteClick() {
    if (!deleteArmed) {
      setDeleteArmed(true);
      clearTimeout(deleteTimeoutRef.current);
      deleteTimeoutRef.current = setTimeout(() => setDeleteArmed(false), DELETE_ARM_TIMEOUT_MS);
      return;
    }
    clearTimeout(deleteTimeoutRef.current);
    setDeleteArmed(false);
    onDelete(active.id);
  }

  const buttonClass =
    "font-display text-[11px] tracking-[0.13em] uppercase px-3.5 py-2 border bg-[#16130f] border-[#332c20] text-[#d4af5a] hover:border-[#a9852f] hover:bg-[#1d1911]";

  return (
    <>
      <SectionLabel>{t('profileSection')}</SectionLabel>

      <div className="mb-8">
      {renaming ? (
        <div className="flex gap-2">
          <input
            autoFocus
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitRename();
              if (e.key === 'Escape') setRenaming(false);
            }}
            placeholder={t('profileNamePlaceholder')}
            className="flex-1 bg-[#16130f] border border-[#332c20] text-[#b8ae98] font-body text-[17px] px-3.5 py-2.5 outline-none focus:border-[#a9852f] placeholder:italic placeholder:text-[#746c5c]"
          />
          <button onClick={submitRename} className="bg-[#9c1c1c] border border-[#d4302f] text-[#eee2c8] font-display text-[12px] tracking-[0.12em] uppercase px-4 hover:bg-[#d4302f]">{t('save')}</button>
          <button onClick={() => setRenaming(false)} className="border border-[#332c20] text-[#746c5c] font-display text-[11px] tracking-[0.1em] uppercase px-4 hover:border-[#9c1c1c] hover:text-[#d4302f]">{t('cancel')}</button>
        </div>
      ) : (
        <div className="flex gap-2">
          <ThemedSelect value={active.id} onChange={(e) => onSelect(e.target.value)}>
            {profiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </ThemedSelect>
          <button onClick={() => onCreate()} className={buttonClass}>{t('newProfile')}</button>
          <button onClick={startRename} className={buttonClass}>{t('renameProfile')}</button>
          <button
            onClick={handleDeleteClick}
            disabled={isLast}
            title={isLast ? t('lastProfileTitle') : undefined}
            className={
              "font-display text-[11px] tracking-[0.13em] uppercase px-3.5 py-2 border " +
              (isLast ? "border-[#332c20] text-[#746c5c] opacity-35 cursor-default" :
               deleteArmed ? "border-[#d4302f] bg-[#9c1c1c] text-[#eee2c8]" :
               "border-[#332c20] bg-[#16130f] text-[#746c5c] hover:border-[#9c1c1c] hover:text-[#d4302f]")
            }
          >{deleteArmed ? t('deleteProfileArmed') : t('deleteProfile')}</button>
        </div>
      )}

      {deleteArmed && <div className="text-[12.5px] italic text-[#746c5c] mt-2">{t('deleteProfileHint')}</div>}
      </div>
    </>
  );
}
