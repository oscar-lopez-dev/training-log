import { createDatabase, type Database } from "./client";
import { requiredEnv } from "./required-env";

const globalForDatabase = globalThis as unknown as { database?: Database };

/** The app's shared database handle, reused across hot reloads in development. */
export function appDatabase(): Database {
  globalForDatabase.database ??= createDatabase(requiredEnv("DATABASE_URL"));
  return globalForDatabase.database;
}
