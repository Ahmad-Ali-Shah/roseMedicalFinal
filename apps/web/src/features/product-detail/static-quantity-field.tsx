"use client";

import type { ReactElement } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/features/localization/locales";

export function StaticQuantityField({
  value,
  onChange,
  minimum = 1,
  maximum = 999
}: {
  value: number;
  onChange: (value: number) => void;
  minimum?: number;
  maximum?: number;
}): ReactElement {
  const ar = getLocaleFromPathname(usePathname()) === "ar";
  return (
    <div className="static-quantity-field" aria-label={ar ? "اختيار الكمية" : "Quantity selector"}>
      <span className="static-quantity-field__label">{ar ? "الكمية" : "Quantity"}</span>
      <div className="static-quantity-field__controls">
        <button
          type="button"
          disabled={value <= minimum}
          aria-label={ar ? "تقليل الكمية" : "Decrease quantity"}
          onClick={() => onChange(Math.max(minimum, value - 1))}
        >−</button>
        <output aria-label={ar ? "الكمية المحددة" : "Selected quantity"}>{value}</output>
        <button
          type="button"
          disabled={value >= maximum}
          aria-label={ar ? "زيادة الكمية" : "Increase quantity"}
          onClick={() => onChange(Math.min(maximum, value + 1))}
        >+</button>
      </div>
    </div>
  );
}
