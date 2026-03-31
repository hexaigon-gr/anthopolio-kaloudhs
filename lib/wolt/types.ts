// ─── Mapped product type (clean, app-facing) ───
export interface WoltProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  imageUrl: string | null;
}

// ─── Result wrapper that tracks data source ───
export interface WoltProductsResult {
  products: WoltProduct[];
  isFallback: boolean;
}

// ─── Raw Wolt SSR types (TanStack Query dehydrated state) ───
export interface WoltSSRItem {
  id: string;
  name: string;
  description?: string;
  price: number; // cents
  images?: { url: string; blurhash?: string | null }[];
}

export interface WoltSSRCategory {
  id: string;
  name: string;
  slug: string;
  item_ids: string[];
  images?: { url: string; blurhash?: string | null }[];
}

export interface WoltSSRCategoryListing {
  categories?: WoltSSRCategory[];
  items?: WoltSSRItem[];
}

export interface WoltSSRQuery {
  queryKey: string[];
  state: { data: unknown };
}

export interface WoltSSRDehydratedState {
  queries: WoltSSRQuery[];
}
