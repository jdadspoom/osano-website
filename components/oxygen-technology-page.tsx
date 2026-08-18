import Image from "next/image";
import Link from "next/link";
import { OxygenScrollStory } from "@/components/oxygen-scroll-story";
import { OsanoEmptyArtwork } from "@/components/osano-empty-artwork";

const applications = [
  { number: "01", title: "HOME", description: "Personal wellness" },
  { number: "02", title: "WORK", description: "Modern workspaces" },
  { number: "03", title: "WELLNESS", description: "Well-being spaces" },
];

function OxygenPlaceholder({ label }: { label: string }) {
  return <div className="oxygen-placeholder"><OsanoEmptyArtwork label={label} tone="technology" /></div>;
}

export function OxygenTechnologyPage() {
  return (
    <div className="oxygen-page">
      <section className="oxygen-hero">
        <div className="oxygen-hero-image">
          <Image src="/images/technology/oxygen/oxygen-hero.webp" alt="Oxygen refinement technology chamber" fill loading="eager" sizes="(max-width: 760px) 100vw, 56vw" />
        </div>
        <div className="oxygen-hero-copy">
          <p className="oxygen-kicker">OXYGEN TECHNOLOGY</p>
          <h1>Oxygen<br />refined</h1>
          <p className="oxygen-hero-lead">From ambient air to<br />oxygen-rich air.</p>
          <a href="#oxygen-applications">Explore applications <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <OxygenScrollStory />

      <section className="oxygen-core">
        <p className="oxygen-kicker">THE CORE</p>
        <h2>Selective at the molecular level.</h2>
        <p>Molecular sieve technology separates nitrogen from air, allowing oxygen to pass through.</p>
        <OxygenPlaceholder label="Molecular sieve animation — separate, concentrate, repeat" />
      </section>

      <section className="oxygen-life" id="oxygen-applications">
        <p className="oxygen-kicker">FROM TECHNOLOGY TO LIFE</p>
        <h2>Engineered<br />for everyday living.</h2>
        <p>Molecular sieve technology separates nitrogen from air, allowing oxygen to pass through.</p>
        <div className="oxygen-life-grid">
          {applications.map((application) => (
            <article key={application.title}>
              <OxygenPlaceholder label={`${application.title} application`} />
              <div className="oxygen-life-card-copy">
                <span>{application.number}</span>
                <h3>{application.title}</h3>
                <p>{application.description}</p>
              </div>
            </article>
          ))}
        </div>
        <Link href="/solutions/health">Explore oxygen solutions <span aria-hidden="true">→</span></Link>
      </section>
    </div>
  );
}
