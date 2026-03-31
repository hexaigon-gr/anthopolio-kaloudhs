# Wolt Store Integration

## Setup

Add to `.env.local`:
```
WOLT_STORE_SLUG=kaloudis-anthopoleio
```

## Usage in any page.tsx

```tsx
import { Suspense } from "react";
import {
  StoreProducts,
  StoreProductsSkeleton,
} from "@/components/wolt-store-products";

export default function Page() {
  const slug = process.env.WOLT_STORE_SLUG ?? "kaloudis-anthopoleio";

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-8">Wolt Products</h2>
        <Suspense fallback={<StoreProductsSkeleton />}>
          <StoreProducts storeSlug={slug} />
        </Suspense>
      </div>
    </section>
  );
}
```

## How it works

1. `getWoltProducts(slug)` fetches from Wolt's menu API
2. Response is cached for 24h via `unstable_cache`
3. Products are mapped to a clean `WoltProduct` type
4. `StoreProducts` groups items by category and renders a grid
5. If the API fails or returns empty, the component renders `null`

## Files

- `lib/wolt/types.ts` — TypeScript interfaces (raw API + mapped)
- `lib/wolt/get-products.ts` — Fetch + cache logic
- `components/wolt-store-products.tsx` — Server Component + Skeleton
