import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.argv[2] || "http://localhost:3000";
const output = "test-results";
await fs.mkdir(output, { recursive: true });

const normalise = (text) => text.replace(/\s+/g, " ").trim();
const brief = await fs.readFile("BRIEF.md", "utf8");
const copySection = brief.split("## Copy — use as written")[1].split("## Things we have not decided")[0];
const expected = [];
let paragraph = [];
for (const line of [...copySection.split("\n"), ""]) {
  if (line.startsWith(">") && line.slice(1).trim()) {
    paragraph.push(line.replace(/^>\s?/, "").replaceAll("**", ""));
  } else if (paragraph.length) {
    expected.push(normalise(paragraph.join(" ")));
    paragraph = [];
  }
}
assert.equal(expected.length, 14, "All 14 supplied copy paragraphs were extracted");

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const report = { base, capturedAt: new Date().toISOString(), expectedCopyParagraphs: expected.length, viewports: [], checks: {} };
const errors = [];

try {
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    const height = width <= 390 ? 844 : 1000;
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    const network = [];
    page.on("request", (request) => network.push(request.url()));
    await page.goto(base, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const actual = (await page.locator("[data-copy]").allTextContents()).map(normalise);
    assert.deepEqual(actual, expected, `Copy at ${width}px matches BRIEF.md exactly`);

    // Scroll lazy images into view, then return to the initial frame.
    for (const image of await page.locator("main img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element) => {
        if (element.complete) return;
        return new Promise((resolve) => { element.onload = resolve; element.onerror = resolve; });
      });
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const geometry = await page.evaluate(() => {
      const overflow = [...document.querySelectorAll("main *, header *")]
        .filter((element) => {
          const style = getComputedStyle(element);
          if (style.display === "none" || style.position === "absolute") return false;
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1);
        })
        .map((element) => `${element.tagName}.${element.className}`);
      const headline = document.querySelector("h1");
      const booking = document.querySelector(".hero-actions .button").getBoundingClientRect();
      const images = [...document.querySelectorAll("main img")].map((image) => ({
        file: image.closest("[data-photo]").dataset.photo,
        loaded: image.complete && image.naturalWidth > 0,
        currentSrc: image.currentSrc,
      }));
      return {
        viewportWidth: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        pageHeight: document.documentElement.scrollHeight,
        domNodes: document.querySelectorAll("*").length,
        overflow,
        headlineFont: getComputedStyle(headline).fontFamily,
        headlineSize: getComputedStyle(headline).fontSize,
        primaryBookingBottom: booking.bottom,
        images,
      };
    });
    assert.equal(geometry.documentWidth, width, `No horizontal document overflow at ${width}px`);
    assert.deepEqual(geometry.overflow, [], `No offscreen content at ${width}px`);
    assert.equal(geometry.images.length, 9);
    assert(geometry.images.every((image) => image.loaded), `All nine supplied images loaded at ${width}px`);
    assert(geometry.primaryBookingBottom < height, `Primary hero booking visible in first viewport at ${width}px`);
    assert.deepEqual(pageErrors, [], "No JavaScript runtime errors");
    const bookingLinks = await page.locator('a[href="https://book.ninecypresses.example/"]').evaluateAll((links) => links.map((link) => ({ target: link.target, rel: link.rel })));
    assert.equal(bookingLinks.length, 4);
    assert(bookingLinks.every((link) => link.target === "_blank" && link.rel.includes("noopener") && link.rel.includes("noreferrer")));
    assert.equal((await context.cookies()).length, 0, "No cookies");
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0, "No browser storage");
    const externalHosts = [...new Set(network.filter((url) => url.startsWith("http")).map((url) => new URL(url).hostname))].filter((host) => host !== new URL(base).hostname);
    assert.deepEqual(externalHosts, ["images.unsplash.com"], "Only supplied photo host is requested externally");

    let violations = [];
    if ([390, 1440].includes(width)) {
      const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"]).analyze();
      violations = accessibility.violations.map((violation) => ({ id: violation.id, impact: violation.impact, help: violation.help, nodes: violation.nodes.map((node) => node.target) }));
      if (violations.length) errors.push({ width, violations });
      await page.screenshot({ path: path.join(output, `${width}-first-screen.png`) });
      await page.screenshot({ path: path.join(output, `${width}-full-page.png`), fullPage: true });
    }
    report.viewports.push({ width, ...geometry, externalHosts, violations });
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator(".hero-actions a[href='#waitlist']").click();
  assert.equal(new URL(page.url()).hash, "#waitlist");
  await page.locator("#waitlist-email").fill("qa@test.invalid");
  const pending = page.waitForResponse((response) => response.url().endsWith("/api/waitlist") && response.request().method() === "POST");
  await page.getByRole("button", { name: "Keep me posted" }).click();
  assert.equal((await pending).status(), 503, "Unconfigured endpoint refuses signup");
  await page.getByRole("status").getByText(/Nothing was saved/).waitFor();
  assert.equal(await page.locator("#waitlist-email").inputValue(), "qa@test.invalid", "Failed submission retains input");
  assert.equal(await page.getByRole("button", { name: "Keep me posted" }).isDisabled(), false, "Submission button recovers");
  report.checks.waitlistPlaceholder = "503 + truthful feedback; input retained; no signup";

  await page.locator("#waitlist-email").fill("bad-address");
  assert.equal(await page.locator("#waitlist-email").evaluate((input) => input.checkValidity()), false);
  report.checks.nativeEmailValidation = "passes";
  const invalid = await context.request.post(`${base}/api/waitlist`, { data: { email: "" }, headers: { Accept: "application/json" } });
  assert.equal(invalid.status(), 400);
  const originBlocked = await context.request.post(`${base}/api/waitlist`, { data: { email: "qa@test.invalid" }, headers: { Accept: "application/json", Origin: "https://unrelated.test" } });
  assert.equal(originBlocked.status(), 403);
  const oversized = await context.request.post(`${base}/api/waitlist`, { data: { email: "qa@test.invalid", name: "a".repeat(9000) }, headers: { Accept: "application/json" } });
  assert.equal(oversized.status(), 413);
  report.checks.serverValidation = "400 invalid, 403 cross-origin, 413 oversized";

  const metadata = await page.evaluate(() => ({
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    schema: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent),
    lang: document.documentElement.lang,
    h1: document.querySelectorAll("h1").length,
  }));
  assert.equal(metadata.canonical, "https://ninecypresses.example/");
  assert.equal(metadata.schema["@type"], "Hotel");
  assert.equal(metadata.schema.numberOfRooms, 12);
  assert.equal(metadata.h1, 1);
  assert.equal(metadata.lang, "en");
  report.checks.metadata = metadata;
  await page.emulateMedia({ media: "screen" });

  await page.goto(base);
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement.textContent), "Skip to content");
  await page.keyboard.press("Enter");
  assert.equal(new URL(page.url()).hash, "#main");
  report.checks.keyboard = "Skip link is first keyboard target and works";
  await context.close();

  const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(base, { waitUntil: "networkidle" });
  assert.equal(await reducedPage.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), "auto");
  const motion = await reducedPage.evaluate(() => [...document.querySelectorAll("*")].filter((element) => {
    const style = getComputedStyle(element);
    return style.animationName !== "none" || style.transitionDuration.split(",").some((value) => parseFloat(value) > 0);
  }).length);
  assert.equal(motion, 0);
  report.checks.reducedMotion = "No active animations/transitions; native anchor scroll";
  await reduced.close();

  const noJs = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const noJsPage = await noJs.newPage();
  await noJsPage.goto(base);
  assert.deepEqual((await noJsPage.locator("[data-copy]").allTextContents()).map(normalise), expected);
  assert.equal(await noJsPage.locator("h1").isVisible(), true);
  await noJsPage.locator("#waitlist-email").fill("qa@test.invalid");
  // Submit natively from the focused email input; unlike a click this does not
  // race the browser's smooth scrolling while JavaScript is disabled.
  await noJsPage.locator("#waitlist-email").press("Enter");
  await noJsPage.getByText(/Nothing was saved/).waitFor();
  assert.equal(await noJsPage.getByRole("link", { name: "Back to the waitlist" }).count(), 1);
  report.checks.noJavaScript = "All copy visible; native form gives truthful HTML failure and return link";
  await noJs.close();
} finally {
  await browser.close();
  report.failures = errors;
  await fs.writeFile(path.join(output, "qa.json"), JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
}
assert.deepEqual(errors, [], "No automated accessibility violations");
console.log("All browser checks passed.");
