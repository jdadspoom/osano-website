import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OSANO Lifestyle Technology",
    short_name: "OSANO",
    description: "Technology in step with everyday life.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1eb",
    theme_color: "#164d3c",
    icons: [{ src: "/brand/OSANO_Master_Logo.png", sizes: "512x512", type: "image/png" }],
  };
}
