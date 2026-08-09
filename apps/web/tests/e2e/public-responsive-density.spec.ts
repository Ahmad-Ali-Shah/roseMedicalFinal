import {
  expect,
  test,
  type Locator,
  type Page,
  type TestInfo
} from "@playwright/test";

const LAPTOP_VIEWPORTS = [
  { width: 1280, height: 720 },
  { width: 1366, height: 768 }
] as const;

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const geometry = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));

  expect(geometry.scrollWidth, JSON.stringify(geometry)).toBeLessThanOrEqual(
    geometry.clientWidth
  );
}

async function expectTopBeforeViewportEnd(
  page: Page,
  locator: Locator,
  maximum = 1
): Promise<void> {
  const ratio = await locator.evaluate(
    (node) => node.getBoundingClientRect().top / innerHeight
  );
  expect(ratio).toBeLessThanOrEqual(maximum);
}

async function expectDisplayCeiling(page: Page): Promise<void> {
  const size = await page.getByRole("heading", { level: 1 }).evaluate(
    (node) => Number.parseFloat(getComputedStyle(node).fontSize)
  );
  expect(size).toBeLessThanOrEqual(64);
}

async function expectMinimumHeight(locator: Locator, minimum = 44): Promise<void> {
  const box = await locator.boundingBox();
  expect(box, "Expected a rendered control").not.toBeNull();
  expect(box!.height).toBeGreaterThanOrEqual(minimum);
}

async function expectContained(locator: Locator): Promise<void> {
  const geometry = await locator.evaluate((node) => {
    const child = node.getBoundingClientRect();
    const parent = node.parentElement?.getBoundingClientRect();
    return parent
      ? { childLeft: child.left, childRight: child.right, parentLeft: parent.left, parentRight: parent.right }
      : null;
  });
  expect(geometry, "Expected an element parent").not.toBeNull();
  expect(geometry!.childLeft).toBeGreaterThanOrEqual(geometry!.parentLeft - 1);
  expect(geometry!.childRight).toBeLessThanOrEqual(geometry!.parentRight + 1);
}

for (const viewport of LAPTOP_VIEWPORTS) {
  test(`shared internal density ${viewport.width}x${viewport.height}`, async ({
    page
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "Geometry runs once in desktop Chromium."
    );
    await page.setViewportSize(viewport);
    await page.goto("/about");

    const compactPadding = await page.locator(".about-hero").evaluate(
      (node) => Number.parseFloat(getComputedStyle(node).paddingTop)
    );
    expect(compactPadding).toBeLessThanOrEqual(48);
    await expectNoHorizontalOverflow(page);
  });
}

const CATALOGUE_ROUTES = [
  "/products",
  "/products/knives",
  "/products/scissors",
  "/products/punches",
  "/products/chisels",
  "/products/cutters",
  "/catalogues"
] as const;

for (const route of CATALOGUE_ROUTES) {
  test(`${route} exposes useful catalogue content on a laptop`, async ({
    page
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "Geometry runs once in desktop Chromium."
    );
    await page.setViewportSize({ width: 1366, height: 768 });
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    await expectDisplayCeiling(page);
    await expectNoHorizontalOverflow(page);

    const continuation = route === "/products"
      ? page.locator("[data-section='family-index']")
      : route === "/catalogues"
        ? page.locator(".catalogues-content")
        : page.locator(".family-discovery-shell");
    await expectTopBeforeViewportEnd(page, continuation, 1.05);
  });
}

