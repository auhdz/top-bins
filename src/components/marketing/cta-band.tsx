import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaBand() {
  return (
    <section className="border-t border-border bg-zinc-900 py-16 text-zinc-50 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to clear the clutter or nail your next move?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
          Get a confirmed delivery window and straightforward pricing—no guesswork.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 min-w-[12rem] px-8 text-base shadow-lg shadow-black/25"
            )}
          >
            Rent bins today
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 border-white/30 bg-transparent px-8 text-base text-white hover:bg-white/10"
            )}
          >
            Get a quote
          </Link>
        </div>
      </div>
    </section>
  );
}
