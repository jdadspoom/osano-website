import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found shell">
      <p className="eyebrow">404 — Page not found</p>
      <h1>This path doesn’t lead to an approved OSANO page.</h1>
      <p>Return to the OSANO home page or explore our published solution worlds.</p>
      <div className="hero-actions"><Link href="/" className="button button-primary">Return home</Link><Link href="/solutions" className="text-link">Explore solutions ↗</Link></div>
    </section>
  );
}
