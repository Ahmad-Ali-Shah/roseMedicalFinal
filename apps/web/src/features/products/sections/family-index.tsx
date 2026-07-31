import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
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
        <SectionHeading level={2} eyebrow={intro.eyebrow} title={intro.title} />
        <ul className="family-grid products-family-grid" aria-label="Instrument families">
          {families.map((family) => <li key={family.id}><FamilyCard family={family} /></li>)}
        </ul>
      </Container>
    </Section>
  );
}
