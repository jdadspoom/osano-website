export type NavigationItem = {
  label: string;
  href: string;
};

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Community", href: "/community" },
  { label: "Stories", href: "/stories" },
  { label: "Technology", href: "/technology" },
  { label: "Contact", href: "/contact" },
];

export const solutionNavigation: NavigationItem[] = [
  { label: "OSANO Health", href: "/solutions/health" },
  { label: "OSANO Hygiene", href: "/solutions/hygiene" },
  { label: "OSANO Pets", href: "/solutions/pets" },
];

export const footerNavigation = {
  Explore: [
    { label: "About OSANO", href: "/about" },
    { label: "Solutions", href: "/solutions" },
    { label: "Technology", href: "/technology" },
    { label: "Stories", href: "/stories" },
  ],
  Worlds: [
    { label: "OSANO Health", href: "/solutions/health" },
    { label: "OSANO Hygiene", href: "/solutions/hygiene" },
    { label: "OSANO Pets", href: "/solutions/pets" },
  ],
} satisfies Record<string, NavigationItem[]>;
