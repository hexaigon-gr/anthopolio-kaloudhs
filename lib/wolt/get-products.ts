import { unstable_cache } from "next/cache";

import type {
  WoltProduct,
  WoltRawMenuResponse,
  WoltRawMenuItem,
  WoltRawCategory,
  WoltLocalized,
} from "./types";

const WOLT_MENU_API =
  "https://restaurant-api.wolt.com/v4/venues/slug/{SLUG}/menu";

function localized(arr: WoltLocalized[] | undefined, lang = "el"): string {
  if (!arr || arr.length === 0) return "";
  return arr.find((l) => l.lang === lang)?.value ?? arr[0].value;
}

function mapProducts(raw: WoltRawMenuResponse, lang = "el"): WoltProduct[] {
  const items = raw.items ?? [];
  const categories = raw.categories ?? [];

  // Build category lookup: itemId → category name
  const categoryMap = new Map<string, string>();
  for (const cat of categories) {
    const catName = localized(cat.name, lang);
    for (const itemId of cat.items) {
      categoryMap.set(itemId, catName);
    }
  }

  return items.map((item) => ({
    id: item.id,
    name: localized(item.name, lang),
    description: localized(item.description, lang),
    category: categoryMap.get(item.id) ?? "Uncategorized",
    price: item.baseprice / 100, // Wolt prices are in cents
    currency: "EUR",
    imageUrl: item.image?.url ?? null,
  }));
}

async function fetchWoltProducts(storeSlug: string): Promise<WoltProduct[]> {
  const url = WOLT_MENU_API.replace("{SLUG}", storeSlug);

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error(
        `[Wolt] Failed to fetch menu for "${storeSlug}": ${res.status} ${res.statusText}`
      );
      return [];
    }

    const text = await res.text();
    if (!text || text.length === 0) {
      console.warn(
        `[Wolt] Empty response for "${storeSlug}" — store may not be active`
      );
      return [];
    }

    const data: WoltRawMenuResponse = JSON.parse(text);
    return mapProducts(data);
  } catch (error) {
    console.error(`[Wolt] Error fetching menu for "${storeSlug}":`, error);
    return [];
  }
}

/**
 * Cached Wolt product fetcher.
 * Revalidates once per day (86400s).
 * Cache key includes the store slug to support multiple clients.
 */
export function getWoltProducts(storeSlug: string): Promise<WoltProduct[]> {
  return unstable_cache(
    () => fetchWoltProducts(storeSlug),
    [`wolt-products-${storeSlug}`],
    { revalidate: 86400, tags: [`wolt-${storeSlug}`] }
  )();
}
