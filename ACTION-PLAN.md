# SEO Action Plan — ΑΝΘΗ-ΦΥΤΑ KALOUDIS

**Audit date:** 2026-04-14
**Current score:** 58 / 100
**Expected score after Critical + High tasks:** 85+ / 100

See `FULL-AUDIT-REPORT.md` for the full findings. This file is the prioritized fix list.

---

## 🔴 CRITICAL — Do today

### C1. Fix the dead production domain

**Problem:** `anthopolio-kaloudhs.gr` does not resolve in DNS, yet every canonical, sitemap entry, OG tag, and schema `url` points to it. Google cannot verify or index anything.

**Two possible fixes** — pick one:

**Option A — Make `.gr` real (preferred if you own the domain)**
1. Buy/verify ownership of `anthopolio-kaloudhs.gr`.
2. In the Vercel dashboard → Project → Settings → Domains → add `anthopolio-kaloudhs.gr` and `www.anthopolio-kaloudhs.gr`.
3. Set the DNS records Vercel shows you at your registrar (typically an `A` record + a `CNAME` for `www`).
4. Set `anthopolio-kaloudhs.gr` as the **primary** domain in Vercel so the `.vercel.app` URL 308s to it.
5. Confirm: `curl -I https://anthopolio-kaloudhs.gr` returns 200.

**Option B — Use the `.vercel.app` hostname as the canonical**
1. Find the constant that defines `SITE_URL` (likely [lib/general/seo.ts](lib/general/seo.ts) or [lib/general/constants.ts](lib/general/constants.ts)).
2. Change from `https://anthopolio-kaloudhs.gr` to `https://anthopolio-kaloudhs.vercel.app`.
3. Grep for any other hard-coded references: `grep -rn "anthopolio-kaloudhs.gr" app/ lib/ components/ public/`.
4. Redeploy.

**Acceptance:** Every `<link rel="canonical">`, every `<loc>` in `sitemap.xml`, the `Sitemap:` line in `robots.txt`, every `og:url`, and the JSON-LD `url` field all point to the same reachable host.

---

### C2. Include the locale prefix in canonical URLs

**Problem:** Both `/el/services/weddings` and `/en/services/weddings` declare the same canonical (`/services/weddings`), which collapses two language versions into one.

