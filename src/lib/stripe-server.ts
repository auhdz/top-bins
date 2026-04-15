import Stripe from "stripe";

/** Keep in sync with API routes using Stripe. */
export const STRIPE_API_VERSION = "2025-02-24.acacia" as const;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key, { apiVersion: STRIPE_API_VERSION });
}
