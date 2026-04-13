import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Subscription started",
  description: `Thank you · ${site.name}`,
};

export default async function RentalSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stripe</p>
      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        You&apos;re all set
      </h1>
      <p className="mt-4 text-muted-foreground">
        Your weekly subscription is being set up. We will follow up with delivery details for Koreatown.
        {session_id ? (
          <span className="mt-2 block font-mono text-xs text-muted-foreground/80">
            Session: {session_id.slice(0, 28)}…
          </span>
        ) : null}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants({ size: "lg", className: "rounded-full" })}>
          Back to home
        </Link>
        <Link
          href={`mailto:${site.email}`}
          className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full" })}
        >
          {site.email}
        </Link>
      </div>
    </div>
  );
}
