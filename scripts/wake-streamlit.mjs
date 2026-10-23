// Visits each Streamlit app in a real browser. If the app is asleep,
// presses the wake button and waits until the sleep screen is gone.
// Streamlit Community Cloud puts apps to sleep when nobody visits,
// and a plain HTTP request does not count as a visit.
import { chromium } from "playwright";

const apps = [
  "https://rbicommunication.streamlit.app/",
  "https://india-macro-pulse.streamlit.app/",
];

const SLEEP_TEXT = /gone to sleep|get this app back up/i;

async function sleepScreenVisible(page) {
  for (const frame of page.frames()) {
    const text = await frame.evaluate(() => document.body?.innerText || "").catch(() => "");
    if (SLEEP_TEXT.test(text)) return true;
  }
  return false;
}

async function appRendered(page) {
  for (const frame of page.frames()) {
    const n = await frame.locator('[data-testid="stAppViewContainer"]').count().catch(() => 0);
    if (n > 0) return true;
  }
  return false;
}

const browser = await chromium.launch();
let failed = false;

for (const url of apps) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForTimeout(8_000);

    if (await sleepScreenVisible(page)) {
      console.log(`${url} was asleep, waking it`);
      for (const frame of page.frames()) {
        const btn = frame.getByRole("button", { name: /get this app back up/i });
        if (await btn.count().catch(() => 0)) { await btn.first().click(); break; }
      }
    } else {
      console.log(`${url} was not on the sleep screen`);
    }

    // Give the app up to four minutes to come up, checking every 10 seconds.
    const deadline = Date.now() + 240_000;
    let up = false;
    while (Date.now() < deadline) {
      await page.waitForTimeout(10_000);
      if (await appRendered(page)) { up = true; break; }
      if (!(await sleepScreenVisible(page)) && Date.now() > deadline - 180_000) { up = true; break; }
    }

    if (up) {
      // Stay a little so the session counts as a real visit.
      await page.waitForTimeout(20_000);
      console.log(`${url} is up`);
    } else {
      failed = true;
      console.error(`${url} is still on the sleep screen after four minutes`);
    }
  } catch (err) {
    failed = true;
    console.error(`${url} did not load: ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
process.exit(failed ? 1 : 0);
