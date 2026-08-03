import type { ReactElement } from "react";
import { Reveal } from "@/features/motion";
import { NumberedEditorialList } from "@/features/public-editorial";
import { PROCUREMENT_STEPS } from "./procurement-support.data";

export function ProcurementProcess(): ReactElement {
  return (
    <Reveal direction="up" delay={0.05}>
      <NumberedEditorialList
        items={PROCUREMENT_STEPS}
        ariaLabel="Procurement process"
        kind="procurement-step"
        className="procurement-process"
      />
    </Reveal>
  );
}
