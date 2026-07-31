import { expect, test } from "@playwright/test";

const routes = ["/catalogues", "/inquiry", "/request-quotation"] as const;

for (const route of routes) {
  test(`${route} keeps F3C landmarks and viewport safety`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);

    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(page.locator("footer")).toBeVisible();
  });
}

test("catalogues exposes five family documents and no active PDF link", async ({ page }) => {
  await page.goto("/catalogues");
  await expect(page.locator("[data-catalogue-document]")).toHaveCount(5);
  await expect(page.getByRole("button", { name: "PDF not available online" })).toHaveCount(5);
  await expect(page.getByRole("link", { name: "Explore products" })).toHaveCount(5);
});

test("inquiry defaults to its empty state", async ({ page }) => {
  await page.goto("/inquiry");
  await expect(page.getByRole("heading", { name: "Your inquiry list is empty." })).toBeVisible();
  await expect(page.getByText("Scalpel Handle No. 3")).toHaveCount(0);
});

test("quotation request stays blocked without selected products", async ({ page }) => {
  await page.goto("/request-quotation");
  await expect(
    page.getByRole("heading", {
      name: "Select instruments before requesting a quotation."
    })
  ).toBeVisible();
  await expect(page.getByRole("form")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /submit quotation request/i })).toHaveCount(0);
});
