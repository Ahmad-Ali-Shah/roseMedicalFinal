import type { ReactElement } from "react";
import type {
  CatalogueFamilyRecord,
  CatalogueProductRecord
} from "@/features/catalogue-registry";
import { Stagger, StaggerItem } from "@/features/motion";
import { FamilyProductCard } from "./family-product-card";
import type { PublicLocale } from "@/features/localization/locales";

export function FamilyProductGrid({
  family,
  products,
  locale = "en"
}: {
  family: CatalogueFamilyRecord;
  products: readonly CatalogueProductRecord[];
  locale?: PublicLocale;
}): ReactElement {
  return (
    <div className="family-product-results">
      <div className="family-product-results__header">
        <strong>{products.length} {locale === "ar" ? "نتيجة" : "results"}</strong>
        <span>{locale === "ar" ? "لا توجد أسعار عامة · أنشئ استفسارًا لطلب عرض سعر" : "No public prices · Build an inquiry for quotation"}</span>
      </div>
      <Stagger as="ul" className="family-product-grid" interval={0.055}>
        {products.map((product) => (
          <StaggerItem as="li" key={product.id}>
            <FamilyProductCard family={family} product={product} locale={locale} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
