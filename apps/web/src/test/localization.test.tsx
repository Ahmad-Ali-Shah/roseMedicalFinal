import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Homepage } from "@/features/homepage/homepage";
import { AboutPage } from "@/features/about";
import { ProcurementSupportPage } from "@/features/procurement-support";
import { ContactInformationPanel } from "@/features/contact-preview";
import { localizePath, parseLocaleSegments } from "@/features/localization/locales";

describe("public localization", () => {
  it("parses Arabic route prefixes without changing catalogue segments", () => {
    expect(parseLocaleSegments(["ar", "products", "knives"])).toEqual({
      locale: "ar",
      segments: ["products", "knives"]
    });
    expect(parseLocaleSegments(["products", "knives"])).toEqual({
      locale: "en",
      segments: ["products", "knives"]
    });
  });

  it("prefixes and removes locale paths deterministically", () => {
    expect(localizePath("/products/knives", "ar")).toBe("/ar/products/knives");
    expect(localizePath("/ar/products/knives", "en")).toBe("/products/knives");
    expect(localizePath("/", "ar")).toBe("/ar");
  });

  it("renders a genuinely localized Arabic homepage model", () => {
    const html = renderToStaticMarkup(<Homepage locale="ar" />);
    expect(html).toContain("أدوات دقيقة. ومشتريات أكثر وضوحًا.");
    expect(html).toContain("عائلات المنتجات");
    expect(html).toContain("اطلب عرض سعر");
    expect(html).toContain('alt="أدوات جراحية مرتبة على سطح أزرق معقم"');
    expect(html).toContain('alt="يد مرتدية قفازًا تمسك بشفرة جراحية دقيقة"');
    expect(html).not.toContain('alt="A gloved hand holding a precision surgical blade"');
  });

  it("keeps the Arabic story and contact journeys localized beyond the homepage", () => {
    const about = renderToStaticMarkup(<AboutPage locale="ar" />);
    const procurement = renderToStaticMarkup(<ProcurementSupportPage locale="ar" />);
    const contact = renderToStaticMarkup(<ContactInformationPanel locale="ar" />);

    expect(about).toContain("وضوح أكبر لاختيار الأدوات الطبية");
    expect(about).toContain("المستشفيات والعيادات");
    expect(about).toContain('alt="فريق جراحي يمرر أداة داخل غرفة العمليات"');
    expect(about).not.toContain('alt="A surgical team passing an instrument in theatre"');
    expect(procurement).toContain("ست خطوات عملية");
    expect(procurement).toContain("إرسال بيانات التواصل");
    expect(contact).toContain("طريق الملك فهد");
    expect(contact).not.toContain("Example contact details");
  });
});
