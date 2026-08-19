# Dark Souls III — Journal des trépas

Compteur de morts, suivi des boss et notes de voyage pour Dark Souls III.
Tout est stocké en local dans le navigateur (`localStorage`), avec export /
import JSON pour changer de machine.

## Lancer en local

Les sources sont chargées par requête HTTP : ouvrir `index.html` en `file://`
ne fonctionne pas. Servir le dossier suffit :

```sh
python3 -m http.server 8000
# puis http://localhost:8000
```

## Structure

```
index.html                  page + ordre de chargement des scripts
assets/styles.css           polices, scrollbar, animation du flash
src/constants.js            clés localStorage, listes de boss, causes, labels
src/utils.js                identifiants, dates, lecture localStorage, fusion, export fichier
src/react-globals.js        déstructuration unique des hooks React
src/hooks/useJournal.js     état du journal : persistance, mutations, stats dérivées, import/export
src/hooks/useFlash.js       message plein écran éphémère
src/components/             primitives (SectionLabel, ThemedSelect, AutocompleteInput)
                            et sections (DeathCounter, BossTracker, DeathForm,
                            CauseBreakdown, NotesPanel, DeathHistory,
                            JournalActions, FlashOverlay)
src/App.jsx                 composition des sections
src/main.jsx                montage React
```

Pas d'étape de build : React, Tailwind et Babel Standalone sont chargés depuis
un CDN, et le JSX est transpilé dans le navigateur. Les fichiers de `src/`
partagent la portée globale — l'ordre des balises `<script>` dans `index.html`
est donc l'ordre des dépendances.
