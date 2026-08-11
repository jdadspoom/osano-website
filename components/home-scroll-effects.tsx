"use client";

import { useEffect } from "react";

export function HomeScrollEffects(){
  useEffect(()=>{
    const root=document.querySelector<HTMLElement>("[data-home-page]");
    if(!root)return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduced){
      root.querySelectorAll<HTMLElement>("[data-home-reveal]").forEach(element=>element.dataset.visible="true");
      return;
    }

    root.dataset.scrollReady="true";
    const reveals=[...root.querySelectorAll<HTMLElement>("[data-home-reveal]")];
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          (entry.target as HTMLElement).dataset.visible="true";
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:"0px 0px -8%"});
    reveals.forEach(element=>observer.observe(element));

    let frame=0;
    const update=()=>{
      frame=0;
      const distance=Math.min(window.scrollY,720);
      root.style.setProperty("--home-parallax",`${distance*.13}px`);
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();
    window.addEventListener("scroll",onScroll,{passive:true});
    return()=>{observer.disconnect();window.removeEventListener("scroll",onScroll);if(frame)cancelAnimationFrame(frame);};
  },[]);

  return null;
}
