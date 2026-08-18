import Image from "next/image";
import type { MediaPlaceholder as Media } from "@/types/content";

type Props = {
  media: Media;
  tone?: "health" | "hygiene" | "pets" | "technology" | "neutral";
  priority?: boolean;
};

export function MediaPlaceholder({ media, tone = "neutral", priority }: Props) {
  if (media.src && media.kind === "image") {
    return (
      <figure className="media-frame real-media">
        <Image
          src={media.src}
          alt={media.alt ?? media.label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          loading={priority ? "eager" : "lazy"}
        />
      </figure>
    );
  }

  return (
    <figure className="media-frame abstract-media" data-tone={tone}>
      <span className="media-orbit orbit-one" />
      <span className="media-orbit orbit-two" />
      <span className="media-plane" />
      <figcaption>
        <span>{media.kind}</span>
        {media.label}
      </figcaption>
    </figure>
  );
}
