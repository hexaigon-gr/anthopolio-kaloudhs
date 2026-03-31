# Homepage Restructure Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure homepage sections to improve conversion — full-screen hero, social proof early, dedicated wedding banner, remove Showcase, add Wolt products section.

**Architecture:** Reorder existing Server Components in `app/[locale]/page.tsx`, create one new component (`WeddingBanner`), modify hero height, reorder gallery images, wire in existing `<StoreProducts>`. All i18n via `next-intl`.

**Tech Stack:** Next.js App Router, React Server Components, next-intl, Tailwind CSS 4, shadcn/ui

---

### Task 1: Hero Section — Full Viewport Height

**Files:**
- Modify: `components/hero-section.tsx:12` (change `min-h-[85vh]` to `min-h-svh`)

**Step 1: Change hero height**

In `components/hero-section.tsx`, line 12, change:
```tsx
<section className="relative overflow-hidden min-h-[85vh] flex items-center">
```
to:
```tsx
<section className="relative overflow-hidden min-h-svh flex items-center">
```

Using `min-h-svh` (small viewport height) ensures full viewport coverage on all devices including mobile browsers where `100vh` includes the address bar.

**Step 2: Screenshot and verify**

Run: `node screenshot.mjs http://localhost:3000/en hero-fullscreen`
Expected: Hero fills entire viewport, no white/about section visible on first load.

Also check mobile:
```js
// Quick Puppeteer check at 390x844 (iPhone 14)
```

**Step 3: Commit**

```bash
git add components/hero-section.tsx
git commit -m "feat: make hero section full viewport height on first load"
```

---

### Task 2: Add Wedding Banner Translations

**Files:**
- Modify: `messages/en.json` — add `WeddingBanner` key
- Modify: `messages/el.json` — add `WeddingBanner` key

**Step 1: Add English translations**

Add after the `"Showcase"` block in `messages/en.json`:

```json
"WeddingBanner": {
  "title": "Your Dream Wedding Starts Here",
  "description": "We create stunning floral arrangements for your church ceremony and reception. From the bridal bouquet to the last centerpiece — every detail designed with love.",
  "ctaPlan": "Plan Your Wedding",
  "ctaCall": "Call Us"
},
```

**Step 2: Add Greek translations**

Add same position in `messages/el.json`:

```json
"WeddingBanner": {
  "title": "Ο Γάμος των Ονείρων σας Ξεκινά Εδώ",
  "description": "Δημιουργούμε εντυπωσιακές ανθοσυνθέσεις για την εκκλησία και τη δεξίωσή σας. Από τη νυφική ανθοδέσμη μέχρι την τελευταία σύνθεση — κάθε λεπτομέρεια σχεδιασμένη με αγάπη.",
  "ctaPlan": "Σχεδιάστε τον Γάμο σας",
  "ctaCall": "Καλέστε μας"
},
```

**Step 3: Commit**

```bash
git add messages/en.json messages/el.json
git commit -m "feat: add wedding banner i18n translations (en + el)"
```

---

### Task 3: Create Wedding Banner Component

**Files:**
- Create: `components/wedding-banner.tsx`

**Step 1: Create the component**

```tsx
import { Heart, Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/general/constants";
import { Link } from "@/lib/i18n/navigation";

export async function WeddingBanner() {
  const t = await getTranslations("WeddingBanner");

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background image */}
      <Image
        src="/images/services/wedding-cover.jpg"
        alt="Wedding floral decoration"
        fill
        className="object-cover"
        sizes="100vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20">
            <Heart className="size-4" />
            Weddings
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t("title")}
          </h2>

          <p className="text-lg text-white/80 leading-relaxed max-w-xl">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild size="lg" className="gap-2 text-base px-8">
              <Link href="/services/weddings">
                <Heart className="size-5" />
                {t("ctaPlan")}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 text-base px-8 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href={BUSINESS.phoneHref}>
                <Phone className="size-5" />
                {t("ctaCall")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Screenshot and verify**

Temporarily add to page.tsx to preview, then screenshot.

**Step 3: Commit**

```bash
git add components/wedding-banner.tsx
git commit -m "feat: create wedding banner component with CTA"
```

---

### Task 4: Create Products Section Wrapper

**Files:**
- Create: `components/products-section.tsx`

This wraps the existing `<StoreProducts>` in a proper homepage section with heading, Suspense boundary, and the `#products` anchor.

