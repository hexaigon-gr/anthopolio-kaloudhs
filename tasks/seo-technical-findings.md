# Technical SEO Audit Report

**Site:** https://anthopolio-kaloudhs.vercel.app (production: anthopolio-kaloudhs.gr)
**Date:** 2026-03-07
**Framework:** Next.js 16.1.1 + App Router + next-intl 4.7.0
**Overall Technical Score: 62/100**

---

## Executive Summary

The site has a solid foundation with Server-Side Rendering, structured data, and a proper sitemap. However, there are **critical canonical/hreflang issues** that will cause indexing confusion, **missing security headers**, a **double-branded title bug**, and several medium-priority gaps in robots.txt directives and Core Web Vitals optimization.

---

## 1. Crawlability

**Status: PASS with issues**

### robots.txt (`app/robots.ts`)

| Check | Status | Detail |
|-------|--------|--------|
| User-Agent wildcard | PASS | `*` with Allow `/`, Disallow `/admin/`, `/api/` |
| Sitemap reference | PASS | Points to `https://anthopolio-kaloudhs.gr/sitemap.xml` |
| AI bot directives | FAIL | Missing GPTBot, ClaudeBot, PerplexityBot, CCBot, Bytespider rules |
| Middleware crawl blocking | PASS | `proxy.ts` matcher `/((?!api\|trpc\|_next\|_vercel\|.*\\..*).*)` correctly excludes static assets |

**[MEDIUM] Missing AI crawler directives.** Without explicit rules, AI crawlers will scrape all public content for training data.

**Recommendation:** Add specific rules in `app/robots.ts`:
```ts
const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    {
      userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "CCBot", "Bytespider", "Google-Extended"],
      disallow: ["/"],
    },
  ],
  sitemap: `${SITE_URL}/sitemap.xml`,
});
```

### Sitemap (`app/sitemap.ts`)

| Check | Status | Detail |
|-------|--------|--------|
| All pages included | PASS | 40 URLs (20 el + 20 en pairs) |
| lastmod accuracy | WARN | Uses `new Date()` -- always returns build/request time, not actual content modification date |
| Priorities set | PASS | Homepage 1.0, services 0.7-0.9, products 0.7-0.9 |
| hreflang in sitemap | PASS | `alternates.languages` generates `xhtml:link` entries per URL |
| /services and /products listing pages | PASS | Included with priority 0.8 |

**[LOW] lastmod is always "now".** Google ignores inaccurate lastmod values. Consider using a static date or git-based dates.

---

## 2. Indexability

**Status: FAIL -- Critical issues**

### Canonical Tags

| Page | Status | Issue |
|------|--------|-------|
| Homepage (`layout.tsx`) | CRITICAL | `alternates.canonical: "/"` resolves to `https://anthopolio-kaloudhs.gr/` -- missing locale prefix. Google may consolidate `/el` and `/en` to root `/` |
| `/el/products` (`products/page.tsx`) | CRITICAL | **No `alternates` object in generateMetadata** -- inherits layout's `canonical: "/"`, pointing products page canonical to homepage |
| `/el/services` (`services/page.tsx`) | CRITICAL | **No `alternates` object in generateMetadata** -- same inheritance problem as products |
| `/el/services/[slug]` | PASS | Sets `canonical: "/services/${slug}"`, plus `languages` with el/en variants |
| `/el/products/[slug]` | PASS | Sets `canonical: "/products/${slug}"`, plus `languages` with el/en variants |

**[CRITICAL] Products page canonical points to homepage.** The `/el/products` and `/en/products` pages inherit `canonical: "/"` from `layout.tsx` because they do not override `alternates` in their `generateMetadata`. This tells Google both pages are duplicates of the homepage, which will prevent them from ranking.

**[CRITICAL] Services listing page has same canonical inheritance issue.** Same problem as products.

**[CRITICAL] Layout canonical lacks locale prefix.** The root layout sets `canonical: "/"` which resolves to `https://anthopolio-kaloudhs.gr/`. This is ambiguous -- it should be `/${locale}` to properly signal the canonical for each locale variant.

### Title Tag Bug

