import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("Privacy Policy", "How OSANO handles enquiries, website data and privacy choices.", "/privacy");

export default function PrivacyPage() {
  return (
    <article className="legal-page shell">
      <header><p className="eyebrow">PRIVACY AT OSANO</p><h1>Privacy, handled with care.</h1><p>Last updated: 18 August 2026</p></header>
      <section><h2>Information we collect</h2><p>When you submit an enquiry, we collect the details you provide, such as your name, contact information, enquiry topic and message. The website also stores your privacy preference locally in your browser.</p></section>
      <section><h2>How we use information</h2><p>We use enquiry details to respond, route your request to the appropriate person and provide requested support. We do not sell personal information.</p></section>
      <section><h2>Cookies and local storage</h2><p>Essential browser storage remembers your consent choice. Optional measurement or experience tools will only be enabled after consent and will be documented here before deployment.</p></section>
      <section><h2>Retention and security</h2><p>Enquiry information is retained only as long as reasonably necessary for communication, service and legal obligations. Reasonable safeguards are used to protect it.</p></section>
      <section><h2>Your choices</h2><p>You can reopen Cookie settings from the footer. You may also request access, correction or deletion of enquiry information by contacting us.</p></section>
      <section><h2>Contact</h2><p>Privacy questions can be sent to <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.</p></section>
      <Link href="/contact" className="button button-primary">Contact OSANO</Link>
    </article>
  );
}
