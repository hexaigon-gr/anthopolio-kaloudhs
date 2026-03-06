import { setRequestLocale } from "next-intl/server";

import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { GallerySection } from "@/components/gallery-section";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { NewsletterSection } from "@/components/newsletter-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ServicesSection } from "@/components/services-section";
import { ShowcaseSection } from "@/components/showcase-section";
import { SiteFooter } from "@/components/site-footer";
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
        <GallerySection />
        <ShowcaseSection />
        <ServicesSection />
        <ReviewsSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Home;
