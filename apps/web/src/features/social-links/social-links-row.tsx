import type { ReactElement } from "react";
import { LocalizedText, type PublicLocale } from "@/features/localization";
import { SocialIcon } from "./social-icon";
import { SOCIAL_LINKS } from "./social-links";

export function SocialLinksRow({
  locale,
  className = ""
}: {
  locale?: PublicLocale;
  className?: string;
}): ReactElement {
  const classes = ["social-links-row", className].filter(Boolean).join(" ");

  return (
    <ul className={classes} data-social-links>
      {SOCIAL_LINKS.map((item) => (
        <li key={item.platform}>
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            <span className="social-links-row__icon">
              <SocialIcon platform={item.platform} />
            </span>
            <span className="social-links-row__label">
              {locale === "en" ? item.label : locale === "ar" ? item.labelAr : (
                <LocalizedText en={item.label} ar={item.labelAr} />
              )}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
