import type { Metadata } from "next";
import Link from "next/link";

import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing & packages",
  description: `Weekly bin rental rates, delivery fees, and packages for ${site.name}.`,
};

const faq = [
  {
    q: "Do you prorate partial weeks?",
    a: "Billing is structured in weekly increments to keep routing predictable. If you need a shorter window, ask—we’ll quote the closest fit.",
  },
  {
    q: "What if I need more bins mid-rental?",
    a: "Subject to availability, we can add units and align pickup on the same schedule or extend your window.",
  },
  {
    q: "Do you invoice businesses?",
    a: "Yes—net terms can be arranged for qualified accounts. Mention it on your quote request.",
  },
] as const;

export default function PricingPage() {
  const priced = products.filter((p) => p.priceCents > 0);

  return (
    <div>
      <section className="border-b border-border bg-muted/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Straightforward rates. No surprise box fees.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Pricing is based on bin type, rental length, and delivery distance. Deposits may apply and
            are released per your agreement when units are returned in acceptable condition.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="font-heading text-2xl font-semibold">Per-unit weekly rate</h2>
        <div className="mt-8 overflow-hidden rounded-xl border border-border shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/80 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Starting at</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Deposit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {priced.map((p) => (
                <tr key={p.slug}>
                  <td className="px-4 py-4">
                    <span className="font-medium text-foreground">{p.name}</span>
                    <p className="mt-0.5 text-muted-foreground">{p.tagline}</p>
                  </td>
                  <td className="px-4 py-4 font-heading font-semibold tabular-nums">
                    ${(p.priceCents / 100).toFixed(2)} / week
                  </td>
                  <td className="hidden px-4 py-4 tabular-nums text-muted-foreground sm:table-cell">
                    ${(p.depositCents / 100).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/30 p-6">
            <h3 className="font-heading text-lg font-semibold">Delivery & pickup</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Zone A (metro core): <strong className="text-foreground">$35</strong> each way or{" "}
              <strong className="text-foreground">$60</strong> round-trip placeholder. Extended zones
              calculated at checkout or on your quote.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-6">
            <h3 className="font-heading text-lg font-semibold">Packages</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Starter</strong> (10 standard, 1 week) ·{" "}
              <strong className="text-foreground">Mover</strong> (mixed sizes) ·{" "}
              <strong className="text-foreground">Pro site</strong> (custom). Final numbers confirmed
              before payment.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-heading text-2xl font-semibold">Pricing FAQ</h2>
          <Accordion className="mt-4 w-full">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
            Calculate my total
          </Link>
          <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Request a bulk quote
          </Link>
        </div>
      </section>
    </div>
  );
}
