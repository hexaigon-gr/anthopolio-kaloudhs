import { setRequestLocale } from "next-intl/server";

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
      </main>
      <SiteFooter />
    </div>
  );
};

export default Home;
