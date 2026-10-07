# Training Log

A training app for following a structured weekly Routine: see today's Session, log it fast on mobile, and review progress.

## Language

### Planning

**Routine preset**:
A seeded, read-only training plan with a fixed number of training days per week, its Workouts and a recommended Schedule.
_Avoid_: program, template, plan

**Routine**:
The Routine preset a user has selected, together with that user's Schedule.
_Avoid_: program, plan

**Workout**:
One named training day within a Routine preset (e.g. Workout A, Upper A), made of Sections of Exercises with Prescriptions.
_Avoid_: block, day, template

**Schedule**:
The weekdays on which a user trains each Workout of their Routine, in effect from a given date. A user's past Schedules remain part of their history.
_Avoid_: calendar, plan

**Week**:
Monday to Sunday, in the user's timezone.

**Section**:
An ordered part of a Workout: warm-up, strength, abs or stretching.

**Exercise**:
A movement, with short technique notes and an optional image.
_Avoid_: movement, lift

**Prescription**:
The target for an Exercise within a Workout: sets, reps and indicative rest.
_Avoid_: target, plan

### Execution

**Session**:
One dated occurrence of a Workout for a user, on a day of a Week.
_Avoid_: workout (for the dated occurrence), planned session, training, day

**Original day**:
The day the Schedule assigned to a Session. It never changes, even when the Session is moved.

**Moved**:
True of a Session whose current day differs from its Original day. A fact about the Session, not a Session status.
_Avoid_: rescheduled, postponed

**Remaining day**:
Today or any later day of the current Week.

**Set log**:
One recorded set within a Session: reps (at least 1) and weight in kg (0 for bodyweight), with optional RIR and a short note.
_Avoid_: entry, record

### Session status

A Session always has exactly one status, which follows from its Set logs and its Week.

**Pending**:
A Session with no Set logs whose Week has not ended.
_Avoid_: planned, scheduled, upcoming

**Completed**:
A Session with at least one Set log, however many of its Exercises were logged.
_Avoid_: done, finished

**Missed**:
A Session with no Set logs whose Week has ended. Missed Sessions are never carried into the next Week.
_Avoid_: skipped, overdue

### Review

**Estimated 1RM**:
A reference value derived from a Set log's weight and reps; never recorded directly.
_Avoid_: max, 1RM (unqualified), PR

### Access

**Owner**:
The single account holder whose real training data the app holds.

**Demo user**:
A temporary user created for one visitor, holding seeded data, removed after about a day.
_Avoid_: guest, test user
