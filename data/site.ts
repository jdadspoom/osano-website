export const siteConfig = {
  name: "OSANO",
  statement:
    "Innovation designed for better everyday living. Across health, hygiene and life with pets.",
  shortStatement: "Technology in step with everyday life.",
  defaultDescription:
    "Discover OSANO solutions connecting purposeful technology with healthier, cleaner and more considered everyday living.",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002",
  contact: {
    email: "jdproduct2020@gmail.com",
    phone: "02-952-5414",
    salesPhone: "066-125-6694",
    customerServicePhone: "089-458-5177",
    line: "@osano",
    lineUrl: "https://line.me/R/ti/p/@osano",
    facebookUrl: "https://www.facebook.com/share/1ETv9gkpym/?mibextid=wwXIfr",
    instagramUrl: "https://www.instagram.com/osano_official",
    tiktokUrl: "https://www.tiktok.com/@osanofficial?_r=1&_t=ZS-98q3PC8YLGn",
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
