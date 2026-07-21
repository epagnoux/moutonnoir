# 03 — Design System « Braise »

Système visuel complet. Référence d'ambiance : « Kairo Kitchen » (photo plein écran,
titre géant expansé, blocs texte en petites capitales, UI rectangulaire).

## 1. Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--ink` | `#0d0c0b` | fond principal |
| `--coal` | `#161413` | surfaces (cartes, footer) |
| `--coal-2` | `#1e1b19` | surfaces au survol |
| `--cream` | `#f0ebe1` | texte principal, boutons pleins |
| `--cream-dim` | `#b6ad9e` | texte secondaire |
| `--ember` | `#e0662a` | accent principal (prix, accents, curseur) |
| `--ember-soft` | `#f08a4b` | labels, hover nav |
| `--sage` | `#9aa88f` | accent secondaire (terrasse) |
| `--line` | `rgba(240,235,225,0.16)` | filets, bordures |
| Filets hero | `rgba(240,235,225,0.25)` / `0.14` | strip d'infos |

## 2. Typographie (Google Fonts)

| Rôle | Police | Réglages |
|---|---|---|
| `--display` | **Archivo** (variable `wdth` 62–125) | titres : `font-stretch: 118–125%`, graisse 700–800, **capitales**, `letter-spacing: -0.01em` |
| `--serif` | **Fraunces** | italique 300 uniquement, pour le mot accent (braise) dans les titres |
| `--mono` | **Space Mono** | repères `//01`, 0.72rem |
| `--sans` | **Archivo** | texte courant, labels, boutons (graisse 300–500) |

**Règle de composition des titres** : corps en Archivo capitales gras + **un mot en
Fraunces italique light couleur braise** (ex. « Une table *ancrée* ici », « LA *carte* »).

**Convention `//`** : les libellés techniques sont préfixés de `//` (nav, filtres,
eyebrows). Les repères de section sont en Space Mono : `//01` … `//05`.

Échelle de titres :
- Hero : `clamp(3rem, 11.5vw, 11rem)`, `line-height: 0.88`
- Sections : `clamp(2.2rem, 5.5vw, 4.6rem)`
- Terrasse : `clamp(2.4rem, 6.5vw, 5.5rem)`
- Titre page menu : `clamp(3rem, 9vw, 8rem)`
- Catégories menu : `clamp(1.8rem, 4vw, 2.8rem)`

## 3. Espacements & forme

- `--pad` : `clamp(1.25rem, 3.5vw, 3.5rem)` (marges latérales globales)
- Sections : `padding: clamp(5rem, 12vw, 10rem) var(--pad)`, `max-width: 1400px`
- Corps du menu : `max-width: 980px`
- **Angles** : UI **rectangulaire** (boutons, toggle, logo). Les pilules arrondies
  (`border-radius: 999px`) ne subsistent que sur les micro-légendes (figcaption) et badges.
  Le **logo est carré** (exigence explicite).
- Courbe d'animation : `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`

## 4. Composants

### Boutons (`.btn`)
- Inline-flex + flèche `→` (`.btn__arrow`) qui glisse de 5 px au survol
- Capitales 0.72rem, `letter-spacing: 0.22em`, padding `1.15em 2em`, **sans arrondi**
- Variantes : `--solid` (crème→braise au hover), `--outline` (bordure crème 50 %, devient plein au hover), `--ghost`, `--light`, `--big`
- Effet magnétique JS (voir 08)

### Cartes terroir (`.card`)
- Grille `auto-fit minmax(250px,1fr)`, joints de 1 px (fond `--line`)
- Glyphe braise qui pivote 12° au survol ; carte qui monte de 6 px

### Plats (`.dish`)
- Ligne : nom (Fraunces 400) — pointillés (`border-bottom dotted`) — prix (Fraunces italique braise)
- Détail du plat en `<span>` sous le nom (sans-serif 0.8rem, crème-dim)
- Variante `.dish--options` : bloc `.dish__opts` avec chaque option = label petites capitales + prix braise (ex. Sans poulet 23 $ / Avec poulet bio 30 $ ; 1/2/3 morceaux)
- Hover : indentation +1 rem

### Figures média (`.histoire__media`, `.galerie__item`)
- Révélation par **rideau** : `::after` plein `--ink` qui s'effondre (`scaleY→0`) quand `.is-in`
- Image `scale(1.15)→1` + saturation 0.9→1 à la révélation
- Légende : pastille floutée en bas à gauche
- Tilt 3D au pointeur (`data-tilt`)

### Nav (`.nav`)
- Fixe ; après 40 px de scroll : fond `rgba(18,17,16,0.72)` + blur 14 px + filet bas
- Liens en capitales 0.72rem, opacité 0.75 → 1 + couleur braise-soft au hover
- Liens masqués sous 820 px (pas de burger dans la version actuelle)

### Toggle Midi/Soir (`.menu-toggle`)
- Deux boutons + pilule crème coulissante (`translateX(100%)` quand `data-active="soir"`), rectangulaire

### Filtres catégories (`.menu-filter__btn`)
- Capitales soulignées ; actif : bordure braise + préfixe `//` visible

### Barre sticky menu (`.menu-bar`)
- Pilule flottante centrée en bas, `backdrop-filter: blur(14px)`, apparaît après 420 px de scroll

### Strip d'infos hero (`.hero__strip`)
- Grille 4 colonnes (2 × 2 sous 900 px), fond `rgba(13,12,11,0.45)` + blur 12 px, filets internes
- Cellule = label braise-soft (`//La carte`) + valeur crème ; cellules cliquables (liens)

## 5. Effets globaux

- **Grain** : SVG `feTurbulence` en data-URI, calque fixe `opacity: 0.06`, animation steps(4) 0.9 s
- **Curseur personnalisé** : point braise 10 px, `mix-blend-mode: difference`, suit le pointeur avec lerp 0.2, grandit à 44 px sur les éléments interactifs ; désactivé sur `hover: none`
- **Voiles photo** : dégradés `rgba(13,12,11,…)` haut/bas + vignette radiale
- Sélection : fond braise, texte ink
