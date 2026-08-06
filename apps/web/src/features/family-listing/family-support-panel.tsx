import type { ReactElement } from "react";
import { ProcurementPanel } from "@/features/public-catalogue";
import type { PublicLocale } from "@/features/localization/locales";

export function FamilySupportPanel({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  return (
    <ProcurementPanel
      eyebrow={ar ? "دعم المشتريات" : "Procurement support"}
      title={ar ? "هل تحتاج مساعدة في تحديد أداة؟" : "Need help identifying an instrument?"}
      copy={ar ? "أرسل طلبًا عامًا مع مرجع الكتالوج أو وصف موجز." : "Send a general request with the catalogue reference or a concise description."}
      primary={{ label: ar ? "اطلب الدعم" : "Request support", href: "/contact" }}
      tone="dark"
    />
  );
}
