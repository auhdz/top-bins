import type { Metadata } from "next";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Common questions about renting storage bins in ${site.serviceArea}.`,
};

const faqs = [
  {
    q: "How long can I rent bins?",
    a: "Rentals bill weekly through Stripe while your subscription is active. When you are finished, schedule pickup and we will collect the bins. Minimum rental length and proration follow your renter agreement.",
  },
  {
    q: "What if a bin is damaged, lost, or not returned?",
    a: "Security deposits help cover loss or excessive damage per the renter agreement. Contact us right away if something happens so we can document it and agree on next steps.",
  },
  {
    q: "Do you operate in bad weather?",
    a: "We schedule delivery and pickup in normal weather. If conditions are unsafe, we will reschedule with you.",
  },
  {
    q: "Can I cancel or change my order?",
    a: "Reach out before delivery if you need to change quantities or timing. Cancellations and refunds follow the terms in your renter agreement and what Stripe shows for your subscription.",
  },
  {
    q: "What areas do you serve?",
    a: `We focus on ${site.serviceArea}. If you are unsure, use the contact form with your ZIP code.`,
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">FAQ</p>
      <h1 className="mt-4 font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        Frequently asked questions
      </h1>
      <p className="mt-4 text-muted-foreground">
        Quick answers about renting bins with {site.name}.         For a quote or special requests, visit{" "}
        <Link href="/contact" className="font-medium text-foreground underline underline-offset-2">
          Contact
        </Link>
        .
      </p>
      <Accordion className="mt-12">
        {faqs.map((item, i) => (
          <AccordionItem key={item.q} value={`item-${i}`}>
            <AccordionTrigger className="text-base">{item.q}</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{item.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
