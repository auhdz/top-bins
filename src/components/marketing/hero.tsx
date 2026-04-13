import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Local hero art: delivery van & bins — text sits on left scrim */
const HERO_IMAGE = "/images/hero-packing-crates.png";

export function Hero() {
  return (
    <section className="relative isolate min-h-[min(92svh,820px)] overflow-hidden border-b border-border/40">
      <Image
        src={HERO_IMAGE}
        alt="Delivery professional loading a heavy-duty plastic moving bin from a yellow van."
        fill
        priority
        className="object-cover object-[58%_center] sm:object-[55%_center] lg:object-center"
        sizes="100vw"
      />

      {/* Overlay: dark left panel so headline reads on bright street; fades to reveal van & bins */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-zinc-950/95 from-[-10%] via-zinc-950/72 via-[38%] to-zinc-950/25 to-[78%] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/55 via-transparent to-zinc-950/25 sm:from-zinc-950/40 sm:to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[min(92svh,820px)] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-zinc-300">{site.serviceArea}</p>
          <h1 className="mt-3 font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl sm:leading-[1.05] lg:text-[3.25rem]">
            Moving bins delivered.
            <br />
            Picked up when you&apos;re done.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-300 sm:text-lg">
            Hassle-free heavy-duty professional bins. No cardboard mess.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#checkout"
              className={cn(
                "inline-flex h-12 min-w-[10.5rem] items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-black/25 transition hover:brightness-95",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              )}
            >
              Rent Today
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-white/75 underline-offset-4 transition hover:text-white hover:underline"
            >
              How it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
