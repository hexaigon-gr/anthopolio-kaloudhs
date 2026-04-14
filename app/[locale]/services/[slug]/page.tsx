import {
  CheckCircle,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  BreadcrumbJsonLd,
  FAQJsonLd,
  ServiceJsonLd,
} from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS } from "@/lib/general/constants";
import { SEO, SERVICE_SEO, SITE_URL } from "@/lib/general/seo";
import {
  getServiceBySlug,
  SERVICE_SLUGS,
  TARGET_AREAS,
} from "@/lib/general/services";
import { cn } from "@/lib/general/utils";
import { Link } from "@/lib/i18n/navigation";
import { SUPPORTED_LOCALES } from "@/lib/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const FEATURE_ICONS = [CheckCircle, Star, Shield, Sparkles] as const;

export const generateStaticParams = () =>
  SUPPORTED_LOCALES.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug }))
  );

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const seo = SERVICE_SEO[slug];
  if (!seo) return {};

  const title = locale === "el" ? seo.titleEl : seo.titleEn;
  const description =
    locale === "el" ? seo.descriptionEl : seo.descriptionEn;
  const url = `${SITE_URL}/${locale}/services/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: {
        el: `/el/services/${slug}`,
        en: `/en/services/${slug}`,
        "x-default": `/el/services/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SEO.siteName,
      type: "website",
      images: [
        {
          url: `${SITE_URL}${service.image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  setRequestLocale(locale);

  const t = await getTranslations("ServicePages");

  const key = service.translationKey;
  const ServiceIcon = service.icon;
  const serviceTitle = t(`${key}.title`);
  const serviceUrl = `${SITE_URL}/${locale}/services/${slug}`;
  const areas = TARGET_AREAS[locale as "el" | "en"];

  // Content paragraphs: high priority = 4, normal = 2
  const paragraphCount = service.priority === "high" ? 4 : 2;
  const contentKeys = Array.from(
    { length: paragraphCount },
    (_, i) => `content${i + 1}`
  );

  // Features: high priority = 4, normal = 3
  const featureCount = service.priority === "high" ? 4 : 3;
  const features = Array.from({ length: featureCount }, (_, i) => ({
    title: t(`${key}.feature${i + 1}Title`),
    description: t(`${key}.feature${i + 1}Desc`),
    Icon: FEATURE_ICONS[i % FEATURE_ICONS.length],
  }));

  // FAQ: high priority = 3, normal = 2
  const faqCount = service.priority === "high" ? 3 : 2;
  const faqs = Array.from({ length: faqCount }, (_, i) => ({
    question: t(`${key}.faq${i + 1}Question`),
    answer: t(`${key}.faq${i + 1}Answer`),
  }));

  // Related services
  const relatedServices = service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter(
      (s): s is NonNullable<ReturnType<typeof getServiceBySlug>> =>
        s !== undefined
    );

  // SEO data
  const seo = SERVICE_SEO[slug];
  const seoDescription =
    locale === "el" ? seo?.descriptionEl : seo?.descriptionEn;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* JSON-LD structured data */}
        <>
          <BreadcrumbJsonLd
            items={[
              {
                name: t("breadcrumbHome"),
                url: `${SITE_URL}/${locale}`,
              },
              {
                name: t("breadcrumbServices"),
                url: `${SITE_URL}/${locale}/services`,
              },
              {
                name: serviceTitle,
                url: serviceUrl,
              },
            ]}
          />
          <ServiceJsonLd
            name={serviceTitle}
            description={seoDescription ?? t(`${key}.heroDescription`)}
            url={serviceUrl}
            image={`${SITE_URL}${service.image}`}
            areaServed={[...areas]}
          />
          <FAQJsonLd faqs={faqs} />
        </>

        {/* Breadcrumb navigation */}
        <nav className="bg-secondary/30 py-3 pt-[calc(theme(spacing.16)+0.75rem)]">
          <div className="container mx-auto px-4 lg:px-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-300 hover:text-primary"
                >
                  {t("breadcrumbHome")}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors duration-300 hover:text-primary"
                >
                  {t("breadcrumbServices")}
                </Link>
              </li>
              <li>/</li>
              <li className="font-medium text-foreground">{serviceTitle}</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <Image
            src={service.image}
            alt={serviceTitle}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <ServiceIcon className="size-10 text-white" />
                </div>
              </div>
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                {serviceTitle}
              </h1>
              <p className="mb-10 text-lg text-white/80 leading-relaxed">
                {t(`${key}.heroDescription`)}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href={BUSINESS.phoneHref}>
                    <Phone className="mr-2 size-5" />
                    {t("ctaCall")}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-green-600 bg-green-600 text-white hover:bg-green-700 hover:text-white"
                >
                  <a
                    href={BUSINESS.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 size-5" />
                    {t("ctaWhatsapp")}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white/50 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                  <Link href="/#contact">{t("ctaContact")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Rich Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl space-y-6">
              {contentKeys.map((contentKey) => (
                <p
                  key={contentKey}
                  className="text-muted-foreground leading-relaxed"
                >
                  {t(`${key}.${contentKey}`)}
                </p>
              ))}
              <p className="text-muted-foreground leading-relaxed">
                {t.rich("contentCTA", {
                  services: (chunks) => (
                    <Link
                      href="/services"
                      className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors"
                    >
                      {chunks}
                    </Link>
                  ),
                  flowers: (chunks) => (
                    <Link
                      href="/products/flowers"
                      className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div
              className={cn(
                "mx-auto grid max-w-6xl gap-6 sm:grid-cols-2",
                featureCount === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
              )}
            >
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="border-primary/10 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                      <feature.Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
                {t("faqTitle")}
              </h2>
              <Accordion type="single" collapsible>
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
                {t("relatedTitle")}
              </h2>
              <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedServices.map((related) => {
                  const RelatedIcon = related.icon;
                  const relatedKey = related.translationKey;

                  return (
                    <Link
                      key={related.slug}
                      href={`/services/${related.slug}`}
                      className="group"
                    >
                      <Card className="h-full border-primary/10 transition-all duration-300 hover:border-primary/30 hover:shadow-lg group-hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                            <RelatedIcon className="size-6 text-primary" />
                          </div>
                          <h3 className="mb-2 text-lg font-semibold text-foreground">
                            {t(`${relatedKey}.title`)}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {t(`${relatedKey}.heroDescription`)}
                          </p>
                          <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                            {t("learnMore")} &rarr;
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-forest py-16 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">{t("ctaTitle")}</h2>
              <p className="mb-10 text-white/80">{t("ctaSubtitle")}</p>
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-white text-forest hover:bg-white/90"
                >
                  <a href={BUSINESS.phoneHref}>
                    <Phone className="mr-2 size-5" />
                    {t("ctaCall")}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-green-500 text-white hover:bg-green-400"
                >
                  <a
                    href={BUSINESS.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 size-5" />
                    {t("ctaWhatsapp")}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-white text-forest hover:bg-white/90"
                >
                  <Link href="/#contact">{t("ctaContact")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
