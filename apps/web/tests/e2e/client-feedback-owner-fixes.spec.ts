import { expect, test } from "@playwright/test";

test("header keeps social links out of the quote action cluster", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.goto("/");
  await expect(page.locator(".site-header__actions [data-social-links]")).toHaveCount(0);
  await expect(page.locator(".home-social-strip [data-social-links] a")).toHaveCount(4);
});

test("hero uses a gradual overlapping crossfade instead of an abrupt swap", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.goto("/");
  const hero = page.locator("[data-section='home-hero']");
  const slides = hero.locator(".home-hero-carousel__slide");
  await expect(slides).toHaveCount(1);
  await page.locator(".home-hero-carousel__dot").nth(1).click();
  await expect(hero).toHaveAttribute("data-active-slide", "clinical-instrument-context");
  await expect(slides).toHaveCount(2);
  await page.waitForTimeout(300);
  const opacities = await slides.evaluateAll((nodes) =>
    nodes.map((node) => Number.parseFloat(getComputedStyle(node).opacity))
  );
  expect(opacities).toHaveLength(2);
  for (const opacity of opacities) {
    expect(opacity).toBeGreaterThan(0.15);
    expect(opacity).toBeLessThan(0.85);
  }
  await expect(slides).toHaveCount(1, { timeout: 2_000 });
});

test("desktop family gallery applies an obvious cover zoom without resizing the layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/");
  const gallery = page.locator("[data-home-family-gallery]");
  await gallery.scrollIntoViewIfNeeded();
  const chisels = gallery.locator("[data-family='chisels']");
  const image = chisels.locator(".home-family-gallery__image");
  const before = await chisels.boundingBox();

  await chisels.hover();
  await page.waitForTimeout(720);

  const after = await chisels.boundingBox();
  expect(after).not.toBeNull();
  expect(before).not.toBeNull();
  expect(Math.abs(after!.width - before!.width)).toBeLessThanOrEqual(1);
  expect(await image.evaluate((node) => getComputedStyle(node).transform)).not.toBe("none");

  await page.locator("[data-section='family-discovery'] .home-compact-section-title").hover();
  await page.waitForTimeout(720);
  expect(await image.evaluate((node) => getComputedStyle(node).transform)).toBe("none");
});
