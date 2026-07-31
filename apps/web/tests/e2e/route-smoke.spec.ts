import { expect, test } from "@playwright/test";
import { routeSmokeCases } from "../../src/test/routes";

for (const route of routeSmokeCases) {
  test(`${route} exposes one main landmark`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
  });
}
