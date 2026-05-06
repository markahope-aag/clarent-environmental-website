import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Stream {
  name: string;
  industries: string;
}

const STREAMS: Stream[] = [
  { name: "Paint & Solvent Waste",        industries: "auto shops, body shops, manufacturers" },
  { name: "Used Oil & Filters",           industries: "automotive, industrial" },
  { name: "Universal Waste",              industries: "batteries, bulbs, mercury-containing equipment" },
  { name: "Contaminated Materials",       industries: "absorbents, wipes, rags" },
  { name: "Lab Pack Disposal",            industries: "laboratories, dental offices" },
  { name: "Antifreeze & Coolant",         industries: "automotive, HVAC" },
  { name: "Contaminated Soil",            industries: "UST releases, site remediation" },
  { name: "Aerosols & Compressed Gas",    industries: "various industries" },
];

export function WasteStreamsSection() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-warm-white)",
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 1rem + 3vw, 3rem)",
              color: "var(--color-charcoal)",
            }}
          >
            What We Handle
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--color-forest)" }}>
            Standard and complex waste streams for small businesses.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STREAMS.map((stream) => (
            <article
              key={stream.name}
              className="group relative overflow-hidden bg-white p-6 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                border: "1px solid var(--color-sand)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <span
                className="absolute left-3 top-3 block size-2 rotate-45"
                style={{ backgroundColor: "var(--color-orange)" }}
                aria-hidden
              />
              <h3
                className="pl-6 text-lg font-medium"
                style={{ color: "var(--color-charcoal)" }}
              >
                {stream.name}
              </h3>
              <p
                className="mt-2 pl-6 text-sm leading-relaxed"
                style={{ color: "var(--color-forest)" }}
              >
                {stream.industries}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:gap-3"
            style={{ color: "var(--color-orange)" }}
          >
            Don&rsquo;t see your waste type? We handle it.
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
