import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact OSANO to discuss a solution for your context.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact OSANO"
        title="Tell us about your context."
        summary="A useful solution begins with understanding the space, the people or pets within it, and what better everyday living means to you."
        media={{ kind: "image", label: "Consultation Conversation Image" }}
        tone="health"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <section className="contact-section section-pad">
        <div className="shell contact-grid">
          <div>
            <SectionHeading eyebrow="Request a consultation" title="Begin with a conversation." intro="Share a little about the world you are exploring. Our temporary contact details can be updated from one central file." />
            <div className="contact-details">
              <div><span>Email</span><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></div>
              <div><span>Phone</span><a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>{siteConfig.contact.phone}</a></div>
              <div><span>Location</span><p>{siteConfig.contact.address}</p></div>
            </div>
          </div>
          <form className="contact-form" action={`mailto:${siteConfig.contact.email}`} method="post" encType="text/plain">
            <label>Full name<input name="name" type="text" autoComplete="name" required /></label>
            <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
            <label>Area of interest<select name="interest" defaultValue=""><option value="" disabled>Select a world</option><option>OSANO Health</option><option>OSANO Hygiene</option><option>OSANO Pets</option><option>Technology</option></select></label>
            <label>Tell us about your context<textarea name="message" rows={6} required /></label>
            <button className="button button-primary" type="submit">Request a Consultation</button>
            <p className="form-note">Submitting opens your email application. No information is stored by this website.</p>
          </form>
        </div>
      </section>
    </>
  );
}