**Step 1: Create the section wrapper**

```tsx
import { Suspense } from "react";

import { getTranslations } from "next-intl/server";

import {
  StoreProducts,
  StoreProductsSkeleton,
} from "@/components/wolt-store-products";

const STORE_SLUG = process.env.WOLT_STORE_SLUG ?? "kaloudis-garden";

export async function ProductsSection() {
  const t = await getTranslations("ProductsSection");

  return (
    <section id="products" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <Suspense fallback={<StoreProductsSkeleton />}>
          <StoreProducts storeSlug={STORE_SLUG} />
        </Suspense>
      </div>
    </section>
  );
}
```

**Step 2: Add translations to `messages/en.json`**

```json
"ProductsSection": {
  "title": "Order Online",
  "subtitle": "Products available for delivery throughout Attica via Wolt, efood & Box"
},
```

**Step 3: Add translations to `messages/el.json`**

```json
"ProductsSection": {
  "title": "Παραγγελία Online",
  "subtitle": "Προϊόντα διαθέσιμα για παράδοση σε όλη την Αττική μέσω Wolt, efood & Box"
},
```

**Step 4: Add `WOLT_STORE_SLUG` to `.env`**

```
WOLT_STORE_SLUG=kaloudis-garden
```

**Step 5: Commit**

```bash
git add components/products-section.tsx messages/en.json messages/el.json
git commit -m "feat: create products section wrapper with Suspense + Wolt"
```

---

### Task 5: Reorder Gallery Images

**Files:**
- Modify: `components/gallery-grid.tsx:12-27` — reorder the `GALLERY_IMAGES` array

**Step 1: Reorder images — events/work first, shop last**

Replace the `GALLERY_IMAGES` array with:

```tsx
const GALLERY_IMAGES = [
  { src: "/images/services/wedding-cover.jpg", alt: "Στολισμός γάμου στην εκκλησία", aspect: "portrait" },
  { src: "/images/services/baptism-candle.jpg", alt: "Ανθοστολισμός λαμπάδας βάπτισης", aspect: "portrait" },
  { src: "/images/6.jpg", alt: "Ποικιλία ανθοδεσμών σε ροζ και κόκκινα", aspect: "portrait" },
  { src: "/images/services/baptism-font.jpg", alt: "Στολισμός κολυμπήθρας βάπτισης", aspect: "portrait" },
  { src: "/images/3.jpg", alt: "Μπλε λουλούδια σε δώρο συσκευασία", aspect: "portrait" },
  { src: "/images/shop-6.jpg", alt: "Ανθοσυνθέσεις και δώρα Αγίου Βαλεντίνου", aspect: "portrait" },
  { src: "/images/1.jpg", alt: "Εξωτερικός χώρος με πολύχρωμα λουλούδια", aspect: "portrait" },
  { src: "/images/shop-3.jpg", alt: "Πολύχρωμα εποχιακά λουλούδια και φυτά", aspect: "portrait" },
  { src: "/images/shop-4.jpg", alt: "Ταμπέλα καταστήματος ΑΝΘΗ-ΦΥΤΑ KALOUDIS", aspect: "landscape" },
  { src: "/images/shop-5.jpg", alt: "Νυχτερινή βιτρίνα καταστήματος", aspect: "landscape" },
  { src: "/images/shop-7.jpg", alt: "Εσωτερικό κατάστημα με φυτά και διακοσμητικά", aspect: "portrait" },
  { src: "/images/shop-1.jpg", alt: "Αλεξανδρινά φυτά - Χριστουγεννιάτικη συλλογή", aspect: "portrait" },
  { src: "/images/shop-2.jpg", alt: "Εξωτερικός χώρος με φυτά και αλεξανδρινά", aspect: "portrait" },
  { src: "/images/shop-8.jpg", alt: "Χριστουγεννιάτικη διακόσμηση με Αλεξανδρινά", aspect: "portrait" },
] as const;
```

