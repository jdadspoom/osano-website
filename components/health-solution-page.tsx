import Image from "next/image";
import Link from "next/link";

const paths = [
  {
    number: "01",
    title: "Oxygen",
    description: "Breathe better.",
    image: "/images/solutions/health/health-oxygen.png",
  },
  {
    number: "02",
    title: "Hydrogen",
    description: "Hydrate better.",
    image: "/images/solutions/health/health-hydrogen.webp",
  },
  {
    number: "03",
    title: "QRS",
    description: "Restore balance.",
    image: "/images/solutions/health/health-qrs.webp",
  },
];

export function HealthSolutionPage() {
  return (
    <main className="hygiene-page">
      <section className="hygiene-hero">
        <div className="hygiene-hero-copy">
          <p className="hygiene-kicker">OSANO HEALTH</p>
          <h1>Well-being<br />in daily life</h1>
          <p>Personalized routes that integrate clean water, air and environment into a balanced daily routine.</p>
          <a className="hygiene-light-button" href="#health-paths">Explore health contexts <span aria-hidden="true">→</span></a>
        </div>
        <div className="hygiene-hero-media">
          <Image src="/images/solutions/health/health-hero.png" alt="A woman preparing fresh vegetables in a bright kitchen" fill priority sizes="(max-width: 760px) 100vw, 60vw" />
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

      <section className="hygiene-paths" id="health-paths">
        <div className="hygiene-section-heading">
          <p className="hygiene-kicker">CHOOSE YOUR WELL-BEING PATH</p>
          <h2>Find what fits your everyday life.</h2>
        </div>
        <div className="hygiene-path-grid">
          {paths.map((path) => (
            <article className="hygiene-path-card" key={path.title}>
              <div className="hygiene-path-image">
                <Image src={path.image} alt={`${path.title} hygiene context`} fill sizes="(max-width: 760px) 88vw, 30vw" />
                <span>{path.number}</span>
              </div>
              <div className="hygiene-path-body">
                <div>
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                </div>
                <Link href="/technology">Explore <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="hygiene-approach">
        <p className="hygiene-kicker">OUR APPROACH</p>
        <h2>Made to fit your life.</h2>
        <div className="hygiene-routine-grid">
          {["Morning", "Day", "Evening"].map((label, index) => (
            <article key={label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{label}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="hygiene-end-banner">
        <div>
          <h2>Live well. Every day.</h2>
          <p>Well-being technology, made for everyday life.</p>
        </div>
      </section>
    </main>
  );
}
