import type { ReactElement } from "react";
import { Container } from "@/components/layout";
import { InquiryCountLabel } from "@/features/inquiry";
import { LocaleLink } from "@/features/localization";
import type { ProductsDiscoveryModel } from "../products.data";

export function DiscoveryToolbarShell({ model }: { model: ProductsDiscoveryModel }): ReactElement {
  return (
    <div data-section="discovery-toolbar">
      <Container size="wide">
        <div className="products-discovery-shell" aria-label="Product discovery options">
          <LocaleLink className="products-search-entry" href={model.searchAction.href}>{model.searchLabel}</LocaleLink>
          <LocaleLink className="products-search-button" href={model.searchAction.href}>{model.searchAction.label}</LocaleLink>
          <LocaleLink className="products-inquiry-button" href={model.inquiryAction.href}><InquiryCountLabel /></LocaleLink>
        </div>
      </Container>
    </div>
  );
}
