"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { headerNav, payNowLinkProps, site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

function navItemActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const SCROLL_THRESHOLD_PX = 16;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "pointer-events-auto mx-auto max-w-5xl px-4 pb-2 transition-[padding] duration-300 sm:px-6",
          scrolled ? "pt-3 sm:pt-4" : "pt-4 sm:pt-5"
        )}
      >
        <div
          className={cn(
            "flex h-[3.25rem] items-center gap-3 rounded-full border px-3 backdrop-blur-xl transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-out sm:h-14 sm:gap-4 sm:px-5",
            scrolled
              ? "border-border/90 bg-background/95 shadow-[0_8px_40px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl"
              : "border-border/45 bg-background/70 shadow-[0_4px_32px_-12px_rgba(15,23,42,0.06)] backdrop-blur-md"
          )}
        >
          <Link
            href="/"
            className="flex min-w-0 flex-shrink-0 items-center gap-2 leading-tight sm:gap-2.5"
          >
            <Image
              src={site.logoSrc}
              alt={site.logoAlt}
              width={200}
              height={56}
              className="h-8 w-auto shrink-0 sm:h-9"
              priority
            />
            <div className="hidden min-w-0 flex-col justify-center sm:flex">
              <span className="font-sans text-sm font-semibold tracking-tight text-foreground sm:text-base">
                {site.headerWordmark}
              </span>
              <span className="text-[10px] leading-tight text-muted-foreground sm:text-[11px]">
                {site.tagline}
              </span>
            </div>
          </Link>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1 md:gap-2">
            <nav className="hidden items-center md:flex" aria-label="Main">
              {headerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    navItemActive(pathname, item.href) && "bg-muted/80 text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              {...payNowLinkProps()}
              className={cn(
                buttonVariants({ size: "sm" }),
                "hidden rounded-full px-5 sm:inline-flex"
              )}
            >
              Rent Now
            </Link>

            <Sheet>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "shrink-0 rounded-full md:hidden"
                )}
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(100%,20rem)] gap-0 p-0">
                <div className="flex flex-col gap-2 border-b p-4">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src={site.logoSrc}
                      alt={site.logoAlt}
                      width={200}
                      height={56}
                      className="h-10 w-auto shrink-0"
                    />
                    <span className="font-sans text-lg font-semibold tracking-tight text-foreground">
                      {site.headerWordmark}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{site.tagline}</span>
                </div>
                <nav className="flex flex-col p-2" aria-label="Mobile">
                  {headerNav.map((item) => (
                    <SheetClose
                      key={item.href}
                      render={
                        <Link
                          href={item.href}
                          className={cn(
                            "block rounded-lg px-3 py-2.5 text-sm font-medium",
                            navItemActive(pathname, item.href)
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                          )}
                        />
                      }
                    >
                      {item.label}
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-2 border-t p-4">
                  <SheetClose
                    render={
                      <Link
                        {...payNowLinkProps()}
                        className={cn(
                          buttonVariants({ className: "w-full justify-center rounded-full" })
                        )}
                      />
                    }
                  >
                    Rent Now
                  </SheetClose>
                  <SheetClose
                    render={
                      <Link
                        href="/#checkout"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            className: "w-full justify-center rounded-full",
                          })
                        )}
                      />
                    }
                  >
                    Pricing
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
