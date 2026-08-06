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
import { LocaleLink, type PublicLocale } from "@/features/localization";
import { publicMediaAlt } from "@/features/public-media";

export function CatalogueAccess({
  model,
  locale = "en"
}: {
  model: HomeCatalogueModel;
  locale?: PublicLocale;
}): ReactElement {
  const ar = locale === "ar";

  return (
    <Section
      className="home-catalogues"
      tone="paper"
      data-section="catalogue-access"
      aria-labelledby="catalogue-access-title"
      style={{ display: "block" }}
    >
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
            aria-label={ar ? "الكتالوجات التقنية" : "Technical catalogues"}
            interval={0.055}
          >
            {model.items.map((item) => (
              <StaggerItem as="li" key={item.name}>
                <LocaleLink
                  className="catalogue-card premium-surface"
                  href={item.href}
                  aria-label={ar ? `عرض كتالوج ${item.name}` : `View ${item.name} catalogue`}
                  data-catalogue-family-media={item.slug}
                >
                  <MediaFrame
                    src={item.media.src}
                    alt={ar
                      ? `معاينة كتالوج ${item.name}: ${publicMediaAlt(item.media, locale)}`
                      : `${item.name} catalogue preview: ${publicMediaAlt(item.media, locale)}`}
                    aspect="portrait"
                    focalPoint={item.media.focalPoint}
                    fit={item.media.fit}
                    tone="mist"
                    overlay="dark"
                    mediaSlot={`homepage-catalogue-${item.name.toLowerCase()}`}
                    className="catalogue-card__media"
                    quality={92}
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 38vw, 20vw"
                  />
                  <span className="catalogue-card__number">{item.number}</span>
                  <span className="catalogue-card__title">{item.name}</span>
                  <span className="catalogue-card__action">
                    {ar ? "عرض الكتالوج" : "View catalogue"} <span aria-hidden="true">→</span>
                  </span>
                </LocaleLink>
              </StaggerItem>
            ))}
          </Stagger>
          <ProgressiveBlur edge="right" className="catalogue-grid__blur" />
        </div>
      </Container>
    </Section>
  );
}
