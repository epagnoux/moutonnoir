# 08 — Spécification des interactions & animations

Toutes les animations utilisent `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` sauf mention contraire.
**Règle absolue** : tout est désactivé/atténué sous `prefers-reduced-motion: reduce`.

## 1. Chargement (hero)

| Élément | Animation |
|---|---|
| Photo hero | `scale(1.08) → 1`, 2.4 s |
| Titre ligne 1 (« LE MOUTON ») | masque `translateY(110%) → 0`, 1.2 s, délai 0.25 s |
| Titre ligne 2 (« NOIR ») | idem, délai 0.4 s |
| Corners + strip | `.reveal` standard |

## 2. Révélations au scroll (IntersectionObserver)

- Observer : `threshold: 0.15`, `rootMargin: 0px 0px -8% 0px`, déclenchement unique.
- `.reveal` : `opacity 0 → 1`, `translateY(36px) → 0`, 0.9 s.
- `.split-title` : chaque mot est wrappé dans `.word > span` (JS), révélé par
  `translateY(105%) → 0` avec stagger de **60 ms** par mot.
- `.histoire__media` : rideau `::after` qui s'effondre (`scaleY(1) → 0`, 1.1 s),
  image `scale(1.15) → 1` + saturation 0.9 → 1 (1.4 s).

## 3. Interactions au pointeur

| Élément | Effet |
|---|---|
| Curseur custom | lerp 0.2 vers le pointeur ; `is-hover` (10 px → 44 px) sur `a, button, .card, .dish` ; `mix-blend-mode: difference` ; caché sur `hover: none` |
| Boutons magnétiques | `translate(dx*0.18, dy*0.25)` vers le pointeur, reset au leave |
| `data-tilt` (photos) | `perspective(900px) rotateY(±5°) rotateX(∓5°)` selon position pointeur |
| Cartes terroir | `translateY(-6px)` + glyphe `rotate(12deg) scale(1.15)` |
| Plats (`.dish`) | `padding-left +1rem` |
| Logo nav/footer | `rotate(-8deg/-6deg) scale(1.06/1.05)` |
| Liens nav | opacité 0.75 → 1, couleur `--ember-soft` |
| Flèche boutons | `translateX(5px)` |
| Galerie item | image `scale(1.08) → 1.01`, saturation pleine, légende fade-up |

## 4. Liées au scroll

| Effet | Formule |
|---|---|
| Nav condensée | classe `is-scrolled` quand `scrollY > 40` (fond blur + filet) |
| Parallaxe terrasse | `bg.translateY = section.top × -0.12` (seulement quand visible) |
| Galerie drift | `progress = 1 - bottom/(vh + height)` ; `translateX = -progress × max × 0.6` |
| Barre sticky menu | classe `is-visible` quand `scrollY > 420` (`translate(-50%, 140% → 0)`) |

## 5. Page menu

- **Toggle Midi/Soir** : pilule `translateX(0 → 100%)` (0.45 s) ; bascule `is-hidden` ;
  à chaque affichage, les `.reveal`/`.split-title` du panneau sont réinitialisés puis
  ré-affichés avec stagger de **45 ms**.
- **Filtres catégories** : sections non ciblées → `opacity: 0.14` + `pointer-events: none` (0.45 s).
- Bouton actif : souligné braise + préfixe `//` qui apparaît.

## 6. Ambiance

- **Grain** : calque fixe 200 % × 200 %, `feTurbulence` SVG, `opacity: 0.06`,
  sauts `steps(4)` toutes les 0.9 s.

## 7. Reduced motion (obligatoire)

Sous `prefers-reduced-motion: reduce` :
- toutes les durées → 0.01 ms ;
- `.reveal`, `.split-title`, titres hero, photo hero : état final immédiat ;
- parallaxe, drift galerie, tilt, boutons magnétiques : **non initialisés** ;
- curseur custom : reste fonctionnel (pas d'animation continue) ou peut être désactivé.
