import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseUrl = process.env.ROSA_QA_BASE_URL ?? "http://127.0.0.1:3100";
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const screenshotDirectory = path.resolve(
  scriptDirectory,
  "../../../docs/superpowers/reports/screenshots/owner-refinement"
);
await mkdir(screenshotDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const failures = [];
const report = {
  baseUrl,
  screenshots: [],
  publicRoutes: [],
  interactions: {},
  admin: { protectedRoutes: [] }
};

function check(condition, message) {
  if (!condition) failures.push(message);
}

async function settle(page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(180);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(180);
}

async function inspectRoute(route, viewport, screenshotName) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  await settle(page);
  const measurements = await page.evaluate(() => ({
    finalPath: `${location.pathname}${location.search}`,
    mainCount: document.querySelectorAll("main").length,
    h1Count: document.querySelectorAll("h1").length,
    overflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
    brokenImages: [...document.images]
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src),
    emptyLinks: [...document.querySelectorAll("a")]
      .filter((link) => !link.textContent?.trim() && !link.getAttribute("aria-label"))
      .length
  }));

  const entry = {
    route,
    viewport,
    status: response?.status(),
    ...measurements,
    consoleErrors,
    pageErrors
  };
  report.publicRoutes.push(entry);
  check(response?.ok(), `${route} returned ${response?.status() ?? "no response"}`);
  check(measurements.finalPath === route, `${route} unexpectedly resolved to ${measurements.finalPath}`);
  check(measurements.mainCount === 1, `${route} rendered ${measurements.mainCount} main elements`);
  check(measurements.h1Count === 1, `${route} rendered ${measurements.h1Count} h1 elements`);
  check(measurements.overflow <= 1, `${route} overflows viewport by ${measurements.overflow}px`);
  check(measurements.brokenImages.length === 0, `${route} contains broken images: ${measurements.brokenImages.join(", ")}`);
  check(pageErrors.length === 0, `${route} raised page errors: ${pageErrors.join(" | ")}`);
  check(consoleErrors.length === 0, `${route} logged console errors: ${consoleErrors.join(" | ")}`);

  if (screenshotName) {
    const screenshotPath = path.join(screenshotDirectory, screenshotName);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    report.screenshots.push(screenshotPath);
  }

  return page;
}

const desktop = { width: 1440, height: 1000 };
const mobile = { width: 390, height: 844 };
const desktopRoutes = [
  ["/", "homepage-desktop.png"],
  ["/products", "products-desktop.png"],
  ["/catalogues", "catalogues-desktop.png"],
  ["/about", "about-desktop.png"],
  ["/procurement-support", "procurement-support-desktop.png"],
  ["/products/knives", null],
  ["/products/scissors", null],
  ["/products/punches", "punches-family-desktop.png"],
  ["/products/chisels", "chisels-family-desktop.png"],
  ["/products/cutters", null],
  ["/contact", null],
  ["/search", null]
];

