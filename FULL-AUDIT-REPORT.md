# Full SEO Audit — ΑΝΘΗ-ΦΥΤΑ KALOUDIS

**Audited URL:** https://anthopolio-kaloudhs.vercel.app
**Declared canonical domain:** https://anthopolio-kaloudhs.gr *(does not resolve — see Critical Issue #1)*
**Audit date:** 2026-04-14
**Business type detected:** Local business — Florist + Landscaping (dual `Florist` / `LandscapingBusiness` schema), Greece (Athens / Ηλιούπολη area)
**Crawl method:** Direct fetch of homepage, service index, product index, service detail pages (weddings EL+EN), product detail (flowers), sitemap.xml, robots.txt. 40 URLs discovered in sitemap (20 logical × 2 locales).

---

## Executive Summary

### Overall SEO Health Score: **58 / 100**

The site has an unusually strong **foundation** for a small local business — rich Schema.org markup, clean hreflang, great security headers, static prerendering, responsive images, real alt text, logical heading hierarchy, and a proper sitemap structure. **But a single class of bugs — pointing everything at a domain (`anthopolio-kaloudhs.gr`) that does not resolve in DNS — is severe enough to cap effective indexability near zero.** Fix the domain/canonical issue and the score jumps to ~85.

### Score breakdown (weighted)

| Category | Raw | Weight | Contribution | Notes |
|---|---:|---:|---:|---|
| Technical SEO | 45 | 25% | 11.3 | Great headers; broken canonicals; dead production domain |
| Content Quality | 75 | 25% | 18.8 | Good depth on hero pages; bilingual; local relevance |
| On-Page SEO | 80 | 20% | 16.0 | Titles, descriptions, H1, alt text all solid |
| Schema / Structured Data | 90 | 10% | 9.0 | Best-in-class for a local business |
| Performance (CWV) | 70 | 10% | 7.0 | Brotli, Next.js Image, prerender, lazy-load |
| Images | 80 | 5% | 4.0 | AVIF hero, srcset, descriptive alts |
| AI Search Readiness | 55 | 5% | 2.75 | Schema is great; missing llms.txt; canonical bug undermines citations |
| **Total** | — | — | **~69** | Weighted raw ≈ 69; adjusted to **58** due to critical canonical/DNS blocker |

### Top 5 Critical Issues

1. **🔴 Canonicals, sitemap, robots.txt, schema, and OG tags all point to `anthopolio-kaloudhs.gr` — which does not resolve (NXDOMAIN).** Google will see conflicting signals and likely fail to index anything properly. This is the single most important thing to fix.
2. **🔴 Canonical URLs are missing the locale prefix.** Both `/el/services/weddings` and `/en/services/weddings` declare canonical = `https://anthopolio-kaloudhs.gr/services/weddings`. Two different language pages claiming the same canonical will cause Google to drop one from the index.
3. **🔴 Vercel preview domain is `index, follow` (no `X-Robots-Tag: noindex`).** Once the `.gr` domain is live, the `.vercel.app` URLs become duplicate content competing with the real domain.
4. **🟠 Sitemap in `robots.txt` points to a non-resolving domain** (`https://anthopolio-kaloudhs.gr/sitemap.xml`). Googlebot cannot fetch it.
5. **🟠 Missing `llms.txt`** — the site has strong Schema.org data but no AI-readable index for LLM crawlers (ChatGPT, Claude, Perplexity).

### Top 5 Quick Wins

1. **Register / point DNS for `anthopolio-kaloudhs.gr`** to the Vercel deployment, or change every `SITE_URL` to the real production domain you intend to use. Cost: 1 config change + DNS.
2. **Include the locale prefix in canonical URLs** — `canonical: /${locale}/services/${slug}` instead of `/services/${slug}`. Fix in `generateMetadata` of the service/product `[slug]/page.tsx` files.
3. **Add `noindex` to non-production hostnames** — in `app/layout.tsx` detect `VERCEL_ENV !== 'production'` or host ≠ canonical host and emit `<meta name="robots" content="noindex, nofollow">`.
4. **Publish `/llms.txt`** — a 30-line manifest listing your services, locations served, contact details, and key URLs. Huge GEO (Generative Engine Optimization) win for a local business.
5. **Add `BreadcrumbList` JSON-LD on the services and products index pages** (already present on detail pages). Fills a small but visible gap for rich results.

---

## 1. Technical SEO

### ✅ What's working

