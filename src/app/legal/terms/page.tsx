import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description: `Terms governing use of ${site.name} website and services.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        Terms of service
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-heading text-lg font-medium text-foreground">Agreement</h2>
          <p className="mt-2">
            By using the {site.name} website ({site.url}) and our rental services, you agree to these Terms and to
            our{" "}
            <Link href="/legal/privacy" className="font-medium text-foreground underline underline-offset-2">
              Privacy policy
            </Link>
            . Equipment rentals are also subject to our{" "}
            <Link href="/legal/renter-agreement" className="font-medium text-foreground underline underline-offset-2">
              Renter agreement
            </Link>{" "}
            where applicable.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-medium text-foreground">Services</h2>
          <p className="mt-2">
            We rent heavy-duty storage bins and crates in {site.serviceArea}. Delivery, pickup, pricing, and
            deposits are described on the site and confirmed at checkout. We may refuse service for safety, legal,
            or operational reasons.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-medium text-foreground">Payments</h2>
          <p className="mt-2">
            Payments and subscriptions are processed by Stripe. You authorize charges in accordance with the
            checkout summary and your subscription. Refunds and disputes are handled per Stripe policies, our renter
            agreement, and applicable law.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-medium text-foreground">Acceptable use</h2>
          <p className="mt-2">
            You agree not to misuse the site (including attempting unauthorized access, scraping in violation of
            these terms, or submitting false information). We may suspend access if we reasonably believe abuse or
            fraud.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-medium text-foreground">Disclaimer</h2>
          <p className="mt-2">
            The site is provided “as is.” To the fullest extent permitted by law, we disclaim warranties not
            expressly stated here. Our liability is limited as permitted by law; in no event shall our total
            liability exceed what you paid us in the twelve months before the claim, except where prohibited.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-medium text-foreground">Indemnity</h2>
          <p className="mt-2">
            You agree to defend and indemnify {site.name} against claims arising from your use of the equipment or
            site, except to the extent caused by our gross negligence or willful misconduct.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-medium text-foreground">Governing law</h2>
          <p className="mt-2">
            These Terms are governed by the laws of the State of California, without regard to conflict-of-law
            rules. Courts in Los Angeles County, California shall have exclusive jurisdiction, subject to mandatory
            consumer protections where applicable.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-medium text-foreground">Contact</h2>
          <p className="mt-2">
            Questions:{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-foreground underline">
              {site.email}
            </a>
            .
          </p>
        </section>

        <p className="pt-4 text-foreground">
          <Link href="/" className="font-medium text-foreground underline underline-offset-2">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
