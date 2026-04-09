import { Clock, Package, ShieldCheck, Truck } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Save time",
    body: "We drop off empty bins and collect them when your rental ends—less chasing boxes, more progress.",
  },
  {
    icon: ShieldCheck,
    title: "Built tough",
    body: "Rigid plastic stands up to moves, garages, and demanding job-site conditions—not flimsy retail totes.",
  },
  {
    icon: Package,
    title: "Stay organized",
    body: "Uniform sizes stack neatly; secure lids keep contents contained in transit and storage.",
  },
  {
    icon: Clock,
    title: "Add what you need",
    body: "Pads, locks, and cleaning kits available as add-ons aligned with real moving workflows.",
  },
] as const;

export function Benefits() {
  return (
    <section className="border-b border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Why rent with us
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Professional-grade gear, plain-English service
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-6 shadow-sm ring-1 ring-foreground/5"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
