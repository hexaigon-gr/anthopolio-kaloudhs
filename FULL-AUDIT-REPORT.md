# Full SEO Audit Report — anthopoleio-kaloudis.gr
**Date:** 2026-04-29  
**Platform:** Next.js 16 App Router on Vercel  
**Business:** ΑΝΘΗ-ΦΥΤΑ KALOUDIS — Flower shop & landscaping, Ilioupoli, Athens  
**Audited URLs:** `/el` (Greek primary), `/en` (English alternate)

---

## Target Keywords

| # | Keyword | Intent | Difficulty |
|---|---------|--------|------------|
| 1 | ανθοπωλειο ηλιουπολη | Local navigational | Medium |
| 2 | ανθοπωλειο κοντα μου | Near-me local | High (needs GMB) |
| 3 | στολισμοι γαμων | Transactional | High |
| 4 | στολισμοι γαμων ηλιουπολη | Local transactional | Medium |
| 5 | λουλουδια ηλιουπολη | Local informational | Medium |
| 6 | στολισμος χωρων | Transactional | Medium |

---

## Overall SEO Health Score: **57 / 100**

| Category | Weight | Score | Weighted |
|----------|--------|-------|---------|
| Technical SEO | 25% | 61/100 | 15.3 |
| Content Quality | 25% | 50/100 | 12.5 |
| On-Page SEO | 20% | 42/100 | 8.4 |
| Schema / Structured Data | 10% | 62/100 | 6.2 |
| Performance (CWV) | 10% | 75/100 | 7.5 |
| Images | 5% | 55/100 | 2.8 |
| AI Search Readiness | 5% | 60/100 | 3.0 |
| **Total** | | | **55.7 → 57** |

---

## Top 5 Critical Issues

1. **Homepage title/description missing "Ηλιούπολη" and "ανθοπωλείο"** — the geo-modifier appearing in 4 of 6 target keywords is completely absent from the most important on-page signals.
2. **Contact page has wrong canonical** — `/el/contact` inherits the layout canonical pointing to the homepage. Google sees it as a duplicate.
3. **Sunday hours in schema say OPEN (09:00–16:00)** — business is actually CLOSED. Google will display wrong hours in Maps.
4. **No meta descriptions on any page** — Google writes its own snippets, often poorly matched to Greek search intent.
5. **`aggregateRating` missing from LocalBusiness schema** — 6 five-star reviews exist in the codebase but are not exposed to Google.

## Top 5 Quick Wins (under 30 min each)

1. Fix Sunday hours bug in `components/json-ld.tsx` — 5 min, fixes live Google Maps data
2. Fix `SEO.defaultTitle` to include "Ηλιούπολη" and "ανθοπωλείο" — 10 min
3. Add `aggregateRating` + `award` to `localBusinessSchema` — 15 min, adds stars to search results
4. Add `sameAs` for Wolt, e-food, box.gr to `localBusinessSchema` — 10 min
5. Add `generateMetadata` to contact page — 30 min, fixes canonical + adds to sitemap

---

## 1. Technical SEO — Score: 61/100

### Crawlability ✅

- `robots.txt` correct: allows all public pages, blocks `/admin/` and `/api/`, sitemap declared
- Root `/` redirects 307 → `/el` (single hop, no chain)
- No `noindex` on public pages
- All 42 sitemap URLs return HTTP 200
- Server-Side Rendered (confirmed via `X-Nextjs-Prerender: 1`) — all content visible to crawlers without JS

### Canonical & Hreflang

**[CRITICAL] Contact page canonical points to homepage**

`/el/contact` and `/en/contact` have no `generateMetadata`. They inherit the layout which sets `alternates.canonical` to `/${locale}` — the homepage. Google sees the contact page as a duplicate of the homepage.

Fix: Add `generateMetadata` to `app/[locale]/contact/page.tsx`:
```ts
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: locale === "el" ? "Επικοινωνία | ΑΝΘΗ-ΦΥΤΑ KALOUDIS" : "Contact | ANTHI-FYTA KALOUDIS",
    description: locale === "el"
      ? "Επικοινωνήστε με το ανθοπωλείο KALOUDIS στην Ηλιούπολη. Τηλ. 210 9954775. Λεωφόρος Κυπρίων Ηρώων 4."
      : "Contact KALOUDIS flower shop in Ilioupoli, Athens. Tel. 210 9954775.",
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { el: "/el/contact", en: "/en/contact", "x-default": "/el/contact" }
    }
  };
}
```

**[PASS] Hreflang in HTML `<head>` is correct on all pages**

