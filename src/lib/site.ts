export const site = {
  name: "Bear Box Moving Co",
  /** Visible next to the logo in the header so the offer is clear when the mark reads small */
  headerWordmark: "Box Rentals",
  /** Wordmark lockup (bear silhouette, BEAR cutout, BOX RENTALS) — black on transparent */
  logoSrc: "/brand/bear-box-rentals-logo.png",
  logoAlt:
    "Bear Box Moving Co logo: bear silhouette with BEAR and BOX RENTALS wordmark",
  /** Shown under “Box Rentals” in the header only */
  tagline: "Koreatown LA",
  description:
    "Heavy-duty Sterilite bins delivered and picked up—moving, storage, and job sites in Koreatown.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "(555) 014-2200",
  email: "hello@bearboxmoving.example",
  serviceArea: "Koreatown, Los Angeles",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#checkout", label: "Pricing" },
  { href: "/legal/renter-agreement", label: "Renter agreement" },
  { href: "/contact", label: "Contact" },
] as const;
