import type { Metadata } from "next";
import Link from "next/link";

import { payNowLinkProps, site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About us",
  description: `Mission, service area, and values behind ${site.name}.`,
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-muted/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Built for moves, sites, and seasons that don&apos;t wait
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            We focus on durable equipment and predictable logistics so you can focus on the job, not
            sourcing boxes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-10 px-4 py-14 sm:px-6 sm:py-20">
        <div>
          <h2 className="font-heading text-2xl font-semibold">Our story</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {site.name} exists to make temporary storage simpler. Households and crews often lose time
            and money to single-use cardboard or flimsy totes. Our rental fleet uses{" "}
            <strong className="text-foreground">
              heavy-duty plastic bins and crates (the kind you recognize from serious moves)
            </strong>
            , so you get durability without the clutter of ownership.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We pair that equipment with <strong className="text-foreground">delivery and pickup</strong>{" "}
            because day-one logistics should not be your problem.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-semibold">What we believe</h2>
          <ul className="mt-4 space-y-4">
            <li className="flex gap-3">
              <span
                className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              <div>
                <p className="font-medium text-foreground">Reuse beats waste</p>
                <p className="text-sm text-muted-foreground">
                  Rental keeps quality equipment in circulation longer than one-off disposables.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span
                className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              <div>
                <p className="font-medium text-foreground">Clarity builds trust</p>
                <p className="text-sm text-muted-foreground">
                  Honest pricing, clear rental periods, and responsive support.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span
                className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              <div>
                <p className="font-medium text-foreground">Show up</p>
                <p className="text-sm text-muted-foreground">
                  On-time delivery and predictable pickup windows matter as much as the bins
                  themselves.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-muted/40 p-6">
          <h3 className="font-heading text-lg font-semibold">Service area</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong className="text-foreground">{site.serviceArea}</strong>. For commercial routes or
            expansion notifications, call{" "}
            <a
              href={`tel:${site.phoneTel}`}
              className="font-medium text-foreground underline underline-offset-4"
            >
              {site.phone}
            </a>
            .
          </p>
        </div>

        <Link {...payNowLinkProps()} className={cn(buttonVariants({ size: "lg" }))}>
          Rent Now
        </Link>
      </section>
    </div>
  );
}
