import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import {
  MediaFrame,
  Reveal,
  Stagger,
  StaggerItem,
  TextReveal
} from "@/features/motion";
import { SectionHeading } from "@/features/public-catalogue";
import type { HomeProcurementModel } from "../homepage.data";
import { ROSA_LOGO_MEDIA } from "@/features/public-media";
import { publicMediaAlt } from "@/features/public-media";
import type { PublicLocale } from "@/features/localization";

export function ProcurementSupport({
  model,
  locale = "en"
}: {
  model: HomeProcurementModel;
  locale?: PublicLocale;
}): ReactElement {
  return (
    <Section
      tone="paper"
      data-section="procurement-support"
      aria-labelledby="procurement-support-title"
    >
      <Container size="wide">
        <SectionHeading
          id="procurement-support-title"
          level={2}
          eyebrow={model.eyebrow}
          title={model.title}
          copy={model.copy}
        />
        <div className="procurement-editorial">
          <Reveal direction="right" className="procurement-editorial__media-reveal">
            <MediaFrame
              src={ROSA_LOGO_MEDIA.src}
              alt={publicMediaAlt(ROSA_LOGO_MEDIA, locale)}
              aspect="portrait"
              focalPoint={ROSA_LOGO_MEDIA.focalPoint}
              fit={ROSA_LOGO_MEDIA.fit}
              tone="light"
              mediaSlot="homepage-procurement"
              className="procurement-editorial__visual procurement-editorial__brand"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </Reveal>
          <Reveal direction="left" className="procurement-editorial__copy" delay={0.08}>
            <p className="public-eyebrow">{model.detailEyebrow}</p>
            <TextReveal
              as="h3"
              className="procurement-editorial__title"
              text={model.detailTitle}
            />
            <p className="procurement-editorial__body">{model.detailCopy}</p>
            <Stagger as="ol" className="procurement-steps" interval={0.085}>
              {model.steps.map((step, index) => (
                <StaggerItem as="li" key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
