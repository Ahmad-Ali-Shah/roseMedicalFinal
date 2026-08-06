import type { ReactElement } from "react";
import { AddToInquiryButton, type InquiryItem } from "@/features/inquiry";
import { LocalizedText } from "@/features/localization";

export function MobileInquiryBar({ item }: { item: InquiryItem }): ReactElement {
  return (
    <aside
      className="mobile-inquiry-bar"
      aria-label="Inquiry action"
      data-motion="mobile-inquiry-bar"
    >
      <span><LocalizedText en="Quotation required" ar="يلزم عرض سعر" /></span>
      <AddToInquiryButton
        item={item}
        className="button button--primary button--standard"
      />
    </aside>
  );
}
