import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { GallerySection } from "@/components/gallery-section";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { ProductsSection } from "@/components/products-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { WeddingBanner } from "@/components/wedding-banner";
import { BasePageProps } from "@/types/page-props";

const SectionFallback = () => (
  <div className="py-24 md:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="h-8 w-60 bg-secondary/40 rounded mx-auto animate-pulse" />
    </div>
  </div>
);

const Home = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        {/* Above the fold — rendered immediately */}
        <HeroSection />

        {/* Below the fold — streamed via Suspense */}
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ReviewsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <WeddingBanner />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <GallerySection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProductsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Home;
