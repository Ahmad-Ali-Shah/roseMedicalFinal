import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { SocialLinksRow } from "@/features/social-links";
import type { PublicLocale } from "@/features/localization";
import type {
  HomeAssuranceModel,
  HomeComprehensiveModel,
  HomeConfidenceModel,
  HomeContactBandModel,
  HomeSocialModel
} from "../homepage.data";

function HomeMediaPlaceholder({ label, aspect = "landscape" }: { label: string; aspect?: "landscape" | "portrait" }): ReactElement {
  return (
    <div className={`home-media-placeholder home-media-placeholder--${aspect}`} role="img" aria-label={`${label} image placeholder`} data-home-media-placeholder>
      <span className="home-media-placeholder__cross" aria-hidden="true" />
      <span className="home-media-placeholder__label">{label}</span>
    </div>
  );
}

export function ComprehensivePlans({ model }: { model: HomeComprehensiveModel }): ReactElement {
  return (
    <Section className="home-comprehensive" tone="paper" data-section="comprehensive-plans" aria-labelledby="home-comprehensive-title">
      <Container size="wide">
        <h2 id="home-comprehensive-title" className="home-compact-section-title home-compact-section-title--center">{model.title}</h2>
        <div className="home-comprehensive__lead">
          <figure className="home-specialty home-specialty--lead">
            <HomeMediaPlaceholder label={model.leadSpecialty} />
            <figcaption>{model.leadSpecialty}</figcaption>
          </figure>
          <p className="home-editorial-copy">{model.copy}</p>
        </div>
        <ul className="home-comprehensive__specialties" aria-label={model.title}>
          {model.specialties.map((specialty) => (
            <li key={specialty}>
              <figure className="home-specialty">
                <HomeMediaPlaceholder label={specialty} />
                <figcaption>{specialty}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function SecuringConfidence({ model }: { model: HomeConfidenceModel }): ReactElement {
  return (
    <Section className="home-confidence" tone="paper" data-section="securing-confidence" aria-labelledby="home-confidence-title">
      <Container className="home-confidence__grid" size="wide">
        <div className="home-confidence__copy">
          <h2 id="home-confidence-title" className="home-compact-section-title">{model.title}</h2>
          <p className="home-editorial-copy">{model.copy}</p>
        </div>
        <HomeMediaPlaceholder label={model.imageLabel} aspect="portrait" />
      </Container>
    </Section>
  );
}

export function HomeContactBand({ model }: { model: HomeContactBandModel }): ReactElement {
  return (
    <section className="home-contact-band" data-section="home-contact-band" aria-labelledby="home-contact-band-title">
      <Container size="wide">
        <div className="home-contact-band__surface">
          <div className="home-contact-band__copy">
            <p className="home-contact-band__eyebrow">{model.eyebrow}</p>
            <h2 id="home-contact-band-title">{model.title}</h2>
          </div>
          <div className="home-contact-band__actions">
            <a className="home-contact-action home-contact-action--whatsapp" href={model.whatsappHref} target="_blank" rel="noreferrer"><span className="home-contact-action__icon" aria-hidden="true">WA</span>{model.whatsappLabel}</a>
            <a className="home-contact-action home-contact-action--email" href={model.emailHref}><span className="home-contact-action__icon" aria-hidden="true">@</span>{model.emailLabel}</a>
          </div>
        </div>
      </Container>
    </section>
  );
}

const assuranceMarks: Record<string, string> = {
  customization: "C",
  compliance: "R",
  quality: "Q",
  "supply-chain": "S"
};

export function ClientSuccessAssurance({ model }: { model: HomeAssuranceModel }): ReactElement {
  return (
    <Section className="home-assurance" tone="paper" data-section="client-success-assurance" aria-labelledby="home-assurance-title">
      <Container size="wide">
        <h2 id="home-assurance-title" className="home-assurance__heading">{model.title} <span>{model.badge}</span></h2>
        <ul className="home-assurance__grid">
          {model.cards.map((card) => (
            <li key={card.id}>
              <article className="home-assurance-card">
                <h3>{card.title}</h3>
                <div className="home-assurance-card__body">
                  <span className="home-assurance-card__icon" aria-hidden="true">{assuranceMarks[card.id] ?? "R"}</span>
                  <p>{card.copy}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function HomeSocialStrip({ model, locale = "en" }: { model: HomeSocialModel; locale?: PublicLocale }): ReactElement {
  return (
    <aside className="home-social-strip" data-section="home-social-strip" aria-label={model.title}>
      <Container className="home-social-strip__inner" size="wide">
        <h2>- {model.title} -</h2>
        <SocialLinksRow locale={locale} className="home-social-strip__links" />
      </Container>
    </aside>
  );
}
