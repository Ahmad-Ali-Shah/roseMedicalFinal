# Session notes — 2026-08-09: Product media crop tool + live contact wiring

## 1. "Save cropped image" 500 error — root-caused and fixed

Two layered causes, found via live Cloudflare Worker logs (Observability → Logs → Live tail).

### Cause 1 — missing `profiles` row for a second admin account
`requireAdminUser()` in `src/lib/supabase/admin-auth.ts` checks
`profiles.role === 'admin'` for the logged-in user. A second admin account
(`as37639920@gmail.com`) had no row in `public.profiles`, so it always failed
with `"Admin authorization is required."`.

Fix (Supabase SQL Editor):
```sql
insert into public.profiles (id, role)
values ('b60b7fe8-6028-4ce5-b77b-2f330d2e6ba8', 'admin')
on conflict (id) do update set role = 'admin';
```

### Cause 2 — missing Postgres GRANTs for service_role (the real blocker)
Even the service-role Supabase client (which bypasses RLS) got
`"permission denied for table products"`. RLS bypass is not the same as a
Postgres GRANT — `service_role` still needs explicit table privileges.

Fix:
```sql
grant select, insert, update, delete on public.products to service_role;
grant select, insert, update, delete on public.categories to service_role;
grant select, insert, update, delete on public.product_images to service_role;
grant select, insert, update, delete on public.product_variants to service_role;
```

**Lesson for next time:** any `"permission denied for table X"` from the
admin/service-role client (not an RLS-style denial) means table `X` is
missing its `service_role` GRANT. This same pattern previously hit
`unread_after_20`, `quote_requests`, and later `site_settings` (see §3).

## 2. Crop tool UX rewrite

**Root cause:** the crop box was positioned as a fraction of the whole
square stage, but the image itself sits letterboxed inside that stage via
`object-fit: contain` (non-square images don't fill it). So the visible
crop box didn't match what actually got cropped, and drag speed wasn't
calibrated to the real image size.

**Fix** (`src/features/admin-products/product-image-upload-form.tsx`):
- Added `computeDisplayRect()` to calculate the actual displayed image
  bounds (width/height/offset) inside the square stage, accounting for
  rotation.
- Made crop state relative to the real image, not the stage, and
  recalculated drag/resize math against that.
- Replaced zoom-in/out-only resizing with a real draggable corner resize
  handle.
- Added a rule-of-thirds grid overlay, checkerboard backdrop (for
  transparency visibility), rounded corners, and a fade-in animation
  (`src/styles/f3e-admin-foundation.css`).

Confirmed live: drag-to-move, corner-drag-to-resize, rotate, and save all
work correctly. Upload is a single source of truth — it upserts the
`sort_order=0` row in `product_images`, so every public surface (product
detail page, family/category listings) reflects the new image
automatically with no per-page duplication.

## 3. Public Contact page wired to live `site_settings`

**Bug:** the public `/contact` page rendered hardcoded placeholder values
(`+966 11 555 0142`, `hello@example.com`, etc.) from a static array in
`contact-information-model.ts`, completely disconnected from the admin
Contact Details panel, which *did* correctly save to `site_settings`.

**Fix, 3 files:**

1. `contact-information-model.ts` — added `buildContactInformation()`,
   which overlays live `site_settings` rows (matched by key, e.g.
   `contact_phone`, `contact_email`) onto the existing defaults, with
   dynamic `tel:` / `https://wa.me/` / `mailto:` href generation:
```ts
   export function buildContactInformation(
     settings: readonly SiteSettingLike[] = []
   ): ContactInformationRow[] {
     return CONTACT_INFORMATION.map((row) => {
       const settingKey = CONTACT_SETTING_KEY_BY_LABEL[row.label];
       if (!settingKey) return row;
       const setting = settings.find((entry) => entry.key === settingKey);
       const value = setting?.value_en?.trim() || row.value;
       const valueAr = setting?.value_ar?.trim() || row.valueAr;
       const dynamicHref = buildDynamicHref(row.label, value);
       const href = dynamicHref.href ?? row.href;
       const external = dynamicHref.external ?? row.external;
       return {
         ...row,
         value,
         ...(valueAr !== undefined ? { valueAr } : {}),
         ...(href !== undefined ? { href } : {}),
         ...(external !== undefined ? { external } : {})
       };
     });
   }
```

2. `contact-information-panel.tsx` — now accepts a `rows` prop (defaults
   to the static array so nothing else breaks).

3. `contact-page.tsx` — made `ContactPage` an async server component that
   fetches `site_settings` and passes the built rows into the panel:
```ts
   export async function ContactPage({ locale = "en" }: { locale?: PublicLocale }): Promise<ReactElement> {
     const supabase = await createClient();
     const { data: settingsData } = await supabase
       .from("site_settings")
       .select("key,value_en,value_ar");
     const contactRows = buildContactInformation(settingsData ?? []);
     ...
     <ContactInformationPanel locale={locale} rows={contactRows} />
```

**Fixed a `pnpm build` TypeScript error along the way:** `exactOptionalPropertyTypes`
rejected explicitly assigning `valueAr: string | undefined` onto a type
where `valueAr?: string`. Fixed by conditionally spreading each optional
key instead of always assigning it.

Also GRANT-fixed `site_settings` (same Cause 2 pattern as §1):
```sql
grant select, insert, update, delete on public.site_settings to service_role;
```

Confirmed live: Telephone, WhatsApp, and Email now show the values saved
in `/admin/contact-details` (`+966 59 720 4394`, `info@rosamedical.org`)
instead of the old hardcoded placeholders.

## 4. Known issue — customer emails need a verified domain

Resend is currently only configured with the sandbox sender
`onboarding@resend.dev`, which can only deliver to the Resend account's
own email — not to real customers. Checked
[resend.com/domains](https://resend.com/domains): no domain verified yet.

This blocks the planned "email the customer on approve/decline" feature
(see §5) until a domain is added and verified in Resend. Client decision
pending on whether to purchase a domain.

## 5. Still open — admin Quotation Inquiries polish (not yet built)

Confirmed working end-to-end: public request-quotation flow (add to
inquiry → basket → form → submit → `/api/checkout` 201 → reference ID →
row in `quote_requests` → visible in admin Quotation Inquiries).

Three issues identified, not yet fixed:
- Clicking **Approve** without picking a date triggers a raw browser
  `alert()` (`admin-inquiries-page.tsx`) — needs replacing with inline
  validation instead of a native alert.
- No admin-typed custom message field on approve/decline (currently only
  a date field) — wanted so the admin can write a note to the customer.
- Approve/decline only writes `quote_requests.notification`
  (in-dashboard only) — no actual email is sent to the customer. Real
  send requires the domain fix in §4 first.
