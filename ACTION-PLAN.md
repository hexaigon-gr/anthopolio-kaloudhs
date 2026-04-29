# SEO Action Plan — ΑΝΘΗ-ΦΥΤΑ KALOUDIS
**Audit date:** 2026-04-29  
**Current score:** 57 / 100  
**Expected score after all fixes:** 82+ / 100

Target keywords: ανθοπωλειο ηλιουπολη · ανθοπωλειο κοντα μου · στολισμοι γαμων · στολισμοι γαμων ηλιουπολη · λουλουδια ηλιουπολη · στολισμος χωρων

---

## CRITICAL — Fix Immediately (blocking rankings or showing wrong data)

### C1 — Fix Sunday hours in schema
**File:** `components/json-ld.tsx`  
**Problem:** Schema says Sunday open 09:00–16:00. Business is CLOSED. Google Maps shows wrong hours.  
**Fix:** Delete the Sunday `OpeningHoursSpecification` block from `localBusinessSchema`.  
**Time:** 5 min  
**Impact:** Fixes live Google Maps data + removes factual error that harms trust

---

### C2 — Fix homepage title to include "Ηλιούπολη" and "ανθοπωλείο"
**File:** `lib/general/seo.ts` (look for `defaultTitle` or equivalent)  
**Problem:** Current title `ΑΝΘΗ-ΦΥΤΑ KALOUDIS | Κηποτεχνικές Εργασίες Αττική` contains zero target keywords.  
**Fix:**
```
Before: ΑΝΘΗ-ΦΥΤΑ KALOUDIS | Κηποτεχνικές Εργασίες Αττική
After:  Ανθοπωλείο Ηλιούπολη | ΑΝΘΗ-ΦΥΤΑ KALOUDIS — Λουλούδια & Στολισμοί
```
**Time:** 10 min  
**Impact:** Directly targets "ανθοπωλειο ηλιουπολη" and "λουλουδια ηλιουπολη"

---

### C3 — Add meta descriptions to all key pages
**File:** `lib/general/seo.ts` + per-page `generateMetadata`  
**Problem:** No page has a meta description. Google writes its own, often missing keywords.

Copy-paste these descriptions:

**Greek homepage** (`SEO.defaultDescription`):
```
Ανθοπωλείο στην Ηλιούπολη Αττικής. Φρέσκα λουλούδια, στολισμοί γάμων, βαπτίσεων & χώρων. Κηποτεχνικές εργασίες από το KALOUDIS — Τηλ. 2109954775.
```

**Wedding page** (`SERVICE_SEO.weddings.descriptionEl` or equivalent):
```
Στολισμός γάμου στην Ηλιούπολη & Αττική. Ανθοστολισμός εκκλησίας, νυφική ανθοδέσμη, στολισμός δεξίωσης. Καλέστε 2109954775.
```

**Contact page** (new `generateMetadata` — see C4):
```
Επικοινωνήστε με το ανθοπωλείο KALOUDIS στην Ηλιούπολη Αττικής. Λ. Κυπρίων Ηρώων 4, Τηλ. 210 9954775. Δε–Σα 9:00–21:00.
```

**Time:** 45 min  
**Impact:** Improves CTR in all Greek search results

---

### C4 — Fix contact page canonical + add to sitemap
**Problem:** `/el/contact` has no `generateMetadata` → inherits homepage canonical → Google ignores contact page as a separate entity.

**Step 1:** Add `generateMetadata` to `app/[locale]/contact/page.tsx`:
```ts
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
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

**Step 2:** Add contact to sitemap in `app/sitemap.ts`:
```ts
// In staticPages array, add:
{ path: "/contact", priority: 0.9 }
```

**Time:** 30 min  
**Impact:** Contact page indexed separately; key page for "ανθοπωλειο ηλιουπολη" (has address)

---

## HIGH — Fix Within 1 Week (significant ranking impact)

### H1 — Add "Ηλιούπολη" to wedding page title and body
**File:** `lib/general/seo.ts` (wedding service SEO key) + wedding page body content/translations  
**Fix — Title:**
```
Before: Στολισμός Γάμου | ΑΝΘΗ-ΦΥΤΑ KALOUDIS
After:  Στολισμοί Γάμων Ηλιούπολη | Ανθοστολισμός Αττική — KALOUDIS
```
**Fix — Body:** Add "Ηλιούπολη" in the first paragraph of the wedding page Greek content. Example:
```
Εξειδικευόμαστε σε στολισμούς γάμων στην Ηλιούπολη και σε όλη την Αττική.
```
**Time:** 20 min  
**Impact:** Directly targets "στολισμοι γαμων ηλιουπολη" — currently zero coverage

---

### H2 — Add `aggregateRating` and `award` to LocalBusiness schema
**File:** `components/json-ld.tsx` — `localBusinessSchema`  
**Add these properties:**
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5",
  "reviewCount": "6",
  "bestRating": "5",
  "worstRating": "1"
},
"award": ["Eagles Award 2023", "Eagles Award 2024", "Eagles Award 2025"]
```
**Time:** 15 min  
**Impact:** Star ratings visible in Google search results + Knowledge Panel credibility

