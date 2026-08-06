import type { ReactElement } from "react";
import { Stagger, StaggerItem } from "@/features/motion";
import type { PublicLocale } from "@/features/localization";
import { INFORMATION_CHECKLIST, INFORMATION_CHECKLIST_AR } from "./procurement-support.data";

export function InformationChecklist({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  const items = ar ? INFORMATION_CHECKLIST_AR : INFORMATION_CHECKLIST;
  return (
    <Stagger as="ol" className="information-checklist" aria-label={ar ? "معلومات تساعد على المراجعة" : "Information that helps"} interval={0.05}>
      {items.map((item, index) => (
        <StaggerItem as="li" key={item} data-information-item={item}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
