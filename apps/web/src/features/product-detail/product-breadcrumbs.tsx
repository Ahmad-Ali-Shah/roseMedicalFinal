import Link from "next/link";
import type { ReactElement } from "react";
import type {
  CatalogueFamilyRecord,
  CatalogueProductRecord
} from "@/features/catalogue-registry";
import { familyHref } from "@/features/public-catalogue";

export function ProductBreadcrumbs({
  family,
  product
}: {
  family: CatalogueFamilyRecord;
  product: CatalogueProductRecord;
}): ReactElement {
  return (
    <nav className="public-breadcrumbs" aria-label="Breadcrumb">
      <Link href="/products">Products</Link>
      <span aria-hidden="true">/</span>
      <Link href={familyHref(family.slug)}>{family.name}</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{product.name}</span>
    </nav>
  );
}