---

### H3 — Add delivery platforms to `sameAs` in LocalBusiness schema
**File:** `components/json-ld.tsx` — `localBusinessSchema.sameAs` array  
These URLs are already in `constants.ts` — just add them to the schema:
```json
"sameAs": [
  "https://www.facebook.com/kipotexnikesergasies13/",
  "https://www.tiktok.com/@kipotexnikesergasies13gm",
  "https://wolt.com/en/grc/athens/venue/kaloudis-garden",
  "https://www.e-food.gr/delivery/ilioypoli/kaloydis-anthopoleio",
  "https://box.gr/delivery/ilioupoli/kaloudhs-anthopwleio"
]
```
**Time:** 10 min  
**Impact:** Google entity verification via authoritative Greek platforms — strengthens Local Pack eligibility

---

### H4 — Fix postal code inconsistency in ProductJsonLd
**File:** `components/json-ld.tsx` — `ProductJsonLd`  
**Fix:** Change postalCode `"16346"` → `"16341"` to match all other schema and GMB  
**Time:** 5 min  
**Impact:** NAP consistency across all structured data

---

### H5 — Add `@id` to LocalBusiness schema
**File:** `components/json-ld.tsx` — `localBusinessSchema`  
**Add:** `"@id": "https://www.anthopoleio-kaloudis.gr"`  
**Time:** 5 min  
**Impact:** Google can reliably connect entity references across all pages

---

### H6 — Update Greek homepage H1 to include target keywords
**File:** `messages/el.json` — the key used for the homepage H1  
**Fix:**
```
Before: Άνθη, Φυτά & Κηποτεχνικές Υπηρεσίες
After:  Ανθοπωλείο στην Ηλιούπολη — Φρέσκα Λουλούδια & Στολισμοί
```
Also update `messages/en.json` H1 consistently.  
**Time:** 15 min  
**Impact:** "ανθοπωλειο ηλιουπολη" and "λουλουδια ηλιουπολη" now have H1 signal

---

### H7 — Google Business Profile optimization (MOST IMPORTANT for "κοντά μου")
**Not a code task — do this at business.google.com**

Checklist:
- [ ] Verify GBP is claimed and verified
- [ ] Set primary category: "Flower Shop" (Ανθοπωλείο)
- [ ] Add secondary categories: "Florist", "Garden Center" (Κηποτεχνικές)
- [ ] Business description: include "ανθοπωλείο Ηλιούπολη", "λουλούδια", "στολισμοί γάμων", "βαπτίσεις"
- [ ] Upload 20+ photos (exterior, products, arrangements, events)
- [ ] Hours must match website exactly (Sun: closed)
- [ ] Respond to all existing Google reviews
- [ ] Ask satisfied customers to leave Google reviews mentioning services
- [ ] Add all services in GBP Services section
- [ ] Publish GBP Post weekly

**Time:** 2–3 hours initial setup  
**Impact:** Single highest-impact action for "ανθοπωλειο κοντα μου" and "ανθοπωλειο ηλιουπολη" — Local Pack ranking

---

### H8 — Add `fetchPriority="high"` to service page hero image
**File:** `app/[locale]/services/[slug]/page.tsx` — `<Image>` tag around line 211  
**Fix:** Add `fetchPriority="high"` prop to the hero `<Image>`  
**Time:** 5 min  
**Impact:** Improves LCP on all service pages

---

### H9 — Add Twitter Card metadata to service pages
**File:** `app/[locale]/services/[slug]/page.tsx` — `generateMetadata`  
**Fix:** Add a `twitter` block mirroring `openGraph`:
```ts
twitter: {
  card: "summary_large_image",
  title: /* page-specific title */,
  description: /* page-specific description */,
  images: [serviceHeroImageUrl],
}
```
**Time:** 20 min  
**Impact:** Correct social share previews when pages are shared

---

## MEDIUM — Fix Within 1 Month

### M1 — Fix `lastmod` in sitemap to use static dates
**File:** `app/sitemap.ts`  
**Fix:** Replace `lastModified: new Date()` with static date strings  
```ts
lastModified: "2026-04-23"  // Update only when page content changes
```
**Time:** 15 min  
**Impact:** Google treats reliable lastmod seriously for crawl scheduling

---