```html
<link rel="alternate" hrefLang="el" href="https://www.anthopoleio-kaloudis.gr/el"/>
<link rel="alternate" hrefLang="en" href="https://www.anthopoleio-kaloudis.gr/en"/>
<link rel="alternate" hrefLang="x-default" href="https://www.anthopoleio-kaloudis.gr/el"/>
```

Note: contact page inherits wrong hreflang too — fixed by the same `generateMetadata` fix above.

**[MEDIUM] x-default mismatch between HTML head and HTTP Link header**

next-intl middleware injects an HTTP `Link:` header where `x-default` points to `/services/weddings` (no locale prefix → 307 redirect). The HTML head has the correct value. Conflicting signals; Google typically resolves in favor of HTML head. Low priority but worth tracking.

### On-Page Metadata ❌

**[CRITICAL] Homepage title lacks primary keywords**

Current: `ΑΝΘΗ-ΦΥΤΑ KALOUDIS | Κηποτεχνικές Εργασίες Αττική`  
Problems: Missing "Ηλιούπολη", missing "ανθοπωλείο", missing "λουλούδια"  
File: `lib/general/seo.ts` — `SEO.defaultTitle`

Recommended: `Ανθοπωλείο Ηλιούπολη | ΑΝΘΗ-ΦΥΤΑ KALOUDIS — Λουλούδια & Στολισμοί`

**[CRITICAL] No meta descriptions on any page**

File: `lib/general/seo.ts` — `SEO.defaultDescription` and per-page metadata

Recommended meta descriptions:
- **Homepage (el):** `Ανθοπωλείο στην Ηλιούπολη Αττικής. Φρέσκα λουλούδια, στολισμοί γάμων, βαπτίσεων & χώρων. Κηποτεχνικές εργασίες από το KALOUDIS — Τηλ. 2109954775.`
- **Wedding page (el):** `Στολισμός γάμου στην Ηλιούπολη & Αττική. Ανθοστολισμός εκκλησίας, νυφική ανθοδέσμη, στολισμός δεξίωσης. Καλέστε 2109954775.`
- **Contact page (el):** `Επικοινωνήστε με το ανθοπωλείο KALOUDIS στην Ηλιούπολη Αττικής. Λ. Κυπρίων Ηρώων 4, Τηλ. 210 9954775. Δε–Σα 9:00–21:00.`

**[HIGH] Wedding page title missing "Ηλιούπολη"**

Current: `Στολισμός Γάμου | ΑΝΘΗ-ΦΥΤΑ KALOUDIS`  
Recommended: `Στολισμοί Γάμων Ηλιούπολη | Ανθοστολισμός Αττική — KALOUDIS`  
File: `lib/general/seo.ts` — `SERVICE_SEO.weddings.titleEl` (or equivalent key)

**[HIGH] Twitter/X Card metadata not overridden on service pages**

Service pages show generic site title/description in social share previews. Fix: Add `twitter` block to `generateMetadata` in `app/[locale]/services/[slug]/page.tsx` mirroring the `openGraph` values.

### Security Headers ✅

HSTS (2yr), X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy — all present. HTTPS enforced, no mixed content. No CSP (medium security gap, no ranking impact).

### Core Web Vitals 🟡

| Metric | Homepage | Service Pages |
|--------|----------|---------------|
| LCP | ✅ AVIF + priority + preload | 🟡 Missing `fetchPriority="high"` |
| CLS | ✅ size-adjust font, fill images | ✅ Same |
| INP | ✅ SSR, progressive hydration | ✅ Same |

Fix for service pages: Add `fetchPriority="high"` to `<Image>` in `app/[locale]/services/[slug]/page.tsx`.

---

## 2. Content Quality — Score: 50/100

### Keyword Coverage on Greek Pages

| Target Keyword | H1 | Body | Title | Meta desc |
|---|---|---|---|---|
| ανθοπωλειο ηλιουπολη | ❌ | Partial | ❌ | ❌ |
| ανθοπωλειο κοντα μου | ❌ | ❌ | ❌ | ❌ |
| στολισμοι γαμων | ✅ (weddings) | ✅ | ✅ | ❌ |
| στολισμοι γαμων ηλιουπολη | ❌ | ❌ | ❌ | ❌ |
| λουλουδια ηλιουπολη | ❌ | Partial | ❌ | ❌ |
| στολισμος χωρων | Partial | ✅ | Partial | ❌ |

### H1 Issues

**Greek homepage H1:** `Άνθη, Φυτά & Κηποτεχνικές Υπηρεσίες`  
→ Matches zero target keywords. Missing "ανθοπωλείο" and "Ηλιούπολη".  
Recommended: `Ανθοπωλείο στην Ηλιούπολη — Φρέσκα Λουλούδια & Στολισμοί`

