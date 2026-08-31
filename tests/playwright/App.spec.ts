import { test as base, BrowserContextOptions, expect } from "@playwright/test";
import playwrightConfig from "@/playwright.config";
import { GenericContainer, StartedTestContainer } from "testcontainers";
import playwrightTestPackageJson from "@playwright/test/package.json" with { type: "json" };
import moment from "moment";

const PLAYWRIGHT_TEST_CONTAINER_START_STOP_TIMEOUT = moment.duration(3, "minutes").asMilliseconds();

const playwrightTestVersion = playwrightTestPackageJson.version;
const url = ((playwrightConfig.webServer as any).url as string).replace(
  "localhost",
  "host.docker.internal",
);
let playwrightContainer: StartedTestContainer;

async function startPlaywrightContainer() {
  return new GenericContainer(`mcr.microsoft.com/playwright:v${playwrightTestVersion}-noble`)
    .withExposedPorts(3001)
    .withUser("pwuser")
    .withWorkingDir("/home/pwuser")
    .withIpcMode("host")
    .withExtraHosts([{ host: "host.docker.internal", ipAddress: "host-gateway" }])
    .withCommand(
      `npx -y playwright@${playwrightTestVersion} run-server --port 3001 --host 0.0.0.0`.split(" "),
    )
    .withStartupTimeout(PLAYWRIGHT_TEST_CONTAINER_START_STOP_TIMEOUT)
    .start();
}

async function globalBeforeAll() {
  playwrightContainer = await startPlaywrightContainer();
  process.env.PW_TEST_CONNECT_WS_ENDPOINT = `ws://127.0.0.1:${playwrightContainer.getFirstMappedPort()}/`;
}

async function globalAfterAll() {
  await playwrightContainer.stop({
    timeout: PLAYWRIGHT_TEST_CONTAINER_START_STOP_TIMEOUT,
  });
}

const test = base.extend<{}, { forEachWorker: void }>({
  forEachWorker: [
    async (_, use) => {
      await globalBeforeAll();
      await use();
      await globalAfterAll();
    },
    {
      scope: "worker",
      auto: true,
      timeout: PLAYWRIGHT_TEST_CONTAINER_START_STOP_TIMEOUT,
    },
  ],
});

const COLOR_SCHEMES_TO_TEST: BrowserContextOptions["colorScheme"][] = ["light", "dark"];

COLOR_SCHEMES_TO_TEST.forEach((colorScheme) => {
  test.describe(`${colorScheme} mode tests`, () => {
    test.use({ colorScheme: colorScheme });
    test("Visual regression testing", async ({ page }) => {
      await page.goto(url);
      await expect(page).toHaveScreenshot();
    });
  });
});
