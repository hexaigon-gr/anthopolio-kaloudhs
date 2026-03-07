# SEO Service Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create 10 dedicated service pages with full SEO (metadata, JSON-LD, FAQ schema, breadcrumbs) targeting weddings, baptisms, garden design, and 20 nearby areas in south Athens.

**Architecture:** Dynamic `[slug]` route under `/[locale]/services/` with static generation. Service data lives in a single config file. Each page gets unique metadata, 3 JSON-LD schemas (Service, FAQPage, BreadcrumbList), and rich i18n content.

**Tech Stack:** Next.js 16 App Router, next-intl, Tailwind 4, shadcn/ui, Lucide icons, TypeScript

---

## Task 1: Create service data config

**Files:**
- Create: `lib/general/services.ts`

**Step 1: Create the services config file**

This file defines all 10 services with their slugs, icons, categories, related services, image paths, and SEO priority. It also exports the target areas list.

```typescript
import {
  Bug,
  Church,
  Droplet,
  Gem,
  Heart,
  PenTool,
  Scissors,
  Trash2,
  TreePine,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ServiceDefinition {
  slug: string;
  translationKey: string;
  icon: LucideIcon;
  category: "events" | "garden" | "special";
  image: string;
  relatedSlugs: string[];
  priority: "high" | "normal";
}

export const SERVICES: ServiceDefinition[] = [
  {
    slug: "weddings",
    translationKey: "weddings",
    icon: Heart,
    category: "events",
    image: "/images/services/baptisms.jpg",
    relatedSlugs: ["baptisms", "garden-design"],
    priority: "high",
  },
  {
    slug: "baptisms",
    translationKey: "baptisms",
    icon: Church,
    category: "events",
    image: "/images/services/baptisms.jpg",
    relatedSlugs: ["weddings", "garden-design"],
    priority: "high",
  },
  {
    slug: "garden-design",
    translationKey: "gardenDesign",
    icon: PenTool,
    category: "garden",
    image: "/images/services/garden-design.jpg",
    relatedSlugs: ["rock-gardens", "maintenance"],
    priority: "high",
  },
  {
    slug: "maintenance",
    translationKey: "maintenance",
    icon: Wrench,
    category: "garden",
    image: "/images/services/maintenance.jpg",
    relatedSlugs: ["irrigation", "pruning"],
    priority: "normal",
  },
  {
    slug: "irrigation",
    translationKey: "irrigation",
    icon: Droplet,
    category: "garden",
    image: "/images/services/irrigation.jpg",
    relatedSlugs: ["maintenance", "garden-design"],
    priority: "normal",
  },
  {
    slug: "pruning",
    translationKey: "pruning",
    icon: Scissors,
    category: "garden",
    image: "/images/services/pruning.jpg",
    relatedSlugs: ["tall-trees", "maintenance"],
    priority: "normal",
  },
  {
    slug: "tall-trees",
    translationKey: "tallTrees",
    icon: TreePine,
    category: "garden",
    image: "/images/services/tall-trees.jpg",
    relatedSlugs: ["pruning", "land-clearing"],
    priority: "normal",
  },
  {
    slug: "rock-gardens",
    translationKey: "rockGardens",
    icon: Gem,
    category: "garden",
    image: "/images/services/rock-gardens.jpg",
    relatedSlugs: ["garden-design", "maintenance"],
    priority: "normal",
  },
  {
    slug: "land-clearing",
    translationKey: "landClearing",
    icon: Trash2,
    category: "special",
    image: "/images/services/land-clearing.jpg",
    relatedSlugs: ["tall-trees", "garden-design"],
    priority: "normal",
  },
  {
    slug: "pest-control",
    translationKey: "pestControl",
    icon: Bug,
    category: "special",
    image: "/images/services/pest-control.jpg",
    relatedSlugs: ["maintenance", "pruning"],
    priority: "normal",
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export const getServiceBySlug = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);

export const TARGET_AREAS = {
  el: [
    "Ηλιούπολη", "Αργυρούπολη", "Δάφνη", "Βύρωνας", "Άλιμος",
    "Υμηττός", "Άγιος Δημήτριος", "Καισαριανή", "Ελληνικό",
    "Γλυφάδα", "Νέα Σμύρνη", "Παλαιό Φάληρο", "Καλλιθέα",
    "Ζωγράφου", "Παγκράτι", "Βούλα", "Βουλιαγμένη", "Βάρη",
    "Παπάγου", "Χολαργός",
  ],
  en: [
    "Ilioupoli", "Argyroupoli", "Dafni", "Vyronas", "Alimos",
    "Ymittos", "Agios Dimitrios", "Kaisariani", "Elliniko",
    "Glyfada", "Nea Smyrni", "Palaio Faliro", "Kallithea",
    "Zografou", "Pagkrati", "Voula", "Vouliagmeni", "Vari",
    "Papagou", "Holargos",
  ],
} as const;
```

