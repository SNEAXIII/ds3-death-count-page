# Instructions de travail

Journal de morts Dark Souls III, publié sur GitHub Pages. Page statique, sans
étape de build. Ce fichier fixe les règles à respecter dans ce dépôt ; le
`README.md` décrit le projet côté utilisateur.

## Règle centrale : rien de caché en localStorage

**Toute donnée écrite en localStorage doit être effaçable, exportable et
réimportable.** Une donnée qu'on ne peut ni nettoyer ni emporter est un piège :
elle survit à un « Effacer le journal », manque à la restauration, et personne
ne s'en aperçoit avant d'avoir perdu une partie.

Concrètement, en ajoutant un état persistant :

1. l'inclure dans l'effacement (`clearJournal`) ;
2. l'inclure dans `exportJournal` **et** dans `importJournal` ;
3. le rattacher au profil courant via `profileKey()`, sauf préférence
   applicative assumée ;
4. l'ajouter à l'inventaire ci-dessous ;
5. couvrir le cycle complet par un test navigateur : saisir → exporter →
   effacer → réimporter → recharger.

### Inventaire des clés

| Clé | Portée | Effaçable | Export / import |
| --- | --- | --- | --- |
| `ds3-deaths-log:<profil>` | journal | oui | oui |
| `ds3-notes-log:<profil>` | journal | oui | oui |
| `ds3-boss-kills:<profil>` | journal | oui | oui |
| `ds3-profiles` | application | via « Supprimer » | **non** |
| `ds3-active-profile` | application | via « Supprimer » | **non** |
| `ds3-lang` | préférence | **non** | **non** |

Les trois dernières lignes sont l'écart connu à la règle : la liste des profils
et la langue relèvent de l'application, pas d'une partie. Les couvrir demande
une sauvegarde globale (tous profils + réglages), distincte de l'export d'un
journal. À faire si le besoin se présente — ne pas les glisser dans l'export
d'un profil au passage, un import écraserait la langue et les profils du poste.

## Autres règles de données

- **Un import ne duplique jamais.** `mergeEntries` ignore une entrée déjà
  présente, par identifiant ou par signature de contenu (`entrySignature`).
  Réimporter le même fichier deux fois doit laisser le journal inchangé. Les
  compteurs de kills se fusionnent par maximum, jamais par addition.
- **Rien de traduisible n'est stocké.** Une mort est une chaîne indépendante de
  la langue (`cause:fall`, `boss:vordt`, `creature:<saisie>`, ou du texte libre)
  et les labels de notes préréglés sont des identifiants. Seul l'affichage est
  traduit.
- **Renommer, ce n'est pas casser.** En changeant un libellé de boss, de cause
  ou de label, conserver l'ancien nom dans `aliases` : les journaux existants
  restent rattachés. La comparaison ignore déjà casse, accents et ponctuation
  (`labelKey`).
- **Une donnée non reconnue est conservée**, jamais supprimée en silence.

## Architecture

Pas de bundler : React, Tailwind et Babel Standalone viennent d'un CDN et le
JSX est transpilé dans le navigateur.

- Les fichiers de `src/` **partagent la portée globale** : pas d'`import`, et
  l'ordre des balises `<script>` dans `index.html` est l'ordre des dépendances.
  Tout nouveau fichier doit y être déclaré à la bonne place.
- Un identifiant ne peut être déclaré qu'une fois sur l'ensemble des fichiers —
  deux `const` de même nom cassent la page entière.
- Le JSX passe par le preset `react-classic` (`src/babel-preset.js`) : le
  runtime « automatic » par défaut émettrait des `import`, impossibles dans des
  scripts classiques.
- Les fichiers sans JSX sont chargés en `<script src>` simple, ceux avec JSX en
  `type="text/babel" data-presets="react-classic"`.
- L'état vit dans les hooks (`useJournal`, `useProfiles`, `useLanguage`,
  `useFlash`) ; chaque section de page détient son état local (saisies, filtres,
  édition, confirmations). `App.jsx` ne fait que composer.
- Pas de commentaire `//` entre deux attributs JSX : le sortir du JSX.

## Interface

- Anglais par défaut, français disponible. **Toute chaîne visible passe par
  `t()`** et doit être ajoutée dans les deux tables de `src/i18n.js` ; aucune
  chaîne en dur dans un composant.
- Un message d'état mémorise sa clé et ses arguments, pas son texte : il doit
  suivre un changement de langue en cours d'affichage.
- Les actions destructrices demandent une confirmation en deux temps (armer,
  puis confirmer dans les quelques secondes), et l'avertissement dit précisément
  ce qui sera perdu.
- Les boutons d'une même rangée partagent leur largeur ; un compteur optionnel
  se met en surimpression plutôt que de réserver une place dans le flux, qui
  décentrerait le libellé.

## Vérification

Il n'y a pas de tests unitaires : on vérifie dans un vrai navigateur.

```sh
python3 -m http.server 8000   # ouvrir index.html en file:// ne marche pas
```

Avant de pousser, rejouer les parcours touchés avec Playwright et Chromium
(`/opt/pw-browsers`), et **lire la console** : une erreur JS casse toute la page.
Couvrir au minimum : saisie, rechargement, bascule de langue, changement de
profil, export → effacement → réimport.

Depuis cet environnement, les CDN sont bloqués : servir des copies locales de
React, Babel et Tailwind (npm) pour que la page se rende comme en production —
sans Tailwind, une capture ne montre pas la mise en page réelle.

## Git

- Développer sur la branche indiquée, une PR par sujet.
- Quand la PR est mergée, repartir de `main` (`git checkout -B <branche>
  origin/main`) plutôt que d'empiler sur de l'historique déjà mergé ; s'il reste
  des commits non mergés, les rebaser (`git rebase --onto origin/main <base>`).
- Messages de commit, corps de PR, README et commentaires **en français**.
  Le message dit ce qui change et pourquoi, pas la liste des fichiers.
- Signaler ce qui n'a pas pu être vérifié plutôt que de l'affirmer : les accès
  réseau sont restreints ici, une donnée de jeu recopiée de mémoire se relit.
