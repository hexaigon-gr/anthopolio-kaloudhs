import { setRequestLocale } from "next-intl/server";

import { ContactSection } from "@/components/contact-section";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { BasePageProps } from "@/types/page-props";

const ContactPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="pt-16">
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default ContactPage;
