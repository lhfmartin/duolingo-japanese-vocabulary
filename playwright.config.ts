import { defineConfig } from "@playwright/test";
import nextConfig from "./next.config";

export default defineConfig({
  // Run your local dev server before starting the tests
  webServer: {
    command: "pnpm dev -H 0.0.0.0",
    url: "http://localhost:3000" + nextConfig.basePath,
    stdout: "ignore",
    stderr: "pipe",
  },
  testDir: "./tests/playwright",
  snapshotPathTemplate: "{testDir}/{testFileName}-snapshots/{arg}{ext}",
  use: { viewport: { width: 1920, height: 1080 } },
});
