import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import type { PublicLocale } from "@/features/localization";
import { Reveal } from "@/features/motion";
import type { HomeFamilyIntroModel } from "../homepage.data";
import { HomeFamilyGallery } from "./home-family-gallery";

type GalleryFamilies = Parameters<typeof HomeFamilyGallery>[0]["families"];

export function FamilyDiscovery({
  intro,
  families,
  locale = "en"
}: {
  intro: HomeFamilyIntroModel;
  families: GalleryFamilies;
  locale?: PublicLocale;
}): ReactElement {
  return (
    <Section className="home-product-range" tone="paper" data-section="family-discovery" aria-labelledby="family-discovery-title">
      <Container size="wide">
        <Reveal direction="up">
          <h2 id="family-discovery-title" className="home-compact-section-title home-compact-section-title--center">
            {intro.title}
          </h2>
        </Reveal>
        <Reveal direction="right" delay={0.08}>
          <HomeFamilyGallery families={families} locale={locale} />
        </Reveal>
      </Container>
    </Section>
  );
}
