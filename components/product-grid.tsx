"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { OrderDialogContent } from "@/components/order-now-button";
import type { WoltProduct } from "@/lib/wolt/types";
import { cn } from "@/lib/general/utils";

// ─── Product Card ───
function ProductCard({
  product,
  onOpen,
  index,
}: {
  product: WoltProduct;
  onOpen: (p: WoltProduct) => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "group relative rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer",
        "translate-y-6 opacity-0",
        visible && "translate-y-0 opacity-100"
      )}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
      onClick={() => onOpen(product)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/50">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl opacity-20">🌸</span>
          </div>
        )}

        {/* Plus button */}
        <button
          className="absolute top-2 right-2 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-md hover:bg-primary/90"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(product);
          }}
          aria-label={`Order ${product.name}`}
        >
          <Plus className="size-4" strokeWidth={2.5} />
        </button>
      </div>

      {/* Name */}
      <div className="p-3">
        <h4 className="text-sm font-medium text-foreground leading-snug line-clamp-2">
          {product.name}
        </h4>
      </div>
    </div>
  );
}

// ─── Category heading with scroll animation ───
function CategoryHeading({ name, count }: { name: string; count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-baseline gap-3 mb-5 translate-y-4 opacity-0 transition-all duration-500",
        visible && "translate-y-0 opacity-100"
      )}
    >
      <h3 className="text-lg font-bold text-foreground">{name}</h3>
      <span className="text-xs text-muted-foreground">{count}</span>
    </div>
  );
}

// ─── Main Grid ───
interface ProductGridProps {
  grouped: Record<string, WoltProduct[]>;
}

export function ProductGrid({ grouped }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<WoltProduct | null>(
    null
  );

  const handleOpen = useCallback((product: WoltProduct) => {
    setSelectedProduct(product);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  return (
    <>
      <div className="space-y-10">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <CategoryHeading name={category} count={items.length} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={handleOpen}
                  index={i}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Order dialog — same as hero "Order Now" but with product image */}
      <Dialog
        open={selectedProduct !== null}
        onOpenChange={handleClose}
      >
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <OrderDialogContent
            productImage={selectedProduct?.imageUrl}
            productName={selectedProduct?.name}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
