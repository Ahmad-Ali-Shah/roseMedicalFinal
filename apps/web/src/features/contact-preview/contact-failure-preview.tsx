import type { ReactElement } from "react";
import { Button } from "@/components/ui";

export function ContactFailurePreview(): ReactElement {
  return (
    <section className="contact-failure-preview" data-preview-only="true" aria-labelledby="contact-failure-title">
      <p className="page-eyebrow">Failure preview</p>
      <h2 id="contact-failure-title">Message not sent.</h2>
      <p>This isolated state shows preserved form information after a failed demonstration attempt.</p>
      <Button disabled>Try again</Button>
    </section>
  );
}
