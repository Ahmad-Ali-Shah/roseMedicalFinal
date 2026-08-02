import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  CATALOGUE_DOCUMENTS,
  CatalogueCard,
  CataloguesPage,
  getCatalogueDocument
} from "@/features/catalogues";

const descriptions = {
  knives: "Precision cutting instruments and handles.",
  scissors: "Scissors organised by listed pattern, size and configuration.",
  punches: "Punch instruments organised by pattern and dimensions.",
  chisels: "Chisels and osteotomes organised by form and size.",
  cutters: "Cutting instruments organised by pattern, size and direction."
} as const;

describe("F3C catalogue documents", () => {
  it("derives one ordered document for every registered family", () => {
    expect(CATALOGUE_DOCUMENTS.map((document) => document.sequence)).toEqual([
      "01",
      "02",
      "03",
      "04",
      "05"
    ]);
    expect(CATALOGUE_DOCUMENTS).toHaveLength(5);
  });

  it("uses restrained descriptions and no fabricated PDF path", () => {
    for (const document of CATALOGUE_DOCUMENTS) {
      expect(document.description).toBe(descriptions[document.familySlug]);
      expect(document.pdfPath).toBeUndefined();
      expect(document.familyHref).toBe(`/products/${document.familySlug}`);
    }
  });

  it("looks up a known family and rejects an unknown family", () => {
    expect(getCatalogueDocument("knives")?.name).toBe("Knives");
    expect(getCatalogueDocument("unknown")).toBeUndefined();
  });

  it("renders a real family link and a native disabled PDF control", () => {
    const document = CATALOGUE_DOCUMENTS[0];
    expect(document).toBeDefined();
    if (!document) throw new Error("Expected the first catalogue document");

    const html = renderToStaticMarkup(
      <CatalogueCard document={document} featured />
    );

    expect(html).toContain('href="/products/knives"');
    expect(html).toContain("PDF not available online");
    expect(html).toContain("disabled");
    expect(html).not.toContain('href=""');
    expect(html).not.toContain("[Month Year]");
  });

  it("renders all five documents with one page heading", () => {
    const html = renderToStaticMarkup(<CataloguesPage />);

    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect((html.match(/data-catalogue-document=/g) ?? [])).toHaveLength(5);
    expect(html).toContain('href="/search"');
    expect(html).toContain('href="/request-quotation"');
  });
});
