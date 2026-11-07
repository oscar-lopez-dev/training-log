import { migrateTestDatabase } from "./test-database";

export async function setup() {
  await migrateTestDatabase();
}
