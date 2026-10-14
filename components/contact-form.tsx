"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
          theme: "light" | "dark";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const services = [
  "Web design & development",
  "AI & automation",
  "Growth & discovery",
  "CRM & integrations",
  "Ongoing support",
];
export default function ContactForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    services[0],
  ]);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [notificationSent, setNotificationSent] = useState(true);
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const [widgetError, setWidgetError] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef("");
  const startedAt = useRef(0);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (!sitekey || !widgetRef.current) return;
    let cancelled = false;
    const render = () => {
      if (
        !cancelled &&
        window.turnstile &&
        widgetRef.current &&
        !widgetIdRef.current
      ) {
        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey,
          theme:
            document.documentElement.dataset.theme === "light"
              ? "light"
              : "dark",
          callback: setTurnstileToken,
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": () => {
            setTurnstileToken("");
            setWidgetError(true);
          },
        });
      }
    };
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"]',
    );
    if (existing) {
      existing.addEventListener("load", render, { once: true });
      render();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = render;
      script.onerror = () => setWidgetError(true);
      document.head.appendChild(script);
    }
    return () => {
      cancelled = true;
      if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
      widgetIdRef.current = "";
    };
  }, [sitekey]);

  function validate(name: keyof typeof values, value: string) {
    const clean = value.trim();
    if ((name === "name" || name === "company") && clean.length < 2)
      return "Please enter at least 2 characters.";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean))
      return "Enter a valid email address.";
    if (name === "website" && clean) {
      try {
        const url = new URL(
          clean.startsWith("http") ? clean : `https://${clean}`,
        );
        if (!url.hostname.includes(".")) throw new Error();
      } catch {
        return "Enter a website such as yourbusiness.com.";
      }
    }
    if (name === "message" && clean.length < 20)
      return "Add a little more detail (at least 20 characters).";
    return "";
  }

  function handleFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.currentTarget;
    if (!(name in values)) return;
    setValues((current) => ({ ...current, [name]: value }));
    if (touched[name]) setTouched((current) => ({ ...current, [name]: true }));
  }

  function fieldProps(name: keyof typeof values) {
    const error = touched[name] ? validate(name, values[name]) : "";
    return {
      value: values[name],
      onChange: handleFieldChange,
      onBlur: () => setTouched((current) => ({ ...current, [name]: true })),
      "aria-invalid": Boolean(error),
      "aria-describedby": error ? `${name}-error` : undefined,
    };
  }

  function validationMessage(name: keyof typeof values) {
    const error = touched[name] ? validate(name, values[name]) : "";
    return error ? (
      <span className="field-error" id={`${name}-error`}>
        {error}
      </span>
    ) : null;
  }

  function toggleService(value: string) {
    setSelectedServices((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextTouched = {
      name: true,
      email: true,
      company: true,
      website: true,
      message: true,
    };
    setTouched(nextTouched);
    if (
      !selectedServices.length ||
      (Object.keys(values) as (keyof typeof values)[]).some((key) =>
        validate(key, values[key]),
      )
    )
      return;
    if (sitekey && !turnstileToken) {
      setWidgetError(true);
      return;
    }
    setStatus("sending");
    const form = event.currentTarget;
    const payload = new FormData(form);
    payload.set("service_selection", selectedServices.join(", "));
    payload.set("cf-turnstile-response", turnstileToken);
    payload.set("form_started_at", String(startedAt.current));
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });
      const result = (await response.json()) as { notificationSent?: boolean };
      if (!response.ok) throw new Error("Submission failed");
      setNotificationSent(Boolean(result.notificationSent));
      setStatus("success");
      form.reset();
      setSelectedServices([services[0]]);
      setValues({ name: "", email: "", company: "", website: "", message: "" });
      setTouched({});
      setTurnstileToken("");
      setWidgetError(false);
      startedAt.current = Date.now();
      if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
    } catch {
      setStatus("error");
      if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
      setTurnstileToken("");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-heading">
        <span className="eyebrow">PROJECT ENQUIRY · INDIA</span>
        <h2>Tell us what you’re imagining.</h2>
        <p>A few details help us make our first conversation useful.</p>
      </div>
      <div className="form-grid">
        <label>
          <span className="field-label">
            Your name <span className="required-mark">*</span>
          </span>
          <input
            {...fieldProps("name")}
            autoComplete="name"
            name="name"
            placeholder="Aditi Sharma"
            required
          />
          {validationMessage("name")}
        </label>
        <label>
          <span className="field-label">
            Work email <span className="required-mark">*</span>
          </span>
          <input
            {...fieldProps("email")}
            autoComplete="email"
            name="email"
            placeholder="aditi@company.in"
            required
            type="email"
          />
          {validationMessage("email")}
        </label>
        <label>
          <span className="field-label">
            Company or organisation <span className="required-mark">*</span>
          </span>
          <input
            {...fieldProps("company")}
            autoComplete="organization"
            name="company"
            placeholder="Your company name"
            required
          />
          {validationMessage("company")}
        </label>
        <label>
          <span className="field-label">
            Website <small>OPTIONAL</small>
          </span>
          <input
            {...fieldProps("website")}
            name="website"
            placeholder="https://company.in"
            type="text"
          />
          {validationMessage("website")}
        </label>
      </div>
      <fieldset className="choice-field">
        <legend>
          What would you like help with? <span className="required-mark">*</span>
        </legend>
        <div className="choice-row">
          {services.map((service) => (
            <button
              type="button"
              key={service}
              aria-pressed={selectedServices.includes(service)}
              className={
                selectedServices.includes(service)
                  ? "choice-chip selected"
                  : "choice-chip"
              }
              onClick={() => toggleService(service)}
            >
              {service}
            </button>
          ))}
        </div>
        {!selectedServices.length && (
          <span className="field-error">Choose at least one area.</span>
        )}
      </fieldset>
      <label className="message-field">
        <span className="field-label">
          A little about the project <span className="required-mark">*</span>
        </span>
        <textarea
          {...fieldProps("message")}
          name="message"
          placeholder="What are you working on, and what would a good outcome look like?"
          required
          rows={5}
        />
        {validationMessage("message")}
      </label>
      <label className="honeypot" aria-hidden="true" tabIndex={-1}>
        Leave this field empty
        <input name="fax_only" autoComplete="off" tabIndex={-1} />
      </label>
      {sitekey && (
        <div className="turnstile-wrap">
          <div ref={widgetRef} />
          {widgetError && !turnstileToken && (
            <span className="field-hint" role="status">
              Complete the security check to continue.
            </span>
          )}
        </div>
      )}
      <div className="submit-row">
        <button
          className="button button-primary submit-button"
          type="submit"
          disabled={
            status === "sending" ||
            !selectedServices.length ||
            Boolean(sitekey && !turnstileToken)
          }
        >
          {status === "sending"
            ? "Sending your note…"
            : status === "success"
              ? "Message sent ✓"
              : status === "error"
                ? "Try sending again"
                : "Send your enquiry"}
          <span aria-hidden="true">{status === "sending" ? "···" : "↗"}</span>
        </button>
        <span>We’ll reply by email, usually within one working day.</span>
      </div>
      {status === "success" && (
        <p className="form-status success" role="status">
          Thanks for getting in touch. Your enquiry is saved, and our team will
          be in touch.
          {!notificationSent &&
            " Email notification is delayed, but your enquiry is safely recorded."}
        </p>
      )}
      {status === "error" && (
        <p className="form-status error" role="alert">
          We couldn’t send that just now. Please try again or email{" "}
          <a href="mailto:contact@ethixweb.com">contact@ethixweb.com</a>.
        </p>
      )}
    </form>
  );
}
