import type { ReactElement } from "react";
import { Stagger, StaggerItem } from "@/features/motion";
import { INFORMATION_CHECKLIST } from "./procurement-support.data";

export function InformationChecklist(): ReactElement {
  return (
    <Stagger as="ol" className="information-checklist" aria-label="Information that helps" interval={0.05}>
      {INFORMATION_CHECKLIST.map((item, index) => (
        <StaggerItem as="li" key={item} data-information-item={item}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
