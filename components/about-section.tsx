import { Award, Heart, Leaf } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function AboutSection() {
  const t = await getTranslations("About");

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text side */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("title")}
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full" />
              <p className="text-muted-foreground leading-relaxed">
                {t("description1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("description2")}
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-6">
              {[
                {
                  icon: Heart,
                  titleKey: "quality" as const,
                  descKey: "qualityDesc" as const,
                },
                {
                  icon: Leaf,
                  titleKey: "variety" as const,
                  descKey: "varietyDesc" as const,
                },
                {
                  icon: Award,
                  titleKey: "awards" as const,
                  descKey: "awardsDesc" as const,
                },
              ].map(({ icon: Icon, titleKey, descKey }) => (
                <div key={titleKey} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t(titleKey)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t(descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
