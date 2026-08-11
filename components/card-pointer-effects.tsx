"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function CardPointerEffects(){
  const pathname=usePathname();
  useEffect(()=>{
    if(!/^\/(solutions|community|stories)(\/|$)/.test(pathname)||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const cards=[...document.querySelectorAll<HTMLElement>("#main-content article")].filter(card=>card.getBoundingClientRect().width>180);
    const cleanups=cards.map(card=>{
      card.dataset.pointerCard="true";
      const move=(event:PointerEvent)=>{const rect=card.getBoundingClientRect();card.style.setProperty("--spot-x",`${event.clientX-rect.left}px`);card.style.setProperty("--spot-y",`${event.clientY-rect.top}px`);};
      card.addEventListener("pointermove",move);
      return()=>{card.removeEventListener("pointermove",move);delete card.dataset.pointerCard;card.style.removeProperty("--spot-x");card.style.removeProperty("--spot-y");};
    });
    return()=>cleanups.forEach(cleanup=>cleanup());
  },[pathname]);
  return null;
}
