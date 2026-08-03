import { expect, test } from "@playwright/test";
import {
  protectedAdminSmokeCases,
  routeSmokeCases,
  strictNotFoundCases
} from "../../src/test/routes";

for (const route of routeSmokeCases) {
  test(`${route} exposes one main landmark`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
  });
}

for (const route of protectedAdminSmokeCases) {
  test(`${route} remains a safe no-index admin surface`, async ({ page }) => {
    const response = await page.goto(route);

    expect(response?.ok()).toBe(true);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/i
    );
    await expect(page.locator('input[type="file"]')).toHaveCount(0);

    const mutationButtons = page.getByRole("button", {
      name: /save|delete|publish|create/i
    });
    for (let index = 0; index < await mutationButtons.count(); index += 1) {
      await expect(mutationButtons.nth(index)).toBeDisabled();
    }
  });
}

for (const route of strictNotFoundCases) {
  test(`${route} fails closed`, async ({ page }) => {
    expect((await page.goto(route))?.status()).toBe(404);
  });
}
