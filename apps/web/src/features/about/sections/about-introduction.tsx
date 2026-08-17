import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/features/motion";
import type { AboutPageModel } from "../about.data";

export function AboutIntroduction({
  model
}: {
  model: AboutPageModel["introduction"];
}): ReactElement {
  return (
    <Section
      className="about-client-introduction"
      tone="paper"
      data-section="about-client-introduction"
    >
      <Container size="wide">
        <Reveal direction="up">
          <h2>{model.title}</h2>
        </Reveal>
        <Reveal direction="up" delay={0.06}>
          <p>{model.copy}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
