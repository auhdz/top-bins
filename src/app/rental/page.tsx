import type { Metadata } from "next";

import { site } from "@/lib/site";

import { RentalClient } from "./rental-client";

export const metadata: Metadata = {
  title: "Rent bins",
  description: `Weekly bin subscriptions with Stripe Checkout · ${site.name}`,
};

export default function RentalPage() {
  return <RentalClient />;
}
