"use client";

import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import type { CatalogueFamilyRecord, CatalogueProductRecord } from "@/features/catalogue-registry";
import { FamilyFilterPreview, type FamilyFilterOptions, type FamilyFilterValues } from "./family-filter-preview";
import { FamilyNoResultsState } from "./family-no-results-state";
import { FamilyProductGrid } from "./family-product-grid";
import { filterFamilyProducts } from "./filter-family-products";
import type { PublicLocale } from "@/features/localization/locales";

const EMPTY_FILTERS: FamilyFilterValues = { size: "", direction: "", variant: "" };

function unique(values: readonly string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export function FamilyProductDiscovery({ family, products, searchLabel, locale = "en" }: {
  family: CatalogueFamilyRecord;
  products: readonly CatalogueProductRecord[];
  searchLabel: string;
  locale?: PublicLocale;
}): ReactElement {
  const ar = locale === "ar";
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FamilyFilterValues>(EMPTY_FILTERS);
  const [sort, setSort] = useState<"recommended" | "name" | "code">("recommended");
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const options = useMemo<FamilyFilterOptions>(() => ({
    sizes: unique(products.flatMap((product) => product.sizes)),
    directions: unique(products.flatMap((product) => product.directions)),
    variants: unique(products.flatMap((product) => product.variants))
  }), [products]);
  const filtered = useMemo(
    () => filterFamilyProducts(products, { query, ...filters, sort }),
    [products, query, filters, sort]
  );
  const activeCount = [query, filters.size, filters.direction, filters.variant].filter(Boolean).length;

  const reset = () => {
    setQuery("");
    setFilters(EMPTY_FILTERS);
    setSort("recommended");
  };
  const changeFilter = (key: keyof FamilyFilterValues, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <section className="family-discovery-shell" aria-label={`Discover ${family.name}`}>
        <label className="family-search-preview">
          <span>{searchLabel}</span>
          <input type="search" value={query} placeholder={ar ? "اسم المنتج أو الرمز" : "Product name or code"} onChange={(event) => setQuery(event.currentTarget.value)} />
        </label>
        <label className="family-sort-preview">
          <span>{ar ? "الترتيب" : "Sort"}</span>
          <select value={sort} onChange={(event) => setSort(event.currentTarget.value as typeof sort)}>
            <option value="recommended">{ar ? "موصى به" : "Recommended"}</option>
            <option value="name">{ar ? "الاسم" : "Name A–Z"}</option>
            <option value="code">{ar ? "رمز المنتج" : "Product code"}</option>
          </select>
        </label>
        <button ref={triggerRef} className="family-mobile-filter-trigger" type="button" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}>
          {ar ? "عوامل التصفية" : "Filters"} ({activeCount})
        </button>
        <strong className="family-mobile-result-count">{filtered.length} {ar ? "منتج" : "products"}</strong>
        <p className="family-discovery-shell__note" aria-live="polite">
          {ar ? `عرض ${filtered.length} من ${products.length} منتج${activeCount ? ` · ${activeCount} عامل تصفية نشط` : ""}.` : `${filtered.length} of ${products.length} products shown${activeCount ? ` · ${activeCount} active filter${activeCount === 1 ? "" : "s"}` : ""}.`}
        </p>
      </section>

      <div className="family-results-layout">
        <FamilyFilterPreview values={filters} options={options} onChange={changeFilter} onClear={reset} locale={locale} />
        {filtered.length ? <FamilyProductGrid family={family} products={filtered} locale={locale} /> : <FamilyNoResultsState onReset={reset} locale={locale} />}
      </div>

      {mobileOpen ? (
        <div className="family-filter-dialog-backdrop" onMouseDown={() => setMobileOpen(false)}>
          <section className="family-filter-dialog" role="dialog" aria-modal="true" aria-labelledby="family-filter-title" onMouseDown={(event) => event.stopPropagation()}>
            <header>
              <div><p className="public-eyebrow">{ar ? "عوامل تصفية الكتالوج" : "Catalogue filters"}</p><h2 id="family-filter-title">{ar ? `صفِّ ${family.name}.` : `Refine ${family.name.toLowerCase()}.`}</h2></div>
              <button ref={closeRef} type="button" onClick={() => { setMobileOpen(false); triggerRef.current?.focus(); }}>{ar ? "إغلاق" : "Close"}</button>
            </header>
            <FamilyFilterPreview values={filters} options={options} onChange={changeFilter} onClear={reset} locale={locale} />
            <button className="button button--primary button--standard" type="button" onClick={() => { setMobileOpen(false); triggerRef.current?.focus(); }}>
              {ar ? `عرض ${filtered.length} منتج` : `Show ${filtered.length} ${filtered.length === 1 ? "product" : "products"}`}
            </button>
          </section>
        </div>
      ) : null}
    </>
  );
}
