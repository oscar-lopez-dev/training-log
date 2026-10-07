# V1 scope

Decisions for V1 that no published spec or issue captures yet. Terms follow [GLOSSARY.md](../GLOSSARY.md); lasting rationale lives in [docs/adr/](./adr/). Delete a section once its spec or issue is published.

## In scope

| Capability | Home |
|---|---|
| Choosing a Routine preset and Schedule | Weekly plan |
| A Week's Sessions, Session status, moving a Pending Session | Weekly plan |
| Today as the default screen (today's Session or a rest day) | Weekly plan |
| Session Sections, Prescriptions, Exercise notes and image | Train today |
| Set logging, including editing, deleting and adding to past Sessions | Train today |
| Previous performance of an Exercise in Today | Train today |
| Session history, Exercise history, Estimated 1RM | Progress review |
| Owner login and Demo users | Foundation |
| Seed content and demo history | Foundation |

## Non-goals

- Routine builder or editing Workouts, Exercises and Prescriptions: large CRUD surface with no case-study value ([ADR-0003](./adr/0003-seeded-read-only-routine-presets.md)).
- Multi-month training blocks: presets cover one repeating Week ([ADR-0003](./adr/0003-seeded-read-only-routine-presets.md)).
- Public sign-up: one Owner plus Demo users ([ADR-0001](./adr/0001-per-visitor-demo-users.md)).
- Carrying Missed Sessions into the next Week: the Week is the unit ([ADR-0004](./adr/0004-weekly-sessions-derived-status-no-carry-over.md)).
- Moving a Session to another Week, or moving a past Week's Session: same reason.
- "Finish session" button and Session summary screen: status is derived; a summary may come later as its own slice.
- Rest-day validation of Schedules: any N weekdays are allowed.
- Pause or vacation mode: absences show as Missed.
- Showing future Weeks: Sessions exist only up to the current Week.
- Unscheduled extra Sessions: every Session comes from the Schedule.
- Units other than kg, and assisted or negative weights: keeps the Set log simple.
- Cardio and timed Exercises: everything is logged as weight × reps.
- Changing a user's timezone: it would move Week boundaries under past Sessions.
- Equipment or exercise-type attributes in the model: curation is a seed content rule only.
- Offline mode and PWA sync: V1 is online-only; optimistic UI covers slow connections.
- Next-load suggestions: Estimated 1RM is a reference metric only.
- RIR analysis: RIR is a plain optional field.
- Automatic program generation: presets are fixed.
- Bodyweight tracking, zone 2 calculation, wearables: outside the core loop.
- Exercise videos: content and hosting cost.
- Social features and monetization: a single-user product.

## Train today

Decided:

- Sections run warm-up, strength, abs, stretching. Warm-up and stretching are display-only; only weight × reps Exercises get Set logs.
- A Set log needs reps ≥ 1 and an explicitly entered weight ≥ 0 kg (0 means bodyweight). RIR and a note are optional; a note alone is not a Set log.
- Set logs can be edited and deleted, including in past Sessions, and Session status follows.
- Set logs can be added to a past Week's Session, including a Missed one; the Session keeps its day.
- Previous performance of the same Exercise is shown in Today as a quick reference.
- Exercise detail has short technique notes; the image is a deferrable slice with a placeholder and a documented licence source.
- Set logging uses optimistic UI.
- DESIGN.md exists before this spec's first UI-heavy slice.
- The final ticket writes its case study in `docs/case-studies/`.

Open:

- Which earlier Session counts as previous performance (proposed: the last Completed Session containing that Exercise, in any Workout).
- Whether Set log inputs are pre-filled from the Prescription and previous performance.
- The entry point for adding Set logs to a past Session.

## Progress review

Decided:

- Session history: a list with per-Session detail.
- Exercise history: recent marks and one trend chart.
- Estimated 1RM is derived, never stored: Epley formula, shown only for sets of 10 reps or fewer.
- The final ticket writes its case study in `docs/case-studies/`.

Open:

- What "recent marks" means and which metric the trend chart shows.
- Whether Session history lists Missed Sessions.

## Foundation

**Demo users: cleanup, reuse, rate limiting.** First issue after the walking skeleton, done before the deployed link is shared. Open points are in [ADR-0005](./adr/0005-better-auth.md).

**Owner login.** Public sign-up stays disabled ([ADR-0005](./adr/0005-better-auth.md)). The Owner's seed has Routine presets and Exercises only, no history. Open: how the seed creates the Owner.

**Seed content.** About 25 Exercises and 3 Routine presets with 12 Workouts: 3-day Full Body (A, B, C), 4-day Upper/Lower (Upper A, Lower A, Upper B, Lower B), 5-day Push, Pull, Legs, Upper, Lower. Curation rule: free weights first (barbell, dumbbells, cables, pull-ups, dips); the only machines are leg press, leg extension and leg curl; compound lifts come first in each Workout, followed by a few isolation accessories; abs Exercises are rep-based. The Owner reviews the drafted Exercises and Prescriptions before they are final.

**Demo history seed.** 4-day preset; Routine start is the Monday six Weeks before the current Week; plausible progression; includes one moved Session and one Missed Session; the current Week is partly done relative to today. A fixed random seed means the same date always produces the same data. Open: whether "Try the demo" lets the visitor pick the preset (3, 4 or 5 days), with history seeded for the chosen one.

**DESIGN.md.** Written after the walking skeleton and before the first UI-heavy slice.

**Case-study README.** Completed at the end of V1; it summarises each case study in `docs/case-studies/` and links to it.
