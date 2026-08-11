import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

const supportedImageExtensions = ["png", "webp", "jpg", "jpeg", "avif", "gif", "svg"] as const;

/** Resolve the newest public image sharing a base path, regardless of extension. */
export function resolvePublicImage(publicBasePath: string) {
  const normalizedBase = publicBasePath.replace(/^\/+/, "");
  const candidates = supportedImageExtensions
    .map((extension) => {
      const publicPath = `/${normalizedBase}.${extension}`;
      const filePath = join(process.cwd(), "public", `${normalizedBase}.${extension}`);
      return existsSync(filePath) ? { publicPath, modifiedAt: statSync(filePath).mtimeMs } : null;
    })
    .filter((candidate): candidate is { publicPath: string; modifiedAt: number } => candidate !== null)
    .sort((a, b) => b.modifiedAt - a.modifiedAt);

  if (!candidates[0]) {
    throw new Error(`Missing public image: ${publicBasePath}.{${supportedImageExtensions.join(",")}}`);
  }

  return candidates[0].publicPath;
}
