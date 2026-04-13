import type { ComponentType } from "react";
import { Boxes, PackageCheck, Truck } from "lucide-react";

import { cn } from "@/lib/utils";

function GraphicChooseBins() {
  return (
    <div className="relative mx-auto flex h-44 w-full max-w-[240px] flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-muted/90 to-muted/50 p-5 ring-1 ring-border/60">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 shadow-sm">
        <Boxes className="size-9 text-primary" strokeWidth={1.5} aria-hidden />
        <span className="text-xs font-semibold text-foreground">Your mix</span>
      </div>
      <div className="absolute bottom-3 right-3 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground shadow-sm">
        Choose
      </div>
    </div>
  );
}

function GraphicDeliver() {
  return (
    <div className="relative mx-auto flex h-44 w-full max-w-[240px] items-center justify-center rounded-2xl bg-gradient-to-b from-muted/90 to-muted/50 p-5 ring-1 ring-border/60">
      <div
        className="absolute left-6 top-1/2 h-0.5 w-[40%] -translate-y-1/2 rounded-full bg-primary/35"
        aria-hidden
      />
      <div className="relative flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
        <Truck className="size-8" strokeWidth={1.75} aria-hidden />
      </div>
      <div className="absolute right-5 top-8 rounded-md border border-border bg-white px-2 py-1 text-[10px] font-medium text-muted-foreground shadow-sm">
        En route
      </div>
    </div>
  );
}

function GraphicPickup() {
  return (
    <div className="relative mx-auto flex h-44 w-full max-w-[240px] flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-muted/90 to-muted/50 p-5 ring-1 ring-border/60">
      <div className="flex flex-col items-center gap-2">
        <div className="flex size-14 items-center justify-center rounded-2xl border-2 border-primary/50 bg-white shadow-sm">
          <PackageCheck className="size-8 text-primary" strokeWidth={1.5} aria-hidden />
        </div>
        <span className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-foreground">
          Pickup scheduled
        </span>
      </div>
    </div>
  );
}

const steps: {
  title: string;
  body: string;
  Graphic: ComponentType;
  delayClass: string;
}[] = [
  {
    title: "Choose your bins",
    body: "Pick standard or large crates, or rent all five for free Koreatown delivery.",
    Graphic: GraphicChooseBins,
    delayClass: "landing-delay-8",
  },
  {
    title: "We deliver to you",
    body: "Clean heavy-duty bins arrive at your door within 24–48 hours.",
    Graphic: GraphicDeliver,
    delayClass: "landing-delay-9",
  },
  {
    title: "We pick them up",
    body: "When you’re done, we collect the bins. Deposits refund when they return clean.",
    Graphic: GraphicPickup,
    delayClass: "landing-delay-10",
  },
];

const stepCardClass = cn(
  "group flex cursor-pointer flex-col rounded-2xl border border-border/80 bg-card p-9 text-center transition duration-200 ease-out will-change-transform sm:p-10",
  "shadow-[0_0_0_2px_#fff,0_12px_48px_-16px_rgba(15,23,42,0.1)]",
  "motion-safe:hover:scale-[1.02] motion-safe:hover:shadow-[0_0_0_2px_#fff,0_16px_48px_-12px_rgba(15,23,42,0.18),0_0_32px_-8px_oklch(0.82_0.12_96_/_0.25)]",
  "motion-safe:active:scale-[0.99] motion-safe:active:shadow-[0_0_0_2px_#fff,0_0_28px_oklch(0.78_0.14_96_/_0.35)]"
);

export function HowItWorksPreview() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-b border-border/30 bg-background py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="landing-fade-up landing-delay-6 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            How it works
          </p>
          <h2 className="landing-fade-up landing-delay-7 mt-5 font-heading text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:mt-6 sm:text-4xl lg:text-[2.65rem]">
            Three steps
          </h2>
          <p className="landing-fade-up landing-delay-7 mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            From choosing bins to pickup, we keep it simple.
          </p>
        </div>

        <ol className="mt-16 grid gap-8 sm:grid-cols-3 sm:mt-20 sm:gap-6 lg:gap-10">
          {steps.map(({ title, body, Graphic, delayClass }) => (
            <li
              key={title}
              className={cn("landing-fade-up", delayClass, stepCardClass)}
            >
              <div className="mb-8 w-full">
                <Graphic />
              </div>
              <h3 className="font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
