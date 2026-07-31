import type { ReactElement } from "react";
import type {
  CatalogueFamilyRecord,
  CatalogueProductRecord
} from "@/features/catalogue-registry";
import { FamilyProductCard } from "./family-product-card";

export function FamilyProductGrid({
  family,
  products
}: {
  family: CatalogueFamilyRecord;
  products: readonly CatalogueProductRecord[];
}): ReactElement {
  return (
    <div className="family-product-results">
      <div className="family-product-results__header">
        <strong>{products.length} results</strong>
        <span>No prices shown · Add instruments during the interaction phase</span>
      </div>
      <ul className="family-product-grid">
        {products.map((product) => (
          <li key={product.id}>
            <FamilyProductCard family={family} product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
