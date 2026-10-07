# Per-visitor demo users instead of a shared demo account

Reviewers must be able to try the app without signing up, and the Owner's data must stay private. "Try the demo" creates a fresh Demo user per visitor, seeded deterministically relative to today, and deletes it after about 24 hours; there is no public sign-up.

## Considered Options

- **Shared demo account reset nightly**: simpler, but concurrent reviewers collide and see each other's edits.
- **Open sign-up**: email verification and password reset add surface area without adding anything to the case study.

## Consequences

Every piece of user data is user-scoped from day one, and a scheduled cleanup removes expired Demo users.