test("catalogue pages use deliberate mobile and tablet composition", async ({
  page
}, testInfo) => {
  test.skip(
    testInfo.project.name === "desktop",
    "Width-specific composition is covered by mobile and tablet projects."
  );

  if (testInfo.project.name === "mobile") {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/products");
    await expectContained(page.getByRole("heading", { level: 1 }));
    await expectMinimumHeight(page.locator(".products-search-entry"));
    await expectMinimumHeight(page.locator(".products-inquiry-button"));

    const productCards = page.locator(".products-family-grid > li");
    const first = await productCards.nth(0).boundingBox();
    const second = await productCards.nth(1).boundingBox();
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    expect(second!.y).toBeGreaterThan(first!.y + first!.height - 1);
    await expectNoHorizontalOverflow(page);
    return;
  }

  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/products");
  const productCards = page.locator(".products-family-grid > li");
  const first = await productCards.nth(0).boundingBox();
  const second = await productCards.nth(1).boundingBox();
  expect(first).not.toBeNull();
  expect(second).not.toBeNull();
  expect(Math.abs(first!.y - second!.y)).toBeLessThanOrEqual(2);
  expect(second!.x).toBeGreaterThan(first!.x + first!.width - 1);

  await page.goto("/products/knives");
  await expectMinimumHeight(page.locator(".family-search-preview input"));
  await expectMinimumHeight(page.locator(".family-mobile-filter-trigger"));
  await expectNoHorizontalOverflow(page);
});

test("product detail density keeps desktop media and action in balance", async ({
  page
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Desktop product geometry runs once in Chromium."
  );

  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/products/knives/scalpel-handle-no-3");

  const firstViewport = await page.evaluate(() => {
    const gallery = document.querySelector<HTMLElement>(".product-gallery__primary");
    const summary = document.querySelector<HTMLElement>(".product-procurement-summary");
    const action = summary?.querySelector<HTMLElement>(".add-to-inquiry-transition");
    if (!gallery || !summary || !action) return null;
    return {
      galleryTop: gallery.getBoundingClientRect().top,
      summaryTop: summary.getBoundingClientRect().top,
      actionBottom: action.getBoundingClientRect().bottom,
      viewportHeight: innerHeight
    };
  });
  expect(firstViewport).not.toBeNull();
  expect(firstViewport!.galleryTop).toBeLessThan(firstViewport!.viewportHeight);
  expect(firstViewport!.summaryTop).toBeLessThan(firstViewport!.viewportHeight);
  expect(firstViewport!.actionBottom).toBeLessThanOrEqual(firstViewport!.viewportHeight);

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/products/knives/scalpel-handle-no-3");
  const galleryHeight = await page.locator(".product-gallery__primary").evaluate(
    (node) => node.getBoundingClientRect().height
  );
  expect(galleryHeight).toBeLessThanOrEqual(1080 * 0.85);
  await expectDisplayCeiling(page);
  await expectNoHorizontalOverflow(page);
});

test("product detail density keeps mobile actions and footer reachable", async ({
  page
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only product composition.");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/products/knives/scalpel-handle-no-3");

  const order = await page.evaluate(() => {
    const selectors = [
      ".product-gallery__primary",
      ".product-gallery__rail",
      ".product-procurement-summary h1",
      ".mobile-inquiry-bar"
    ];
    return selectors.map((selector) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return null;
      return { selector, top: node.getBoundingClientRect().top, offsetTop: node.offsetTop };
    });
  });
  expect(order.every(Boolean)).toBe(true);
  expect(order[0]!.top).toBeLessThan(order[1]!.top);
  await expectContained(page.getByRole("heading", { level: 1 }));
  await expectMinimumHeight(
    page.locator(".mobile-inquiry-bar").getByRole("button", { name: "Add to inquiry" })
  );

  const lastFooterLink = page.locator(".site-footer a").last();
  await lastFooterLink.scrollIntoViewIfNeeded();
  await expect(lastFooterLink).toBeVisible();
  const overlaps = await page.evaluate(() => {
    const sticky = document.querySelector<HTMLElement>(".mobile-inquiry-bar");
    const footerLink = document.querySelector<HTMLElement>(".site-footer a:last-of-type");
    if (!sticky || !footerLink) return true;
    const a = sticky.getBoundingClientRect();
    const b = footerLink.getBoundingClientRect();
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  });
  expect(overlaps).toBe(false);
  await expectNoHorizontalOverflow(page);
});

