# Schema / Structured Data Audit

**Site:** https://anthopolio-kaloudhs.vercel.app
**Business:** Local Florist & Landscaping Service, Ilioupoli, Greece
**Audit date:** 2026-03-07
**Source files reviewed:**
- `components/json-ld.tsx` (all schema definitions)
- `app/[locale]/layout.tsx` (global schema injection)
- `app/[locale]/page.tsx` (homepage)
- `app/[locale]/services/[slug]/page.tsx` (10 service pages)
- `app/[locale]/products/[slug]/page.tsx` (4 product pages)
- `app/[locale]/products/page.tsx` (products hub)
- `lib/general/seo.ts`, `lib/general/constants.ts`, `lib/general/services.ts`, `lib/general/products.ts`

---

## 1. Existing Schema Inventory

| Page | Schema types present | Source component |
|------|---------------------|------------------|
| **Every page** (via layout) | `Florist` (as LocalBusiness) | `<JsonLd />` in `<head>` |
| `/el/services/weddings` etc. | `Service`, `FAQPage`, `BreadcrumbList` | `ServiceJsonLd`, `FAQJsonLd`, `BreadcrumbJsonLd` |
| `/el/products/flowers` etc. | `Product`, `FAQPage`, `BreadcrumbList` | `ProductJsonLd`, `FAQJsonLd`, `BreadcrumbJsonLd` |
| `/el/products` (hub) | None (only the global Florist from layout) | -- |
| `/el` (homepage) | None (only the global Florist from layout) | -- |

---

## 2. Validation Issues (FAIL)

### 2.1 FAQPage on non-authority site -- CRITICAL

**File:** `components/json-ld.tsx` lines 161-181
**Issue:** `FAQPage` rich results are restricted to government and healthcare authority websites since August 2023. This site is a florist -- Google will ignore the FAQPage markup entirely.
**Impact:** Wasted markup on all 14 service + product pages. No rich result will render.
**Fix:** Remove `FAQJsonLd` from all service and product pages. The visible FAQ accordion is fine for UX; it just should not have FAQPage structured data.

### 2.2 Product schema missing required `offers.price` and `offers.priceCurrency`

**File:** `components/json-ld.tsx` lines 191-236
**Issue:** The `Product` schema includes an `Offer` with `availability` and `seller`, but is missing the **required** `price` and `priceCurrency` properties. Without these, Google will not generate Product rich results.
**Google requirement:** `offers.price` (number) and `offers.priceCurrency` (ISO 4217, e.g. "EUR") are required for Product rich results.
**Current output:**
```json
{
  "@type": "Product",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "seller": { ... }
  }
}
```
**Fix:** Since these are product categories (not individual SKUs), either:
- (A) Add `priceRange` or `AggregateOffer` with `lowPrice`/`highPrice`/`priceCurrency`, or
- (B) Switch to `ItemList` + individual `Product` entries with actual prices from the catalog, or
- (C) Remove `Product` schema for category pages and only use it on individual product listings.

### 2.3 Global Florist schema missing `aggregateRating` -- even though reviews exist

