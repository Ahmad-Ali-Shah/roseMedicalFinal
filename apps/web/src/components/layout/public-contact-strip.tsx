import type { ReactElement } from "react";
import { LocalizedText } from "@/features/localization";
import { Reveal, Stagger, StaggerItem } from "@/features/motion";
import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";
import { SocialLinksRow } from "@/features/social-links";
import { Container } from "./container";

export function PublicContactStrip(): ReactElement {
  const contact = PUBLIC_CONTENT_VALUES.contactDetails;

  return (
    <Reveal
      as="aside"
      className="public-contact-strip"
      aria-labelledby="public-contact-strip-title"
      direction="up"
    >
      <Container className="public-contact-strip__inner" size="wide">
        <Stagger className="public-contact-strip__content" interval={0.065}>
          <StaggerItem className="public-contact-strip__socials">
            <p className="public-contact-strip__label">
              <LocalizedText en="Follow Rosa" ar="تابع روزا" />
            </p>
            <SocialLinksRow className="public-contact-strip__social-links" />
          </StaggerItem>

          <StaggerItem className="public-contact-strip__message-cell">
            <h2 id="public-contact-strip-title" className="public-contact-strip__message">
              <LocalizedText en="Contact us" ar="تواصل معنا" />
            </h2>
          </StaggerItem>

          <StaggerItem className="public-contact-strip__details-cell">
            <address className="public-contact-strip__details">
              <a href={contact.emailHref}>
                <span className="public-contact-strip__label">
                  <LocalizedText en="Email" ar="البريد الإلكتروني" />
                </span>
                <bdi dir="ltr">{contact.email}</bdi>
              </a>
              <a href={contact.phoneHref}>
                <span className="public-contact-strip__label">
                  <LocalizedText en="Telephone" ar="الهاتف" />
                </span>
                <bdi dir="ltr">{contact.phone}</bdi>
              </a>
            </address>
          </StaggerItem>
        </Stagger>
      </Container>
    </Reveal>
  );
}
