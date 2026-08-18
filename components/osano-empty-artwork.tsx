type Props = {
  label: string;
  tone?: "health" | "hygiene" | "pets" | "technology" | "neutral";
  kind?: "image" | "video" | "product";
};

export function OsanoEmptyArtwork({ label, tone = "neutral", kind = "image" }: Props) {
  return (
    <div className="osano-empty-artwork" data-tone={tone} data-kind={kind} role="img" aria-label={`${label}. Visual coming soon.`}>
      <span className="osano-empty-artwork__glow" aria-hidden="true" />
      <span className="osano-empty-artwork__orbit osano-empty-artwork__orbit--outer" aria-hidden="true" />
      <span className="osano-empty-artwork__orbit osano-empty-artwork__orbit--inner" aria-hidden="true" />
      {kind === "video" && <span className="osano-empty-artwork__play" aria-hidden="true" />}
      <span className="osano-empty-artwork__copy"><small>OSANO PREVIEW</small><strong>{label}</strong><em>Visual coming soon</em></span>
    </div>
  );
}
