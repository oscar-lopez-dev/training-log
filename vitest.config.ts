import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import "dotenv/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.test.ts"],
          exclude: ["src/**/*.integration.test.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "integration",
          include: ["src/**/*.integration.test.ts"],
          globalSetup: ["src/test/integration-setup.ts"],
        },
      },
    ],
  },
});
