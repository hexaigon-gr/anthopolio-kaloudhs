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

// ─── Raw Wolt API response types (v4 menu endpoint) ───
export interface WoltRawMenuItem {
  id: string;
  name: WoltLocalized[];
  description?: WoltLocalized[];
  image?: {
    url: string;
  };
  baseprice: number;
  times?: unknown[];
}

export interface WoltLocalized {
  lang: string;
  value: string;
}

export interface WoltRawCategory {
  id: string;
  name: WoltLocalized[];
  items: string[]; // item IDs
}

export interface WoltRawMenuResponse {
  categories?: WoltRawCategory[];
  items?: WoltRawMenuItem[];
}
