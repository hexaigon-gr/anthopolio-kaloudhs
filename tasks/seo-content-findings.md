# SEO Content Quality & E-E-A-T Audit

**Website:** https://anthopolio-kaloudhs.vercel.app
**Business:** ANTHI-FYTA KALOUDIS -- Local Florist & Landscaping, Ilioupoli, Greece
**Audit date:** 2026-03-07
**Primary language:** Greek (el) | Secondary: English (en)

---

## Overall Content Quality Score: 78/100

The site demonstrates strong local SEO foundations with dedicated service and product pages, structured data, and bilingual support. The primary gaps are in E-E-A-T depth (missing author/team bio, no case studies) and some thin content on secondary product pages.

---

## 1. E-E-A-T Breakdown

### Experience (Score: 68/100 | Weight: 20%)

**Strengths:**
- Real physical business with verifiable address (Kyprion Iroon 4, Ilioupoli)
- Google reviews embedded (6 real reviews displayed, 4.9 stars, 120 reviews claimed)
- Awards mentioned: Eagles Award 2023, 2024, 2025
- Gallery section with photos from the shop and actual work
- Service pages reference real-world processes (e.g., "free consultation at our shop", controlled felling techniques, collaboration with agronomist)

**Gaps:**
- No team/owner bio page or "About the Founder" section -- the name "Eleanna" appears only in reviews, not in the business's own content
- No portfolio or case study pages showing before/after of garden design, wedding decoration work
- No "years in business" statement anywhere in the content
- Reviews are hardcoded, not dynamically pulled -- timestamps like "3 weeks ago" will become stale
- No photos of actual completed projects on service pages (icons used instead of real images per the page template)

### Expertise (Score: 72/100 | Weight: 25%)

**Strengths:**
- Detailed technical content in service pages: types of pruning (shaping, thinning, rejuvenation, sanitary), irrigation brands (Hunter, Rain Bird), smart controllers
- Pest control page references collaboration with a specialized agronomist
- Garden design page mentions 3D visualization tools, soil analysis, Mediterranean climate adaptation
- Product pages list specific plant species (Dionaea, Drosera, Nepenthes, monstera, ficus, sansevieria)
- Fertilizer page distinguishes organic vs chemical, mentions specific formulations (20-20-20)

**Gaps:**
- No author byline or professional credentials shown on any page
- No mention of certifications, licenses, or professional affiliations
- Pest control page claims agronomist collaboration but does not name or credential the agronomist
- No gardening tips, blog, or educational content to demonstrate ongoing expertise
- No mention of industry associations (e.g., Panhellenic Florist Association or equivalent)

### Authoritativeness (Score: 74/100 | Weight: 25%)

**Strengths:**
- Eagles Award 2023, 2024, 2025 -- three consecutive years of recognition
- 120 Google reviews at 4.9 stars is strong social proof
- efood partnership (delivery platform integration) shows commercial legitimacy
- LocalBusiness structured data with `@type: Florist` is accurate
- 20 areas served listed in schema.org data

**Gaps:**
- No link to or verification of the Eagles Award (no external citation)
- No press mentions, local media coverage, or third-party editorial links referenced
- Facebook and TikTok are listed in sameAs schema, but no Instagram (unusual for a florist)
- No Google Business Profile link or badge on the website
- The efood link is present but there is no AggregateRating schema pulling from Google reviews

### Trustworthiness (Score: 85/100 | Weight: 30%)

**Strengths:**
- Full NAP (Name, Address, Phone) displayed consistently across all pages
- Google Maps embed on contact section
- Two phone numbers (landline + mobile) plus WhatsApp
- Email address in constants
- Working hours clearly displayed (Mon-Sat 08:00-20:00, Sun 09:00-14:00)
- Newsletter with privacy disclaimer
- Contact form with multiple fields
- HTTPS (via Vercel)
- hreflang alternates for el/en implemented correctly
- Canonical URLs configured

**Gaps:**
- No privacy policy page
- No terms of service page
- No cookie consent banner detected
- Saturday hours in OpeningHoursSpecification say closes: "15:00", but ContactForm says "Mon - Sat: 08:00 - 20:00" -- contradiction
- No physical storefront photos in the contact section itself (gallery section has them but is a separate scroll)

