import assert from "node:assert/strict";
import test from "node:test";
import { resolveWaitlistEndpoint, validateWaitlistPayload, submitToWaitlist } from "../lib/waitlist.mjs";

test("placeholder and unsafe endpoint values cannot receive personal data", () => {
  for (const value of [undefined, "", "{{WAITLIST_ENDPOINT}}", "http://live.test", "https://book.ninecypresses.example/", "https://user:pass@live.test/"]) {
    assert.equal(resolveWaitlistEndpoint(value), null);
  }
  assert.equal(resolveWaitlistEndpoint("https://list.test/join"), "https://list.test/join");
});

test("email is required; name is optional; only supplied fields are forwarded", () => {
  assert.equal(validateWaitlistPayload({ email: "" }).valid, false);
  assert.equal(validateWaitlistPayload({ email: "not-an-email" }).valid, false);
  assert.equal(validateWaitlistPayload({ email: "a@b.test", name: "x".repeat(121) }).valid, false);
  assert.deepEqual(validateWaitlistPayload({ email: " guest@test.invalid ", name: "  ", unrelated: "ignored" }).fields, { email: "guest@test.invalid" });
  assert.deepEqual(validateWaitlistPayload({ email: "guest@test.invalid", name: " Eleni " }).fields, { email: "guest@test.invalid", name: "Eleni" });
});

test("unconfigured submissions fail truthfully and make no network call", async () => {
  const result = await submitToWaitlist({ email: "guest@test.invalid" }, "{{WAITLIST_ENDPOINT}}", () => { throw new Error("Must not fetch"); });
  assert.equal(result.status, 503);
  assert.equal(result.ok, false);
  assert.match(result.message, /Nothing was saved/);
});

test("a confirmed upstream acceptance submits exactly the two fields", async () => {
  const fields = { email: "guest@test.invalid", name: "Guest" };
  const result = await submitToWaitlist(fields, "https://list.test/join", async (url, options) => {
    assert.equal(url, "https://list.test/join");
    assert.equal(options.method, "POST");
    assert.deepEqual(JSON.parse(options.body), fields);
    assert.equal(options.redirect, "error");
    return new Response("", { status: 201 });
  });
  assert.equal(result.ok, true);
  assert.equal(result.status, 200);
});

test("upstream errors and interrupted connections never produce fake success", async () => {
  const rejection = await submitToWaitlist({ email: "guest@test.invalid" }, "https://list.test/join", async () => new Response("", { status: 500 }));
  assert.equal(rejection.ok, false);
  const timeout = await submitToWaitlist({ email: "guest@test.invalid" }, "https://list.test/join", async () => { throw new Error("Timeout"); });
  assert.equal(timeout.ok, false);
  assert.match(timeout.message, /could not be confirmed/);
});
