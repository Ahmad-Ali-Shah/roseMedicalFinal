import type { ReactElement } from "react";
import type { PublicLocale } from "@/features/localization/locales";
import { LocalizedButtonLink } from "@/features/localization";

export function CatalogueGuidance({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  return (
    <aside className="catalogue-guidance" aria-labelledby="catalogue-guidance-title">
      <div>
        <p className="catalogue-guidance__eyebrow">{ar ? "من PDF إلى عرض السعر" : "From PDF to quotation"}</p>
        <h2 id="catalogue-guidance-title">
          {ar ? "هل وجدت رمز منتج في أحد الكتالوجات؟" : "Found a product code in a catalogue?"}
        </h2>
        <p>
          {ar ? "ابحث عن الرمز في الموقع أو أضفه مباشرة إلى طلب عرض سعر عام." : "Search the code online or include it directly in a general quotation request."}
        </p>
      </div>
      <div className="catalogue-guidance__actions">
        <LocalizedButtonLink href="/search" variant="secondary">{ar ? "ابحث في المنتجات" : "Search products"}</LocalizedButtonLink>
        <LocalizedButtonLink href="/request-quotation">{ar ? "ابدأ طلب عرض سعر" : "Start a quotation request"}</LocalizedButtonLink>
      </div>
    </aside>
  );
}
