import { Heart, Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/general/constants";
import { Link } from "@/lib/i18n/navigation";

export async function WeddingBanner() {
  const t = await getTranslations("WeddingBanner");

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background image */}
      <Image
        src="/images/services/wedding-cover.jpg"
        alt="Wedding floral decoration"
        fill
        className="object-cover"
        sizes="100vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/60 to-black/40" />

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20">
            <Heart className="size-4" />
            Weddings
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t("title")}
          </h2>

          <p className="text-lg text-white/80 leading-relaxed max-w-xl">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild size="lg" className="gap-2 text-base px-8">
              <Link href="/services/weddings">
                <Heart className="size-5" />
                {t("ctaPlan")}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 text-base px-8 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href={BUSINESS.phoneHref}>
                <Phone className="size-5" />
                {t("ctaCall")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