**Weighted E-E-A-T Score: 75.3/100**

| Factor | Score | Weight | Weighted |
|--------|-------|--------|----------|
| Experience | 68 | 20% | 13.6 |
| Expertise | 72 | 25% | 18.0 |
| Authoritativeness | 74 | 25% | 18.5 |
| Trustworthiness | 85 | 30% | 25.5 |
| **Total** | | | **75.6** |

---

## 2. Content Depth & Word Count Analysis

Word counts are estimated from the Greek (el.json) translation file content, counting all visible text rendered per page.

### Homepage (/el)

| Section | Est. Words (EL) | Assessment |
|---------|-----------------|------------|
| Hero | ~25 | OK for hero |
| About | ~120 | Adequate |
| Gallery | ~15 (captions) | Thin but acceptable for gallery |
| Showcase | ~30 | OK for navigation section |
| Products (summary cards) | ~60 | OK for cards |
| Services (summary cards) | ~180 | Good |
| Reviews | ~180 | Good -- real testimonials |
| Contact | ~80 | Adequate |
| Newsletter | ~30 | OK |
| **Total estimated** | **~720** | **ABOVE minimum (500)** |

**Verdict:** PASS. Homepage meets the 500-word minimum for topical coverage. However, the About section could be expanded for more E-E-A-T depth.

### Service Pages (10 pages)

| Page | Priority | Paragraphs | Features | FAQs | Est. Words (EL) | Status |
|------|----------|-----------|----------|------|-----------------|--------|
| Weddings | high | 4 | 4 | 3 | ~650 | BELOW 800 minimum |
| Baptisms | high | 4 | 4 | 3 | ~620 | BELOW 800 minimum |
| Garden Design | high | 4 | 4 | 3 | ~640 | BELOW 800 minimum |
| Maintenance | normal | 2 | 3 | 2 | ~350 | BELOW 800 minimum |
| Irrigation | normal | 2 | 3 | 2 | ~330 | BELOW 800 minimum |
| Pruning | normal | 2 | 3 | 2 | ~320 | BELOW 800 minimum |
| Tall Trees | normal | 2 | 3 | 2 | ~310 | BELOW 800 minimum |
| Rock Gardens | normal | 2 | 3 | 2 | ~310 | BELOW 800 minimum |
| Land Clearing | normal | 2 | 3 | 2 | ~310 | BELOW 800 minimum |
| Pest Control | normal | 2 | 3 | 2 | ~320 | BELOW 800 minimum |

**Critical Finding:** ALL service pages fall below the 800-word minimum for service pages. The "high priority" pages (weddings, baptisms, garden design) come closest at ~620-650 words but still fall short. The "normal priority" pages at ~310-350 words are significantly thin.

**Note:** The earlier description estimated 1200-1500 words per service page. The actual rendered content from the JSON translation strings is substantially less. The page layout (hero, features grid, FAQ accordion, related services, CTA) creates visual density but the actual indexable text content is thin.

### Product Pages (4 individual + 1 hub)

| Page | Priority | Paragraphs | Features | FAQs | Est. Words (EL) | Min. | Status |
|------|----------|-----------|----------|------|-----------------|------|--------|
| Flowers | high | 4 | 4 | 3 | ~580 | 400+ | PASS |
| Soil | normal | 2 | 3 | 2 | ~280 | 300 | BORDERLINE |
| Fertilizers | normal | 2 | 3 | 2 | ~280 | 300 | BORDERLINE |
| Pots | normal | 2 | 3 | 2 | ~270 | 300 | BORDERLINE |
| Hub (/products) | -- | -- | -- | -- | ~200 + catalog | 500 | PASS (with catalog) |

**Finding:** Soil, fertilizers, and pots pages are borderline thin for product pages. The hub page passes because the efood catalog adds substantial product listing content.

### Hub Pages (Services & Products)

| Page | Est. Words | Min. | Status |
|------|-----------|------|--------|
| /services | ~300 (cards + headings) | 500 | THIN |
| /products | ~200 + catalog items | 500 | PASS (catalog counts) |

