"use client";

import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import styles from "./specular-button.module.css";

const PAD = 20;
const VERT = `#version 300 es
in vec2 position;
void main(){gl_Position=vec4(position,0.0,1.0);}`;
const FRAG = `#version 300 es
precision highp float;
uniform vec2 uCenter; uniform vec2 uHalfSize; uniform float uRadius; uniform float uAngle; uniform float uPx;
uniform vec3 uLineColor; uniform vec3 uBaseColor; uniform float uIntensity; uniform float uShineSize;
uniform float uShineFade; uniform float uThickness; uniform float uBaseWidth; out vec4 fragColor;
float sdRoundedRect(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.0))+min(max(q.x,q.y),0.0)-r;}
float gaussianLine(float d,float sigma){float x=d/(sigma+1e-6);float k=mix(1.0,1.6,smoothstep(0.0,1.5,x));return exp(-k*x*x);}
void main(){vec2 p=gl_FragCoord.xy-uCenter;float d=sdRoundedRect(p,uHalfSize,uRadius);vec2 L=vec2(cos(uAngle),sin(uAngle));
float base=(1.0-smoothstep(0.0,uBaseWidth,abs(d)))*0.45;vec2 nEll=normalize(p/(uHalfSize*uHalfSize)+1e-6);
float phi=acos(clamp(abs(dot(nEll,L)),0.0,1.0));float rim=1.0-smoothstep(uShineSize-uShineFade,uShineSize+uShineFade+1e-4,phi);
float line=gaussianLine(d,uThickness);float edgeClamp=1.0-smoothstep(0.5*uPx,3.0*uPx,abs(d));float hi=line*rim*edgeClamp*uIntensity;
vec3 col=uBaseColor*base+uLineColor*hi;float a=clamp(base+hi,0.0,1.0);fragColor=vec4(col,a);}`;

type SpecularButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  radius?: number;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  speed?: number;
  proximity?: number;
  autoAnimate?: boolean;
};

export function SpecularButton({children,onClick,radius=30,lineColor="#000000",baseColor="#174f3d",intensity=1.15,speed=.28,proximity=250,autoAnimate=true}:SpecularButtonProps){
  const buttonRef=useRef<HTMLButtonElement>(null);
  const effectRef=useRef<HTMLSpanElement>(null);
  const propsRef=useRef({radius,lineColor,baseColor,intensity,speed,proximity,autoAnimate});

  useEffect(()=>{
    propsRef.current={radius,lineColor,baseColor,intensity,speed,proximity,autoAnimate};
  },[radius,lineColor,baseColor,intensity,speed,proximity,autoAnimate]);

  useEffect(()=>{
    const button=buttonRef.current,effect=effectRef.current;
    if(!button||!effect)return;
    const dpr=window.devicePixelRatio||1;
    const renderer=new Renderer({alpha:true,premultipliedAlpha:true,antialias:true,dpr});
    const gl=renderer.gl; gl.clearColor(0,0,0,0); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
    const geometry=new Triangle(gl); if(geometry.attributes.uv)delete geometry.attributes.uv;
    const program=new Program(gl,{vertex:VERT,fragment:FRAG,uniforms:{uCenter:{value:[0,0]},uHalfSize:{value:[1,1]},uRadius:{value:0},uAngle:{value:2.4},uPx:{value:dpr},uLineColor:{value:[1,1,1]},uBaseColor:{value:[.09,.31,.24]},uIntensity:{value:1},uShineSize:{value:.16},uShineFade:{value:.7},uThickness:{value:1.15},uBaseWidth:{value:dpr}}});
    const mesh=new Mesh(gl,{geometry,program}); effect.appendChild(gl.canvas);
    const size={w:1,h:1};
    const resize=()=>{const rect=button.getBoundingClientRect();size.w=rect.width;size.h=rect.height;renderer.setSize(rect.width+PAD*2,rect.height+PAD*2);program.uniforms.uCenter.value=[(PAD+rect.width/2)*dpr,(PAD+rect.height/2)*dpr];program.uniforms.uHalfSize.value=[rect.width/2*dpr,rect.height/2*dpr];};
    const observer=new ResizeObserver(resize); observer.observe(button); resize();
    let pointerAngle:number|null=null,proximityAmount=0;
    const pointerMove=(event:PointerEvent)=>{const rect=button.getBoundingClientRect(),cx=rect.left+rect.width/2,cy=rect.top+rect.height/2,dx=Math.max(rect.left-event.clientX,0,event.clientX-rect.right),dy=Math.max(rect.top-event.clientY,0,event.clientY-rect.bottom),distance=Math.hypot(dx,dy);pointerAngle=Math.atan2(cy-event.clientY,event.clientX-cx);const t=Math.max(0,1-distance/Math.max(propsRef.current.proximity,1));proximityAmount=t*t*(3-2*t);};
    window.addEventListener("pointermove",pointerMove,{passive:true});
    let angle=2.4,idle=2.4,brightness=0,last=performance.now(),frame=0;const line=new Color(),base=new Color();
    const update=(now:number)=>{frame=requestAnimationFrame(update);const dt=Math.min((now-last)/1000,.05);last=now;const p=propsRef.current;idle+=p.speed*dt;const target=pointerAngle!==null&&proximityAmount>0?pointerAngle:idle;const diff=((target-angle+Math.PI*3)%(Math.PI*2))-Math.PI;angle+=diff*(1-Math.exp(-dt*7));const brightTarget=p.autoAnimate?1:proximityAmount;brightness+=(brightTarget-brightness)*(1-Math.exp(-dt*8));line.set(p.lineColor);base.set(p.baseColor);program.uniforms.uAngle.value=angle;program.uniforms.uRadius.value=Math.min(p.radius,Math.min(size.w,size.h)/2)*dpr;program.uniforms.uLineColor.value=[line.r,line.g,line.b];program.uniforms.uBaseColor.value=[base.r,base.g,base.b];program.uniforms.uIntensity.value=p.intensity*brightness;renderer.render({scene:mesh});};
    frame=requestAnimationFrame(update);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener("pointermove",pointerMove);if(gl.canvas.parentNode===effect)effect.removeChild(gl.canvas);gl.getExtension("WEBGL_lose_context")?.loseContext();};
  },[]);

  const style={"--radius":`${radius}px`,"--text":"#174f3d","--tint":"#fff","--tint-opacity":.08,"--blur":"6px"} as CSSProperties;
  return <button ref={buttonRef} type="button" onClick={onClick} className={styles.button} style={style}><span ref={effectRef} className={styles.effect} aria-hidden="true"/><span className={styles.label}>{children}</span></button>;
}
