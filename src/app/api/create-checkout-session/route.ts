import { NextResponse } from "next/server";

import { getClientIp, rateLimitSlidingWindow } from "@/lib/rate-limit";
import {
  clampQuantities,
  deliveryCentsForBins,
  LARGE_WEEKLY_CENTS,
  STANDARD_WEEKLY_CENTS,
  totalBins,
  validateQuantities,
} from "@/lib/rental-subscription";
import { getStripe } from "@/lib/stripe-server";
import type Stripe from "stripe";

function getOrigin(req: Request): string {
  const fromHeader = req.headers.get("origin");
  if (fromHeader) return fromHeader.replace(/\/$/, "");
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (env) return env.replace(/\/$/, "");
  return "http://localhost:3000";
}

const priceIdStandard = process.env.STRIPE_PRICE_STANDARD_WEEKLY?.trim();
const priceIdLarge = process.env.STRIPE_PRICE_LARGE_WEEKLY?.trim();
/** Optional: existing Dashboard product IDs (use with price_data so subscriptions attach to prod_*) */
const productIdStandard = process.env.STRIPE_PRODUCT_STANDARD_ID?.trim();
const productIdLarge = process.env.STRIPE_PRODUCT_LARGE_ID?.trim();

const CHECKOUT_RATE_LIMIT = 20;
const CHECKOUT_WINDOW_MS = 60_000;

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to your environment." },
      { status: 503 }
    );
  }

  const ip = getClientIp(req);
  const limited = rateLimitSlidingWindow(`checkout:${ip}`, CHECKOUT_RATE_LIMIT, CHECKOUT_WINDOW_MS);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many checkout attempts. Try again in a moment." },
      {
        status: 429,
        headers: limited.retryAfterSec
          ? { "Retry-After": String(limited.retryAfterSec) }
          : undefined,
      }
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (typeof raw !== "object" || raw === null) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;
  const q = clampQuantities({
    standardBins: typeof body.standardBins === "number" ? body.standardBins : 0,
    largeCrates: typeof body.largeCrates === "number" ? body.largeCrates : 0,
  });

  const err = validateQuantities(q);
  if (err) return NextResponse.json({ error: err }, { status: 400 });

  const bins = totalBins(q);
  const deliveryCents = deliveryCentsForBins(bins);
  const freeDelivery = deliveryCents === 0;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  if (q.standardBins > 0) {
    if (priceIdStandard) {
      lineItems.push({ price: priceIdStandard, quantity: q.standardBins });
    } else {
      lineItems.push({
        quantity: q.standardBins,
        price_data: {
          currency: "usd",
          unit_amount: STANDARD_WEEKLY_CENTS,
          recurring: { interval: "week" },
          ...(productIdStandard
            ? { product: productIdStandard }
            : {
                product_data: {
                  name: "Standard bin rental",
                  description: "27-gallon Sterilite · billed weekly per bin",
                },
              }),
        },
      });
    }
  }

  if (q.largeCrates > 0) {
    if (priceIdLarge) {
      lineItems.push({ price: priceIdLarge, quantity: q.largeCrates });
    } else {
      lineItems.push({
        quantity: q.largeCrates,
        price_data: {
          currency: "usd",
          unit_amount: LARGE_WEEKLY_CENTS,
          recurring: { interval: "week" },
          ...(productIdLarge
            ? { product: productIdLarge }
            : {
                product_data: {
                  name: "Large crate rental",
                  description: "Industrial large crate · billed weekly per crate",
                },
              }),
        },
      });
    }
  }

  if (deliveryCents > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: deliveryCents,
        product_data: {
          name: "Delivery & pickup (Koreatown)",
          description: "One-time round-trip — waived when you rent 5+ bins",
        },
      },
    });
  }

  const origin = getOrigin(req);
  const metaBins = {
    standard_bins: String(q.standardBins),
    large_crates: String(q.largeCrates),
    total_bins: String(bins),
    free_delivery: freeDelivery ? "true" : "false",
    promotion: freeDelivery ? "5_plus_bins_free_delivery" : "none",
  };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: lineItems,
      success_url: `${origin}/rental/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/rental`,
      metadata: metaBins,
      subscription_data: {
        metadata: metaBins,
        description: `Bear Box Rentals: ${bins} bin(s) weekly`,
      },
      phone_number_collection: { enabled: true },
      billing_address_collection: "required",
      allow_promotion_codes: false,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[create-checkout-session]", e);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 }
    );
  }
}