for (const [route, screenshot] of desktopRoutes) {
  const page = await inspectRoute(route, desktop, screenshot);

  if (route === "/") {
    const familyOrder = await page.locator(".home-family-grid [data-family]").evaluateAll((cards) =>
      cards.map((card) => card.getAttribute("data-family"))
    );
    report.interactions.homeFamilyOrder = familyOrder;
    check(
      JSON.stringify(familyOrder) === JSON.stringify(["knives", "scissors", "cutters", "chisels", "punches"]),
      `Homepage family order is ${familyOrder.join(", ")}`
    );
    check(await page.locator('[data-media-slot="homepage-hero"][data-media-state="ready"]').count() === 1, "Homepage hero image is not ready");
    check(await page.locator('[data-media-slot="homepage-procurement"][data-media-state="ready"]').count() === 1, "Homepage Rosa logo image is not ready");
    check(await page.locator(".catalogue-card__document").count() === 0, "Homepage catalogue cards still contain a fake document layer");
    const heroPresentation = await page.locator('[data-media-slot="homepage-hero"]').evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      const fade = getComputedStyle(element.parentElement, "::after");
      return {
        rightGap: Math.abs(window.innerWidth - rect.right),
        borderWidth: style.borderWidth,
        fadeBackground: fade.backgroundImage,
        fadeMask: style.maskImage || style.webkitMaskImage
      };
    });
    report.interactions.homeHeroPresentation = heroPresentation;
    check(heroPresentation.rightGap <= 1, `Homepage hero stops ${heroPresentation.rightGap}px before the viewport edge`);
    check(heroPresentation.borderWidth === "0px", `Homepage hero still has a ${heroPresentation.borderWidth} frame`);
    check(heroPresentation.fadeBackground.includes("gradient"), "Homepage hero has no left-edge gradient fade");
    check(heroPresentation.fadeMask.includes("gradient"), "Homepage hero image has no progressive edge mask");
  }

  if (route === "/products") {
    const familyOrder = await page.locator(".products-family-grid [data-family]").evaluateAll((cards) =>
      cards.map((card) => card.getAttribute("data-family"))
    );
    report.interactions.productsFamilyOrder = familyOrder;
    check(
      JSON.stringify(familyOrder) === JSON.stringify(["knives", "scissors", "cutters", "chisels", "punches"]),
      `Products family order is ${familyOrder.join(", ")}`
    );

    const miniCards = page.locator(".catalogue-mini-card");
    const miniCardStates = [];
    for (let index = 0; index < await miniCards.count(); index += 1) {
      await page.mouse.move(2, 2);
      await page.waitForTimeout(80);
      const miniCard = miniCards.nth(index);
      const before = await miniCard.evaluate((element) => {
        const style = getComputedStyle(element);
        return { background: style.backgroundColor, color: style.color, transition: style.transitionDuration };
      });
      await miniCard.hover();
      await page.waitForTimeout(120);
      const during = await miniCard.evaluate((element) => getComputedStyle(element).backgroundColor);
      await page.waitForTimeout(260);
      const after = await miniCard.evaluate((element) => getComputedStyle(element).backgroundColor);
      miniCardStates.push({ before, during, after });
    }
    report.interactions.catalogueMiniCards = miniCardStates;
    check(miniCardStates.length === 5, `Expected five product catalogue cards, found ${miniCardStates.length}`);
    check(new Set(miniCardStates.map((state) => state.before.background)).size === 1, "Product catalogue cards do not share one neutral starting colour");
    check(new Set(miniCardStates.map((state) => state.after)).size === 1, "Product catalogue cards do not share one red hover colour");
    check(miniCardStates.every((state) => state.before.background !== state.after), "At least one product catalogue card is permanently red");
    check(miniCardStates.every((state) => state.during !== state.before.background && state.during !== state.after), "At least one product catalogue hover is not visibly transitional");
  }

  if (route === "/catalogues") {
    const catalogueCard = page.locator(".catalogue-document-card").first();
    const before = await catalogueCard.evaluate((element) => {
      const style = getComputedStyle(element);
      return { background: style.backgroundColor, color: style.color, transition: style.transitionDuration };
    });
    await catalogueCard.hover();
    await page.waitForTimeout(160);
    const during = await catalogueCard.evaluate((element) => getComputedStyle(element).backgroundColor);
    await page.waitForTimeout(280);
    const after = await catalogueCard.evaluate((element) => getComputedStyle(element).backgroundColor);
    report.interactions.catalogueDocumentCard = { before, during, after };
    check(before.background !== after, "Catalogue document card does not change colour on hover");
    check(during !== before.background && during !== after, "Catalogue document hover is not visibly transitional");
    check(await page.locator('.catalogue-document-cover [data-media-state="ready"]').count() === 5, "Technical catalogue cards do not expose five ready family images");
  }

  if (route === "/about") {
    const text = (await page.locator("main").innerText()).replace(/\s+/g, " ");
    check(text.includes("We are Rosa Medical."), "About company profile is missing");
    check(!text.includes("What buyers can expect"), "Removed buyer-expectations copy is still visible");
    check(!text.includes("Instrument evolution"), "Removed instrument-evolution copy is still visible");
    check(await page.locator('[data-supported-buyer-media]').count() === 4, "About page does not render four buyer photographs");
    check(await page.locator('[data-media-slot="about-hero"][data-media-state="ready"]').count() === 1, "About hero logo is not ready");
    const aboutLogo = await page.locator('[data-media-slot="about-hero"]').evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        borderWidth: style.borderWidth,
        aspectRatio: rect.width / rect.height
      };
    });
    report.interactions.aboutLogo = aboutLogo;
    check(aboutLogo.borderWidth === "0px", `About logo still has a ${aboutLogo.borderWidth} frame`);
    check(aboutLogo.aspectRatio > 0.96 && aboutLogo.aspectRatio < 1.04, `About logo aspect ratio is ${aboutLogo.aspectRatio}`);
  }

  if (route === "/procurement-support") {
    check(await page.locator('[data-media-slot="procurement-support-hero"][data-media-state="ready"]').count() === 1, "Procurement Support hero image is not ready");
    check(await page.locator('[data-procurement-route-panel="true"]').count() === 1, "Procurement route panel is missing");
  }

  if (route.startsWith("/products/") && route.split("/").length === 3) {
    const slug = route.split("/").at(-1);
    check(
      await page.locator(`[data-media-slot="family-${slug}-hero"][data-media-state="ready"]`).count() === 1,
      `${route} does not render a ready family hero image`
    );
  }

  await page.close();
}

