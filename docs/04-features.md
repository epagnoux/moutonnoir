# 04 — Fonctionnalités

Liste exhaustive des features du site, avec leur comportement attendu.

## Accueil

| # | Feature | Comportement |
|---|---|---|
| F1 | **Hero plein écran photo** | Photo terrasse (`photo-4.jpg`) assombrie (brightness .5, saturate .9, contrast 1.05), zoom d'entrée 1.08→1 sur 2.4 s. Voile cinématographique (haut 55 %, bas 90 %, vignette). |
| F2 | **Titre géant chevauchant l'image** | « LE MOUTON » plein / « NOIR » en contour (`-webkit-text-stroke: 2px cream`, transparent), 2e ligne alignée à droite. Révélation par masque (`translateY(110%)→0`, délais 0.25 s / 0.4 s). |
| F3 | **Strip d'infos immédiat** | 4 cellules visibles dès le chargement : lien carte, horaires, adresse (Maps), téléphone (`tel:`). Fond flouté, hover sur les cellules cliquables. **Exigence métier : plats, horaires, adresse et contact visibles tout de suite.** |
| F4 | **Sections numérotées** | `// 01` Histoire · `// 02` Terroir · `// 03` Terrasse · `// 04` Signatures · `// 05` Infos. |
| F5 | **Photos avec rideau + tilt** | Salle + plat signature : révélation rideau au scroll, tilt 3D suivant le pointeur. |
| F6 | **Panneau terrasse parallaxe** | `photo-5.jpg` plein écran (min-height 92svh), `translateY` = -12 % du scroll. 3 badges + CTA réservation. |
| F7 | **Galerie à défilement lié au scroll** | Piste horizontale qui translate en X selon la progression verticale (`progress × maxWidth × 0.6`). 3 photos, zoom doux + légende au survol. |
| F8 | **Aperçu « signatures »** | 5 plats du menu (avec pointillés et prix) + lien vers la carte complète. |
| F9 | **Cartes infos** | Adresse (Maps), heures, contact (tel/mail), réseaux sociaux. |
| F10 | **CTA réservation partout** | Nav, terrasse, footer → widget Libro externe (nouvel onglet). |

## Page menu

| # | Feature | Comportement |
|---|---|---|
| F11 | **En-tête photo** | `photo-3.jpg` assombrie (brightness .32), zoom d'entrée, titre « LA carte ». |
| F12 | **Toggle Midi / Soir** | Pilule coulissante ; bascule les panneaux `data-menu-panel` ; **rejoue les animations** (stagger 45 ms/élément) à chaque bascule. ARIA : `role=tablist/tab`, `aria-selected`. |
| F13 | **Filtres catégories** | // Tout // Entrées // Plats // Desserts — les sections non concernées passent à `opacity: .14` (`pointer-events: none`), transition 0.45 s. |
| F14 | **Plats à options de prix** | Affichage multi-prix (voir 06) : salades sans/avec poulet bio ; fromages 1/2/3 morceaux. **Ne jamais aplatir.** |
| F15 | **Barre sticky flottante** | Apparaît après 420 px de scroll (slide-up), contient lien Menu + bouton Réserver. |

## Global

| # | Feature | Comportement |
|---|---|---|
| F16 | **Révélations au scroll** | IntersectionObserver (threshold 0.15, rootMargin -8 %) : `.reveal` (fade + translateY 36 px), `.split-title` (mot à mot par masque, stagger 60 ms), `.histoire__media` (rideau). Une seule fois (`unobserve`). |
| F17 | **Curseur personnalisé** | Voir 03.5 — désactivé au tactile. |
| F18 | **Boutons magnétiques** | Translation ≤ 18 %/25 % du décalage pointeur-centre ; reset au leave. |
| F19 | **Grain animé** | Calque fixe sur tout le site. |
| F20 | **Accessibilité mouvement** | `prefers-reduced-motion: reduce` → animations 0.01 ms, éléments `.reveal`/titres affichés d'office, parallaxe/tilt/magnétique désactivés, galerie statique. |
| F21 | **Zéro dépendance** | Aucun framework, aucun bundler ; fonts via Google Fonts CDN ; fonctionne en `file://`. |

## Features explicitement RETIRÉES (ne pas réintroduire)

- ❌ Bandeau défilant (marquee)
- ❌ Canvas de braises / particules qui montent
- ❌ Section compteurs animés (2 services / 100 % / 1 rivière)
- ❌ Photos dupliquées d'une section à l'autre
- ❌ Logo rond (le logo doit rester **carré**)
- ❌ Texte d'intro en gras (le paragraphe « Atmosphère feutrée… » reste léger)
