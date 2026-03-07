# SEO Service Pages Design

## Goal

Maximize SEO for the flower shop website by creating dedicated service pages with emphasis on weddings, baptisms, and garden design. Optimize the existing landing page and expand local area targeting.

## Services (10 pages)

| Slug | Service (EL) | Service (EN) | Priority |
|------|-------------|--------------|----------|
| `weddings` | Στολισμοί Γάμων | Wedding Decorations | HIGH |
| `baptisms` | Στολισμοί Βαπτίσεων | Baptism Decorations | HIGH |
| `garden-design` | Μελέτη & Σχεδιασμός Κήπου | Garden Study & Design | HIGH |
| `maintenance` | Συντηρήσεις Κήπων | Garden Maintenance | Normal |
| `irrigation` | Αυτόματα Ποτίσματα | Automatic Irrigation | Normal |
| `pruning` | Κλαδέματα | Pruning | Normal |
| `tall-trees` | Κοπή Ψηλών Δέντρων | Tall Tree Cutting | Normal |
| `rock-gardens` | Βραχόκηποι | Rock Gardens | Normal |
| `land-clearing` | Καθαρισμοί Οικοπέδων | Land Clearing | Normal |
| `pest-control` | Ραντίσματα & Απολυμάνσεις | Pest Control & Spraying | Normal |

Note: Current "Βαφτίσια & Γάμοι" combined service splits into two separate pages for better keyword targeting.

## Target Areas (20)

Core: Ηλιούπολη, Αργυρούπολη, Δάφνη, Βύρωνας, Άλιμος, Υμηττός, Άγιος Δημήτριος, Καισαριανή, Ελληνικό

Extended: Γλυφάδα, Νέα Σμύρνη, Παλαιό Φάληρο, Καλλιθέα, Ζωγράφου, Παγκράτι, Βούλα, Βουλιαγμένη, Βάρη, Παπάγου, Χολαργός

## Routing

- Path: `/[locale]/services/[slug]`
- Static generation via `generateStaticParams()` for all slugs x locales
- Service data defined in a TypeScript config file (`lib/general/services.ts`)

## Per-Page SEO

Each service page receives:

1. **Unique `<title>`** — e.g., "Στολισμός Γάμου Ηλιούπολη | ΑΝΘΗ-ΦΥΤΑ KALOUDIS"
2. **Unique `<meta description>`** — service details + areas served
3. **Unique keywords** — service-specific + location combinations
4. **JSON-LD `Service` schema** — with `areaServed` listing all 20 areas
5. **JSON-LD `FAQPage` schema** — 2-3 FAQs per service (rich snippets)
6. **JSON-LD `BreadcrumbList` schema** — Home > Services > [Service Name]
7. **Canonical URL + hreflang alternates** for both locales
8. **Open Graph metadata** per page

HIGH priority pages (weddings, baptisms, garden-design) get:
- Longer, richer content (3-4 paragraphs vs 2)
- More FAQs (3-4 vs 2)
- Higher sitemap priority (0.9 vs 0.7)

## Page Content Structure

Each service page layout:

1. **Breadcrumb** — Αρχική > Υπηρεσίες > [Service Name]
2. **Hero Section** — Service title, description, CTA (call/WhatsApp/contact form)
3. **Rich Description** — 2-4 paragraphs of SEO content with natural area mentions
4. **Features/Benefits** — 3-4 key points with icons
5. **Areas Served** — Grid of all 20 areas (good for local SEO)
6. **FAQ Section** — Accordion with 2-4 questions (doubles as FAQ schema)
7. **Related Services** — Links to 2-3 related service pages (internal linking)
8. **CTA Section** — Contact form link, phone, WhatsApp

## Infrastructure Changes

### New Files
- `lib/general/services.ts` — Service definitions (slug, icons, related services, SEO data)
- `app/[locale]/services/[slug]/page.tsx` — Dynamic service page
- `components/service-page/` — Service page section components (hero, faq, areas, etc.)

### Modified Files
- `messages/el.json` — Add `ServicePages` namespace with all Greek content
- `messages/en.json` — Add `ServicePages` namespace with all English content
- `lib/general/seo.ts` — Add service-specific SEO configs, expanded keywords, area list
- `app/sitemap.ts` — Add all 10 service pages x 2 locales (20 new URLs)
- `components/json-ld.tsx` — Add Service, FAQPage, BreadcrumbList schema generators
- Landing page service cards — Link to dedicated pages instead of anchors

### Not Changed
- Existing layout.tsx metadata (stays as global defaults)
- Admin pages
- Authentication setup

## Landing Page Optimization

- Service cards become links to their dedicated pages
- Wedding & baptism services appear first in the grid
- About section mentions areas served naturally
- Internal linking structure strengthened
