import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/features/motion";
import type { AboutStoryModel } from "../about.data";

export function AboutStorySection({
  model
}: {
  model: AboutStoryModel;
}): ReactElement {
  const copyDirection = model.mediaSide === "left" ? "left" : "right";
  const mediaDirection = model.mediaSide === "left" ? "right" : "left";

  return (
    <Section
      className={`about-client-story about-client-story--media-${model.mediaSide}`}
      tone="paper"
      data-section={`about-client-${model.id}`}
    >
      <Container className="about-client-story__grid" size="wide">
        <Reveal className="about-client-story__copy" direction={copyDirection}>
          <h2>{model.title}</h2>
          <p>{model.copy}</p>
        </Reveal>
        <Reveal
          className="about-client-story__media-reveal"
          direction={mediaDirection}
          delay={0.05}
        >
          <div
            className="about-client-story__media"
            data-about-story={model.id}
            data-media-slot={model.mediaSlot}
            data-media-state="placeholder"
            role="img"
            aria-label={model.mediaLabel}
          >
            <span className="about-client-placeholder__accent" aria-hidden="true" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
