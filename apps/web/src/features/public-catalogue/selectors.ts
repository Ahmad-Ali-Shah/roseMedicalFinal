import { familyFixtures, productFixtures } from "@rosa/contracts/fixtures";
import {
  FAMILY_CARD_DISPLAY_ORDER,
  FAMILY_SLUGS,
  type FamilyCardModel,
  type FamilySlug,
  type ProductPreviewModel
} from "./models";
import { FAMILY_MEDIA_BY_SLUG } from "@/features/public-media";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry/products";

function isFamilySlug(value: string): value is FamilySlug {
  return FAMILY_SLUGS.some((slug) => slug === value);
}

export function familyNameBySlug(slug: FamilySlug): string {
  const fixture = familyFixtures.find((family) => family.slug === slug);
  if (!fixture) throw new Error(`Unknown Rosa family slug: ${slug}`);
  return fixture.name.en;
}

export function selectFamilyCards(): readonly FamilyCardModel[] {
  return FAMILY_CARD_DISPLAY_ORDER.map((slug, index): FamilyCardModel => {
    const fixture = familyFixtures.find((family) => family.slug === slug);
    if (!fixture) throw new Error(`Missing Rosa family fixture: ${slug}`);
    const description = fixture.introduction.en;

    return {
      id: fixture.id,
      slug,
      name: fixture.name.en,
      sequence: String(index + 1).padStart(2, "0"),
      ...(description ? { description } : {}),
      imageLabel: `${fixture.name.en} instruments`,
      media: FAMILY_MEDIA_BY_SLUG[slug]
    };
  });
}

export function selectFeaturedProducts(): readonly ProductPreviewModel[] {
  return productFixtures.map((product): ProductPreviewModel => {
    if (!isFamilySlug(product.familySlug)) {
      throw new Error(`Unknown Rosa family slug: ${product.familySlug}`);
    }
    const description = product.shortDescription.en;
    const canonicalProduct = CATALOGUE_PRODUCTS.find(
      (candidate) =>
        candidate.id === product.id ||
        (candidate.familySlug === product.familySlug &&
          candidate.slug === product.slug)
    );

    if (!canonicalProduct) {
      throw new Error(`Missing catalogue product for featured fixture: ${product.id}`);
    }

    return {
      id: product.id,
      slug: product.slug,
      familySlug: product.familySlug,
      familyName: familyNameBySlug(product.familySlug),
      name: product.name.en,
      code: product.code,
      optionSummary: product.optionSummary,
      ...(description ? { description } : {}),
      imageLabel: canonicalProduct.mediaLabel,
      ...(canonicalProduct.mediaPath
        ? { mediaPath: canonicalProduct.mediaPath }
        : {}),
      ...(canonicalProduct.mediaFallbackPath
        ? { mediaFallbackPath: canonicalProduct.mediaFallbackPath }
        : {}),
      ...(typeof canonicalProduct.mediaIndex === "number"
        ? { mediaIndex: canonicalProduct.mediaIndex }
        : {})
    };
  });
}
