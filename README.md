# Training Log

A training app for following a structured weekly Routine: see today's Session, log it fast on mobile, and review progress. Terms follow [GLOSSARY.md](./GLOSSARY.md); decisions live in [docs/adr/](./docs/adr/).

## Stack

Next.js (App Router) with TypeScript and Tailwind, PostgreSQL through Drizzle (Docker Compose locally, [ADR-0002](./docs/adr/0002-postgres-docker-locally-neon-in-production.md)), Vitest and Playwright.

## Layout

| Path | What lives there |
|---|---|
| `src/domain/` | Pure training rules. Imports nothing from Next.js, Drizzle or the clock ([ADR-0006](./docs/adr/0006-pure-domain-module-without-ports.md)). |
| `src/use-cases/` | Load data with Drizzle and call the domain module. |
| `src/app/` | Pages and the Server Actions that call use cases. |
| `src/db/` | Drizzle schema, database client and seed. |
| `drizzle/` | Generated SQL migrations. |
| `e2e/` | Playwright tests. |

## Run it locally

Requirements: Node.js, pnpm and Docker.

```sh
pnpm install
cp .env.example .env           # DATABASE_URL and TEST_DATABASE_URL
pnpm db:up                     # start Postgres in Docker Compose and wait until it is healthy
pnpm db:migrate                # apply migrations to the development database
pnpm db:seed                   # insert the Routine presets (safe to run again)
pnpm dev                       # http://localhost:3000
```

`pnpm db:down` stops Postgres and keeps its data. `docker compose down -v` also deletes the data volume. After changing `src/db/schema.ts`, run `pnpm db:generate` to write a new migration.

The Compose container creates two databases on its first start: `training_log` for development and `training_log_test` for tests. If you created the volume before the test database existed, recreate it with `docker compose down -v && pnpm db:up`.

## Tests and checks

Postgres must be running (`pnpm db:up`) for integration and end-to-end tests. Both use the test database and apply migrations to it themselves.

```sh
pnpm test:unit          # Vitest unit tests for the domain module, no database
pnpm test:integration   # Vitest use-case tests against real Postgres, no mocks
pnpm test               # both Vitest suites
pnpm test:e2e           # Playwright; starts the app on port 3100 against the test database
pnpm typecheck          # generate Next.js route types, then tsc
pnpm lint               # ESLint
```

Before the first end-to-end run, install the browser with `pnpm exec playwright install chromium`.
