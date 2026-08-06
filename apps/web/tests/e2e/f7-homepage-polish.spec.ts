import { expect, test } from "@playwright/test";

const sections = [
  "home-hero",
  "family-discovery",
  "procurement-support",
  "featured-instruments",
  "catalogue-access",
  "quotation-cta"
] as const;

function boxesOverlap(
  first: { x: number; y: number; width: number; height: number },
  second: { x: number; y: number; width: number; height: number }
) {
  return !(
    first.x + first.width <= second.x
    || second.x + second.width <= first.x
    || first.y + first.height <= second.y
    || second.y + second.height <= first.y
  );
}

test("homepage keeps its cinematic hierarchy and media geometry", async ({ page }, testInfo) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBe(true);

  await expect(page.locator("h1")).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore Products" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Request a Quote" }).first()).toBeVisible();

  for (const section of sections) {
    await expect(page.locator(`[data-section='${section}']`)).toHaveCount(1);
  }

  const heroMedia = page.locator("[data-media-slot='homepage-hero']");
  await expect(heroMedia).toBeVisible();
  await expect(heroMedia).toHaveAttribute("data-media-state", "placeholder");
  const heroBox = await heroMedia.boundingBox();
  expect(heroBox).not.toBeNull();
  if (heroBox) {
    const minimumHeight = testInfo.project.name === "mobile" ? 300 : 420;
    expect(heroBox.height).toBeGreaterThanOrEqual(minimumHeight);
  }

  await expect(page.locator("[data-motion='stagger']")).toHaveCount(4);
  expect(await page.locator("[data-motion='stagger-item']").count()).toBeGreaterThanOrEqual(16);
  await expect(page.locator("[data-motion='tilt']")).toHaveCount(7);
  expect(await page.locator("[data-motion='spotlight']").count()).toBeGreaterThanOrEqual(2);
  await expect(page.locator("[data-media-slot^='homepage-catalogue-']")).toHaveCount(5);

  await page.locator("[data-section='catalogue-access']").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "Technical catalogues for structured browsing." })).toBeVisible();
  await expect(page.getByRole("link", { name: "View Knives catalogue" })).toBeVisible();

  await page.locator("[data-section='quotation-cta']").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "Prepare your instrument inquiry." })).toBeVisible();

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(hasOverflow).toBe(false);
});

test("mobile hero keeps its instrument stage clear of the editorial copy", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile composition runs on the mobile project.");

  const response = await page.goto("/");
  expect(response?.ok()).toBe(true);

  const title = page.locator(".home-hero__title");
  const visual = page.locator(".home-hero__visual");
  await expect(title).toBeVisible();
  await expect(visual).toBeVisible();

  const [titleBox, visualBox] = await Promise.all([title.boundingBox(), visual.boundingBox()]);
  expect(titleBox).not.toBeNull();
  expect(visualBox).not.toBeNull();
  expect(boxesOverlap(titleBox!, visualBox!)).toBe(false);
  expect(visualBox!.y).toBeGreaterThan(titleBox!.y + titleBox!.height);

  const viewport = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  expect(viewport.scrollWidth, JSON.stringify(viewport)).toBeLessThanOrEqual(viewport.clientWidth);

  const minimumGutter = 16;
  await expect.poll(async () => {
    const settledBoxes = await Promise.all([title.boundingBox(), visual.boundingBox()]);
    return settledBoxes.every((box) => (
      box !== null
      && box.x >= minimumGutter
      && box.x + box.width <= viewport.clientWidth - minimumGutter
    ));
  }).toBe(true);
});
