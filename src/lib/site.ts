export const site = {
  name: "Bear Box Rentals",
  /** Visible next to the logo in the header so the offer is clear when the mark reads small */
  headerWordmark: "Box Rentals",
  /** Wordmark lockup (bear silhouette, BEAR cutout, BOX RENTALS); black on transparent */
  logoSrc: "/brand/bear-box-rentals-logo.png",
  logoAlt:
    "Bear Box Rentals logo: bear silhouette with BEAR and BOX RENTALS wordmark",
  /** Shown under “Box Rentals” in the header only */
  tagline: "Koreatown LA",
  description:
    "Heavy-duty Sterilite bins delivered and picked up: moving, storage, and job sites in Koreatown.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Vanity number shown in the UI */
  phone: "818-BOX-RENTAL",
  /** Digits for tel: links (818-269-RENT / 818-269-7368) */
  phoneTel: "8182697368",
  email: "info@bearboxrentals.com",
  serviceArea: "Koreatown, Los Angeles",
} as const;

/** Header: keep minimal; logo links home */
export const headerNav = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#checkout", label: "Pricing" },
] as const;

/** Footer and other full sitemap links */
export const nav = [
  { href: "/", label: "Home" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#checkout", label: "Pricing" },
  { href: "/rental", label: "Rent bins" },
  { href: "/legal/renter-agreement", label: "Renter agreement" },
] as const;

/**
 * Optional override: external URL. When unset, Rent Now CTAs use `/rental` (Stripe subscription checkout).
 */
export const payNowHref = process.env.NEXT_PUBLIC_PAY_NOW_URL?.trim() || "/rental";

/** Use on `<Link>` for Stripe or other hosted checkout (opens new tab when `http`). */
export function payNowLinkProps():
  | { href: string }
  | { href: string; target: "_blank"; rel: "noopener noreferrer" } {
  const href = payNowHref;
  return href.startsWith("http")
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" as const }
    : { href };
}
