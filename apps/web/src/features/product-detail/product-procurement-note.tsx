import Link from "next/link";
import type { ReactElement } from "react";
import type { PublicLocale } from "@/features/localization/locales";

export function ProductProcurementNote({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  return (
    <aside className="product-procurement-note" aria-labelledby="product-note-title">
      <div>
        <p className="public-eyebrow">{ar ? "ملاحظة المشتريات" : "Procurement note"}</p>
        <h2 id="product-note-title">{ar ? "هل تحتاج مقاسًا أو تشطيبًا أو تعبئة مختلفة؟" : "Need another size, finish or packing configuration?"}</h2>
        <p>{ar ? "أضف أقرب خيار مدرج ثم صف المتطلب الدقيق في ملاحظة البند." : "Add the closest listed option, then describe the exact requirement in the line note."}</p>
      </div>
      <Link className="button button--secondary button--standard" href="#product-inquiry-note">
        {ar ? "أضف ملاحظة للمتطلب" : "Add a requirement note"}
      </Link>
    </aside>
  );
}
