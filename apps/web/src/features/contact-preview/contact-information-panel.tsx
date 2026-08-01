import type { ReactElement } from "react";
import { CONTACT_INFORMATION } from "./contact-information-model";

export function ContactInformationPanel(): ReactElement {
  return (
    <aside className="contact-information-panel" aria-labelledby="contact-information-title">
      <p className="page-eyebrow">Contact details</p>
      <h2 id="contact-information-title">Reach Rosa Medical.</h2>
      <dl>
        {CONTACT_INFORMATION.map((row) => (
          <div key={row.label} data-contact-information={row.label}>
            <dt>{row.label}</dt>
            <dd data-confirmed={row.confirmed ? "true" : "false"}>{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="contact-information-panel__note">
        Unconfirmed contact details will be added after client verification.
      </p>
    </aside>
  );
}
