import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Homepage } from "@/features/homepage/homepage";
import { AboutPage } from "@/features/about";
import { ProcurementSupportPage } from "@/features/procurement-support";
import { ContactInformationPanel } from "@/features/contact-preview";
import { localizePath, parseLocaleSegments } from "@/features/localization/locales";
import { renderServerComponent } from "@/test/render-server-component";

describe("public localization", () => {
  it("parses Arabic route prefixes without changing catalogue segments", () => {
    expect(parseLocaleSegments(["ar", "products", "knives"])).toEqual({ locale: "ar", segments: ["products", "knives"] });
    expect(parseLocaleSegments(["products", "knives"])).toEqual({ locale: "en", segments: ["products", "knives"] });
  });

  it("prefixes and removes locale paths deterministically", () => {
    expect(localizePath("/products/knives", "ar")).toBe("/ar/products/knives");
    expect(localizePath("/ar/products/knives", "en")).toBe("/products/knives");
    expect(localizePath("/", "ar")).toBe("/ar");
  });

  it("renders the redesigned Arabic homepage model", async () => {
    const html = await renderServerComponent(<Homepage locale="ar" />);
    expect(html).toContain("\u0623\u062f\u0648\u0627\u062a \u062f\u0642\u064a\u0642\u0629. \u0648\u0645\u0634\u062a\u0631\u064a\u0627\u062a \u0623\u0643\u062b\u0631 \u0648\u0636\u0648\u062d\u064b\u0627.");
    expect(html).toContain("\u0645\u062c\u0645\u0648\u0639\u0629 \u0645\u0646\u062a\u062c\u0627\u062a\u0646\u0627");
    expect(html).toContain("\u062e\u0637\u0637 \u0634\u0627\u0645\u0644\u0629");
    expect(html).toContain("\u062a\u0631\u0633\u064a\u062e \u0627\u0644\u062b\u0642\u0629");
    expect(html).toContain("\u062e\u062f\u0645\u0627\u062a \u062a\u062f\u0639\u0645 \u0646\u062c\u0627\u062d \u0639\u0645\u0644\u0627\u0626\u0646\u0627");
    expect(html).toContain("\u0627\u0637\u0644\u0628 \u0639\u0631\u0636 \u0633\u0639\u0631");
    expect(html).toContain('alt="\u064a\u062f \u0645\u0631\u062a\u062f\u064a\u0629 \u0642\u0641\u0627\u0632\u064b\u0627 \u062a\u062e\u062a\u0627\u0631 \u0623\u062f\u0627\u0629 \u062c\u0631\u0627\u062d\u064a\u0629 \u0645\u0646 \u0645\u062c\u0645\u0648\u0639\u0629 \u0645\u0631\u062a\u0628\u0629"');
    expect(html).not.toContain('alt="Gloved hand selecting a surgical instrument from an arranged set"');
  });

  it("keeps the Arabic story and contact journeys localized beyond the homepage", () => {
    const about = renderToStaticMarkup(<AboutPage locale="ar" />);
    const procurement = renderToStaticMarkup(<ProcurementSupportPage locale="ar" />);
    const contact = renderToStaticMarkup(<ContactInformationPanel locale="ar" />);
    expect(about).toContain("\u0648\u0636\u0648\u062d \u0623\u0643\u0628\u0631 \u0644\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0623\u062f\u0648\u0627\u062a \u0627\u0644\u0637\u0628\u064a\u0629");
    expect(about).toContain("\u0627\u0644\u0645\u0633\u062a\u0634\u0641\u064a\u0627\u062a \u0648\u0627\u0644\u0639\u064a\u0627\u062f\u0627\u062a");
    expect(about).toContain('alt="\u0641\u0631\u064a\u0642 \u062c\u0631\u0627\u062d\u064a \u064a\u0645\u0631\u0631 \u0623\u062f\u0627\u0629 \u062f\u0627\u062e\u0644 \u063a\u0631\u0641\u0629 \u0627\u0644\u0639\u0645\u0644\u064a\u0627\u062a"');
    expect(about).not.toContain('alt="A surgical team passing an instrument in theatre"');
    expect(procurement).toContain("\u0633\u062a \u062e\u0637\u0648\u0627\u062a \u0639\u0645\u0644\u064a\u0629");
    expect(procurement).toContain("\u0625\u0631\u0633\u0627\u0644 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062a\u0648\u0627\u0635\u0644");
    expect(contact).toContain("\u0637\u0631\u064a\u0642 \u0627\u0644\u0645\u0644\u0643 \u0641\u0647\u062f");
    expect(contact).not.toContain("Example contact details");
  });
});
