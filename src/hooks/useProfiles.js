// Liste des profils et profil actif. La liste est lue en initialiseur pour que
// le journal du bon personnage soit affiché dès le premier rendu.
function useProfiles(defaultNameFor) {
  const [profiles, setProfiles] = useState(() => loadProfiles(defaultNameFor(1)));
  const [activeId, setActiveId] = useState(() => readStored(ACTIVE_PROFILE_KEY, null));

  // Un identifiant inconnu — profil supprimé, stockage incohérent — ne doit pas
  // laisser l'application sans personnage courant.
  const active = profiles.find(p => p.id === activeId) || profiles[0];

  useEffect(() => { localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles)); }, [profiles]);
  useEffect(() => { localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(active.id)); }, [active.id]);

  // Le jeu est fixé ici, à la création, et ne change plus : un profil est un
  // personnage, donc une partie dans un jeu, et ses statistiques n'ont aucun
  // sens rapportées à un autre jeu.
  function createProfile(name, game) {
    const profile = makeProfile(name || nextProfileName(), game || active.game);
    setProfiles(prev => [...prev, profile]);
    setActiveId(profile.id);
    return profile;
  }

  function renameProfile(id, name) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setProfiles(prev => prev.map(p => (p.id === id ? { ...p, name: trimmed } : p)));
  }

  // Supprime le profil et son journal. Le dernier profil n'est pas supprimable :
  // l'application a toujours besoin d'un personnage courant.
  function deleteProfile(id) {
    if (profiles.length <= 1) return;
    const remaining = profiles.filter(p => p.id !== id);
    setProfiles(remaining);
    if (id === active.id) setActiveId(remaining[0].id);
    deleteProfileJournal(id);
  }

  function nextProfileName() {
    return defaultNameFor(profiles.length + 1);
  }

  return { profiles, active, nextProfileName, selectProfile: setActiveId, createProfile, renameProfile, deleteProfile };
}
