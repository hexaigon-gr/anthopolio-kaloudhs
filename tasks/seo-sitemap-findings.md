# SEO Sitemap Audit Report

**Site:** anthopolio-kaloudhs.gr (staging: anthopolio-kaloudhs.vercel.app)
**Date:** 2026-03-07
**Auditor:** Claude Code (Sitemap Architecture)

---

## 1. Sitemap Validation Summary

| Check | Status | Details |
|-------|--------|---------|
| Valid XML format | PASS | Next.js `MetadataRoute.Sitemap` generates valid XML automatically |
| URL count (<50k) | PASS | 40 URLs total, well under the 50,000 limit |
| `robots.txt` references sitemap | PASS | Points to `https://anthopolio-kaloudhs.gr/sitemap.xml` |
| Namespace declarations | PASS | Handled by Next.js framework |
| hreflang alternates in sitemap | PASS | Each URL has `alternates.languages` for both `el` and `en` |
| `changefreq` present | INFO | Set to `weekly` -- ignored by Google, can safely remove |
| `priority` present | INFO | Set per page (1.0, 0.9, 0.8, 0.7) -- ignored by Google, can safely remove |
| `lastmod` accuracy | **FAIL** | Uses `new Date()` -- generates identical timestamps for all URLs at build time (see Finding F1) |
| Non-200 URLs in sitemap | NEEDS VERIFICATION | Cannot confirm HTTP status codes without live crawl (see Recommendation R1) |
| Noindexed URLs in sitemap | PASS | Admin pages are not in sitemap, and `robots.ts` disallows `/admin/` and `/api/` |

---

## 2. Page Coverage Analysis

### Pages in Sitemap (40 URLs)

