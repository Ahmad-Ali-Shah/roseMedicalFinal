import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";
const reuseExternalServer = process.env.PLAYWRIGHT_REUSE_EXTERNAL === "1";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  workers: 2,
  use: {
    baseURL,
    navigationTimeout: 60_000,
    trace: "retain-on-failure"
  },
  ...(reuseExternalServer
    ? {}
    : { webServer: {
        command: "pnpm dev",
        url: baseURL,
        reuseExistingServer: true,
        env: {
          NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://example.supabase.co",
          NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key",
          ROSA_OWNER_EMAIL: process.env.ROSA_OWNER_EMAIL ?? "owner@example.com"
        }
      } }),
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } }
    },
    {
      name: "tablet",
      use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } }
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } }
    }
  ]
});
