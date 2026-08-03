import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import type { InquiryItem } from "@/features/inquiry";
import { Reveal } from "@/features/motion";
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
          <Reveal direction="none" className="product-detail__breadcrumbs-reveal">
            <ProductBreadcrumbs family={data.family} product={data.product} />
          </Reveal>
          <div className="product-detail-layout">
            <Reveal direction="right" delay={0.04} className="product-detail-layout__gallery-reveal">
              <ProductGallery product={data.product} />
            </Reveal>
            <Reveal direction="left" delay={0.1} className="product-detail-layout__summary-reveal">
              <ProductProcurementSummary
                family={data.family}
                product={data.product}
                sizeValue={data.sizeValue}
                variantValue={data.variantValue}
                catalogueReference={data.catalogueReference}
                inquiryItem={inquiryItem}
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container size="wide">
          <Reveal direction="up">
            <ProductSpecificationTable rows={data.specifications} />
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <ProductProcurementNote />
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper">
        <Container size="wide">
          <Reveal direction="up">
            <RelatedProductGrid family={data.family} products={data.related} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper" className="product-detail-final-cta">
        <Container size="wide">
          <Reveal direction="up">
            <ProcurementPanel
              eyebrow="Inquiry ready"
              title="Continue building your product list."
              copy="Review selected instruments, quantities and line notes before requesting a quotation."
              primary={{ label: "View inquiry", href: "/inquiry" }}
              tone="dark"
            />
          </Reveal>
        </Container>
      </Section>
      <MobileInquiryBar item={inquiryItem} />
    </div>
  );
}
