import { Star } from "lucide-react";
import { getTranslations } from "next-intl/server";

import GoogleReviews from "@/components/GoogleReviews";
import { Card, CardContent } from "@/components/ui/card";

const REVIEWS = [
  {
    name: "Maria Patireli",
    rating: 5,
    text: "Προκείται για ένα από τα καλύτερα ανθοπωλεία στην Ηλιούπολη. Τόσο η Ελεάννα όσο και ο σύζυγός της είναι ευγενέστατοι, με όρεξη να εξυπηρετήσουν άμεσα.",
    time: "3 εβδομάδες πριν",
  },
  {
    name: "Aggeliki Fragkou",
    rating: 5,
    text: "Ήταν η καλύτερη επιλογή που έκανα για τον γάμο και τη βάφτιση της κόρης μου! Η Ελεάννα κατάλαβε ακριβώς τι ήθελα.",
    time: "4 μήνες πριν",
  },
  {
    name: "Evangelie R",
    rating: 5,
    text: "Καταπληκτική εξυπηρέτηση, ασυναγώνιστες τιμές και ειλικρίνεια. Το προτείνω ανεπιφύλακτα για στολισμό γάμου και όχι μόνο!",
    time: "1 χρόνο πριν",
  },
  {
    name: "Espresso Cyborg",
    rating: 5,
    text: "Μεγάλη ποικιλία φυτών, οικονομικές τιμές και πολύ φιλικό κλίμα. Υπάρχουν και τα διάσημα Fly Traps (σαρκοφάγα φυτά)!",
    time: "2 χρόνια πριν",
  },
  {
    name: "Panos the best",
    rating: 5,
    text: "Εξυπηρέτηση πελατών άψογη, εξυπηρέτηση πελατών με χαμόγελο!",
    time: "3 εβδομάδες πριν",
  },
  {
    name: "Manousos Brillakis",
    rating: 5,
    text: "Άψογος επαγγελματίας, προσεγμένη δουλειά.",
    time: "1 χρόνο πριν",
  },
] as const;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
        />
      ))}
    </div>
  );
}

export async function ReviewsSection() {
  const t = await getTranslations("Reviews");

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />

          {/* Google Reviews widget */}
          <div className="flex justify-center mt-8">
            <GoogleReviews placeId={process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || ""} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {REVIEWS.map((review) => (
            <Card key={review.name} className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col h-full gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.time}</p>
                    </div>
                  </div>
                  <Stars count={review.rating} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
