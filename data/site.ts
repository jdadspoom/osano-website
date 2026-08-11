export const siteConfig = {
  name: "OSANO",
  statement:
    "Innovation designed for better everyday living.Across health, hygiene, and life with pets",
  shortStatement: "Technology in step with everyday life.",
  defaultDescription:
    "Discover OSANO solutions connecting purposeful technology with healthier, cleaner and more considered everyday living.",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002",
  contact: {
    email: "hello@osano.com",
    phone: "+66 (0) 00 000 0000",
    address: "Bangkok, Thailand",
  },
  primaryCta: { label: "Find Your Solution", href: "/solutions" },
  secondaryCta: {
    label: "Request a Consultation",
    href: "/contact",
  },
  logo: "/brand/OSANO_Master_Logo_Black.svg",
  socialImage: "/brand/OSANO_Master_Logo.png",
} as const;

export const absoluteUrl = (path: string) =>
  new URL(path, siteConfig.baseUrl).toString();
