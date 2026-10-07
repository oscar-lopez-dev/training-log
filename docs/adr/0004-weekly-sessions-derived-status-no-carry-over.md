# Sessions are derived per Week from stored facts, and Missed Sessions never carry over

Each Workout is tied to a weekday by the Schedule, and every Week starts again from the first Workout. Sessions are not stored ahead of time: the domain module computes a Week's Sessions and their status (Pending, Completed, Missed) from the Schedule history, the stored Session rows, the Set logs and today. A Session row is persisted only on its first Set log or when it is moved; reading a Week writes nothing. A Pending Session can be moved, any number of times, to a Remaining day of the same Week that has no Session; its Original day never changes.

We derive instead of storing because the stored facts (Schedule history, Set logs, moves) are then the single source of truth, so nothing stored can contradict them; planning rules can change without data migrations; and there is no end-of-Week job and no write on read.

## Considered Options

- **Continuous sequence across Weeks**: the next Session takes the Workout after the last Completed one, so a skipped day shifts every later Workout. Rejected because it dissolves the Week as the unit the user plans and reviews, and makes moving a Session meaningless.
- **Explicit "Finish session"**: adds an in-progress state and a way to forget to finish mid-gym. Rejected; a partial Session counts as Completed.
- **Storing every Session with its status**: needs a job or a write on read to create Sessions and mark them Missed, and a stored status can drift from the Set logs.

## Consequences

- There is deliberately no carry-over of Missed Sessions into the next Week; do not "fix" this.
- Adding, editing or deleting Set logs, including in past Weeks, can change a Session between Completed and Missed.
- History combines derived and stored Sessions, and status cannot be filtered in SQL.
