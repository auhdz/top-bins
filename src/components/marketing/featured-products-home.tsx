import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

export function FeaturedProductsHome() {
  const featured = products.slice(0, 2);
  return (
    <section className="border-b border-border/40 bg-muted/15 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Gear
          </p>
          <h2 className="mt-5 font-heading text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem]">
            Featured rentals
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Standard bins and large crates—priced weekly with clear deposits. See full specs on the products page.
          </p>
        </div>
        <ul className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
          {featured.map((p) => (
            <li
              key={p.slug}
              className="flex flex-col rounded-2xl border border-border/80 bg-card p-8 shadow-[0_12px_48px_-20px_rgba(15,23,42,0.1)] sm:p-10"
            >
              <h3 className="font-heading text-xl font-medium text-foreground sm:text-2xl">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <dl className="mt-6 space-y-1 text-sm text-muted-foreground">
                <div>
                  <dt className="inline font-medium text-foreground">Dimensions: </dt>
                  <dd className="inline">{p.dimensions}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-foreground">From: </dt>
                  <dd className="inline font-heading font-semibold tabular-nums text-foreground">
                    {p.priceLabel}
                  </dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/rental" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8")}>
                  Rent now
                </Link>
                <Link
                  href="/products"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full border-border px-8"
                  )}
                >
                  All products
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
