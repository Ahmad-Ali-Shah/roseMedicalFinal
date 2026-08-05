import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Stagger, StaggerItem } from "@/features/motion";
import {
  FamilyCard,
  SectionHeading,
  type FamilyCardModel
} from "@/features/public-catalogue";
import type { HomeFamilyIntroModel } from "../homepage.data";

export function FamilyDiscovery({
  intro,
  families
}: {
  intro: HomeFamilyIntroModel;
  families: readonly FamilyCardModel[];
}): ReactElement {
  return (
    <Section
      tone="paper"
      data-section="family-discovery"
      aria-labelledby="family-discovery-title"
    >
      <Container size="wide">
        <SectionHeading
          id="family-discovery-title"
          level={2}
          eyebrow={intro.eyebrow}
          title={intro.title}
          copy={intro.copy}
        />
        <Stagger
          as="ul"
          className="family-grid home-family-grid"
          aria-label="Instrument families"
          interval={0.065}
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