- **Security headers (excellent)** — `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. This is better than most enterprise sites.
- **Brotli compression active** — `Content-Encoding: br` confirmed on GET. Homepage compresses from ~650KB to ~54KB wire (92% reduction).
- **Prerendered pages** — `X-Nextjs-Prerender: 1` on service detail pages (static, fast).
- **Robots.txt present and sane** — allows `/`, disallows `/admin/` and `/api/`.
- **Sitemap XML well-formed** — 40 URLs, valid `<lastmod>`, `<changefreq>`, `<priority>`, and per-URL `<xhtml:link rel="alternate" hreflang>`.
- **Proper 307 redirect** from `/` → `/el` with `NEXT_LOCALE` cookie (correct Next.js i18n behavior).
- **Hreflang implementation correct** — `el`, `en`, and `x-default` all emitted in `<head>`, matching sitemap alternates.
- **Mobile viewport** — `width=device-width, initial-scale=1` present.
- **HTML `lang` attribute** — set to current locale (`lang="el"` / `lang="en"`).

### 🔴 Critical issues

#### 1.1 Dead production domain (severity: critical)
```
$ curl https://anthopolio-kaloudhs.gr
curl: (6) Could not resolve host: anthopolio-kaloudhs.gr
```
The domain referenced by every canonical, every OG tag, every schema `url`, the sitemap, and `robots.txt` does not exist in DNS. Google cannot verify canonicals, cannot fetch the sitemap it's pointed at, and will receive conflicting messages about which host is authoritative.

**Found in:**
- 16 references in homepage HTML
- `robots.txt` → `Sitemap: https://anthopolio-kaloudhs.gr/sitemap.xml`
- Sitemap itself uses `https://anthopolio-kaloudhs.gr/...` for every `<loc>`
- JSON-LD `LocalBusiness.url`, `image`, every `og:url`, `og:image`, twitter card image
- Every `<link rel="canonical">` and every `<link rel="alternate" hreflang>`

