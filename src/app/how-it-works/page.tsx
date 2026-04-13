import type { Metadata } from "next";
import Link from "next/link";

import { payNowLinkProps, site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How it works",
  description: `Delivery, rental use, and pickup for ${site.name}. Clear timelines and extension options.`,
};

export default function HowItWorksPage() {
  return (
    <div>
      <section className="border-b border-border bg-muted/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Simple rental. Clear timelines.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Know what happens from the first delivery to final pickup, with no logistics jargon.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-12 px-4 py-14 sm:px-6 sm:py-20">
        <article>
          <h2 className="font-heading text-2xl font-semibold">1. Schedule delivery</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Tell us how many bins or crates you need, your address, and preferred delivery window.
            We confirm availability and send an order summary. For larger or commercial jobs, we may
            coordinate by phone or email.
          </p>
        </article>
        <article>
          <h2 className="font-heading text-2xl font-semibold">2. Pack and use</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Fill your bins within the rental period. Stack them safely; keep weight within the limits
            on your confirmation. Label bins by room for faster unloading. Add locks or padding if you
            selected them.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Heavier items low; fragile items padded and higher or separate.</li>
            <li>Keep walkways clear on job sites and during moves.</li>
          </ul>
        </article>
        <article>
          <h2 className="font-heading text-2xl font-semibold">3. We pick up</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            On your scheduled pickup date, we retrieve empty bins from the agreed location. We verify
            counts against your order. Need more time? Call us before your pickup window, subject to
            availability and prorated fees.
          </p>
        </article>

        <div className="rounded-xl border border-border bg-muted/40 p-6">
          <h3 className="font-heading text-lg font-semibold">Service area</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We currently serve <strong className="text-foreground">{site.serviceArea}</strong>. Expanding
            soon. See{" "}
            <Link href="/#checkout" className="font-medium text-foreground underline underline-offset-4">
              pricing &amp; checkout
            </Link>{" "}
            or call{" "}
            <a
              href={`tel:${site.phoneTel}`}
              className="font-medium text-foreground underline underline-offset-4"
            >
              {site.phone}
            </a>
            .
          </p>
        </div>

        <div className="rounded-xl border border-border p-6">
          <h3 className="font-heading text-lg font-semibold">What&apos;s included vs. extra</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Included
              </p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                <li>Empty bins for the rental period</li>
                <li>Scheduled delivery & pickup</li>
                <li>Order confirmation & support contact</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                May be extra
              </p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                <li>Extended rental days</li>
                <li>Additional delivery attempts</li>
                <li>Replacement fees per rental agreement</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link {...payNowLinkProps()} className={cn(buttonVariants({ size: "lg" }))}>
            Rent Now
          </Link>
          <Link href="/#checkout" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            View pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
