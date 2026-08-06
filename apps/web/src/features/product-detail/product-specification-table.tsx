import type { ReactElement } from "react";
import type { ProductSpecificationRow } from "./product-detail.data";
import type { PublicLocale } from "@/features/localization/locales";

export function ProductSpecificationTable({
  rows,
  locale = "en"
}: {
  rows: readonly ProductSpecificationRow[];
  locale?: PublicLocale;
}): ReactElement {
  const ar = locale === "ar";
  const labels: Record<string, string> = { "Product code": "رمز المنتج", Family: "العائلة", Size: "المقاس", Variant: "الخيار", Direction: "الاتجاه", "Catalogue reference": "مرجع الكتالوج" };
  return (
    <section className="product-specifications" aria-labelledby="product-specifications-title">
      <p className="public-eyebrow">{ar ? "المعلومات التقنية" : "Technical information"}</p>
      <h2 id="product-specifications-title">{ar ? "المواصفات والخيارات المتاحة." : "Specifications and available options."}</h2>
      <div className="product-specification-table__frame">
        <table className="product-specification-table">
          <caption>{ar ? "مواصفات المنتج المستندة إلى الكتالوج" : "Catalogue-backed product specifications"}</caption>
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label}>
                <th scope="row">{ar ? labels[label] ?? label : label}</th>
                <td><bdi dir="ltr">{value}</bdi></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
