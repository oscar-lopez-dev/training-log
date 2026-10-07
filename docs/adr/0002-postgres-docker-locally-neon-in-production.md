# PostgreSQL: Docker Compose locally, Neon in production

We use PostgreSQL (accessed through Drizzle) running in Docker Compose for local development and CI, and Neon in production alongside Vercel. SQLite/Turso was the real alternative and would have removed Docker from local setup. We chose Postgres for its stronger constraints, transactions and date/time types, because Neon's serverless driver fits Vercel functions, and because Docker Compose runs the same engine locally, in CI and in production, which keeps setup deterministic.
