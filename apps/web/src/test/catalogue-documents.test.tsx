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

  it("uses restrained descriptions and the owner-supplied PDF path", () => {
    for (const document of CATALOGUE_DOCUMENTS) {
      expect(document.description).toBe(descriptions[document.familySlug]);
      expect(document.pdfPath).toBe(
        `/media/catalogues/pdf/rosa-${document.familySlug}-catalogue.pdf`
      );
      expect(document.familyHref).toBe(`/products/${document.familySlug}`);
    }
  });

  it("looks up a known family and rejects an unknown family", () => {
    expect(getCatalogueDocument("knives")?.name).toBe("Knives");
    expect(getCatalogueDocument("unknown")).toBeUndefined();
  });

  it("renders a real family link and a downloadable PDF control", () => {
    const document = CATALOGUE_DOCUMENTS[0];
    expect(document).toBeDefined();
    if (!document) throw new Error("Expected the first catalogue document");

    const html = renderToStaticMarkup(<CatalogueCard document={document} />);

    expect(html).toContain('href="/products/knives"');
    expect(html).toContain('href="/media/catalogues/pdf/rosa-knives-catalogue.pdf"');
    expect(html).toContain("download=");
    expect(html).toContain("Download PDF");
    expect(html).not.toContain("PDF not available online");
    expect(html).not.toContain("disabled");
    expect(html).toContain("knives-number-3.webp");
    expect(html).toContain("catalogue-document-cover__format");
    expect(html).not.toContain('href=""');
    expect(html).not.toContain("[Month Year]");
  });

  it("renders all five documents with one page heading", () => {
    const html = renderToStaticMarkup(<CataloguesPage />);

    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect((html.match(/data-catalogue-document=/g) ?? [])).toHaveLength(5);
    expect((html.match(/catalogue-document-cover--glare/g) ?? [])).toHaveLength(5);
    expect((html.match(/data-catalogue-family-media=/g) ?? [])).toHaveLength(5);
    expect(html).not.toContain("catalogue-document-card--featured");
    expect(html).toContain('href="/search"');
    expect(html).toContain('href="/request-quotation"');
  });
});
