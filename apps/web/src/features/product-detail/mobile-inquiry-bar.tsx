import type { ReactElement } from "react";
import { AddToInquiryButton, type InquiryItem } from "@/features/inquiry";

export function MobileInquiryBar({ item }: { item: InquiryItem }): ReactElement {
  return (
    <aside
      className="mobile-inquiry-bar"
      aria-label="Inquiry action"
      data-motion="mobile-inquiry-bar"
    >
      <span>Quotation required</span>
      <AddToInquiryButton
        item={item}
        className="button button--primary button--standard"
      />
    </aside>
  );
}
