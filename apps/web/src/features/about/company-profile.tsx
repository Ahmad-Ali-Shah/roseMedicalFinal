import type { ReactElement } from "react";
import { Reveal, Stagger, StaggerItem, TextReveal } from "@/features/motion";
import type { PublicLocale } from "@/features/localization";
import { COMPANY_PROFILE, COMPANY_PROFILE_AR } from "./about.data";

export function CompanyProfile({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const profile = locale === "ar" ? COMPANY_PROFILE_AR : COMPANY_PROFILE;

  return (
    <article className="company-profile" data-company-profile="true">
      <div className="company-profile__introduction">
        <Reveal direction="up">
          <p className="page-eyebrow">{profile.eyebrow}</p>
        </Reveal>
        <TextReveal as="h2" text={profile.title} mode="words" delay={0.05} />
        <Reveal direction="up" delay={0.1}>
          <p className="company-profile__lead">{profile.lead}</p>
        </Reveal>
      </div>
      <div className="company-profile__body">
        <Reveal direction="up" delay={0.08} className="company-profile__narrative">
          {profile.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Reveal>
        <Stagger as="ol" className="company-profile__principles" interval={0.07}>
          {profile.principles.map((principle, index) => (
            <StaggerItem as="li" key={principle.label}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{principle.label}</h3>
              <p>{principle.copy}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </article>
  );
}
