import {
  Bug,
  Church,
  Droplet,
  Gem,
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
import { BasePageProps } from "@/types/page-props";

export const metadata: Metadata = {
  title: "Υπηρεσίες | ΑΝΘΗ-ΦΥΤΑ KALOUDIS",
  description:
    "Κηποτεχνικές υπηρεσίες στην Ηλιούπολη: στολισμοί γάμων, συντηρήσεις κήπων, αυτόματα ποτίσματα, κλαδέματα, βραχόκηποι, σχεδιασμός κήπου.",
};

const SERVICE_CATEGORIES = [
  {
    categoryKey: "eventsCategory" as const,
    services: [{ icon: Church, key: "baptisms" as const }],
  },
  {
    categoryKey: "gardenCategory" as const,
    services: [
      { icon: Wrench, key: "maintenance" as const },
      { icon: Droplet, key: "irrigation" as const },
      { icon: Scissors, key: "pruning" as const },
      { icon: TreePine, key: "tallTrees" as const },
      { icon: Gem, key: "rockGardens" as const },
      { icon: PenTool, key: "gardenDesign" as const },
    ],
  },
  {
    categoryKey: "specialCategory" as const,
    services: [
      { icon: Trash2, key: "landClearing" as const },
      { icon: Bug, key: "pestControl" as const },
    ],
  },
];

const ServicesPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Services");

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
                  {services.map(({ icon: Icon, key }) => (
                    <Card
                      key={key}
                      className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-primary/10 hover:border-primary/30"
                    >
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
                      </CardContent>
                    </Card>
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
              Ενδιαφέρεστε για κάποια υπηρεσία;
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Επικοινωνήστε μαζί μας για δωρεάν εκτίμηση και προσφορά
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
