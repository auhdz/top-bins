import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import Stripe from "stripe";

import { sendSubscriptionStartedEmails } from "@/lib/email/subscription-emails";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe-server";

export const runtime = "nodejs";

type StripeClient = InstanceType<typeof Stripe>;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

function parseBinMetadata(meta: Stripe.Metadata | null | undefined) {
  const m = meta ?? {};
  const standardBins = Number.parseInt(String(m.standard_bins ?? "0"), 10) || 0;
  const largeCrates = Number.parseInt(String(m.large_crates ?? "0"), 10) || 0;
  const totalRaw = Number.parseInt(String(m.total_bins ?? "0"), 10);
  const totalBins =
    totalRaw > 0 ? totalRaw : Math.max(0, standardBins + largeCrates);
  return { standardBins, largeCrates, totalBins };
}

export async function POST(request: Request) {
  if (!webhookSecret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const rawBody = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("[webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    console.warn(
      "[webhook] DATABASE_URL not set — events are not persisted. Configure Postgres for production."
    );
    await handleEventWithoutDatabase(stripe, event);
    return NextResponse.json({ received: true, warning: "no database" });
  }

  try {
    await prisma.stripeWebhookEvent.create({
      data: {
        id: event.id,
        type: event.type,
        livemode: event.livemode,
        apiVersion: event.api_version ?? null,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return NextResponse.json({ received: true, duplicate: true });
    }
    throw e;
  }

  try {
    await dispatchStripeEvent(stripe, event);
  } catch (e) {
    console.error("[webhook] handler error", e);
    try {
      await prisma.stripeWebhookEvent.delete({ where: { id: event.id } });
    } catch {
      /* ignore */
    }
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function dispatchStripeEvent(stripe: StripeClient, event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed":
      await onCheckoutSessionCompleted(stripe, event.data.object as Stripe.Checkout.Session);
      break;
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await onSubscriptionLifecycle(sub);
      break;
    }
    default:
      break;
  }
}

async function onCheckoutSessionCompleted(stripe: StripeClient, session: Stripe.Checkout.Session) {
  if (session.mode !== "subscription") return;

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;
  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id;

  if (!subscriptionId || !customerId) {
    console.warn("[webhook] checkout.session.completed missing subscription or customer");
    return;
  }

  const sub = await stripe.subscriptions.retrieve(subscriptionId);
  const { standardBins, largeCrates, totalBins } = parseBinMetadata(
    sub.metadata && Object.keys(sub.metadata).length > 0 ? sub.metadata : session.metadata
  );

  const email = session.customer_details?.email ?? session.customer_email ?? null;

  await prisma.rentalSubscription.create({
    data: {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      stripeCheckoutSessionId: session.id,
      customerEmail: email,
      standardBins,
      largeCrates,
      totalBins,
      status: sub.status,
    },
  });

  await sendSubscriptionStartedEmails({
    customerEmail: email,
    standardBins,
    largeCrates,
    totalBins,
    stripeSubscriptionId: subscriptionId,
  });
}

async function onSubscriptionLifecycle(sub: Stripe.Subscription) {
  await prisma.rentalSubscription.updateMany({
    where: { stripeSubscriptionId: sub.id },
    data: { status: sub.status },
  });
}

async function handleEventWithoutDatabase(stripe: StripeClient, event: Stripe.Event) {
  if (event.type !== "checkout.session.completed") return;

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.mode !== "subscription") return;

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;
  if (!subscriptionId) return;

  const sub = await stripe.subscriptions.retrieve(subscriptionId);
  const { standardBins, largeCrates, totalBins } = parseBinMetadata(
    sub.metadata && Object.keys(sub.metadata).length > 0 ? sub.metadata : session.metadata
  );
  const email = session.customer_details?.email ?? session.customer_email ?? null;

  await sendSubscriptionStartedEmails({
    customerEmail: email,
    standardBins,
    largeCrates,
    totalBins,
    stripeSubscriptionId: subscriptionId,
  });
}
