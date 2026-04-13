import type { Metadata } from "next";
import Link from "next/link";

import { accessories, products } from "@/lib/products";
import { payNowLinkProps, site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products & inventory",
  description: `Compare bin sizes, features, and rental rates for ${site.name}. Heavy-duty plastic containers with delivery and pickup.`,
};

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-muted/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Catalog
          </p>
          <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Bins and crates built for real work
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Choose from multiple rental sizes: stackable, with secure lids on select models, and
            designed for repeated use. Add pads, locks, or cleaning supplies at checkout or when
            you check out.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
          {products.map((p) => (
            <Card key={p.slug} className="overflow-hidden shadow-md">
              <CardHeader className="border-b bg-card">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="text-2xl">{p.name}</CardTitle>
                    <CardDescription className="text-base">{p.tagline}</CardDescription>
                  </div>
                  <p className="font-heading text-xl font-semibold tabular-nums text-foreground">
                    {p.priceLabel}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="grid gap-8 pt-8 lg:grid-cols-[1fr_280px]">
                <div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  <ul className="mt-4 space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-foreground">
                        <span
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <dl className="space-y-3 rounded-xl border bg-muted/40 p-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Dimensions</dt>
                    <dd className="font-medium">{p.dimensions}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Capacity</dt>
                    <dd className="font-medium">{p.capacity}</dd>
                  </div>
                  {p.depositCents > 0 && (
                    <div>
                      <dt className="text-muted-foreground">Deposit (refundable)</dt>
                      <dd className="font-medium tabular-nums">
                        ${(p.depositCents / 100).toFixed(2)} per unit (policy in rental agreement)
                      </dd>
                    </div>
                  )}
                </dl>
              </CardContent>
              <CardFooter className="flex flex-wrap justify-end gap-3 border-t bg-muted/30">
                <Link href="/#checkout" className={cn(buttonVariants({ variant: "outline" }))}>
                  View pricing
                </Link>
                <Link {...payNowLinkProps()} className={cn(buttonVariants())}>
                  Rent Now
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {accessories.length > 0 ? (
        <section className="border-t border-border bg-muted/30 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">Accessories</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Add these to your rental at checkout. Availability varies by region.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {accessories.map((a) => (
                <li
                  key={a.name}
                  className="rounded-xl border border-border bg-background p-5 shadow-sm"
                >
                  <p className="font-heading font-semibold text-foreground">{a.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{a.blurb}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </div>
  );
}
