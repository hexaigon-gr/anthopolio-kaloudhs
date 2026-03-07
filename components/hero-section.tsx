import { Award, ShoppingBag, Wrench } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/general/constants";

export async function HeroSection() {
  const t = await getTranslations("HomePage");

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Background image */}
      <Image
        src="/images/hero-flowers.jpg"
        alt="Άνθη και φυτά"
        fill
        className="object-cover"
        priority
        quality={85}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      <div className="relative container mx-auto px-4 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl space-y-8">
          {/* Awards badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20">
            <Award className="size-4" />
            <span>Eagles Award 2023, 2024, 2025</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {t("heroHeadline")}
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            {t("heroSubheadline")}
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
            <Button asChild size="lg" className="gap-2 text-base px-8">
              <a href="#products">
                <ShoppingBag className="size-5" />
                {t("ctaProducts")}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 text-base px-8 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white dark:border-white/30 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            >
              <a href="#services">
                <Wrench className="size-5" />
                {t("ctaServices")}
              </a>
            </Button>
            <a
              href={BUSINESS.efood}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center h-11 px-5 rounded-md bg-transparent border-2 border-[#E02020] hover:bg-[#E02020]/10 transition-colors duration-300"
            >
              <Image
                src="/images/efood-logo.png"
                alt="efood - Παραγγείλτε Online"
                width={540}
                height={171}
                className="h-6 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
