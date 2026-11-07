import { integer, pgTable, text, unique } from "drizzle-orm/pg-core";

export const routinePresets = pgTable("routine_presets", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  daysPerWeek: integer("days_per_week").notNull(),
});

export const workouts = pgTable(
  "workouts",
  {
    id: text("id").primaryKey(),
    routinePresetId: text("routine_preset_id")
      .notNull()
      .references(() => routinePresets.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    position: integer("position").notNull(),
  },
  (table) => [unique().on(table.routinePresetId, table.position)],
);
