"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SiteScrollEffects(){
  const pathname=usePathname();

  useEffect(()=>{
    const main=document.querySelector<HTMLElement>("#main-content");
    const page=(main?.querySelector(":scope > .route-transition > *")??main?.firstElementChild) as HTMLElement|null;
    if(!main||!page||page.hasAttribute("data-home-page"))return;
    const sections=[...page.querySelectorAll<HTMLElement>(":scope > section")];
    if(!sections.length)return;
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      sections.forEach(section=>section.dataset.siteVisible="true");
      return;
    }

    page.dataset.siteScrollReady="true";
    sections.forEach(section=>section.dataset.siteReveal="true");
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          (entry.target as HTMLElement).dataset.siteVisible="true";
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.1,rootMargin:"0px 0px -7%"});
    sections.forEach(section=>observer.observe(section));

    return()=>{
      observer.disconnect();
      sections.forEach(section=>{
        delete section.dataset.siteReveal;
        delete section.dataset.siteVisible;
      });
      delete page.dataset.siteScrollReady;
    };
  },[pathname]);

  return null;
}
