// Message plein écran éphémère ("VOUS ÊTES MORT" / "BOSS VAINCU").
// `key` change à chaque appel pour rejouer l'animation même sur un message identique.
function useFlash() {
  const [flash, setFlash] = useState(null);

  function showFlash(msg, kind) {
    setFlash({ msg, kind, key: Date.now() });
  }

  return { flash, showFlash };
}
