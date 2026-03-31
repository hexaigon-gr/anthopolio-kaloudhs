"use client";

import {
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Smartphone,
  Tag,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { BUSINESS } from "@/lib/general/constants";
import { SERVICES } from "@/lib/general/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExpandMap } from "@/components/expand-map";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { sendContactEmail } from "@/server_actions/send-contact-email";

export function ContactSection() {
  const t = useTranslations("ContactForm");
  const tContact = useTranslations("Contact");
  const tServices = useTranslations("Services");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await sendContactEmail({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      service: (formData.get("service") as string) || undefined,
      message: formData.get("message") as string,
    });

    setSending(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error ?? "Something went wrong");
    }
  };

  const contactItems = [
    {
      icon: MapPin,
      label: tContact("address"),
      href: BUSINESS.mapsQuery,
      external: true,
    },
    {
      icon: Phone,
      label: tContact("phone"),
      href: BUSINESS.phoneHref,
    },
    {
      icon: Smartphone,
      label: `${tContact("mobile")} (WhatsApp)`,
      href: BUSINESS.whatsappHref,
      external: true,
    },
    {
      icon: Mail,
      label: BUSINESS.email,
      href: `mailto:${BUSINESS.email}`,
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
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
                  <p className="text-sm text-muted-foreground">{t("hoursThu")}</p>
                  <p className="text-sm text-muted-foreground">{t("hoursSun")}</p>
                </div>
              </div>
            </div>

            {/* Expandable map */}
            <ExpandMap
              mapsUrl={BUSINESS.mapsQuery}
              address={tContact("address")}
              coordinates="37.9310° N, 23.7500° E"
            />
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
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          placeholder={t("namePlaceholder")}
                          required
                          className="h-11 pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {t("email")}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t("emailPlaceholder")}
                          required
                          className="h-11 pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      {t("phone")}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder={t("phonePlaceholder")}
                        className="h-11 pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium">
                      {t("service")}
                    </label>
                    <Select name="service">
                      <SelectTrigger className="h-11">
                        <div className="flex items-center gap-2">
                          <Tag className="size-4 text-muted-foreground shrink-0" />
                          <SelectValue placeholder={t("servicePlaceholder")} />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICES.map((service) => {
                          const Icon = service.icon;
                          return (
                            <SelectItem key={service.slug} value={service.slug}>
                              <div className="flex items-center gap-2">
                                <Icon className="size-4 text-muted-foreground shrink-0" />
                                <span>{tServices(service.translationKey)}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t("message")}
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t("messagePlaceholder")}
                        required
                        rows={5}
                        className="resize-none pl-10"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-destructive text-center">{error}</p>
                  )}

                  <Button type="submit" size="lg" className="w-full gap-2 text-base" disabled={sending}>
                    <Send className="size-4" />
                    {sending ? t("sending") : t("send")}
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
