export default function Loading() {
  return (
    <section className="osano-loading" aria-label="Loading page" aria-live="polite">
      <div className="osano-loading__mark" aria-hidden="true">
        <span />
        <span />
      </div>
      <p>Preparing your OSANO experience</p>
      <div className="osano-loading__line" aria-hidden="true"><i /></div>
    </section>
  );
}
