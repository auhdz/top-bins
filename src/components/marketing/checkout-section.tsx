"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DELIVERY_ONE_TIME_CENTS,
  LARGE_WEEKLY_CENTS,
  PROMO_MIN_BINS,
  STANDARD_WEEKLY_CENTS,
} from "@/lib/rental-subscription";
import { delivery, deposits, weeklyRates } from "@/lib/pricing";

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-snug text-muted-foreground">
      <Check
        className="mt-0.5 size-[1.125rem] shrink-0 text-primary"
        strokeWidth={2.5}
        aria-hidden
      />
      <span>{children}</span>
    </li>
  );
}

export function CheckoutSection() {
  const std = weeklyRates.standardBinCents / 100;
  const lrg = weeklyRates.largeCrateCents / 100;
  const depStd = deposits.standardBinCents / 100;
  const depLrg = deposits.largeCrateCents / 100;
  const ship = delivery.koreatownRoundTripCents / 100;

  const cardBase =
    "flex h-full flex-col rounded-2xl border border-border/70 bg-card p-9 shadow-[0_12px_44px_-20px_rgba(15,23,42,0.09)] transition hover:shadow-lg sm:p-10";
  const primaryBtn =
    "inline-flex h-12 w-full items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800";

  return (
    <section
      id="checkout"
      className="scroll-mt-24 border-t border-border/40 bg-muted/20 py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="landing-fade-up landing-delay-11 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Pricing &amp; rent
          </p>
          <h2 className="landing-fade-up landing-delay-11 mt-5 font-heading text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:mt-6 sm:text-4xl lg:text-[2.65rem]">
            Weekly subscriptions in Koreatown
          </h2>
          <p className="landing-fade-up landing-delay-12 mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Pick standard bins and/or large crates. Rent {PROMO_MIN_BINS}+ bins and delivery is free.
          </p>
        </div>

        <div className="landing-fade-up landing-delay-12 mt-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/12 via-primary/5 to-transparent p-8 text-center sm:p-10">
          <p className="font-heading text-lg font-semibold text-foreground sm:text-xl">
            Limited promotion: Buy any {PROMO_MIN_BINS} bins → free delivery
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            Any mix counts toward {PROMO_MIN_BINS}. Otherwise a one-time {DELIVERY_ONE_TIME_CENTS / 100} delivery
            fee applies at checkout.
          </p>
          <Link
            href="/rental"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 inline-flex rounded-full bg-primary px-10 font-semibold text-primary-foreground shadow-sm hover:brightness-95"
            )}
          >
            Rent Now
          </Link>
        </div>

        <div className="landing-fade-up landing-delay-12 mt-12 grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          <div className={cardBase}>
            <div>
              <h3 className="font-heading text-xl font-medium text-foreground">Standard bin</h3>
              <p className="mt-1 text-sm text-muted-foreground">27-gallon Sterilite · weekly subscription</p>
              <div className="mt-8 flex flex-wrap items-baseline gap-1">
                <span className="font-heading text-4xl font-medium tracking-tight text-foreground tabular-nums">
                  ${STANDARD_WEEKLY_CENTS / 100}
                </span>
                <span className="text-sm font-medium text-muted-foreground">/ bin / week</span>
              </div>
            </div>
            <ul className="mt-8 flex flex-1 flex-col gap-3">
              <FeatureItem>Refundable deposit ${depStd} per bin</FeatureItem>
              <FeatureItem>Billed weekly through Stripe</FeatureItem>
            </ul>
            <Link href="/rental" className={cn(primaryBtn, "mt-8 w-full")}>
              Rent Now
            </Link>
          </div>

          <div className={cardBase}>
            <div>
              <h3 className="font-heading text-xl font-medium text-foreground">Large crate</h3>
              <p className="mt-1 text-sm text-muted-foreground">Industrial crate · weekly subscription</p>
              <div className="mt-8 flex flex-wrap items-baseline gap-1">
                <span className="font-heading text-4xl font-medium tracking-tight text-foreground tabular-nums">
                  ${LARGE_WEEKLY_CENTS / 100}
                </span>
                <span className="text-sm font-medium text-muted-foreground">/ crate / week</span>
              </div>
            </div>
            <ul className="mt-8 flex flex-1 flex-col gap-3">
              <FeatureItem>Refundable deposit ${depLrg} per crate</FeatureItem>
              <FeatureItem>Combine with standards on the same checkout</FeatureItem>
            </ul>
            <Link href="/rental" className={cn(primaryBtn, "mt-8 w-full")}>
              Rent Now
            </Link>
          </div>
        </div>

        <p className="landing-fade-up landing-delay-14 mx-auto mt-12 max-w-xl text-center text-sm text-muted-foreground">
          Per-bin rates shown above. Delivery is {ship} round-trip unless you meet the {PROMO_MIN_BINS}-bin
          promotion.
        </p>
      </div>
    </section>
  );
}
