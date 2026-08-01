import type { ReactElement } from "react";
import { NumberedEditorialList } from "@/features/public-editorial";
import { REQUIREMENT_TYPES } from "./procurement-support.data";

export function RequirementTypes(): ReactElement {
  return (
    <NumberedEditorialList
      items={REQUIREMENT_TYPES}
      ariaLabel="Common requirement types"
      kind="requirement-type"
      className="requirement-types"
    />
  );
}
