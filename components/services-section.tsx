import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";

const SERVICES = [
  { key: "weddings", slug: "weddings", image: "/images/services/wedding-cover.jpg", category: "events" },
  { key: "baptisms", slug: "baptisms", image: "/images/services/baptism-candle.jpg", category: "events" },
  { key: "maintenance", slug: "maintenance", image: "/images/services/maintenance-garden.jpg", category: "garden" },
  { key: "irrigation", slug: "irrigation", image: "/images/services/irrigation-garden.jpg", category: "garden" },
  { key: "pruning", slug: "pruning", image: "/images/services/pruning-new.jpg", category: "garden" },
  { key: "tallTrees", slug: "tall-trees", image: "/images/services/tall-trees.jpg", category: "garden" },
  { key: "gardenDesign", slug: "garden-design", image: "/images/services/garden-design-new.jpg", category: "garden" },
  { key: "landClearing", slug: "land-clearing", image: "/images/services/land-clearing-new.jpg", category: "special" },
  { key: "pestControl", slug: "pest-control", image: "/images/services/pest-control.jpg", category: "special" },
] as const;

export async function ServicesSection() {
  const t = await getTranslations("Services");

  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/30">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {SERVICES.map(({ key, slug, image }) => (
            <Link href={`/services/${slug}`} key={key} className="group">
              <article className="relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-1">
                {/* Image area */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={image}
                    alt={t(`${key}Alt`)}
                    fill
                    className="object-cover transition-transform duration-900 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Soft vignette */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-black/5" />
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.15)]" />

                  <h3 className="absolute bottom-5 left-6 right-6 font-bold text-xl text-white tracking-tight" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
                    {t(key)}
                  </h3>
                </div>

                {/* Decorative leaf-colored divider */}
                <div className="relative h-0.5 bg-muted">
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 group-hover:w-full bg-leaf transition-all duration-500 ease-out" />
                </div>

                {/* Text area */}
                <div className="bg-cream p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {t(`${key}Desc`)}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
