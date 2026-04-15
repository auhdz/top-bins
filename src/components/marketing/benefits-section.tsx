import { Package, Recycle, ShieldCheck, Truck } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "We deliver & pick up",
    body: "Bins dropped off empty in Koreatown and collected when your rental ends—less chasing boxes.",
  },
  {
    icon: ShieldCheck,
    title: "Built tough",
    body: "Heavy-duty plastic stands up to moves, garages, and job-site conditions—not flimsy cardboard.",
  },
  {
    icon: Package,
    title: "Stay organized",
    body: "Uniform sizes stack neatly; lids stay secure for transport and short-term storage.",
  },
  {
    icon: Recycle,
    title: "Reuse, not waste",
    body: "Renting keeps quality equipment in circulation longer than one-off disposables.",
  },
];

export function BenefitsSection() {
  return (
    <section className="border-b border-border/40 bg-background py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Why rent bins
          </p>
          <h2 className="mt-5 font-heading text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem]">
            Built for real moves and real messes
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Straightforward weekly rentals with delivery and pickup in Koreatown—so you can focus on the job, not
            the boxes.
          </p>
        </div>
        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {items.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="rounded-2xl border border-border/80 bg-card p-8 shadow-[0_12px_44px_-24px_rgba(15,23,42,0.12)]"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-5 font-heading text-lg font-medium text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
