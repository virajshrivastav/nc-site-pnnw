import { validateWaitlistPayload, submitToWaitlist, WAITLIST_PLACEHOLDER } from "@/lib/waitlist.mjs";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

function reply(request: Request, body: { ok: boolean; message: string; errors?: object }, status: number) {
  const headers = { "Cache-Control": "no-store" };
  if (request.headers.get("accept")?.includes("application/json")) {
    return Response.json(body, { status, headers });
  }
  // Native form submission remains useful without JavaScript. No personal data
  // is echoed into this document or into its URL.
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Waitlist — Nine Cypresses</title><style>body{margin:0;background:#F3EFE6;color:#2B4C7E;font:18px/1.6 system-ui,sans-serif}main{max-width:36rem;margin:12vh auto;padding:2rem}h1{font:400 3rem/1.1 Georgia,serif}a{color:inherit;text-underline-offset:.3em}a:focus-visible{outline:3px solid #2B4C7E;outline-offset:6px}</style></head><body><main><p>Nine Cypresses</p><h1>${body.ok ? "Thank you." : "Waitlist"}</h1><p>${escapeHtml(body.message)}</p>${body.errors ? Object.values(body.errors).map((error) => `<p>${escapeHtml(String(error))}</p>`).join("") : ""}<a href="/#waitlist">Back to the waitlist</a></main></body></html>`,
    { status, headers: { ...headers, "Content-Type": "text/html; charset=utf-8" } },
  );
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Next may construct request.url from an internal bind address. Compare the
  // browser Origin to the actual incoming Host instead, including the port.
  const host = request.headers.get("host") || new URL(request.url).host;
  if (origin) {
    try {
      if (new URL(origin).host !== host) {
        return reply(request, { ok: false, message: "Please submit this form from the Nine Cypresses website." }, 403);
      }
    } catch {
      return reply(request, { ok: false, message: "Please submit this form from the Nine Cypresses website." }, 403);
    }
  }
  if (Number(request.headers.get("content-length") || "0") > 8192) {
    return reply(request, { ok: false, message: "The submission is too long." }, 413);
  }

  let payload;
  try {
    const raw = await request.text();
    if (raw.length > 8192) {
      return reply(request, { ok: false, message: "The submission is too long." }, 413);
    }
    const type = request.headers.get("content-type") || "";
    if (type.includes("application/json")) payload = JSON.parse(raw);
    else if (type.includes("application/x-www-form-urlencoded")) payload = Object.fromEntries(new URLSearchParams(raw));
    else return reply(request, { ok: false, message: "Unsupported form submission." }, 415);
  } catch {
    return reply(request, { ok: false, message: "The form could not be read. Please try again." }, 400);
  }

  const validation = validateWaitlistPayload(payload);
  if (!validation.valid) {
    return reply(request, { ok: false, message: "Please check the form.", errors: validation.errors }, 400);
  }
  const result = await submitToWaitlist(
    validation.fields,
    process.env.WAITLIST_ENDPOINT || WAITLIST_PLACEHOLDER,
  );
  return reply(request, { ok: result.ok, message: result.message }, result.status);
}
