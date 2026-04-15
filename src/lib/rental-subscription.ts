import { deposits } from "@/lib/pricing";

/** Weekly bin subscription pricing (matches Stripe Checkout line items) */

export const STANDARD_WEEKLY_CENTS = 600;
export const LARGE_WEEKLY_CENTS = 900;
export const DELIVERY_ONE_TIME_CENTS = 4000;
export const PROMO_MIN_BINS = 5;

export type RentalQuantities = {
  standardBins: number;
  largeCrates: number;
};

export function totalBins(q: RentalQuantities): number {
  return Math.max(0, q.standardBins) + Math.max(0, q.largeCrates);
}

/** Recurring amount per week in cents */
export function weeklySubscriptionCents(q: RentalQuantities): number {
  const s = Math.max(0, Math.floor(q.standardBins));
  const l = Math.max(0, Math.floor(q.largeCrates));
  return s * STANDARD_WEEKLY_CENTS + l * LARGE_WEEKLY_CENTS;
}

/** One-time delivery: $40 unless 5+ total bins */
export function deliveryCentsForBins(total: number): number {
  return total >= PROMO_MIN_BINS ? 0 : DELIVERY_ONE_TIME_CENTS;
}

export function validateQuantities(q: RentalQuantities): string | null {
  const s = Math.max(0, Math.floor(Number(q.standardBins)));
  const l = Math.max(0, Math.floor(Number(q.largeCrates)));
  if (s + l < 1) return "Select at least one bin.";
  if (s > 50 || l > 50) return "Please contact us for very large quantities.";
  return null;
}

export function clampQuantities(q: RentalQuantities): RentalQuantities {
  return {
    standardBins: Math.min(50, Math.max(0, Math.floor(Number(q.standardBins)))),
    largeCrates: Math.min(50, Math.max(0, Math.floor(Number(q.largeCrates)))),
  };
}

/** One-time refundable security deposits (charged on first Checkout invoice). */
export function depositTotalCents(q: RentalQuantities): number {
  const s = Math.max(0, Math.floor(q.standardBins));
  const l = Math.max(0, Math.floor(q.largeCrates));
  return s * deposits.standardBinCents + l * deposits.largeCrateCents;
}
