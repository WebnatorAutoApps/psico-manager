# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Coding Standards

- **Clean Architecture**: separate concerns into layers (UI → use cases → data). No business logic in components or API routes.
- **Clean Code**: meaningful names, single-responsibility functions, no magic numbers/strings.
- **DRY**: extract shared logic into reusable modules. Never copy-paste.
- **Small files**: each file should do one thing. If a file exceeds ~100 lines, split it.
- **Modularity**: every feature should be self-contained and easy to extend or replace.
- **Tests**: write tests for all business logic and utilities. Use Vitest.
- **Readability**: code should read like prose. Prefer clarity over cleverness.
- **No dead code**: remove unused imports, variables, and functions.

## Monorepo Structure

All projects are monorepos to allow expansion (APIs, serverless, landings, mobile apps, etc.).

```
packages/
  web/                      # Next.js App Router (default entry point)
    src/
      app/                  # Pages and API routes
      components/
        ui/                 # Generic reusable UI components
        [feature]/          # Feature-specific components
      lib/
        db/                 # Drizzle ORM client, schema, and helpers
        [domain]/           # Business logic organized by domain
      hooks/                # Custom React hooks
      types/                # TypeScript type definitions
      utils/                # Pure utility functions
    tests/
  shared/                   # Shared types, utils, and business logic across packages
    src/
      types/
      utils/
  [api|mobile|landing|...]/  # Additional packages as needed
package.json                # Root workspace config
tsconfig.base.json          # Shared TypeScript config
```

Rules:
- Each package is self-contained with its own package.json, tsconfig, and tests.
- Shared code between packages goes in `packages/shared/`.
- API routes are thin: validate input, call a use case, return response.
- Business logic lives in `lib/[domain]/` or `packages/shared/`, never in components or routes.
- Components receive data via props, never fetch directly (except Server Components).
- Types shared across packages go in `packages/shared/src/types/`.
- New packages can be added without modifying existing ones.
- **Shared package exports**: `packages/shared/package.json` MUST export TypeScript sources directly — NOT compiled `dist/`. This avoids build-order issues in CI where tests run before shared is compiled. Use: `"main": "./src/index.ts"`, `"types": "./src/index.ts"`, and `"exports": { ".": "./src/index.ts" }`. Keep a no-op `"build"` script (e.g. `"build": "echo ok"`) so workspace-level `npm run build -w packages/shared` doesn't fail. The consuming package (web, api, etc.) transpiles shared code via its own bundler (Vite/Next.js).

## Default Stack

- **Framework**: Next.js (App Router) with TypeScript strict mode
- **Database**: PostgreSQL (via Drizzle ORM)
- **Hosting**: Vercel (auto-deploys from main)
- **Styling**: Tailwind CSS
- **Testing**: Vitest

## Conventions

- This is a monorepo. All packages live under `packages/`.
- Server Components by default. Only add "use client" when you need interactivity.
- API routes are thin wrappers: validate → call use case → respond.
- Business logic lives in `lib/[domain]/`, organized by domain, not by technical concern.
- Shared code across packages goes in `packages/shared/`.
- `packages/shared/package.json` must export TypeScript sources directly (`"main": "./src/index.ts"`, `"exports": { ".": "./src/index.ts" }`). NEVER point to `dist/` — the consuming package transpiles via its own bundler.
- Database client is initialized in `lib/db/` — use the Drizzle schema and helpers.
- Run `npx drizzle-kit push` to apply schema changes to the database.
- Environment variables go in `.env.local` (never committed).
- All new utilities and business logic must have tests.

## Commands

```bash
npm run dev        # Start development server (from packages/web)
npm run build      # Production build
npm run lint       # Lint check
npm test           # Run tests (Vitest)
```
