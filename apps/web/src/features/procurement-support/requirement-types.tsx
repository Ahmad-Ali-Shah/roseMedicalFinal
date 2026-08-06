import type { ReactElement } from "react";
import { Reveal } from "@/features/motion";
import { NumberedEditorialList } from "@/features/public-editorial";
import type { PublicLocale } from "@/features/localization";
import { REQUIREMENT_TYPES, REQUIREMENT_TYPES_AR } from "./procurement-support.data";

export function RequirementTypes({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  return (
    <Reveal direction="up" delay={0.05}>
      <NumberedEditorialList
        items={ar ? REQUIREMENT_TYPES_AR : REQUIREMENT_TYPES}
        ariaLabel={ar ? "أنواع المتطلبات الشائعة" : "Common requirement types"}
        kind="requirement-type"
        className="requirement-types"
      />
    </Reveal>
  );
}
