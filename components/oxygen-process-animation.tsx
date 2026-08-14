"use client";

import { useState } from "react";
import type { CSSProperties, FocusEvent, KeyboardEvent, PointerEvent } from "react";

const stepDetails = {
  1: { number: "01", eyebrow: "INPUT", title: "Ambient Air", summary: "Air from the surrounding environment enters the system.", details: ["Contains oxygen and nitrogen", "Drawn in continuously and quietly"] },
  2: { number: "02", eyebrow: "SEPARATION", title: "PSA Chamber", summary: "Pressure Swing Adsorption selectively captures nitrogen molecules.", details: ["Molecular sieve holds nitrogen", "Oxygen continues through the chamber"] },
  3: { number: "03", eyebrow: "RELEASE", title: "Nitrogen Removed", summary: "Captured nitrogen is released safely back into the surrounding air.", details: ["No chemical by-products", "The molecular sieve regenerates"] },
  4: { number: "04", eyebrow: "OUTPUT", title: "O₂-rich Air", summary: "The refined output contains a higher concentration of oxygen.", details: ["Clean oxygen-rich delivery", "Ready for its intended application"] },
} as const;

type StepNumber = keyof typeof stepDetails;

const airParticles = [
  [180, 390, "n"], [225, 335, "o"], [270, 415, "n"], [310, 350, "o"],
  [350, 445, "n"], [395, 375, "o"], [205, 465, "o"], [285, 500, "n"],
  [370, 520, "o"], [430, 465, "n"], [150, 505, "n"], [455, 325, "o"],
];

const sieveParticles = Array.from({ length: 42 }, (_, index) => ({
  x: 665 + (index % 7) * 42,
  y: 300 + Math.floor(index / 7) * 48,
  tone: index % 4 === 0 ? "light" : "green",
}));

const outputParticles = [[1010, 380], [1060, 420], [1110, 365], [1160, 445], [1205, 390]];

