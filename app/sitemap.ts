import type { MetadataRoute } from "next";

import { PRODUCTS } from "@/lib/general/products";
import { SITE_URL } from "@/lib/general/seo";
import { SERVICES } from "@/lib/general/services";
import { SUPPORTED_LOCALES } from "@/lib/i18n/routing";

const sitemap = (): MetadataRoute.Sitemap => {
  const staticPages = [
    { path: "", priority: 1 },
    { path: "/contact", priority: 0.9 },
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
      lastModified: "2026-04-30",
      changeFrequency: "weekly" as const,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(SUPPORTED_LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
          "x-default": `${SITE_URL}/el${path}`,
        },
      },
    }))
  );
};

export default sitemap;
