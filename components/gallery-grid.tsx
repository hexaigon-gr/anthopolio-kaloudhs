"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/general/utils";

const LIGHTBOX_BUTTON_CLASS =
  "absolute z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20";

const GALLERY_IMAGES = [
  { src: "/images/shop-4.jpg", alt: "Ταμπέλα καταστήματος ΑΝΘΗ-ΦΥΤΑ KALOUDIS" },
  { src: "/images/shop-1.jpg", alt: "Αλεξανδρινά φυτά - Χριστουγεννιάτικη συλλογή" },
  { src: "/images/shop-3.jpg", alt: "Πολύχρωμα εποχιακά λουλούδια και φυτά" },
  { src: "/images/6.jpg", alt: "Ποικιλία ανθοδεσμών σε ροζ και κόκκινα" },
  { src: "/images/shop-5.jpg", alt: "Νυχτερινή βιτρίνα καταστήματος" },
  { src: "/images/3.jpg", alt: "Μπλε λουλούδια σε δώρο συσκευασία" },
  { src: "/images/shop-6.jpg", alt: "Ανθοσυνθέσεις και δώρα Αγίου Βαλεντίνου" },
  { src: "/images/shop-7.jpg", alt: "Εσωτερικό κατάστημα με φυτά και διακοσμητικά" },
  { src: "/images/1.jpg", alt: "Εξωτερικός χώρος με πολύχρωμα λουλούδια" },
  { src: "/images/shop-2.jpg", alt: "Εξωτερικός χώρος με φυτά και αλεξανδρινά" },
  { src: "/images/shop-8.jpg", alt: "Χριστουγεννιάτικη διακόσμηση με Αλεξανδρινά" },
];

export function GalleryGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeImage = openIndex !== null ? GALLERY_IMAGES[openIndex] : null;

  const goNext = useCallback(() => {
    setOpenIndex((prev) =>
      prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null
    );
  }, []);

  const goPrev = useCallback(() => {
    setOpenIndex((prev) =>
      prev !== null
        ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        : null
    );
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;

    const keyActions: Record<string, () => void> = {
      Escape: close,
      ArrowRight: goNext,
      ArrowLeft: goPrev,
    };

    const handleKey = (e: KeyboardEvent) => keyActions[e.key]?.();

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [openIndex, close, goNext, goPrev]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-6xl mx-auto">
        {GALLERY_IMAGES.map((image, i) => (
          <button
            key={image.src}
            onClick={() => setOpenIndex(i)}
            className={cn(
              "relative overflow-hidden rounded-xl group cursor-pointer border border-border/30 hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300",
              i === 0 && "row-span-2"
            )}
          >
            <div
              className={cn(
                "relative",
                i === 0 ? "h-full min-h-[400px]" : "aspect-[4/3]"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {activeImage && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          <button
            onClick={close}
            className={cn(LIGHTBOX_BUTTON_CLASS, "top-4 right-4")}
            aria-label="Close"
          >
            <X className="size-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className={cn(LIGHTBOX_BUTTON_CLASS, "left-4")}
            aria-label="Previous"
          >
            <ChevronLeft className="size-6" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-[90vw] md:max-w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={1200}
              height={900}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              priority
            />
            <p className="mt-3 text-center text-sm text-white/70">
              {activeImage.alt}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className={cn(LIGHTBOX_BUTTON_CLASS, "right-4")}
            aria-label="Next"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/50">
            {openIndex! + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}
    </>
  );
}