---

## 3. Thin Content Detection

### Pages flagged as thin:

1. **All 7 "normal priority" service pages** (~310-350 words) -- need at minimum 450+ more words each to reach 800
2. **Services hub page** (/services) -- only card titles and descriptions, no introductory content
3. **Soil, Fertilizers, Pots product pages** -- borderline at ~270-280 words

### Structural thin content issues:

- Service page feature cards have short descriptions (10-15 words each) -- these provide visual structure but minimal indexable content
- FAQ answers are 2-3 sentences each -- adequate for FAQ schema but could be expanded
- Related services sections render other pages' descriptions -- this is navigational, not additive content

---

## 4. Duplicate & Near-Duplicate Content Analysis

### Cross-page duplicate patterns:

**Issue 1: Repetitive area-served boilerplate (HIGH)**
Nearly every service page contains a variation of:
> "Εξυπηρετούμε [service type] σε Ηλιούπολη, Αργυρούπολη, Βύρωνα, Δάφνη, [variations] και σε ολόκληρη τη νότια Αθήνα."

This phrase appears in slightly varied form across all 10 service pages and the flowers product page. While geographic targeting is important for local SEO, the repetition pattern across 11+ pages could trigger near-duplicate flags.

**Recommendation:** Vary the structure. Some pages could lead with the area list, others could embed it in a different context, and others could use a different set of areas as primary.

**Issue 2: CTA sections are identical across all service and product pages**
The CTA block (ctaTitle, ctaSubtitle, call/WhatsApp/contact buttons) is identical text and layout on every single interior page. This is less of an SEO issue since it is navigational chrome, but it does contribute to page similarity scores.

**Issue 3: EL/EN translation is direct translation, not localization**
The English version is a faithful translation of the Greek. For a local Greek business, this is acceptable. However, the English content does not add unique value -- an English searcher finds the same information. This is standard for bilingual local businesses and not a penalization risk, but it means the English pages add no incremental content value.

**Issue 4: Feature card structure repetition**
Every service/product page follows the identical template: Hero -> Content paragraphs -> Feature grid -> FAQ -> Related -> CTA. While consistent UX is good, Google's Helpful Content guidance flags templated pages where the unique content ratio is low relative to the boilerplate ratio.

**Calculated unique-to-template ratio for normal priority service pages:**
- Unique content: ~200 words (2 paragraphs + feature descriptions + FAQ)
- Template/shared content: ~150 words (hero layout, CTA, related services, breadcrumb, headings)
- Ratio: ~57% unique -- borderline acceptable but at risk

---

## 5. Readability Assessment

### Greek content (primary):

- **Sentence length:** Average 15-25 words per sentence -- good range for Greek
- **Paragraph length:** Content paragraphs are 2-4 sentences each -- appropriate
- **Vocabulary level:** Intermediate/professional -- uses industry terminology (κολυμπήθρα, σολέας, φυτοπροστατευτικά σκευάσματα) but explains through context
- **Passive voice:** Moderate use -- Greek service descriptions traditionally use more passive constructions ("αναλαμβάνουμε", "εξυπηρετούμε") which is natural
- **Formatting:** Content sections are plain paragraphs with no subheadings, bullet lists, or visual breaks within the content block -- this hurts scannability

**Readability score (estimated Flesch-Kincaid equivalent for Greek): 55/100 (adequate)**

### English content:
- Clean, professional translation
- No awkward phrasing or grammatical errors detected
- Slightly more formal than typical US English web copy

---

## 6. AI Citation Readiness Score: 72/100

### Strengths for AI citation:

1. **FAQ structured data** on every service and product page -- AI systems directly consume FAQPage schema
2. **Clear entity-attribute-value patterns:** "At ANTHI-FYTA KALOUDIS in Ilioupoli, we [verb] [service]" -- highly citable
3. **Specific factual claims:**
   - "Eagles Award 2023, 2024 & 2025"
   - "4.9 stars, 120 Google reviews"
   - "Kyprion Iroon 4, Ilioupoli"
   - Brand names: Hunter, Rain Bird
   - Plant species: Dionaea, Drosera, Nepenthes
   - Working hours: Mon-Sat 08:00-20:00, Sun 09:00-14:00
