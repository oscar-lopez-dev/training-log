import { describe, expect, it } from "vitest";
import { orderByDaysPerWeek } from "./routine-presets";

describe("orderByDaysPerWeek", () => {
  it("lists Routine presets from fewest to most training days per week", () => {
    const presets = [
      { id: "ppl", name: "5-day", daysPerWeek: 5, workouts: [{ name: "Push" }] },
      { id: "fb", name: "3-day", daysPerWeek: 3, workouts: [{ name: "Full Body A" }] },
      { id: "ul", name: "4-day", daysPerWeek: 4, workouts: [{ name: "Upper A" }] },
    ];

    expect(orderByDaysPerWeek(presets).map((preset) => preset.name)).toEqual([
      "3-day",
      "4-day",
      "5-day",
    ]);
  });
});
