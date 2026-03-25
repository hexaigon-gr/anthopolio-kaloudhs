"use client";

import { Menu, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/examples/language-switcher";
import { ThemeSwitcher } from "@/components/examples/ThemeSwitcher";
import { KaloudisLogo } from "@/components/KaloudisLogo";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/general/constants";
import { cn } from "@/lib/general/utils";
import { Link, usePathname } from "@/lib/i18n/navigation";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "products", href: "/#products" },
  { key: "services", href: "/#services" },
  { key: "reviews", href: "/#reviews" },
  { key: "contact", href: "/#contact" },
] as const;

export function Navbar() {
  const t = useTranslations("Nav");
  const tHome = useTranslations("HomePage");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollToTop = (e: React.MouseEvent, href: string) => {
    if (pathname === "/" && (href === "/" || href === "/#")) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full border-b transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur border-border shadow-sm"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          {/* Logo + Name */}
          <Link href="/" className="flex items-center gap-2 group" onClick={(e) => scrollToTop(e, "/")}>
            <KaloudisLogo size="sm" />
            <div className="flex flex-col leading-tight">
              <span
                className={cn(
                  "font-bold text-sm tracking-wide transition-colors",
                  scrolled ? "text-foreground group-hover:text-primary" : "text-white"
                )}
              >
                ΑΝΘΗ-ΦΥΤΑ
              </span>
              <span
                className={cn(
                  "text-xs tracking-widest uppercase transition-colors",
                  scrolled ? "text-muted-foreground" : "text-white/70"
                )}
              >
                Kaloudis
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  scrolled
                    ? "text-foreground/80 hover:text-primary"
                    : "text-white/80 hover:text-white"
                )}
                onClick={(e) => scrollToTop(e, href)}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={BUSINESS.phoneHref}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                scrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white hover:text-white/80"
              )}
            >
              <Phone className="size-4" />
              {BUSINESS.phone}
            </a>
            <LanguageSwitcher
              className={scrolled ? "" : "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"}
            />
            <ThemeSwitcher
              className={scrolled ? "" : "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"}
            />
            <Button asChild size="sm">
              <Link href="/#contact">{tHome("ctaContact")}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className={cn(
              "md:hidden p-2 z-60 relative",
              !scrolled && !mobileOpen && "text-white"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={cn(
          "fixed inset-0 z-55 md:hidden transition-all duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[85%] max-w-sm bg-background shadow-2xl transition-transform duration-300 ease-out flex flex-col",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Panel header */}
          <div className="flex items-center gap-3 p-6 pb-4 border-b">
            <KaloudisLogo size="sm" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-sm tracking-wide">ΑΝΘΗ-ΦΥΤΑ</span>
              <span className="text-xs tracking-widest uppercase text-muted-foreground">
                Kaloudis
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col gap-1 p-4 pt-6">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="py-3 px-4 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                onClick={(e) => { scrollToTop(e, href); setMobileOpen(false); }}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Bottom section */}
          <div className="p-6 pt-4 border-t space-y-4">
            {/* Phone */}
            <a
              href={BUSINESS.phoneHref}
              className="flex items-center gap-3 py-2 text-foreground hover:text-primary transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Phone className="size-4 text-primary" />
              </div>
              <span className="text-sm font-medium">{BUSINESS.phone}</span>
            </a>

            {/* Controls row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
              <Button asChild size="sm">
                <Link href="/#contact" onClick={() => setMobileOpen(false)}>
                  {tHome("ctaContact")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
