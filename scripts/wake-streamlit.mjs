// Visits each Streamlit app in a real browser. If the app is asleep,
// presses the wake button and waits until the app has rendered.
// Streamlit Community Cloud puts apps to sleep when nobody visits,
// and a plain HTTP request does not count as a visit.
import { chromium } from "playwright";

const apps = [
  "https://rbicommunication.streamlit.app/",
  "https://india-macro-pulse.streamlit.app/",
];

const browser = await chromium.launch();
let failed = false;

for (const url of apps) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    const wake = page.getByRole("button", { name: /get this app back up/i });
    if (await wake.isVisible({ timeout: 8_000 }).catch(() => false)) {
      console.log(`${url} was asleep, waking it`);
      await wake.click();
    } else {
      console.log(`${url} already awake`);
    }
    // Wait for the app itself to render something.
    await page.waitForSelector('[data-testid="stAppViewContainer"]', { timeout: 240_000 });
    await page.waitForTimeout(15_000);
    console.log(`${url} is up`);
  } catch (err) {
    failed = true;
    console.error(`${url} did not come up: ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
process.exit(failed ? 1 : 0);
