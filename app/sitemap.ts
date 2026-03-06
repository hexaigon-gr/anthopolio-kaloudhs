import type { MetadataRoute } from "next";

import { SUPPORTED_LOCALES } from "@/lib/i18n/routing";
import { SITE_URL } from "@/lib/general/seo";

const sitemap = (): MetadataRoute.Sitemap => {
  const pages = ["", "/services"];

  return pages.flatMap((page) =>
    SUPPORTED_LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          SUPPORTED_LOCALES.map((l) => [l, `${SITE_URL}/${l}${page}`])
        ),
      },
    }))
  );
};

export default sitemap;
