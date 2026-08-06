"use client";

import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { LocalizedButtonLink, getLocaleFromPathname } from "@/features/localization";
import { usePathname } from "next/navigation";

export function QuotationBlockedPage(): ReactElement {
  const ar = getLocaleFromPathname(usePathname()) === "ar";
  return (
    <Section tone="paper" className="quotation-blocked-page">
      <Container size="reading">
        <p className="quotation-blocked-page__eyebrow">{ar ? "طلب عرض سعر" : "Request quotation"}</p>
        <h1>{ar ? "حدد الأدوات قبل طلب عرض السعر." : "Select instruments before requesting a quotation."}</h1>
        <p>
          {ar ? "تُجمع بيانات الاتصال وملاحظات المشتريات بعد أن تحتوي قائمة الاستفسار على أداة واحدة على الأقل. لا يمكن إرسال طلب فارغ." : "Contact details and procurement notes are collected after an inquiry list contains at least one instrument. No submission is available from an empty request."}
        </p>
        <div className="quotation-blocked-page__actions">
          <LocalizedButtonLink href="/products">{ar ? "استعرض المنتجات" : "Browse products"}</LocalizedButtonLink>
          <LocalizedButtonLink href="/catalogues" variant="secondary">{ar ? "عرض الكتالوجات" : "View catalogues"}</LocalizedButtonLink>
          <LocalizedButtonLink href="/inquiry" variant="quiet">{ar ? "راجع الاستفسار" : "Review inquiry"}</LocalizedButtonLink>
        </div>
      </Container>
    </Section>
  );
}
