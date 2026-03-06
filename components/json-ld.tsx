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
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Υπηρεσίες",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Στολισμοί Γάμων & Βαφτίσεων",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Συντήρηση Κήπων",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Αυτόματα Ποτίσματα",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Κλαδέματα",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Σχεδιασμός Κήπου",
        },
      },
    ],
  },
};

export const JsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
  />
);
