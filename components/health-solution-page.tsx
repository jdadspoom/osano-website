import Image from "next/image";
import { HealthPathsCarousel } from "@/components/health-paths-carousel";
import { OsanoEmptyArtwork } from "@/components/osano-empty-artwork";

export function HealthSolutionPage() {
  return (
    <div className="hygiene-page health-world-page">
      <section className="hygiene-hero">
        <div className="hygiene-hero-copy">
          <p className="hygiene-kicker">OSANO HEALTH</p>
          <h1>Well-being<br />in daily life</h1>
          <p>Personalised routes that integrate clean water, air and the surrounding environment into a balanced daily routine.</p>
          <a className="hygiene-light-button" href="#health-paths">Explore health contexts <span aria-hidden="true"></span></a>
        </div>
        <div className="hygiene-hero-media">
          <Image src="/images/solutions/health/health-hero.png" alt="A woman preparing fresh vegetables in a bright kitchen" fill loading="eager" sizes="(max-width: 760px) 100vw, 60vw" />
        </div>
      </section>

      <section className="hygiene-principle">
        <div className="hygiene-principle-copy">
          <p className="hygiene-kicker">OUR PRINCIPLE</p>
          <h2>Understand<br />first.</h2>
          <p>Your life. Your environment. Your well-being.</p>
          <p className="hygiene-serif-copy">The right route aligns with your life, not a one-size-fits-all formula.</p>
        </div>
        <div className="hygiene-principle-media">
          <Image src="/images/solutions/health/health-principle.png" alt="Clean, aerated water" fill sizes="(max-width: 760px) 100vw, 52vw" />
        </div>
      </section>

      <HealthPathsCarousel />

      <section className="health-routine-section" aria-labelledby="health-routine-title">
        <p className="health-routine-kicker">OUR APPROACH</p>
        <h2 id="health-routine-title">Made to fit your life.</h2>
        <div className="health-routine-cards">
          {[
            { label: "Morning", image: "/images/solutions/health/health-hero.png" },
            { label: "Day", image: "/images/solutions/health/health-oxygen.png?v=20260814" },
            { label: "Evening", image: "/images/solutions/health/health-qrs.webp" },
          ].map((routine, index) => (
            <article className="health-routine-card" key={routine.label} tabIndex={0}>
              <Image src={routine.image} alt={`${routine.label} well-being routine prototype`} fill sizes="(max-width: 760px) 88vw, 50vw" />
              <div className="health-routine-shade" />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{routine.label}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="health-closing-banner" aria-labelledby="health-closing-title">
        <div className="health-closing-placeholder"><OsanoEmptyArtwork label="Evening well-being" tone="health" /></div>
        <div className="health-closing-shade" />
        <div className="health-closing-copy">
          <h2 id="health-closing-title">Live well. Every day.</h2>
          <p>Well-being technology made for everyday life.</p>
          <a href="#health-paths">Explore now</a>
        </div>
      </section>
    </div>
  );
}