| Page | Status | Issue |
|------|--------|-------|
| `/el/products` | CRITICAL | Title is `"Προϊοντα \| ΑΝΘΗ-ΦΥΤΑ KALOUDIS"` in generateMetadata, BUT layout template appends ` \| ΑΝΘΗ-ΦΥΤΑ KALOUDIS` again, producing **"Προϊοντα \| ΑΝΘΗ-ΦΥΤΑ KALOUDIS \| ΑΝΘΗ-ΦΥΤΑ KALOUDIS"** |
| `/el/services/[slug]` | CRITICAL | Same double-suffix bug. `title: \`${title}${SEO.titleSuffix}\`` manually appends the suffix, then the layout template appends it again |
| `/el/products/[slug]` | CRITICAL | Identical double-suffix problem |

**Root cause:** The layout.tsx defines `title.template: "%s | ΑΝΘΗ-ΦΥΤΑ KALOUDIS"`. Inner pages that set `title: "Foo | ΑΝΘΗ-ΦΥΤΑ KALOUDIS"` get the suffix doubled. Pages should return just the unique part (e.g., `title: "Στολισμος Γαμου Ηλιουπολη"`) and let the template append the brand.

**Fix for service/product [slug] pages:** Change from:
```ts
title: `${title}${SEO.titleSuffix}`,
```
To:
```ts
title: title,
```

**Fix for /products listing page:** Change from:
```ts
title: locale === "el" ? "Προϊοντα | ΑΝΘΗ-ΦΥΤΑ KALOUDIS" : "Products | ANTHI-FYTA KALOUDIS",
```
To:
```ts
title: locale === "el" ? "Προϊοντα" : "Products",
```

### hreflang Tags

| Page Type | Status | Detail |
|-----------|--------|--------|
| Homepage (layout) | PASS | `languages: { el: "/el", en: "/en" }` in layout alternates |
| Service detail pages | PASS | Explicitly set in generateMetadata |
| Product detail pages | PASS | Explicitly set in generateMetadata |
| Products listing | FAIL | No alternates override -- inherits layout's homepage hreflang |
| Services listing | FAIL | No alternates override -- inherits layout's homepage hreflang |

**[HIGH] Missing hreflang on listing pages.** `/el/products` tells Google its English alternate is `/en` (the homepage) instead of `/en/products`.

### noindex Check

| Check | Status |
|-------|--------|
| Unintended noindex | PASS | Layout sets `robots: { index: true, follow: true }` |
| Admin pages blocked | PASS | `/admin/` disallowed in robots.txt |

---

## 3. URL Structure

**Status: PASS with minor issues**

| Check | Status | Detail |
|-------|--------|--------|
| Locale prefix consistency | PASS | All routes use `/{locale}/...` pattern |
| Clean slugs | PASS | Kebab-case: `garden-design`, `tall-trees`, `pest-control` |
| Trailing slashes | PASS | Next.js default (no trailing slashes) -- consistent |
| Default locale redirect | WARN | `localeDetection: true` in routing -- bare `/` redirects based on Accept-Language header. Root `/` is not a stable canonical |

**[LOW] Root `/` is not a canonical page.** Visiting `/` triggers locale detection and redirects. This is fine for UX but the canonical in layout.tsx pointing to `/` is problematic (see Indexability section).

---

## 4. Security Headers

**Status: FAIL -- No custom headers configured**

### next.config.ts Analysis

The current `next.config.ts` is:
```ts
const nextConfig: NextConfig = {};
```

**No security headers are configured at all.** Vercel provides some defaults (HSTS on `*.vercel.app`), but the production domain needs explicit headers.

| Header | Status | Risk |
|--------|--------|------|
| `Strict-Transport-Security` | FAIL | Not set for production domain |
| `X-Content-Type-Options` | FAIL | Missing `nosniff` |
| `X-Frame-Options` | FAIL | Missing `DENY` or `SAMEORIGIN` |
| `X-XSS-Protection` | FAIL | Missing |
| `Referrer-Policy` | FAIL | Missing |
| `Content-Security-Policy` | FAIL | Missing |
| `Permissions-Policy` | FAIL | Missing |

**[HIGH] Add security headers in next.config.ts:**
```ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};
```

---

## 5. Mobile Optimization

**Status: PASS**

| Check | Status | Detail |
|-------|--------|--------|
| Viewport meta | PASS | Next.js 16 auto-injects `<meta name="viewport" content="width=device-width, initial-scale=1">` |
| Responsive grid | PASS | All grids use `sm:grid-cols-2 lg:grid-cols-3` breakpoints |
| Touch targets | PASS | Buttons use `size="lg"`, nav links have `py-3 px-4` padding in mobile menu |
| Mobile menu | PASS | Slide-in panel with backdrop blur, body scroll lock |
| Font sizing | PASS | Body text is base (16px), headings scale responsively with `md:text-5xl` |
| Tap telephone links | PASS | Phone numbers use `href="tel:+302109954775"` |

