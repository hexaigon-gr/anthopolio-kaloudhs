import type { MetadataRoute } from "next";

import { SUPPORTED_LOCALES } from "@/lib/i18n/routing";
import { SITE_URL } from "@/lib/general/seo";
import { PRODUCTS } from "@/lib/general/products";
import { SERVICES } from "@/lib/general/services";

const sitemap = (): MetadataRoute.Sitemap => {
  const staticPages = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.8 },
    { path: "/products", priority: 0.8 },
  ];

  const servicePages = SERVICES.map((s) => ({
    path: `/services/${s.slug}`,
    priority: s.priority === "high" ? 0.9 : 0.7,
  }));

  const productPages = PRODUCTS.map((p) => ({
    path: `/products/${p.slug}`,
    priority: p.priority === "high" ? 0.9 : 0.7,
  }));

  const allPages = [...staticPages, ...servicePages, ...productPages];

  return allPages.flatMap(({ path, priority }) =>
    SUPPORTED_LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          SUPPORTED_LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
        ),
      },
    }))
  );
};

export default sitemap;
