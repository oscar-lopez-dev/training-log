# A pure domain module, without ports or repository interfaces

Training rules (Week planning, Session status, move rules, Estimated 1RM, choosing previous performance) live in a domain module that imports nothing from Next.js, Drizzle or the system clock; it receives today as an input. Use cases load and save data by calling Drizzle directly, call the domain module, and are invoked from Server Actions.

## Considered Options

- **Ports and repository interfaces (hexagonal style)**: rejected for V1. The rules most likely to change already live in the pure domain module, and use cases are tested against real Postgres, so an extra abstraction over the database would add indirection without making anything easier to test or replace.

## Consequences

Domain rules get fast unit tests with no database. Use-case tests need a running Postgres (Docker Compose locally and in CI).
