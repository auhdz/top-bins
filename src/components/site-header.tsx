"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { site, nav } from "@/lib/site";
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

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 flex-shrink-0 items-center gap-2.5 leading-tight sm:gap-3"
        >
          <Image
            src={site.logoSrc}
            alt={site.logoAlt}
            width={200}
            height={56}
            className="h-9 w-auto shrink-0 sm:h-10"
            priority
          />
          <div className="flex min-w-0 flex-col justify-center">
            <span className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {site.headerWordmark}
            </span>
            <span className="text-[10px] leading-tight text-muted-foreground sm:text-xs">
              {site.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                navItemActive(pathname, item.href)
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#checkout"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden sm:inline-flex"
            )}
          >
            Pricing
          </Link>
          <Link
            href="/#checkout"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            Rent Today
          </Link>

          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "md:hidden"
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
                  <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
                    {site.headerWordmark}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{site.tagline}</span>
              </div>
              <nav className="flex flex-col p-2" aria-label="Mobile">
                {nav.map((item) => (
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
                      href="/#checkout"
                      className={cn(buttonVariants({ className: "w-full justify-center" }))}
                    />
                  }
                >
                  Rent Today
                </SheetClose>
                <SheetClose
                  render={
                    <Link
                      href="/#checkout"
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          className: "w-full justify-center",
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
    </header>
  );
}
