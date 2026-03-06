"use client";

import { Check, Leaf, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LEAF_PATH = "M100,10 Q140,50 160,100 Q140,160 100,190 Q60,160 40,100 Q60,50 100,10Z";

function LeafDecoration({ className }: { className: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 200 200" className="w-full h-full text-white">
        <path d={LEAF_PATH} fill="currentColor" />
      </svg>
    </div>
  );
}

export function NewsletterSection() {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden bg-forest text-forest-foreground">
      <LeafDecoration className="absolute top-0 left-0 w-40 md:w-64 h-40 md:h-64 opacity-[0.07] md:opacity-10" />
      <LeafDecoration className="hidden md:block absolute bottom-0 right-0 w-48 h-48 opacity-10 rotate-45" />

      <div className="relative container mx-auto px-4 lg:px-8 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-5 md:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/10">
            <Leaf className="size-4" />
            <span>{t("badge")}</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold leading-tight">
            {t("title")}
          </h2>

          <p className="text-white/70 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            {t("subtitle")}
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="size-5" />
              </div>
              <p className="text-lg font-medium">{t("success")}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto pt-2"
            >
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder={t("placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-white/40 focus-visible:ring-white/20"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 gap-2 bg-white text-forest hover:bg-white/90 font-semibold px-6 md:px-8 shrink-0"
                >
                  <Send className="size-4" />
                  <span className="hidden sm:inline">{t("subscribe")}</span>
                </Button>
              </div>
            </form>
          )}

          <p className="text-xs text-white/40">{t("privacy")}</p>
        </div>
      </div>
    </section>
  );
}
