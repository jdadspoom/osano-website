"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DiagonalArrowIcon } from "@/components/diagonal-arrow-icon";
import { OsanoEmptyArtwork } from "@/components/osano-empty-artwork";
import { useCarouselNavigation } from "@/components/use-carousel-navigation";

const features=[
  {id:"air",label:"AIR HYGIENE",description:"Designed to support cleaner, fresher spaces — continuously.",image:"/images/solutions/hygiene/hygiene-air-solutions.png",alt:"Fresh air moving through a bright, plant-filled interior"},
  {id:"odor",label:"ODOR CONTROL",description:"Thoughtful odor control helps everyday spaces feel naturally comfortable.",image:"/images/solutions/hygiene/hygiene-kitchen.png",alt:"Calm kitchen environment with natural greenery"},
  {id:"care",label:"CONTINUOUS CARE",description:"Quiet air hygiene that works consistently in the background.",image:"/images/solutions/hygiene/hygiene-living-space.png",alt:"Serene living space designed for continuous everyday care"},
] as const;

const environments=[
  {title:"Home",description:"Everyday living",image:"/images/solutions/hygiene/hygiene-living-space.png"},
  {title:"Workplace",description:"Shared spaces",image:"/images/solutions/hygiene/hygiene-cleaner.webp"},
  {title:"Professional",description:"Clinics & care spaces",image:"/images/solutions/hygiene/hygiene-bathroom.png"},
  {title:"Hospitality",description:"Welcoming environments",image:"/images/solutions/hygiene/hygiene-hero.png"},
  {title:"Wellness",description:"Calm restorative spaces",image:"/images/solutions/hygiene/hygiene-air-solutions.png"},
  {title:"Care Facility",description:"Continuous shared care",image:"/images/solutions/hygiene/hygiene-principle.png"},
];

const products=[
  {title:"HAS Mini",description:"Compact Air Hygiene",slug:"has-mini",bestSeller:true},
  {title:"HAS",description:"Everyday Air Hygiene",slug:"has",bestSeller:true},
  {title:"SSS",description:"Advanced Space Solution",slug:"sss",bestSeller:false},
  {title:"HAS Pro",description:"Professional Air Hygiene",slug:"has-pro",bestSeller:false},
];

function AirPlaceholder({label}:{label:string}){
  return <div className="air-placeholder"><OsanoEmptyArtwork label={label} tone="hygiene" /></div>;
}

