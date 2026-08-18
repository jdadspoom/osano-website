"use client";

import { FormEvent, useRef, useState } from "react";
import styles from "@/app/contact.module.css";

type FieldName = "name" | "email" | "phone" | "topic" | "message" | "consent";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{type:"success"|"error";message:string}|null>(null);

  const clearError = (name: FieldName) => setErrors(current => {
    if (!current[name]) return current;
    const next = { ...current };
    delete next[name];
    return next;
  });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Partial<Record<FieldName, string>> = {};
    const email = String(data.get("email") ?? "").trim();
    if (!String(data.get("name") ?? "").trim()) nextErrors.name = "Please enter your full name.";
    if (!email) nextErrors.email = "Please enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (!String(data.get("phone") ?? "").trim()) nextErrors.phone = "Please enter your phone number.";
    if (!String(data.get("topic") ?? "")) nextErrors.topic = "Please select an enquiry topic.";
    if (!String(data.get("message") ?? "").trim()) nextErrors.message = "Please tell us how we can help.";
    if (!data.get("consent")) nextErrors.consent = "Please accept the privacy consent before continuing.";
    setErrors(nextErrors);
    setStatus(null);

    const firstError = Object.keys(nextErrors)[0] as FieldName | undefined;
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), email, phone: data.get("phone"),
          contactMethod: data.get("contact-method"), topic: data.get("topic"),
          environment: data.get("environment"), message: data.get("message"),
          consent: data.get("consent") === "accepted", website: data.get("website"),
        }),
      });
      const result = await response.json() as {ok?:boolean;message?:string};
      if (!response.ok) throw new Error(result.message || "We could not send your enquiry.");
      form.reset();
      setStatus({ type: "success", message: "Thank you. Your enquiry has been sent to the OSANO team." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "We could not send your enquiry. Please try again." });
    } finally { setSubmitting(false); }
  };

  const error = (name: FieldName) => errors[name] ? <span className={styles.fieldError} id={`${name}-error`}>{errors[name]}</span> : null;

  return <form ref={formRef} className={styles.form} onSubmit={submit} noValidate>
    <label className={styles.honeypot} aria-hidden="true">Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
    <div className={styles.twoColumns}>
      <label data-invalid={Boolean(errors.name)}>Full Name *<input name="name" type="text" placeholder="Enter your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} onChange={() => clearError("name")} />{error("name")}</label>
      <label data-invalid={Boolean(errors.email)}>Email *<input name="email" type="email" placeholder="jane@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} onChange={() => clearError("email")} />{error("email")}</label>
      <label data-invalid={Boolean(errors.phone)}>Phone *<input name="phone" type="tel" placeholder="+66 XX XXX XXXX" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} onChange={() => clearError("phone")} />{error("phone")}</label>
      <fieldset><legend>Preferred Contact Method *</legend><div className={styles.radios}><label><input type="radio" name="contact-method" value="email" defaultChecked /> Email</label><label><input type="radio" name="contact-method" value="phone" /> Phone</label><label><input type="radio" name="contact-method" value="line" /> LINE</label><label><input type="radio" name="contact-method" value="other" /> Other</label></div></fieldset>
    </div>
    <label data-invalid={Boolean(errors.topic)}>Topic *<select name="topic" defaultValue="" aria-invalid={Boolean(errors.topic)} aria-describedby={errors.topic ? "topic-error" : undefined} onChange={() => clearError("topic")}><option value="" disabled>Please select a topic</option><option>General enquiry</option><option>Solution consultation</option><option>Business and dealer enquiry</option><option>Customer support</option></select>{error("topic")}</label>
    <label>Business / Environment Type<input name="environment" type="text" placeholder="e.g., Home, Office, Wellness Space" /></label>
    <label data-invalid={Boolean(errors.message)}>Message *<textarea name="message" rows={5} placeholder="Tell us more about your enquiry..." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} onChange={() => clearError("message")} />{error("message")}</label>
    <label className={styles.consent} data-invalid={Boolean(errors.consent)}><input type="checkbox" name="consent" value="accepted" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} onChange={() => clearError("consent")} /><span>I agree to OSANO’s Privacy Policy and consent to being contacted regarding my enquiry.{error("consent")}</span></label>
    <button type="submit" disabled={submitting}>{submitting ? <><i className={styles.submitSpinner} aria-hidden="true" /> Sending enquiry…</> : "Submit enquiry"}</button>
    {status && <p className={styles.formStatus} data-status={status.type} role={status.type === "error" ? "alert" : "status"}><b>{status.type === "success" ? "Enquiry sent." : "Unable to send."}</b>{status.message}</p>}
  </form>;
}
