import { deposits, weeklyRates } from "@/lib/pricing";

export type ProductCard = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  dimensions: string;
  capacity: string;
  features: string[];
  priceLabel: string;
  priceCents: number;
  depositCents: number;
  imageQuery?: string;
};

export const products: ProductCard[] = [
  {
    slug: "standard-bin",
    name: "Standard 27-gallon bin",
    tagline: "Everyday moves & rooms",
    description:
      "Sterilite Industrial heavy-duty tote (black with yellow lid). Integrated handles, stable stack, secure lid.",
    dimensions: '30½" L × 20⅝" W × 15¼" H',
    capacity: "27 gal · stackable",
    features: ["Yellow secure lid", "Stackable", "Commercial-grade plastic"],
    priceLabel: `$${(weeklyRates.standardBinCents / 100).toFixed(2)} / week`,
    priceCents: weeklyRates.standardBinCents,
    depositCents: deposits.standardBinCents,
    imageQuery: "plastic+storage+bin",
  },
  {
    slug: "large-crate",
    name: "Large industrial crate",
    tagline: "Bulky gear & more",
    description:
      "Extra capacity Sterilite Industrial crate for bulky items, tools, or equipment.",
    dimensions: "See rental agreement for specs",
    capacity: "Large format",
    features: ["High capacity", "Rugged build", "Same weekly billing as bins"],
    priceLabel: `$${(weeklyRates.largeCrateCents / 100).toFixed(2)} / week`,
    priceCents: weeklyRates.largeCrateCents,
    depositCents: deposits.largeCrateCents,
    imageQuery: "industrial+crate",
  },
];

/** Optional add-ons for catalog page; keep empty if not offering on web */
export const accessories: { name: string; blurb: string }[] = [];
