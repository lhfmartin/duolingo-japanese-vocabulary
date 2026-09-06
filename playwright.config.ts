import { defineConfig } from "@playwright/test";
import nextConfig from "./next.config";
import { randomInt } from "node:crypto";

process.env.WEB_SERVER_PORT = process.env.WEB_SERVER_PORT ?? String(randomInt(49152, 65536));
process.env.EMPTY_BASE_PATH = "true";

export default defineConfig({
  // Run your local dev server before starting the tests
  webServer: {
    command: "pnpm build && pnpm exec http-server out -p " + process.env.WEB_SERVER_PORT,
    url: "http://localhost:" + process.env.WEB_SERVER_PORT,
    stdout: "ignore",
    stderr: "pipe",
  },
  testDir: "./tests/playwright",
  snapshotPathTemplate: "{testDir}/{testFileName}-snapshots/{arg}{ext}",
  use: { viewport: { width: 1920, height: 1080 } },
});
