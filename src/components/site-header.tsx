"use client";

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

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 flex-col leading-tight">
          <span className="truncate font-heading text-lg font-semibold tracking-tight text-foreground">
            {site.name}
          </span>
          <span className="hidden text-xs text-muted-foreground sm:block">
            {site.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
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
            href="/pricing"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden sm:inline-flex"
            )}
          >
            View pricing
          </Link>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            Rent bins today
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
              <div className="flex flex-col border-b p-4">
                <span className="font-heading font-semibold">{site.name}</span>
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
                          pathname === item.href
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
                      href="/contact"
                      className={cn(buttonVariants({ className: "w-full justify-center" }))}
                    />
                  }
                >
                  Rent bins today
                </SheetClose>
                <SheetClose
                  render={
                    <Link
                      href="/pricing"
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          className: "w-full justify-center",
                        })
                      )}
                    />
                  }
                >
                  View pricing
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
