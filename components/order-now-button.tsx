"use client";

import Image from "next/image";
import { Phone, ShoppingCart, Star, Truck } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BUSINESS } from "@/lib/general/constants";
import { cn } from "@/lib/general/utils";

// ─── Shared Order Dialog Content ───
// Used by both the hero button and product cards
export function OrderDialogContent({
  productImage,
  productName,
}: {
  productImage?: string | null;
  productName?: string;
}) {
  const locale = useLocale();

  return (
    <>
      {/* Product image + name when opened from a product card */}
      {productImage && (
        <div className="bg-muted/50">
          <div className="relative aspect-square w-full">
            <Image
              src={productImage}
              alt={productName ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 500px"
            />
          </div>
          {productName && (
            <p className="px-6 py-3 font-semibold text-foreground text-base border-b border-border/50">
              {productName}
            </p>
          )}
        </div>
      )}

      <div className="p-6 pb-2">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <ShoppingCart className="size-5 text-primary" />
            {locale === "el" ? "Παραγγείλτε τώρα" : "Order Now"}
          </DialogTitle>
          <DialogDescription>
            {locale === "el"
              ? "Επιλέξτε τον τρόπο παραγγελίας σας"
              : "Choose your ordering method"}
          </DialogDescription>
        </DialogHeader>
      </div>

      <div className="px-6 space-y-4 pb-6">
        {/* Store option — recommended */}
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 relative">
          <div className="absolute -top-3 left-4 px-2 bg-primary text-primary-foreground text-xs font-bold rounded-full py-0.5 flex items-center gap-1">
            <Star className="size-3" />
            {locale === "el" ? "Προτεινόμενο" : "Recommended"}
          </div>
          <div className="mt-1">
            <p className="font-semibold text-foreground text-sm">
              {locale === "el"
                ? "Αγοράστε από το κατάστημά μας"
                : "Buy from our store"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === "el"
                ? "Καλύτερες τιμές & προσωπική εξυπηρέτηση"
                : "Better prices & personal service"}
            </p>
          </div>
          <Button asChild size="lg" className="w-full mt-3 gap-2">
            <a href={BUSINESS.phoneHref}>
              <Phone className="size-4" />
              {BUSINESS.phone}
            </a>
          </Button>
        </div>

        {/* Delivery options */}
        <div className="rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Truck className="size-4 text-muted-foreground" />
            <p className="font-semibold text-foreground text-sm">
              {locale === "el" ? "Παραγγελία Online" : "Order Online"}
            </p>
          </div>
          <div className="flex justify-center gap-2.5">
            <a
              href={BUSINESS.efood.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center size-12 rounded-lg border-2 border-[#ED2E2E] bg-transparent hover:bg-[#ED2E2E]/10 transition-colors duration-300"
            >
              <Image
                src={BUSINESS.efood.icon}
                alt="efood"
                width={28}
                height={28}
                className="size-7 rounded"
              />
            </a>
            <a
              href={BUSINESS.wolt.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center size-12 rounded-lg border-2 border-[#009DE0] bg-transparent hover:bg-[#009DE0]/10 transition-colors duration-300"
            >
              <Image
                src={BUSINESS.wolt.icon}
                alt="Wolt"
                width={28}
                height={28}
                className="size-7 rounded"
              />
            </a>
            <a
              href={BUSINESS.box.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center size-12 rounded-lg border-2 border-[#FF8600] bg-transparent hover:bg-[#FF8600]/10 transition-colors duration-300"
            >
              <Image
                src={BUSINESS.box.icon}
                alt="Box"
                width={28}
                height={28}
                className="size-7 rounded"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Hero Order Now Button ───
interface OrderNowButtonProps {
  className?: string;
  label: string;
}

export function OrderNowButton({ className, label }: OrderNowButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        className={cn(
          "gap-2 text-base px-8 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <ShoppingCart className="size-5" />
        {label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <OrderDialogContent />
        </DialogContent>
      </Dialog>
    </>
  );
}
