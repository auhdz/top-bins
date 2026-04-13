/** Public pricing aligned with content/legal/finances-customer.md and renter agreement */

export const weeklyRates = {
  standardBinCents: 600,
  largeCrateCents: 900,
} as const;

export const deposits = {
  standardBinCents: 1500,
  largeCrateCents: 2500,
} as const;

export const delivery = {
  /** Koreatown round-trip when not on Full Fleet Bundle */
  koreatownRoundTripCents: 4000,
} as const;

export const fullFleetBundle = {
  /** 4 standard + 1 large, 2 weeks */
  label: "Full Fleet Bundle",
  standardCount: 4,
  largeCount: 1,
  twoWeekTotalCents: 19800,
  /** Each additional week on bundle (per agreement) */
  additionalWeekCents: 3300,
  /** Free delivery & pickup in Koreatown when renting all 5 bins */
  freeDeliveryInKoreatown: true,
} as const;
