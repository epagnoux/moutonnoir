# 05 — Structure des pages

Arborescence détaillée des deux pages (balises sémantiques + classes clés).

## `index.html` — Accueil

```
body
├── .grain                      (calque grain, fixe, aria-hidden)
├── .cursor                     (curseur personnalisé, aria-hidden)
│
├── header.nav#nav
│   ├── a.nav__brand            → #top
│   │   └── img.nav__logo       assets/logo.png (carré)
│   ├── nav.nav__links          // L'histoire // Terroir // Terrasse // Menu(→menu.html) // Infos
│   └── a.btn.btn--outline.nav__cta   « Réserver → » (Libro, externe)
│
├── section.hero#top
│   ├── .hero__media
│   │   ├── img[data-hero-img]  assets/photo-4.jpg (terrasse)
│   │   └── .hero__veil
│   ├── h1.hero__title
│   │   ├── .hero__title-line > span        « LE MOUTON »
│   │   └── .hero__title-line--right > span « NOIR » (outline)
│   ├── .hero__corners
│   │   ├── p.hero__corner--tl   // Restaurant — Bistro — Terrasse / Baie-Saint-Paul
│   │   └── p.hero__corner--bl   texte produits locaux
│   └── .hero__strip            (4 × .hero__strip-item : label + valeur)
│       ├── a  // La carte   → menu.html
│       ├── div // Horaires  Mar – Sam · 11h30–14h / 17h30–21h
│       ├── a  // Adresse    → Google Maps
│       └── a  // Contact    → tel:+14182403030
│
├── section.section.histoire#histoire
│   ├── .section__head : span.section__index « 01 » + h2.section__title.split-title
│   └── .histoire__grid (2 colonnes)
│       ├── .histoire__col : p.histoire__lead + figure.histoire__media[data-tilt] (photo-salle.jpg)
│       └── .histoire__facts : figure.histoire__media--small[data-tilt] (photo-2.jpg)
│
├── section.section.terroir#terroir
│   ├── .section__head « 02 »
│   └── .cards : 4 × article.card (glyphe + h3 + p)
│
├── section.terrasse#terrasse
│   ├── .terrasse__bg[data-parallax] > img (photo-5.jpg)
│   └── .terrasse__content : « 03 », h2.terrasse__title, p, .terrasse__tags (3 × .tag), CTA
│
├── section.galerie
│   └── .galerie__track[data-drift] : 3 × figure.galerie__item (photo-3 / photo-5 / photo-salle)
│
├── section.section.menu#menu
│   ├── .section__head « 04 » + a.section__more « Menu complet → »
│   ├── ul.dishes : 5 × li.dish (dont liens prix)
│   └── p.menu__note
│
├── section.section.infos#infos
│   ├── .section__head « 05 »
│   └── .infos__grid : 4 × .info (Adresse / Heures / Contact / Suivre)
│
└── footer.footer
    ├── .footer__cta : img.footer__logo (carré) + h2.footer__title + .btn--big
    └── .footer__bar : © 2026 · Baie-Saint-Paul · Charlevoix

<script src="app.js">
```

## `menu.html` — Carte

```
body.menu-page
├── .grain, .cursor
├── header.nav.is-scrolled   (identique, liens → index.html#…)
│
├── section.menu-hero        (fond photo-3.jpg via ::before)
│   ├── p.menu-hero__eyebrow   // Baie-Saint-Paul · Charlevoix
│   ├── h1.menu-hero__title.split-title   « LA carte »
│   ├── p.menu-hero__sub
│   ├── .menu-toggle (role=tablist)
│   │   ├── button[data-menu="midi"] .is-active
│   │   ├── button[data-menu="soir"]
│   │   └── .menu-toggle__pill
│   └── .menu-filter
│       └── 4 × button.menu-filter__btn [data-cat=tout|entrees|plats|desserts]
│
├── main#menu-midi [data-menu-panel="midi"]
│   └── 3 × section.menu-cat [data-cat=entrees|plats|desserts]
│       └── h2.menu-cat__title + ul.dishes (li.dish / li.dish--options)
│
├── main#menu-soir.is-hidden [data-menu-panel="soir"]
│   └── 3 × section.menu-cat (même structure)
│
├── .menu-bar                 (sticky flottante, cachée tant que scroll < 420 px)
│   ├── .menu-bar__label      // Le Mouton Noir
│   └── .menu-bar__actions    lien « Menu » + .btn--outline « Réserver → »
│
├── section.menu-foot         note + .btn--big « Réserver une table »
└── footer.footer > .footer__bar (© + ← Retour à l'accueil)

<script src="app.js"></script>
<script> (toggle midi/soir + filtres + barre sticky — inline dans menu.html) </script>
```

## Notes d'implémentation

- Les animations de révélation sont déclarées dans `app.js` (partagé par les 2 pages).
- Le script de la page menu (toggle, filtres, sticky bar) est **inline** dans `menu.html`.
- IDs d'ancres utilisés : `#top`, `#histoire`, `#terroir`, `#terrasse`, `#menu`, `#infos`.
