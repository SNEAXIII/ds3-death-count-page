const STATUS_TIMEOUT_MS = 5000;
const RESET_ARM_TIMEOUT_MS = 4000;

// Export / import JSON et effacement du journal.
// `onExport` et `onImport` renvoient { deaths, notes } pour le message de confirmation.
function JournalActions({ onExport, onImport, onReset }) {
  const { t } = useI18n();

  const [status, setStatus] = useState(null);
  const [resetArmed, setResetArmed] = useState(false);

  const fileInputRef = useRef(null);
  const statusTimeoutRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  useEffect(() => () => {
    clearTimeout(statusTimeoutRef.current);
    clearTimeout(resetTimeoutRef.current);
  }, []);

  // Le statut mémorise la clé de traduction et ses arguments, pour rester
  // dans la bonne langue si elle change pendant l'affichage.
  function showStatus(key, kind, args) {
    setStatus({ key, kind, args: args || [] });
    clearTimeout(statusTimeoutRef.current);
    statusTimeoutRef.current = setTimeout(() => setStatus(null), STATUS_TIMEOUT_MS);
  }

  function handleExport() {
    const { deaths, notes } = onExport();
    showStatus('exportDone', 'ok', [deaths, notes]);
  }

  function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const { deaths, notes } = onImport(JSON.parse(reader.result));
        showStatus('importDone', 'ok', [deaths, notes]);
      } catch (err) {
        showStatus('importFailed', 'err');
      } finally {
        input.value = '';
      }
    };
    reader.readAsText(file);
  }

  // Premier clic : on arme. Second clic dans les 4 s : on efface.
  function handleResetClick() {
    if (!resetArmed) {
      setResetArmed(true);
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = setTimeout(() => setResetArmed(false), RESET_ARM_TIMEOUT_MS);
      return;
    }
    clearTimeout(resetTimeoutRef.current);
    setResetArmed(false);
    onReset();
  }

  const ioButtonClass =
    "bg-[#16130f] border border-[#332c20] text-[#d4af5a] font-display text-[11px] tracking-[0.13em] uppercase py-2 px-4 hover:border-[#a9852f] hover:bg-[#1d1911]";

  return (
    <>
      <div className="flex gap-2.5 justify-center mt-6">
        <button onClick={handleExport} className={ioButtonClass}>{t('exportButton')}</button>
        <button onClick={() => fileInputRef.current && fileInputRef.current.click()} className={ioButtonClass}>{t('importButton')}</button>
        <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportFile} />
      </div>

      <div className={
        "text-center text-[12.5px] mt-2 min-h-[16px] " +
        (status && status.kind === 'ok' ? "text-[#d4af5a] not-italic" :
         status && status.kind === 'err' ? "text-[#d4302f] not-italic" : "text-[#746c5c] italic")
      }>
        {status ? t(status.key, ...status.args) : ''}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={handleResetClick}
          className={
            "font-display text-[11px] tracking-[0.15em] uppercase py-2 px-[18px] border " +
            (resetArmed ? "border-[#d4302f] bg-[#9c1c1c] text-[#eee2c8]" : "border-[#332c20] text-[#746c5c] hover:border-[#9c1c1c] hover:text-[#d4302f]")
          }
        >
          {t(resetArmed ? 'resetArmed' : 'resetIdle')}
        </button>
        {resetArmed && <div className="text-[12.5px] italic text-[#746c5c] mt-2">{t('resetHint')}</div>}
      </div>
    </>
  );
}
