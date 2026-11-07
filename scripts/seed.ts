import "dotenv/config";
import { createDatabase } from "@/db/client";
import { requiredEnv } from "@/db/required-env";
import { seedRoutinePresets } from "@/db/seed";

async function main() {
  const db = createDatabase(requiredEnv("DATABASE_URL"));
  try {
    await seedRoutinePresets(db);
  } finally {
    await db.$client.end();
  }
  console.log("Seeded Routine presets.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
