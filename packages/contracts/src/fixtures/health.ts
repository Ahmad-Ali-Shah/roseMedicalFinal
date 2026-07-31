import type { components } from "../generated/schema";

export const healthFixture = {
  status: "ok",
  service: "rosa-medical-api",
  version: "0.1.0",
  timestamp: "2026-07-31T00:00:00.000Z"
} satisfies components["schemas"]["HealthResponse"];
