"use client";

import { Minus, Plus, Truck } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  DELIVERY_ONE_TIME_CENTS,
  LARGE_WEEKLY_CENTS,
  PROMO_MIN_BINS,
  STANDARD_WEEKLY_CENTS,
  deliveryCentsForBins,
  totalBins,
  weeklySubscriptionCents,
} from "@/lib/rental-subscription";
import { cn } from "@/lib/utils";

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function QtyRow({
  label,
  sub,
  value,
  onChange,
  disabled,
}: {
  label: string;
  sub: string;
  value: number;
  onChange: (n: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{sub}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={disabled || value <= 0}
          onClick={() => onChange(Math.max(0, value - 1))}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "size-10 shrink-0 rounded-full"
          )}
          aria-label="Decrease quantity"
        >
          <Minus className="size-4" />
        </button>
        <span className="min-w-[2.5rem] text-center font-heading text-xl tabular-nums text-foreground">
          {value}
        </span>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange(value + 1)}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "size-10 shrink-0 rounded-full"
          )}
          aria-label="Increase quantity"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}

export function RentalClient() {
  const [standardBins, setStandardBins] = useState(1);
  const [largeCrates, setLargeCrates] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const weeklyCents = useMemo(
    () => weeklySubscriptionCents({ standardBins, largeCrates }),
    [standardBins, largeCrates]
  );
  const bins = useMemo(() => totalBins({ standardBins, largeCrates }), [standardBins, largeCrates]);
  const deliveryCents = useMemo(() => deliveryCentsForBins(bins), [bins]);
  const qualifiesPromo = bins >= PROMO_MIN_BINS;

  const startCheckout = () => {
    setError(null);
    if (bins < 1) {
      setError("Choose at least one bin to continue.");
      return;
    }
    startTransition(async () => {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ standardBins, largeCrates }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError("No checkout URL returned.");
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        ← Back to home
      </Link>

      <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Rent bins weekly
      </h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Subscribe to weekly bin rentals. Secure checkout opens on Stripe. You can adjust quantities before you pay.
      </p>

      <div
        className={cn(
          "mt-8 flex gap-4 rounded-2xl border p-5 shadow-sm sm:p-6",
          qualifiesPromo
            ? "border-primary/50 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent"
            : "border-border/80 bg-muted/30"
        )}
      >
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-xl",
            qualifiesPromo ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}
        >
          <Truck className="size-6" aria-hidden />
        </div>
        <div>
          <p className="font-heading text-lg font-semibold text-foreground">
            Limited promotion: Buy any {PROMO_MIN_BINS} bins → free delivery
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Add any mix of standard bins and large crates. When your total reaches {PROMO_MIN_BINS}+, the{" "}
            {formatMoney(DELIVERY_ONE_TIME_CENTS)} delivery fee is waived at checkout.
          </p>
          {qualifiesPromo ? (
            <p className="mt-3 text-sm font-medium text-primary">You qualify for free delivery.</p>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              {PROMO_MIN_BINS - bins} more {PROMO_MIN_BINS - bins === 1 ? "bin" : "bins"} to unlock free delivery.
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-foreground">Quantities</h2>
        <QtyRow
          label="Standard bins"
          sub={`${formatMoney(STANDARD_WEEKLY_CENTS)} each / week`}
          value={standardBins}
          onChange={setStandardBins}
          disabled={isPending}
        />
        <QtyRow
          label="Large crates"
          sub={`${formatMoney(LARGE_WEEKLY_CENTS)} each / week`}
          value={largeCrates}
          onChange={setLargeCrates}
          disabled={isPending}
        />
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Estimate
        </h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Subscription (per week)</dt>
            <dd className="font-heading text-lg font-semibold tabular-nums text-foreground">
              {formatMoney(weeklyCents)}
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-border pt-3">
            <dt className="text-muted-foreground">Delivery &amp; pickup (one-time)</dt>
            <dd
              className={cn(
                "font-heading text-lg font-semibold tabular-nums",
                deliveryCents === 0 ? "text-primary" : "text-foreground"
              )}
            >
              {deliveryCents === 0 ? "FREE" : formatMoney(deliveryCents)}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Your first Stripe invoice includes the first week of rent plus any one-time delivery (unless free).
          Future weeks bill automatically at the weekly rate shown.
        </p>
      </div>

      {error ? (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={isPending || bins < 1}
          onClick={startCheckout}
          className={cn(
            buttonVariants({ size: "lg" }),
            "min-w-[12rem] rounded-full px-10 text-base font-semibold"
          )}
        >
          {isPending ? "Opening secure checkout…" : "Rent Now"}
        </button>
        <Link
          href="/legal/renter-agreement"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Renter agreement
        </Link>
      </div>
    </div>
  );
}
