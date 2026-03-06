import {
  Bug,
  Container,
  Droplet,
  Droplets,
  Flower2,
  Gem,
  Mountain,
  PenTool,
  Scissors,
  Trash2,
  TreePine,
  Trees,
  Wrench,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function ShowcaseSection() {
  const t = await getTranslations("Showcase");
  const tProducts = await getTranslations("Products");
  const tServices = await getTranslations("Services");

  const products = [
    { icon: Flower2, key: "flowers" },
    { icon: Mountain, key: "soil" },
    { icon: Droplets, key: "fertilizers" },
    { icon: Container, key: "pots" },
  ] as const;

  const servicesPreview = [
    { icon: TreePine, key: "baptisms" },
    { icon: Wrench, key: "maintenance" },
    { icon: Droplet, key: "irrigation" },
    { icon: Scissors, key: "pruning" },
    { icon: Trees, key: "tallTrees" },
    { icon: PenTool, key: "gardenDesign" },
  ] as const;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Products Card */}
          <div id="products">
            <Card className="h-full border-primary/20 hover:border-primary/40 transition-colors group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Flower2 className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{t("productsTitle")}</CardTitle>
                <p className="text-muted-foreground">{t("productsDescription")}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {products.map(({ icon: Icon, key }) => (
                    <div
                      key={key}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <Icon className="size-5 text-primary shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{tProducts(key)}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {tProducts(`${key}Desc`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services Card */}
          <div>
            <Card className="h-full border-primary/20 hover:border-primary/40 transition-colors group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Wrench className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{t("servicesTitle")}</CardTitle>
                <p className="text-muted-foreground">{t("servicesDescription")}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {servicesPreview.map(({ icon: Icon, key }) => (
                    <div
                      key={key}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <Icon className="size-5 text-primary shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{tServices(key)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="#services"
                  className="inline-block mt-4 text-sm text-primary font-medium hover:underline"
                >
                  {tServices("viewAll")} →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
