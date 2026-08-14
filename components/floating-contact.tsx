"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import styles from "./floating-contact.module.css";

export function FloatingContact(){
  const [open,setOpen]=useState(false);
  const widgetRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(!open)return;
    const close=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false);};
    const outside=(event:PointerEvent)=>{if(!widgetRef.current?.contains(event.target as Node))setOpen(false);};
    window.addEventListener("keydown",close);
    window.addEventListener("pointerdown",outside);
    return()=>{window.removeEventListener("keydown",close);window.removeEventListener("pointerdown",outside);};
  },[open]);

  return <div ref={widgetRef} className={styles.widget}>
    {open&&<div className={styles.menu} id="floating-contact-menu">
      <a href={siteConfig.contact.lineUrl} target="_blank" rel="noreferrer"><span className={styles.lineIcon} aria-hidden="true">LINE</span><span>LINE</span></a>
      <a href="tel:029525414"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.5 9.7 7 8.2 9.1c1.25 2.55 3.05 4.35 5.6 5.6l2.1-1.5 3.5 2.6-.55 3.05c-.17.94-1.04 1.59-1.99 1.5C9.98 19.7 4.3 14.02 3.65 7.14c-.09-.95.56-1.82 1.5-1.99L7.1 3.5Z"/></svg><span>CALL</span></a>
      <Link href="/contact#contact-form" onClick={()=>setOpen(false)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.25 10.5c0 4.14-3.96 7.5-8.85 7.5-1.06 0-2.08-.16-3.02-.46L4.5 19.5l1.2-3.34c-1.94-1.37-3.15-3.39-3.15-5.66C2.55 6.36 6.51 3 11.4 3s8.85 3.36 8.85 7.5Z"/></svg><span>MESSAGE</span></Link>
    </div>}
    <button className={styles.toggle} type="button" aria-label={open?"ปิดช่องทางติดต่อ":"เปิดช่องทางติดต่อ"} aria-expanded={open} aria-controls="floating-contact-menu" onClick={()=>setOpen(value=>!value)}>
      {open?<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.25 10.5c0 4.14-3.96 7.5-8.85 7.5-1.06 0-2.08-.16-3.02-.46L4.5 19.5l1.2-3.34c-1.94-1.37-3.15-3.39-3.15-5.66C2.55 6.36 6.51 3 11.4 3s8.85 3.36 8.85 7.5Z"/></svg>}
    </button>
  </div>;
}
