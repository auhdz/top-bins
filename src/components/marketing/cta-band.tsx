import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { payNowLinkProps } from "@/lib/site";
import { cn } from "@/lib/utils";

export function CtaBand() {
  return (
    <section className="border-t border-border bg-zinc-900 py-16 text-zinc-50 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to clear the clutter or nail your next move?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
          Get a confirmed delivery window and straightforward pricing, with no guesswork.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            {...payNowLinkProps()}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 min-w-[12rem] px-8 text-base shadow-lg shadow-black/25"
            )}
          >
            Rent Now
          </Link>
          <Link
            href="/#checkout"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 border-white/30 bg-transparent px-8 text-base text-white hover:bg-white/10"
            )}
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
