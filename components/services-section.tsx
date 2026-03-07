import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

const SERVICES = [
  { key: "weddings", slug: "weddings", image: "/images/services/baptisms.jpg", category: "events" },
  { key: "baptisms", slug: "baptisms", image: "/images/services/baptisms.jpg", category: "events" },
  { key: "maintenance", slug: "maintenance", image: "/images/services/maintenance.jpg", category: "garden" },
  { key: "irrigation", slug: "irrigation", image: "/images/services/irrigation.jpg", category: "garden" },
  { key: "pruning", slug: "pruning", image: "/images/services/pruning.jpg", category: "garden" },
  { key: "tallTrees", slug: "tall-trees", image: "/images/services/tall-trees.jpg", category: "garden" },
  { key: "rockGardens", slug: "rock-gardens", image: "/images/services/rock-gardens.jpg", category: "garden" },
  { key: "gardenDesign", slug: "garden-design", image: "/images/services/garden-design.jpg", category: "garden" },
  { key: "landClearing", slug: "land-clearing", image: "/images/services/land-clearing.jpg", category: "special" },
  { key: "pestControl", slug: "pest-control", image: "/images/services/pest-control.jpg", category: "special" },
] as const;

export async function ServicesSection() {
  const t = await getTranslations("Services");

  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SERVICES.map(({ key, slug, image }) => (
            <Link href={`/services/${slug}`} key={key}>
              <div className="group relative overflow-hidden rounded-2xl bg-card border border-primary/10 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={image}
                    alt={t(key)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 right-5 font-semibold text-lg text-white drop-shadow-md">
                    {t(key)}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`${key}Desc`)}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary">
                    {t("readMore")}
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
