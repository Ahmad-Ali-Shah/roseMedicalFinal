import type { ReactElement } from "react";
import { Container } from "@/components/layout";
import { Reveal } from "@/features/motion";
import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";
import type { AboutPageModel } from "../about.data";

function ContactIcon({ kind }: { kind: "whatsapp" | "email" }): ReactElement {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };

  if (kind === "email") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="1.8" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.6Z" />
      <path d="M9.1 8.5c.4 2.7 2 4.4 4.7 5.2l1.3-1.3 2.1.9c-.4 1.9-1.7 2.8-3.5 2.5-3.8-.7-6.2-3.1-6.9-6.9-.3-1.8.6-3.1 2.5-3.5l.9 2.1Z" />
    </svg>
  );
}

export function AboutContactBand({
  model
}: {
  model: AboutPageModel["contact"];
}): ReactElement {
  const contact = PUBLIC_CONTENT_VALUES.contactDetails;
  const whatsappHref = `https://wa.me/${contact.phone.replace(/\D/g, "")}`;

  return (
    <section
      className="about-client-contact"
      data-section="about-client-contact"
      aria-labelledby="about-client-contact-title"
    >
      <Container size="wide">
        <Reveal className="about-client-contact__surface" direction="up">
          <div className="about-client-contact__copy">
            <p className="about-client-contact__eyebrow">{model.eyebrow}</p>
            <h2 id="about-client-contact-title">{model.title}</h2>
          </div>
          <div className="about-client-contact__actions">
            <a
              className="about-client-contact-action about-client-contact-action--whatsapp"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true"><ContactIcon kind="whatsapp" /></span>
              {model.whatsappLabel}
            </a>
            <a
              className="about-client-contact-action about-client-contact-action--email"
              href={contact.emailHref}
            >
              <span aria-hidden="true"><ContactIcon kind="email" /></span>
              {model.emailLabel}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