**Step 2: Verify TypeScript compiles**

Run: `pnpm tsc --noEmit`
Expected: No errors related to services.ts

**Step 3: Commit**

```bash
git add lib/general/services.ts
git commit -m "feat: add service definitions config with target areas"
```

---

## Task 2: Add translation content for all service pages

**Files:**
- Modify: `messages/el.json`
- Modify: `messages/en.json`

**Step 1: Add `ServicePages` namespace to el.json**

Add after the existing `Services` section. Each service gets: `title`, `metaTitle`, `metaDescription`, `heroDescription`, `content` (array of paragraphs), `features` (array of 3-4 items with `title` and `description`), and `faqs` (array of 2-4 items with `question` and `answer`).

HIGH priority services (weddings, baptisms, gardenDesign) get 3-4 content paragraphs and 3-4 FAQs.
Normal priority services get 2 content paragraphs and 2 FAQs.

Key content guidelines:
- Naturally mention target areas (Ηλιούπολη, Αργυρούπολη, Δάφνη, etc.) within paragraphs
- Include relevant long-tail keywords (e.g., "στολισμός γάμου Ηλιούπολη", "στολισμός εκκλησίας")
- Write genuine, helpful content — not keyword-stuffed
- Wedding/baptism content should emphasize: fresh flowers, church decoration, reception decoration, bouquets, table arrangements, custom designs

Also add shared keys:
```json
"ServicePages": {
  "breadcrumbHome": "Αρχική",
  "breadcrumbServices": "Υπηρεσίες",
  "areasTitle": "Περιοχές που Εξυπηρετούμε",
  "areasSubtitle": "Καλύπτουμε την Ηλιούπολη και τις γύρω περιοχές Νοτίων Προαστίων Αθηνών",
  "faqTitle": "Συχνές Ερωτήσεις",
  "relatedTitle": "Σχετικές Υπηρεσίες",
  "ctaTitle": "Ενδιαφέρεστε για αυτή την υπηρεσία;",
  "ctaSubtitle": "Επικοινωνήστε μαζί μας για δωρεάν εκτίμηση και προσφορά",
  "ctaCall": "Καλέστε μας",
  "ctaWhatsapp": "WhatsApp",
  "ctaContact": "Φόρμα Επικοινωνίας",
  "weddings": { ... },
  "baptisms": { ... },
  "gardenDesign": { ... },
  "maintenance": { ... },
  "irrigation": { ... },
  "pruning": { ... },
  "tallTrees": { ... },
  "rockGardens": { ... },
  "landClearing": { ... },
  "pestControl": { ... }
}
```

**Step 2: Add equivalent `ServicePages` namespace to en.json**

Same structure with English translations. Include English area names naturally (Ilioupoli, south Athens, etc.).

**Step 3: Verify translations load**

Run: `pnpm tsc --noEmit`
Expected: No errors

**Step 4: Commit**

```bash
git add messages/el.json messages/en.json
git commit -m "feat: add ServicePages translations for all 10 service pages"
```

---

## Task 3: Expand SEO config with service-specific metadata

**Files:**
- Modify: `lib/general/seo.ts`

**Step 1: Add service SEO configs and expanded keywords**

Add a `SERVICE_SEO` record keyed by slug with `titleEl`, `titleEn`, `descriptionEl`, `descriptionEn`, `keywordsEl`, `keywordsEn` for each service.