**Wedding page H1:** `Στολισμοί Γάμων` ✅ — good keyword match  
Body text needs to add "Ηλιούπολη" explicitly at least once.

### E-E-A-T Signals

**Strengths:**
- Eagles Award 2023, 2024, 2025 — visible on-page, strong local credibility signal
- Customer testimonials on homepage
- Real business address with Google Maps embed
- Real product/service photos
- Physical store photos

**Weaknesses:**
- No "About Us" page describing team history or expertise
- No blog/informational content for top-of-funnel searches
- No owner/staff photos or bios
- Business age/founding year not mentioned anywhere
- Award data not in schema (see Schema section)

### Content Gaps for Target Keywords

| Missing Content | Target Keyword | Where to Add |
|---|---|---|
| "Ηλιούπολη" in first paragraph and H1 | ανθοπωλειο ηλιουπολη | Greek homepage |
| "Ηλιούπολη" in wedding page body text | στολισμοι γαμων ηλιουπολη | `/el/services/weddings` |
| Explicit "λουλούδια στην Ηλιούπολη" copy | λουλουδια ηλιουπολη | `/el/products/flowers` + homepage |
| Neighborhood names for "near me" radius | ανθοπωλειο κοντα μου | Homepage + contact page |
| Dedicated "Στολισμός Χώρων" section | στολισμος χωρων | `/el/services/commercial-spaces` or new page |

### AI / SGE Readiness

- FAQ sections on service pages provide good natural language answers
- Need: Opening paragraph on each page answering the implied user question directly
- Wedding FAQ covers booking timeline, coverage area, customization — good AI citation signals
- No structured "About" content in easily citable format

---

## 3. Schema / Structured Data — Score: 62/100

### What Schema Currently Exists

The codebase has a complete schema implementation in `components/json-ld.tsx`. This is a strength.

| Schema Block | Pages | Status |
|---|---|---|
| `LocalBusiness` + `Florist` + `LandscapingBusiness` | All pages (layout) | Has bugs — see below |
| `WebSite` | All pages | ✅ OK |
| `BreadcrumbList` | Service & product detail pages | ✅ OK |
| `Service` | Service detail pages | Needs enhancement |
| `FAQPage` | Service & product detail pages | Valid but no rich results |
| `Product` | Product detail pages | Has postal code bug |

### Schema Bugs (Must Fix)

**[CRITICAL] Sunday hours incorrect**  
Schema says: Sunday open 09:00–16:00  
Reality: Sunday CLOSED  
File: `components/json-ld.tsx` — Remove Sunday `OpeningHoursSpecification` block  
Impact: Google Maps and Knowledge Panel show wrong hours to customers

**[MEDIUM] Postal code inconsistency**  
`ProductJsonLd` uses `"16346"` — all other schema uses `"16341"`  
File: `components/json-ld.tsx` — change `"16346"` → `"16341"` in `ProductJsonLd`  
Impact: NAP inconsistency across schema blocks harms local SEO trust

**[MEDIUM] Missing `@id` on LocalBusiness**  
Without `@id`, Google cannot reliably link entity references across pages  
Fix: Add `"@id": "https://www.anthopoleio-kaloudis.gr"` to `localBusinessSchema`

### Missing High-Impact Schema

