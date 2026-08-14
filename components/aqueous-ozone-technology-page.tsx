import Image from "next/image";
import Link from "next/link";

const applications = [
  { number: "01", title: "HOME", description: "Everyday hygiene" },
  { number: "02", title: "PROFESSIONAL", description: "Clinics & care" },
  { number: "03", title: "FOOD", description: "Food environments" },
  { number: "04", title: "INDUSTRY", description: "Operational hygiene" },
];

function OzonePlaceholder({ label }: { label: string }) {
  return <div className="ozone-placeholder" role="img" aria-label={`${label} image placeholder`}><span>IMAGE PLACEHOLDER</span><small>{label}</small></div>;
}

export function AqueousOzoneTechnologyPage() {
  return (
    <main className="ozone-page">
      <section className="ozone-hero">
        <div className="ozone-hero-copy">
          <p className="ozone-kicker">AQUEOUS OZONE TECHNOLOGY</p>
          <h1>Water<br />activated</h1>
          <p>Aqueous ozone generated directly in water, when and where it&apos;s needed.</p>
          <a href="#ozone-applications">Explore applications <span aria-hidden="true">→</span></a>
        </div>
        <div className="ozone-hero-image">
          <Image src="/images/technology/aqueous-ozone/ozone-hero.png" alt="Activated water flowing into a clear glass" fill priority sizes="(max-width: 760px) 100vw, 54vw" />
        </div>
      </section>

      <section className="ozone-technology">
        <p className="ozone-kicker">THE TECHNOLOGY</p>
        <h2>From water to aqueous ozone.</h2>
        <p>Powered by advanced electrolysis technology.</p>
        <OzonePlaceholder label="Water → electrolysis → ozone generation → ozone-infused water" />
      </section>

      <section className="ozone-difference">
        <p className="ozone-kicker">THE DIFFERENCE</p>
        <h2>Powerful in action.<br />Simple after.</h2>
        <p>Aqueous ozone works in water, then naturally returns to oxygen.</p>
        <OzonePlaceholder label="O₃ in water → contact → oxidation → O₂ return" />
      </section>

      <section className="ozone-life" id="ozone-applications">
        <p className="ozone-kicker">FROM TECHNOLOGY TO LIFE</p>
        <h2>Clean technology.<br />Built into life.</h2>
        <p>From everyday spaces to professional environments.</p>
        <div className="ozone-life-grid">
          {applications.map((application) => (
            <article key={application.title}>
              <OzonePlaceholder label={`${application.title} application`} />
              <div>
                <span>{application.number}</span>
                <h3>{application.title}</h3>
                <p>{application.description}</p>
              </div>
            </article>
          ))}
        </div>
        <Link href="/solutions/hygiene">Explore hygiene solutions <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