**File:** `components/json-ld.tsx` lines 4-98
**Issue:** The user mentioned 4.9/120 reviews exist, but the `localBusinessSchema` in the code has **no** `aggregateRating` property. Either the rating was removed or was never in the code.
**Fix:** Add to `localBusinessSchema`:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "120",
  "bestRating": "5"
}
```

### 2.4 Geo coordinates are approximate/truncated

**File:** `components/json-ld.tsx` lines 22-25
**Issue:** `latitude: 37.93, longitude: 23.75` -- only 2 decimal places. This resolves to a ~1km radius, not a specific building. Google recommends precise coordinates.
**Fix:** Use the actual coordinates for Kyprion Iroon 4, Ilioupoli: approximately `latitude: 37.9300, longitude: 23.7500` should be refined to the real pin (likely ~37.9312, 23.7534 or similar from Google Maps).

### 2.5 `hasOfferCatalog` items lack `@type` on `itemListElement`

**File:** `components/json-ld.tsx` lines 58-96
**Issue:** `hasOfferCatalog` uses `OfferCatalog` with `itemListElement` containing `Offer` objects. This is structurally correct, but the catalog names ("Υπηρεσίες", "Προϊόντα") are always in Greek regardless of which locale page is being viewed. The global schema is locale-unaware.
**Impact:** Low -- Google can parse it, but for the English locale it presents Greek-only content in schema.

### 2.6 `areaServed` in global schema is always Greek

**File:** `components/json-ld.tsx` lines 48-57
**Issue:** Same as above -- the area names are always Greek ("Ηλιούπολη", "Αργυρούπολη") even on `/en/` pages. This is consistent with the actual Greek city names, but consider adding `"@id"` or `"sameAs"` references to Wikidata/Wikipedia for disambiguation.
**Impact:** Minimal -- Greek names are the canonical city names.

### 2.7 Service schema `provider` uses `Florist` type directly (not `@id` reference)

**File:** `components/json-ld.tsx` lines 128-142
**Issue:** Every service page embeds a full copy of the business entity as `provider` rather than using `@id` to reference the global schema. This creates redundant, potentially conflicting entities.
**Fix:** Add `"@id": "${SITE_URL}/#organization"` to the global Florist schema, then reference it in Service/Product schemas:
```json
"provider": { "@id": "https://anthopolio-kaloudhs.gr/#organization" }
```

### 2.8 Product schema `seller` also duplicates business data

**File:** `components/json-ld.tsx` lines 218-226
**Issue:** Same as 2.7 -- full business entity duplicated in every product's `offers.seller`.

---

## 3. Missing Schema Opportunities

### 3.1 WebSite with SearchAction -- HIGH PRIORITY

**Where:** Global (layout)
**Why:** Enables sitelinks searchbox in Google. Even without actual site search, declaring the `WebSite` type with `potentialAction` tells Google this is the official site.
**Recommended JSON-LD:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ΑΝΘΗ-ΦΥΤΑ KALOUDIS",
  "url": "https://anthopolio-kaloudhs.gr",
  "inLanguage": ["el", "en"]
}
```

### 3.2 BreadcrumbList on homepage -- MEDIUM PRIORITY

**Where:** Homepage (`app/[locale]/page.tsx`)
**Why:** Currently homepage has zero page-specific schema (only the global Florist from layout). A simple breadcrumb helps Google understand site hierarchy.

### 3.3 BreadcrumbList on products hub -- MEDIUM PRIORITY

**Where:** `app/[locale]/products/page.tsx`
**Why:** The products hub page has no page-specific schema at all. Should have at minimum a BreadcrumbList (Home > Products).

### 3.4 LocalBusiness `@type` array for dual business nature -- MEDIUM PRIORITY

**Issue:** The business is both a Florist and a LandscapingBusiness (landscaper/gardener). Using `"@type": "Florist"` alone misses the landscaping services which are half the site's content.
**Fix:** Use an array type:
```json
"@type": ["Florist", "LandscapingBusiness"]
```
Both are valid Schema.org types extending LocalBusiness.

### 3.5 Individual Review entities -- LOW PRIORITY

**Where:** Homepage or global schema
**Why:** If real reviews exist (120 claimed), adding 3-5 actual `Review` entities with `author`, `reviewRating`, and `reviewBody` strengthens the `aggregateRating` signal.

### 3.6 ItemList for product catalog (efood prices) -- MEDIUM PRIORITY

**Where:** `app/[locale]/products/page.tsx`
**Why:** The products hub page displays an actual catalog with real prices (from `lib/general/catalog.ts`). This is a missed opportunity for `ItemList` + `Product` rich results with real pricing data.
**Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Product Catalog",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "name": "Zamia in pot",
        "offers": {
          "@type": "Offer",
          "price": "20.00",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      }
    }
  ]
}
```

### 3.7 `sameAs` is incomplete -- LOW PRIORITY

**File:** `components/json-ld.tsx` line 26
**Issue:** Only Facebook and TikTok are listed. Missing:
- Google Maps / Google Business Profile URL
- efood listing URL (`https://www.e-food.gr/delivery/ilioypoli/kaloydis-anthopoleio`)
**Fix:** Add these to the `sameAs` array.

