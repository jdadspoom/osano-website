import Image from "next/image";
import Link from "next/link";
import { BeforeAfterComparison } from "@/components/before-after-comparison";

const hygieneSpaces = [
  { title: "Kitchen", caption: "Clean water", image: "/images/solutions/hygiene/hygiene-kitchen.png", href: "/solutions/hygiene/water-surface" },
  { title: "Bathroom", caption: "Everyday hygiene", image: "/images/solutions/hygiene/hygiene-bathroom.png", href: "/solutions/hygiene/water-surface" },
  { title: "Living Space", caption: "Cleaner environment", image: "/images/solutions/hygiene/hygiene-living-space.png", href: "/solutions/hygiene/air" },
];

export function HygieneSolutionPage() {
  return (
    <main className="clean-hygiene-page">
      <section className="clean-hygiene-hero">
        <div className="clean-hygiene-hero-copy">
          <p className="clean-hygiene-kicker">OSANO HYGIENE</p>
          <h1>Clean<br />by design</h1>
          <p>Advanced hygiene technology for the spaces you live in.</p>
          <a href="#hygiene-solutions">Explore hygiene contexts <span aria-hidden="true">→</span></a>
        </div>
        <div className="clean-hygiene-media">
          <Image src="/images/solutions/hygiene/hygiene-hero.png" alt="A clean stone basin with running water" fill priority sizes="(max-width: 760px) 100vw, 60vw" />
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

      <section className="clean-hygiene-comparison" aria-labelledby="hygiene-comparison-title">
        <div className="clean-hygiene-comparison-copy">
          <p className="clean-hygiene-kicker">A CLOSER LOOK</p>
          <h2 id="hygiene-comparison-title">See the environment differently.</h2>
          <p>Drag the control to explore two everyday hygiene contexts.</p>
        </div>
        <BeforeAfterComparison
          beforeSrc="/images/solutions/hygiene/hygiene-living-space.png"
          afterSrc="/images/solutions/hygiene/hygiene-air-solutions.png"
          beforeLabel="Everyday space"
          afterLabel="Hygiene designed in"
        />
        <p className="clean-hygiene-comparison-note">Prototype imagery — final comparison photography can be added later.</p>
      </section>

      <section className="clean-hygiene-solutions" id="hygiene-solutions">
        <p className="clean-hygiene-kicker">OUR SOLUTIONS</p>
        <h2>Designed for everyday hygiene.</h2>
        <div className="clean-hygiene-solution-grid">
          <article>
            <div><Image src="/images/solutions/hygiene/hygiene-air-solutions.png" alt="Air hygiene solution in a living space" fill sizes="(max-width: 760px) 100vw, 42vw" /></div>
            <h3>Air Solution</h3><p>Breathe cleaner.</p><Link href="/solutions/hygiene/air">Explore Air <span aria-hidden="true">→</span></Link>
          </article>
          <article>
            <div><Image src="/images/solutions/hygiene/hygiene-water-solutions.png" alt="Clean drinking water from a tap" fill sizes="(max-width: 760px) 100vw, 42vw" /></div>
            <h3>Water Solution</h3><p>Live cleaner.</p><Link href="/solutions/hygiene/water-surface">Explore Water <span aria-hidden="true">→</span></Link>
          </article>
        </div>
      </section>

      <section className="clean-hygiene-approach">
        <p className="clean-hygiene-kicker">OUR APPROACH</p>
        <h2>Hygiene, built into life</h2>
        <p>Less effort. More protection.</p>
        <div className="clean-hygiene-space-grid">
          {hygieneSpaces.map((space) => <article key={space.title}>
            <div><Image src={space.image} alt={`${space.title} hygiene`} fill sizes="(max-width: 760px) 100vw, 30vw" /></div>
            <h3>{space.title}</h3><p>{space.caption}</p><Link href={space.href}>Explore <span aria-hidden="true">→</span></Link>
          </article>)}
        </div>
      </section>
    </main>
  );
}
