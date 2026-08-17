import type { ReactElement } from "react";
import { Container } from "@/components/layout";
import type { PublicLocale } from "@/features/localization";
import { Reveal } from "@/features/motion";
import { SocialLinksRow } from "@/features/social-links";
import type { AboutPageModel } from "../about.data";

export function AboutSocialStrip({
  model,
  locale = "en"
}: {
  model: AboutPageModel["social"];
  locale?: PublicLocale;
}): ReactElement {
  return (
    <aside
      className="about-client-social"
      data-section="about-client-social"
      aria-label={model.title}
    >
      <Reveal direction="up">
        <Container className="about-client-social__inner" size="wide">
          <h2>- {model.title} -</h2>
          <SocialLinksRow locale={locale} className="about-client-social__links" />
        </Container>
      </Reveal>
    </aside>
  );
}
