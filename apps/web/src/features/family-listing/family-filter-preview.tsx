"use client";

import type { ReactElement } from "react";
import type { PublicLocale } from "@/features/localization/locales";

export interface FamilyFilterValues {
  size: string;
  direction: string;
  variant: string;
}

export interface FamilyFilterOptions {
  sizes: readonly string[];
  directions: readonly string[];
  variants: readonly string[];
}

const DEFAULT_OPTIONS: FamilyFilterOptions = {
  sizes: ["14.5 cm"],
  directions: ["Straight", "Curved"],
  variants: ["Standard"]
};

export function FamilyFilterPreview({
  values = { size: "", direction: "", variant: "" },
  options = DEFAULT_OPTIONS,
  onChange = () => undefined,
  onClear = () => undefined,
  locale = "en"
}: {
  values?: FamilyFilterValues;
  options?: FamilyFilterOptions;
  onChange?: (key: keyof FamilyFilterValues, value: string) => void;
  onClear?: () => void;
  locale?: PublicLocale;
}): ReactElement {
  const ar = locale === "ar";
  const rows = [
    ["size", ar ? "المقاس" : "Size", ar ? "كل المقاسات" : "All sizes", options.sizes],
    ["direction", ar ? "الاتجاه" : "Direction", ar ? "كل الاتجاهات" : "All directions", options.directions],
    ["variant", ar ? "الخيار" : "Variant", ar ? "كل الخيارات" : "All variants", options.variants]
  ] as const;

  return (
    <aside className="family-filter-preview" aria-label="Product filters">
      <p className="public-eyebrow">{ar ? "تصفية المنتجات" : "Filter products"}</p>
      <div className="family-filter-preview__fields">
        {rows.map(([key, label, emptyLabel, choices]) => (
          <label className="family-filter-preview__row" key={key}>
            <span>{label}</span>
            <select value={values[key]} onChange={(event) => onChange(key, event.currentTarget.value)}>
              <option value="">{emptyLabel}</option>
              {choices.map((choice) => <option value={choice} key={choice}>{choice}</option>)}
            </select>
          </label>
        ))}
      </div>
      <button className="filter-clear-action" type="button" onClick={onClear}>{ar ? "مسح عوامل التصفية" : "Clear filters"}</button>
    </aside>
  );
}
