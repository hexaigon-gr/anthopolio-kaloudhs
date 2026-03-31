"use client";

import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
          className={`size-3.5 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
        />
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function ReviewsCarousel() {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="max-w-6xl mx-auto"
    >
      <CarouselContent className="-ml-4">
        {REVIEWS.map((review) => (
          <CarouselItem
            key={review.name}
            className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <Card className="h-full hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex flex-col h-full gap-3">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.time}</p>
                  </div>
                  <GoogleIcon />
                </div>
                <Stars count={review.rating} />
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-12 hidden md:flex" />
      <CarouselNext className="-right-12 hidden md:flex" />
    </Carousel>
  );
}
