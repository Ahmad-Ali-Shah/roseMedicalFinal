import type { ReactElement } from "react";
import { SearchPage } from "@/features/search/search-page";
import type { PublicLocale } from "@/features/localization/locales";

export function SearchDefaultPage({ initialQuery = "", locale = "en" }: { initialQuery?: string; locale?: PublicLocale }): ReactElement {
  return <SearchPage initialQuery={initialQuery} locale={locale} />;
}
