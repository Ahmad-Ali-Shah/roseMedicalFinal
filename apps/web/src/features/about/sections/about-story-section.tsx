import Image from "next/image";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/features/motion";
import type { AboutStoryModel } from "../about.data";

const ABOUT_STORY_MEDIA = {
  workflow: "/media/editorial/about-client-workflow.webp",
  growth: "/media/editorial/about-client-growth.webp",
  experience: "/media/editorial/about-client-experience.webp"
} as const;

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
            data-media-state="ready"
          >
            <Image
              src={ABOUT_STORY_MEDIA[model.id]}
              alt={model.title}
              fill
              sizes="(min-width: 50rem) 60vw, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
