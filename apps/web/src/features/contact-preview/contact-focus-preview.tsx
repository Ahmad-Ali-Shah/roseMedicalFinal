import type { ReactElement } from "react";
import { ContactFieldPreview } from "./contact-field-preview";

export function ContactFocusPreview(): ReactElement {
  return (
    <section data-preview-only="true" aria-labelledby="contact-focus-title">
      <h2 id="contact-focus-title">Focus example</h2>
      <ContactFieldPreview
        id="contact-focused-email"
        label="Email"
        placeholder="Business email"
        focused
      />
    </section>
  );
}
