import type { FamilySlug } from "@/features/public-catalogue";

const FAMILY_SLUGS: readonly FamilySlug[] = [
  "knives",
  "scissors",
  "punches",
  "chisels",
  "cutters"
];

export function isFamilySlug(value: string): value is FamilySlug {
  return (FAMILY_SLUGS as readonly string[]).includes(value);
}

export function toFamilySlug(value: string): FamilySlug {
  if (!isFamilySlug(value)) {
    throw new Error(`Unknown family slug from database: "${value}"`);
  }
  return value;
}
