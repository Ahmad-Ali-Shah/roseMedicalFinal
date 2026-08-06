import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import { normalizeSearchQuery } from "@/features/search/search-catalogue";

export interface FamilyProductFilters {
  query?: string;
  size?: string;
  direction?: string;
  variant?: string;
  sort?: "recommended" | "name" | "code";
}

function matches(value: string, selected?: string): boolean {
  return !selected || normalizeSearchQuery(value) === normalizeSearchQuery(selected);
}

export function filterFamilyProducts(
  products: readonly CatalogueProductRecord[],
  filters: FamilyProductFilters = {}
): CatalogueProductRecord[] {
  const terms = normalizeSearchQuery(filters.query ?? "").split(" ").filter(Boolean);
  const result = products.filter((product) => {
    const searchable = normalizeSearchQuery([
      product.name,
      product.code,
      product.description ?? "",
      product.primaryOption ?? "",
      ...product.sizes,
      ...product.variants,
      ...product.directions,
      ...(product.catalogueCodes ?? []).flatMap((entry) => [entry.code, entry.size])
    ].join(" "));

    return (
      terms.every((term) => searchable.includes(term)) &&
      (!filters.size || product.sizes.some((value) => matches(value, filters.size))) &&
      (!filters.direction || product.directions.some((value) => matches(value, filters.direction))) &&
      (!filters.variant || product.variants.some((value) => matches(value, filters.variant)))
    );
  });

  if (filters.sort === "name") {
    return result.sort((left, right) => left.name.localeCompare(right.name));
  }
  if (filters.sort === "code") {
    return result.sort((left, right) => left.code.localeCompare(right.code, undefined, { numeric: true }));
  }
  return result;
}
