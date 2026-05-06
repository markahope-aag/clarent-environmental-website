import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST_SIGNALS = [
  "Licensed & insured vendors",
  "EPA-compliant documentation",
  "No long-term contracts",
];

export function HeroSection() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-warm-white)",
        paddingTop: "6rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[55fr_45fr] lg:items-center lg:gap-16">
        <div>
          <p
            className="text-xs font-semibold uppercase"
            style={{
              color: "var(--color-orange)",
              letterSpacing: "0.12em",
            }}
          >
            Hazardous Waste Disposal for Small Businesses
          </p>

          <h1
            className="mt-6 font-bold leading-[0.95] tracking-tight"
            style={{
              fontSize: "clamp(2.75rem, 1.4rem + 5vw, 5.5rem)",
              color: "var(--color-charcoal)",
            }}
          >
            Compliance Made Simple.
          </h1>

          <p
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: "var(--color-forest)" }}
          >
            Instant quotes. Compliant pickup. Complete documentation.
            <br className="hidden sm:block" />
            No sales calls, no surprises.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="font-medium">
              <Link href="/#quote">Get an Instant Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-medium">
              <Link href="/how-it-works/">How It Works</Link>
            </Button>
          </div>

          <ul className="mt-10 space-y-2.5 text-sm" style={{ color: "var(--color-forest)" }}>
            {TRUST_SIGNALS.map((signal) => (
              <li key={signal} className="flex items-center gap-2.5">
                <Check className="size-4 shrink-0" style={{ color: "var(--color-orange)" }} />
                {signal}
              </li>
            ))}
          </ul>
        </div>

        <HeroImage />
      </div>
    </section>
  );
}

// Photo by Atik sulianami on Unsplash — see public/hero-drums.jpg.attribution.md
function HeroImage() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        className="overflow-hidden"
        style={{
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-elevated)",
          aspectRatio: "4 / 3",
        }}
      >
        <Image
          src="/hero-drums.jpg"
          alt="Stacked steel drums in an industrial storage yard"
          width={1600}
          height={1200}
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Brand accent — diamond mark perched on the corner */}
      <div
        className="absolute -bottom-6 -left-6 hidden size-20 rotate-45 items-center justify-center md:flex"
        style={{
          backgroundColor: "var(--color-orange)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-elevated)",
        }}
        aria-hidden
      >
        <span
          className="block size-8"
          style={{
            backgroundColor: "var(--color-warm-white)",
            borderRadius: "var(--radius-sm)",
          }}
        />
      </div>
    </div>
  );
}
