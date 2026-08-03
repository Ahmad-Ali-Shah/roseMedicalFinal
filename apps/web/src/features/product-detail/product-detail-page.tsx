import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import type { InquiryItem } from "@/features/inquiry";
import { ProcurementPanel } from "@/features/public-catalogue";
import { createProductDetailData } from "./product-detail.data";
import { ProductBreadcrumbs } from "./product-breadcrumbs";
import { ProductGallery } from "./product-gallery";
import { ProductProcurementSummary } from "./product-procurement-summary";
import { ProductSpecificationTable } from "./product-specification-table";
import { ProductProcurementNote } from "./product-procurement-note";
import { RelatedProductGrid } from "./related-product-grid";
import { MobileInquiryBar } from "./mobile-inquiry-bar";

export function ProductDetailPage({
  familySlug,
  productSlug
}: {
  familySlug: string;
  productSlug: string;
}): ReactElement | null {
  const data = createProductDetailData(familySlug, productSlug);
  if (!data) return null;

  const inquiryItem: InquiryItem = {
    id: data.product.id,
    familySlug: data.product.familySlug,
    slug: data.product.slug,
    name: data.product.name,
    code: data.product.code,
    size: data.sizeValue,
    variant: data.variantValue,
    quantity: 1,
    notes: ""
  };

  return (
    <div className="public-page public-page--product-detail">
      <Section tone="paper" spacing="compact" className="product-detail-intro">
        <Container size="wide">
          <ProductBreadcrumbs family={data.family} product={data.product} />
          <div className="product-detail-layout">
            <ProductGallery product={data.product} />
            <ProductProcurementSummary
              family={data.family}
              product={data.product}
              sizeValue={data.sizeValue}
              variantValue={data.variantValue}
              catalogueReference={data.catalogueReference}
              inquiryItem={inquiryItem}
            />
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container size="wide">
          <ProductSpecificationTable rows={data.specifications} />
          <ProductProcurementNote />
        </Container>
      </Section>

      <Section tone="paper">
        <Container size="wide">
          <RelatedProductGrid family={data.family} products={data.related} />
        </Container>
      </Section>

      <Section tone="paper" className="product-detail-final-cta">
        <Container size="wide">
          <ProcurementPanel
            eyebrow="Inquiry ready"
            title="Continue building your product list."
            copy="Review selected instruments, quantities and line notes before requesting a quotation."
            primary={{ label: "View inquiry", href: "/inquiry" }}
            tone="dark"
          />
        </Container>
      </Section>
      <MobileInquiryBar item={inquiryItem} />
    </div>
  );
}
