# 00 — Documentation de régénération · Le Mouton Noir

Ce dossier contient **tout** ce qu'il faut pour reconstruire le site vitrine du restaurant
**Le Mouton Noir** à l'identique (ou l'adapter), sur **n'importe quelle stack**.

## Ordre de lecture

| Fichier | Contenu |
|---|---|
| `01-business.md` | Infos du restaurant : identité, contact, horaires, liens externes |
| `02-content.md` | Tout le contenu éditorial (FR), section par section |
| `03-design-system.md` | Couleurs, typographie, espacements, composants |
| `04-features.md` | Toutes les fonctionnalités du site |
| `05-pages-structure.md` | Structure détaillée des 2 pages |
| `06-menu-data.md` | La carte officielle complète (midi + soir, prix exacts, options) |
| `07-media-assets.md` | Inventaire des médias, sources, traitements d'image |
| `08-interactions.md` | Spec des animations et interactions |

---

## Prompt de régénération (prêt à l'emploi)

> Donne ce prompt à un agent de code pour recréer le site :

```
Crée un site vitrine statique de 2 pages (accueil + menu) pour le restaurant
québécois « Le Mouton Noir » (bistro/terrasse à Baie-Saint-Paul, Charlevoix),
entièrement en français, sans framework ni build step (HTML/CSS/JS vanilla).

STYLE : inspire-toi du design « Kairo Kitchen » — photo plein écran assombrie,
titre géant en capitales sans-serif expansées qui chevauche l'image, petits
blocs de texte en capitales espacées, boutons rectangulaires à bordure fine,
liens de navigation préfixés « // », repères numérotés « //01 » en monospace.
Ambiance haut de gamme mais détendue, sombre et chaleureuse.

DESIGN SYSTEM « Braise » :
- Fond charbon #0d0c0b, surfaces #161413 / #1e1b19, texte crème #f0ebe1
  (atténué #b6ad9e), accent orange braise #e0662a / #f08a4b, sauge #9aa88f,
  filets rgba(240,235,225,0.16).
- Typo Google Fonts : Archivo (variable wdth 62–125, titres font-stretch 118–125%
  gras 700–800 en capitales), Fraunces italique 300 (mot accent en braise dans
  les titres), Space Mono (repères //01).
- Boutons rectangulaires (pas d'arrondi) avec flèche « → » animée au survol.
- Grain de film animé en surimpression (opacity 0.06) + curseur personnalisé
  (point braise, blend difference).

ACCUEIL (index.html) :
1. Nav fixe : logo carré, liens //L'histoire //Terroir //Terrasse //Menu //Infos,
   bouton outline « Réserver → » (lien Libro).
2. Hero plein écran : photo de la terrasse (assets/photo-4.jpg) assombrie
   (brightness .5) avec zoom d'entrée 1.08→1, titre « LE MOUTON » plein +
   « NOIR » en contour (text-stroke) aligné à droite, révélés par masque.
   En bas, strip d'infos en 4 cellules (fond flouté) : //La carte (lien menu),
   //Horaires (Mar–Sam 11h30–14h / 17h30–21h), //Adresse (lien Google Maps),
   //Contact (lien tel:).
3. « 01 // Une table ancrée ici » : texte d'intro léger + 2 photos
   (salle + plat) avec révélation par rideau et tilt 3D au survol.
4. « 02 // Le terroir, à la table » : 4 cartes (Cuisine de Charlevoix,
   Terrasse sur l'eau, Feux de foyer, Salle feutrée).
5. « 03 // La terrasse du Gouffre » : panneau plein écran avec photo
   (photo-5.jpg) en parallaxe, 3 badges (Bord de l'eau / Feux de foyer /
   Chauffage extérieur), CTA « Réserver en terrasse ».
6. Galerie horizontale (photo-3, photo-5, photo-salle) qui défile
   latéralement en fonction du scroll vertical.
7. « 04 // Quelques signatures » : 5 plats avec pointillés et prix.
8. « 05 // Nous trouver » : 4 cartes infos (Adresse / Heures / Contact / Suivre).
9. Footer : logo carré, « On vous garde une table ? », bouton « Réserver en ligne ».

MENU (menu.html) :
- En-tête avec photo de la salle (photo-3.jpg) assombrie, titre « LA carte »,
  toggle Midi/Soir (pilule coulissante), filtres //Tout //Entrées //Plats //Desserts
  qui estompent les autres sections.
- La carte complète et exacte : voir les données (menu midi 7 entrées / 10 plats /
  4 desserts, menu soir 5/8/5). IMPORTANT : respecter les plats à options de prix
  (salades sans/avec poulet bio ; fromages 1/2/3 morceaux).
- Barre sticky flottante « Réserver » qui apparaît après 420 px de scroll.

ANIMATIONS : titres révélés mot à mot par masque au scroll (IntersectionObserver),
fade-up sur les éléments .reveal, parallaxe sur la terrasse, tilt 3D sur les photos,
boutons magnétiques. Tout doit respecter prefers-reduced-motion.

CONTENU EXACT : reprendre les textes et prix fournis dans la documentation
(contenu éditorial + carte complète, en français).
```

## Stack actuelle vs. autres stacks

- **Actuelle** : HTML/CSS/JS vanilla, aucune dépendance, hébergeable partout (fichiers statiques).
- La doc est **stack-agnostique** : les sections 03–08 décrivent les *comportements attendus*,
  pas l'implémentation. Une régénération en Astro/Next/SvelteKit doit produire le même rendu.
