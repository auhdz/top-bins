export const site = {
  name: "Top Bins",
  tagline: "Heavy-duty bin & crate rental",
  description:
    "Rent stackable commercial-grade plastic storage bins and crates for moving, job sites, events, and on-site organization—with delivery and pickup.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "(555) 014-2200",
  email: "hello@topbins.example",
  serviceArea: "Greater Metro & surrounding counties",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
