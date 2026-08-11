import type { Metadata } from "next";
import Link from "next/link";
import styles from "../contact.module.css";
import iconStyles from "./contact-icon.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact OSANO to discuss a solution for your context.",
  alternates: { canonical: "/contact" },
};

const enquiries = [
  ["General Enquiry", "Questions about OSANO, our technologies, products, or general information.", "Send an Enquiry"],
  ["Solution Consultation", "Guidance to identify the right technologies and solutions for your specific needs and environment.", "Start a Consultation"],
  ["Business & Dealer Enquiry", "For businesses, dealers, and organizations interested in working with OSANO.", "Explore Business Opportunities"],
  ["Customer Support", "Support for product use, installation, technical assistance, and after-sales service.", "Get Support"],
];

const steps = [
  ["01", "Tell us what you need", "Share a few details about your enquiry, needs, or current situation."],
  ["02", "We review your enquiry", "Our team reviews your request and connects it with the right person."],
  ["03", "Receive the next step", "We’ll get back to you with the appropriate guidance, support, or next action."],
];

function ContactIcon({ type }: { type: string }) {
  return <span className={styles.contactIcon} data-final-asset={`CONTACT ${type.toUpperCase()} ICON`} data-asset-kind="icon" aria-hidden="true" />;
}

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>GET IN TOUCH</p>
          <h1 id="contact-title">Let’s start a<br />conversation.</h1>
          <p>Whether you have a question, need guidance, or want to explore opportunities with OSANO, our team is here to help.</p>
          <Link href="#contact-form">Start an Enquiry</Link>
        </div>
        <div className={styles.heroMedia} data-final-asset="CONSULTATION STUDIO IMAGE" data-asset-kind="image">
          <span className={styles.imageIcon} aria-hidden="true" />
          <strong>Consultation Image Placeholder</strong>
          <small>Minimalist studio setting displaying integrated wellness control screens</small>
        </div>
      </section>

      <section className={styles.enquirySection} aria-labelledby="help-title">
        <h2 id="help-title">How can we help?</h2>
        <div className={styles.enquiryGrid}>
          {enquiries.map(([title, copy, action], index) => (
            <article className={index === 1 ? styles.activeEnquiry : undefined} key={title}>
              <svg className={`${styles.chatIcon} ${iconStyles.chatIcon}`} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.25 10.5c0 4.14-3.96 7.5-8.85 7.5-1.06 0-2.08-.16-3.02-.46L4.5 19.5l1.2-3.34c-1.94-1.37-3.15-3.39-3.15-5.66C2.55 6.36 6.51 3 11.4 3s8.85 3.36 8.85 7.5Z" />
              </svg>
              {index === 1 && <small>ACTIVE CHOICE</small>}
              <h3>{title}</h3><p>{copy}</p><Link href="#contact-form">{action}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.processSection}>
        <header><p className={styles.eyebrow}>THE PROCESS</p><h2>What happens next.</h2></header>
        <div className={styles.steps}>
          {steps.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        </div>
      </section>

      <section className={styles.formSection} id="contact-form">
        <div className={styles.formIntro}>
          <h2>We’re here to help.</h2>
          <p>Complete the form and our team will review your enquiry and connect you with the right person to assist.</p>
          <strong>ALL FIELDS MARKED WITH * ARE REQUIRED.</strong>
        </div>
        <form className={styles.form} action="mailto:hello@osanoliving.com" method="post" encType="text/plain">
          <div className={styles.twoColumns}>
            <label>Full Name *<input name="name" type="text" placeholder="Enter your name" autoComplete="name" required /></label>
            <label>Email *<input name="email" type="email" placeholder="jane@example.com" autoComplete="email" required /></label>
            <label>Phone *<input name="phone" type="tel" placeholder="+66 XX XXX XXXX" autoComplete="tel" required /></label>
            <fieldset><legend>Preferred Contact Method *</legend><div className={styles.radios}><label><input type="radio" name="contact-method" value="email" defaultChecked /> Email</label><label><input type="radio" name="contact-method" value="phone" /> Phone</label><label><input type="radio" name="contact-method" value="line" /> LINE</label><label><input type="radio" name="contact-method" value="other" /> Other</label></div></fieldset>
          </div>
          <label>Topic *<select name="topic" defaultValue="" required><option value="" disabled>Please select a topic</option><option>General Enquiry</option><option>Solution Consultation</option><option>Business &amp; Dealer Enquiry</option><option>Customer Support</option></select></label>
          <label>Business / Environment Type<input name="environment" type="text" placeholder="e.g., Home, Office, Wellness Space" /></label>
          <label>Message *<textarea name="message" rows={5} placeholder="Tell us more about your enquiry..." required /></label>
          <label className={styles.consent}><input type="checkbox" name="privacy-consent" required /> <span>I agree to Osano’s Privacy Policy and consent to being contacted regarding my enquiry.</span></label>
          <button type="submit">Submit enquiry</button>
        </form>
      </section>

      <section className={styles.reachSection}>
        <h2>Other ways to reach us</h2>
        <div className={styles.reachGrid}>
          <a href="mailto:hello@osanoliving.com"><ContactIcon type="email" /><span><small>EMAIL</small><strong>hello@osanoliving.com</strong></span></a>
          <a href="tel:+66"><ContactIcon type="phone" /><span><small>PHONE</small><strong>+66 XX XXX XXXX</strong></span></a>
          <a href="https://line.me/R/ti/p/@rs672j" target="_blank" rel="noreferrer"><ContactIcon type="line" /><span><small>LINE OFFICIAL ACCOUNT</small><strong>https://lin.ee/Prs672J</strong></span></a>
          <a href="#contact-form"><ContactIcon type="social" /><span><small>SOCIAL</small><strong>@osanoliving</strong></span></a>
        </div>
      </section>
    </div>
  );
}
