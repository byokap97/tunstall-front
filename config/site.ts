export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Tunstall front",
  description: "Un proyecto de Next.js con NextUI y GraphQL",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Menu",
      href: "/menu",
    },
    {
      label: "Mesas",
      href: "/tables",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Menu",
      href: "/menu",
    },
    {
      label: "Mesas",
      href: "/tables",
    },
  ],
  links: {
    github: "https://github.com/byokap97",
  },
};
