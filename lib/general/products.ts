import type { LucideIcon } from "lucide-react";
import { Container, Droplets, Flower2, Mountain } from "lucide-react";

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
    image: "/images/services/baptisms.jpg",
    relatedSlugs: ["pots", "fertilizers"],
    priority: "high",
  },
  {
    slug: "soil",
    translationKey: "soil",
    icon: Mountain,
    image: "/images/services/maintenance.jpg",
    relatedSlugs: ["fertilizers", "pots"],
    priority: "normal",
  },
  {
    slug: "fertilizers",
    translationKey: "fertilizers",
    icon: Droplets,
    image: "/images/services/irrigation.jpg",
    relatedSlugs: ["soil", "flowers"],
    priority: "normal",
  },
  {
    slug: "pots",
    translationKey: "pots",
    icon: Container,
    image: "/images/services/rock-gardens.jpg",
    relatedSlugs: ["flowers", "soil"],
    priority: "normal",
  },
] as const satisfies ProductDefinition[];

export const PRODUCT_SLUGS = PRODUCTS.map((p) => p.slug);

export function getProductBySlug(
  slug: string,
): ProductDefinition | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
