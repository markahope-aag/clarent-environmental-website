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

        <HeroDiamond />
      </div>
    </section>
  );
}

function HeroDiamond() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <svg
        viewBox="0 0 480 480"
        className="h-auto w-full"
        aria-hidden
        focusable="false"
      >
        <defs>
          <filter id="hero-diamond-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="14" stdDeviation="22" floodColor="#1C2B2A" floodOpacity="0.18" />
          </filter>
          <linearGradient id="hero-diamond-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A1F" />
            <stop offset="100%" stopColor="#C24E00" />
          </linearGradient>
        </defs>

        <g transform="rotate(45 240 240)" filter="url(#hero-diamond-shadow)">
          <rect
            x="60"
            y="60"
            width="360"
            height="360"
            rx="20"
            fill="url(#hero-diamond-gradient)"
          />
          <rect
            x="148"
            y="148"
            width="184"
            height="184"
            rx="14"
            fill="var(--color-warm-white)"
          />
        </g>

        {/* Inner orange accent square */}
        <g transform="rotate(45 240 240)">
          <rect
            x="200"
            y="200"
            width="80"
            height="80"
            rx="6"
            fill="var(--color-orange)"
          />
        </g>
      </svg>
    </div>
  );
}
