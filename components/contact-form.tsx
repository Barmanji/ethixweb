"use client";

import { ChangeEvent, FormEvent, useState } from "react";

const services = ["Web design & development", "AI & automation", "Growth & discovery", "CRM & integrations", "Ongoing support"];
const budgets = ["Under ₹1 lakh", "₹1–3 lakh", "₹3–8 lakh", "₹8 lakh+"];

export default function ContactForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([services[0]]);
  const [budget, setBudget] = useState(budgets[1]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [values, setValues] = useState({ name: "", email: "", company: "", website: "", message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function validate(name: keyof typeof values, value: string) {
    const clean = value.trim();
    if ((name === "name" || name === "company") && clean.length < 2) return "Please enter at least 2 characters.";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return "Enter a valid email address.";
    if (name === "website" && clean) {
      try { const url = new URL(clean.startsWith("http") ? clean : `https://${clean}`); if (!url.hostname.includes(".")) throw new Error(); }
      catch { return "Enter a website such as yourbusiness.com."; }
    }
    if (name === "message" && clean.length < 20) return "Add a little more detail (at least 20 characters).";
    return "";
  }

  function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.currentTarget;
    if (!(name in values)) return;
    setValues((current) => ({ ...current, [name]: value }));
    if (touched[name]) setTouched((current) => ({ ...current, [name]: true }));
  }

  function fieldProps(name: keyof typeof values) {
    const error = touched[name] ? validate(name, values[name]) : "";
    return { value: values[name], onChange: handleFieldChange, onBlur: () => setTouched((current) => ({ ...current, [name]: true })), "aria-invalid": Boolean(error), "aria-describedby": error ? `${name}-error` : undefined };
  }

  function validationMessage(name: keyof typeof values) {
    const error = touched[name] ? validate(name, values[name]) : "";
    return error ? <span className="field-error" id={`${name}-error`}>{error}</span> : null;
  }

  function toggleService(value: string) {
    setSelectedServices((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextTouched = { name: true, email: true, company: true, website: true, message: true };
    setTouched(nextTouched);
    if (!selectedServices.length || (Object.keys(values) as (keyof typeof values)[]).some((key) => validate(key, values[key]))) return;
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("service_selection", selectedServices.join(", "));
    data.set("allocated_budget", budget);
    try {
      const response = await fetch("https://formspree.io/f/xnpjgbpq", { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
      setSelectedServices([services[0]]);
      setValues({ name: "", email: "", company: "", website: "", message: "" });
      setTouched({});
    } catch {
      setStatus("error");
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="form-heading"><span className="eyebrow">PROJECT ENQUIRY · INDIA</span><h2>Tell us what you’re imagining.</h2><p>A few details help us make our first conversation useful.</p></div>
    <div className="form-grid"><label>Your name <span>*</span><input {...fieldProps("name")} autoComplete="name" name="name" placeholder="Aditi Sharma" required />{validationMessage("name")}</label><label>Work email <span>*</span><input {...fieldProps("email")} autoComplete="email" name="email" placeholder="aditi@company.in" required type="email" />{validationMessage("email")}</label><label>Company or organisation <span>*</span><input {...fieldProps("company")} autoComplete="organization" name="company" placeholder="Your company name" required />{validationMessage("company")}</label><label>Website <small>OPTIONAL</small><input {...fieldProps("website")} name="website" placeholder="https://company.in" type="text" />{validationMessage("website")}</label></div>
    <fieldset className="choice-field"><legend>What would you like help with? <span>*</span></legend><div className="choice-row">{services.map((service) => <button type="button" key={service} aria-pressed={selectedServices.includes(service)} className={selectedServices.includes(service) ? "choice-chip selected" : "choice-chip"} onClick={() => toggleService(service)}>{service}</button>)}</div>{!selectedServices.length && <span className="field-error">Choose at least one area.</span>}</fieldset>
    <fieldset className="choice-field"><legend>Approximate project budget <span>*</span></legend><div className="choice-row">{budgets.map((value) => <button type="button" key={value} aria-pressed={budget === value} className={budget === value ? "choice-chip selected" : "choice-chip"} onClick={() => setBudget(value)}>{value}</button>)}</div><p className="field-hint">A starting point for our conversation, not a quote.</p></fieldset>
    <label className="message-field">A little about the project <span>*</span><textarea {...fieldProps("message")} name="message" placeholder="What are you working on, and what would a good outcome look like?" required rows={5} />{validationMessage("message")}</label>
    <div className="submit-row"><button className="button button-primary submit-button" type="submit" disabled={status === "sending" || !selectedServices.length}>{status === "sending" ? "Sending your note…" : status === "success" ? "Message sent ✓" : status === "error" ? "Try sending again" : "Send your enquiry"}<span aria-hidden="true">{status === "sending" ? "···" : "↗"}</span></button><span>We’ll reply by email, usually within one working day.</span></div>
    {status === "success" && <p className="form-status success" role="status">Thanks for getting in touch. Your enquiry is on its way to our team.</p>}{status === "error" && <p className="form-status error" role="alert">We couldn’t send that just now. Please try again or email <a href="mailto:contact@ethixweb.com">contact@ethixweb.com</a>.</p>}
  </form>;
}
