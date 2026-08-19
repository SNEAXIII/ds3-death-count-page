// Message plein écran éphémère ('death' ou 'victory'). Seul le type est
// mémorisé, le texte est traduit au rendu ; `key` change à chaque appel pour
// rejouer l'animation même sur un message identique.
function useFlash() {
  const [flash, setFlash] = useState(null);

  function showFlash(kind) {
    setFlash({ kind, key: Date.now() });
  }

  return { flash, showFlash };
}