for (const viewport of LAPTOP_VIEWPORTS) {
  test(`editorial continuation is visible at ${viewport.width}x${viewport.height}`, async ({
    page
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "Editorial laptop geometry runs once in Chromium."
    );
    await page.setViewportSize(viewport);

    await page.goto("/about");
    await expectTopBeforeViewportEnd(page, page.locator(".about-company-section"), 1);
    await expectNoHorizontalOverflow(page);

    await page.goto("/procurement-support");
    await expectTopBeforeViewportEnd(page, page.locator(".procurement-process-section"), 1);
    await expectNoHorizontalOverflow(page);
  });
}

test("editorial density keeps large and phone compositions bounded", async ({
  page
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Explicit viewport audit runs once in desktop Chromium."
  );

  await page.setViewportSize({ width: 2560, height: 1440 });
  for (const route of ["/about", "/procurement-support"] as const) {
    await page.goto(route);
    await expectDisplayCeiling(page);
    const mediaHeight = await page.locator(".f3d-hero__media").evaluate(
      (node) => node.getBoundingClientRect().height
    );
    expect(mediaHeight).toBeLessThanOrEqual(720);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/about", "/procurement-support"] as const) {
    await page.goto(route);
    await expectContained(page.getByRole("heading", { level: 1 }));
    await expectContained(page.locator(".f3d-hero__media"));
    await expectNoHorizontalOverflow(page);
  }
});

const SEEDED_INQUIRY = [{
  id: "knife-scalpel-handle-no-3",
  familySlug: "knives",
  slug: "scalpel-handle-no-3",
  name: "Scalpel Handle No. 3",
  code: "18-0644",
  size: "No. 3",
  variant: "Standard",
  quantity: 1,
  notes: ""
}] as const;

async function seedInquiry(page: Page): Promise<void> {
  await page.addInitScript((items) => {
    window.localStorage.setItem("rosa-medical-inquiry-v1", JSON.stringify(items));
  }, SEEDED_INQUIRY);
}

test("form density exposes contact and quotation content on a laptop", async ({
  page
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Form laptop geometry runs once in Chromium."
  );
  await seedInquiry(page);
  await page.setViewportSize({ width: 1366, height: 768 });

  await page.goto("/contact");
  await expectTopBeforeViewportEnd(page, page.locator(".contact-main-section"), 1);
  await expectDisplayCeiling(page);

  await page.goto("/inquiry");
  await expectDisplayCeiling(page);
  await expectNoHorizontalOverflow(page);

  await page.goto("/request-quotation");
  await expectDisplayCeiling(page);
  await expectNoHorizontalOverflow(page);
});

test("form density preserves practical mobile controls", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only form controls.");
  await seedInquiry(page);
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("/contact");
  for (const control of [
    page.getByLabel("Name"),
    page.getByLabel("Email"),
    page.getByRole("textbox", { name: "Message", exact: true }),
    page.getByRole("button", { name: "Send Message" }),
    page.getByRole("link", { name: "Open Product Inquiry" }).first()
  ]) {
    await expectMinimumHeight(control);
  }
  await expectNoHorizontalOverflow(page);

  await page.goto("/inquiry");
  await expectMinimumHeight(page.getByRole("button", { name: /Increase .* quantity/ }));
  await expectMinimumHeight(page.getByRole("link", { name: "Proceed to request" }));
  await expectNoHorizontalOverflow(page);

  await page.goto("/request-quotation");
  for (const control of [
    page.getByPlaceholder("Your full name"),
    page.getByPlaceholder("name@company.com"),
    page.getByPlaceholder("Country code and number"),
    page.getByPlaceholder("Packing, destination or other requirements"),
    page.getByRole("button", { name: "Submit quotation request" })
  ]) {
    await expectMinimumHeight(control);
  }
  await expectNoHorizontalOverflow(page);
});

const PUBLIC_REDIRECTS = [
  ["/login", /\/admin\/login$/],
  ["/forgot-password", /\/admin\/recovery$/],
  ["/reset-password", /\/admin\/recovery$/],
  ["/account", /\/inquiry$/]
] as const;

for (const [source, destination] of PUBLIC_REDIRECTS) {
  test(`${source} preserves its public redirect`, async ({ page }) => {
    await page.goto(source);
    await expect(page).toHaveURL(destination);
  });
}