const mobileRoutes = [
  ["/", "homepage-mobile.png"],
  ["/about", "about-mobile.png"],
  ["/catalogues", "catalogues-mobile.png"],
  ["/products/punches", "punches-family-mobile.png"],
  ["/products/chisels", "chisels-family-mobile.png"],
  ["/procurement-support", "procurement-support-mobile.png"]
];
for (const [route, screenshot] of mobileRoutes) {
  const page = await inspectRoute(route, mobile, screenshot);
  if (route.startsWith("/products/") && route.split("/").length === 3) {
    const slug = route.split("/").at(-1);
    check(
      await page.locator(`[data-media-slot="family-${slug}-hero"][data-media-state="ready"]`).count() === 1,
      `${route} does not render a ready family hero image on mobile`
    );
  }
  await page.close();
}

const quotationSeed = [{
  id: "04-0401",
  familySlug: "scissors",
  slug: "mayo-scissors",
  name: "Mayo Scissors",
  code: "04-0401",
  size: "17 cm",
  variant: "Straight · Blunt / blunt",
  quantity: 4,
  notes: ""
}];

for (const [viewport, screenshotName] of [[desktop, "quotation-desktop.png"], [mobile, "quotation-mobile.png"]]) {
  const page = await browser.newPage({ viewport });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.evaluate(([key, value]) => localStorage.setItem(key, JSON.stringify(value)), ["rosa-medical-inquiry-v1", quotationSeed]);
  const response = await page.goto(`${baseUrl}/request-quotation`, { waitUntil: "domcontentloaded" });
  await settle(page);
  const quotation = await page.evaluate(() => ({
    overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
    forms: document.querySelectorAll("form").length,
    fields: document.querySelectorAll(".quotation-field").length,
    summary: document.querySelectorAll('[data-quotation-summary="true"]').length,
    inputs: [...document.querySelectorAll("input, textarea")].map((field) => ({
      name: field.getAttribute("name"),
      width: field.getBoundingClientRect().width,
      height: field.getBoundingClientRect().height
    }))
  }));
  report.interactions[`quotation-${viewport.width}`] = { status: response?.status(), ...quotation };
  check(response?.ok(), `Quotation returned ${response?.status() ?? "no response"} at ${viewport.width}px`);
  check(quotation.overflow <= 1, `Quotation overflows by ${quotation.overflow}px at ${viewport.width}px`);
  check(quotation.forms === 1 && quotation.fields === 6 && quotation.summary === 1, `Quotation composition is incomplete at ${viewport.width}px`);
  check(quotation.inputs.filter((field) => field.name !== "confirmation").every((field) => field.width > 120 && field.height >= 44), `Quotation inputs are malformed at ${viewport.width}px`);
  const screenshotPath = path.join(screenshotDirectory, screenshotName);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  report.screenshots.push(screenshotPath);
  await page.close();
}

for (const route of ["/admin/login", "/admin/recovery"]) {
  for (const viewport of [desktop, mobile]) {
    const page = await browser.newPage({ viewport });
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    await settle(page);
    const auth = await page.evaluate(() => ({
      finalPath: location.pathname,
      mainCount: document.querySelectorAll("main").length,
      h1Count: document.querySelectorAll("h1").length,
      formCount: document.querySelectorAll("form").length,
      overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
      noindex: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? ""
    }));
    report.admin[`${route}-${viewport.width}`] = { status: response?.status(), ...auth };
    check(response?.ok(), `${route} returned ${response?.status() ?? "no response"}`);
    check(auth.mainCount === 1 && auth.h1Count === 1 && auth.formCount === 1, `${route} auth composition is incomplete at ${viewport.width}px`);
    check(auth.overflow <= 1, `${route} overflows by ${auth.overflow}px at ${viewport.width}px`);
    check(/noindex/i.test(auth.noindex), `${route} is missing noindex metadata`);
    const screenshotPath = path.join(screenshotDirectory, `${route.slice(7)}-${viewport.width}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    report.screenshots.push(screenshotPath);
    await page.close();
  }
}

const protectedAdminRoutes = [
  "/admin",
  "/admin/products",
  "/admin/families",
  "/admin/catalogues",
  "/admin/media",
  "/admin/inquiries",
  "/admin/messages",
  "/admin/content",
  "/admin/contact-details",
  "/admin/publishing",
  "/admin/revisions",
  "/admin/settings"
];
for (const route of protectedAdminRoutes) {
  const page = await browser.newPage({ viewport: desktop });
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForURL(`${baseUrl}/admin/login`, { timeout: 10_000 }).catch(() => {});
  const finalPath = new URL(page.url()).pathname;
  report.admin.protectedRoutes.push({ route, responseStatus: response?.status(), finalPath });
  check(finalPath === "/admin/login", `${route} did not fail closed to /admin/login; resolved to ${finalPath}`);
  await page.close();
}

await browser.close();
console.log(JSON.stringify({ ...report, failures }, null, 2));
if (failures.length > 0) process.exitCode = 1;
