import Image from "next/image";
import Link from "next/link";

import { legalFooter, nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-zinc-900 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <Image
              src={site.logoSrc}
              alt=""
              width={200}
              height={56}
              className="h-11 w-auto brightness-0 invert"
              aria-hidden
            />
            <p className="sr-only">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm text-zinc-400">{site.description}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Navigate</p>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-300 transition-colors hover:text-[oklch(0.852_0.185_96)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Legal</p>
            <ul className="mt-3 space-y-2">
              {legalFooter.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-300 transition-colors hover:text-[oklch(0.852_0.185_96)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Reach us</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li>
                <a href={`tel:${site.phoneTel}`} className="hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="text-zinc-400">{site.serviceArea}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
