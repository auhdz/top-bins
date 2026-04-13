import { PackageOpen, Truck, Boxes } from "lucide-react";

const steps = [
  {
    icon: Boxes,
    title: "Choose your bins",
    body: "Standard, large—or all five for free Koreatown delivery.",
  },
  {
    icon: Truck,
    title: "We deliver",
    body: "Clean bins within 24–48 hours.",
  },
  {
    icon: PackageOpen,
    title: "Pack & we pick up",
    body: "We collect when you’re done; deposits refund if bins return clean.",
  },
] as const;

export function HowItWorksPreview() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-b border-border/40 bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-lg">
          <p className="text-sm font-medium text-muted-foreground">How it works</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Three steps
          </h2>
        </div>

        <ol className="mt-12 grid gap-14 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {steps.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex flex-col">
              <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-background text-foreground shadow-sm">
                <Icon className="size-4" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              <div className="relative mt-6 min-h-[140px] w-full rounded-xl border border-dashed border-border/80 bg-muted/20">
                <span className="sr-only">Photo placeholder</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
