# 07 — Médias (assets)

Tous les médias sont **locaux** (dossier `assets/`). Ne pas hotlinker vers Wix.

## Inventaire

| Fichier | Sujet | Dimensions | Utilisation |
|---|---|---|---|
| `assets/logo.png` | Logo officiel (mouton dessiné sur fond noir) | 414 × 413 | Nav + footer. **Toujours affiché carré** (jamais arrondi). |
| `assets/photo-salle.jpg` | Salle à manger, lumière du jour | 1080 × 810 | Histoire (photo 1) + galerie (3e item) |
| `assets/photo-2.jpg` | Plat signature (canard, carottes) | 1000 × 1104 | Histoire (photo 2, format 4/5) |
| `assets/photo-3.jpg` | Salle / bar, ambiance feutrée | 1127 × 1244 | Galerie (1er item) + fond de l'en-tête de la page menu |
| `assets/photo-4.jpg` | **Terrasse + foyer extérieur** | 960 × 540 | **Hero de l'accueil** (plein écran) |
| `assets/photo-5.jpg` | Terrasse / foyer (2e angle) | 960 × 528 | Panneau terrasse (parallaxe) + galerie (2e item) |
| `assets/badge.png` | Badge rond « Le Mouton Noir » | 954 × 984 | Disponible, non utilisé actuellement |

## Règle anti-redondance

Chaque photo a un rôle précis ; **ne pas réutiliser la même image dans plusieurs
sections de la même page** (exigence explicite). La seule réutilisation acceptée est
dans la galerie (récapitulatif) — si besoin, remplacer par des photos inédites.

## Traitements d'image appliqués en CSS

| Contexte | Filtre |
|---|---|
| Hero accueil | `brightness(0.5) saturate(0.9) contrast(1.05)` + voile dégradé + vignette |
| En-tête menu | `brightness(0.32) saturate(0.85)` + dégradé vers `--ink` en bas |
| Panneau terrasse | `brightness(0.62) saturate(0.95)` + voiles haut/bas + halo braise bas-gauche |
| Figures (histoire) | `saturate(0.9)` → `saturate(1)` à la révélation |
| Galerie | `saturate(0.85) brightness(0.95)` → plein au survol |

## Sources (pour re-télécharger si besoin)

Proviennent du site Wix officiel (`static.wixstatic.com/media/`) :

```
logo.png        : 129b73_54ac76e1de01444db0ad5b50cbf95de1~mv2.png  (og:image, fit w_2500)
photo-salle.jpg : 129b73_9cdb0401f2ed4b8fa4389198a12e4f9f~mv2.jpg  (original)
photo-2.jpg     : 129b73_123bd4df2a664a948e372d4a3c470655~mv2.jpg  (original)
photo-3.jpg     : 129b73_707d64dc0fbe4564b5b09e809e8977b4~mv2.jpg  (original)
photo-4.jpg     : 129b73_a80881779ac3404fba76719292a0b4d9f000.jpg  (original)
photo-5.jpg     : 129b73_ad54a8a17947418abed6270000b9c2a8f000.jpg  (original)
badge.png       : 129b73_7ec6488ace2a410b9dd6109c5c6f287c.png     (fill w_954,h_984)
```

Astuce : supprimer le segment `/v1/...` de l'URL Wix pour obtenir le fichier original
pleine résolution.

## Textes alternatifs (FR)

- logo : « Le Mouton Noir » / « Logo du Mouton Noir »
- photo-salle : « La salle à manger du Mouton Noir — bois, lumière chaude, tables dressées »
- photo-2 : « Plat signature — canard, carottes rôties, jus »
- photo-3 : « La salle et le bar, ambiance feutrée »
- photo-4 : décoratif dans le hero (`alt=""`), sinon « Terrasse au bord de la rivière du Gouffre avec foyer extérieur »
- photo-5 : « Terrasse et foyer extérieur »