4. **Breadcrumb schema** helps AI understand page hierarchy
5. **LocalBusiness schema with Florist type** -- clear entity classification
6. **Area served list** in schema.org -- 20 named areas

### Gaps for AI citation:

1. **No passage-level markup** (no `<article>`, `<section>` with aria-labels on content blocks)
2. **No price ranges mentioned** in service page text (e.g., "wedding decoration packages starting from X euros")
3. **No specific numbers/statistics** beyond reviews (no "served 500+ weddings" or "15 years of experience")
4. **No comparison tables** (e.g., maintenance plan tiers, pot material comparison)
5. **No "last updated" dates** on any content -- freshness signal is missing
6. **No AggregateRating schema** pulling Google reviews into structured data
7. **Content paragraphs lack H3 subheadings** -- AI extraction works better with labeled sections

---

## 7. Keyword Optimization Assessment

### Natural keyword integration: GOOD

Keywords appear naturally within content rather than being stuffed. Examples:
- "στολισμός γάμου" appears 3-4 times across the weddings page (title, hero, content) -- appropriate density
- Geographic modifiers ("Ηλιούπολη", "Νότια Προάστια") are woven into sentences naturally

### Keyword coverage gaps:

| Missing Keyword Cluster (EL) | Search Intent | Suggested Page |
|-------------------------------|---------------|----------------|
| "αποστολή λουλουδιών Ηλιούπολη" | Transactional | Flowers page (partially covered) |
| "τιμές ανθοστολισμού γάμου" | Commercial | Weddings page (no pricing info) |
| "ανθοπωλείο κοντά μου" | Local/navigational | Homepage (implicit, no explicit text) |
| "φυτά γραφείου Αθήνα" | Commercial | Flowers page (barely mentioned) |
| "συνδρομή συντήρησης κήπου" | Commercial | Maintenance page (mentioned but vague) |
| "πόσο κοστίζει κηπουρός" | Informational | Missing -- could be blog content |
| "εποχιακά λουλούδια" | Informational | Flowers page (listed but not expanded) |
| "κήπος χαμηλής συντήρησης" | Informational | Rock gardens + garden design (mentioned) |

### Meta description quality:

All service and product pages have unique, keyword-rich meta descriptions in both languages. Length is appropriate (140-160 chars). Well done.

---

## 8. Content Freshness Signals

### Current state: WEAK

- No publish dates or "last updated" timestamps on any page
- Hardcoded review timestamps ("3 weeks ago", "4 months ago") will become inaccurate over time
- No blog or news section to demonstrate ongoing activity
- Awards listed only up to 2025 -- will need updating
- efood catalog appears static (hardcoded in catalog.ts) -- prices and availability may go stale

### Recommendations:
1. Add a `dateModified` property to JSON-LD schemas
2. Convert review timestamps to actual dates
3. Consider a simple seasonal tips or news section
4. Add schema.org `datePublished` and `dateModified` to service pages

---

## 9. Structured Data Completeness

### Implemented (GOOD):
- `Florist` LocalBusiness schema with full NAP, geo, openingHours, areaServed
- `Service` schema on each service page
- `Product` schema on each product page
- `FAQPage` schema on all interior pages
- `BreadcrumbList` schema on all interior pages
- `OfferCatalog` listing all services and products

### Missing:
- **AggregateRating** schema (the 4.9/5 from 120 reviews is not in structured data)
- **Review** schema for individual testimonials
- **Organization** schema (separate from LocalBusiness, for brand entity)
- **WebSite** schema with `potentialAction` for sitelinks search box
- **ImageObject** schema for gallery images
- **Event** schema for seasonal promotions (if applicable)
- **HowTo** schema for any care guides (potential future content)

---

## 10. Missing Content Opportunities for Local SEO

### High Priority:

1. **Owner/Team bio page** -- "Meet Eleanna and the Kaloudis team." First-hand experience is the strongest E-E-A-T signal for a local business. Include photos, years of experience, specializations.

2. **Portfolio/Gallery with project descriptions** -- Each wedding decoration, garden design, or landscaping project could be a mini case study: client need, solution, outcome. This adds massive E-E-A-T and long-tail keyword coverage.