Example for weddings:
```typescript
export const SERVICE_SEO: Record<string, {
  titleEl: string;
  titleEn: string;
  descriptionEl: string;
  descriptionEn: string;
  keywordsEl: string[];
  keywordsEn: string[];
}> = {
  weddings: {
    titleEl: "Στολισμός Γάμου Ηλιούπολη",
    titleEn: "Wedding Decoration Ilioupoli",
    descriptionEl: "Στολισμός γάμου στην Ηλιούπολη και Νότια Προάστια. Ανθοστολισμός εκκλησίας, νυφική ανθοδέσμη, στολισμός δεξίωσης. ΑΝΘΗ-ΦΥΤΑ KALOUDIS.",
    descriptionEn: "Wedding decoration in Ilioupoli and South Athens suburbs. Church floral arrangements, bridal bouquets, reception decoration. ANTHI-FYTA KALOUDIS.",
    keywordsEl: ["στολισμός γάμου Ηλιούπολη", "ανθοστολισμός εκκλησίας", "νυφική ανθοδέσμη", "στολισμός δεξίωσης", "γάμος Νότια Προάστια"],
    keywordsEn: ["wedding decoration Ilioupoli", "church floral arrangement", "bridal bouquet Athens", "wedding flowers south Athens"],
  },
  // ... all 10 services
};
```

Also expand the main `SEO.keywords` array with more location-specific terms.

**Step 2: Verify**

Run: `pnpm tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add lib/general/seo.ts
git commit -m "feat: add per-service SEO metadata configs"
```

---

## Task 4: Add JSON-LD schema generators

**Files:**
- Modify: `components/json-ld.tsx`

**Step 1: Add Service, FAQPage, and BreadcrumbList schema components**

Keep the existing `JsonLd` component. Add new exported components:

```typescript
// ServiceJsonLd - for individual service pages
export const ServiceJsonLd = ({ service, locale }: {
  service: { slug: string; translationKey: string };
  locale: string;
}) => {
  // Build Service schema with areaServed from TARGET_AREAS
  // Include provider (the business), serviceType, description
};

// FAQJsonLd - for FAQ sections
export const FAQJsonLd = ({ faqs }: {
  faqs: { question: string; answer: string }[];
}) => {
  // Build FAQPage schema
};

// BreadcrumbJsonLd - for breadcrumb navigation
export const BreadcrumbJsonLd = ({ items }: {
  items: { name: string; url: string }[];
}) => {
  // Build BreadcrumbList schema
};
```

Each renders a `<script type="application/ld+json">` tag.

**Step 2: Verify**

Run: `pnpm tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add components/json-ld.tsx
git commit -m "feat: add Service, FAQ, and Breadcrumb JSON-LD schema components"
```

---

## Task 5: Create the dynamic service page

**Files:**
- Create: `app/[locale]/services/[slug]/page.tsx`

**Step 1: Create the service page with generateStaticParams, generateMetadata, and full layout**

This is the core page. It must:

1. Export `generateStaticParams()` returning all slug x locale combinations
2. Export `generateMetadata()` using `SERVICE_SEO` for per-page metadata with alternates
3. Render the full page layout:
   - Navbar
   - BreadcrumbJsonLd + ServiceJsonLd + FAQJsonLd in head
   - Breadcrumb navigation (visual)
   - Hero section with service title, description, CTA buttons
   - Rich content section (paragraphs from translations)
   - Features/benefits grid (3-4 cards with icons)
   - Areas served grid (20 areas)
   - FAQ accordion
   - Related services cards (linking to other service pages)
   - CTA section (phone, WhatsApp, contact link)
   - SiteFooter

Key patterns to follow:
- `const { locale, slug } = await params;` (Next.js 16)
- `setRequestLocale(locale);`
- Use `getTranslations("ServicePages")` for all content
- Use `notFound()` if slug is invalid
- Use `Link` from `@/lib/i18n/navigation` for internal links
- Use shadcn `Card`, `Button`, `Accordion` components
- Use Lucide icons for features

Page props type:
```typescript
interface ServicePageProps {
  params: Promise<{ locale: string; slug: string }>;
}
```

For the Accordion component, install it first:
```bash
npx shadcn@latest add accordion
```

**Step 2: Verify the page builds**

Run: `pnpm build`
Expected: All 20 service page variants (10 slugs x 2 locales) generated

**Step 3: Commit**

```bash
git add app/[locale]/services/[slug]/page.tsx
git commit -m "feat: add dynamic service pages with full SEO"
```

---

## Task 6: Update sitemap with service pages

**Files:**
- Modify: `app/sitemap.ts`

**Step 1: Add all 10 service slugs to the sitemap**

Import `SERVICE_SLUGS` from services config. Add service pages with:
- High priority services (weddings, baptisms, garden-design): priority 0.9
- Normal priority services: priority 0.7
- All with language alternates

