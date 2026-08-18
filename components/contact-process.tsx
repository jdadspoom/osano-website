"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/contact.module.css";

const processSteps = [
  { number: "01", title: "Tell us what you need", copy: "Share a few details about your enquiry, needs or current situation." },
  { number: "02", title: "We review your enquiry", copy: "Our team reviews your request and connects it with the right person." },
  { number: "03", title: "Receive the next step", copy: "We’ll get back to you with the appropriate guidance, support or next action." },
];

export function ContactProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.24, rootMargin: "0px 0px -8%" });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} className={styles.processSection} aria-labelledby="contact-process-title" data-visible={visible}>
    <header><p className={styles.eyebrow}>THE PROCESS</p><h2 id="contact-process-title">What happens next</h2></header>
    <div className={styles.steps}>
      {processSteps.map((step, index) => <article key={step.number} style={{ "--step-index": index } as React.CSSProperties}>
        <span>{step.number}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div>
      </article>)}
    </div>
  </section>;
}