**Fix:**
- [app/[locale]/services/[slug]/page.tsx:72](app/[locale]/services/[slug]/page.tsx#L72):
  ```ts
  alternates: {
    canonical: `/${locale}/services/${slug}`,  // was: `/services/${slug}`
    languages: {
      el: `/el/services/${slug}`,
      en: `/en/services/${slug}`,
    },
  },
  ```
- Apply the same change in `app/[locale]/products/[slug]/page.tsx`.
- Check `app/[locale]/layout.tsx` and any `generateMetadata` in `app/[locale]/services/page.tsx`, `app/[locale]/products/page.tsx`, and `app/[locale]/page.tsx` — they likely have the same bug pattern.

**Acceptance:** `curl -s https://<host>/el/services/weddings | grep canonical` shows `/el/services/weddings`, not `/services/weddings`. Same for `/en/`.

---

### C3. Block indexing on non-production hosts

**Problem:** The `.vercel.app` preview serves `index, follow`. Once `.gr` goes live, the preview becomes duplicate content.

**Fix — `next.config.ts`** (simplest):
```ts
async headers() {
  const isProd = process.env.VERCEL_ENV === 'production';
  if (isProd) return [];
  return [{
    source: '/:path*',
    headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
  }];
}
```

**Or in the root layout**, read headers and emit the meta conditionally:
```ts
// app/[locale]/layout.tsx
import { headers } from 'next/headers';
const host = (await headers()).get('host') ?? '';
const isPrimary = host === 'anthopolio-kaloudhs.gr' || host === 'www.anthopolio-kaloudhs.gr';
// pass !isPrimary down as a `noindex` prop on <Metadata>
```

**Acceptance:** `curl -I https://anthopolio-kaloudhs.vercel.app | grep -i x-robots` returns `noindex` on preview; nothing on production.

---

## 🟠 HIGH — Within 1 week

### H1. Fix the `Sitemap:` line in `robots.txt`

Once C1 lands, the `robots.txt` sitemap line will already resolve. Verify `robots.txt` still reads:
```
Sitemap: https://<your-primary-host>/sitemap.xml
```
and `curl -I https://<your-primary-host>/sitemap.xml` returns 200.

### H2. Publish `/public/llms.txt`

Create `public/llms.txt`:
```
# ΑΝΘΗ-ΦΥΤΑ KALOUDIS
> Florist and landscaping services in south Athens, Greece (Ηλιούπολη and nearby suburbs).

## Services
- Wedding floral decoration: https://anthopolio-kaloudhs.gr/el/services/weddings
- Baptism decoration: https://anthopolio-kaloudhs.gr/el/services/baptisms
- Church icons: https://anthopolio-kaloudhs.gr/el/services/church-icons
- Reception decoration: https://anthopolio-kaloudhs.gr/el/services/receptions
- Commercial spaces: https://anthopolio-kaloudhs.gr/el/services/commercial-spaces
- Garden design: https://anthopolio-kaloudhs.gr/el/services/garden-design
- Garden maintenance: https://anthopolio-kaloudhs.gr/el/services/maintenance
- Automatic irrigation: https://anthopolio-kaloudhs.gr/el/services/irrigation
- Pruning: https://anthopolio-kaloudhs.gr/el/services/pruning
- Tall-tree cutting: https://anthopolio-kaloudhs.gr/el/services/tall-trees
- Land clearing: https://anthopolio-kaloudhs.gr/el/services/land-clearing
- Pest control: https://anthopolio-kaloudhs.gr/el/services/pest-control

## Products
- Flowers & plants: https://anthopolio-kaloudhs.gr/el/products/flowers
- Soil & substrates: https://anthopolio-kaloudhs.gr/el/products/soil
- Fertilizers: https://anthopolio-kaloudhs.gr/el/products/fertilizers
- Pots: https://anthopolio-kaloudhs.gr/el/products/pots
- Pest-control products: https://anthopolio-kaloudhs.gr/el/products/pest-products

## Contact
- Address: Λεωφόρος Κυπρίων Ηρώων 4, Ηλιούπολη 16341, Αθήνα
- Phone: +30 210 9954775
- Email: kipotexnikesergasies13@gmail.com
- Hours: Mon–Sat 09:00–21:00 (Thu 09:00–19:00), Sun 09:00–16:00
- Facebook: https://www.facebook.com/kipotexnikesergasies13/
- TikTok: https://www.tiktok.com/@kipotexnikesergasies13gm

## Areas served
Ηλιούπολη, Αργυρούπολη, Δάφνη, Βύρωνας, Άλιμος, Υμηττός, Άγιος Δημήτριος,
Καισαριανή, Ελληνικό, Γλυφάδα, Νέα Σμύρνη, Παλαιό Φάληρο, Καλλιθέα,
Ζωγράφου, Παγκράτι, Βούλα, Βουλιαγμένη, Βάρη, Παπάγου, Χολαργός
```

Replace the hostname with whichever primary host C1 ends up using.

### H3. Add `BreadcrumbList` JSON-LD on index pages

Service and product **detail** pages already have breadcrumbs. Add the same `BreadcrumbJsonLd` component to:
- `app/[locale]/services/page.tsx` (breadcrumb: Home → Services)
- `app/[locale]/products/page.tsx` (breadcrumb: Home → Products)

### H4. Change product pages from `Service` schema to `Product` / `ItemList`

Current product pages emit `Service` schema for items like "Flowers", "Soil", "Fertilizers", "Pots". These are physical goods — eligible for Product rich results if marked up correctly.

- `app/[locale]/products/[slug]/page.tsx` — replace the `ServiceJsonLd` with either:
  - `Product` schema if each page shows one hero product
  - `ItemList` of `Product` items if each page shows a category grid
- At minimum include: `name`, `image`, `description`, `brand`, `offers.priceCurrency: "EUR"`, `offers.availability: "https://schema.org/InStock"`.

### H5. Fix `aggregateRating` visibility

Google's Review rich-result guidance says `aggregateRating` needs either (a) an accompanying `review` list or (b) user-visible reviews on the same page.

Options:
- Add 3–5 `Review` items to the homepage JSON-LD (sourced from real Google reviews — do **not** invent).
- Or move `aggregateRating` to a dedicated `/reviews` page where real review quotes are displayed.

### H6. Remove `<meta name="keywords">`

Google ignores it; it's dead weight on every page. Remove from `generateMetadata` calls.

---

## 🟡 MEDIUM — Within 1 month

### M1. Add contextual in-content internal links

In service-detail copy (e.g. weddings), add inline links to related services and products inside the paragraphs themselves, not just the footer/related-cards block:

> "We pair our **[wedding floral designs](/el/services/weddings)** with **[fresh flowers sourced daily](/el/products/flowers)** and matching **[reception decor](/el/services/receptions)**."

Target: 2–3 contextual in-content links per 300-word section.

### M2. Add `WebSite` + `SearchAction` schema

Even without internal site search, a basic `WebSite` entity helps Google understand the site boundary:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ΑΝΘΗ-ΦΥΤΑ KALOUDIS",
  "url": "https://<primary-host>",
  "inLanguage": ["el-GR", "en-US"]
}
```
Add alongside the existing LocalBusiness JSON-LD in the root layout.

### M3. Tighten homepage meta description

Current Greek description is 166 characters — will truncate at ~160 in search results. Trim to ≤155 chars while keeping the primary keywords ("ανθοπωλείο", "κηποτεχνικές", "Αττική").

### M4. Add `Person` / authored content signals for E-E-A-T

Consider an "About" page or an author byline on service copy naming the owner/operator. Cheap E-E-A-T win.

### M5. Configure `Cache-Control` for static HTML

Current: `public, max-age=0, must-revalidate`. For static pages that rebuild on deploy, a short `s-maxage=60, stale-while-revalidate=86400` would let Vercel's edge cache serve subsequent requests instantly.

### M6. Publish legal pages (GDPR)

Greece is EU — a privacy policy, cookie policy, and consent banner are legally required if you use analytics or any non-essential cookies. Add:
- `/el/privacy`, `/en/privacy`
- `/el/cookies`, `/en/cookies`
- `/el/terms`, `/en/terms`

Link from the footer. Add to sitemap.

### M7. Run Lighthouse + PageSpeed Insights after C1 lands

Collect baseline Core Web Vitals:
```bash
npx lighthouse https://<primary-host>/el --view
```
Check LCP, INP, CLS on mobile. Address any red metrics.

---

## 🟢 LOW — Backlog

- **L1.** More descriptive alt text on service gallery cards (e.g. `Ανθοστολισμός εκκλησιαστικής τελετής με λευκά τριαντάφυλλα` instead of just `Στολισμοί Γάμων`).
- **L2.** Add `.well-known/security.txt` (non-SEO but good hygiene).
- **L3.** Clean up stray untracked file `public/images/addresspicker1.jpg` (confirm intent first).
- **L4.** Set up Google Search Console + Bing Webmaster Tools for the new primary domain, submit the sitemap.
- **L5.** Set up Google Business Profile (local pack signal) if not already done — link it from the footer.
- **L6.** Add `Review` schema on individual testimonial quotes if you surface user reviews in the UI.
- **L7.** Consider migrating product photos to AVIF in addition to the hero (Next.js Image already handles this if the optimizer is configured).

---

## Validation checklist (run after each batch of fixes)

```bash
# 1. Domain + canonical
curl -I https://<primary-host>/ | head -5
curl -s https://<primary-host>/el/services/weddings | grep -E "canonical|hreflang" | head -10

# 2. Robots + sitemap
curl -s https://<primary-host>/robots.txt
curl -sI https://<primary-host>/sitemap.xml | head -3

# 3. Preview noindex
curl -I https://anthopolio-kaloudhs.vercel.app/ | grep -i x-robots

# 4. Schema validation
# → paste the HTML source into https://validator.schema.org/
# → paste the URL into https://search.google.com/test/rich-results

# 5. Lighthouse
npx lighthouse https://<primary-host>/el --preset=desktop --view
npx lighthouse https://<primary-host>/el --view  # mobile
```

---

## Scoring impact (estimated)

| Fix | Category | Points recovered |
|---|---|---:|
| C1 (domain) | Technical + Schema + AI | +18 |
| C2 (locale canonical) | Technical + Content | +6 |
| C3 (noindex preview) | Technical | +3 |
| H1–H6 combined | Technical + Schema + Content | +5 |
| M1–M7 combined | All | +4 |
| **Total** | | **≈ +36 → score 85–90** |
