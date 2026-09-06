import { defineConfig } from "@playwright/test";
import nextConfig from "./next.config";
import { randomInt } from "node:crypto";

process.env.WEB_SERVER_PORT = process.env.WEB_SERVER_PORT ?? String(randomInt(49152, 65536));

export default defineConfig({
  // Run your local dev server before starting the tests
  webServer: {
    command:
      "rm -rf /tmp/out && mkdir -p /tmp/out && cp -R out /tmp/out" +
      nextConfig.basePath +
      " && pnpm exec http-server /tmp/out -p " +
      process.env.WEB_SERVER_PORT,
    url: "http://localhost:" + process.env.WEB_SERVER_PORT + nextConfig.basePath,
    stdout: "ignore",
    stderr: "pipe",
  },
  testDir: "./tests/playwright",
  snapshotPathTemplate: "{testDir}/{testFileName}-snapshots/{arg}{ext}",
  use: { viewport: { width: 1920, height: 1080 } },
});
