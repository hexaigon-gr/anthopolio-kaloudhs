# Service Cards Redesign — "Botanical Elegance"

## Date: 2026-03-31

## Summary

Redesign the homepage service cards from plain rectangular image+text cards to an organic, image-dominant design with soft shapes, warm tones, and elegant hover interactions.

## Design Decisions

- **Style**: Organic & Botanical — soft rounded shapes, warm earthy tones, gentle shadows
- **Layout**: Uniform 3-column grid (2 tablet, 1 mobile), flat (no category grouping)
- **Image weight**: Image-dominant — photos are the hero, text is compact below

## Card Anatomy

### Image Area (~280px height)
- Photo fills top portion with `object-cover`
- Soft vignette gradient (edges inward) instead of harsh dark overlay
- Title overlaid bottom-left in white with refined text-shadow
- On hover: gentle Ken Burns zoom (scale 1.05, 900ms)

### Decorative Divider
- Thin line in `leaf` color between image and text
- Widens from center outward on hover (width animation via pseudo-element or scale)

### Text Area
- Cream/warm background (`bg-cream` or similar)
- Short description in muted warm tones, 2 lines max
- No explicit "Read More" link — entire card is clickable
- Generous padding for breathing room

### Hover Effects
- Card lifts 4px (`-translate-y-1`)
- Shadow grows from subtle to warm prominent
- Image zooms 1.05x
- Decorative line widens from center
- All transitions `duration-500 ease-out`

## Grid Specifications
- `gap-8` (up from `gap-6`) for more breathing room
- `max-w-6xl` container
- `rounded-3xl` on cards for organic feel
- No hard borders — shadow-only card boundaries

## Files to Modify
- `components/services-section.tsx` — the only file that needs changes

## What Stays the Same
- Same 9 services, same order, same images
- Same translation keys (`Services.*`)
- Same link structure (`/services/{slug}`)
- Server component pattern with `getTranslations`
