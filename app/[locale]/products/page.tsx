import {
  ArrowRight,
  Bug,
  Container,
  Droplets,
  Flower2,
  Mountain,
  Phone,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CatalogGrid } from "@/components/catalog-grid";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/lib/i18n/navigation";
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
        <section className="bg-gradient-to-br from-secondary/40 via-background to-accent/20 py-16 md:py-24">
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

        {/* Product Catalog */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                {tPages("catalogTitle")}
              </h2>
              <p className="text-muted-foreground">
                {tPages("catalogSubtitle")}
              </p>
            </div>
            <CatalogGrid catalog={CATALOG} locale={locale} />
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
