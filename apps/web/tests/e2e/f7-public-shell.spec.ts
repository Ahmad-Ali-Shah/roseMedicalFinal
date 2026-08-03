import { expect, test } from "@playwright/test";

test("public shell transforms without changing its landmarks", async ({ page }, testInfo) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBe(true);

  const header = page.locator("[data-scroll-header='true']");
  await expect(header).toBeVisible();
  await expect(page.locator("main#main-content")).toHaveCount(1);
  await expect(page.locator("footer.site-footer")).toHaveCount(1);
  await expect(page.locator("[data-motion='route-transition']")).toBeVisible();

  await page.evaluate(() => window.scrollTo(0, 400));
  await expect(header).toHaveAttribute("data-scrolled", "true");

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(hasOverflow).toBe(false);

  if (testInfo.project.name === "desktop") {
    await expect(page.getByRole("button", { name: "Menu" })).toBeHidden();
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
    return;
  }

  const trigger = page.getByRole("button", { name: "Menu" });
  await expect(trigger).toBeVisible();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Products", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toBeHidden();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});