---

## 4. Consistency Issues Across el/en Versions

### 4.1 Global schema is language-blind

The `<JsonLd />` component in `layout.tsx` renders the same schema for both `/el/` and `/en/` pages. This means:
- Business `name` is always Greek ("ΑΝΘΗ-ΦΥΤΑ KALOUDIS")
- `description` is always Greek
- `hasOfferCatalog` items are always Greek
- `areaServed` city names are always Greek

**Recommendation:** The business name being Greek is acceptable (it is the real name). However, `description` should match the page language. Consider making `<JsonLd />` locale-aware by passing the locale from the layout.

### 4.2 Service/Product schemas are locale-aware (good)

The `ServiceJsonLd`, `ProductJsonLd`, `BreadcrumbJsonLd`, and `FAQJsonLd` all receive locale-appropriate translated content. This is correct.

### 4.3 Breadcrumb `item` URLs use full absolute URLs (good)

All breadcrumb items use `${SITE_URL}/${locale}/...` which is correct.

---

## 5. Rich Results Eligibility Summary

| Rich result type | Eligible? | Status | Blocker |
|-----------------|-----------|--------|---------|
| **Local Business** (knowledge panel) | YES | Partial | Missing `aggregateRating`, imprecise `geo` |
| **Breadcrumbs** | YES | Working | Only on service/product detail pages; missing on hub + homepage |
| **FAQ** | NO | Blocked | Restricted to government/healthcare since Aug 2023 |
| **Product** | NO | Blocked | Missing required `price` + `priceCurrency` in Offer |
| **Sitelinks Searchbox** | NO | Missing | No `WebSite` schema |
| **Review snippet** | NO | Missing | No `aggregateRating` in schema (even though reviews are displayed) |
| **Service** | N/A | Informational | Google does not have a Service rich result, but schema helps Knowledge Graph |

---

## 6. Priority Action Items

### P0 -- Fix immediately (blocking rich results)

1. **Remove all `FAQJsonLd` usage** from service and product pages (restricted schema type)
2. **Add `aggregateRating`** to global Florist schema
3. **Fix Product schema** -- add `price`/`priceCurrency` or switch to `AggregateOffer` for category pages

### P1 -- Add missing high-value schema

4. **Add `WebSite` schema** to global layout
5. **Add `@id` referencing** instead of duplicating business entity across Service/Product schemas
6. **Change `@type` to `["Florist", "LandscapingBusiness"]`** for dual business classification
7. **Add `BreadcrumbList`** to homepage and products hub page

### P2 -- Improvements

8. **Refine geo coordinates** to precise building location
9. **Make global schema locale-aware** (at least for `description`)
10. **Add `sameAs`** entries for Google Maps and efood
11. **Add `ItemList` with priced products** on the products hub page using catalog data
12. **Add sample `Review` entities** if real review text is available

---

## 7. Files to Modify

| File | Changes needed |
|------|---------------|
| `components/json-ld.tsx` | Remove `FAQJsonLd` export; add `@id` to Florist; add `aggregateRating`; add `WebSite` schema; change `@type` to array; fix Product `offers`; add locale param to `JsonLd` |
| `app/[locale]/layout.tsx` | Pass `locale` to `<JsonLd />` |
| `app/[locale]/services/[slug]/page.tsx` | Remove `<FAQJsonLd>` usage |
| `app/[locale]/products/[slug]/page.tsx` | Remove `<FAQJsonLd>` usage |
| `app/[locale]/products/page.tsx` | Add `BreadcrumbJsonLd` + optional `ItemList` schema |
| `app/[locale]/page.tsx` | Add homepage `BreadcrumbJsonLd` |
| `lib/general/constants.ts` | Add Google Maps URL to `BUSINESS` |
