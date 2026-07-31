import { expect, test } from "@playwright/test";

for (const route of ["/", "/products"] as const) {
  test(`${route} has stable F3A semantics and no horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("body")).not.toContainText(/price|in stock|rating|checkout/i);

    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);
  });

  test(`${route} exposes visible keyboard focus`, async ({ page }) => {
    await page.goto(route);
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toBeVisible();
  });
}

test("homepage exposes all five family links", async ({ page }) => {
  await page.goto("/");
  for (const slug of ["knives", "scissors", "punches", "chisels", "cutters"]) {
    await expect(page.locator(`a[href="/products/${slug}"]`)).toBeVisible();
  }
});

test("products discovery shell links to search without a fake form", async ({ page }) => {
  await page.goto("/products");
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.locator('a[href="/search"]')).toBeVisible();
  await expect(page.locator('a[href="/inquiry"]')).toBeVisible();
});
