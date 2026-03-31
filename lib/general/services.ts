import type { LucideIcon } from "lucide-react";
import {
  Heart,
  Church,
  PenTool,
  Wrench,
  Droplet,
  Scissors,
  TreePine,
  Trash2,
  Bug,
  Frame,
  PartyPopper,
  Building2,
} from "lucide-react";

export interface ServiceDefinition {
  slug: string;
  translationKey: string;
  icon: LucideIcon;
  category: "events" | "garden" | "special";
  image: string;
  relatedSlugs: string[];
  priority: "high" | "normal";
}

export const SERVICES: ServiceDefinition[] = [
  {
    slug: "weddings",
    translationKey: "weddings",
    icon: Heart,
    category: "events",
    image: "/images/services/wedding-hero.jpg",
    relatedSlugs: ["baptisms", "garden-design"],
    priority: "high",
  },
  {
    slug: "baptisms",
    translationKey: "baptisms",
    icon: Church,
    category: "events",
    image: "/images/services/baptism-font.jpg",
    relatedSlugs: ["weddings", "garden-design"],
    priority: "high",
  },
  {
    slug: "church-icons",
    translationKey: "churchIcons",
    icon: Frame,
    category: "events",
    image: "/images/services/baptisms.jpg",
    relatedSlugs: ["weddings", "baptisms", "receptions"],
    priority: "high",
  },
  {
    slug: "receptions",
    translationKey: "receptions",
    icon: PartyPopper,
    category: "events",
    image: "/images/services/baptisms.jpg",
    relatedSlugs: ["weddings", "church-icons", "commercial-spaces"],
    priority: "high",
  },
  {
    slug: "commercial-spaces",
    translationKey: "commercialSpaces",
    icon: Building2,
    category: "events",
    image: "/images/services/baptisms.jpg",
    relatedSlugs: ["receptions", "garden-design", "church-icons"],
    priority: "high",
  },
  {
    slug: "garden-design",
    translationKey: "gardenDesign",
    icon: PenTool,
    category: "garden",
    image: "/images/services/garden-design-new.jpg",
    relatedSlugs: ["rock-gardens", "maintenance"],
    priority: "high",
  },
  {
    slug: "maintenance",
    translationKey: "maintenance",
    icon: Wrench,
    category: "garden",
    image: "/images/services/maintenance-garden.jpg",
    relatedSlugs: ["irrigation", "pruning"],
    priority: "normal",
  },
  {
    slug: "irrigation",
    translationKey: "irrigation",
    icon: Droplet,
    category: "garden",
    image: "/images/services/irrigation-garden.jpg",
    relatedSlugs: ["maintenance", "garden-design"],
    priority: "normal",
  },
  {
    slug: "pruning",
    translationKey: "pruning",
    icon: Scissors,
    category: "garden",
    image: "/images/services/pruning.jpg",
    relatedSlugs: ["tall-trees", "maintenance"],
    priority: "normal",
  },
  {
    slug: "tall-trees",
    translationKey: "tallTrees",
    icon: TreePine,
    category: "garden",
    image: "/images/services/tall-trees.jpg",
    relatedSlugs: ["pruning", "land-clearing"],
    priority: "normal",
  },
  {
    slug: "land-clearing",
    translationKey: "landClearing",
    icon: Trash2,
    category: "special",
    image: "/images/services/land-clearing-new.jpg",
    relatedSlugs: ["tall-trees", "garden-design"],
    priority: "normal",
  },
  {
    slug: "pest-control",
    translationKey: "pestControl",
    icon: Bug,
    category: "special",
    image: "/images/services/pest-control.jpg",
    relatedSlugs: ["maintenance", "pruning"],
    priority: "normal",
  },
] as const satisfies ServiceDefinition[];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getServiceBySlug(
  slug: string,
): ServiceDefinition | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const TARGET_AREAS = {
  el: ["Αττική"],
  en: ["Attica"],
} as const;
