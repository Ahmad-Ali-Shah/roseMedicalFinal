"use client";

import type { ReactElement } from "react";
import type { PublicLocale } from "@/features/localization/locales";

export function FamilyNoResultsState({ onReset = () => undefined, locale = "en" }: { onReset?: () => void; locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  return (
    <div className="family-no-results-state" aria-label={ar ? "لا توجد منتجات مطابقة" : "No matching products"}>
      <p className="public-eyebrow">{ar ? "لا توجد منتجات مطابقة" : "No matching products"}</p>
      <h2>{ar ? "لا توجد أدوات تطابق عوامل التصفية." : "No instruments match these filters."}</h2>
      <p>{ar ? "امسح عوامل التصفية أو ابحث برمز منتج من الكتالوج." : "Clear the active filters or search by a product code from the catalogue."}</p>
      <button className="button button--primary button--standard" type="button" onClick={onReset}>
        {ar ? "مسح عوامل التصفية" : "Clear filters"}
      </button>
    </div>
  );
}
