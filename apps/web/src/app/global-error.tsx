"use client";

import { useEffect, useState } from "react";
import { getLocaleFromPathname } from "@/features/localization/locales";

export default function GlobalError({
  unstable_retry
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const [ar, setAr] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setAr(getLocaleFromPathname(window.location.pathname) === "ar");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <html lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"} suppressHydrationWarning>
      <body>
        <main id="main-content" className="application-state application-state--error">
          <div className="application-state__inner">
            <p className="page-eyebrow">{ar ? "حدث خطأ" : "Something went wrong"}</p>
            <h1>{ar ? "تعذر عرض الموقع." : "We could not display the site."}</h1>
            <p>
              {ar
                ? "حاول تحميل الموقع مرة أخرى. لن يؤدي ذلك إلى حذف استفسار المنتجات المحفوظ محليًا."
                : "Try loading the site again. Your locally saved product inquiry is not removed."}
            </p>
            <div className="application-state__actions">
              <button
                className="button button--primary button--standard"
                type="button"
                onClick={unstable_retry}
              >
                {ar ? "حاول مرة أخرى" : "Try again"}
              </button>
              <a
                className="button button--secondary button--standard"
                href={ar ? "/ar" : "/"}
              >
                {ar ? "العودة إلى الرئيسية" : "Return home"}
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
