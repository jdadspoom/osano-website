"use client";

import { useEffect, useRef } from "react";
import { Camera, Color, Mesh, Program, Renderer, Sphere, Torus, Transform } from "ogl";
import styles from "@/app/technology.module.css";

const vertex = `
attribute vec3 position;
attribute vec3 normal;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
varying vec3 vNormal;
varying vec3 vView;
void main(){
  vec4 viewPosition=modelViewMatrix*vec4(position,1.0);
  vNormal=normalize(normalMatrix*normal);
  vView=normalize(-viewPosition.xyz);
  gl_Position=projectionMatrix*viewPosition;
}`;

const fragment = `
precision highp float;
uniform vec3 uColor;
uniform float uAlpha;
uniform float uGlass;
varying vec3 vNormal;
varying vec3 vView;
void main(){
  float fresnel=pow(1.0-max(dot(normalize(vNormal),normalize(vView)),0.0),2.4);
  float light=max(dot(normalize(vNormal),normalize(vec3(-0.4,0.8,0.7))),0.0);
  vec3 color=mix(uColor,vec3(1.0),light*0.6+fresnel*uGlass);
  gl_FragColor=vec4(color,uAlpha*(0.62+fresnel*0.38));
}`;

export function Molecule3D(){
  const host=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const element=host.current;if(!element)return;
    const renderer=new Renderer({alpha:true,antialias:true,dpr:Math.min(window.devicePixelRatio,2)});
    const gl=renderer.gl;element.appendChild(gl.canvas);gl.clearColor(0,0,0,0);
    const camera=new Camera(gl,{fov:38});camera.position.set(0,0,8.5);camera.lookAt([0,0,0]);
    const scene=new Transform();const molecule=new Transform();molecule.setParent(scene);
    const glass=new Program(gl,{vertex,fragment,transparent:true,depthTest:true,depthWrite:false,cullFace:null,uniforms:{uColor:{value:new Color("#b8c2c5")},uAlpha:{value:.84},uGlass:{value:1}}});
    const green=new Program(gl,{vertex,fragment,transparent:true,uniforms:{uColor:{value:new Color("#00845f")},uAlpha:{value:1},uGlass:{value:.35}}});
    const silver=new Program(gl,{vertex,fragment,transparent:true,uniforms:{uColor:{value:new Color("#87918f")},uAlpha:{value:.72},uGlass:{value:.8}}});
    const sphere=new Sphere(gl,{radius:1,widthSegments:48,heightSegments:32});
    [[0,1.18,0],[-1.22,-.72,.18],[1.22,-.72,-.18]].forEach(([x,y,z])=>{const mesh=new Mesh(gl,{geometry:sphere,program:glass});mesh.position.set(x,y,z);mesh.setParent(molecule)});
    const core=new Mesh(gl,{geometry:new Sphere(gl,{radius:.48,widthSegments:36,heightSegments:24}),program:silver});core.position.set(0,-.05,0);core.setParent(molecule);
    const orbit=new Mesh(gl,{geometry:new Torus(gl,{radius:2.28,tube:.018,radialSegments:12,tubularSegments:96}),program:silver});orbit.rotation.x=Math.PI/2;orbit.setParent(molecule);
    [[2.28,0,0],[-1.14,1.98,.05],[-1.14,-1.98,-.05]].forEach(([x,y,z])=>{const electron=new Mesh(gl,{geometry:new Sphere(gl,{radius:.13,widthSegments:24,heightSegments:16}),program:green});electron.position.set(x,y,z);electron.setParent(molecule)});
    let dragging=false,lastX=0,lastY=0,targetX=-.08,targetY=-.25,rotationX=targetX,rotationY=targetY,raf=0;
    const down=(event:PointerEvent)=>{dragging=true;lastX=event.clientX;lastY=event.clientY;element.setPointerCapture(event.pointerId)};
    const move=(event:PointerEvent)=>{if(!dragging)return;targetY+=(event.clientX-lastX)*.012;targetX+=(event.clientY-lastY)*.009;targetX=Math.max(-1.1,Math.min(1.1,targetX));lastX=event.clientX;lastY=event.clientY};
    const up=()=>{dragging=false};element.addEventListener("pointerdown",down);element.addEventListener("pointermove",move);element.addEventListener("pointerup",up);element.addEventListener("pointercancel",up);
    const resize=()=>{const {clientWidth:width,clientHeight:height}=element;renderer.setSize(width,height);camera.perspective({aspect:width/height})};
    const observer=new ResizeObserver(resize);observer.observe(element);resize();
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const render=()=>{if(!dragging&&!reduced)targetY+=.003;rotationX+=(targetX-rotationX)*.08;rotationY+=(targetY-rotationY)*.08;molecule.rotation.x=rotationX;molecule.rotation.y=rotationY;renderer.render({scene,camera});raf=requestAnimationFrame(render)};render();
    return()=>{cancelAnimationFrame(raf);observer.disconnect();element.removeEventListener("pointerdown",down);element.removeEventListener("pointermove",move);element.removeEventListener("pointerup",up);element.removeEventListener("pointercancel",up);gl.canvas.remove()};
  },[]);
  return <div className={styles.molecule3d} ref={host} role="img" aria-label="Interactive three-dimensional molecular structure. Drag to rotate 360 degrees."><span>Drag to rotate 360°</span></div>;
}