```typescript
import { SERVICES } from "@/lib/general/services";

const sitemap = (): MetadataRoute.Sitemap => {
  const staticPages = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.8 },
  ];

  const servicePages = SERVICES.map((s) => ({
    path: `/services/${s.slug}`,
    priority: s.priority === "high" ? 0.9 : 0.7,
  }));

  const allPages = [...staticPages, ...servicePages];

  return allPages.flatMap(({ path, priority }) =>
    SUPPORTED_LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          SUPPORTED_LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
        ),
      },
    }))
  );
};
```

**Step 2: Verify**

Run: `pnpm build`
Expected: sitemap.xml includes all 24 URLs (2 static + 10 services) x 2 locales

**Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: add all service pages to sitemap with priorities"
```

---

## Task 7: Update landing page service cards to link to dedicated pages

**Files:**
- Modify: `components/services-section.tsx`

**Step 1: Make service cards clickable links to their dedicated pages**

Import `Link` from `@/lib/i18n/navigation` and wrap each service card in a Link to `/services/${slug}`.

Add the slug to each service in the `SERVICES` array (map `translationKey` to `slug` using the services config, or add slugs directly).

Reorder: weddings and baptisms appear first in the grid.

Add a "learn more" visual cue on hover (e.g., arrow icon or text).

**Step 2: Verify visually**

Run dev server and check that service cards link correctly.

**Step 3: Commit**

```bash
git add components/services-section.tsx
git commit -m "feat: link landing page service cards to dedicated pages"
```

---

## Task 8: Update services index page to link to individual pages

**Files:**
- Modify: `app/[locale]/services/page.tsx`

**Step 1: Make service cards on the services index page link to their dedicated pages**

Same pattern as Task 7 — wrap cards in `Link` components pointing to `/services/${slug}`.

Also update the static metadata to be dynamic using `generateMetadata` with locale-aware titles.

**Step 2: Verify**

Run dev server, navigate to `/services`, click cards.

**Step 3: Commit**

```bash
git add app/[locale]/services/page.tsx
git commit -m "feat: link services index cards to individual service pages"
```

---

## Task 9: Expand JSON-LD on homepage with all services and areas

**Files:**
- Modify: `components/json-ld.tsx`

**Step 1: Expand the existing localBusinessSchema**

- Add `areaServed` with all 20 areas as `City` types
- Add all 10 services to `hasOfferCatalog` (currently only 5)
- Add Sunday opening hours (09:00-14:00) to match translations
- Add `aggregateRating` placeholder structure (for future Google reviews integration)

**Step 2: Verify**

Run: `pnpm build`
Test structured data at https://search.google.com/test/rich-results after deployment.

**Step 3: Commit**

```bash
git add components/json-ld.tsx
git commit -m "feat: expand homepage JSON-LD with all services and areas served"
```

---

## Task 10: Update SEO keywords on homepage

**Files:**
- Modify: `lib/general/seo.ts`

**Step 1: Expand homepage keywords**

Add location-specific keyword combinations:
- "ανθοπωλείο Αργυρούπολη", "κηποτεχνικές Δάφνη", "στολισμός γάμου Νότια Προάστια"
- "wedding flowers Ilioupoli", "baptism decoration Athens"
- "garden design south Athens"

Keep total under 20 keywords (Google ignores meta keywords but they help with content strategy).

**Step 2: Commit**

```bash
git add lib/general/seo.ts
git commit -m "feat: expand homepage keywords with location variants"
```

---

## Task 11: Final build verification

**Step 1: Run full build**

```bash
pnpm build
```

Expected: All pages generate successfully, no errors.

**Step 2: Run lint**

```bash
pnpm lint
```

Expected: No errors.

**Step 3: Run TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: No errors.

**Step 4: Visual verification**

Start dev server and verify:
- [ ] Homepage service cards link to `/services/weddings`, etc.
- [ ] `/services` index page cards link to individual pages
- [ ] `/services/weddings` loads with full content, breadcrumb, FAQ, areas
- [ ] `/services/baptisms` loads correctly
- [ ] `/services/garden-design` loads correctly
- [ ] View page source shows correct `<title>`, `<meta description>`, JSON-LD scripts
- [ ] Language switcher works on service pages (el/en)
- [ ] All 10 service pages load without errors

**Step 5: Commit all remaining changes**

```bash
git add .
git commit -m "feat: complete SEO service pages implementation"
```
