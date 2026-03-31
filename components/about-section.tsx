import { Award, Heart, Leaf } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { CircleIcon } from "@/components/CircleIcon";

export async function AboutSection() {
  const t = await getTranslations("About");

  return (
    <section className="py-24 md:py-32 bg-background">
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
                { icon: Heart, titleKey: "quality", descKey: "qualityDesc", color: "#E11D48" },
                { icon: Leaf, titleKey: "variety", descKey: "varietyDesc", color: "#16A34A" },
                { icon: Award, titleKey: "awards", descKey: "awardsDesc", color: "#D97706" },
              ].map(({ icon: Icon, titleKey, descKey, color }) => (
                <div key={titleKey} className="flex gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/20 bg-card hover:shadow-sm transition-all duration-300">
                  <CircleIcon
                    color={color}
                    size={48}
                    icon={<Icon className="size-5" />}
                  />
                  <div>
                    <h3 className="font-semibold mb-1">{t(titleKey)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
