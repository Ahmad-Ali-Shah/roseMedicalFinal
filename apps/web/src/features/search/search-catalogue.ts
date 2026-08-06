import type { CatalogueProductRecord } from "@/features/catalogue-registry";

export function normalizeSearchQuery(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function searchableFields(product: CatalogueProductRecord): string[] {
  return [
    product.code,
    product.name,
    product.familySlug,
    product.description ?? "",
    product.primaryOption ?? "",
    ...product.sizes,
    ...product.variants,
    ...product.directions,
    ...(product.catalogueCodes ?? []).flatMap((entry) => [entry.code, entry.size])
  ].map(normalizeSearchQuery);
}

function scoreProduct(product: CatalogueProductRecord, query: string): number | null {
  const fields = searchableFields(product);
  const [code, name, family] = fields;
  const terms = query.split(" ");
  const combined = fields.join(" ");

  if (!terms.every((term) => combined.includes(term))) return null;
  if (code === query) return 0;
  if (code?.startsWith(query)) return 10;
  if (name === query) return 20;
  if (name?.startsWith(query)) return 30;
  if (family === query) return 40;
  if (name?.includes(query) || code?.includes(query)) return 50;
  return 60;
}

export function searchCatalogue(
  products: readonly CatalogueProductRecord[],
  rawQuery: string
): CatalogueProductRecord[] {
  const query = normalizeSearchQuery(rawQuery);
  if (!query) return [];

  return products
    .map((product, index) => ({ product, index, score: scoreProduct(product, query) }))
    .filter((entry): entry is typeof entry & { score: number } => entry.score !== null)
    .sort((left, right) => left.score - right.score || left.index - right.index)
    .map(({ product }) => product);
}
