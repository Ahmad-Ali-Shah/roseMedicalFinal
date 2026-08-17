# roseMedicalFinal Main Replacement Handoff — 2026-08-17

## Purpose

This branch is the transfer-ready replacement tree for `Ahmad-Ali-Shah/roseMedicalFinal` `main`.

Transfer branch:

`transfer/rose-medical-final-main-ready-2026-08-17`

It was created from the latest approved Rosa Medical About/home media branch:

`frontend/client-about-compact-redesign`

Source commit at branch creation:

`5d00ae5221cdaa0b425d4ee8c1367fe32fc7a64d`

Destination repository `main` audited before transfer:

`720bd433e2abcc2cfe17d8cc8a9b62ccb17e91a3`

The intended operation is a replacement of the destination application with this newer tree, not a content merge. Old destination code should only survive when it is deployment-critical or represents production behavior not already present here.

## Production deployment compatibility audit

The destination repository deploys Cloudflare Workers automatically on pushes to `main` using OpenNext + Wrangler.

The following deployment-critical files were checked between the source transfer tree and the destination `main` and are already identical, so no destination-specific deployment override is required:

- `.github/workflows/deploy.yml` — blob `574aacf444e8711ea36ce1bedd99a5d166c0a8df`
- `apps/web/wrangler.jsonc` — blob `f0952402a076d3383294fce3793e603078d672ea`
- `apps/web/open-next.config.ts` — blob `ffd9887857ebadf4c8670b577f99de6eba1f776b`
- `apps/web/public/_headers` — blob `e66f3169cc0a2a70d718f6105a89415cb55ec2a6`
- `apps/web/next.config.ts` — blob `a87a6c27279d8ab6b967669770383a8de63160c1`
- `apps/web/package.json` — blob `59d54e6c88b904c664d85033f41cfa11857459c1`
- root `package.json` — blob `becd459385a02ab191050f5a02f3a5ee3065343e`
- `pnpm-lock.yaml` — blob `c363f9881cc44f1c579a7c72279d7b1dac9887ed`
- `.nvmrc` — blob `2bd5a0a98a36cc08ada88b804d3be047e6aa5b8a`

The deploy workflow remains configured to:

1. run on pushes to `main`;
2. use Node.js 22;
3. use pnpm 8;
4. run `pnpm install --frozen-lockfile`;
5. run `npx opennextjs-cloudflare build` from `apps/web`;
6. run `npx wrangler deploy` from `apps/web`.

Required repository secrets referenced by that workflow remain:

- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The destination repository already owns those deployment secrets. Replacing Git contents does not copy or delete repository secrets.

## Important destination-code audit

The destination `main` contained previous work around localization, admin/add-product behavior, live catalogue reads, and inquiry administration.

Before declaring the transfer tree authoritative, the important production paths were checked rather than discarded blindly.

Already present byte-for-byte in this transfer tree:

- public route gate using `getProductCatalogueContext`;
- owner/user inquiry API separation;
- admin-client inquiry reads;
- inquiry status update/delete behavior;
- the shared live-catalogue cache/projection/selectors/types layer.

The live catalogue repository/mapping implementation is not byte-identical to the older destination implementation, but the newer source still includes live-only/admin-added product mapping. The newer source implementation is therefore retained instead of reverting those files to the older destination versions.

## Safe manual transfer

Run from a local clone of `manbtd0-cloud/RosaMedical`.

```bash
git fetch origin
git switch transfer/rose-medical-final-main-ready-2026-08-17

git remote add final https://github.com/Ahmad-Ali-Shah/roseMedicalFinal.git 2>/dev/null || true
git fetch final main
```

Create a remote backup of the currently deployed destination `main` before replacement:

```bash
git push final refs/remotes/final/main:refs/heads/backup/pre-replacement-2026-08-17
```

Then replace destination `main` only if it is still at the audited commit:

```bash
git push final HEAD:refs/heads/main --force-with-lease=refs/heads/main:720bd433e2abcc2cfe17d8cc8a9b62ccb17e91a3
```

The explicit lease is intentional. If somebody changes destination `main` after this audit, Git refuses the replacement instead of silently deleting their newer work.

If that command rejects because `main` moved, fetch `final/main` again and review the new destination changes before retrying. Do not replace the lease SHA blindly.

## After the push

A successful push to destination `main` should trigger the existing GitHub Actions workflow `Deploy to Cloudflare Workers`.

Verify, in order:

1. checkout succeeds;
2. Node/pnpm setup succeeds;
3. `pnpm install --frozen-lockfile` succeeds;
4. `npx opennextjs-cloudflare build` succeeds;
5. `npx wrangler deploy` succeeds;
6. the deployed site loads the new homepage and About page assets/styles;
7. public catalogue routes still resolve;
8. `/admin` authentication and product/inquiry operations still reach the existing Supabase environment.

If deployment fails, keep the backup branch. Do not rewrite the destination history again until the failing build/deploy step is understood.
