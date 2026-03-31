import type { LucideIcon } from "lucide-react";
import { Bug, Container, Droplets, Flower2, Mountain } from "lucide-react";

export interface ProductDefinition {
  slug: string;
  translationKey: string;
  icon: LucideIcon;
  image: string;
  relatedSlugs: string[];
  priority: "high" | "normal";
}

export const PRODUCTS: ProductDefinition[] = [
  {
    slug: "flowers",
    translationKey: "flowers",
    icon: Flower2,
    image: "/images/products-flowers.jpg",
    relatedSlugs: ["pots", "fertilizers"],
    priority: "high",
  },
  {
    slug: "soil",
    translationKey: "soil",
    icon: Mountain,
    image: "/images/products-soil.jpg",
    relatedSlugs: ["fertilizers", "pots"],
    priority: "normal",
  },
  {
    slug: "fertilizers",
    translationKey: "fertilizers",
    icon: Droplets,
    image: "/images/products-fertilizers.jpg",
    relatedSlugs: ["soil", "flowers"],
    priority: "normal",
  },
  {
    slug: "pots",
    translationKey: "pots",
    icon: Container,
    image: "/images/products-pots.jpg",
    relatedSlugs: ["flowers", "soil"],
    priority: "normal",
  },
  {
    slug: "pest-products",
    translationKey: "pestProducts",
    icon: Bug,
    image: "/images/products-pest-control.jpg",
    relatedSlugs: ["fertilizers", "soil"],
    priority: "normal",
  },
] as const satisfies ProductDefinition[];

export const PRODUCT_SLUGS = PRODUCTS.map((p) => p.slug);

export function getProductBySlug(
  slug: string,
): ProductDefinition | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
