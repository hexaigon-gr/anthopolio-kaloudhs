"use client";

import { Clock, Mail, MapPin, Phone, Send, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/general/utils";

export function ContactSection() {
  const t = useTranslations("ContactForm");
  const tContact = useTranslations("Contact");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    window.location.href = `mailto:kipotexnikesergasies13@gmail.com?subject=${encodeURIComponent(
      `Μήνυμα από ${name}`
    )}&body=${encodeURIComponent(`Από: ${name}\nEmail: ${email}\n\n${message}`)}`;

    setSubmitted(true);
  };

  const contactItems = [
    {
      icon: MapPin,
      label: tContact("address"),
      href: "https://maps.google.com/?q=Κυπρίων+Ηρώων+4+Ηλιούπολη",
      external: true,
    },
    {
      icon: Phone,
      label: tContact("phone"),
      href: "tel:+302109954775",
    },
    {
      icon: Smartphone,
      label: `${tContact("mobile")} (WhatsApp)`,
      href: "https://wa.me/306941469582",
      external: true,
    },
    {
      icon: Mail,
      label: "kipotexnikesergasies13@gmail.com",
      href: "mailto:kipotexnikesergasies13@gmail.com",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-leaf/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("subtitle")}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          {/* Contact info + map — 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-5">
              {contactItems.map(({ icon: Icon, label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {label}
                    </p>
                  </div>
                </a>
              ))}

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="size-5 text-primary" />
                </div>
                <div className="pt-1">
                  <p className="text-sm font-medium text-foreground">{t("hours")}</p>
                  <p className="text-sm text-muted-foreground">{t("hoursMon")}</p>
                  <p className="text-sm text-muted-foreground">{t("hoursSun")}</p>
                </div>
              </div>
            </div>

            {/* Embedded map */}
            <div className="rounded-xl overflow-hidden h-48 border shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3147.5!2d23.75!3d37.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU1JzQ4LjAiTiAyM8KwNDUnMDAuMCJF!5e0!3m2!1sel!2sgr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Χάρτης - ΑΝΘΗ-ΦΥΤΑ KALOUDIS"
              />
            </div>
          </div>

          {/* Contact form — 3 columns */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl border shadow-sm p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Send className="size-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{t("successTitle")}</h3>
                  <p className="text-muted-foreground">{t("successMessage")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {t("name")}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t("namePlaceholder")}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {t("email")}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        required
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      {t("phone")}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t("phonePlaceholder")}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      {t("subject")}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder={t("subjectPlaceholder")}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t("message")}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t("messagePlaceholder")}
                      required
                      rows={5}
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2 text-base">
                    <Send className="size-4" />
                    {t("send")}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
