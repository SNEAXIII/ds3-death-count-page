# Dark Souls III — Journal des trépas

Compteur de morts, suivi des boss et notes de voyage pour Dark Souls III.
Autant de **profils** que de parties en cours — un profil par personnage,
chacun avec son propre journal. Interface bilingue **anglais / français**, en
anglais par défaut, avec un sélecteur EN/FR sous le titre. Tout est stocké en
local dans le navigateur (`localStorage`), avec export / import JSON pour
changer de machine.

## Déploiement

Le site est publié sur GitHub Pages depuis la branche par défaut : aucune
étape de build, Pages sert le dossier tel quel. Les chemins vers `assets/`
et `src/` sont relatifs, ils fonctionnent donc sous le sous-dossier
`/ds3-death-count-page/`. Le fichier `.nojekyll` désactive le passage par
Jekyll, inutile ici.

## Lancer en local

Les sources sont chargées par requête HTTP : ouvrir `index.html` en `file://`
ne fonctionne pas (Pages, lui, sert bien en HTTP). En local, servir le dossier
suffit :

```sh
python3 -m http.server 8000
# puis http://localhost:8000
```

## Profils

Chaque profil correspond à une partie, donc à un personnage : morts, notes et
kills de boss lui sont propres. Les trois clés de journal sont suffixées par
l'identifiant du profil (`ds3-deaths-log:<id>`, …), la liste des profils et le
profil courant vivant dans `ds3-profiles` et `ds3-active-profile`. Le journal
unique d'avant les profils devient automatiquement le premier profil.

L'export et l'import portent sur le **profil courant** : le fichier reprend son
nom, à titre indicatif, et reste importable dans n'importe quel autre profil.
Le dernier profil n'est pas supprimable — pour repartir de zéro sans perdre le
personnage, « Effacer le journal » est là pour ça.

## Langues et données stockées

Rien de traduisible n'est enregistré en clair. Une mort est une chaîne
indépendante de la langue — `cause:fall`, `boss:vordt`,
`creature:<nom saisi>`, ou du texte libre pour une cause personnalisée — et
les labels de notes préréglés sont stockés par identifiant (`door`,
`shortcut`, …). Seul l'affichage est traduit, donc changer de langue
retraduit l'historique déjà consigné.

Les journaux créés avant l'i18n (noms de boss et causes en français) sont
convertis à la lecture, aussi bien depuis `localStorage` que depuis un
fichier importé : rien à refaire côté joueur. La reconnaissance des anciens
libellés ignore la casse, les accents et la ponctuation ; un boss renommé
depuis garde ses anciens noms dans `aliases`, ce qui rattache les journaux
existants à la bonne entrée.

## Structure

```
index.html                  page + ordre de chargement des scripts
assets/styles.css           polices, scrollbar, animation du flash
src/utils.js                helpers génériques (ids, dates, index, fusion, export fichier)
src/constants.js            clés localStorage, boss, causes, labels de notes (id + libellés)
src/react-globals.js        déstructuration unique des hooks React
src/i18n.js                 textes d'interface EN/FR, contexte de langue
src/journal-entries.js      format des sources de mort, affichage et reprise des anciens journaux
src/profiles.js             clés de stockage par profil, reprise du journal d'avant les profils
src/hooks/useLanguage.js    langue courante, persistance, fonction t()
src/hooks/useProfiles.js    liste des profils, profil actif, création / renommage / suppression
src/hooks/useJournal.js     journal du profil actif : persistance, mutations, stats dérivées, import/export
src/hooks/useFlash.js       message plein écran éphémère
src/components/             primitives (SectionLabel, ThemedSelect, AutocompleteInput,
                            LanguageToggle) et une section par bloc de la page,
                            dont ProfileBar (sélection et gestion des profils)
src/App.jsx                 composition des sections
src/main.jsx                montage React
```

Pas d'étape de build : React, Tailwind et Babel Standalone sont chargés depuis
un CDN, et le JSX est transpilé dans le navigateur. Les fichiers de `src/`
partagent la portée globale — l'ordre des balises `<script>` dans `index.html`
est donc l'ordre des dépendances.