export function OxygenProcessAnimation({ storyStep = 0 }: { storyStep?: number }) {
  const [activeStep, setActiveStep] = useState<StepNumber | null>(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

  const positionFromPointer = (event: PointerEvent<SVGGElement>) => {
    setCardPosition({
      x: Math.max(12, Math.min(event.clientX + 18, window.innerWidth - 352)),
      y: Math.max(12, Math.min(event.clientY + 18, window.innerHeight - 260)),
    });
  };

  const showFromFocus = (step: StepNumber, event: FocusEvent<SVGGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setActiveStep(step);
    setCardPosition({
      x: Math.max(12, Math.min(bounds.right + 14, window.innerWidth - 352)),
      y: Math.max(12, Math.min(bounds.top, window.innerHeight - 260)),
    });
  };

  const keyboardToggle = (step: StepNumber, event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveStep((current) => current === step ? null : step);
    }
  };

  const interactionProps = (step: StepNumber) => ({
    tabIndex: 0,
    role: "button" as const,
    "aria-label": `Learn more about step ${step}: ${stepDetails[step].title}`,
    onPointerEnter: (event: PointerEvent<SVGGElement>) => { setActiveStep(step); positionFromPointer(event); },
    onPointerMove: positionFromPointer,
    onPointerLeave: () => setActiveStep(null),
    onFocus: (event: FocusEvent<SVGGElement>) => showFromFocus(step, event),
    onBlur: () => setActiveStep(null),
    onClick: () => setActiveStep((current) => current === step ? null : step),
    onKeyDown: (event: KeyboardEvent<SVGGElement>) => keyboardToggle(step, event),
  });

  return (
    <div className="psa-interactive-diagram" data-story-step={storyStep || undefined}>
    <svg className="psa-svg" viewBox="0 0 1600 1020" role="img" aria-labelledby="psa-title psa-desc">
      <title id="psa-title">Animated Pressure Swing Adsorption process</title>
      <desc id="psa-desc">Ambient air enters a PSA chamber, nitrogen is removed downward, and concentrated oxygen exits to the right.</desc>
      <defs>
        <linearGradient id="airStream" x1="0" x2="1">
          <stop offset="0" stopColor="#dff7f4" stopOpacity="0" />
          <stop offset="0.5" stopColor="#a8e8df" stopOpacity="0.62" />
          <stop offset="1" stopColor="#7bd8c9" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="chamber" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.96" />
          <stop offset="0.55" stopColor="#e8f2ed" stopOpacity="0.84" />
          <stop offset="1" stopColor="#cbded5" stopOpacity="0.72" />
        </linearGradient>
        <radialGradient id="oxygenOrb">
          <stop offset="0" stopColor="#fff" stopOpacity="0.98" />
          <stop offset="0.65" stopColor="#dcfff1" stopOpacity="0.72" />
          <stop offset="1" stopColor="#70d9ae" stopOpacity="0.08" />
        </radialGradient>
        <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#174d3f" floodOpacity="0.13" />
        </filter>
        <path id="intakePath" d="M120 430 C310 430 430 430 610 430" />
        <path id="outputPath" d="M965 430 C1070 430 1160 430 1260 430" />
        <path id="nitrogenPath" d="M790 585 C790 655 790 680 790 745" />
      </defs>

      <g className="psa-step-label psa-step-1 psa-step-interactive" {...interactionProps(1)}>
        <circle cx="280" cy="190" r="27" /><text x="280" y="198" textAnchor="middle">01</text>
        <rect x="140" y="220" width="280" height="82" rx="41" />
        <text className="psa-label-title" x="280" y="252" textAnchor="middle">AMBIENT AIR</text>
        <text className="psa-label-copy" x="280" y="278" textAnchor="middle">Air enters the system</text>
      </g>

      <g className="psa-step-label psa-step-2 psa-step-interactive" {...interactionProps(2)}>
        <circle cx="790" cy="80" r="27" /><text x="790" y="88" textAnchor="middle">02</text>
        <rect x="625" y="110" width="330" height="82" rx="41" />
        <text className="psa-label-title" x="790" y="142" textAnchor="middle">PSA SEPARATION</text>
        <text className="psa-label-copy" x="790" y="168" textAnchor="middle">Pressure Swing Adsorption</text>
      </g>

      <g className="psa-step-label psa-step-4 psa-step-interactive" {...interactionProps(4)}>
        <circle cx="1330" cy="190" r="27" /><text x="1330" y="198" textAnchor="middle">04</text>
        <rect x="1180" y="220" width="300" height="82" rx="41" />
        <text className="psa-label-title" x="1330" y="252" textAnchor="middle">O₂-RICH AIR</text>
        <text className="psa-label-copy" x="1330" y="278" textAnchor="middle">Concentrated oxygen output</text>
      </g>

      <path className="psa-air-ribbon ribbon-one" d="M90 415 C315 290 455 340 645 405 L645 455 C455 520 315 570 90 445 Z" fill="url(#airStream)" />
      <path className="psa-air-ribbon ribbon-two" d="M90 435 C310 380 440 390 645 420 L645 445 C440 475 310 490 90 455 Z" fill="url(#airStream)" />
      <path className="psa-air-ribbon ribbon-three" d="M945 408 C1065 345 1160 375 1285 418 L1285 452 C1160 490 1065 515 945 452 Z" fill="url(#airStream)" />

      <g className="psa-source-particles">
        {airParticles.map(([x, y, tone], index) => <circle key={index} cx={x} cy={y} r={tone === "o" ? 11 : 9} className={tone === "o" ? "oxygen-tone" : "nitrogen-tone"} style={{ "--i": index } as CSSProperties} />)}
      </g>

      <g className="psa-moving-intake">
        {Array.from({ length: 8 }, (_, index) => <circle key={index} r={index % 3 === 0 ? 8 : 6} className={index % 3 === 0 ? "nitrogen-tone" : "oxygen-tone"} style={{ "--i": index } as React.CSSProperties}><animateMotion dur={`${3.4 + (index % 3) * 0.35}s`} begin={`${index * -0.48}s`} repeatCount="indefinite"><mpath href="#intakePath" /></animateMotion></circle>)}
      </g>

      <g className="psa-chamber" filter="url(#shadow)">
        <rect x="625" y="205" width="330" height="405" rx="72" fill="url(#chamber)" stroke="#a9c6ba" strokeWidth="3" />
        <rect x="646" y="226" width="288" height="360" rx="55" fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth="4" />
        <text x="790" y="270" textAnchor="middle">PSA</text><line x1="768" y1="283" x2="812" y2="283" />
        <g className="psa-sieve">
          {sieveParticles.map((particle, index) => <circle key={index} cx={particle.x} cy={particle.y} r={index % 5 === 0 ? 9 : 7} className={particle.tone} style={{ "--i": index } as CSSProperties} />)}
        </g>
        <path d="M730 583 V625 H850 V583" fill="none" stroke="#b8cac3" strokeWidth="18" strokeLinecap="round" />
      </g>

      <g className="psa-output-particles">
        {outputParticles.map(([x, y], index) => <circle key={index} cx={x} cy={y} r={9 - index * 0.6} className="oxygen-tone" style={{ "--i": index } as CSSProperties} />)}
        {Array.from({ length: 6 }, (_, index) => <circle key={`m-${index}`} r="7" className="oxygen-tone"><animateMotion dur={`${2.7 + index * 0.18}s`} begin={`${index * -0.5}s`} repeatCount="indefinite"><mpath href="#outputPath" /></animateMotion></circle>)}
      </g>

      <g className="psa-oxygen-result" filter="url(#softGlow)">
        <circle cx="1360" cy="430" r="145" fill="url(#oxygenOrb)" stroke="#a4ead0" strokeWidth="3" />
        <circle className="psa-orbit orbit-one" cx="1360" cy="430" r="112" fill="none" stroke="#89dbbb" strokeOpacity="0.5" />
        <circle className="psa-orbit orbit-two" cx="1360" cy="430" r="82" fill="none" stroke="#b4efd8" strokeOpacity="0.7" />
        <text x="1360" y="467" textAnchor="middle">O<tspan dy="20" fontSize="62">2</tspan></text>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const radians = angle * Math.PI / 180;
          return <circle key={angle} cx={1360 + Math.cos(radians) * 112} cy={430 + Math.sin(radians) * 112} r="9" className="oxygen-tone psa-orbit-dot" />;
        })}
      </g>

      <g className="psa-nitrogen-release">
        {Array.from({ length: 5 }, (_, index) => <circle key={index} r="7" className="nitrogen-tone"><animateMotion dur={`${2.8 + index * 0.25}s`} begin={`${index * -0.58}s`} repeatCount="indefinite"><mpath href="#nitrogenPath" /></animateMotion></circle>)}
        <circle cx="790" cy="750" r="58" fill="#e6e7e7" stroke="#fff" strokeWidth="5" />
        <text x="790" y="770" textAnchor="middle">N<tspan dy="12" fontSize="30">2</tspan></text>
      </g>

      <g className="psa-step-label psa-step-3 psa-step-interactive" {...interactionProps(3)}>
        <circle cx="930" cy="690" r="27" /><text x="930" y="698" textAnchor="middle">03</text>
        <rect x="875" y="720" width="280" height="82" rx="41" />
        <text className="psa-label-title" x="1015" y="752" textAnchor="middle">N₂ REMOVED</text>
        <text className="psa-label-copy" x="1015" y="778" textAnchor="middle">Nitrogen is separated</text>
      </g>

      <g className="psa-summary-flow">
        <g className="psa-summary-item" transform="translate(145 870)">
          <circle cx="52" cy="52" r="50" />
          <path d="M27 42h36c13 0 13-17 2-17-5 0-8 3-9 7M24 52h53c15 0 15 20 2 20-6 0-10-4-11-9M28 63h26" />
          <text className="psa-summary-title" x="125" y="39">SEPARATE.</text>
          <text className="psa-summary-copy" x="125" y="65">Remove unwanted</text>
          <text className="psa-summary-copy" x="125" y="88">nitrogen.</text>
        </g>
        <path className="psa-summary-arrow" d="M515 922h92m-16-12 16 12-16 12" />
        <g className="psa-summary-item" transform="translate(635 870)">
          <circle cx="52" cy="52" r="50" />
          <g className="psa-summary-dots">
            <circle cx="52" cy="27" r="5" /><circle cx="37" cy="38" r="5" /><circle cx="65" cy="40" r="5" />
            <circle cx="27" cy="54" r="5" /><circle cx="52" cy="54" r="6" /><circle cx="76" cy="58" r="5" />
            <circle cx="39" cy="72" r="5" /><circle cx="63" cy="76" r="5" />
          </g>
          <text className="psa-summary-title" x="125" y="39">CONCENTRATE.</text>
          <text className="psa-summary-copy" x="125" y="65">Increase oxygen</text>
          <text className="psa-summary-copy" x="125" y="88">concentration.</text>
        </g>
        <path className="psa-summary-arrow" d="M1030 922h92m-16-12 16 12-16 12" />
        <g className="psa-summary-item" transform="translate(1150 870)">
          <circle cx="52" cy="52" r="50" />
          <path d="M50 77c-2-26 4-43 25-56-1 22-8 35-25 42M50 63c-10-14-20-18-32-18 3 17 12 25 31 25M50 63l19-26M49 69 32 56" />
          <text className="psa-summary-title" x="125" y="39">DELIVER.</text>
          <text className="psa-summary-copy" x="125" y="65">Deliver clean,</text>
          <text className="psa-summary-copy" x="125" y="88">oxygen-rich air.</text>
        </g>
      </g>
    </svg>
    {activeStep && (
      <aside className="psa-hover-card" style={{ left: cardPosition.x, top: cardPosition.y }} role="status">
        <div className="psa-hover-card-head"><span>{stepDetails[activeStep].number}</span><small>{stepDetails[activeStep].eyebrow}</small></div>
        <h3>{stepDetails[activeStep].title}</h3>
        <p>{stepDetails[activeStep].summary}</p>
        <ul>{stepDetails[activeStep].details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
      </aside>
    )}
    </div>
  );
}
