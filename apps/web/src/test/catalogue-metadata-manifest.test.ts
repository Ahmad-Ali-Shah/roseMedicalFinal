import { describe, expect, it } from "vitest";
import { CATALOGUE_METADATA_MANIFEST } from "@/features/catalogue-migration/catalogue-metadata-manifest";

describe("catalogue metadata migration manifest", () => {
  it("preserves the approved 113-product family inventory", () => {
    expect(CATALOGUE_METADATA_MANIFEST).toHaveLength(113);

    const counts = CATALOGUE_METADATA_MANIFEST.reduce<Record<string, number>>(
      (result, entry) => ({
        ...result,
        [entry.familySlug]: (result[entry.familySlug] ?? 0) + 1
      }),
      {}
    );

    expect(counts).toEqual({
      knives: 22,
      scissors: 42,
      punches: 15,
      chisels: 20,
      cutters: 14
    });
  });

  it("derives one unique database slug from each existing public route", () => {
    const dbSlugs = CATALOGUE_METADATA_MANIFEST.map((entry) => entry.dbSlug);
    expect(new Set(dbSlugs).size).toBe(113);

    for (const entry of CATALOGUE_METADATA_MANIFEST) {
      expect(entry.dbSlug).toBe(`${entry.familySlug}-${entry.publicSlug}`);
    }
  });

  it("keeps the known duplicate catalogue code as two different products", () => {
    const duplicate = CATALOGUE_METADATA_MANIFEST.filter(
      (entry) => entry.expectedCode === "18-0644"
    );

    expect(duplicate.map((entry) => entry.dbSlug).sort()).toEqual([
      "knives-round-straight",
      "knives-scalpel-handle-no-3"
    ]);
  });

  it("preserves display metadata that the current live schema cannot represent", () => {
    const sc01t = CATALOGUE_METADATA_MANIFEST.find(
      (entry) => entry.dbSlug === "cutters-sc-01t"
    );
    const keyesSet = CATALOGUE_METADATA_MANIFEST.find(
      (entry) => entry.dbSlug === "knives-keyes-dermal-punch-set"
    );
    const operating = CATALOGUE_METADATA_MANIFEST.find(
      (entry) =>
        entry.dbSlug ===
        "scissors-operating-scissors-tungsten-carbide-curved-sharp-blunt"
    );

    expect(sc01t?.metadata).toEqual({
      sizes: ["12.5 cm"],
      variants: ["Fine point"],
      directions: ["Straight"],
      primaryOption: "12.5 cm",
      cataloguePage: "10",
      mediaLabel: "SC-01T"
    });

    expect(keyesSet?.metadata.variants).toEqual([
      "Six interchangeable tips with handle and rack"
    ]);
    expect(keyesSet?.metadata.cataloguePage).toBe("3");

    expect(operating?.metadata.variants).toEqual([
      "Tungsten Carbide",
      "Sharp/Blunt"
    ]);
    expect(operating?.metadata.directions).toEqual(["Curved"]);
    expect(operating?.metadata.primaryOption).toBe(
      "Tungsten Carbide · Curved · Sharp/Blunt"
    );
  });
});
