"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("company")) {
      setStatus("success");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    const body = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      zip: String(fd.get("zip") ?? "").trim(),
      startDate: String(fd.get("startDate") ?? "").trim(),
      products: String(fd.get("products") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Request failed");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-border bg-card p-8 text-center shadow-sm"
        role="status"
      >
        <p className="font-heading text-lg font-semibold text-foreground">
          Thanks—we received your request.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We typically respond within one business day with availability and next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip">ZIP / city</Label>
          <Input id="zip" name="zip" required autoComplete="postal-code" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="startDate">Preferred start date</Label>
        <Input id="startDate" name="startDate" type="date" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="products">Products & quantities</Label>
        <Input
          id="products"
          name="products"
          placeholder="e.g. 12 standard bins, 4 large crates"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Access, stairs, commercial PO, timing…"
        />
      </div>

      <input
        type="text"
        name="company"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      {status === "error" && errorMessage && (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      )}

      <Button type="submit" className="w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request quote"}
      </Button>
    </form>
  );
}
