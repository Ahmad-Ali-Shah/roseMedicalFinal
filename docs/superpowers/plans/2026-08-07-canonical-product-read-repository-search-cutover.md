# Superseded — Do Not Execute

This plan was superseded during pre-implementation review on 2026-08-07.

The first draft proposed switching Search to Supabase product UUIDs while other inquiry-producing public surfaces still used static catalogue IDs. Existing `inquiry-store.ts` merges lines by `item.id`, so that partial cutover could allow the same public product to enter an inquiry twice under different internal IDs. `createQuotationHash()` also included that internal ID, which could make an otherwise identical request hash differently across the migration boundary.

No production implementation or Supabase mutation was performed from this superseded plan.

Use instead:

`docs/superpowers/plans/2026-08-07-canonical-catalogue-safety-search-cutover.md`

The replacement plan adds an inquiry-identity compatibility gate before the first live public product consumer and retains the zero-DDL / zero-production-write constraints.