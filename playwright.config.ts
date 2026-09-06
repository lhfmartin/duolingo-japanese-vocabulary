import { defineConfig } from "@playwright/test";
import nextConfig from "./next.config";
import { randomInt } from "node:crypto";

process.env.WEB_SERVER_PORT = process.env.WEB_SERVER_PORT ?? String(randomInt(49152, 65536));

export default defineConfig({
  // Run your local dev server before starting the tests
  webServer: {
    command: `node tests/test-utils/web-server.mts --port ${process.env.WEB_SERVER_PORT} --rewrite-rule ${nextConfig.basePath}:`,
    url: "http://localhost:" + process.env.WEB_SERVER_PORT + nextConfig.basePath,
    stdout: "ignore",
    stderr: "pipe",
  },
  testDir: "./tests/playwright",
  snapshotPathTemplate: "{testDir}/{testFileName}-snapshots/{arg}{ext}",
  use: { viewport: { width: 1920, height: 1080 } },
});
