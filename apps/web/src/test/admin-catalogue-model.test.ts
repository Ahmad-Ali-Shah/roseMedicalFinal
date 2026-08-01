import { describe, expect, it } from "vitest";
import { CATALOGUE_DOCUMENTS } from "@/features/catalogues";
import {
  getAdminCatalogueEditor,
  getAdminCatalogueRows
} from "@/features/admin-catalogues";

describe("F3E-B catalogue selectors", () => {
  it("derives exactly one admin row for each catalogue document", () => {
    const rows = getAdminCatalogueRows();
    expect(rows).toHaveLength(CATALOGUE_DOCUMENTS.length);
    expect(rows.map((row) => row.familySlug)).toEqual(
      CATALOGUE_DOCUMENTS.map((document) => document.familySlug)
    );
  });

  it("derives availability only from pdfPath", () => {
    for (const document of CATALOGUE_DOCUMENTS) {
      const editor = getAdminCatalogueEditor(document.familySlug)!;
      expect(editor.availability).toBe(
        document.pdfPath ? "Public PDF path registered" : "Awaiting publication"
      );
    }
  });

  it("rejects unknown catalogue families", () => {
    expect(getAdminCatalogueEditor("unknown")).toBeUndefined();
  });
});