export function AirSolutionPage(){
  const [activeId,setActiveId]=useState<(typeof features)[number]["id"]>("air");
  const [showDetail,setShowDetail]=useState(false);
  const [revealedEnvironments,setRevealedEnvironments]=useState<Set<number>>(()=>new Set());
  const [environmentSectionVisible,setEnvironmentSectionVisible]=useState(false);
  const environmentSectionRef=useRef<HTMLElement>(null);
  const { canGoPrevious:canGoPreviousEnvironment,canGoNext:canGoNextEnvironment,previous:previousEnvironment,next:nextEnvironment,trackRef:environmentTrackRef,itemRefs:environmentItemRefs,trackProps:environmentTrackProps }=useCarouselNavigation(environments.length);
  const { activeIndex:productIndex,canGoPrevious:canGoPreviousProduct,canGoNext:canGoNextProduct,previous:previousProduct,next:nextProduct,trackRef:productTrackRef,itemRefs:productItemRefs,trackProps:productTrackProps }=useCarouselNavigation(products.length);

  const activate=(id:(typeof features)[number]["id"])=>{
    setActiveId(id);
    setShowDetail(false);
  };
  useEffect(()=>{
    const track=environmentTrackRef.current;
    if(!track)return;
    const observer=new IntersectionObserver(entries=>{
      setRevealedEnvironments(current=>{
        const next=new Set(current);
        entries.forEach(entry=>{
          const index=Number((entry.target as HTMLElement).dataset.environmentIndex);
          if(entry.isIntersecting)next.add(index);else next.delete(index);
        });
        return next;
      });
    },{root:track,threshold:.38});
    environmentItemRefs.current.forEach(card=>{if(card)observer.observe(card);});
    return()=>observer.disconnect();
  },[environmentItemRefs,environmentTrackRef]);

  useEffect(()=>{
    const section=environmentSectionRef.current;
    if(!section)return;
    const observer=new IntersectionObserver(([entry])=>setEnvironmentSectionVisible(entry.isIntersecting),{threshold:.18});
    observer.observe(section);
    return()=>observer.disconnect();
  },[]);

  return <div className="air-solution-page">
    <section className="air-solution-hero">
      <div>
        <p className="air-kicker">HYGIENE AIR SOLUTIONS</p>
        <h1>Cleaner air.<br/>Better spaces.</h1>
        <p>Advanced air hygiene technology designed for everyday environments.</p>
      </div>
      <AirPlaceholder label="Premium home, office or clinic environment"/>
    </section>

    <section className="air-editorial-feature" aria-labelledby="air-feature-heading">
      <header>
        <p>WHAT IT DOES</p>
        <h2 id="air-feature-heading">CLEAN AIR, WORKING QUIETLY.</h2>
        <span>Designed to support cleaner, fresher spaces — continuously.</span>
      </header>

      <div className="air-editorial-cards" role="tablist" aria-label="Air hygiene features">
        {features.map(feature=>{
          const active=feature.id===activeId;
          return <article className={active?"air-editorial-card is-active":"air-editorial-card"} key={feature.id} style={{order:active?-1:0}} data-pointer-card>
            <button className="air-editorial-card-select" type="button" role="tab" aria-selected={active} aria-controls={active?`air-panel-${feature.id}`:undefined} onClick={()=>activate(feature.id)}>
              <span className="air-card-image"><Image src={feature.image} alt={feature.alt} fill sizes={active?"(max-width: 760px) 100vw, 55vw":"(max-width: 760px) 100vw, 22vw"}/></span>
              {!active&&<span className="air-card-shade"/>}
              {!active&&<strong>{feature.label}</strong>}
            </button>
            {active&&<div className="air-card-copy" id={`air-panel-${feature.id}`} role="tabpanel">
              <h2>{feature.label}</h2>
              <p className={showDetail?"is-visible":""}>{feature.description}</p>
              <button type="button" className="air-card-more" aria-expanded={showDetail} onClick={()=>setShowDetail(value=>!value)}>
                <span>{showDetail?"Close":"See more"}</span><i aria-hidden="true"><DiagonalArrowIcon /></i>
              </button>
            </div>}
          </article>;
        })}
      </div>
    </section>

    <section className="air-environments air-environment-showcase" aria-labelledby="air-environments-heading" ref={environmentSectionRef}>
      <header><p>FIND YOUR AIR SOLUTION</p><h2 id="air-environments-heading">Hygiene, built into life</h2></header>
      <div className="air-environment-viewport">
        <div className="air-environment-track" ref={environmentTrackRef} {...environmentTrackProps} aria-label="Air solution environments">
          {environments.map((environment,index)=><article className={environmentSectionVisible&&revealedEnvironments.has(index)?"is-glass-revealed":""} key={environment.title} data-pointer-card data-environment-index={index} ref={node=>{environmentItemRefs.current[index]=node;}} aria-label={`${index+1} of ${environments.length}: ${environment.title}`}>
            <Image src={environment.image} alt={`${environment.title} air hygiene environment`} fill sizes="(max-width:700px) 84vw, 31vw"/>
            <div className="air-environment-glass">
              <h3>{environment.title}</h3><p>{environment.description}</p>
              <button type="button" aria-label={`Explore ${environment.title}`}><DiagonalArrowIcon/></button>
            </div>
          </article>)}
        </div>
      </div>
      <footer>
        <div><button type="button" onClick={previousEnvironment} disabled={!canGoPreviousEnvironment} aria-label="Previous environment">‹</button><button type="button" onClick={nextEnvironment} disabled={!canGoNextEnvironment} aria-label="Next environment">›</button></div>
        <p>Find the right solution for your environment.</p>
      </footer>
    </section>

    <section className="air-products air-product-showcase" aria-labelledby="air-products-heading">
      <header>
        <h2 id="air-products-heading">Find your fit</h2>
        <Link href={`/products/${products[productIndex].slug}`}>Explore selected product</Link>
      </header>
      <div className="air-product-viewport">
        <div className="air-product-track" ref={productTrackRef} {...productTrackProps} aria-label="Air hygiene products">
          {products.map((product,index)=><article key={product.slug} ref={node=>{productItemRefs.current[index]=node;}} aria-label={`${index+1} of ${products.length}: ${product.title}`}>
            <div className="air-product-artwork" role="img" aria-label={`${product.title} product image placeholder`}>{product.bestSeller&&<span>Best seller</span>}</div>
            <div className="air-product-copy"><h3>{product.title}</h3><p>{product.description}</p><Link href={`/products/${product.slug}`} aria-label={`View ${product.title} product details`}><DiagonalArrowIcon/></Link></div>
          </article>)}
        </div>
      </div>
      <footer>
        <div className="air-product-progress"><span style={{width:`${((productIndex+1)/products.length)*100}%`}}/></div>
        <div><button type="button" onClick={previousProduct} disabled={!canGoPreviousProduct} aria-label="Previous product">‹</button><button type="button" onClick={nextProduct} disabled={!canGoNextProduct} aria-label="Next product">›</button></div>
      </footer>
    </section>
  </div>;
}
