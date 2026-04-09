import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact & get a quote",
  description: `Reach ${site.name} for rentals, bulk quotes, and delivery questions.`,
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-border bg-muted/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Questions or a big job? We&apos;re here.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            For standard rentals, starting online is fastest. For{" "}
            <strong className="text-foreground">20+ units</strong>, recurring job sites, or special
            timing, use the form or call—we&apos;ll align on volume pricing and windows.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_minmax(0,28rem)] lg:gap-16">
        <div>
          <h2 className="font-heading text-xl font-semibold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Phone: </span>
              <a href={`tel:${site.phone.replace(/\D/g, "")}`} className="underline underline-offset-4">
                {site.phone}
              </a>
              <span className="block text-xs">Mon–Sat, 8am–6pm (placeholder hours)</span>
            </li>
            <li>
              <span className="font-medium text-foreground">Email: </span>
              <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                {site.email}
              </a>
            </li>
            <li>
              <span className="font-medium text-foreground">Service area: </span>
              {site.serviceArea}
            </li>
          </ul>
          <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            Prefer self-serve?{" "}
            <Link href="/pricing" className="font-medium text-foreground underline underline-offset-4">
              Review pricing
            </Link>{" "}
            first, then submit what you need.
          </div>
          <Link
            href="/pricing"
            className={cn(buttonVariants({ variant: "outline" }), "mt-6 inline-flex")}
          >
            View pricing
          </Link>
        </div>

        <div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
