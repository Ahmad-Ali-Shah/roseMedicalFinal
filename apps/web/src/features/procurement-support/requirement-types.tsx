import type { ReactElement } from "react";
import { Reveal } from "@/features/motion";
import { NumberedEditorialList } from "@/features/public-editorial";
import { REQUIREMENT_TYPES } from "./procurement-support.data";

export function RequirementTypes(): ReactElement {
  return (
    <Reveal direction="up" delay={0.05}>
      <NumberedEditorialList
        items={REQUIREMENT_TYPES}
        ariaLabel="Common requirement types"
        kind="requirement-type"
        className="requirement-types"
      />
    </Reveal>
  );
}
