import { LocalizedText } from "@/features/localization";

export default function Loading() {
  return (
    <main id="main-content" className="application-loading" aria-busy="true" aria-label="Loading page / جارٍ تحميل الصفحة">
      <div className="application-loading__inner">
        <span className="application-loading__mark" aria-hidden="true">ROSA</span>
        <span className="application-loading__line" aria-hidden="true" />
        <p><LocalizedText en="Loading catalogue…" ar="جارٍ تحميل الكتالوج…" /></p>
      </div>
    </main>
  );
}
