# Client Homepage Compact Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Rosa Medical homepage around the client-supplied compact composition while preserving the latest client hero/family assets, real routes, localization, accessibility, and production behavior.

**Architecture:** Keep the existing carousel, family gallery, quotation flow, public shell, localization and social-link registry. Replace only the homepage story composition with focused sections and a final-loaded homepage CSS layer. Existing backend/admin/catalogue systems remain untouched.

**Tech Stack:** Next.js 16, React, TypeScript, CSS, Vitest, Playwright, existing Rosa motion/localization primitives.

## Global Constraints

- Base exactly on `frontend/imdad-refinement-03-family-covers` at `ea8e5fdc6e4c969c8cba5e635a9b422a2a893655`.
- No merge from `main` before implementation.
- No backend, Supabase persistence, admin, catalogue source-of-truth or quotation API changes.
- No YouTube or nonexistent footer destinations.
- Specialty imagery remains deliberate placeholders in this phase.
- Preserve the four client hero SVGs and five approved catalogue covers.
- Preserve Arabic/RTL, reduced motion, keyboard and touch behavior.
- Use real responsive layout changes; never `zoom` or wrapper scaling.

## Tasks

1. Update homepage tests/contracts for the new eight-section story, client-v2 hero assets, four real socials and compact CSS.
2. Replace the homepage data request/composition with localized models for product range, Comprehensive Plans, Securing Confidence, contact band, SACS cards, quotation and social strip.
3. Refine family discovery to a compact centered heading and client sequence while preserving canonical family routes and mobile rail behavior.
4. Add the client-requested information sections and stable grayscale image placeholders.
5. Add a final-loaded homepage-only density layer: compact header/hero, tighter type/line-height, responsive information grids, homepage contact/social treatment and compact footer.
6. Verify unit tests, typecheck, lint/build where available, responsive browser geometry, RTL/reduced motion, and no backend/admin changes.
