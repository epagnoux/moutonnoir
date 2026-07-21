# AGENTS.md — Le Mouton Noir (site vitrine)

Ce fichier est le point d'entrée pour tout agent (IA ou humain) qui travaille sur ce dépôt.
Il résume **ce qu'est le site**, **où trouver l'information**, et **comment le régénérer**.

## TL;DR

- **Projet** : site vitrine statique (HTML/CSS/JS vanilla, sans build) pour le restaurant **Le Mouton Noir** à Baie-Saint-Paul, Charlevoix (QC, Canada).
- **Pages** : `index.html` (accueil) + `menu.html` (carte midi/soir).
- **Design system** : « Braise » — charbon profond, crème, orange braise, sauge. Typo **Archivo** (titres expansés), **Fraunces** italique (accents), **Space Mono** (repères `// 01`).
- **Référence visuelle** : style « Kairo Kitchen » — photo plein écran assombrie, titre géant en capitales expansées qui chevauche l'image, petits blocs de texte en capitales, boutons rectangulaires à bordure fine, liens préfixés `// `.
- **Documentation complète** : voir le dossier [`docs/`](./docs/) — tout est dedans pour régénérer le site sur n'importe quelle stack.

## Structure du dépôt

```
moutonnoir/
├── AGENTS.md              ← ce fichier
├── index.html             ← page d'accueil
├── menu.html              ← page menu (midi / soir)
├── styles.css             ← design system complet « Braise »
├── app.js                 ← interactions (vanilla JS, aucune dépendance)
├── assets/                ← médias locaux (logo + 5 photos)
│   ├── logo.png           ← logo officiel (mouton dessiné, carré)
│   ├── photo-salle.jpg    ← salle à manger (jour)
│   ├── photo-2.jpg        ← plat signature
│   ├── photo-3.jpg        ← salle / bar (ambiance feutrée)
│   ├── photo-4.jpg        ← terrasse + foyer extérieur (hero)
│   ├── photo-5.jpg        ← terrasse / foyer (2e angle)
│   └── badge.png          ← badge rond « Le Mouton Noir » (rarement utilisé)
└── docs/                  ← DOCUMENTATION DE RÉGÉNÉRATION (lire en priorité)
    ├── 00-README.md           ← index + prompt de régénération complet
    ├── 01-business.md         ← infos restaurant (contact, horaires, liens)
    ├── 02-content.md          ← tout le contenu éditorial FR, section par section
    ├── 03-design-system.md    ← couleurs, typo, espacements, composants, règles
    ├── 04-features.md         ← toutes les fonctionnalités + comportements attendus
    ├── 05-pages-structure.md  ← arborescence détaillée des 2 pages
    ├── 06-menu-data.md        ← LA CARTE OFFICIELLE COMPLÈTE (midi + soir, prix exacts)
    ├── 07-media-assets.md     ← inventaire des médias + sources + traitements
    └── 08-interactions.md     ← spec des animations / scroll / hover / reduced-motion
```

## Comment régénérer ce site

1. Lire `docs/00-README.md` → il contient un **prompt de régénération prêt à l'emploi** à donner à un agent.
2. Ou lire les docs dans l'ordre `01` → `08` et reconstruire à la main.
3. Aucune stack imposée : le site actuel est du HTML/CSS/JS vanilla, mais la doc est volontairement **stack-agnostique** (React, Astro, Next, Svelte… peu importe).

## Règles de contribution importantes

- **La carte (menu) est contractuelle** : les plats, descriptions et prix doivent correspondre à `docs/06-menu-data.md`. Certains plats ont **plusieurs prix/options** (ex. Salade « Retour du Vietnam » sans poulet 23 $ / avec poulet bio 30 $ ; Découverte de fromages 1/2/3 morceaux à 8/15/22 $). Ne jamais aplatir ces options en un seul prix.
- **Langue** : le site est entièrement en **français** (Québec).
- **Médias** : utiliser les fichiers locaux de `assets/`, pas de hotlink vers Wix.
- **Accessibilité** : toutes les animations respectent `prefers-reduced-motion`.
- **Zéro dépendance** : pas de framework, pas de build step dans la version actuelle.
