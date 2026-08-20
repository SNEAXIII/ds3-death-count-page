const DELETE_ARM_TIMEOUT_MS = 4000;

// Sélection du profil courant, création, renommage et suppression.
// Chaque profil est une partie : il a son propre journal, et son jeu, choisi à
// la création, ne change plus.
function ProfileBar({ profiles, active, nextName, onSelect, onCreate, onRename, onDelete }) {
  const { t } = useI18n();

  const [mode, setMode] = useState('idle');
  const [draftName, setDraftName] = useState('');
  const [draftGame, setDraftGame] = useState(DEFAULT_GAME);
  const [deleteArmed, setDeleteArmed] = useState(false);
  const deleteTimeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(deleteTimeoutRef.current), []);

  // Changer de profil en cours de saisie ou d'armement laisserait des contrôles
  // pointant vers le profil précédent.
  useEffect(() => {
    setMode('idle');
    setDeleteArmed(false);
    clearTimeout(deleteTimeoutRef.current);
  }, [active.id]);

  const isLast = profiles.length <= 1;

  function startCreate() {
    setDraftName(nextName());
    setDraftGame(gameOf(active).id);
    setMode('creating');
  }

  function startRename() {
    setDraftName(active.name);
    setMode('renaming');
  }

  function submit() {
    if (mode === 'creating') onCreate(draftName, draftGame);
    if (mode === 'renaming') onRename(active.id, draftName);
    setMode('idle');
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
        {mode === 'idle' ? (
          <>
            <div className="flex gap-2">
              <ThemedSelect value={active.id} onChange={(e) => onSelect(e.target.value)} ariaLabel={t('profileSection')}>
                {profiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </ThemedSelect>
              <button onClick={startCreate} className={buttonClass}>{t('newProfile')}</button>
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

            <div className="font-display text-[11px] tracking-[0.15em] uppercase text-[#a9852f] mt-2">
              {gameOf(active).label}
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <input
              autoFocus
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submit();
                if (e.key === 'Escape') setMode('idle');
              }}
              placeholder={t('profileNamePlaceholder')}
              className="flex-1 bg-[#16130f] border border-[#332c20] text-[#b8ae98] font-body text-[17px] px-3.5 py-2.5 outline-none focus:border-[#a9852f] placeholder:italic placeholder:text-[#746c5c]"
            />
            {mode === 'creating' && (
              <ThemedSelect value={draftGame} onChange={(e) => setDraftGame(e.target.value)} ariaLabel={t('gameLabel')}>
                {GAMES.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </ThemedSelect>
            )}
            <button onClick={submit} className="bg-[#9c1c1c] border border-[#d4302f] text-[#eee2c8] font-display text-[12px] tracking-[0.12em] uppercase px-4 hover:bg-[#d4302f]">
              {t(mode === 'creating' ? 'createProfileAction' : 'save')}
            </button>
            <button onClick={() => setMode('idle')} className="border border-[#332c20] text-[#746c5c] font-display text-[11px] tracking-[0.1em] uppercase px-4 hover:border-[#9c1c1c] hover:text-[#d4302f]">
              {t('cancel')}
            </button>
          </div>
        )}

        {deleteArmed && <div className="text-[12.5px] italic text-[#746c5c] mt-2">{t('deleteProfileHint')}</div>}
      </div>
    </>
  );
}
