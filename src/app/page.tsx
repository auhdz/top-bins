import { BenefitsSection } from "@/components/marketing/benefits-section";
import { CheckoutSection } from "@/components/marketing/checkout-section";
import { FeaturedProductsHome } from "@/components/marketing/featured-products-home";
import { Hero } from "@/components/marketing/hero";
import { HowItWorksPreview } from "@/components/marketing/how-it-works-preview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BenefitsSection />
      <HowItWorksPreview />
      <FeaturedProductsHome />
      <CheckoutSection />
    </>
  );
}
