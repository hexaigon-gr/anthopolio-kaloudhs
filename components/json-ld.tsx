import { BUSINESS } from "@/lib/general/constants";
import { SEO, SITE_URL } from "@/lib/general/seo";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: SEO.siteName,
  description: SEO.defaultDescription,
  url: SITE_URL,
  telephone: "+302109954775",
  email: BUSINESS.email,
  image: `${SITE_URL}/images/og-image.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Κυπρίων Ηρώων 4",
    addressLocality: "Ηλιούπολη",
    addressRegion: "Αττική",
    postalCode: "16346",
    addressCountry: "GR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.93,
    longitude: 23.75,
  },
  sameAs: [BUSINESS.facebook, BUSINESS.tiktok],
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "15:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  areaServed: [
    "Ηλιούπολη", "Αργυρούπολη", "Δάφνη", "Βύρωνας", "Άλιμος",
    "Υμηττός", "Άγιος Δημήτριος", "Καισαριανή", "Ελληνικό",
    "Γλυφάδα", "Νέα Σμύρνη", "Παλαιό Φάληρο", "Καλλιθέα",
    "Ζωγράφου", "Παγκράτι", "Βούλα", "Βουλιαγμένη", "Βάρη",
    "Παπάγου", "Χολαργός",
  ].map((area) => ({
    "@type": "City" as const,
    name: area,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Υπηρεσίες",
    itemListElement: [
      "Στολισμοί Γάμων",
      "Στολισμοί Βαπτίσεων",
      "Μελέτη & Σχεδιασμός Κήπου",
      "Συντήρηση Κήπων",
      "Αυτόματα Ποτίσματα",
      "Κλαδέματα",
      "Κοπή Ψηλών Δέντρων",
      "Βραχόκηποι",
      "Καθαρισμοί Οικοπέδων",
      "Ραντίσματα & Απολυμάνσεις",
    ].map((service) => ({
      "@type": "Offer" as const,
      itemOffered: {
        "@type": "Service" as const,
        name: service,
      },
    })),
  },
};

export const JsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
  />
);

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  image: string;
  areaServed: string[];
}

export const ServiceJsonLd = ({
  name,
  description,
  url,
  image,
  areaServed,
}: ServiceJsonLdProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    image,
    provider: {
      "@type": "Florist",
      name: SEO.siteName,
      url: SITE_URL,
      telephone: "+302109954775",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Κυπρίων Ηρώων 4",
        addressLocality: "Ηλιούπολη",
        addressRegion: "Αττική",
        postalCode: "16346",
        addressCountry: "GR",
      },
    },
    areaServed: areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface FAQJsonLdProps {
  faqs: { question: string; answer: string }[];
}

export const FAQJsonLd = ({ faqs }: FAQJsonLdProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface BreadcrumbJsonLdProps {
  items: { name: string; url: string }[];
}

export const BreadcrumbJsonLd = ({ items }: BreadcrumbJsonLdProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
