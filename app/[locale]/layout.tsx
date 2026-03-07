import "./globals.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { SEO, SITE_URL } from "@/lib/general/seo";
import { routing } from "@/lib/i18n/routing";
import { BaseLayoutProps } from "@/types/page-props";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "greek"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: SEO.defaultTitle,
    template: `%s${SEO.titleSuffix}`,
  },
  description: SEO.defaultDescription,
  keywords: [...SEO.keywords],
  metadataBase: new URL(SITE_URL),
  alternates: {
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
    url: SITE_URL,
    locale: "el_GR",
    alternateLocale: "en_US",
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
  robots: {
    index: true,
    follow: true,
  },
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
      </head>
      <body className={`${roboto.variable} font-sans antialiased`}>
        <Providers messages={messages} locale={locale}>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default LocaleLayout;
