import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/images/**", search: "" },
      {
        pathname: "/images/solutions/health/health-oxygen.png",
        search: "?v=20260814",
      },
    ],
  },
};

export default nextConfig;
