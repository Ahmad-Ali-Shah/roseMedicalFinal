import type { ReactElement } from "react";
import { LocalizedText } from "@/features/localization";
import type { PublicLocale } from "@/features/localization";

export const RIYADH_MAP = {
  latitude: 24.7136,
  longitude: 46.6753,
  embedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=46.6100%2C24.6650%2C46.7400%2C24.7620&layer=mapnik&marker=24.7136%2C46.6753",
  fallbackUrl: "https://www.openstreetmap.org/?mlat=24.7136&mlon=46.6753#map=13/24.7136/46.6753"
} as const;

export function RiyadhMap({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  return (
    <section className="riyadh-map" aria-labelledby="riyadh-map-title">
      <div className="riyadh-map__heading">
        <div>
          <p className="page-eyebrow"><LocalizedText en="Location" ar="الموقع" /></p>
          <h2 id="riyadh-map-title"><LocalizedText en="Riyadh, Saudi Arabia" ar="الرياض، المملكة العربية السعودية" /></h2>
        </div>
        <a href={RIYADH_MAP.fallbackUrl} target="_blank" rel="noreferrer">
          <LocalizedText en="Open larger map ↗" ar="افتح الخريطة المكبرة ↗" />
        </a>
      </div>
      <iframe
        className="riyadh-map__frame"
        src={RIYADH_MAP.embedUrl}
        title={ar ? "خريطة توضح موقع الرياض في المملكة العربية السعودية" : "Map showing Riyadh, Saudi Arabia"}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
