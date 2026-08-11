"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function ScrollProgress(){
  const pathname=usePathname();
  const enabled=pathname.startsWith("/stories")||pathname.startsWith("/technology");
  const [progress,setProgress]=useState(0);

  useEffect(()=>{
    if(!enabled)return;
    let frame=0;
    const update=()=>{frame=0;const max=document.documentElement.scrollHeight-window.innerHeight;setProgress(max>0?Math.min(1,window.scrollY/max):0);};
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();window.addEventListener("scroll",scroll,{passive:true});window.addEventListener("resize",scroll);
    return()=>{window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll);if(frame)cancelAnimationFrame(frame);};
  },[enabled,pathname]);

  if(!enabled)return null;
  return <div className="scroll-progress" aria-hidden="true"><span style={{transform:`scaleX(${progress})`}}/></div>;
}
