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

  it("renders the redesigned Arabic homepage model", async () => {
    const html = await renderServerComponent(<Homepage locale="ar" />);
    expect(html).toContain("Ø£Ø¯ÙˆØ§Øª Ø¯Ù‚ÙŠÙ‚Ø©. ÙˆÙ…Ø´ØªØ±ÙŠØ§Øª Ø£ÙƒØ«Ø± ÙˆØ¶ÙˆØ­Ù‹Ø§.");
    expect(html).toContain("Ù…Ø¬Ù…ÙˆØ¹Ø© Ù…Ù†ØªØ¬Ø§ØªÙ†Ø§");
    expect(html).toContain("Ø®Ø·Ø· Ø´Ø§Ù…Ù„Ø©");
    expect(html).toContain("ØªØ±Ø³ÙŠØ® Ø§Ù„Ø«Ù‚Ø©");
    expect(html).toContain("Ø®Ø¯Ù…Ø§Øª ØªØ¯Ø¹Ù… Ù†Ø¬Ø§Ø­ Ø¹Ù…Ù„Ø§Ø¦Ù†Ø§");
    expect(html).toContain("Ø§Ø·Ù„Ø¨ Ø¹Ø±Ø¶ Ø³Ø¹Ø±");
    expect(html).toContain('alt="ÙŠØ¯ Ù…Ø±ØªØ¯ÙŠØ© Ù‚ÙØ§Ø²Ù‹Ø§ ØªØ®ØªØ§Ø± Ø£Ø¯Ø§Ø© Ø¬Ø±Ø§Ø­ÙŠØ© Ù…Ù† Ù…Ø¬Ù…ÙˆØ¹Ø© Ù…Ø±ØªØ¨Ø©"');
    expect(html).not.toContain('alt="Gloved hand selecting a surgical instrument from an arranged set"');
  });

  it("keeps the Arabic story and contact journeys localized beyond the homepage", () => {
    const about = renderToStaticMarkup(<AboutPage locale="ar" />);
    const procurement = renderToStaticMarkup(<ProcurementSupportPage locale="ar" />);
    const contact = renderToStaticMarkup(<ContactInformationPanel locale="ar" />);

    expect(about).toContain("ÙˆØ¶ÙˆØ­ Ø£ÙƒØ¨Ø± Ù„Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ø£Ø¯ØˆØ§Øª Ø§Ù„Ø·Ø¨ÙŠØ©");
    expect(about).toContain("Ø§Ù„Ù…Ø³ØªØ´ÙÙ¶)ö*ˆ6b6)öa6.vmŠ}ŠıŠ}Š¢"“°¢W‡V7B†&÷WB’ææ÷BçFô6öçF–â‚vÇCÒ$7W&v–6ÂFVÒ76–ærâ–ç7G'VÖVçB–âF†VG&R"r“°¢W‡V7B‡&ö7W&VÖVçB’çFô6öçF–â‚-‹=Š¢Ší‹}˜Š}Š¢‹˜]˜M˜­Š’"“°¢W‡V7B‡&ö7W&VÖVçB’çFô6öçF–â‚-Š]‹‹=Š}˜BŠ˜­Š}˜mŠ}Š¢Š}˜MŠ­˜Š}‹]˜B"“°¢W‡V7B†6öçF7B’çFô6öçF–â‚-‹}‹˜­˜"Š}˜M˜]˜M˜2˜˜}Šò"“°¢W‡V7B†6öçF7B’ææ÷BçFô6öçF–â‚$W†×ÆR6öçF7BFWF–Ç2"“°¢Ò“°§Ò“° 