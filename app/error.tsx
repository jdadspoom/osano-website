"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="osano-system-state" role="alert">
      <div className="osano-system-state__art" aria-hidden="true"><i /><i /></div>
      <div className="osano-system-state__copy">
        <p className="eyebrow">A MOMENTARY PAUSE</p>
        <h1>Something interrupted the experience.</h1>
        <p>Please try again. If the issue continues, you can return home and continue exploring OSANO.</p>
        <div className="hero-actions">
          <button type="button" className="button button-primary" onClick={retry}>Try again</button>
          <Link href="/" className="text-link">Return home&nbsp; →</Link>
        </div>
      </div>
    </section>
  );
}
