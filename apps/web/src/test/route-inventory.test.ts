import { describe, expect, it } from "vitest";
import { routeSmokeCases } from "./routes";

describe("route inventory", () => {
  it("contains no duplicates", () => {
    expect(new Set(routeSmokeCases).size).toBe(routeSmokeCases.length);
  });

  it("keeps public and admin entry points", () => {
    expect(routeSmokeCases).toContain("/");
    expect(routeSmokeCases).toContain("/products");
    expect(routeSmokeCases).toContain("/inquiry");
    expect(routeSmokeCases).toContain("/admin/login");
    expect(routeSmokeCases).toContain("/admin");
  });
});
