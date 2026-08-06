import type { ReactElement } from "react";
import { MediaFrame, Stagger, StaggerItem } from "@/features/motion";
import type { PublicLocale } from "@/features/localization";
import { publicMediaAlt, SUPPORTED_BUYER_MEDIA } from "@/features/public-media";
import { SUPPORTED_BUYERS, SUPPORTED_BUYERS_AR } from "./about.data";

export function SupportedBuyers({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  const buyers = ar ? SUPPORTED_BUYERS_AR : SUPPORTED_BUYERS;
  return (
    <Stagger as="ol" className="supported-buyers" aria-label={ar ? "فئات المشترين" : "Buyer groups"} interval={0.065}>
      {buyers.map((buyer) => {
        const media = SUPPORTED_BUYER_MEDIA[buyer.mediaKey];
        return (
        <StaggerItem
          as="li"
          key={buyer.sequence}
          data-supported-buyer={buyer.sequence}
          className="supported-buyers__item"
        >
          <MediaFrame
            src={media.src}
            alt={publicMediaAlt(media, locale)}
            aspect="portrait"
            focalPoint={media.focalPoint}
            fit={media.fit}
            tone="dark"
            overlay="dark"
            mediaSlot={`about-buyer-${buyer.mediaKey}`}
            className="supported-buyers__media"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="supported-buyers__content" data-supported-buyer-media={buyer.mediaKey}>
            <span aria-hidden="true">{buyer.sequence}</span>
            <h3>{buyer.title}</h3>
          </div>
        </StaggerItem>
      );})}
    </Stagger>
  );
}
