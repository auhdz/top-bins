import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2400&q=80";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-900">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Stacked heavy-duty storage bins and moving supplies—dark containers with professional-grade materials on a job-ready workspace."
          fill
          priority
          className="object-cover object-center opacity-90"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/80 to-zinc-950/40"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto flex min-h-[min(100svh,720px)] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.852_0.185_96)]">
          Delivery & pickup included
        </p>
        <h1 className="mt-4 max-w-2xl font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Heavy-duty bins. Delivered. Picked up when you are done.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-300">
          Rent stackable commercial-grade plastic bins and crates for moving, job sites, events,
          and on-site organization—plus optional accessories like padding, locks, and cleaning
          supplies.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 min-w-[11rem] px-6 text-base shadow-lg shadow-black/20 transition-transform hover:scale-[1.02]"
            )}
          >
            Rent bins today
          </Link>
          <Link
            href="/pricing"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 border-white/30 bg-white/5 px-6 text-base text-white hover:bg-white/10"
            )}
          >
            View sizes & pricing
          </Link>
        </div>

        <ul className="mt-12 flex max-w-2xl flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-sm text-zinc-300">
          <li className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[oklch(0.852_0.185_96)]" aria-hidden />
            Delivery & pickup
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[oklch(0.852_0.185_96)]" aria-hidden />
            Stackable & durable
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[oklch(0.852_0.185_96)]" aria-hidden />
            Commercial-grade plastic
          </li>
        </ul>
      </div>
    </section>
  );
}
