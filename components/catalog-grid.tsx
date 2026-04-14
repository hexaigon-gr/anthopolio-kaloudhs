"use client";

import { Phone, Star, Truck } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CatalogCategory, CatalogItem } from "@/lib/general/catalog";
import { BUSINESS } from "@/lib/general/constants";

const CATEGORY_KEY_MAP: Record<string, string> = {
  plants: "catalogPlants",
  foreverRoses: "catalogForeverRoses",
  roseBears: "catalogRoseBears",
  plush: "catalogPlush",
};

interface CatalogGridProps {
  catalog: CatalogCategory[];
  locale: string;
}

export function CatalogGrid({ catalog, locale }: CatalogGridProps) {
  const t = useTranslations("ProductPages");
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);

  return (
    <>
      <div className="space-y-10">
        {catalog.map((category) => (
          <div key={category.key}>
            <h3 className="text-xl font-bold text-foreground mb-4 border-b border-primary/20 pb-2">
              {t(CATEGORY_KEY_MAP[category.key])}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item, i) => (
                <button
                  key={`${category.key}-${i}`}
                  className="text-left w-full rounded-xl border border-primary/10 hover:border-primary/30 hover:shadow-md bg-card transition-all duration-300 cursor-pointer group p-5"
                  onClick={() => setSelectedItem(item)}
                >
                  <p className="font-medium text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                    {locale === "el" ? item.nameEl : item.nameEn}
                  </p>
                  {item.size && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.size}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Product Dialog */}
      <Dialog
        open={selectedItem !== null}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      >
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          {selectedItem && (
            <>
              <div className="p-6 pb-2">
                <DialogHeader>
                  <DialogTitle className="text-xl">
                    {locale === "el"
                      ? selectedItem.nameEl
                      : selectedItem.nameEn}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedItem.size && (
                      <span className="text-muted-foreground">
                        {selectedItem.size}
                      </span>
                    )}
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
                      {locale === "el"
                        ? "Παραγγελία Online"
                        : "Order Online"}
                    </p>
                  </div>
                  <div className="flex gap-2.5">
                    {/* efood */}
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

                    {/* Wolt */}
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

                    {/* Box */}
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
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