**[HIGH] `aggregateRating` missing**  
6 five-star reviews are hardcoded in `reviews-carousel.tsx` but not in schema.  
Add to `localBusinessSchema`:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5",
  "reviewCount": "6",
  "bestRating": "5",
  "worstRating": "1"
}
```

**[HIGH] `award` property missing**  
Eagles Award 2023/2024/2025 exists in translations but not in schema.  
Add: `"award": ["Eagles Award 2023", "Eagles Award 2024", "Eagles Award 2025"]`

**[HIGH] `sameAs` missing delivery platforms**  
Wolt, e-food, and box.gr links are already in `constants.ts` but missing from `sameAs`.  
These are high-authority Greek citations that strengthen the entity.  
Add to `sameAs`:
```json
"https://wolt.com/en/grc/athens/venue/kaloudis-garden",
"https://www.e-food.gr/delivery/ilioypoli/kaloydis-anthopoleio",
"https://box.gr/delivery/ilioupoli/kaloudhs-anthopwleio"
```

**[MEDIUM] `ContactPoint` for WhatsApp**  
WhatsApp 694 146 9582 is in constants but not in schema

**[MEDIUM] `serviceType` on Service schema**  
Add `"serviceType": "Wedding Floral Decoration"` etc. to `ServiceJsonLd`

**[MEDIUM] `ItemList` missing on `/services` and `/products` listing pages**  
Helps Google understand site architecture, can produce sitelinks in search

**[MEDIUM] `BreadcrumbList` missing on contact page**  
Add via existing `BreadcrumbJsonLd` component in `app/[locale]/contact/page.tsx`

**[INFO] `FAQPage` won't produce rich results for florists**  
Google restricted FAQ rich results to government/health sites in August 2023. Keep the schema (harmless, helps AI/SGE), but don't expect expandable FAQ entries in SERP.

---

## 4. Sitemap — Score: 70/100

- 42 URLs (21 pages × 2 locales), all valid XML ✅
- All URLs return HTTP 200 ✅
- Priority values present (Google ignores, but structure is sensible) ✅

### Issues

**[HIGH] `/contact` pages missing from sitemap**  
`/el/contact` and `/en/contact` not in `app/sitemap.ts`  
Fix: Add `{ path: "/contact", priority: 0.9 }` to the `staticPages` array

**[MEDIUM] `lastmod` resets on every deploy**  
`app/sitemap.ts` uses `new Date()` — every URL gets today's date on every deploy  
Google may ignore unreliable lastmod values  
Fix: Use static ISO date strings, update only when content changes

**[MEDIUM] No `x-default` in sitemap hreflang**  
Only `el` and `en` alternates declared; `x-default` (pointing to `/el`) should be added to each URL block

**[LOW] `rock-gardens` dangling reference**  
Appears in `relatedSlugs` for `garden-design` in `services.ts` but no corresponding page exists  
Verify this doesn't generate a broken link on the garden-design page

### Keyword Coverage in Sitemap

| Target Keyword | Intended Page | In Sitemap |
|---|---|---|
| ανθοπωλειο ηλιουπολη | /el + /el/contact | /el ✅, /el/contact ❌ |
| ανθοπωλειο κοντα μου | /el (primarily GMB) | ✅ |
| στολισμοι γαμων | /el/services/weddings | ✅ |
| στολισμοι γαμων ηλιουπολη | /el/services/weddings | ✅ (page needs content fix) |
| λουλουδια ηλιουπολη | /el + /el/products/flowers | ✅ |
| στολισμος χωρων | /el/services/receptions or /commercial-spaces | ✅ |

---

## 5. Performance — Score: 75/100

| Metric | Status | Notes |
|--------|--------|-------|
| LCP — Homepage | ✅ Optimized | AVIF + `priority` + `fetchPriority="high"` + preload |
| LCP — Service pages | 🟡 Partial | Missing `fetchPriority="high"` |
| CLS | ✅ Good | `size-adjust` font, fill-mode hero images |
| INP | ✅ Good | SSR, Suspense boundaries, no blocking scripts |
| TTFB | ✅ Good | Vercel Edge Network |

Vercel Speed Insights is installed — check real-user CWV data in your Vercel dashboard.

---

## 6. Local SEO — Critical for All Target Keywords

### Google Business Profile (GBP) — The #1 Factor for Local Search

**"Ανθοπωλείο κοντά μου" and "ανθοπωλείο Ηλιούπολη" are primarily Google Maps queries.**  
The Local Pack ("Map Pack") that appears at the top of Google for these searches is driven by GBP, not organic rankings. Website SEO is secondary.

Critical GBP checklist (not auditable from code, but essential):
- [ ] GBP claimed and verified at business.google.com
- [ ] Category: "Flower Shop" (Ανθοπωλείο) as primary category
- [ ] Address matches website exactly (Λ. Κυπρίων Ηρώων 4, Ηλιούπολη 16341)
- [ ] Phone, hours match website/schema
- [ ] Minimum 10 photos uploaded (exterior, interior, products, arrangements)
- [ ] Minimum 15 Google reviews with keyword-relevant replies
- [ ] Business description includes "ανθοπωλείο Ηλιούπολη", "λουλούδια", "στολισμοί γάμων"
- [ ] Posts published weekly (shows activity to Google)
- [ ] Services section filled with all offerings

### NAP Consistency

Name, Address, Phone must be identical across:
- Website schema (LocalBusiness)
- Google Business Profile
- Wolt listing
- e-food listing
- box.gr listing

Current schema uses postal code `16341` in LocalBusiness but `16346` in ProductJsonLd — fix this.

---

## 7. Bilingual Architecture Note

All 6 target keywords are Greek. Primary SEO focus must be the `/el` pages.  
- Root `/` correctly redirects to `/el`
- `x-default` correctly points to `/el`
- Hreflang pairs are correct for all non-contact pages
- **Priority: optimize `/el` pages first, then ensure `/en` mirrors are consistent**
