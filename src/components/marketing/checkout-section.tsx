"use client";

import Link from "next/link";
import { useId, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  delivery,
  deposits,
  fullFleetBundle,
  weeklyRates,
} from "@/lib/pricing";

export function CheckoutSection() {
  const [agreed, setAgreed] = useState(false);
  const checkboxId = useId();

  return (
    <section
      id="checkout"
      className="scroll-mt-20 border-t border-border bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pricing & checkout
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Simple weekly rates
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Koreatown delivery. Rent all five bins (Full Fleet) for free round-trip delivery &
          pickup.
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-border shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/80 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Bin type</th>
                <th className="px-4 py-3 font-medium">Per week</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Deposit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              <tr>
                <td className="px-4 py-4">
                  <span className="font-medium text-foreground">Standard 27-gal bin</span>
                </td>
                <td className="px-4 py-4 font-heading font-semibold tabular-nums">
                  ${(weeklyRates.standardBinCents / 100).toFixed(2)}
                </td>
                <td className="hidden px-4 py-4 tabular-nums text-muted-foreground sm:table-cell">
                  ${(deposits.standardBinCents / 100).toFixed(2)} refundable
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4">
                  <span className="font-medium text-foreground">Large industrial crate</span>
                </td>
                <td className="px-4 py-4 font-heading font-semibold tabular-nums">
                  ${(weeklyRates.largeCrateCents / 100).toFixed(2)}
                </td>
                <td className="hidden px-4 py-4 tabular-nums text-muted-foreground sm:table-cell">
                  ${(deposits.largeCrateCents / 100).toFixed(2)} refundable
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            {fullFleetBundle.label}: 5 bins → free delivery
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Rent all <strong className="text-foreground">{fullFleetBundle.standardCount} standard</strong>{" "}
            + <strong className="text-foreground">{fullFleetBundle.largeCount} large</strong> (our full
            inventory) and get{" "}
            <strong className="text-foreground">free round-trip delivery & pickup</strong> in
            Koreatown. Example: <strong className="text-foreground">2 weeks</strong> for all five ={" "}
            <strong className="text-foreground">
              ${(fullFleetBundle.twoWeekTotalCents / 100).toFixed(2)}
            </strong>
            . Additional weeks +${(fullFleetBundle.additionalWeekCents / 100).toFixed(2)}.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Otherwise, Koreatown delivery & pickup is{" "}
            <strong className="text-foreground">
              ${(delivery.koreatownRoundTripCents / 100).toFixed(2)}
            </strong>{" "}
            round-trip.
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-muted/30 p-6">
          <div className="flex gap-3">
            <input
              id={checkboxId}
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 size-4 shrink-0 rounded border-border accent-zinc-900"
            />
            <label htmlFor={checkboxId} className="text-sm leading-relaxed text-foreground">
              I agree to the{" "}
              <Link
                href="/legal/renter-agreement"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Renter Agreement
              </Link>{" "}
              and policies.
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {agreed ? (
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "min-w-[12rem] justify-center"
                )}
              >
                Rent Today
              </Link>
            ) : (
              <span
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "pointer-events-none min-w-[12rem] justify-center opacity-50"
                )}
                aria-disabled
              >
                Rent Today
              </span>
            )}
            <p className="w-full text-xs text-muted-foreground sm:mt-0 sm:inline sm:w-auto sm:self-center">
              Check the box above to continue—full terms are on the Renter Agreement page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
