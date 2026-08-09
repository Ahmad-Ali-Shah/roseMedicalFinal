import { expect, test } from "@playwright/test";

test("header keeps social links out of the quote action cluster", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.goto("/");
  await expect(page.locator(".site-header__actions [data-social-links]")).toHaveCount(0);
  await expect(page.locator(".site-footer [data-social-links] a")).toHaveCount(4);
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

test("desktop family gallery keeps the most recently hovered family active", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/");
  const gallery = page.locator("[data-home-family-gallery]");
  await gallery.scrollIntoViewIfNeeded();
  const knives = gallery.locator("[data-family='knives']");
  const chisels = gallery.locator("[data-family='chisels']");
  const knivesInitial = await knives.boundingBox();
  const scissorsInitial = await gallery.locator("[data-family='scissors']").boundingBox();
  expect(knivesInitial!.width).toBeGreaterThan(scissorsInitial!.width);
  await chisels.hover();
  await page.waitForTimeout(650);
  await page.locator("[data-section='family-discovery'] .public-section-heading__title").hover();
  await page.waitForTimeout(650);
  const chiselsAfterLeave = await chisels.boundingBox();
  const knivesAfterLeave = await knives.boundingBox();
  expect(chiselsAfterLeave!.width).toBeGreaterThan(knivesAfterLeave!.width);
});
