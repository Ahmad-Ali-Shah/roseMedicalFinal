import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminAlert,
  AdminConfirmationPreview,
  AdminDataTable,
  AdminEmptyState,
  AdminErrorPreview,
  AdminFieldPreview,
  AdminLocaleFieldPair,
  AdminLoadingPreview,
  AdminPageHeader,
  AdminPaginationPreview,
  AdminSearchPreview,
  AdminSection,
  AdminSelectPreview,
  AdminStat,
  AdminStatusBadge,
  AdminUnresolvedMetric
} from "@/features/admin-primitives";

describe("F3E-A admin primitives", () => {
  it("renders one page heading and described status text", () => {
    const html = renderToStaticMarkup(
      <>
        <AdminPageHeader eyebrow="Admin overview" title="Rosa workspace overview." description="Static owner workspace preview." />
        <AdminStatusBadge tone="warning">Backend not connected</AdminStatusBadge>
      </>
    );
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Backend not connected");
  });

  it("distinguishes source-backed and unresolved metrics", () => {
    const html = renderToStaticMarkup(
      <AdminSection title="Metrics">
        <AdminStat label="Products" value={20} href="/admin/products" />
        <AdminUnresolvedMetric label="Inquiries" />
      </AdminSection>
    );
    expect(html).toContain(">20<");
    expect(html).toContain("Awaiting live data");
    expect(html).toContain('href="/admin/products"');
  });

  it("uses an alert role only for danger feedback", () => {
    const warning = renderToStaticMarkup(<AdminAlert tone="warning" title="Preview">Static state.</AdminAlert>);
    const danger = renderToStaticMarkup(<AdminAlert tone="danger" title="Error">Unable to load.</AdminAlert>);
    expect(warning).toContain('role="status"');
    expect(danger).toContain('role="alert"');
  });

  it("renders a semantic table and labelled stacked records", () => {
    const rows = [{ id: "alpha", name: "Alpha", status: "Draft" }];
    const html = renderToStaticMarkup(
      <AdminDataTable
        caption="Example records"
        rows={rows}
        getRowKey={(row) => row.id}
        columns={[
          { key: "name", header: "Name", render: (row) => row.name },
          { key: "status", header: "Status", render: (row) => row.status }
        ]}
      />
    );
    expect(html).toContain("<table");
    expect(html).toContain("<caption");
    expect((html.match(/scope="col"/g) ?? [])).toHaveLength(2);
    expect(html).toContain("data-admin-record-list");
    expect(html).toContain("Name");
  });

  it("keeps collection controls and field previews noninteractive", () => {
    const html = renderToStaticMarkup(
      <>
        <AdminSearchPreview label="Search products" />
        <AdminSelectPreview id="status" label="Status" options={["All statuses"]} />
        <AdminPaginationPreview />
        <AdminFieldPreview id="title" label="Title" value="Example" />
      </>
    );
    expect(html).toContain("readonly");
    expect((html.match(/disabled/g) ?? []).length).toBeGreaterThanOrEqual(3);
    expect(html).not.toContain("<form");
  });

  it("renders English and Arabic preview fields separately", () => {
    const html = renderToStaticMarkup(
      <AdminLocaleFieldPair id="name" label="Name" englishValue="Scissors" arabicValue="" />
    );
    expect(html).toContain("Name — English");
    expect(html).toContain("Name — Arabic");
    expect(html).toContain('dir="rtl"');
  });

  it("keeps generic collection and confirmation previews truthful", () => {
    const html = renderToStaticMarkup(
      <>
        <AdminLoadingPreview label="Products" />
        <AdminEmptyState title="No records preview" description="This state appears when a live collection is empty." />
        <AdminErrorPreview title="Data-load failure preview" />
        <AdminConfirmationPreview kind="save" />
      </>
    );
    expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(4);
    expect(html).toContain("No change has been made");
    expect(html).not.toContain("Saved successfully");
  });
});
