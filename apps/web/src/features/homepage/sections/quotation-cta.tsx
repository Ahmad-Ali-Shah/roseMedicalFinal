import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Reveal, SpotlightSurface } from "@/features/motion";
import { ProcurementPanel } from "@/features/public-catalogue";
import type { HomeQuotationModel } from "../homepage.data";

export function QuotationCta({ model }: { model: HomeQuotationModel }): ReactElement {
  return (
    <Section
      tone="paper"
      spacing="compact"
      data-section="quotation-cta"
      data-home-index="06"
      aria-label="Request a quotation"
    >
      <span className="home-section-index" aria-hidden="true">06</span>
      <Container size="wide">
        <Reveal direction="up">
          <SpotlightSurface className="quotation-cta__surface">
            <ProcurementPanel
              eyebrow={model.eyebrow}
              title={model.title}
              copy={model.copy}
              primary={model.primary}
              tone="dark"
              className="procurement-panel--premium-cta"
            />
          </SpotlightSurface>
        </Reveal>
      </Container>
    </Section>
  );
}
