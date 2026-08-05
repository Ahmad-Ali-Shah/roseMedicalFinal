import Link from "next/link";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import {
  MediaFrame,
  ProgressiveBlur,
  Stagger,
  StaggerItem
} from "@/features/motion";
import { SectionHeading } from "@/features/public-catalogue";
import type { HomeCatalogueModel } from "../homepage.data";

export function CatalogueAccess({ model }: { model: HomeCatalogueModel }): ReactElement {
  return (
    <Section
      className="home-catalogues"
      tone="paper"
      data-section="catalogue-access"
      data-home-index="05"
      aria-labelledby="catalogue-access-title"
      style={{ display: "block" }}
    >
      <span className="home-section-index" aria-hidden="true">05</span>
      <Container size="wide">
        <SectionHeading
          id="catalogue-access-title"
          level={2}
          eyebrow={model.eyebrow}
          title={model.title}
          copy={model.copy}
        />
        <div className="catalogue-grid-shell">
          <Stagger
            as="ul"
            className="catalogue-grid"
            aria-label="Technical catalogues"
            interval={0.055}
          >
            {model.items.map((item) => (
              <StaggerItem as="li" key={item.name}>
                <Link
                  className="catalogue-card premium-surface"
                  href={item.href}
                  aria-label={`View ${item.name} catalogue`}
                >
                  <MediaFrame
                    alt={`${item.name} catalogue cover reserved for final imagery`}
                    aspect="portrait"
                    tone="mist"
                    overlay="soft"
                    mediaSlot={`homepage-catalogue-${item.name.toLowerCase()}`}
                    className="catalogue-card__media"
                  >
                    <span className="catalogue-card__document" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  </MediaFrame>
                  <span className="catalogue-card__number">{item.number}</span>
                  <span className="catalogue-card__title">{item.name}</span>
                  <span className="catalogue-card__action">
                    View catalogue <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <ProgressiveBlur edge="right" className="catalogue-grid__blur" />
        </div>
      </Container>
    </Section>
  );
}
