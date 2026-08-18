"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ctaWords=/\b(explore|view|start|submit|subscribe|read|talk|discover|conversation|enquiry)\b/i;

export function CtaMotion(){
  const pathname=usePathname();
  useEffect(()=>{
    let controls:HTMLElement[]=[];
    const timer=window.setTimeout(()=>{
      controls=[...document.querySelectorAll<HTMLElement>("main a[href], main button")];
      controls.forEach(control=>{
        const label=(control.textContent??"").trim();
        if(ctaWords.test(label)&&!control.closest('[role="tablist"], [aria-label*="carousel" i], [aria-label*="pagination" i]')) control.dataset.ctaMotion="true";
      });
    },250);
    return()=>{window.clearTimeout(timer);controls.forEach(control=>delete control.dataset.ctaMotion);};
  },[pathname]);
  return null;
}
