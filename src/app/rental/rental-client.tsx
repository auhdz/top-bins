"use client";

import { Minus, Plus, Truck } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { deposits } from "@/lib/pricing";
import {
  DELIVERY_PICKUP_WINDOWS,
  type DeliveryPickupWindowValue,
} from "@/lib/rental-scheduling";
import {
  DELIVERY_ONE_TIME_CENTS,
  LARGE_WEEKLY_CENTS,
  PROMO_MIN_BINS,
  STANDARD_WEEKLY_CENTS,
  deliveryCentsForBins,
  depositTotalCents,
  totalBins,
  weeklySubscriptionCents,
} from "@/lib/rental-subscription";
import { cn } from "@/lib/utils";

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

const selectClass =
  "flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

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
  const [deliveryWindow, setDeliveryWindow] = useState<DeliveryPickupWindowValue>(
    DELIVERY_PICKUP_WINDOWS[0]!.value
  );
  const [pickupWindow, setPickupWindow] = useState<DeliveryPickupWindowValue>(
    DELIVERY_PICKUP_WINDOWS[0]!.value
  );
  const [scheduleNotes, setScheduleNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const q = useMemo(() => ({ standardBins, largeCrates }), [standardBins, largeCrates]);

  const weeklyCents = useMemo(() => weeklySubscriptionCents(q), [q]);
  const bins = useMemo(() => totalBins(q), [q]);
  const deliveryCents = useMemo(() => deliveryCentsForBins(bins), [bins]);
  const depositCents = useMemo(() => depositTotalCents(q), [q]);
  const qualifiesPromo = bins >= PROMO_MIN_BINS;

  const firstInvoiceSubtotalCents = useMemo(
    () => weeklyCents + deliveryCents + depositCents,
    [weeklyCents, deliveryCents, depositCents]
  );

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
        body: JSON.stringify({
          standardBins,
          largeCrates,
          deliveryWindow,
          pickupWindow,
          scheduleNotes: scheduleNotes.trim() || undefined,
        }),
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
        Build your rental: quantities, refundable deposits, delivery &amp; pickup windows, then pay securely on
        Stripe. Taxes (if applicable) are calculated at checkout from your billing address.
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
          sub={`${formatMoney(STANDARD_WEEKLY_CENTS)} each / week · ${formatMoney(deposits.standardBinCents)} deposit each`}
          value={standardBins}
          onChange={setStandardBins}
          disabled={isPending}
        />
        <QtyRow
          label="Large crates"
          sub={`${formatMoney(LARGE_WEEKLY_CENTS)} each / week · ${formatMoney(deposits.largeCrateCents)} deposit each`}
          value={largeCrates}
          onChange={setLargeCrates}
          disabled={isPending}
        />
      </div>

      <div className="mt-10 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-foreground">Delivery &amp; pickup windows</h2>
        <p className="text-sm text-muted-foreground">
          Choose preferred times in Koreatown. We&apos;ll confirm exact timing after checkout.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="delivery-window">Delivery window</Label>
            <select
              id="delivery-window"
              className={selectClass}
              value={deliveryWindow}
              onChange={(e) => setDeliveryWindow(e.target.value as DeliveryPickupWindowValue)}
              disabled={isPending}
            >
              {DELIVERY_PICKUP_WINDOWS.map((w) => (
                <option key={w.value} value={w.value}>
                  {w.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pickup-window">Pickup window</Label>
            <select
              id="pickup-window"
              className={selectClass}
              value={pickupWindow}
              onChange={(e) => setPickupWindow(e.target.value as DeliveryPickupWindowValue)}
              disabled={isPending}
            >
              {DELIVERY_PICKUP_WINDOWS.map((w) => (
                <option key={w.value} value={w.value}>
                  {w.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="schedule-notes">Scheduling notes (optional)</Label>
          <Textarea
            id="schedule-notes"
            placeholder="Building access, gate codes, or timing constraints…"
            value={scheduleNotes}
            onChange={(e) => setScheduleNotes(e.target.value)}
            disabled={isPending}
            maxLength={500}
            rows={3}
            className="min-h-[5rem] resize-y"
          />
          <p className="text-xs text-muted-foreground">{scheduleNotes.length}/500</p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          First checkout estimate
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Your first Stripe invoice includes the items below. Ongoing rent bills weekly after that.
        </p>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Weekly rent (first period)</dt>
            <dd className="font-heading font-semibold tabular-nums text-foreground">{formatMoney(weeklyCents)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Delivery &amp; pickup (one-time)</dt>
            <dd
              className={cn(
                "font-heading font-semibold tabular-nums",
                deliveryCents === 0 ? "text-primary" : "text-foreground"
              )}
            >
              {deliveryCents === 0 ? "FREE" : formatMoney(deliveryCents)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Refundable security deposits (one-time)</dt>
            <dd className="font-heading font-semibold tabular-nums text-foreground">{formatMoney(depositCents)}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-border pt-3">
            <dt className="text-muted-foreground">Sales tax</dt>
            <dd className="text-right text-muted-foreground">
              Calculated at Stripe Checkout from your billing address
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-border pt-3">
            <dt className="font-medium text-foreground">Subtotal before tax</dt>
            <dd className="font-heading text-xl font-semibold tabular-nums text-foreground">
              {formatMoney(firstInvoiceSubtotalCents)}
            </dd>
          </div>
        </dl>
      </div>

      {error ? (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200" role="alert">
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
