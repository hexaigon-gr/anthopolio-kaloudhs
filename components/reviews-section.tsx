import { getTranslations } from "next-intl/server";

import { ReviewsCarousel } from "@/components/reviews-carousel";

export async function ReviewsSection() {
  const t = await getTranslations("Reviews");

  return (
    <section id="reviews" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className="md:px-14">
          <ReviewsCarousel />
        </div>
      </div>
    </section>
  );
}
