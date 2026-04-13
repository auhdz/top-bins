import Link from "next/link";

import { products } from "@/lib/products";
import { payNowLinkProps } from "@/lib/site";
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

export function FeaturedProducts() {
  const featured = products.filter((p) => p.slug !== "contractor-bundle");

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Featured rentals
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Sizes for everyday moves and heavier loads
          </h2>
          <p className="mt-3 text-muted-foreground">
            Start with our most popular bins, then add accessories at checkout.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {featured.map((p) => (
            <Card key={p.slug} className="overflow-hidden shadow-md">
              <CardHeader className="border-b bg-muted/40">
                <CardTitle className="text-xl">{p.name}</CardTitle>
                <CardDescription>{p.tagline}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <dl className="mt-4 grid gap-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Dimensions</dt>
                    <dd className="font-medium text-foreground">{p.dimensions}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Capacity</dt>
                    <dd className="font-medium text-foreground">{p.capacity}</dd>
                  </div>
                </dl>
              </CardContent>
              <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30">
                <p className="font-heading text-lg font-semibold tabular-nums text-foreground">
                  {p.priceLabel}
                </p>
                <Link {...payNowLinkProps()} className={cn(buttonVariants())}>
                  Rent Now
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products" className={cn(buttonVariants({ variant: "outline" }))}>
            Browse full catalog
          </Link>
          <Link href="/pricing" className={cn(buttonVariants())}>
            See packages & fees
          </Link>
        </div>
      </div>
    </section>
  );
}
