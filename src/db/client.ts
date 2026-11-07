import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export function createDatabase(url: string) {
  return drizzle(postgres(url), { schema });
}

export type Database = ReturnType<typeof createDatabase>;
