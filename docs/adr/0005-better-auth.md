# Better Auth for the Owner login and anonymous Demo users

We use Better Auth with database sessions in Postgres through its Drizzle adapter. Its anonymous sign-in fits per-visitor Demo users (ADR-0001), and email/password with public sign-up disabled covers the single Owner. Auth.js was rejected because credentials sign-in forces JWT sessions and it has no anonymous users; hand-rolled sessions were rejected as a security liability in a portfolio piece.

## Open points (resolve when the auth issue is defined)

- How the seed creates the Owner while public sign-up is disabled; check the current Better Auth docs.
- Removing Demo users after about 24 hours likely needs a scheduled job of our own.
- "Try the demo" should reuse a visitor's existing Demo user instead of creating another, and needs basic rate limiting, since each click creates a user plus seeded history.
