# Full SEO Audit Report: ΑΝΘΗ-ΦΥΤΑ KALOUDIS

**Site:** https://anthopolio-kaloudhs.vercel.app (production: anthopolio-kaloudhs.gr)
**Business Type:** Local Florist & Landscaping Service
**Location:** Ηλιούπολη, Αττική, Greece
**Date:** 2026-03-07
**Pages Crawled:** 40 (20 el + 20 en)

---

## SEO Health Score: 72/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 68/100 | 25% | 17.0 |
| Content Quality | 82/100 | 25% | 20.5 |
| On-Page SEO | 70/100 | 20% | 14.0 |
| Schema / Structured Data | 78/100 | 10% | 7.8 |
| Performance (CWV) | 75/100 | 10% | 7.5 |
| Images | 60/100 | 5% | 3.0 |
| AI Search Readiness | 45/100 | 5% | 2.3 |
| **Total** | | | **72.1** |

---

## Executive Summary

### Top 5 Critical Issues

1. **Products page title has duplicate brand name** - "Προϊόντα | ΑΝΘΗ-ΦΥΤΑ KALOUDIS | ΑΝΘΗ-ΦΥΤΑ KALOUDIS" (title template appends brand on top of already-branded title)
2. **Missing hreflang tags in HTML `<head>`** on all pages except /products hub - only sitemap has hreflang alternates
3. **No security headers configured** - next.config.ts is empty (no X-Frame-Options, CSP, HSTS, etc.)
4. **Products page canonical points to root** - canonical is "/" (homepage) instead of "/el/products"
5. **English pages share Greek meta descriptions** - some English pages inherit the defaultDescription in Greek from layout.tsx

### Top 5 Quick Wins

1. Fix the products page title to remove duplicate brand suffix
2. Add per-page `alternates` metadata for hreflang on all service/product pages
3. Add security headers in next.config.ts
4. Add AI bot directives to robots.txt (GPTBot, ClaudeBot, PerplexityBot)
5. Add AggregateRating schema to homepage (already have 4.9 stars / 120 reviews data)

---

## 1. Technical SEO (68/100)

### Crawlability

**robots.txt** (Source: `app/robots.ts`)
- User-Agent: * / Allow: / / Disallow: /admin/, /api/
- Sitemap declared correctly
- **Issue:** No AI bot directives (GPTBot, ClaudeBot, PerplexityBot)

**Middleware** (Source: `proxy.ts`)
- next-intl middleware correctly routes locales
- No crawl-blocking issues detected
- Pattern matcher excludes API, _next, _vercel, and static files correctly

### Indexability

