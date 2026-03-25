# SEO Action Plan: ΑΝΘΗ-ΦΥΤΑ KALOUDIS

**Current Score: 72/100 | Target: 90+/100**
**Date:** 2026-03-07

---

## Critical (Fix Immediately)

### 1. Fix Products Page Duplicate Title
**File:** `app/[locale]/products/page.tsx:29-31`
**Issue:** Title is "Προϊόντα | ΑΝΘΗ-ΦΥΤΑ KALOUDIS" but layout template appends "| ΑΝΘΗ-ΦΥΤΑ KALOUDIS" again.
**Fix:** Change to just `"Προϊόντα"` (el) and `"Products"` (en) — the template will add the brand.

### 2. Fix Products Page Canonical
**File:** `app/[locale]/products/page.tsx`
**Issue:** No `alternates` in generateMetadata, so canonical inherits "/" from layout (points to homepage).
**Fix:** Add `alternates: { canonical: "/products" }` to the metadata return.

### 3. Add hreflang to All Service & Product Pages
**File:** Each `app/[locale]/services/[slug]/page.tsx` and `app/[locale]/products/[slug]/page.tsx`
**Issue:** Only sitemap has hreflang; HTML `<head>` is missing per-page hreflang.
**Fix:** Add `alternates: { languages: { el: "/el/services/[slug]", en: "/en/services/[slug]" } }` in each page's generateMetadata.

### 4. Add Security Headers
**File:** `next.config.ts`
**Fix:** Add headers configuration:
```typescript
const nextConfig: NextConfig = {
  headers: async () => [{
    source: "/(.*)",
    headers: [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
    ],
  }],
};
```

---

## High (Fix Within 1 Week)

### 5. Add AggregateRating to Homepage Schema
**File:** `components/json-ld.tsx`
**Fix:** Add to localBusinessSchema:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "120",
  "bestRating": "5"
}
```
**Impact:** Enables star ratings in Google Search results.

### 6. Fix English Fallback Meta Description
**File:** `app/[locale]/layout.tsx`
**Issue:** `description` in layout metadata is always Greek. English pages that don't override it show Greek.
**Fix:** Use locale-aware metadata generation in layout, or ensure every page overrides description.

### 7. Add AI Bot Directives to robots.txt
**File:** `app/robots.ts`
**Fix:** Add explicit rules:
```typescript
rules: [
  { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] },
  { userAgent: "GPTBot", allow: "/" },
  { userAgent: "ClaudeBot", allow: "/" },
  { userAgent: "PerplexityBot", allow: "/" },
],
```

### 8. Fix og:locale for English Pages
**File:** `app/[locale]/layout.tsx`
**Issue:** og:locale is hardcoded to "el_GR" for all pages.
**Fix:** Make locale-dependent in generateMetadata or move OG to per-locale generation.

### 9. Add Product Prices to Schema
**File:** `components/json-ld.tsx` (ProductJsonLd)
**Fix:** Add `price` and `priceCurrency` to the Offer object. At minimum, add `priceRange` or use `AggregateOffer`.

### 10. Fix Homepage English H1 Structure
**Issue:** English homepage has 2 H1 tags (title + subtitle).
**Fix:** Change subtitle to H2 or `<p>` tag.

---

## Medium (Fix Within 1 Month)

### 11. Add `llms.txt` for AI Crawlers
**Location:** `public/llms.txt`
**Content:** Business description, services, products, contact info in plain text for AI crawlers.

### 12. Create Dedicated Area/Location Pages
**Priority cities:** Αργυρούπολη, Γλυφάδα, Νέα Σμύρνη, Βύρωνας, Καλλιθέα
**Structure:** `/el/areas/[city]` with unique content about services in that area.
**Impact:** Massive local SEO boost for "ανθοπωλείο [city]" queries.

### 13. Add Blog/Knowledge Base
**Topics:** Plant care guides, seasonal flower recommendations, garden maintenance tips.
**Impact:** Long-tail keyword capture, AI citability, E-E-A-T expertise signal.

### 14. Expand FAQ Sections
**Current:** 3 FAQs per service page.
**Target:** 5-7 FAQs per page, covering pricing, process, timing, area coverage.
**Impact:** More FAQ rich results, better AI citation passages.

### 15. Add Google Business Profile Link
**Fix:** Add GBP URL to `constants.ts` and render in footer/contact section.
**Also:** Add to `sameAs` array in JSON-LD schema.

### 16. Improve Hero Image Alt Text
**Current:** "Άνθη και φυτά" (generic)
**Better:** "Ανθοπωλείο KALOUDIS - Λουλούδια και φυτά στην Ηλιούπολη"

### 17. Add `x-default` hreflang
**File:** Layout alternates or sitemap
**Fix:** Add `x-default` pointing to `/el` (primary language).

### 18. Add Preconnect Resource Hints
**File:** `app/[locale]/layout.tsx`
**Fix:** Add `<link rel="preconnect">` for Google Maps, fonts, and any external domains.

---

## Low (Backlog)

### 19. Add WebSite Schema with SearchAction
**Impact:** Potential sitelinks search box in SERPs.

### 20. Add Case Study / Portfolio Pages
**Content:** Before/after garden projects, wedding decoration galleries.
**Impact:** E-E-A-T experience signal, AI citability.

### 21. Install Analytics
**Options:** Vercel Analytics (zero-config), Google Analytics 4, or Plausible.
**Impact:** Measure real CWV data, track user behavior.

### 22. Add Event Schema for Seasonal Campaigns
**Example:** Spring planting season, wedding season, Christmas decorations.

### 23. Image Format Optimization Audit
**Action:** Verify Next.js Image is serving WebP/AVIF for all images.
**Check:** Gallery images 1-7.jpg are being optimized on delivery.

### 24. Add Structured Review Markup
**Action:** Display actual Google reviews on site with proper Review schema.

---

## Impact Summary

| Priority | Items | Est. Score Impact |
|----------|-------|-------------------|
| Critical | 4 fixes | +8 points |
| High | 6 fixes | +6 points |
| Medium | 8 improvements | +5 points |
| Low | 6 enhancements | +3 points |
| **Total potential** | | **94/100** |

---

## Quick Implementation Order

For maximum ROI, implement in this order:

1. Fix products title (5 min) - Critical #1
2. Fix products canonical (5 min) - Critical #2
3. Add security headers (10 min) - Critical #4
4. Add AggregateRating schema (10 min) - High #5
5. Add hreflang to all pages (30 min) - Critical #3
6. Fix English meta fallback (15 min) - High #6
7. Add AI bot directives (5 min) - High #7
8. Fix og:locale (10 min) - High #8
9. Add llms.txt (15 min) - Medium #11
10. Fix English H1 (5 min) - High #10