### M2 — Add `x-default` to sitemap hreflang entries
**File:** `app/sitemap.ts` — wherever alternates/hreflang are generated  
**Fix:** Add third alternate entry pointing `hreflang="x-default"` to `/el` for every URL  
**Time:** 30 min  
**Impact:** Clear signal for international visitors and Google's language targeting

---

### M3 — Add `ItemList` schema to services and products listing pages
**File:** Create `ItemListJsonLd` component in `components/json-ld.tsx`, then add to `app/[locale]/services/page.tsx` and `app/[locale]/products/page.tsx`  
**Impact:** Can produce sitelinks in search results; helps Google understand site architecture

---

### M4 — Add `BreadcrumbList` to contact page
**File:** `app/[locale]/contact/page.tsx`  
**Fix:** Add `<BreadcrumbJsonLd>` using the existing component pattern  
**Impact:** Complete schema coverage across all pages

---

### M5 — Add "Ηλιούπολη" to products/flowers page content
**File:** `messages/el.json` — products/flowers page content keys  
**Fix:** Ensure at least H1 or first paragraph mentions "Λουλούδια στην Ηλιούπολη"  
**Impact:** Targets "λουλουδια ηλιουπολη"

---

### M6 — Add neighborhood names to homepage and contact page
For "ανθοπωλειο κοντα μου", Google uses proximity. Reinforce the service area by listing nearby neighborhoods in the "areaServed" section visible on-page:
> Εξυπηρετούμε: Ηλιούπολη, Αργυρούπολη, Δάφνη, Βύρωνας, Άγιος Δημήτριος, Καισαριανή, Ζωγράφου, Νέα Σμύρνη, Γλυφάδα, Άλιμος

**Time:** 20 min  
**Impact:** Expands "near me" radius and provides keyword-rich geographic text

---

### M7 — Strengthen `serviceType` on Service schema
**File:** `components/json-ld.tsx` — `ServiceJsonLd`  
**Fix:** Add `serviceType` prop and pass descriptive values from service data:
- Weddings: `"Wedding Floral Decoration"` / `"Στολισμός Γάμου"`
- Baptisms: `"Baptism Decoration"` / `"Στολισμός Βάπτισης"`  
**Time:** 20 min

---

### M8 — Investigate `rock-gardens` dangling reference
**File:** `lib/general/services.ts` — `relatedSlugs` for `garden-design`  
**Fix:** Either create a `rock-gardens` service page or remove the reference  
**Time:** 10 min investigation, 30 min to resolve

---

## LOW — Backlog (nice to have)

### L1 — Add Content Security Policy header
**File:** `next.config.ts` — `headers()` function  
Improve security posture; no ranking impact

### L2 — Create an "About Us" page
Content: team history, founder story, awards detail, years of experience  
Impact: E-E-A-T signals, brand queries, trust

### L3 — Start a blog with flower/garden content
Topic ideas:
- "Στολισμός γάμου στην Ηλιούπολη: ιδέες και τιμές"
- "Ποια λουλούδια να διαλέξετε για βάφτιση"
- "Φροντίδα εσωτερικών φυτών τον χειμώνα"

Impact: Targets informational queries, builds topical authority, E-E-A-T

### L4 — Add `WhatsApp` ContactPoint to LocalBusiness schema
**File:** `components/json-ld.tsx`  
Low impact but completes the entity profile

### L5 — Consider switching root redirect from 307 → 301
If the business is exclusively Greek-market (no English-language users), a 301 to `/el` sends slightly stronger link equity signal. Low priority given Google handles 307 well for i18n.

---

## Implementation Priority Order

```
Week 1 (Critical): C1 → C2 → C4 → H4 → H5 → H2 → H3 → H6 → C3
Week 1 (Parallel): H7 (Google Business Profile — start immediately, takes longest)
Week 2 (High):     H1 → H8 → H9 → H6 (if not done)
Week 3 (Medium):   M1 → M2 → M5 → M6
Week 4 (Medium):   M3 → M4 → M7 → M8
Backlog:           L1 → L2 → L3 → L4 → L5
```

## Expected Ranking Timeline

| Action | When | Expected Result |
|---|---|---|
| GMB optimization (H7) | Week 1–2 | Local Pack appearance in 2–4 weeks |
| Title + H1 fixes (C2, H6) | Week 1 | Ranking change in 2–6 weeks (reindex) |
| Schema fixes (H2, H3, H4, H5) | Week 1 | Knowledge Panel update in 1–3 weeks |
| Meta descriptions (C3) | Week 1 | CTR improvement immediate after reindex |
| Wedding page location fix (H1) | Week 2 | "στολισμοι γαμων ηλιουπολη" ranking in 4–8 weeks |
| Content additions (M5, M6) | Week 3–4 | Gradual ranking improvement over 4–12 weeks |
