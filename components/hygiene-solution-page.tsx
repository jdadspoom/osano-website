import Image from "next/image";
import { HygieneApproachCarousel } from "@/components/hygiene-approach-carousel";
import { HygieneSolutionsCarousel } from "@/components/hygiene-solutions-carousel";

export function HygieneSolutionPage() {
  return (
    <div className="clean-hygiene-page">
      <section className="clean-hygiene-hero">
        <div className="clean-hygiene-hero-copy">
          <p className="clean-hygiene-kicker">OSANO HYGIENE</p>
          <h1>Clean<br />by design</h1>
          <p>Advanced hygiene technology for the spaces you live in.</p>
          <a href="#hygiene-solutions">Explore hygiene contexts <span aria-hidden="true"></span></a>
        </div>
        <div className="clean-hygiene-media">
          <Image src="/images/solutions/hygiene/hygiene-hero.png" alt="A clean stone basin with running water" fill loading="eager" sizes="(max-width: 760px) 100vw, 60vw" />
        </div>
      </section>

      <section className="clean-hygiene-principle">
        <div className="clean-hygiene-principle-image">
          <Image src="/images/solutions/hygiene/hygiene-principle.png" alt="A glass of clean water in natural light" fill sizes="(max-width: 760px) 100vw, 52vw" />
        </div>
        <div>
          <p className="clean-hygiene-kicker">OUR PRINCIPLE</p>
          <h2>Hygiene begins<br />with the<br />environment.</h2>
          <p>Water. Air. The spaces around you.</p>
        </div>
      </section>

      <HygieneSolutionsCarousel />

      <HygieneApproachCarousel />

      <section className="clean-hygiene-closing" aria-labelledby="hygiene-closing-title">
        <Image
          src="/images/solutions/hygiene/hygiene-cleaner.webp"
          alt="A calm, clean living space filled with natural light"
          fill
          sizes="100vw"
        />
        <div className="clean-hygiene-closing-shade" />
        <div className="clean-hygiene-closing-copy">
          <h2 id="hygiene-closing-title">Cleaner space. Better living.</h2>
          <p>Hygiene technology made for everyday life.</p>
          <a href="#hygiene-solutions">Explore now</a>
        </div>
      </section>
    </div>
  );
}
