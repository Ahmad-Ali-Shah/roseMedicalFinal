import type { ReactElement } from "react";
import type {
  CatalogueFamilyRecord,
  CatalogueProductRecord
} from "@/features/catalogue-registry";
import { Stagger, StaggerItem } from "@/features/motion";
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
      <Stagger as="ul" className="family-product-grid" interval={0.055}>
        {products.map((product) => (
          <StaggerItem as="li" key={product.id}>
            <FamilyProductCard family={family} product={product} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
