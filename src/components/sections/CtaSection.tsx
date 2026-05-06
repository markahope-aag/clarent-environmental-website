import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-charcoal)",
        color: "#FFFFFF",
      }}
    >
      <div style={{ height: "4px", backgroundColor: "var(--color-orange)" }} />

      <div
        className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
        style={{
          paddingTop: "var(--space-section)",
          paddingBottom: "var(--space-section)",
        }}
      >
        <h2
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 1rem + 3vw, 3.25rem)" }}
        >
          Ready to simplify your hazardous waste?
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
          Get an instant quote for your waste stream. No phone calls, no waiting, no surprises.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="font-medium">
            <Link href="/#quote">Get an Instant Quote</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 bg-transparent font-medium text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/how-it-works/">Learn How It Works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
