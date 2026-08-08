import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { SectionHeading } from "@/features/public-catalogue";
import type { HomeFamilyIntroModel } from "../homepage.data";
import type { PublicLocale } from "@/features/localization";
import { HomeFamilyGallery } from "./home-family-gallery";

type FamilyGalleryFamilies = Parameters<typeof HomeFamilyGallery>[0]["families"];

export function FamilyDiscovery({
  intro,
  families,
  locale = "en"
}: {
  intro: HomeFamilyIntroModel;
  families: FamilyGalleryFamilies;
  locale?: PublicLocale;
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
        />
        <HomeFamilyGallery families={families} locale={locale} />
      </Container>
    </Section>
  );
}
