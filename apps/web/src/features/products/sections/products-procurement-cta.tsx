import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { ProcurementPanel } from "@/features/public-catalogue";
import type { ProductsProcurementModel } from "../products.data";

export function ProductsProcurementCta({ model }: { model: ProductsProcurementModel }): ReactElement {
  return (
    <Section tone="paper" spacing="compact" data-section="products-procurement-cta" aria-label="Request a quotation">
      <Container size="wide">
        <ProcurementPanel
          eyebrow={model.eyebrow}
          title={model.title}
          copy={model.copy}
          primary={model.primary}
          tone="dark"
        />
      </Container>
    </Section>
  );
}