test("utility density keeps search, legal, and public states restrained", async ({
  page
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Utility viewport audit runs once in desktop Chromium."
  );
  await page.setViewportSize({ width: 1366, height: 768 });

  await page.goto("/search");
  await expectDisplayCeiling(page);
  const searchbox = page.getByRole("searchbox", { name: "Search the catalogue" });
  await searchbox.fill("Mayo");
  await expect(page.locator("[data-search-result]").first()).toBeVisible();
  await expectNoHorizontalOverflow(page);

  for (const route of ["/privacy", "/terms"] as const) {
    await page.goto(route);
    await expectDisplayCeiling(page);
    await expectTopBeforeViewportEnd(page, page.locator(".legal-page"), 1);
    await expectNoHorizontalOverflow(page);
  }

  for (const route of ["/inquiry", "/request-quotation"] as const) {
    await page.goto(route);
    await expectDisplayCeiling(page);
    const state = route === "/inquiry"
      ? page.locator(".empty-inquiry-page")
      : page.locator(".quotation-blocked-page");
    const stateHeight = await state.evaluate(
      (node) => node.getBoundingClientRect().height
    );
    expect(stateHeight).toBeLessThanOrEqual(768 - 64);
    await expectNoHorizontalOverflow(page);
  }

  await page.goto("/products/scissors/scalpel-handle-no-3");
  await expect(
    page.getByRole("heading", { name: "This page is not in the catalogue." })
  ).toBeVisible();
  await expectDisplayCeiling(page);
  await expectNoHorizontalOverflow(page);
});

test("utility density remains contained on a phone", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only utility containment.");
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    "/search",
    "/privacy",
    "/terms",
    "/inquiry",
    "/request-quotation",
    "/products/scissors/scalpel-handle-no-3"
  ] as const) {
    await page.goto(route);
    await expectContained(page.getByRole("heading", { level: 1 }));
    await expectNoHorizontalOverflow(page);
  }
});

const ARABIC_ROUTES = [
  "/ar/products",
  "/ar/products/knives",
  "/ar/products/knives/scalpel-handle-no-3",
  "/ar/catalogues",
  "/ar/about",
  "/ar/procurement-support",
  "/ar/contact",
  "/ar/search",
  "/ar/inquiry",
  "/ar/request-quotation",
  "/ar/privacy",
  "/ar/terms"
] as const;

test("Arabic public density remains RTL and content-safe", async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  test.skip(
    testInfo.project.name !== "desktop",
    "Arabic route audit runs once in desktop Chromium."
  );
  await seedInquiry(page);
  await page.setViewportSize({ width: 1366, height: 768 });

  for (const route of ARABIC_ROUTES) {
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectContained(page.getByRole("heading", { level: 1 }));
    const headingWeight = await page.getByRole("heading", { level: 1 }).evaluate(
      (node) => Number.parseInt(getComputedStyle(node).fontWeight, 10)
    );
    expect(headingWeight).toBeGreaterThanOrEqual(500);
    await expectNoHorizontalOverflow(page);

    if (route === "/ar/products/knives/scalpel-handle-no-3") {
      await expect(page.locator("bdi[dir='ltr']").first()).toBeVisible();
    }
    if (route === "/ar/contact") {
      await expect(page.locator("input[dir='ltr']")).toHaveCount(2);
    }
  }
});

test("representative pages remain content-safe at 200% text", async ({
  page
}, testInfo) => {
  test.setTimeout(120_000);
  test.skip(
    testInfo.project.name !== "desktop",
    "Text scaling runs once in desktop Chromium."
  );
  await seedInquiry(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of [
    "/products",
    "/products/knives/scalpel-handle-no-3",
    "/about",
    "/contact",
    "/request-quotation",
    "/privacy"
  ] as const) {
    await page.goto(route);
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectContained(page.getByRole("heading", { level: 1 }));
    await expectNoHorizontalOverflow(page);
  }
});

