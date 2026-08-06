import { expect, test, type Page } from "@playwright/test";

const REPRESENTATIVE_ROUTES = [
  "/",
  "/products",
  "/products/knives/scalpel-handle-no-3",
  "/about",
  "/contact",
  "/privacy"
] as const;

async function expectNoHorizontalOverflow(page: Page) {
  const details = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));

  expect(details.scrollWidth, JSON.stringify(details)).toBeLessThanOrEqual(details.clientWidth);
}

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

test("representative public pages remain restrained at every breakpoint", async ({ page }) => {
  for (const route of REPRESENTATIVE_ROUTES) {
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await expect(page.locator("body")).not.toContainText(/hover to|mouse over|move your cursor/i);
  }
});

test("coarse-pointer mode removes pointer effects and keeps footer actions unobscured", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Coarse-pointer review runs on the mobile project.");

  const homeResponse = await page.goto("/");
  expect(homeResponse?.ok()).toBe(true);
  const pointerEnvironment = await page.evaluate(() => ({
    coarse: window.matchMedia("(pointer: coarse)").matches,
    noHover: window.matchMedia("(hover: none)").matches
  }));
  expect(pointerEnvironment).toEqual({ coarse: true, noHover: true });

  const tilt = page.locator('[data-motion="tilt"]').first();
  await expect(tilt).toBeVisible();
  await expect.poll(() => tilt.evaluate((element) => getComputedStyle(element).transform)).toBe("none");

  const magnetic = page.locator('[data-motion="magnetic"]').first();
  await expect(magnetic).toBeVisible();
  await expect.poll(() => magnetic.evaluate((element) => getComputedStyle(element).transform)).toBe("none");

  const spotlight = page.locator('[data-motion="spotlight"]').first();
  await spotlight.waitFor({ state: "attached" });
  await expect.poll(() => spotlight.evaluate((element) => getComputedStyle(element, "::before").display)).toBe("none");

  const productResponse = await page.goto("/products/knives/scalpel-handle-no-3");
  expect(productResponse?.ok()).toBe(true);
  const privacyLink = page.getByRole("link", { name: "Privacy Policy" });
  await privacyLink.scrollIntoViewIfNeeded();
  await expect(privacyLink).toBeVisible();

  const mobileBar = page.locator(".mobile-inquiry-bar");
  await expect(mobileBar).toBeVisible();
  const [barBox, linkBox] = await Promise.all([mobileBar.boundingBox(), privacyLink.boundingBox()]);
  expect(barBox).not.toBeNull();
  expect(linkBox).not.toBeNull();
  expect(boxesOverlap(barBox!, linkBox!)).toBe(false);
  await expectNoHorizontalOverflow(page);
});
