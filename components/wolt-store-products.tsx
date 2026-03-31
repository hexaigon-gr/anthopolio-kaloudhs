import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { getWoltProducts } from "@/lib/wolt/get-products";
import type { WoltProduct } from "@/lib/wolt/types";

// ─── Skeleton fallback for Suspense ───
export function StoreProductsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Category skeleton */}
      {[1, 2].map((cat) => (
        <div key={cat}>
          <div className="h-7 w-40 bg-muted animate-pulse rounded mb-4" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-primary/10">
                <div className="h-48 bg-muted animate-pulse" />
                <CardContent className="p-4 space-y-2">
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
                  <div className="h-5 w-16 bg-muted animate-pulse rounded mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Product card ───
function ProductCard({ product }: { product: WoltProduct }) {
  return (
    <Card className="overflow-hidden border-primary/10 hover:border-primary/30 hover:shadow-md transition-all duration-300 group">
      {product.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <CardContent className="p-4">
        <h4 className="font-semibold text-foreground text-sm leading-snug">
          {product.name}
        </h4>
        {product.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="text-primary font-bold mt-2">
          {product.price.toFixed(2).replace(".", ",")}€
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Server Component ───
interface StoreProductsProps {
  storeSlug: string;
}

export async function StoreProducts({ storeSlug }: StoreProductsProps) {
  const products = await getWoltProducts(storeSlug);

  if (products.length === 0) {
    return null; // Gracefully hide when no products
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
    <div className="space-y-10">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-xl font-bold text-foreground mb-4 border-b border-primary/20 pb-2">
            {category}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
