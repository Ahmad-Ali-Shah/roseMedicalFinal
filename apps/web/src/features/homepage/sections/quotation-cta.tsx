import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { ProcurementPanel } from "@/features/public-catalogue";
import type { HomeQuotationModel } from "../homepage.data";

export function QuotationCta({ model }: { model: HomeQuotationModel }): ReactElement {
  return (
    <Section tone="paper" spacing="compact" data-section="quotation-cta" aria-label="Request a quotation">
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
