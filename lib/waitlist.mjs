/**
 * Server-only endpoint configuration. Keep the client's literal placeholder here
 * and in .env.example until the real HTTPS address is supplied.
 */
export const WAITLIST_PLACEHOLDER = "{{WAITLIST_ENDPOINT}}";

export function resolveWaitlistEndpoint(value) {
  if (!value || value === WAITLIST_PLACEHOLDER) return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.hostname.endsWith(".example") ||
      url.hostname === "localhost"
    ) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function validateWaitlistPayload(payload) {
  const errors = {};
  const email = typeof payload?.email === "string" ? payload.email.trim() : "";
  const name = typeof payload?.name === "string" ? payload.name.trim() : "";
  if (!email || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (name.length > 120 || (payload?.name != null && typeof payload.name !== "string")) {
    errors.name = "Use a name of 120 characters or fewer.";
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
    fields: name ? { email, name } : { email },
  };
}

/**
 * Only a confirmed upstream 2xx produces success. Inject fetch in tests so no
 * test email is sent to a live list. Never log or persist personal information.
 */
export async function submitToWaitlist(fields, endpoint, fetcher = fetch) {
  if (!resolveWaitlistEndpoint(endpoint)) {
    return {
      status: 503,
      ok: false,
      message: "The waitlist is not connected yet. Nothing was saved. Please try again after launch.",
    };
  }
  try {
    const response = await fetcher(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(fields),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      return {
        status: 502,
        ok: false,
        message: "Your submission could not be confirmed. Please try again.",
      };
    }
    return {
      status: 200,
      ok: true,
      message: "Thank you. Your email has been submitted.",
    };
  } catch {
    return {
      status: 502,
      ok: false,
      message: "Your submission could not be confirmed. Please try again.",
    };
  }
}
