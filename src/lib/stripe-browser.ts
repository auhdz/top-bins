"use client";

import { loadStripe, type Stripe } from "@stripe/stripe-js";

/**
 * Stripe.js in the browser. Optional for this app: one-time payments use
 * hosted Stripe Checkout via `POST /api/create-checkout-session` (server `stripe` package).
 *
 * Use this when you add Payment Element, Link, Apple Pay on the web, etc.
 * Requires `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
 */
export function loadStripeBrowser(): Promise<Stripe | null> {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim();
  if (!key) return Promise.resolve(null);
  return loadStripe(key);
}
