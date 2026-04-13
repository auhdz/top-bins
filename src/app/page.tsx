import { CheckoutSection } from "@/components/marketing/checkout-section";
import { Hero } from "@/components/marketing/hero";
import { HowItWorksPreview } from "@/components/marketing/how-it-works-preview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorksPreview />
      <CheckoutSection />
    </>
  );
}
