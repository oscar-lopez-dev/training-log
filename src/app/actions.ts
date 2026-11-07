"use server";

import { appDatabase } from "@/db/app-database";
import { listRoutinePresets } from "@/use-cases/list-routine-presets";

export async function listRoutinePresetsAction() {
  return listRoutinePresets(appDatabase());
}
