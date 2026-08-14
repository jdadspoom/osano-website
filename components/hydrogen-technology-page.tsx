import Link from "next/link";

const applications = [
  { number: "01", title: "HOME", description: "Daily hydration" },
  { number: "02", title: "WORK", description: "Hydration throughout the day" },
  { number: "03", title: "ON THE GO", description: "Well-being wherever life takes you" },
];

function HydrogenPlaceholder({ label }: { label: string }) {
  return <div className="hydrogen-placeholder" role="img" aria-label={`${label} image placeholder`}><span>IMAGE PLACEHOLDER</span><small>{label}</small></div>;
}

export function HydrogenTechnologyPage() {
  return (
    <main className="hydrogen-page">
      <section className="hydrogen-hero">
        <div className="hydrogen-hero-copy">
          <p className="hydrogen-kicker">HYDROGEN TECHNOLOGY</p>
          <h1>Hydrogen.<br />Unlocked.</h1>
          <p>Molecular hydrogen, generated through advanced water electrolysis.</p>
        </div>
        <HydrogenPlaceholder label="Water electrolysis producing molecular hydrogen" />
      </section>

      <section className="hydrogen-process">
        <div>
          <p className="hydrogen-kicker">THE TECHNOLOGY</p>
          <h2>From water to<br />hydrogen.</h2>
          <p>Powered by advanced electrolysis technology.</p>
        </div>
        <HydrogenPlaceholder label="Water → electrolysis → H₂ generation → hydrogen-rich water" />
      </section>

      <section className="hydrogen-molecule">
        <p className="hydrogen-kicker">THE MOLECULE</p>
        <h2>Small molecule.<br />Big possibility.</h2>
        <p>The smallest molecule, thoughtfully integrated into water.</p>
        <HydrogenPlaceholder label="Molecular hydrogen integrated into water" />
      </section>

      <section className="hydrogen-life">
        <p className="hydrogen-kicker">FROM TECHNOLOGY TO LIFE</p>
        <h2>Designed for daily hydration.</h2>
        <p>Advanced hydrogen technology, made part of everyday life.</p>
        <div className="hydrogen-life-grid">
          {applications.map((application) => (
            <article key={application.title}>
              <HydrogenPlaceholder label={`${application.title} application`} />
              <div>
                <span>{application.number}</span>
                <h3>{application.title}</h3>
                <p>{application.description}</p>
              </div>
            </article>
          ))}
        </div>
        <Link href="/solutions/health">Explore hydrogen solutions <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
