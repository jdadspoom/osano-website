import type { Metadata } from "next";
import Image from "next/image";
import { ContactEnquiryCards } from "@/components/contact-enquiry-cards";
import { ContactProcess } from "@/components/contact-process";
import { ContactForm } from "@/components/contact-form";
import styles from "../contact.module.css";
import { createPageMetadata } from "@/lib/seo";
export const metadata:Metadata=createPageMetadata("Contact", "Contact OSANO to discuss a solution for your context.", "/contact");
export default function ContactPage(){return <div className={styles.page}>
  <section className={styles.hero}><div className={styles.heroMedia}><Image src="/images/contact/contact-hero.webp" alt="OSANO consultation in a calm living environment" fill loading="eager" sizes="100vw"/></div><div className={styles.heroCopy}><p className={styles.eyebrow}>ABOUT OSANO</p><h1>Contact and<br/>Consultation</h1><p>Speak with OSANO about a living environment that supports everyday well-being.</p><a href="#contact-form">Start your enquiry&nbsp;</a></div></section>
  <section className={styles.enquirySection}><h2>How can we help?</h2><ContactEnquiryCards/></section>
  <ContactProcess />
  <section className={styles.formSection} id="contact-form"><Image src="/images/contact/contact-office.png" alt="OSANO office building" fill sizes="100vw" className={styles.formSectionImage}/><span className={styles.formSectionShade}/><div className={styles.formIntro}><div className={styles.formIntroContent}><h2>We’re<br/>here to<br/>help.</h2><p>Complete the form and our team will review your enquiry and connect you with the right person to assist.</p><strong>ALL FIELDS MARKED WITH * ARE REQUIRED.</strong></div></div><ContactForm /></section>
  <section className={styles.reachSection}><h2>Other ways to reach us</h2><div className={styles.simpleReach}><a href="mailto:jdproduct2020@gmail.com"><small>EMAIL</small><b>jdproduct2020@gmail.com</b></a><div><small>PHONE</small><b>02-952-5414</b><b>066-125-6694 (Sales)</b><b>089-458-5177 (Customer Service)</b></div><a href="https://line.me/R/ti/p/@osano" target="_blank" rel="noreferrer"><small>LINE OFFICIAL ACCOUNT</small><b>@osano</b></a><div><small>SOCIAL MEDIA</small><b><a href="https://www.facebook.com/share/1ETv9gkpym/?mibextid=wwXIfr">Facebook</a></b><b><a href="https://www.instagram.com/osano_official">Instagram</a></b><b><a href="https://www.tiktok.com/@osanofficial">TikTok</a></b></div></div></section>
  <section className={styles.mapSection}><div className={styles.mapCopy}><p>VISIT US BY APPOINTMENT</p><h2>Visit the<br/>Consultation Studio</h2><span>We welcome visits by appointment to experience our solutions and speak with our consultants.</span><a href="#contact-form">Request appointment&nbsp;</a><small>Visits by appointment only. Location details will be provided upon confirmation.</small></div><iframe title="OSANO location on Google Maps" src="https://www.google.com/maps?q=OSANO%20Bangkok%20Thailand&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></section>
</div>}
