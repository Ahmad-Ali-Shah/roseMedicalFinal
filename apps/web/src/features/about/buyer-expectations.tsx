import type { ReactElement } from "react";
import { Reveal } from "@/features/motion";
import { NumberedEditorialList } from "@/features/public-editorial";
import { BUYER_EXPECTATIONS } from "./about.data";

export function BuyerExpectations(): ReactElement {
  return (
    <Reveal direction="up" delay={0.05}>
      <NumberedEditorialList
        items={BUYER_EXPECTATIONS}
        ariaLabel="What buyers can expect"
        kind="buyer-expectation"
        className="buyer-expectations"
      />
    </Reveal>
  );
}
