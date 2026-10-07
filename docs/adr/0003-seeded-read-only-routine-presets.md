# Routine presets are seeded and read-only in V1

Users pick one of three seeded Routine presets (3-day full body, 4-day upper/lower, 5-day push/pull/legs-style split) and configure only their Schedule; Workouts, Exercises and Prescriptions cannot be edited. A routine builder is a large CRUD surface that adds nothing to the case study, and read-only content keeps the demo coherent and the seed deterministic. Multi-month training blocks and transitions between them are not modelled.

## Consequences

A user's Routine references preset Workouts instead of owning copies. Allowing Workout editing later means introducing user-owned Workouts and migrating existing Sessions to point at them.
