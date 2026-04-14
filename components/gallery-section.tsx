import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";

const GalleryGrid = dynamic(
  () => import("@/components/gallery-grid").then((m) => m.GalleryGrid),
  {
    loading: () => (
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-3/4 bg-secondary/30 rounded-xl animate-pulse"
          />
        ))}
      </div>
    ),
  },
);

export async function GallerySection() {
  const t = await getTranslations("Gallery");

  return (
    <section className="py-24 md:py-32 bg-accent/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <GalleryGrid />
      </div>
    </section>
  );
}
