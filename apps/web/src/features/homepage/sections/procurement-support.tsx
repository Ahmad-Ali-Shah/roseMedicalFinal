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

export function ProcurementSupport({ model }: { model: HomeProcurementModel }): ReactElement {
  return (
    <Section tone="paper" data-section="procurement-support" aria-labelledby="procurement-support-title">
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
              alt="Procurement review composition reserved for final imagery"
              aspect="portrait"
              tone="mist"
              overlay="soft"
              mediaSlot="homepage-procurement"
              className="procurement-editorial__visual"
            >
              <div className="procurement-editorial__visual-geometry" aria-hidden="true">
                <span /><span /><span /><span />
              </div>
            </MediaFrame>
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