**[LOW] Fixed navbar height (h-16 = 64px) on mobile.** Consider if content below the fold is pushed down enough. Breadcrumb nav on service/product pages uses `pt-[calc(theme(spacing.16)+0.75rem)]` which correctly compensates.

---

## 6. Core Web Vitals (Source Code Analysis)

**Status: NEEDS IMPROVEMENT**

### LCP (Largest Contentful Paint)

| Factor | Status | Detail |
|--------|--------|--------|
| Hero image | GOOD | `priority` prop set on hero image (`hero-flowers.jpg`), triggers preload |
| Image optimization | GOOD | Using `next/image` with `fill` and proper `sizes` attributes throughout |
| Font loading | GOOD | Roboto loaded via `next/font/google` with `variable` strategy -- font-swap by default |
| SSR rendering | GOOD | All pages are Server Components (SSR/SSG), no client-side data fetching blocking LCP |

**[LOW] Hero image is a full-viewport JPG.** Consider serving WebP/AVIF via Next.js image optimization (automatic if using `next/image`). Already handled by the framework.

### INP (Interaction to Next Paint)

| Factor | Status | Detail |
|--------|--------|--------|
| Client components | GOOD | Only `navbar.tsx` and `gallery-grid.tsx` are client components -- minimal JS hydration |
| Event handlers | GOOD | Simple scroll listener and toggle state -- no expensive computations |
| Accordion components | GOOD | Radix primitives, well-optimized for interaction |
| Third-party scripts | GOOD | No analytics, chat widgets, or heavy third-party JS detected |

**Estimated INP: Good (<200ms).** The site has very few interactive elements and minimal client-side JS.

### CLS (Cumulative Layout Shift)

| Factor | Status | Detail |
|--------|--------|--------|
| Image dimensions | GOOD | `next/image` with `fill` + container sizing prevents shifts |
| Font swap | WARN | Roboto with `next/font` reduces FOIT but small swap shift possible |
| Navbar fixed positioning | GOOD | Fixed header does not push content |
| Dynamic content | GOOD | No client-side data fetching that would cause layout shifts |

**[LOW] Potential minor CLS from font swap.** Roboto (400, 500, 700 weights) loads from Google Fonts with font-display: swap. The metric override from `next/font` should minimize this.

**[MEDIUM] efood logo on products page.** `<Image src="/images/efood-logo.png" width={100} height={32} className="h-8 w-auto">` -- the `w-auto` with explicit height could cause a minor reflow if the aspect ratio does not match 100:32. Verify the actual image dimensions match.

---

## 7. Structured Data

**Status: PASS -- Well implemented**

| Schema Type | Page | Status | Notes |
|-------------|------|--------|-------|
| LocalBusiness (Florist) | All pages (via layout) | PASS | Complete with address, geo, hours, areaServed (20 cities), hasOfferCatalog |
| Service | `/services/[slug]` | PASS | Per-service with provider, areaServed |
| Product | `/products/[slug]` | PASS | Per-product with brand, offers, availability |
| FAQPage | Service + Product detail pages | PASS | 2-3 FAQs per page |
| BreadcrumbList | Service + Product detail pages | PASS | 3-level breadcrumbs |

**[LOW] LocalBusiness schema is identical on every page.** For inner pages, consider including only the BreadcrumbList and page-specific schema (Service/Product). Having the full LocalBusiness on every page is not harmful but adds unnecessary payload.

**[MEDIUM] Product schema missing price.** The `ProductJsonLd` component creates an Offer without `price` or `priceCurrency`. Google requires price for Product rich results. Since this is a local shop with "contact for price" model, consider using `AggregateOffer` with `lowPrice`/`highPrice` or removing the `offers` property to avoid validation warnings.

**[LOW] GeoCoordinates are approximate.** `latitude: 37.93, longitude: 23.75` -- these are rounded. Use precise coordinates for Google Maps accuracy (e.g., 37.9300, 23.7500 or more precise).

---

## 8. JavaScript Rendering (CSR vs SSR)

**Status: PASS -- Excellent**

