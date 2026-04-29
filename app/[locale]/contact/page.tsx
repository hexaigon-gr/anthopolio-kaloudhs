import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { BreadcrumbJsonLd } from "@/components/json-ld";
import { ContactSection } from "@/components/contact-section";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/general/seo";
import { BasePageProps } from "@/types/page-props";

export async function generateMetadata({ params }: BasePageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "el" ? "Επικοινωνία | ΑΝΘΗ-ΦΥΤΑ KALOUDIS" : "Contact | ANTHI-FYTA KALOUDIS",
    description:
      locale === "el"
        ? "Επικοινωνήστε με το ανθοπωλείο KALOUDIS στην Ηλιούπολη. Τηλ. 210 9954775. Λεωφόρος Κυπρίων Ηρώων 4."
        : "Contact KALOUDIS flower shop in Ilioupoli, Athens. Tel. 210 9954775. Leoforos Kyprion Iroon 4.",
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        el: "/el/contact",
        en: "/en/contact",
        "x-default": "/el/contact",
      },
    },
  };
}

const ContactPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <BreadcrumbJsonLd
        items={[
          { name: locale === "el" ? "Αρχική" : "Home", url: `${SITE_URL}/${locale}` },
          { name: locale === "el" ? "Επικοινωνία" : "Contact", url: `${SITE_URL}/${locale}/contact` },
        ]}
      />
      <Navbar />
      <main className="pt-16">
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default ContactPage;
