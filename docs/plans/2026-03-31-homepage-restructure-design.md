# Homepage Restructure Design

**Date:** 2026-03-31
**Goal:** Restructure the homepage to improve conversion, surface wedding services, and follow user decision journey.

## New Section Order

| # | Section | Status |
|---|---------|--------|
| 1 | Hero | **Changed** — full `h-screen` on first load, no white visible |
| 2 | About | Unchanged |
| 3 | Reviews | **Moved up** from position 6 — social proof early |
| 4 | Wedding/Events Banner | **NEW** — full-width CTA for weddings |
| 5 | Services | Unchanged |
| 6 | Gallery | **Reordered** — event/work photos first, shop photos last |
| 7 | Products (Wolt) | **NEW** — online ordering with `<StoreProducts>` component |
| 8 | Contact | Unchanged |
| 9 | Newsletter | Unchanged |

## Removed

- **ShowcaseSection** ("What We Offer" with Products/Services cards) — deleted entirely

## Changes Detail

### 1. Hero — Full Viewport Height

Make hero section `h-screen` so on first load the entire viewport is the hero image with headline and CTAs. No white/about section peeking through. The navbar is already transparent and overlays the hero.

### 2. Reviews Moved Up (position 3)

Social proof immediately after the About section. Visitor sees awards + Google rating + testimonials before being asked to browse services/products. No content changes, just position.

### 3. Wedding/Events Banner (NEW, position 4)

- Full-width section with the church arch wedding photo (`wedding-cover.jpg`) as background
- Dark gradient overlay for text readability
- Headline: "Your Dream Wedding Starts Here" / "Ο Γάμος των Ονείρων σας Ξεκινά Εδώ"
- Short description about full floral styling (church + reception)
- Two CTAs: "Plan Your Wedding" → `/services/weddings` + "Call Us" → phone link
- i18n: both EN and EL translations

### 4. Gallery Reorder (position 6)

Lead with event/work photos, push shop interior to the end:
1. Wedding church arch
2. Baptism candle arrangement
3. Colorful bouquets
4. Baptism font decoration
5. Bouquet arrangements
6. Shop photos (interior, exterior, seasonal)

### 5. Products Section (NEW, position 7)

- Section heading: "Order Online" / "Παραγγελία Online"
- Subtitle mentioning delivery throughout Attica
- Uses existing `<StoreProducts storeSlug="kaloudis-garden" />` wrapped in `<Suspense>` with `<StoreProductsSkeleton />`
- Falls back gracefully (empty or fallback data with subtle message)