| Check | Status | Detail |
|-------|--------|--------|
| Rendering strategy | SSR/SSG | All pages use React Server Components with `setRequestLocale()` |
| Static generation | PASS | `generateStaticParams()` pre-builds all locale + slug combinations |
| Client components | MINIMAL | Only `navbar.tsx`, `gallery-grid.tsx`, theme/language switchers |
| JS bundle impact | GOOD | No heavy libraries (no chart libs, no animation libs beyond tw-animate-css) |
| Zustand usage | GOOD | Only used for dialog state -- negligible bundle impact |

**The entire site is essentially server-rendered HTML with minimal JS hydration.** Search engine crawlers will see complete content without needing JS execution. This is the ideal architecture for SEO.

---

## Prioritized Issue List

### CRITICAL (Fix immediately)

1. **Double brand name in titles** -- Service detail, product detail, and listing pages produce titles like "Foo | BRAND | BRAND". Remove manual `SEO.titleSuffix` appending from `generateMetadata` in:
   - `app/[locale]/services/[slug]/page.tsx` (line 67)
   - `app/[locale]/products/[slug]/page.tsx` (line 63)
   - `app/[locale]/products/page.tsx` (lines 30-31)

2. **Products listing page canonical points to homepage** -- Add `alternates` to `generateMetadata` in `app/[locale]/products/page.tsx`:
   ```ts
   alternates: {
     canonical: `/products`,
     languages: { el: "/el/products", en: "/en/products" },
   },
   ```

3. **Services listing page canonical points to homepage** -- Add `alternates` to `generateMetadata` in `app/[locale]/services/page.tsx`:
   ```ts
   alternates: {
     canonical: `/services`,
     languages: { el: "/el/services", en: "/en/services" },
   },
   ```

4. **Layout canonical is locale-agnostic `/`** -- The root layout sets `canonical: "/"` which is a non-existent page (redirects to locale). This should either be removed (let inner pages define their own) or set per-locale. The simplest fix: remove the `alternates` block from the static `metadata` export in `layout.tsx` and add a `generateMetadata` function that uses the locale param to set the correct canonical.

### HIGH

5. **Missing security headers** -- Add `headers()` to `next.config.ts` with HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.

6. **Missing hreflang on listing pages** -- `/el/services`, `/en/services`, `/el/products`, `/en/products` all inherit incorrect hreflang from layout.

### MEDIUM

7. **AI crawler directives missing** -- Add GPTBot, ClaudeBot, PerplexityBot, CCBot, Google-Extended disallow rules to `robots.ts`.

8. **Product schema missing price** -- Causes Google validation warnings. Either add price data or remove the `offers` property from ProductJsonLd.

9. **efood logo potential CLS** -- Verify image dimensions match the width/height props (100x32).

### LOW

10. **Sitemap lastmod always returns current date** -- Use static dates or content-based dates for accuracy.
11. **GeoCoordinates are approximate** -- Use precise lat/long for the business address.
12. **LocalBusiness schema on every page** -- Consider limiting to homepage only.
13. **og:url on layout points to bare SITE_URL** -- Inner pages should override og:url (service/product pages already do via openGraph.url).

---

## Files Referenced

- `c:\Users\Μητσάκος\Desktop\projects\anthopolio-kaloudhs\app\robots.ts`
- `c:\Users\Μητσάκος\Desktop\projects\anthopolio-kaloudhs\app\sitemap.ts`
- `c:\Users\Μητσάκος\Desktop\projects\anthopolio-kaloudhs\app\[locale]\layout.tsx`
- `c:\Users\Μητσάκος\Desktop\projects\anthopolio-kaloudhs\app\[locale]\products\page.tsx`
- `c:\Users\Μητσάκος\Desktop\projects\anthopolio-kaloudhs\app\[locale]\services\page.tsx`
- `c:\Users\Μητσάκος\Desktop\projects\anthopolio-kaloudhs\app\[locale]\services\[slug]\page.tsx`
- `c:\Users\Μητσάκος\Desktop\projects\anthopolio-kaloudhs\app\[locale]\products\[slug]\page.tsx`
- `c:\Users\Μητσάκος\Desktop\projects\anthopolio-kaloudhs\next.config.ts`
- `c:\Users\Μητσάκος\Desktop\projects\anthopolio-kaloudhs\proxy.ts`
- `c:\Users\Μητσάκος\Desktop\projects\anthopolio-kaloudhs\lib\general\seo.ts`
- `c:\Users\Μητσάκος\Desktop\projects\anthopolio-kaloudhs\components\json-ld.tsx`
