import type { ReactElement } from "react";
import { INFORMATION_CHECKLIST } from "./procurement-support.data";

export function InformationChecklist(): ReactElement {
  return (
    <ol className="information-checklist" aria-label="Information that helps">
      {INFORMATION_CHECKLIST.map((item, index) => (
        <li key={item} data-information-item={item}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
        </li>
      ))}
    </ol>
  );
}
