import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import {
  StoreProducts,
  StoreProductsSkeleton,
} from "@/components/wolt-store-products";

const STORE_SLUG = process.env.WOLT_STORE_SLUG ?? "kaloudis-garden";

export async function ProductsSection() {
  const t = await getTranslations("ProductsSection");

  return (
    <section id="products" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <Suspense fallback={<StoreProductsSkeleton />}>
          <StoreProducts storeSlug={STORE_SLUG} />
        </Suspense>
      </div>
    </section>
  );
}
