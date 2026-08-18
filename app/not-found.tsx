import Link from "next/link";

export default function NotFound() {
  return (
    <section className="osano-system-state not-found">
      <div className="osano-system-state__art" aria-hidden="true"><i /><i /></div>
      <div className="osano-system-state__copy">
        <p className="eyebrow">404 — A QUIET DETOUR</p>
        <h1>This path has not been designed yet.</h1>
        <p>Return home or continue through OSANO’s health, hygiene and pet-care worlds.</p>
        <div className="hero-actions"><Link href="/" className="button button-primary">Return home</Link><Link href="/solutions" className="text-link">Explore solutions&nbsp; →</Link></div>
      </div>
    </section>
  );
}
