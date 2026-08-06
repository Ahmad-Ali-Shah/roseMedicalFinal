import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseUrl = process.env.ROSA_QA_BASE_URL ?? "http://127.0.0.1:3100";
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const screenshotDirectory = path.resolve(
  scriptDirectory,
  "../../../docs/superpowers/reports/screenshots/latest-media"
);
await mkdir(screenshotDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const failures = [];
const report = {
  baseUrl,
  routes: [],
  catalogueTransforms: [],
  punchesCard: null,
  unresolvedFamilyProductMedia: []
};

function check(condition, message) {
  if (!condition) failures.push(message);
}

function rotationFromTransform(transform) {
  if (!transform || transform === "none") return 0;
  const values = transform.match(/matrix\(([^)]+)\)/)?.[1].split(",").map(Number);
  if (!values || values.length < 2) return null;
  return Math.round((Math.atan2(values[1], values[0]) * 180) / Math.PI);
}

async function openRoute(route, viewport) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(450);
  const measurements = await page.evaluate(() => ({
    overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
    brokenImages: [...document.images]
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src)
  }));
  report.routes.push({ route, viewport, status: response?.status(), ...measurements, consoleErrors, pageErrors });
  check(response?.ok(), `${route} returned ${response?.status() ?? "no response"}`);
  check(measurements.overflow <= 1, `${route} overflows by ${measurements.overflow}px at ${viewport.width}px`);
  check(measurements.brokenImages.length === 0, `${route} has broken images`);
  check(consoleErrors.length === 0, `${route} logged console errors: ${consoleErrors.join(" | ")}`);
  check(pageErrors.length === 0, `${route} raised page errors: ${pageErrors.join(" | ")}`);
  return page;
}

const desktop = { width: 1440, height: 1000 };
const mobile = { width: 390, height: 844 };

for (const viewport of [desktop, mobile]) {
  const page = await openRoute("/catalogues", viewport);
  const cards = page.locator(".catalogue-document-card");
  check(await cards.count() === 5, `Expected five catalogue cards at ${viewport.width}px`);
  check(await page.locator('.catalogue-document-cover [data-media-state="ready"]').count() === 5, `Catalogue media is incomplete at ${viewport.width}px`);

  for (let index = 0; index < await cards.count(); index += 1) {
    const card = cards.nth(index);
    const family = await card.getAttribute("data-catalogue-document");
    const image = card.locator(".catalogue-document-cover__media .media-frame__image");
    const before = rotationFromTransform(await image.evaluate((element) => getComputedStyle(element).transform));
    await card.hover();
    await page.waitForTimeout(360);
    const after = rotationFromTransform(await image.evaluate((element) => getComputedStyle(element).transform));
    report.catalogueTransforms.push({ viewport: viewport.width, family, before, after });
    if (family === "punches") {
      check(Math.abs((before ?? 0) - 120) <= 1, `Punches starts at ${before}deg at ${viewport.width}px`);
      check(Math.abs((after ?? 0) - 120) <= 1, `Punches changes to ${after}deg on hover at ${viewport.width}px`);
    }
  }

  await page.mouse.move(2, 2);
  await page.locator(".catalogue-document-grid").screenshot({
    path: path.join(screenshotDirectory, `catalogues-grid-${viewport.width}.png`)
  });
  await cards.nth(2).hover();
  await page.waitForTimeout(360);
  await page.locator(".catalogue-document-grid").screenshot({
    path: path.join(screenshotDirectory, `catalogues-grid-punches-hover-${viewport.width}.png`)
  });
  await page.close();
}

for (const viewport of [desktop, mobile]) {
  const page = await openRoute("/products", viewport);
  const punchesCard = page.locator('.products-family-grid [data-family="punches"]');
  check(await punchesCard.count() === 1, `Punches family card is missing at ${viewport.width}px`);
  const presentation = await punchesCard.evaluate((card) => {
    const title = card.querySelector(".family-card__title");
    const image = card.querySelector(".media-frame__image");
    const titleStyle = title ? getComputedStyle(title) : null;
    return {
      title: title?.textContent?.trim(),
      color: titleStyle?.color,
      fontSize: titleStyle?.fontSize,
      imageReady: image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0
    };
  });
  report.punchesCard ??= [];
  report.punchesCard.push({ viewport: viewport.width, ...presentation });
  check(presentation.title === "Punches", `Punches title is not visible at ${viewport.width}px`);
  check(presentation.imageReady, `Punches family image is not ready at ${viewport.width}px`);
  await punchesCard.screenshot({ path: path.join(screenshotDirectory, `products-punches-${viewport.width}.png`) });
  await page.close();
}

for (const slug of ["knives", "scissors", "punches", "chisels", "cutters"]) {
  const page = await openRoute(`/products/${slug}`, desktop);
  check(
    await page.locator(`[data-media-slot="family-${slug}-hero"][data-media-state="ready"]`).count() === 1,
    `${slug} family hero does not have ready media`
  );
  const unresolved = await page.locator(".family-product-card").evaluateAll((cards) =>
    cards
      .filter((card) => card.querySelector(".product-media-placeholder:not(.product-media-placeholder--image)"))
      .map((card) => ({
        name: card.querySelector("h2")?.textContent?.trim() ?? "",
        meta: card.querySelector(".family-product-card__meta")?.textContent?.replace(/\s+/g, " ").trim() ?? ""
      }))
  );
  report.unresolvedFamilyProductMedia.push({ slug, unresolved });
  await page.waitForTimeout(900);
  await page.locator(".family-hero").screenshot({
    path: path.join(screenshotDirectory, `family-hero-${slug}-1440.png`)
  });
  await page.close();
}

await browser.close();
console.log(JSON.stringify({ ...report, failures }, null, 2));
if (failures.length > 0) process.exitCode = 1;
