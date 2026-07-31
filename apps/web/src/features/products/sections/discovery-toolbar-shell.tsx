import Link from "next/link";
import type { ReactElement } from "react";
import { Container } from "@/components/layout";
import type { ProductsDiscoveryModel } from "../products.data";

export function DiscoveryToolbarShell({ model }: { model: ProductsDiscoveryModel }): ReactElement {
  return (
    <div data-section="discovery-toolbar">
      <Container size="wide">
        <div className="products-discovery-shell" aria-label="Product discovery options">
          <Link className="products-search-entry" href={model.searchAction.href}>{model.searchLabel}</Link>
          <Link className="products-search-button" href={model.searchAction.href}>{model.searchAction.label}</Link>
          <Link className="products-inquiry-button" href={model.inquiryAction.href}>{model.inquiryAction.label}</Link>
        </div>
      </Container>
    </div>
  );
}
