"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "bearbox_cookie_notice_dismissed";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(STORAGE_KEY) !== "1");
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-card/95 p-4 shadow-[0_-8px_32px_rgba(15,23,42,0.12)] backdrop-blur-md sm:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          We use essential cookies to run the site and checkout. See our{" "}
          <Link href="/legal/privacy" className="font-medium text-foreground underline underline-offset-2">
            Privacy
          </Link>{" "}
          and{" "}
          <Link href="/legal/terms" className="font-medium text-foreground underline underline-offset-2">
            Terms
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.setItem(STORAGE_KEY, "1");
            } catch {
              /* ignore */
            }
            setVisible(false);
          }}
          className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
        >
          OK
        </button>
      </div>
    </div>
  );
}
