import {
  ArrowRight,
  Bug,
  Container,
  Droplets,
  ExternalLink,
  Flower2,
  Mountain,
  Phone,
} from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/lib/i18n/navigation";
import { BUSINESS } from "@/lib/general/constants";
import { CATALOG } from "@/lib/general/catalog";
import { BasePageProps } from "@/types/page-props";

export const generateMetadata = async ({
  params,
}: BasePageProps): Promise<Metadata> => {
  const { locale } = await params;
  return {
    title: locale === "el" ? "Προϊόντα" : "Products",
    description:
      locale === "el"
        ? "Άνθη, φυτά, χώματα, λιπάσματα, γλάστρες και προϊόντα απεντόμωσης. Ανθοπωλείο KALOUDIS — μεγάλη ποικιλία για κάθε ανάγκη."
        : "Flowers, plants, soil, fertilizers, pots and pest control products. KALOUDIS flower shop — wide variety for every need.",
    alternates: {
      canonical: "/products",
      languages: {
        el: "/el/products",
        en: "/en/products",
      },
    },
  };
};

const PRODUCT_ITEMS = [
  { icon: Flower2, key: "flowers" as const, slug: "flowers" },
  { icon: Mountain, key: "soil" as const, slug: "soil" },
  { icon: Droplets, key: "fertilizers" as const, slug: "fertilizers" },
  { icon: Container, key: "pots" as const, slug: "pots" },
  { icon: Bug, key: "pestProducts" as const, slug: "pest-products" },
];

const CATEGORY_KEY_MAP: Record<string, string> = {
  plants: "catalogPlants",
  foreverRoses: "catalogForeverRoses",
  roseBears: "catalogRoseBears",
  plush: "catalogPlush",
};

const ProductsPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Products");
  const tPages = await getTranslations("ProductPages");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-cream via-background to-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {tPages("subtitle")}
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
          </div>
        </section>

        {/* Product Categories Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {PRODUCT_ITEMS.map(({ icon: Icon, key, slug }) => (
                <Link href={`/products/${slug}`} key={key}>
                  <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-primary/10 hover:border-primary/30">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <Icon className="size-8" />
                      </div>
                      <h3 className="font-semibold text-xl mb-3">
                        {t(key)}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t(`${key}Desc`)}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary">
                        {tPages("learnMore")}
                        <ArrowRight className="size-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* efood Catalog */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <Image
                  src="/images/efood-logo.png"
                  alt="efood"
                  width={100}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                {tPages("catalogTitle")}
              </h2>
              <p className="text-muted-foreground">
                {tPages("catalogSubtitle")}
              </p>
            </div>

            <div className="space-y-10">
              {CATALOG.map((category) => (
                <div key={category.key}>
                  <h3 className="text-xl font-bold text-foreground mb-4 border-b border-primary/20 pb-2">
                    {tPages(CATEGORY_KEY_MAP[category.key])}
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.items.map((item, i) => (
                      <Card
                        key={`${category.key}-${i}`}
                        className="border-primary/10 hover:border-primary/30 transition-colors duration-300"
                      >
                        <CardContent className="p-5 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-medium text-foreground text-sm leading-snug">
                              {locale === "el" ? item.nameEl : item.nameEn}
                            </p>
                            {item.size && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.size}
                              </p>
                            )}
                          </div>
                          <span className="text-primary font-bold text-lg whitespace-nowrap">
                            {item.price.toFixed(2).replace(".", ",")}€
                          </span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 space-y-3">
              <a
                href={BUSINESS.efood}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-md bg-[#E02020] hover:bg-[#c01818] text-white font-bold text-base transition-colors duration-300"
              >
                <ExternalLink className="size-5" />
                {tPages("catalogOrderButton")}
              </a>
              <p className="text-xs text-muted-foreground">
                {tPages("catalogPriceNote")}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              {tPages("ctaTitle")}
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {tPages("ctaSubtitle")}
            </p>
            <Button asChild size="lg" className="gap-2 text-base px-8">
              <a href="tel:+302109954775">
                <Phone className="size-5" />
                210 9954775
              </a>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ProductsPage;
