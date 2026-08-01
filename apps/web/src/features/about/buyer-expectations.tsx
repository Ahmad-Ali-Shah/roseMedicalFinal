import type { ReactElement } from "react";
import { NumberedEditorialList } from "@/features/public-editorial";
import { BUYER_EXPECTATIONS } from "./about.data";

export function BuyerExpectations(): ReactElement {
  return (
    <NumberedEditorialList
      items={BUYER_EXPECTATIONS}
      ariaLabel="What buyers can expect"
      kind="buyer-expectation"
      className="buyer-expectations"
    />
  );
}
