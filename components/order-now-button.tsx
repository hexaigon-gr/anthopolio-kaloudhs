"use client";

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

interface OrderNowButtonProps {
  className?: string;
  label: string;
}

export function OrderNowButton({ className, label }: OrderNowButtonProps) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        className={cn(
          "gap-2 text-base px-8 border-[#E02020] bg-[#E02020]/10 text-white hover:bg-[#E02020]/20 hover:text-white",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <ShoppingCart className="size-5" />
        {label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <div className="p-6 pb-2">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <ShoppingCart className="size-5 text-primary" />
                {locale === "el"
                  ? "Παραγγείλτε τώρα"
                  : "Order Now"}
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
                  {locale === "el"
                    ? "Παραγγελία Online"
                    : "Order Online"}
                </p>
              </div>
              <div className="space-y-2.5">
                {/* efood */}
                <a
                  href={BUSINESS.efood}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full h-12 px-4 rounded-lg bg-[#E02020] hover:bg-[#c01818] text-white font-bold text-sm transition-colors duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 shrink-0">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                  </svg>
                  <span className="flex-1">efood</span>
                  <span className="text-white/70 text-xs font-normal">Delivery</span>
                </a>
                {/* Wolt */}
                <a
                  href={BUSINESS.wolt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full h-12 px-4 rounded-lg bg-[#009DE0] hover:bg-[#0088c2] text-white font-bold text-sm transition-colors duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 shrink-0">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5h-9v-2h9v2zm0-4h-9v-2h9v2zm0-4h-9v-2h9v2z" />
                  </svg>
                  <span className="flex-1">Wolt</span>
                  <span className="text-white/70 text-xs font-normal">Delivery</span>
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
