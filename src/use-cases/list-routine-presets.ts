import { asc } from "drizzle-orm";
import type { Database } from "@/db/client";
import { routinePresets, workouts } from "@/db/schema";
import { orderByDaysPerWeek, type RoutinePreset } from "@/domain/routine-presets";

export async function listRoutinePresets(db: Database): Promise<RoutinePreset[]> {
  const [presetRows, workoutRows] = await Promise.all([
    db.select().from(routinePresets),
    db.select().from(workouts).orderBy(asc(workouts.position)),
  ]);

  return orderByDaysPerWeek(
    presetRows.map((preset) => ({
      id: preset.id,
      name: preset.name,
      daysPerWeek: preset.daysPerWeek,
      workouts: workoutRows
        .filter((workout) => workout.routinePresetId === preset.id)
        .map((workout) => ({ name: workout.name })),
    })),
  );
}
