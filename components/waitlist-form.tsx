"use client";

import { useRef, useState, type FormEvent } from "react";

type Errors = { name?: string; email?: string };

export function WaitlistForm({ configured }: { configured: boolean }) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const emailInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setResult(null);
    setErrors({});
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: data.get("email"), name: data.get("name") }),
        signal: AbortSignal.timeout(12000),
      });
      const body = await response.json();
      if (!response.ok) {
        const nextErrors = body.errors || {};
        setErrors(nextErrors);
        setResult({ ok: false, message: body.message || "Your submission could not be confirmed. Please try again." });
        if (nextErrors.email) emailInput.current?.focus();
        else if (nextErrors.name) nameInput.current?.focus();
      } else {
        setResult({ ok: true, message: body.message });
        form.reset();
      }
    } catch {
      setResult({ ok: false, message: "Your submission could not be confirmed. Check your connection and try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      className="waitlist-form"
      action="/api/waitlist"
      method="post"
      onSubmit={submit}
      aria-label="Join the waitlist"
      aria-busy={pending}
    >
      <div className="field">
        <label htmlFor="waitlist-name">Name <span>(optional)</span></label>
        <input
          ref={nameInput}
          id="waitlist-name"
          name="name"
          autoComplete="given-name"
          maxLength={120}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor="waitlist-email">Email</label>
        <input
          ref={emailInput}
          id="waitlist-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={254}
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : "waitlist-feedback"}
        />
        {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
      </div>
      <button className="button button-light" type="submit" disabled={pending}>
        <span>{pending ? "Sending…" : "Keep me posted"}</span>
        <span className="arrow" aria-hidden="true">↗</span>
      </button>
      <div className="form-feedback" id="waitlist-feedback" role="status" aria-live="polite" aria-atomic="true">
        {result ? (
          <p className={result.ok ? "form-success" : "form-error"}>{result.message}</p>
        ) : !configured ? (
          <p>Waitlist setup is pending. Submissions are not saved yet.</p>
        ) : null}
      </div>
    </form>
  );
}
