import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { seedRoutinePresets } from "@/db/seed";
import { createTestDatabase } from "@/test/test-database";
import { listRoutinePresets } from "./list-routine-presets";

const db = createTestDatabase();

beforeAll(async () => {
  // Seeding twice proves the seed is idempotent.
  await seedRoutinePresets(db);
  await seedRoutinePresets(db);
});

afterAll(async () => {
  await db.$client.end();
});

describe("listRoutinePresets", () => {
  it("returns the seeded Routine presets by days per week, each with its Workouts in order", async () => {
    const presets = await listRoutinePresets(db);

    expect(
      presets.map((preset) => ({
        name: preset.name,
        daysPerWeek: preset.daysPerWeek,
        workouts: preset.workouts.map((workout) => workout.name),
      })),
    ).toEqual([
      {
        name: "3-day Full Body",
        daysPerWeek: 3,
        workouts: ["Full Body A", "Full Body B", "Full Body C"],
      },
      {
        name: "4-day Upper/Lower",
        daysPerWeek: 4,
        workouts: ["Upper A", "Lower A", "Upper B", "Lower B"],
      },
      {
        name: "5-day Push, Pull, Legs, Upper, Lower",
        daysPerWeek: 5,
        workouts: ["Push", "Pull", "Legs", "Upper", "Lower"],
      },
    ]);
  });
});
