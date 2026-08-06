# Rosa Medical Public Quotation Slice Design

**Date:** 2026-08-03
**Status:** Approved by Ahmad

## Goal

Deliver the smallest usable end-to-end procurement flow:

`Product detail → Add to inquiry → Review inquiry → Submit quotation → Owner sees inquiry`

## Scope

1. Store selected product snapshots in browser local storage.
2. Activate desktop and mobile Add to inquiry actions on product details.
3. Replace the empty `/inquiry` route with a client-rendered inquiry list that supports quantity, line notes, removal, clearing and continuing to quotation.
4. Replace the blocked `/request-quotation` route with a contact form when at least one item exists.
5. Submit the request to the existing `quote_requests` table through the existing checkout API boundary.
6. Store a readable immutable snapshot in the existing `message` field so the current admin inquiry queue displays the request without schema changes.
7. Allow anonymous public submission; customer accounts are not required.
8. Use the supplied email as the temporary owner identity through an environment override with a temporary fallback. The supplied password remains only in Supabase Auth and is never committed.

## Data model

Browser item:

```ts
interface InquiryItem {
  id: string;
  familySlug: string;
  slug: string;
  name: string;
  code: string;
  size: string;
  variant: string;
  quantity: number;
  notes: string;
}
```

The server accepts contact fields plus `items`. It normalizes and validates the payload, creates a deterministic hash from contact email and item snapshots, rejects an exact duplicate, then inserts one `quote_requests` row. No database migration is introduced.

## Security and credentials

- Never commit the temporary password.
- Owner access still requires a valid authenticated Supabase session.
- `ROSA_OWNER_USER_ID` remains preferred.
- `ROSA_OWNER_EMAIL` overrides the temporary fallback owner email.
- The public quotation endpoint uses the server-side service-role client only after strict validation and only for duplicate lookup plus inserting one controlled row.

## Error handling

- Missing or invalid contact fields return HTTP 400.
- Empty or malformed item lists return HTTP 400.
- Exact duplicate submissions return HTTP 409.
- Database failures return a generic HTTP 500 response.
- The browser preserves the inquiry after failure and clears it only after confirmed success.

## Explicitly excluded

No customer authentication requirement, email delivery, OpenAPI rewrite, new database tables, product publishing, Arabic, search, media management, visual redesign or broad admin work.