"use client";

import { useEffect, useState } from "react";
import { getLocaleFromPathname } from "@/features/localization/locales";

export default function RootError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [ar, setAr] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setAr(getLocaleFromPathname(window.location.pathname) === "ar");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <main id="main-content" className="application-state application-state--error">
      <div className="application-state__inner">
        <p className="page-eyebrow">{ar ? "حدث خطأ" : "Something went wrong"}</p>
        <h1>{ar ? "تعذر عرض هذه الصفحة." : "We could not display this page."}</h1>
        <p>{ar ? "حاول تنفيذ الطلب مرة أخرى. لن تؤدي هذه الشاشة إلى حذف استفسار المنتجات المحفوظ محليًا." : "Try the request again. Your locally saved product inquiry is not removed by this screen."}</p>
        <div className="application-state__actions">
          <button className="button button--primary button--standard" type="button" onClick={reset}>{ar ? "حاول مرة أخرى" : "Try again"}</button>
          <a className="button button--secondary button--standard" href={ar ? "/ar" : "/"}>{ar ? "العودة إلى الرئيسية" : "Return home"}</a>
        </div>
      </div>
    </main>
  );
}
