import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects and uses information.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        Privacy policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:font-heading [&_h2]:text-lg [&_h2]:font-medium [&_h2]:text-foreground [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        <section>
        <h2 className="font-heading text-lg font-medium text-foreground">Overview</h2>
        <p className="mt-2">
          {site.name} (“we,” “us”) respects your privacy. This policy describes what we collect through this
          website, how we use it, and your choices. Service area: {site.serviceArea}.
        </p>
        </section>

        <section>
        <h2 className="font-heading text-lg font-medium text-foreground">Information we collect</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Contact and quote requests:</strong> name, email, phone, ZIP, dates, and messages you submit
            on our forms.
          </li>
          <li>
            <strong>Checkout:</strong> when you rent bins, payment and subscription data are processed by{" "}
            <a href="https://stripe.com/privacy" className="text-foreground underline" target="_blank" rel="noreferrer">
              Stripe
            </a>
            . We receive information needed to fulfill your rental (for example name, email, phone, and order
            metadata such as quantities and scheduling preferences).
          </li>
          <li>
            <strong>Technical data:</strong> basic server and security logs may include IP address, browser type,
            and pages visited, as typical for hosting providers.
          </li>
        </ul>
        </section>

        <section>
        <h2 className="font-heading text-lg font-medium text-foreground">How we use information</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>To respond to inquiries, deliver and pick up equipment, and manage rentals.</li>
          <li>To process payments and comply with legal obligations.</li>
          <li>To improve the site and prevent fraud or abuse.</li>
        </ul>
        </section>

        <section>
        <h2 className="font-heading text-lg font-medium text-foreground">Cookies</h2>
        <p className="mt-2">
          We use cookies and similar technologies as needed for site operation (for example remembering that you
          dismissed this notice). We do not use advertising cookies on this site unless we later disclose that
          here and, where required, obtain consent.
        </p>
        </section>

        <section>
        <h2 className="font-heading text-lg font-medium text-foreground">Sharing</h2>
        <p className="mt-2">
          We share data with service providers who help us run the business (for example payment processing with
          Stripe, email delivery, and hosting). We do not sell your personal information.
        </p>
        </section>

        <section>
        <h2 className="font-heading text-lg font-medium text-foreground">Retention</h2>
        <p className="mt-2">
          We keep information as long as needed for rentals, legal requirements, and legitimate business purposes,
          then delete or anonymize it where appropriate.
        </p>
        </section>

        <section>
        <h2 className="font-heading text-lg font-medium text-foreground">Your rights</h2>
        <p className="mt-2">
          Depending on where you live, you may have rights to access, correct, or delete personal information, or
          to opt out of certain processing. Contact us at{" "}
          <a href={`mailto:${site.email}`} className="text-foreground underline">
            {site.email}
          </a>{" "}
          and we will respond within a reasonable time.
        </p>
        </section>

        <section>
        <h2 className="font-heading text-lg font-medium text-foreground">Children</h2>
        <p className="mt-2">This site is not directed at children under 13, and we do not knowingly collect their data.</p>
        </section>

        <section>
        <h2 className="font-heading text-lg font-medium text-foreground">Changes</h2>
        <p className="mt-2">We may update this policy; the “Last updated” date will change when we do.</p>
        </section>

        <p className="mt-10 text-foreground">
          <Link href="/" className="font-medium text-foreground underline underline-offset-2">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
