import Link from "next/link";

import { HeroCarouselBg } from "@/components/marketing/hero-carousel-bg";
import { payNowLinkProps, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const primaryCta = cn(
  "hero-cta bg-primary text-primary-foreground shadow-md shadow-black/30",
  "motion-safe:hover:shadow-lg motion-safe:hover:shadow-[0_8px_32px_oklch(0.72_0.14_96_/_0.42)]",
  "motion-safe:active:shadow-[0_0_28px_oklch(0.78_0.17_96_/_0.58)]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
);

const secondaryCta = cn(
  "hero-cta border-2 border-white/90 bg-white/10 text-white backdrop-blur-sm",
  "motion-safe:hover:bg-white/18 motion-safe:hover:shadow-lg motion-safe:hover:shadow-[0_6px_28px_rgba(255,255,255,0.22)]",
  "motion-safe:active:shadow-[0_0_26px_rgba(255,255,255,0.5)]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
);

export function Hero() {
  return (
    <section
      className="relative isolate -mt-[var(--site-header-offset)] flex min-h-[75dvh] flex-col overflow-hidden border-b border-border/40 pt-[var(--site-header-offset)]"
    >
      <HeroCarouselBg />

      {/* Overlay: dark left panel so headline reads on bright areas */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-zinc-950/95 from-[-10%] via-zinc-950/72 via-[38%] to-zinc-950/25 to-[78%] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-zinc-950/55 via-transparent to-zinc-950/25 sm:from-zinc-950/40 sm:to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-12 sm:px-6 sm:py-16">
        <div className="max-w-xl">
          <p className="landing-fade-up landing-delay-1 text-sm font-medium text-zinc-300">
            {site.serviceArea}
          </p>
          <h1 className="landing-fade-up landing-delay-2 mt-3 font-sans text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl sm:leading-[1.05] lg:text-[3.25rem]">
            Moving bins delivered.
            <br />
            Picked up when you&apos;re done.
          </h1>
          <p className="landing-fade-up landing-delay-3 mt-5 max-w-md text-base leading-relaxed text-zinc-300 sm:text-lg">
            Hassle-free heavy-duty professional bins. No cardboard mess.
          </p>
          <div className="landing-fade-up landing-delay-4 mt-8 flex flex-wrap items-center gap-3">
            <Link {...payNowLinkProps()} className={primaryCta}>
              Rent Now
            </Link>
            <Link href="/#how-it-works" className={secondaryCta}>
              How it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
