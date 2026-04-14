import { BUSINESS } from "@/lib/general/constants";
import { SEO, SITE_URL } from "@/lib/general/seo";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Florist", "LandscapingBusiness"],
  name: SEO.siteName,
  description: SEO.defaultDescription,
  url: SITE_URL,
  telephone: "+302109954775",
  email: BUSINESS.email,
  image: `${SITE_URL}/images/og-image.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Λεωφόρος Κυπρίων Ηρώων 4",
    addressLocality: "Ηλιούπολη",
    addressRegion: "Αττική",
    postalCode: "16341",
    addressCountry: "GR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.9297,
    longitude: 23.7514,
  },
  sameAs: [BUSINESS.facebook, BUSINESS.tiktok],
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:00",
      closes: "16:00",
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
  hasOfferCatalog: [
    {
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
    {
      "@type": "OfferCatalog",
      name: "Προϊόντα",
      itemListElement: [
        "Άνθη & Φυτά",
        "Χώματα & Υποστρώματα",
        "Λιπάσματα",
        "Γλάστρες",
      ].map((product) => ({
        "@type": "Offer" as const,
        itemOffered: {
          "@type": "Product" as const,
          name: product,
        },
      })),
    },
  ],
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
        streetAddress: "Λεωφόρος Κυπρίων Ηρώων 4",
        addressLocality: "Ηλιούπολη",
        addressRegion: "Αττική",
        postalCode: "16341",
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

interface ProductJsonLdProps {
  name: string;
  description: string;
  url: string;
  image: string;
  category: string;
}

export const ProductJsonLd = ({
  name,
  description,
  url,
  image,
  category,
}: ProductJsonLdProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    image,
    category,
    brand: {
      "@type": "Brand",
      name: SEO.siteName,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: {
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
    },
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

interface WebSiteJsonLdProps {
  locale: string;
}

export const WebSiteJsonLd = ({ locale }: WebSiteJsonLdProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO.siteName,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale === "el" ? "el-GR" : "en-US",
    publisher: {
      "@type": "Organization",
      name: SEO.siteName,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
