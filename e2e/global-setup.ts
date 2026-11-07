import "dotenv/config";
import { seedRoutinePresets } from "@/db/seed";
import { createTestDatabase, migrateTestDatabase } from "@/test/test-database";

export default async function globalSetup() {
  await migrateTestDatabase();
  const db = createTestDatabase();
  try {
    await seedRoutinePresets(db);
  } finally {
    await db.$client.end();
  }
}
