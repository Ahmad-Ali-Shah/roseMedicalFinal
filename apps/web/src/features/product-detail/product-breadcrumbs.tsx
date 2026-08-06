import type { ReactElement } from "react";
import type {
  CatalogueFamilyRecord,
  CatalogueProductRecord
} from "@/features/catalogue-registry";
import { familyHref } from "@/features/public-catalogue";
import { LocaleLink } from "@/features/localization";
import type { PublicLocale } from "@/features/localization/locales";

export function ProductBreadcrumbs({
  family,
  product,
  locale = "en"
}: {
  family: CatalogueFamilyRecord;
  product: CatalogueProductRecord;
  locale?: PublicLocale;
}): ReactElement {
  return (
    <nav className="public-breadcrumbs" aria-label="Breadcrumb">
      <LocaleLink href="/products">{locale === "ar" ? "المنتجات" : "Products"}</LocaleLink>
      <span aria-hidden="true">/</span>
      <LocaleLink href={familyHref(family.slug)}>{family.name}</LocaleLink>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{product.name}</span>
    </nav>
  );
}
