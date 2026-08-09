import type { ReactElement } from "react";
import { CONTACT_INFORMATION, type ContactInformationRow } from "./contact-information-model";
import type { PublicLocale } from "@/features/localization";

export function ContactInformationPanel({
  locale = "en",
  rows = CONTACT_INFORMATION
}: {
  locale?: PublicLocale;
  rows?: readonly ContactInformationRow[];
}): ReactElement {
  const ar = locale === "ar";
  return (
    <aside className="contact-information-panel" aria-labelledby="contact-information-title">
      <p className="page-eyebrow">{ar ? "بيانات الاتصال" : "Contact details"}</p>
      <h2 id="contact-information-title">{ar ? "تواصل مع روزا ميديكال." : "Reach Rosa Medical."}</h2>
      <dl>
        {rows.map((row) => (
          <div key={row.label} data-contact-information={row.label}>
            <dt>{ar ? row.labelAr : row.label}</dt>
            <dd data-confirmed={row.confirmed ? "true" : "false"} dir={row.ltr ? "ltr" : undefined}>
              {row.href ? (
                <a href={row.href} target={row.external ? "_blank" : undefined} rel={row.external ? "noreferrer" : undefined}>
                  {ar ? row.valueAr ?? row.value : row.value}
                </a>
              ) : ar ? row.valueAr ?? row.value : row.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="contact-information-panel__note">
        {ar ? "للاستفسارات المتعلقة بالمنتجات، أرفق الرموز والكميات لتسريع المراجعة." : "For product inquiries, include product codes and quantities to support a faster review."}
      </p>
    </aside>
  );
}
