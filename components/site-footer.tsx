import { Facebook, Hexagon, MapPin, Phone, Smartphone } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { KaloudisLogo } from "@/components/KaloudisLogo";
import { SocialIcon } from "@/components/social-icon";
import { BUSINESS } from "@/lib/general/constants";

export async function SiteFooter() {
  const t = await getTranslations("Contact");
  const tFooter = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");

  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <KaloudisLogo size="sm" className="brightness-200" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-sm tracking-wide">
                  ΑΝΘΗ-ΦΥΤΑ
                </span>
                <span className="text-xs tracking-widest opacity-70 uppercase">
                  Kaloudis
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-80 max-w-xs">
              {t("aboutText")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">
              {tFooter("quickLinks")}
            </h3>
            <nav className="flex flex-col gap-2">
              {(["home", "products", "services", "reviews"] as const).map(
                (key) => (
                  <a
                    key={key}
                    href={key === "home" ? "#" : `#${key}`}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {tNav(key)}
                  </a>
                )
              )}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">
              {tFooter("contactInfo")}
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={BUSINESS.mapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <MapPin className="size-4 shrink-0 mt-0.5" />
                {t("address")}
              </a>
              <a
                href={BUSINESS.phoneHref}
                className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <Phone className="size-4 shrink-0" />
                {t("phone")}
              </a>
              <a
                href={BUSINESS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <Smartphone className="size-4 shrink-0" />
                {t("mobile")} (WhatsApp)
              </a>
            </div>
          </div>

          {/* Social & Map */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">{t("followUs")}</h3>
            <div className="flex gap-3">
              <SocialIcon
                url={BUSINESS.facebook}
                icon={<Facebook className="size-5" />}
                color="facebook"
                className="bg-white/10 hover:bg-white/20 text-white"
              />
              <SocialIcon
                url={BUSINESS.tiktok}
                icon={
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.81a8.23 8.23 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.22z" />
                  </svg>
                }
                color="tiktok"
                className="bg-white/10 hover:bg-white/20 text-white"
              />
            </div>
            <h3 className="font-semibold text-base pt-2">{t("findUs")}</h3>
            <div className="rounded-lg overflow-hidden h-36 bg-white/10">
              <iframe
                src={BUSINESS.mapsEmbedUrl}
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
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>
            © {new Date().getFullYear()} ΑΝΘΗ-ΦΥΤΑ KALOUDIS. {tFooter("rights")}.
          </span>
          <a
            href="https://hexaigon.gr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
          >
            <Hexagon className="size-3.5" />
            Made by hexaigon.gr
          </a>
        </div>
      </div>
    </footer>
  );
}
