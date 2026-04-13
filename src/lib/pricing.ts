/** Public catalog rates (product cards, legal copy). Subscription checkout uses `rental-subscription.ts`. */

export const weeklyRates = {
  standardBinCents: 600,
  largeCrateCents: 900,
} as const;

export const deposits = {
  standardBinCents: 1500,
  largeCrateCents: 2500,
} as const;

export const delivery = {
  koreatownRoundTripCents: 4000,
} as const;
