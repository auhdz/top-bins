import type { Metadata } from "next";
import Link from "next/link";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";

import { buttonVariants } from "@/components/ui/button";
import { getLegalMarkdown } from "@/lib/read-markdown";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Renter agreement",
  description: `Terms and policies for renting bins from ${site.name}.`,
};

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 border-b border-border pb-2 font-heading text-xl font-semibold text-foreground first:mt-8">
      {children}
    </h2>
  ),
  p: ({ children }) => <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{children}</p>,
  ul: ({ children }) => <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">{children}</ul>,
  ol: ({ children }) => <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  hr: () => <hr className="my-10 border-border" />,
};

export default async function RenterAgreementPage() {
  const markdown = await getLegalMarkdown("renter-agreement.md");

  return (
    <div>
      <section className="border-b border-border bg-muted/40 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            ← Back to home
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Legal
          </p>
          <article className="mt-6 max-w-none print:text-black">
            <ReactMarkdown components={markdownComponents}>{markdown}</ReactMarkdown>
          </article>
          <div className="mt-12 print:hidden">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
              Request a rental
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
