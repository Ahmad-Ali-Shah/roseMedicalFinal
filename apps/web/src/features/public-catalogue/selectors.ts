import { familyFixtures, productFixtures } from "@rosa/contracts/fixtures";
import {
  FAMILY_SLUGS,
  type FamilyCardModel,
  type FamilySlug,
  type ProductPreviewModel
} from "./models";

function isFamilySlug(value: string): value is FamilySlug {
  return FAMILY_SLUGS.some((slug) => slug === value);
}

export function familyNameBySlug(slug: FamilySlug): string {
  const fixture = familyFixtures.find((family) => family.slug === slug);
  if (!fixture) throw new Error(`Unknown Rosa family slug: ${slug}`);
  return fixture.name.en;
}

export function selectFamilyCards(): readonly FamilyCardModel[] {
  return FAMILY_SLUGS.map((slug) => {
    const fixture = familyFixtures.find((family) => family.slug === slug);
    if (!fixture) throw new Error(`Missing Rosa family fixture: ${slug}`);

    return {
      id: fixture.id,
      slug,
      name: fixture.name.en,
      description: fixture.introduction.en || undefined,
      imageLabel: `${fixture.name.en} instrument placeholder`
    };
  });
}

export function selectFeaturedProducts(): readonly ProductPreviewModel[] {
  return productFixtures.map((product) => {
    if (!isFamilySlug(product.familySlug)) {
      throw new Error(`Unknown Rosa family slug: ${product.familySlug}`);
    }

    return {
      id: product.id,
      slug: product.slug,
      familySlug: product.familySlug,
      familyName: familyNameBySlug(product.familySlug),
      name: product.name.en,
      code: product.code,
      optionSummary: product.optionSummary,
      description: product.shortDescription.en || undefined,
      imageLabel: `${product.name.en} placeholder`
    };
  });
}