**Step 2: Screenshot and verify**

Run: `node screenshot.mjs http://localhost:3000/en gallery-reordered`
Expected: First visible images are wedding arch, baptism candle, bouquets.

**Step 3: Commit**

```bash
git add components/gallery-grid.tsx
git commit -m "feat: reorder gallery — event photos first, shop photos last"
```

---

### Task 6: Restructure Homepage — Wire Everything Together

**Files:**
- Modify: `app/[locale]/page.tsx` — new section order, remove ShowcaseSection

**Step 1: Update page.tsx**

Replace entire content of `app/[locale]/page.tsx`:

```tsx
import { setRequestLocale } from "next-intl/server";

import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { GallerySection } from "@/components/gallery-section";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { NewsletterSection } from "@/components/newsletter-section";
import { ProductsSection } from "@/components/products-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { WeddingBanner } from "@/components/wedding-banner";
import { BasePageProps } from "@/types/page-props";

const Home = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ReviewsSection />
        <WeddingBanner />
        <ServicesSection />
        <GallerySection />
        <ProductsSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Home;
```

Key changes:
- Removed `ShowcaseSection` import and usage
- Added `WeddingBanner` after Reviews
- Added `ProductsSection` after Gallery
- Reviews moved from position 6 to position 3

**Step 2: Verify build**

Run: `pnpm tsc --noEmit`
Expected: Clean, no errors.

**Step 3: Full page screenshot**

Run: `node screenshot.mjs http://localhost:3000/en homepage-restructured`

Verify:
1. Hero fills full viewport
2. About section follows
3. Reviews appear next (social proof early)
4. Wedding banner with CTA
5. Services grid
6. Gallery with event photos first
7. Products section with Wolt data
8. Contact + Newsletter + Footer
9. No "What We Offer" section anywhere

**Step 4: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat: restructure homepage — new section order, wedding banner, products, remove showcase"
```

---

### Task 7: Cleanup — Remove Dead Code

**Files:**
- Delete: `components/showcase-section.tsx`
- Modify: `messages/en.json` — remove `Showcase` key
- Modify: `messages/el.json` — remove `Showcase` key

**Step 1: Delete ShowcaseSection component**

```bash
rm components/showcase-section.tsx
```

**Step 2: Remove Showcase translations from both locale files**

Remove the entire `"Showcase": { ... }` block from `messages/en.json` and `messages/el.json`.

**Step 3: Verify no references remain**

```bash
grep -r "Showcase" --include="*.tsx" --include="*.ts" --include="*.json" .
```
Expected: No results (or only this plan file).

**Step 4: Verify build**

Run: `pnpm tsc --noEmit && pnpm lint`
Expected: Clean.

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove ShowcaseSection and unused Showcase translations"
```

---

### Task 8: Final Verification — Full Visual QA

**Step 1: Desktop screenshots** (sections)

Screenshot each section individually at 1280x900 and verify:
- Hero: full viewport, no white bleeding
- About: unchanged
- Reviews: appears after about
- Wedding banner: compelling image, readable text, working CTAs
- Services: 9 cards, unchanged
- Gallery: event photos first
- Products: Wolt data renders with categories
- Contact: unchanged
- Newsletter + Footer: unchanged

**Step 2: Mobile screenshots** (390x844)

Verify responsive behavior for:
- Hero: full viewport on mobile
- Wedding banner: stacked CTAs
- Products: single column grid

**Step 3: Both locales**

Quick check of `/el` to ensure Greek translations render correctly for new sections.
