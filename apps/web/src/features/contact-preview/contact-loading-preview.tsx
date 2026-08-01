import type { ReactElement } from "react";
import { Button } from "@/components/ui";

export function ContactLoadingPreview(): ReactElement {
  return (
    <section className="contact-loading-preview" data-preview-only="true" aria-labelledby="contact-loading-title">
      <p className="page-eyebrow">Loading preview</p>
      <h2 id="contact-loading-title">Sending preview</h2>
      <p>This isolated state demonstrates duplicate-submission protection without sending data.</p>
      <Button disabled>Sending…</Button>
    </section>
  );
}
