"use client";

import { useEffect, useRef, useState } from "react";
import { OxygenProcessAnimation } from "@/components/oxygen-process-animation";

const storySteps = [
  { number: "01", eyebrow: "INPUT", title: "Ambient air enters.", copy: "Air from the surrounding environment is drawn into the system continuously and quietly." },
  { number: "02", eyebrow: "SEPARATE", title: "Nitrogen is captured.", copy: "Pressure Swing Adsorption uses a molecular sieve to selectively hold nitrogen while oxygen continues forward." },
  { number: "03", eyebrow: "REGENERATE", title: "The sieve resets.", copy: "Captured nitrogen is released safely, allowing the chamber to regenerate for the next cycle." },
  { number: "04", eyebrow: "DELIVER", title: "Oxygen-rich air emerges.", copy: "The refined output carries a higher oxygen concentration, ready for its intended everyday application." },
] as const;

export function OxygenScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const nextProgress = Math.min(1, Math.max(0, -rect.top / distance));
      setProgress(nextProgress);
      setActiveStep(Math.min(4, Math.floor(nextProgress * 4) + 1));
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const goToStep = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const distance = Math.max(1, section.offsetHeight - window.innerHeight);
    window.scrollTo({ top: sectionTop + (index / 3) * distance, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="oxygen-scroll-story" aria-labelledby="oxygen-story-title">
      <div className="oxygen-story-sticky">
        <header className="oxygen-story-heading">
          <p className="oxygen-kicker">THE TECHNOLOGY</p>
          <h2 id="oxygen-story-title">From air<br />to oxygen</h2>
          <p>Powered by Pressure Swing Adsorption.</p>
          <div className="oxygen-story-progress" aria-hidden="true"><i style={{ transform: `scaleX(${progress})` }} /></div>
        </header>

        <div className="oxygen-story-copy" aria-live="polite">
          {storySteps.map((step, index) => (
            <article className={activeStep === index + 1 ? "is-active" : ""} key={step.number}>
              <span>{step.number}</span>
              <small>{step.eyebrow}</small>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>

        <div className="oxygen-story-diagram">
          <OxygenProcessAnimation storyStep={activeStep} />
        </div>

        <nav className="oxygen-story-dots" aria-label="Oxygen process progress">
          {storySteps.map((step, index) => <button type="button" className={activeStep === index + 1 ? "is-active" : ""} onClick={() => goToStep(index)} aria-label={`Step ${step.number}: ${step.title}`} key={step.number}>{step.number}</button>)}
        </nav>
      </div>
    </section>
  );
}
