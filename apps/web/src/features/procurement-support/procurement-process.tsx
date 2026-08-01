import type { ReactElement } from "react";
import { NumberedEditorialList } from "@/features/public-editorial";
import { PROCUREMENT_STEPS } from "./procurement-support.data";

export function ProcurementProcess(): ReactElement {
  return (
    <NumberedEditorialList
      items={PROCUREMENT_STEPS}
      ariaLabel="Procurement process"
      kind="procurement-step"
      className="procurement-process"
    />
  );
}
