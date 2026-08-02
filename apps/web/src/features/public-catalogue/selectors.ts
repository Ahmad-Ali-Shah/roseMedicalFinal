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
  return FAMILY_SLUGS.map((slug): FamilyCardModel => {
    const fixture = familyFixtures.find((family) => family.slug === slug);
    if (!fixture) throw new Error(`Missing Rosa family fixture: ${slug}`);
    const description = fixture.introduction.en;

    return {
      id: fixture.id,
      slug,
      name: fixture.name.en,
      ...(description ? { description } : {}),
      imageLabel: `${fixture.name.en} instrument placeholder`
    };
  });
}

export function selectFeaturedProducts(): readonly ProductPreviewModel[] {
  return productFixtures.map((product): ProductPreviewModel => {
    if (!isFamilySlug(product.familySlug)) {
      throw new Error(`Unknown Rosa family slug: ${product.familySlug}`);
    }
    const description = product.shortDescription.en;

    return {
      id: product.id,
      slug: product.slug,
      familySlug: product.familySlug,
      familyName: familyNameBySlug(product.familySlug),
      name: product.name.en,
      code: product.code,
      optionSummary: product.optionSummary,
      ...(description ? { description } : {}),
      imageLabel: `${product.name.en} placeholder`
    };
  });
}
