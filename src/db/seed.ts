import { sql } from "drizzle-orm";
import type { Database } from "./client";
import { routinePresets, workouts } from "./schema";

const presets = [
  {
    id: "full-body-3",
    name: "3-day Full Body",
    daysPerWeek: 3,
    workoutNames: ["Full Body A", "Full Body B", "Full Body C"],
  },
  {
    id: "upper-lower-4",
    name: "4-day Upper/Lower",
    daysPerWeek: 4,
    workoutNames: ["Upper A", "Lower A", "Upper B", "Lower B"],
  },
  {
    id: "push-pull-legs-upper-lower-5",
    name: "5-day Push, Pull, Legs, Upper, Lower",
    daysPerWeek: 5,
    workoutNames: ["Push", "Pull", "Legs", "Upper", "Lower"],
  },
];

/** Inserts the Routine presets and their Workout names. Safe to run repeatedly. */
export async function seedRoutinePresets(db: Database): Promise<void> {
  await db.transaction(async (tx) => {
    await tx
      .insert(routinePresets)
      .values(presets.map(({ id, name, daysPerWeek }) => ({ id, name, daysPerWeek })))
      .onConflictDoUpdate({
        target: routinePresets.id,
        set: {
          name: sql`excluded.name`,
          daysPerWeek: sql`excluded.days_per_week`,
        },
      });

    await tx
      .insert(workouts)
      .values(
        presets.flatMap((preset) =>
          preset.workoutNames.map((name, index) => ({
            id: `${preset.id}-${index + 1}`,
            routinePresetId: preset.id,
            name,
            position: index + 1,
          })),
        ),
      )
      .onConflictDoUpdate({
        target: workouts.id,
        set: { name: sql`excluded.name` },
      });
  });
}
