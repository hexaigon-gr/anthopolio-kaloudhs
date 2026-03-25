import {
  ArrowRight,
  Bug,
  Building2,
  Church,
  Droplet,
  Frame,

  Heart,
  PartyPopper,
  PenTool,
  Phone,
  Scissors,
  Trash2,
  TreePine,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/lib/i18n/navigation";
import { BasePageProps } from "@/types/page-props";

export const generateMetadata = async ({
  params,
}: BasePageProps): Promise<Metadata> => {
  const { locale } = await params;
  return {
    title: locale === "el" ? "Υπηρεσίες" : "Services",
    description:
      locale === "el"
        ? "Κηποτεχνικές υπηρεσίες στην Αττική: στολισμοί γάμων, συντηρήσεις κήπων, αυτόματα ποτίσματα, κλαδέματα, βραχόκηποι, σχεδιασμός κήπου."
        : "Landscaping services in Attica: wedding decorations, garden maintenance, automatic irrigation, pruning, rock gardens, garden design.",
    alternates: {
      canonical: "/services",
      languages: {
        el: "/el/services",
        en: "/en/services",
      },
    },
  };
};

const SERVICE_CATEGORIES = [
  {
    categoryKey: "eventsCategory" as const,
    services: [
      { icon: Heart, key: "weddings" as const, slug: "weddings" },
      { icon: Church, key: "baptisms" as const, slug: "baptisms" },
      { icon: Frame, key: "churchIcons" as const, slug: "church-icons" },
      { icon: PartyPopper, key: "receptions" as const, slug: "receptions" },
      { icon: Building2, key: "commercialSpaces" as const, slug: "commercial-spaces" },
    ],
  },
  {
    categoryKey: "gardenCategory" as const,
    services: [
      { icon: Wrench, key: "maintenance" as const, slug: "maintenance" },
      { icon: Droplet, key: "irrigation" as const, slug: "irrigation" },
      { icon: Scissors, key: "pruning" as const, slug: "pruning" },
      { icon: TreePine, key: "tallTrees" as const, slug: "tall-trees" },
      { icon: PenTool, key: "gardenDesign" as const, slug: "garden-design" },
    ],
  },
  {
    categoryKey: "specialCategory" as const,
    services: [
      { icon: Trash2, key: "landClearing" as const, slug: "land-clearing" },
      { icon: Bug, key: "pestControl" as const, slug: "pest-control" },
    ],
  },
];

const ServicesPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Services");
  const tPages = await getTranslations("ServicePages");

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
              {t("subtitle")}
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-16">
            {SERVICE_CATEGORIES.map(({ categoryKey, services }) => (
              <div key={categoryKey}>
                <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  {t(categoryKey)}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map(({ icon: Icon, key, slug }) => (
                    <Link href={`/services/${slug}`} key={key}>
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
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary/30">
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

export default ServicesPage;
