"use client";

import { FormEvent, useState } from "react";

const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!endpoint) {
      setStatus("error");
      setErrorMessage("The contact form is not configured yet. Please use the email link instead.");
      return;
    }

    setStatus("submitting");

    try {
      const form = event.currentTarget;
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed.");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong while sending your message. Please use the email link instead.");
    }
  }

  const busy = status === "submitting";

  return (
    <form className="contact-form" action={endpoint || undefined} method="POST" onSubmit={handleSubmit}>
      <div className="contact-form__fields">
        <div className="form-field">
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required />
        </div>

        <div className="form-field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required />
        </div>

        <div className="form-field form-field--message">
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows={6} required />
        </div>
      </div>

      <div className="contact-form__actions">
        <button className="button-primary" type="submit" disabled={busy}>
          {busy ? "Sending…" : "Send message"}
        </button>
        <a className="contact-form__email link-accent" href="mailto:hello@renatuscartesius.com">
          hello@renatuscartesius.com
        </a>
      </div>

      <div className="contact-form__status" aria-live="polite">
        {status === "success" && (
          <p className="form-message form-message--success" role="status">
            Thanks — your message has been sent.
          </p>
        )}
        {status === "error" && (
          <p className="form-message form-message--error" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
