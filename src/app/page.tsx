import { connection } from "next/server";
import { Suspense } from "react";
import { listRoutinePresetsAction } from "./actions";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Routine presets</h1>
      <Suspense fallback={<p className="mt-6 text-zinc-500">Loading presets…</p>}>
        <RoutinePresetList />
      </Suspense>
    </main>
  );
}

async function RoutinePresetList() {
  // Presets live in the database, so read them per request rather than at build time.
  await connection();
  const presets = await listRoutinePresetsAction();

  return (
    <ul className="mt-6 space-y-4">
      {presets.map((preset) => (
        <li key={preset.id} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <h2 className="text-lg font-medium">{preset.name}</h2>
          <p className="text-sm text-zinc-500">{preset.daysPerWeek} days per week</p>
          <ol className="mt-2 flex flex-wrap gap-2 text-sm">
            {preset.workouts.map((workout) => (
              <li key={workout.name} className="rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-900">
                {workout.name}
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ul>
  );
}
