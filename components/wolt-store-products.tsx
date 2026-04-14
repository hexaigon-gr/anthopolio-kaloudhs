import { Info } from "lucide-react";

import { ProductGrid } from "@/components/product-grid";
import { Card, CardContent } from "@/components/ui/card";
import { getWoltProducts } from "@/lib/wolt/get-products";
import type { WoltProduct } from "@/lib/wolt/types";

// ─── Skeleton fallback for Suspense ───
export function StoreProductsSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2].map((cat) => (
        <div key={cat}>
          <div className="h-7 w-40 bg-muted animate-pulse rounded mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card
                key={i}
                className="overflow-hidden border-none bg-black/5 dark:bg-white/5"
              >
                <div className="aspect-square bg-muted animate-pulse" />
                <CardContent className="p-3">
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Server Component ───
interface StoreProductsProps {
  storeSlug: string;
}

export async function StoreProducts({ storeSlug }: StoreProductsProps) {
  const { products, isFallback } = await getWoltProducts(storeSlug);

  if (products.length === 0) {
    return null;
  }

  // Group by category
  const grouped = products.reduce<Record<string, WoltProduct[]>>(
    (acc, product) => {
      const cat = product.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(product);
      return acc;
    },
    {}
  );

  return (
    <>
      <ProductGrid grouped={grouped} />

      {isFallback && (
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/60 pt-4">
          <Info className="size-3.5" />
          Τα προϊόντα ενδέχεται να μην είναι ενημερωμένα — ελέγξτε στο Wolt για
          τρέχουσα διαθεσιμότητα.
        </p>
      )}
    </>
  );
}
