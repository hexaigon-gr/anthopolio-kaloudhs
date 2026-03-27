"use client";

import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/general/utils";

const LIGHTBOX_BUTTON_CLASS =
  "absolute z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20";

const GALLERY_IMAGES = [
  { src: "/images/shop-4.jpg", alt: "Ταμπέλα καταστήματος ΑΝΘΗ-ΦΥΤΑ KALOUDIS", aspect: "landscape" },
  { src: "/images/shop-3.jpg", alt: "Πολύχρωμα εποχιακά λουλούδια και φυτά", aspect: "portrait" },
  { src: "/images/services/baptism-candle.jpg", alt: "Ανθοστολισμός λαμπάδας βάπτισης", aspect: "portrait" },
  { src: "/images/shop-5.jpg", alt: "Νυχτερινή βιτρίνα καταστήματος", aspect: "landscape" },
  { src: "/images/shop-1.jpg", alt: "Αλεξανδρινά φυτά - Χριστουγεννιάτικη συλλογή", aspect: "portrait" },
  { src: "/images/6.jpg", alt: "Ποικιλία ανθοδεσμών σε ροζ και κόκκινα", aspect: "portrait" },
  { src: "/images/services/wedding-cover.jpg", alt: "Στολισμός γάμου στην εκκλησία", aspect: "portrait" },
  { src: "/images/shop-6.jpg", alt: "Ανθοσυνθέσεις και δώρα Αγίου Βαλεντίνου", aspect: "portrait" },
  { src: "/images/3.jpg", alt: "Μπλε λουλούδια σε δώρο συσκευασία", aspect: "portrait" },
  { src: "/images/shop-7.jpg", alt: "Εσωτερικό κατάστημα με φυτά και διακοσμητικά", aspect: "portrait" },
  { src: "/images/1.jpg", alt: "Εξωτερικός χώρος με πολύχρωμα λουλούδια", aspect: "portrait" },
  { src: "/images/services/baptism-font.jpg", alt: "Στολισμός κολυμπήθρας βάπτισης", aspect: "portrait" },
  { src: "/images/shop-2.jpg", alt: "Εξωτερικός χώρος με φυτά και αλεξανδρινά", aspect: "portrait" },
  { src: "/images/shop-8.jpg", alt: "Χριστουγεννιάτικη διακόσμηση με Αλεξανδρινά", aspect: "portrait" },
] as const;

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
      {/* Pinterest-style masonry grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 max-w-6xl mx-auto [column-fill:balance]">
        {GALLERY_IMAGES.map((image, i) => (
          <button
            key={image.src}
            onClick={() => setOpenIndex(i)}
            className="relative w-full mb-3 break-inside-avoid overflow-hidden rounded-2xl group cursor-pointer block"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.aspect === "landscape" ? 800 : 600}
              height={image.aspect === "landscape" ? 450 : 800}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-2xl flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex size-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <ZoomIn className="size-5 text-white" />
              </div>
            </div>
            {/* Caption on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl">
              <p className="text-white text-xs font-medium leading-tight">
                {image.alt}
              </p>
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
