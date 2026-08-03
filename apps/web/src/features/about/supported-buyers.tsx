import type { ReactElement } from "react";
import { Stagger, StaggerItem } from "@/features/motion";
import { SUPPORTED_BUYERS } from "./about.data";

export function SupportedBuyers(): ReactElement {
  return (
    <Stagger as="ol" className="supported-buyers" aria-label="Buyer groups" interval={0.065}>
      {SUPPORTED_BUYERS.map((buyer, index) => (
        <StaggerItem
          as="li"
          key={buyer.sequence}
          data-supported-buyer={buyer.sequence}
          className={index % 2 === 0 ? "supported-buyers__item supported-buyers__item--dark" : "supported-buyers__item"}
        >
          <span aria-hidden="true">{buyer.sequence}</span>
          <h3>{buyer.title}</h3>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
