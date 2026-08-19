// Un profil = une partie, c'est-à-dire un personnage. Chaque profil a son
// propre journal : les trois clés de stockage sont suffixées par son id.
function profileKey(baseKey, profileId) {
  return baseKey + ':' + profileId;
}

function makeProfile(name) {
  return { id: uid(), name, createdAt: Date.now() };
}

// Charge la liste des profils. À la première visite après l'ajout des profils,
// le journal unique existant devient le premier profil plutôt que d'être perdu.
function loadProfiles(defaultName) {
  const stored = readStored(PROFILES_KEY, null);
  const valid = Array.isArray(stored) ? stored.filter(p => p && typeof p.id === 'string') : [];
  if (valid.length) return valid;

  const profile = makeProfile(defaultName);
  adoptLegacyJournal(profile.id);
  return [profile];
}

function adoptLegacyJournal(profileId) {
  JOURNAL_KEYS.forEach(baseKey => {
    const raw = localStorage.getItem(baseKey);
    if (raw === null) return;
    if (localStorage.getItem(profileKey(baseKey, profileId)) === null) {
      localStorage.setItem(profileKey(baseKey, profileId), raw);
    }
    localStorage.removeItem(baseKey);
  });
}

function deleteProfileJournal(profileId) {
  JOURNAL_KEYS.forEach(baseKey => localStorage.removeItem(profileKey(baseKey, profileId)));
}

// Nom de fichier d'export : « ds3-journal-<profil>-<date>.json ».
function profileSlug(name) {
  const slug = labelKey(name);
  return slug || 'profil';
}
