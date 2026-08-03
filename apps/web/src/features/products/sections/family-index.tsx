import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Stagger, StaggerItem } from "@/features/motion";
import { FamilyCard, SectionHeading, type FamilyCardModel } from "@/features/public-catalogue";
import type { ProductsFamilyIntroModel } from "../products.data";

export function FamilyIndex({
  intro,
  families
}: {
  intro: ProductsFamilyIntroModel;
  families: readonly FamilyCardModel[];
}): ReactElement {
  return (
    <Section tone="paper" data-section="family-index" aria-labelledby="products-family-title">
      <Container size="wide">
        <SectionHeading id="products-family-title" level={2} eyebrow={intro.eyebrow} title={intro.title} />
        <Stagger
          as="ul"
          className="family-grid products-family-grid"
          aria-label="Instrument families"
          interval={0.055}
        >
          {families.map((family) => (
            <StaggerItem as="li" key={family.id}>
              <FamilyCard family={family} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
