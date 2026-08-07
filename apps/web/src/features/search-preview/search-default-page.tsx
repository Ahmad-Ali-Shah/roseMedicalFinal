import type { ReactElement } from "react";
import { getSearchCatalogueProducts } from "@/features/catalogue-live";
import { SearchPage } from "@/features/search/search-page";
import type { PublicLocale } from "@/features/localization/locales";

export async function SearchDefaultPage({
  initialQuery = "",
  locale = "en"
}: {
  initialQuery?: string;
  locale?: PublicLocale;
}): Promise<ReactElement> {
  const products = await getSearchCatalogueProducts();
  return <SearchPage products={products} initialQuery={initialQuery} locale={locale} />;
}
