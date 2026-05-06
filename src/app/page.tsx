import { HeroSection }         from "@/components/sections/HeroSection";
import { TrustBar }            from "@/components/sections/TrustBar";
import { HowItWorksSection }   from "@/components/sections/HowItWorksSection";
import { WasteStreamsSection } from "@/components/sections/WasteStreamsSection";
import { QuoteSection }        from "@/components/sections/QuoteSection";
import { WhySection }          from "@/components/sections/WhySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection }          from "@/components/sections/FAQSection";
import { CtaSection }          from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <HowItWorksSection />
      <WasteStreamsSection />
      <QuoteSection />
      <WhySection />
      <TestimonialsSection />
      <FAQSection />
      <CtaSection />
    </main>
  );
}
