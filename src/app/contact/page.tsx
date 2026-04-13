"use client";

import { useEffect } from "react";

/** Legacy `/contact` URLs forward to the rental page. */
export default function ContactLegacyRedirect() {
  useEffect(() => {
    window.location.replace("/rental");
  }, []);

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center text-sm text-muted-foreground">
      Taking you to rent bins…
    </div>
  );
}
