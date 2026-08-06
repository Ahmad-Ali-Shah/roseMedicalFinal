"use client";

import Link from "next/link";
import { useMemo, useState, type ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import { Reveal, Stagger, StaggerItem } from "@/features/motion";
import { SearchFamilyShortcuts } from "@/features/search-preview/search-family-shortcuts";
import { SearchResultPreview } from "@/features/search-preview/search-result-preview";
import { searchCatalogue } from "./search-catalogue";
import type { PublicLocale } from "@/features/localization/locales";
import { localizePath } from "@/features/localization/locales";

export function SearchPage({ initialQuery = "", locale = "en" }: { initialQuery?: string; locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  const [query, setQuery] = useState(initialQuery);
  const trimmedQuery = query.trim();
  const results = useMemo(
    () => searchCatalogue(CATALOGUE_PRODUCTS, trimmedQuery),
    [trimmedQuery]
  );

  return (
    <Section tone="paper" spacing="compact" className="search-default-page">
      <Container size="wide">
        <Reveal className="search-default-page__panel" direction="up">
          <p className="page-eyebrow">{ar ? "بحث شامل" : "Global search"}</p>
          <h1>{ar ? "ابحث عن أداة." : "Find an instrument."}</h1>
          <form className="search-catalogue-form" action={localizePath("/search", locale)} method="get" role="search">
            <label className="search-default-page__field">
              <span>{ar ? "ابحث في الكتالوج" : "Search the catalogue"}</span>
              <input
                type="search"
                name="q"
                value={query}
                autoComplete="off"
                placeholder={ar ? "اسم المنتج أو الرمز أو العائلة أو المقاس أو الخيار" : "Product name, code, family, size or variant"}
                onChange={(event) => setQuery(event.currentTarget.value)}
              />
            </label>
            <button className="button button--primary button--standard" type="submit">
              {ar ? "بحث" : "Search"}
            </button>
            {trimmedQuery ? (
              <button className="button button--quiet button--standard" type="button" onClick={() => setQuery("")}>
                {ar ? "مسح" : "Clear"}
              </button>
            ) : null}
          </form>

          {trimmedQuery ? (
            <section className="search-live-results" aria-labelledby="search-live-title" aria-live="polite">
              <div className="search-live-results__header">
                <h2 id="search-live-title">{ar ? `نتائج “${trimmedQuery}”` : `Results for “${trimmedQuery}”`}</h2>
                <output>{results.length} {ar ? "نتيجة" : results.length === 1 ? "result" : "results"}</output>
              </div>
              {results.length ? (
                <Stagger as="div" className="search-results-preview__list" interval={0.035}>
                  {results.map((product) => (
                    <StaggerItem key={product.id}>
                      <SearchResultPreview product={product} locale={locale} />
                    </StaggerItem>
                  ))}
                </Stagger>
              ) : (
                <div className="search-live-results__empty">
                  <p>{ar ? "لم نعثر على أداة مطابقة. تحقق من الرمز أو استعرض إحدى العائلات." : "No matching instrument was found. Check the product code or browse a family."}</p>
                  <Link className="premium-link" href={localizePath("/products", locale)}>{ar ? "استعرض جميع عائلات المنتجات ←" : "Browse all product families →"}</Link>
                </div>
              )}
            </section>
          ) : (
            <>
              <p className="search-default-page__status">
                {ar ? "ابحث باسم المنتج أو رمز الكتالوج أو العائلة أو المقاس أو الخيار." : "Search by product name, catalogue code, family, listed size, or variant."}
              </p>
              <h2>{ar ? "ابدأ بإحدى العائلات" : "Start with a family"}</h2>
              <SearchFamilyShortcuts locale={locale} />
            </>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
