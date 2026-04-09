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
    name: "Standard bin",
    tagline: "Everyday moves & rooms",
    description:
      "Our go-to rental for clothes, garage items, and replacing cardboard. Integrated handles, stable stack, and a secure yellow lid.",
    dimensions: '27" × 17" × 12"',
    capacity: "~3.5 cu ft · stacks 4+ high",
    features: ["Yellow secure lid", "Stackable", "Commercial-grade plastic"],
    priceLabel: "from $4.50 / week",
    priceCents: 450,
    depositCents: 1500,
    imageQuery: "plastic+storage+bin",
  },
  {
    slug: "large-crate",
    name: "Large crate",
    tagline: "Bulky gear & job sites",
    description:
      "Extra depth for tools, event supplies, and heavier loads within safe limits. Reinforced corners for demanding daily use.",
    dimensions: '31" × 19" × 15"',
    capacity: "~5.5 cu ft · job-site tough",
    features: ["High stack stability", "Reinforced corners", "Easy to label"],
    priceLabel: "from $6.75 / week",
    priceCents: 675,
    depositCents: 2000,
    imageQuery: "industrial+crate",
  },
  {
    slug: "contractor-bundle",
    name: "Contractor bundle",
    tagline: "Volume & recurring sites",
    description:
      "Multiple large crates plus scheduled delivery and pickup windows—ideal for crews that need predictable counts on repeat visits.",
    dimensions: "Custom mix",
    capacity: "Quoted to your scope",
    features: ["Volume pricing", "Recurring routes", "Add-ons: pads & locks"],
    priceLabel: "Custom quote",
    priceCents: 0,
    depositCents: 0,
    imageQuery: "construction+storage",
  },
];

export const accessories = [
  {
    name: "Moving pads & blankets",
    blurb: "Protect furniture and fragile items during transport.",
  },
  {
    name: "Compatible locks",
    blurb: "Secure lids for unattended staging areas.",
  },
  {
    name: "Cleaning kits",
    blurb: "Spray, microfiber, sponges—move-out ready.",
  },
];