3. **Privacy Policy + Terms pages** -- Required for GDPR compliance (Greece/EU) and a basic trust signal.

4. **Individual area pages or area-focused content** -- Instead of repeating area lists, create a "Florist in Argyroupoli" or "Garden Services in Glyfada" landing section or page. High-value for local pack results.

### Medium Priority:

5. **Seasonal content / Blog** -- "Best plants for Greek summer balconies", "When to prune olive trees in Attica", "Wedding flower trends 2026". This builds topical authority and expertise signals.

6. **Pricing guide pages** -- Even rough price ranges ("wedding decoration packages from 500 to 2500 euros") serve high-intent commercial queries and build trust.

7. **Google Business Profile integration** -- Link to the GBP listing, embed the GBP reviews widget rather than hardcoded reviews.

8. **Instagram integration** -- Florists are highly visual businesses. Instagram feed embed or link is a major missing signal.

9. **Expand normal-priority service pages** -- Each needs 400-500 more words. Add subsections like "How it works", "What to expect", "Typical timeline", "Materials we use".

### Low Priority:

10. **Multi-location schema** if they serve from multiple points
11. **Video content** on service pages (even short clips of work in progress)
12. **Customer success metrics** -- "X weddings decorated", "Y gardens maintained monthly"

---

## 11. AI-Generated Content Quality Check

### Assessment: LOW RISK

The content does not exhibit typical AI-generation red flags:
- No generic filler phrases ("In today's fast-paced world...")
- Uses specific Greek cultural references (kolymbithra/baptismal font, soleas, lambada)
- Names specific brands and plant species
- References local geography accurately
- Sentence variety is reasonable
- No hallucinated facts detected

**However**, the templated structure across pages (identical layout, similar paragraph structure, same CTA copy) could be perceived as programmatically generated at scale. The content reads as human-written with a template overlay, which is acceptable per Sept 2025 QRG as long as each page provides genuine unique value.

**Risk area:** The 7 "normal priority" service pages with only ~310 words of unique content each are the most vulnerable to being classified as "thin, templated content" under the Helpful Content criteria now integrated into core ranking.

---

## Summary of Action Items

| Priority | Action | Impact | Effort |
|----------|--------|--------|--------|
| Critical | Expand all service pages to 800+ words | High | Medium |
| Critical | Add privacy policy page | High | Low |
| High | Add owner/team bio with photos | High | Low |
| High | Fix Saturday hours contradiction (schema says 15:00, UI says 20:00) | Medium | Trivial |
| High | Add AggregateRating schema for Google reviews | High | Low |
| High | Expand soil/fertilizers/pots pages to 400+ words | Medium | Low |
| Medium | Add portfolio/case study content | High | High |
| Medium | Add Instagram to sameAs schema and website | Medium | Low |
| Medium | Convert hardcoded review timestamps to real dates | Low | Low |
| Medium | Add dateModified to JSON-LD schemas | Medium | Low |
| Medium | Add H3 subheadings within content paragraphs | Medium | Low |
| Low | Create area-specific landing content | High | High |
| Low | Add blog/seasonal content section | High | High |
| Low | Add WebSite schema with SearchAction | Low | Low |

---

## Files Analyzed

- `messages/el.json` -- Greek translation content (453 lines)
- `messages/en.json` -- English translation content (453 lines)
- `lib/general/constants.ts` -- Business contact data
- `lib/general/seo.ts` -- SEO metadata and keywords
- `components/json-ld.tsx` -- Structured data schemas
- `app/[locale]/layout.tsx` -- Root layout with global metadata
- `app/[locale]/page.tsx` -- Homepage composition
- `app/[locale]/services/page.tsx` -- Services hub page
- `app/[locale]/services/[slug]/page.tsx` -- Service detail template
- `app/[locale]/products/page.tsx` -- Products hub with efood catalog
- `app/[locale]/products/[slug]/page.tsx` -- Product detail template
- `components/about-section.tsx` -- About section with E-E-A-T claims
- `components/reviews-section.tsx` -- Hardcoded Google reviews
