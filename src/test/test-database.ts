import { migrate } from "drizzle-orm/postgres-js/migrator";
import { createDatabase, type Database } from "@/db/client";
import { requiredEnv } from "@/db/required-env";

export function createTestDatabase(): Database {
  return createDatabase(requiredEnv("TEST_DATABASE_URL"));
}

/** Brings the test database up to the latest migration. */
export async function migrateTestDatabase(): Promise<void> {
  const db = createTestDatabase();
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
  } finally {
    await db.$client.end();
  }
}
