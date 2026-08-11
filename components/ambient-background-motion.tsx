"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AmbientBackgroundMotion(){
  const pathname=usePathname();
  useEffect(()=>{
    if(!/^\/(technology|contact)(\/|$)/.test(pathname)||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const page=document.querySelector<HTMLElement>("#main-content .route-transition > div");
    if(!page)return;
    page.dataset.ambientPage="true";
    let frame=0;
    const update=()=>{frame=0;page.style.setProperty("--ambient-shift",`${Math.min(window.scrollY*.08,120)}px`);};
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();window.addEventListener("scroll",scroll,{passive:true});
    return()=>{window.removeEventListener("scroll",scroll);if(frame)cancelAnimationFrame(frame);delete page.dataset.ambientPage;page.style.removeProperty("--ambient-shift");};
  },[pathname]);
  return null;
}
