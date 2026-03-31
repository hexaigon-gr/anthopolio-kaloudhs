import { unstable_cache } from "next/cache";

import type {
  WoltProduct,
  WoltProductsResult,
  WoltSSRCategoryListing,
  WoltSSRDehydratedState,
} from "./types";
import { FALLBACK_PRODUCTS } from "./fallback-products";

const WOLT_VENUE_URL = "https://wolt.com/en/grc/athens/venue";

/**
 * Extract the TanStack Query dehydrated state from Wolt's SSR HTML.
 * The data lives in a large <script type="application/json"> tag.
 */
function extractDehydratedState(
  html: string
): WoltSSRDehydratedState | null {
  const scriptRegex =
    /<script[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/g;
  let match;

  while ((match = scriptRegex.exec(html)) !== null) {
    const content = match[1];
    // The dehydrated state blob is the largest JSON script (100KB+)
    if (content.length < 50_000) continue;

    try {
      const data = JSON.parse(content) as WoltSSRDehydratedState;
      if (data.queries && Array.isArray(data.queries)) return data;
    } catch {
      // Not valid JSON, skip
    }
  }

  return null;
}

/**
 * Find the category-listing query inside the dehydrated state.
 */
function findCategoryListing(
  state: WoltSSRDehydratedState,
  storeSlug: string
): WoltSSRCategoryListing | null {
  for (const query of state.queries) {
    const key = query.queryKey;
    if (
      key.includes("category-listing") &&
      key.includes(storeSlug)
    ) {
      return query.state.data as WoltSSRCategoryListing;
    }
  }
  return null;
}

/**
 * Map raw SSR data to clean WoltProduct[].
 */
function mapProducts(listing: WoltSSRCategoryListing): WoltProduct[] {
  const items = listing.items ?? [];
  const categories = listing.categories ?? [];

  // Build category lookup: itemId → category name
  const categoryMap = new Map<string, string>();
  for (const cat of categories) {
    for (const itemId of cat.item_ids) {
      categoryMap.set(itemId, cat.name);
    }
  }

  return items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description ?? "",
    category: categoryMap.get(item.id) ?? "Uncategorized",
    price: item.price / 100, // Wolt prices are in cents
    currency: "EUR",
    imageUrl: item.images?.[0]?.url ?? null,
  }));
}

async function fetchWoltProducts(
  storeSlug: string
): Promise<WoltProductsResult> {
  const url = `${WOLT_VENUE_URL}/${storeSlug}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
    });

    if (!res.ok) {
      console.error(
        `[Wolt] Failed to fetch venue page for "${storeSlug}": ${res.status} ${res.statusText}`
      );
      return { products: FALLBACK_PRODUCTS, isFallback: true };
    }

    const html = await res.text();
    if (!html || html.length < 1000) {
      console.warn(
        `[Wolt] Empty/short response for "${storeSlug}" — store may not be active`
      );
      return { products: FALLBACK_PRODUCTS, isFallback: true };
    }

    const state = extractDehydratedState(html);
    if (!state) {
      console.warn(
        `[Wolt] Could not extract dehydrated state for "${storeSlug}"`
      );
      return { products: FALLBACK_PRODUCTS, isFallback: true };
    }

    const listing = findCategoryListing(state, storeSlug);
    if (!listing || !listing.items?.length) {
      console.warn(
        `[Wolt] No category-listing data found for "${storeSlug}"`
      );
      return { products: FALLBACK_PRODUCTS, isFallback: true };
    }

    const products = mapProducts(listing);
    return { products, isFallback: false };
  } catch (error) {
    console.error(`[Wolt] Error fetching products for "${storeSlug}":`, error);
    return { products: FALLBACK_PRODUCTS, isFallback: true };
  }
}

/**
 * Cached Wolt product fetcher.
 * Revalidates once per day (86400s).
 * Cache key includes the store slug to support multiple clients.
 * Falls back to hardcoded products if scraping fails.
 */
export function getWoltProducts(
  storeSlug: string
): Promise<WoltProductsResult> {
  return unstable_cache(
    () => fetchWoltProducts(storeSlug),
    [`wolt-products-${storeSlug}`],
    { revalidate: 86400, tags: [`wolt-${storeSlug}`] }
  )();
}