**Fix:** Either (a) point DNS for `anthopolio-kaloudhs.gr` at Vercel and configure it as the primary domain, or (b) update `SITE_URL` in [lib/general/seo.ts](lib/general/seo.ts) (or wherever it's defined) to the real production domain, then redeploy.

#### 1.2 Canonical URL missing locale prefix (severity: critical)

Both locales declare the exact same canonical:
```html
<!-- /el/services/weddings -->
<link rel="canonical" href="https://anthopolio-kaloudhs.gr/services/weddings"/>
<!-- /en/services/weddings -->
<link rel="canonical" href="https://anthopolio-kaloudhs.gr/services/weddings"/>
```
This collapses two distinct language pages into one canonical. Google will pick one and drop the other from the index — defeating the hreflang setup entirely.

**Location:** [app/[locale]/services/[slug]/page.tsx:72](app/[locale]/services/[slug]/page.tsx#L72) — `alternates.canonical: /services/${slug}`. Should be `` `/${locale}/services/${slug}` ``. Same bug is present in [app/[locale]/products/[slug]/page.tsx](app/[locale]/products/[slug]/page.tsx) and likely the `[locale]/layout.tsx` / root `generateMetadata`.

#### 1.3 Preview domain is indexable (severity: high)

The audited `.vercel.app` host serves `<meta name="robots" content="index, follow">` and no `X-Robots-Tag` header. Once the production domain is live, these preview URLs become duplicate content. Current canonicals don't save you because they point at a non-existent domain.

**Fix:** Detect non-production hosts (`process.env.VERCEL_ENV !== 'production'` or header-based host matching) and emit `<meta name="robots" content="noindex, nofollow">`. Alternatively, set `X-Robots-Tag: noindex` via `next.config.ts` `headers()` when on preview.

### 🟡 Medium

- **`Cache-Control: public, max-age=0, must-revalidate`** — HTML is effectively uncached. For static pages that rarely change, a short `s-maxage` with `stale-while-revalidate` would help TTFB on repeat visits.
- **No `.well-known/security.txt`** — not SEO-critical, but good hygiene for a business site.

### Core Web Vitals (directional — needs Lighthouse run after DNS fix)

- ✅ Static prerender → low TTFB (~186ms observed from audit machine)
- ✅ Hero image uses AVIF with `priority` (good LCP element)
- ✅ All below-fold images `loading="lazy"`
- ⚠️ Homepage wire size ~54KB HTML (brotli) — fine, but uncompressed HTML is 650KB, which reflects a large React Server Components flight payload. Watch hydration cost.
- ❓ INP / CLS: not measurable from HTML-only audit.

---

## 2. Content Quality

### E-E-A-T assessment

| Signal | Status | Evidence |
|---|---|---|
| **Experience** | 🟢 Strong | Real business address (Λεωφόρος Κυπρίων Ηρώων 4, Ηλιούπολη), phone, email, opening hours, 20 areas served, clear service list. Real photos throughout (not stock). |
| **Expertise** | 🟡 Medium | Service descriptions are written and bilingual, but there is no named person (owner, florist, gardener) or credentials. No author bio. |
| **Authoritativeness** | 🟡 Medium | `aggregateRating: 4.9 / 120 reviews` in schema. Social profiles (Facebook, TikTok) linked. No press, certifications, or awards visible. |
| **Trustworthiness** | 🟢 Strong | Full NAP, opening hours, `priceRange`, physical address, structured data. HTTPS + HSTS. Missing: privacy policy, terms, cookie banner (may be required under GDPR). |

### Thin content check

Service detail pages (sampled: weddings) have 13+ substantive paragraphs, H1 + multiple H2/H3 sections, FAQ block (3 questions for high-priority services), related services cross-links, hero + rich content + features + FAQ + CTA. **No thin-content risk.**

### Readability

- Greek content is natural and locally framed.
- English content is translation-complete (service slugs, metadata, FAQs).
- Short paragraph structure, good for mobile + AI extraction.

### Duplicate content

- Locale pairs differ only in language — correct; hreflang handles this.
- ⚠️ **Real duplicate risk:** `.gr` (broken) + `.vercel.app` (live + indexable) serving the same content.

---

## 3. On-Page SEO

### Title tags — sampled

| URL | Title | Length | Verdict |
|---|---|---:|---|
| `/el` | `ΑΝΘΗ-ΦΥΤΑ KALOUDIS \| Κηποτεχνικές Εργασίες Αττική` | 51 | ✅ |
| `/el/services/weddings` | `Στολισμός Γάμου \| ΑΝΘΗ-ΦΥΤΑ KALOUDIS` | 37 | ✅ |
| `/el/products/flowers` | `Άνθη & Φυτά \| ΑΝΘΗ-ΦΥΤΑ KALOUDIS` | 33 | ✅ |

Well under 60 chars. Brand name consistently in second position.

### Meta descriptions — sampled

- Homepage (el): ~166 chars — at the upper edge, will truncate at ~160
- Weddings (el): ~130 chars — ✅
- Flowers (el): ~115 chars — ✅

All include location keywords ("Αττική", "Αθήνα") and primary services.

### Heading structure

Homepage has exactly **one H1** (`Άνθη, Φυτά & Κηποτεχνικές Υπηρεσίες`), with H2s per section and H3s per card. Same structure holds on service detail pages. ✅

### Internal linking

- Navbar: Home, Services, Products, Contact
- Service index → service detail pages
- Related-services block on each service detail page (cross-links ~3 sibling services)
- Footer contains a "Quick Links" block
- **Gap:** no contextual in-content links from service copy to related services or products. Adding "Check our [wedding flowers](/el/products/flowers)" style links inside paragraphs would improve internal link equity and dwell time.

### Keywords meta

`<meta name="keywords">` is still in use. Google ignores it; not harmful, but dead weight (~300 bytes per page). Remove to clean up `<head>`.

---

## 4. Schema / Structured Data

### Homepage JSON-LD

**Type:** `["Florist", "LandscapingBusiness"]` — dual-typed local business ✅

**Fully populated:**
- `name`, `description`, `url`, `telephone`, `email`, `image`
- `address` (`PostalAddress` with streetAddress, locality, region, postalCode, country = GR)
- `geo` (`GeoCoordinates` lat 37.9297, lng 23.7514)
- `sameAs` (Facebook, TikTok)
- `priceRange: "€€"`
- `aggregateRating` (4.9 / 120, bestRating 5)
- `openingHoursSpecification` (three specs for Mon–Sat / Thu / Sun)
- `areaServed` (20 Athens neighborhoods)
- `hasOfferCatalog` — two catalogs (services, products) with full item lists

This is **best-in-class** local-business schema.

### Service detail pages (e.g. `/el/services/weddings`)

Contains `BreadcrumbList`, `Service`, `FAQPage`, plus the `LocalBusiness` from the root layout. ✅

### Product detail pages (e.g. `/el/products/flowers`)

Contains `Florist`, `Service`, `BreadcrumbList`, `FAQPage`. ✅

### Issues

- **Schema `url` / `image` fields reference the dead `.gr` domain.** Same root cause as §1.1.
- **Product pages use `Service` schema, not `Product`/`ItemList`.** For items like "Flowers", "Soil", "Fertilizers", "Pots", `Product` (or `ItemList` of `Product`) would be more accurate and eligible for Product rich results. Currently eligible for Service rich results instead.
- **Missing `WebSite` schema with `SearchAction`** at site root — useful for sitelinks search box. Add a small `WebSite` entity alongside the `LocalBusiness`.
- **`aggregateRating` without `review` entities** — Google's current guidance is that `aggregateRating` should be accompanied by at least one `review` (or be on a page that contains user-visible reviews). Otherwise stars may be suppressed. Either add `Review` items or move the aggregateRating into a dedicated `/reviews` context.

### Validation

Manual inspection — no JSON syntax errors, all required properties present, types recognized. Run through [validator.schema.org](https://validator.schema.org/) after the domain fix to confirm live.

---

## 5. Performance

Measured directly (single datapoint, audit machine, Frankfurt Vercel edge):

| Metric | Value | Verdict |
|---|---:|---|
| TTFB (homepage GET) | ~186ms | ✅ excellent |
| Compressed wire size (/el) | ~54KB (br) | ✅ |
| Uncompressed HTML (/el) | ~650KB | ⚠️ heavy |
| Uncompressed HTML (/el/services/weddings) | ~195KB | ✅ |
| Prerender | static (`X-Nextjs-Prerender: 1`) | ✅ |
| Hero image format | AVIF with `srcset` up to 3840w | ✅ |
| Below-fold images | `loading="lazy"` | ✅ |

The 650KB homepage HTML is large because of React Server Components flight payload. This is normal for Next.js 16 App Router, but watch hydration cost after the domain fix.

### Not measured (need live domain + Lighthouse)

LCP, INP, CLS, and real-user metrics. Run `pagespeed.web.dev` once DNS is fixed.

---

## 6. Images

| Check | Result |
|---|---|
| Alt attribute present | ✅ 100% of sampled images |
| Empty alts | 0 |
| Descriptive alts | ✅ sampled: `Στολισμοί Γάμων`, `Ανθοστολισμός λαμπάδας βάπτισης`, `Wedding floral decoration` |
| Modern formats | ✅ AVIF for hero, Next.js Image optimizer handles rest |
| Responsive srcset | ✅ generated by `next/image` |
| Lazy loading | ✅ all below-fold |
| Explicit dimensions (CLS) | ✅ `width`/`height` on fixed-size images, `fill` + `sizes` elsewhere |

**Minor:** Alt text on photo-gallery service cards repeats the service title. Slightly more descriptive alts would help image search and accessibility. Not a must-fix.

**Stray file:** `public/images/addresspicker1.jpg` is untracked in git. Verify whether it's intended.

---

## 7. AI Search Readiness (GEO)

| Signal | Status |
|---|---|
| Structured data depth | 🟢 excellent (see §4) |
| `llms.txt` | 🔴 missing |
| AI crawler allowed in `robots.txt` | 🟢 implicit (`User-Agent: *` + no block) |
| Canonical URL reachable | 🔴 broken (NXDOMAIN) |
| Page-level Q&A structure | 🟢 FAQ schema on service pages |
| Author / entity info | 🟡 business entity yes, named people no |
| Citation-friendly paragraphs | 🟢 short, factual, location-specific |

AI engines love local-business Schema and FAQ blocks — you have both. But they resolve canonicals when citing, and your canonicals point to a dead host. **Fixing §1.1 is also the #1 GEO fix.**

**Quick win:** publish `/public/llms.txt` (see ACTION-PLAN.md for template).

---

## 8. Sitemap Quality

- ✅ XML well-formed, 40 URLs
- ✅ `<lastmod>` present on every URL
- ✅ `<changefreq>` reasonable (`weekly` for content pages)
- ✅ Priority signals sensible (1.0 for home, 0.9 for high-priority services, 0.8 for indexes)
- ✅ Hreflang alternates per URL
- 🔴 All `<loc>` values point to dead `.gr` domain
- 🟡 Missing URLs: legal pages (privacy policy, terms, cookies), reviews page (if planned), dedicated contact page (if separate from `#contact` anchor)

---

## 9. Other

- **Admin panel** blocked in `robots.txt` ✅
- **Cookie banner / GDPR** — not observed in HTML. Greece is in EU → a CMP is legally required for non-essential cookies.
- **Core Web Vitals field data** — currently zero (no traffic on real domain). Set up Google Search Console + Vercel Speed Insights once the domain fix lands.

---

## Appendix: Raw findings snapshot

```
# DNS
$ curl https://anthopolio-kaloudhs.gr
curl: (6) Could not resolve host: anthopolio-kaloudhs.gr

# Canonical mismatch
EL: <link rel="canonical" href="https://anthopolio-kaloudhs.gr/services/weddings"/>
EN: <link rel="canonical" href="https://anthopolio-kaloudhs.gr/services/weddings"/>  ← same

# robots meta on vercel preview
<meta name="robots" content="index, follow"/>

# robots.txt
User-Agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://anthopolio-kaloudhs.gr/sitemap.xml  ← dead host

# Security headers
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()

# Schema types found
Homepage:       Florist, LandscapingBusiness, PostalAddress, GeoCoordinates,
                OfferCatalog, AggregateRating, OpeningHoursSpecification
Service detail: Florist, LandscapingBusiness, BreadcrumbList, Service, FAQPage
Product detail: Florist, Service, BreadcrumbList, FAQPage
```

---

**Next step:** see `ACTION-PLAN.md` for the prioritized fix list.
