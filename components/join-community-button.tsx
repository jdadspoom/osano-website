"use client";

import { useRouter } from "next/navigation";
import { SpecularButton } from "./specular-button";

export function JoinCommunityButton(){
  const router=useRouter();
  return <SpecularButton onClick={()=>router.push("/community")}>Join the Community</SpecularButton>;
}
