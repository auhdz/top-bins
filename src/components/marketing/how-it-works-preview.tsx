import Link from "next/link";
import { CalendarClock, PackageOpen, Truck } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: CalendarClock,
    title: "Schedule delivery",
    body: "Choose bins, rental dates, and a delivery window—we confirm availability and send your summary.",
  },
  {
    icon: PackageOpen,
    title: "Pack & use",
    body: "Fill bins within your rental period. Stack safely and label by room for faster unloading.",
  },
  {
    icon: Truck,
    title: "We pick up",
    body: "On your scheduled day, we retrieve empties from the agreed spot—extensions available on request.",
  },
] as const;

export function HowItWorksPreview() {
  return (
    <section className="bg-muted/50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              How it works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Delivery, fill, pickup—kept simple
            </h2>
          </div>
          <Link href="/how-it-works" className={cn(buttonVariants({ variant: "outline" }))}>
            Full process & policies
          </Link>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li
              key={title}
              className="relative rounded-xl border border-border bg-background p-6 shadow-sm"
            >
              <span className="absolute right-4 top-4 font-heading text-5xl font-bold text-muted/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-900 text-white">
                <Icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
