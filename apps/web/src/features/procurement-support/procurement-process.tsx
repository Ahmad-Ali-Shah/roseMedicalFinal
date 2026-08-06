import type { ReactElement } from "react";
import { Reveal } from "@/features/motion";
import { NumberedEditorialList } from "@/features/public-editorial";
import type { PublicLocale } from "@/features/localization";
import { PROCUREMENT_STEPS, PROCUREMENT_STEPS_AR } from "./procurement-support.data";

export function ProcurementProcess({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  return (
    <Reveal direction="up" delay={0.05}>
      <NumberedEditorialList
        items={ar ? PROCUREMENT_STEPS_AR : PROCUREMENT_STEPS}
        ariaLabel={ar ? "مسار المشتريات" : "Procurement process"}
        kind="procurement-step"
        className="procurement-process"
      />
    </Reveal>
  );
}