| Page | Canonical | Status |
|------|-----------|--------|
| Homepage /el | https://anthopolio-kaloudhs.gr/ | OK (via layout) |
| Services/* | https://anthopolio-kaloudhs.gr/el/services/* | OK |
| Products hub | https://anthopolio-kaloudhs.gr/ | **BUG - points to root** |
| Products/* | https://anthopolio-kaloudhs.gr/el/products/* | OK |

**Issues:**
- Products page (`app/[locale]/products/page.tsx`) does NOT set `alternates.canonical` in its metadata, so it inherits the layout's `canonical: "/"` which resolves to the homepage
- No `noindex` directives found (good)
- Robots meta: index, follow set globally (good)

### URL Structure
- Clean locale-prefixed URLs: `/el/...` and `/en/...`
- Consistent slug patterns for services and products
- No trailing slash inconsistency detected
- No redirect chains found

### Security Headers
- **next.config.ts is essentially empty** - no security headers configured
- Missing: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Content-Security-Policy, Strict-Transport-Security, Permissions-Policy
- **Risk:** Vulnerable to clickjacking, MIME sniffing attacks

### Mobile Optimization
- Viewport meta tag present (via Next.js defaults)
- Responsive Tailwind CSS with mobile breakpoints
- Roboto font loaded with latin + greek subsets
- Mobile nav: slide-in panel with backdrop blur (good UX)

### Core Web Vitals Implications
- **LCP:** Hero image (`hero-flowers.jpg`) loaded via Next.js Image component (optimized)
- **CLS:** Fixed navbar with proper height allocation
- **INP:** Client components use lightweight Zustand store, minimal JS overhead
- **Concern:** Gallery images (1.jpg through 7.jpg) should verify lazy loading is active

---

## 2. Content Quality (82/100)

### E-E-A-T Assessment

| Signal | Status | Score |
|--------|--------|-------|
| **Experience** | Real business with physical location, photos, awards | Strong |
| **Expertise** | Detailed service descriptions, FAQ sections per page | Good |
| **Authoritativeness** | Eagles Awards 2023-2025, 4.9 stars / 120 Google reviews | Strong |
| **Trustworthiness** | Real address, phone, email, Google Maps embed, social profiles | Strong |

### Content Depth per Page Type

| Page Type | Word Count | FAQ Count | Status |
|-----------|-----------|-----------|--------|
| Homepage | ~2000 | 0 | Good |
| Service pages | 1200-1500 | 3 each | Good |
| Product pages | 1200-2200 | 3 each | Good |
| Products hub | 2500-3000 | 0 | Good (has catalog) |

### Thin Content Detection
- No thin content pages detected (all >1000 words)
- Maintenance page slightly thinner (~800-900 words) - could be expanded

### Duplicate Content Risks
- **English pages risk:** Layout metadata uses Greek `defaultDescription` as fallback - English pages that don't override their meta description will show Greek text
- Service pages have unique meta descriptions per slug (good)
- Product pages have unique meta descriptions per slug (good)
- Homepage content is sufficiently different between el/en versions

### Readability
- Greek content is well-written with local terms (Ηλιούπολη, Νότια Προάστια)
- Good use of headers to break up content
- FAQ sections enhance readability and provide direct answers
- CTAs are clear (phone, WhatsApp, contact)

---

## 3. On-Page SEO (70/100)

### Title Tags

| Page | Title | Length | Issue |
|------|-------|--------|-------|
| Homepage /el | ΑΝΘΗ-ΦΥΤΑ KALOUDIS \| Κηποτεχνικές Εργασίες Ηλιούπολη | 55 chars | OK |
| Products hub /el | Προϊόντα \| ΑΝΘΗ-ΦΥΤΑ KALOUDIS \| ΑΝΘΗ-ΦΥΤΑ KALOUDIS | 55 chars | **DUPLICATE BRAND** |
| Weddings /el | Στολισμός Γάμου Ηλιούπολη \| ΑΝΘΗ-ΦΥΤΑ KALOUDIS | 49 chars | OK |
| Flowers /el | Άνθη & Φυτά Ηλιούπολη \| ΑΝΘΗ-ΦΥΤΑ KALOUDIS | 46 chars | OK |

**Root cause of products hub bug:** The title is set as `"Προϊόντα | ΑΝΘΗ-ΦΥΤΑ KALOUDIS"` in `generateMetadata`, but the layout has `template: "%s | ΑΝΘΗ-ΦΥΤΑ KALOUDIS"` which appends the brand again.

### Meta Descriptions

| Page | Description | Length | Status |
|------|------------|--------|--------|
| Homepage | Ανθοπωλείο και κηποτεχνικές υπηρεσίες... | ~160 chars | OK |
| Services | Unique per service | 130-160 chars | OK |
| Products | Unique per product | 120-150 chars | OK |
| Products hub | Custom description | 100 chars | OK |

### Heading Structure

All pages follow proper H1 → H2 → H3 hierarchy:
- One H1 per page (confirmed)
- H2s for major sections
- H3s for feature cards and sub-sections
- **Issue:** Homepage English has 2 H1 tags (main title + subtitle both in H1)

### Internal Linking

| Feature | Status |
|---------|--------|
| Service → Service cross-links | "Related Services" section on each page |
| Product → Product cross-links | "Related Products" section on each page |
| Homepage → Service links | Full listing in services section |
| Homepage → Product links | Full listing in products section |
| Breadcrumb navigation | On all service and product pages |
| **Missing:** Blog/content hub | No blog or resource pages exist |
| **Missing:** Location pages | No dedicated area pages for served cities |

---

## 4. Schema / Structured Data (78/100)

### Current Implementation

| Schema Type | Pages | Valid | Notes |
|-------------|-------|-------|-------|
| Florist (Organization) | All pages (via layout) | Yes | Comprehensive with areaServed, openingHours, offerCatalog |
| Service | Service pages | Yes | With provider, areaServed |
| Product | Product pages | Yes | With offers, seller, brand |
| FAQPage | Service + Product pages | Yes | 3 Q&As per page |
| BreadcrumbList | Service + Product pages | Yes | Proper hierarchy |

### Validation Issues

1. **Product schema missing `price`** - the Offer has `availability` but no `price` or `priceCurrency`, limiting rich result eligibility
2. **AggregateRating not on homepage** - you have 4.9 stars / 120 Google reviews but no `aggregateRating` in the global JSON-LD
3. **Global schema duplicated on inner pages** - the Florist schema from layout renders on every page alongside page-specific schemas, creating potential conflicts
4. **hasOfferCatalog items lack URLs** - service/product offers in the catalog don't include URLs linking to their dedicated pages

### Missing Schema Opportunities

| Schema | Benefit | Priority |
|--------|---------|----------|
| `AggregateRating` on homepage | Star ratings in SERPs | High |
| `LocalBusiness` with `review` | Rich snippets in local pack | High |
| `Event` for seasonal services | Event-based rich results | Medium |
| `ImageObject` for gallery | Image search visibility | Low |
| `WebSite` with `SearchAction` | Sitelinks search box | Low |

---

## 5. Performance / CWV (75/100)

### Architecture Analysis (from codebase)

| Factor | Assessment |
|--------|-----------|
| **Framework** | Next.js 16 with RSC (Server Components by default) - excellent |
| **Font loading** | Roboto via `next/font` with `variable` - optimal, no FOUT |
| **Image optimization** | Next.js Image component used for hero, gallery, services |
| **JS bundle** | Minimal client components (Zustand store, theme toggle, mobile menu) |
| **CSS** | Tailwind CSS 4 - tree-shaken, minimal bundle |
| **Third-party scripts** | None detected (no analytics, no chat widgets) |

### Concerns

- **No analytics installed** - can't measure real CWV data (no Google Analytics, no Vercel Analytics)
- **Gallery images** (1.jpg-7.jpg) - should verify they use WebP format and proper sizing
- **Google Maps embed** in contact section adds ~200KB+ of third-party resources
- **No resource hints** - missing `preconnect` for external resources

---

## 6. Images (60/100)

### Alt Text Coverage

| Area | Images | Alt Text | Status |
|------|--------|----------|--------|
| Logo | 2 (header + footer) | "ΑΝΘΗ-ΦΥΤΑ KALOUDIS Logo" | OK |
| Hero | 1 | "Άνθη και φυτά" | OK but generic |
| Gallery | 5 | Descriptive (shop exterior, bouquets, etc.) | OK |
| Service cards | 10 | Service-specific descriptions | OK |
| Product pages | SVG icons | aria-hidden (decorative) | OK |

### Issues

1. **Hero alt text too generic** - "Άνθη και φυτά" should be more descriptive (e.g., "Ανθοπωλείο KALOUDIS στην Ηλιούπολη")
2. **No image format optimization visible** - source images are .jpg, should verify Next.js Image is serving WebP/AVIF
3. **og-image.png** - used as fallback product image on some pages, not ideal
4. **No `width`/`height` on service card images** in some cases, risking CLS

---

## 7. AI Search Readiness (45/100)

### AI Bot Accessibility

| Bot | robots.txt Directive | Status |
|-----|---------------------|--------|
| GPTBot | None (follows default Allow) | Accessible but uncontrolled |
| ClaudeBot | None | Accessible but uncontrolled |
| PerplexityBot | None | Accessible but uncontrolled |

### Citability Assessment

| Factor | Score | Notes |
|--------|-------|-------|
| **Passage-level citability** | Medium | FAQ sections are excellent for citation; service descriptions need more specific data points |
| **Structured answers** | Good | FAQ schema provides direct Q&A pairs |
| **Unique data** | Low | No proprietary data, case studies, or original research |
| **Brand authority signals** | Medium | Awards mentioned but no external validation links |

### Missing for AI Optimization

1. **No `llms.txt`** at root - missed opportunity for AI crawler guidance
2. **No blog/knowledge base** - no long-form content for AI to cite
3. **No case studies** - wedding/garden portfolios with details would be highly citable
4. **No pricing data in content** - AI assistants can't recommend with pricing context
5. **Service area content is schema-only** - no dedicated pages for "ανθοπωλείο Αργυρούπολη" etc.

---

## Hreflang Analysis (Cross-Cutting Issue)

### Current State

| Location | hreflang Implementation | Status |
|----------|------------------------|--------|
| `<head>` HTML | Only on /products hub page | **INCOMPLETE** |
| Sitemap XML | All 40 URLs have proper alternates | OK |
| Layout metadata | `alternates.languages` set globally | Partially OK |

### Root Cause

The global layout (`app/[locale]/layout.tsx`) sets:
```typescript
alternates: {
  canonical: "/",
  languages: { el: "/el", en: "/en" }
}
```

This only generates hreflang for the homepage. Service and product pages override `generateMetadata` but DON'T include `alternates` - so they inherit the layout's root-level hreflang (pointing to `/el` and `/en` rather than the specific page).

### Impact
- Google may not correctly associate el/en page pairs
- Sitemap hreflang is a fallback but HTML `<head>` is the primary signal
- Risk of duplicate content penalties between language versions

---

## International SEO Issues

1. **English page titles use same Greek `defaultTitle`** from layout as fallback
2. **No `x-default` hreflang** - should point to `/el` (primary language)
3. **No language-specific OG tags** - og:locale is always "el_GR" even on English pages
4. **English homepage has identical structure but different translations** (good)

---

## Local SEO Assessment

### Google Business Profile Integration

| Signal | Status |
|--------|--------|
| NAP consistency | Address, phone, email consistent across all pages |
| Google Maps embed | Present in contact section |
| Service areas listed | 20 cities in schema |
| Opening hours | In schema + visible on site |
| Reviews/Rating | Mentioned (4.9/120) but not in structured data |

### Missing Local Opportunities

1. **No dedicated area pages** (e.g., "/ανθοπωλείο-αργυρούπολη") for the 20 served cities
2. **No Google Business Profile link** in structured data or visible on site
3. **No driving directions link** (only maps embed)
4. **No "near me" keyword optimization** in content
