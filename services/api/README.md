# Rosa Medical Backend Service Boundary

> Backend AI: read the repository root `README.md` before every session and replace the declaration fields below before substantial backend implementation.

This directory is owned by the backend partner and the partner's AI. Internal framework choices are backend-owned. Shared network behavior is controlled by `packages/contracts/openapi/rosa-medical.v1.yaml`.

## Required architecture declaration

- Language/runtime:
- Framework:
- Local run command:
- Test command:
- Migration command:
- Seed command:
- Database and ORM/query layer:
- Authentication/session approach:
- Object and PDF storage:
- Transactional email provider:
- Deployment target:
- Current backend branch:

## Mandatory behavior

- One owner account only in version one.
- No public registration.
- Public endpoints expose published records only.
- Product inquiries and general messages remain separate.
- Inquiry items preserve immutable submitted snapshots.
- Draft, review, preview, publish, revision and rollback rules must be transactional.
- No price, payment, order, inventory, shipping, discount or rating domain is introduced.
- Backend errors follow the shared contract envelope.

## First backend integration target

Implement and contract-test:

1. `GET /v1/health`
2. `GET /v1/public/families`
3. `GET /v1/public/products`
4. `GET /v1/public/products/{slug}`
5. `POST /v1/public/inquiries`

After meaningful work, update the backend lane and communication log in the root `README.md`.
