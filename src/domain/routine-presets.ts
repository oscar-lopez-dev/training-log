export type Workout = {
  name: string;
};

export type RoutinePreset = {
  id: string;
  name: string;
  daysPerWeek: number;
  workouts: Workout[];
};

export function orderByDaysPerWeek(presets: readonly RoutinePreset[]): RoutinePreset[] {
  return [...presets].sort((a, b) => a.daysPerWeek - b.daysPerWeek);
}
