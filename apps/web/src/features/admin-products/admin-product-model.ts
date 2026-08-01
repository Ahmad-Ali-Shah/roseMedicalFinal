import type { Route } from "next";
import {
  CATALOGUE_FAMILIES,
  CATALOGUE_PRODUCTS,
  getProductDetailModel,
  type CatalogueFamilyRecord,
  type CatalogueProductRecord
} from "@/features/catalogue-registry";
import { familyHref, productHref } from "@/features/public-catalogue";
import {
  adminCatalogueHref,
  adminProductHref
} from "@/features/admin-management-routing/admin-management-hrefs";

export interface AdminProductRow {
  id: string;
  name: string;
  code: string;
  familySlug: CatalogueProductRecord["familySlug"];
  familyName: string;
  optionSummary: readonly string[];
  catalogueReference: string;
  mediaLabel: string;
  publicHref: Route<string>;
  familyHref: Route<string>;
  adminHref: Route<string>;
}

export interface AdminProductCompletenessItem {
  key:
    | "name"
    | "code"
    | "family"
    | "description"
    | "options"
    | "catalogue"
    | "arabic"
    | "media";
  label: string;
  state: "Present" | "Not supplied" | "Not registered";
}

export interface AdminProductEditorModel {
  family: CatalogueFamilyRecord;
  product: CatalogueProductRecord;
  publicHref: Route<string>;
  publicFamilyHref: Route<string>;
  adminCatalogueHref: Route<string>;
  optionGroups: readonly {
    key: "sizes" | "variants" | "directions" | "primary";
    label: string;
    values: readonly string[];
  }[];
  completeness: readonly AdminProductCompletenessItem[];
}

const familyBySlug = new Map(
  CATALOGUE_FAMILIES.map((family) => [family.slug, family] as const)
);

export function getDocumentedOptionSummary(
  product: CatalogueProductRecord
): readonly string[] {
  const values = [
    ...product.sizes,
    ...product.variants,
    ...product.directions,
    product.primaryOption
  ].filter((value): value is string => Boolean(value?.trim()));

  const unique = [...new Set(values)];
  return unique.length > 0 ? unique : ["Not documented in source"];
}

function formatCatalogueReference(product: CatalogueProductRecord): string {
  const page = product.catalogueReference.page?.trim();
  return page
    ? `${product.catalogueReference.family} · ${page}`
    : product.catalogueReference.family;
}

function hasDocumentedOptions(product: CatalogueProductRecord): boolean {
  return Boolean(
    product.sizes.length ||
      product.variants.length ||
      product.directions.length ||
      product.primaryOption?.trim()
  );
}

function completenessFor(
  product: CatalogueProductRecord
): readonly AdminProductCompletenessItem[] {
  return [
    { key: "name", label: "English product name", state: "Present" },
    { key: "code", label: "Product code", state: "Present" },
    { key: "family", label: "Instrument family", state: "Present" },
    {
      key: "description",
      label: "English description",
      state: product.description?.trim() ? "Present" : "Not supplied"
    },
    {
      key: "options",
      label: "Documented options",
      state: hasDocumentedOptions(product) ? "Present" : "Not supplied"
    },
    { key: "catalogue", label: "Catalogue reference", state: "Present" },
    { key: "arabic", label: "Arabic content", state: "Not supplied" },
    { key: "media", label: "Managed media", state: "Not registered" }
  ];
}

export function getAdminProductRows(): readonly AdminProductRow[] {
  return CATALOGUE_PRODUCTS.map((product) => {
    const family = familyBySlug.get(product.familySlug);
    if (!family) {
      throw new Error(`Unknown catalogue family: ${product.familySlug}`);
    }

    return {
      id: product.id,
      name: product.name,
      code: product.code,
      familySlug: product.familySlug,
      familyName: family.name,
      optionSummary: getDocumentedOptionSummary(product),
      catalogueReference: formatCatalogueReference(product),
      mediaLabel: product.mediaLabel,
      publicHref: productHref(product),
      familyHref: familyHref(product.familySlug),
      adminHref: adminProductHref(product)
    };
  });
}

export function getAdminProductEditor(
  familySlug: string,
  productSlug: string
): AdminProductEditorModel | undefined {
  const result = getProductDetailModel(familySlug, productSlug);
  if (result.kind !== "product") return undefined;

  const { family, product } = result;
  return {
    family,
    product,
    publicHref: productHref(product),
    publicFamilyHref: familyHref(family.slug),
    adminCatalogueHref: adminCatalogueHref(family.slug),
    optionGroups: [
      { key: "sizes", label: "Sizes", values: product.sizes },
      { key: "variants", label: "Variants", values: product.variants },
      { key: "directions", label: "Directions or shapes", values: product.directions },
      {
        key: "primary",
        label: "Primary option",
        values: product.primaryOption ? [product.primaryOption] : []
      }
    ],
    completeness: completenessFor(product)
  };
}
