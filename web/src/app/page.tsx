import { Benefits } from "@/components/marketing/benefits";
import { CtaBand } from "@/components/marketing/cta-band";
import { FeaturedProducts } from "@/components/marketing/featured-products";
import { Hero } from "@/components/marketing/hero";
import { HowItWorksPreview } from "@/components/marketing/how-it-works-preview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <HowItWorksPreview />
      <FeaturedProducts />
      <CtaBand />
    </>
  );
}