| Page Type | el | en | Count |
|-----------|----|----|-------|
| Homepage `/` | /el | /en | 2 |
| Services hub `/services` | /el/services | /en/services | 2 |
| Products hub `/products` | /el/products | /en/products | 2 |
| Service pages (10 slugs) | /el/services/* | /en/services/* | 20 |
| Product pages (4 slugs) | /el/products/* | /en/products/* | 8 |
| **Total** | **20** | **20** | **40** |

### All Discoverable Pages in Codebase

| Route Pattern | File | In Sitemap? |
|---------------|------|-------------|
| `/[locale]` (homepage) | `app/[locale]/page.tsx` | YES |
| `/[locale]/services` | `app/[locale]/services/page.tsx` | YES |
| `/[locale]/services/[slug]` | `app/[locale]/services/[slug]/page.tsx` | YES (all 10 slugs) |
| `/[locale]/products` | `app/[locale]/products/page.tsx` | YES |
| `/[locale]/products/[slug]` | `app/[locale]/products/[slug]/page.tsx` | YES (all 4 slugs) |
| `/[locale]/admin` | `app/[locale]/admin/page.tsx` | Correctly excluded |
| `/[locale]/admin/expenses` | `app/[locale]/admin/expenses/page.tsx` | Correctly excluded |
| `/[locale]/admin/settings` | `app/[locale]/admin/settings/page.tsx` | Correctly excluded |
| `/[locale]/admin/users` | `app/[locale]/admin/users/page.tsx` | Correctly excluded |

**Orphan pages:** NONE -- all public pages are in the sitemap, all admin pages are correctly excluded.

---

## 3. Findings

### F1: MEDIUM -- All lastmod Timestamps Are Identical

**File:** `app/sitemap.ts`, line 31

The sitemap uses `lastModified: new Date()`, which generates the same timestamp for every URL at build time. Google treats uniform `lastmod` values as unreliable and may ignore them entirely.

**Impact:** Google loses a signal about which pages actually changed, reducing crawl efficiency.

**Fix options:**
- A) Track real modification dates per page (requires CMS or git-based dates)
- B) Use the build date only for pages that genuinely changed (requires diffing)
- C) Remove `lastmod` entirely rather than provide misleading data -- this is better than lying

### F2: INFO -- `changefreq` and `priority` Tags Are Ignored by Google

**File:** `app/sitemap.ts`, lines 32-33

Google has explicitly stated it ignores both `changefreq` and `priority`. Bing also ignores them. These tags add XML bloat but no SEO value.

**Action:** Safe to remove. No negative impact.

### F3: LOW -- Hub Pages Missing `alternates` in Metadata

**File:** `app/[locale]/services/page.tsx` and `app/[locale]/products/page.tsx`

The services and products hub pages generate `Metadata` with `title` and `description` but do **not** set `alternates.canonical` or `alternates.languages`. While the root layout sets alternates for `/`, the hub pages inherit those root-level alternates rather than declaring their own specific ones.

Compare with individual service/product pages that correctly declare:
```typescript
alternates: {
  canonical: `/services/${slug}`,
  languages: { el: `/el/services/${slug}`, en: `/en/services/${slug}` },
}
```

**Impact:** Google may not confidently associate `/el/services` with `/en/services` as hreflang pairs via HTML `<link>` tags, though the sitemap alternates partially compensate.

### F4: LOW -- Double Title Suffix on Service/Product Detail Pages

**File:** `app/[locale]/services/[slug]/page.tsx`, line 67; `app/[locale]/products/[slug]/page.tsx`, line 63

The `generateMetadata` returns `title: \`${title}${SEO.titleSuffix}\``, but the root layout already applies `template: \`%s${SEO.titleSuffix}\`` to all child titles. This results in a doubled suffix like:

> "Wedding Decoration Ilioupoli Athens | KALOUDIS | KALOUDIS"

**Impact:** Looks unprofessional in SERPs and wastes title tag character budget.

**Fix:** Return just `title` without manually appending `SEO.titleSuffix` -- the layout template handles it.

### F5: INFO -- Missing Common Page Types

The site has no standalone pages for:
- Privacy Policy / Terms of Service
- About page (exists as a homepage section `#about` but no `/about` route)
- Contact page (exists as `#contact` section but no `/contact` route)

**Impact:** Low for a local business site. Google Business Profile and homepage sections may suffice. However, a dedicated contact page with embedded Google Maps can boost local SEO signals, and a privacy policy is legally required in the EU (GDPR).

### F6: PASS -- No Doorway Page Risk

With 10 service pages and 4 product pages, the site is well below the 30-page warning threshold for location/service pages. Each service and product page includes:
- Unique translated content (2-4 paragraphs)
- Unique FAQ schema (2-3 questions)
- Unique feature cards
- Unique SEO metadata per slug per locale
- Structured data (Service/Product JSON-LD, BreadcrumbList, FAQPage)

This is safe at scale and shows genuine content differentiation.

### F7: PASS -- robots.txt Configuration

`robots.ts` correctly:
- Allows all crawlers on `/`
- Disallows `/admin/` and `/api/`
- References the sitemap at the canonical domain

### F8: PASS -- hreflang Implementation in Sitemap

The sitemap correctly implements hreflang via the `alternates.languages` property on each URL entry, mapping `el` and `en` to their respective locale paths. This is the recommended approach for sites using Next.js App Router.

### F9: INFO -- SITE_URL Defaults to Production Domain

**File:** `lib/general/seo.ts`, line 1

`SITE_URL` falls back to `https://anthopolio-kaloudhs.gr` when `NEXT_PUBLIC_SITE_URL` is not set. This is correct for production but means the Vercel staging deployment (`anthopolio-kaloudhs.vercel.app`) will generate sitemap URLs pointing to the production domain.

**Impact:** Not a problem if the staging site is not indexed (Vercel preview deployments include `x-robots-tag: noindex` by default). However, confirm that the production domain is properly configured and DNS resolves.

---

## 4. Priority Assignments Review

| Page | Assigned Priority | Assessment |
|------|-------------------|------------|
| Homepages (`/el`, `/en`) | 1.0 | Appropriate -- highest value page |
| Services hub | 0.8 | Appropriate -- discovery page |
| Products hub | 0.8 | Appropriate -- discovery page |
| High-priority services (weddings, baptisms, garden-design) | 0.9 | Appropriate -- core revenue services |
| Normal services (7 remaining) | 0.7 | Appropriate -- secondary services |
| High-priority products (flowers) | 0.9 | Appropriate -- primary product |
| Normal products (soil, fertilizers, pots) | 0.7 | Appropriate -- supporting products |

Note: While the priority values are logically sound, Google ignores `<priority>` entirely. The values only serve as internal documentation of page importance.

---

## 5. Recommendations

### R1: Run a Live Crawl (HIGH)
Use Screaming Frog or `curl` to verify all 40 sitemap URLs return HTTP 200. This cannot be confirmed from code alone.

### R2: Fix Double Title Suffix (HIGH)
In `app/[locale]/services/[slug]/page.tsx` and `app/[locale]/products/[slug]/page.tsx`, change:
```typescript
title: `${title}${SEO.titleSuffix}`
```
to:
```typescript
title: title
```

### R3: Fix lastmod to Use Real Dates or Remove (MEDIUM)
Either track actual content modification dates or remove `lastModified` from the sitemap. Identical timestamps across all URLs signal to Google that the data is unreliable.

### R4: Add alternates to Hub Pages (MEDIUM)
Add `alternates` metadata to `/services` and `/products` hub pages matching the pattern used by detail pages.

### R5: Remove changefreq and priority (LOW)
Remove `changeFrequency` and `priority` from `app/sitemap.ts`. They add XML bloat with zero SEO benefit.

### R6: Add Privacy Policy Page (LOW -- but legally relevant)
EU GDPR requires a privacy policy. Consider adding `/[locale]/privacy` with basic data handling information, especially if using Google Analytics, cookies, or contact forms.

---

## 6. Overall Assessment

**Grade: B+**

The sitemap architecture is solid for a local business site. Page coverage is complete with no orphan pages, admin routes are correctly excluded, hreflang is properly implemented in the sitemap, and there is zero doorway page risk. The main issues are the misleading uniform `lastmod` timestamps, a title suffix duplication bug, and missing `alternates` metadata on hub pages. All are straightforward fixes.