test("reduced motion keeps every public density family settled", async ({
  page
}, testInfo) => {
  test.setTimeout(120_000);
  test.skip(
    testInfo.project.name !== "desktop",
    "Reduced-motion audit runs once in desktop Chromium."
  );
  await seedInquiry(page);
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const route of [
    "/",
    "/products",
    "/products/knives",
    "/products/knives/scalpel-handle-no-3",
    "/catalogues",
    "/about",
    "/procurement-support",
    "/contact",
    "/search",
    "/inquiry",
    "/request-quotation",
    "/privacy"
  ] as const) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect.poll(async () => page.evaluate(() => {
      const selectors = "[data-motion], .text-reveal__segment";
      return [...document.querySelectorAll<HTMLElement>(selectors)]
        .map((node) => {
          const style = getComputedStyle(node);
          return {
            opacity: Number(style.opacity),
            transform: style.transform
          };
        })
        .filter((style) => style.opacity < 0.99 || style.transform !== "none");
    })).toEqual([]);
    await expectNoHorizontalOverflow(page);
  }
});

const VIEWPORTS = [
  [360, 800],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1280, 720],
  [1366, 768],
  [1440, 900],
  [1536, 864],
  [1920, 1080],
  [2560, 1440]
] as const;

const MATRIX_ROUTES = [
  ["home", "/"],
  ["products", "/products"],
  ["family", "/products/knives"],
  ["product-detail", "/products/knives/scalpel-handle-no-3"],
  ["catalogues", "/catalogues"],
  ["about", "/about"],
  ["procurement", "/procurement-support"],
  ["contact", "/contact"],
  ["search", "/search"],
  ["inquiry", "/inquiry"],
  ["legal", "/privacy"]
] as const;

const AUDIT_ROUTES = [
  ["home", "/", true],
  ["products", "/products", true],
  ["family", "/products/knives", true],
  ["product-detail", "/products/knives/scalpel-handle-no-3", true],
  ["catalogues", "/catalogues", true],
  ["about", "/about", true],
  ["procurement", "/procurement-support", true],
  ["contact", "/contact", true],
  ["search", "/search", true],
  ["inquiry-empty", "/inquiry", true],
  ["quotation-blocked", "/request-quotation", true],
  ["privacy", "/privacy", true],
  ["terms", "/terms", true],
  ["not-found", "/products/scissors/scalpel-handle-no-3", false]
] as const;

const AUDIT_VIEWPORTS = [
  [390, 844],
  [768, 1024],
  [1366, 768],
  [1920, 1080]
] as const;

async function attachViewportScreenshot(
  page: Page,
  testInfo: TestInfo,
  name: string
): Promise<void> {
  const path = testInfo.outputPath(`${name}.png`);
  await page.screenshot({ animations: "disabled", path });
  await testInfo.attach(name, { path, contentType: "image/png" });
}

test("exact 11-viewport public density matrix", async ({ page }, testInfo) => {
  test.setTimeout(180_000);
  test.skip(
    testInfo.project.name !== "desktop",
    "The explicit viewport matrix runs once in desktop Chromium."
  );
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const [index, [width, height]] of VIEWPORTS.entries()) {
    const [name, route] = MATRIX_ROUTES[index]!;
    await page.setViewportSize({ width, height });
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expectContained(heading);
    await expectNoHorizontalOverflow(page);
    await attachViewportScreenshot(page, testInfo, `${name}-${width}x${height}`);
  }
});

for (const [width, height] of AUDIT_VIEWPORTS) {
  test(`four-anchor route audit ${width}x${height}`, async ({ page }, testInfo) => {
    test.setTimeout(240_000);
    test.skip(
      testInfo.project.name !== "desktop",
      "The four-anchor route audit runs once in desktop Chromium."
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height });

    for (const [name, route, shouldSucceed] of AUDIT_ROUTES) {
      const response = await page.goto(route);
      expect(response?.ok()).toBe(shouldSucceed);
      const heading = page.getByRole("heading", { level: 1 });
      await expect(heading).toBeVisible();
      await expectContained(heading);
      await expectNoHorizontalOverflow(page);
      await attachViewportScreenshot(page, testInfo, `${name}-${width}x${height}`);
    }
  });
}
