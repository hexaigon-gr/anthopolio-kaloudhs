import "./globals.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { JsonLd, WebSiteJsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { SEO, SITE_URL } from "@/lib/general/seo";
import { routing } from "@/lib/i18n/routing";
import { BaseLayoutProps } from "@/types/page-props";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "greek"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const IS_PRODUCTION_HOST = process.env.VERCEL_ENV === "production";

export const generateMetadata = async ({
  params,
}: BaseLayoutProps): Promise<Metadata> => {
  const { locale } = await params;
  const ogLocale = locale === "el" ? "el_GR" : "en_US";
  const alternateLocale = locale === "el" ? "en_US" : "el_GR";

  return {
    title: {
      default: SEO.defaultTitle,
      template: `%s${SEO.titleSuffix}`,
    },
    description: SEO.defaultDescription,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        el: "/el",
        en: "/en",
        "x-default": "/el",
      },
    },
    openGraph: {
      type: "website",
      siteName: SEO.siteName,
      title: SEO.defaultTitle,
      description: SEO.defaultDescription,
      url: `${SITE_URL}/${locale}`,
      locale: ogLocale,
      alternateLocale,
      images: [
        {
          url: "/images/og-image.png",
          width: 1920,
          height: 1080,
          alt: SEO.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SEO.defaultTitle,
      description: SEO.defaultDescription,
      images: ["/images/og-image.png"],
    },
    robots: IS_PRODUCTION_HOST
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
};

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const LocaleLayout = async ({ children, params }: BaseLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <JsonLd />
        <WebSiteJsonLd locale={locale} />
      </head>
      <body className={`${roboto.variable} font-sans antialiased`}>
        <Providers messages={messages} locale={locale}>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default LocaleLayout;
