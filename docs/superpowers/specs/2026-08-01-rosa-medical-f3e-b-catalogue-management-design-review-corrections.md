# F3E-B Design Review Corrections

**Status:** Binding corrections to `2026-08-01-rosa-medical-f3e-b-catalogue-management-design.md`  
**Reason:** Post-specification self-review found two requirements that could be interpreted more broadly than the approved source boundary.  
**Execution rule:** Read this file immediately after the main F3E-B design specification. Where this file conflicts with the main specification, this file controls.

## 1. Exact route-segment matching

`resolveAdminManagementRoute(segments)` must match only these exact segment shapes:

```ts
[]                                      // not an F3E-B route
["products"]                            // products list
["products", familySlug, productSlug]  // product editor
["families"]                            // families list
["families", familySlug]               // family editor
["catalogues"]                          // catalogues list
["catalogues", familySlug]              // catalogue detail
["media"]                               // media library
```

All other shapes return `kind: "not-found"`, including:

- `/admin/products/<one-segment>`
- `/admin/products/<family>/<product>/<extra>`
- `/admin/families/<family>/<extra>`
- `/admin/catalogues/<family>/<extra>`
- `/admin/media/<extra>`
- mismatched product-family pairs

F3E-B must not inherit F3E-A’s broad nested-placeholder behavior for these four management roots.

## 2. Family imagery requirement wording

The family registry does not contain a `heroMedia`, filename, media label or asset field.

Therefore, replace the main specification phrase:

```text
5 family hero-media requirements
```

with:

```text
5 family imagery requirements derived as one unresolved presentation requirement per registered family
```

This is a view-model requirement count, not a source media record. The Media route must label each one:

```text
Family imagery requirement — no managed asset registered
```

It must not display a filename, asset status, upload history, crop result or source media label for families.

## 3. Media requirement selector boundary

`getAdminMediaRequirements()` may create transient presentation models by mapping the existing registries, but it must not introduce a persistent parallel catalogue or media constant.

The selector returns three explicitly different requirement kinds:

```ts
type AdminMediaRequirement =
  | {
      kind: "product";
      key: string;
      label: string;
      sourceLabel: string;
      adminHref: Route<string>;
    }
  | {
      kind: "catalogue-cover";
      key: string;
      label: string;
      sourceLabel: string;
      adminHref: Route<string>;
    }
  | {
      kind: "family-imagery";
      key: string;
      label: string;
      sourceLabel: "No managed asset registered";
      adminHref: Route<string>;
    };
```

Expected current totals:

- 20 product requirements from `CatalogueProductRecord.mediaLabel`
- 5 catalogue-cover requirements from `CatalogueDocument.coverLabel`
- 5 family-imagery requirements from the five registered families

The protected ROSA identity remains informational copy outside this requirement collection. It is not counted as a media record.

## 4. Verification additions

Add source and route assertions that confirm:

- every unsupported segment shape returns not-found;
- no family requirement claims to come from a media field;
- the Media route labels family items as presentation requirements;
- the requirement selector contains 30 derived requirements at the current source state;
- the ROSA identity note is not included in the requirement count;
- no persistent `ADMIN_MEDIA_ASSETS`, fake media registry or equivalent parallel dataset is introduced.

## 5. Final self-review result

With these corrections, the design has:

- exact route ownership;
- strict not-found behavior;
- no invented nested editor routes;
- no implication that family media exists in source;
- one registry-backed product/family/catalogue boundary;
- transient, clearly typed media requirements rather than fabricated assets;
- no normal-route validation, upload, mutation or publishing claims.
