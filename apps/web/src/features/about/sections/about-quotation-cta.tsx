import type { ReactElement } from "react";
import { Container } from "@/components/layout";
import { LocalizedButtonLink } from "@/features/localization";
import { Reveal } from "@/features/motion";
import type { AboutPageModel } from "../about.data";

export function AboutQuotationCta({
  model
}: {
  model: AboutPageModel["quotation"];
}): ReactElement {
  return (
    <section
      className="about-client-quotation"
      data-section="about-client-quotation"
      aria-labelledby="about-client-quotation-title"
    >
      <Container size="wide">
        <Reveal className="about-client-quotation__surface" direction="up">
          <div className="about-client-quotation__copy">
            <p className="about-client-quotation__eyebrow">{model.eyebrow}</p>
            <h2 id="about-client-quotation-title">{model.title}</h2>
            <p>{model.copy}</p>
          </div>
          <LocalizedButtonLink href={model.primary.href}>
            {model.primary.label}
          </LocalizedButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
