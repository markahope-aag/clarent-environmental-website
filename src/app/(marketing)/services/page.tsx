import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Hazardous Waste Services",
  description:
    "Compliant disposal for paint and solvent waste, used oil, universal waste, contaminated materials, lab packs, and more. Instant quotes for small businesses.",
};

interface Stream {
  slug: string;
  name: string;
  summary: string;
  regulatory: string;
  industries: string[];
}

const STREAMS: Stream[] = [
  {
    slug: "paint-solvent",
    name: "Paint & Solvent Waste",
    summary:
      "Used paints, thinners, lacquers, and spent solvents from production and cleanup operations.",
    regulatory:
      "Typically D001 (ignitable) and / or F003 spent non-halogenated solvents. Manifest and disposal documentation required for any quantity above CESQG limits.",
    industries: ["Auto & body shops", "Manufacturers", "Painting contractors", "Print shops"],
  },
  {
    slug: "used-oil",
    name: "Used Oil & Filters",
    summary:
      "Crankcase oil, hydraulic fluid, and gear oil along with the spent filters and absorbents.",
    regulatory:
      "Managed under 40 CFR Part 279 used-oil standards rather than full RCRA. Filters must be drained for at least 12 hours before they can be classified as scrap metal.",
    industries: ["Automotive service", "Industrial maintenance", "Fleet operators"],
  },
  {
    slug: "universal",
    name: "Universal Waste",
    summary:
      "Batteries, fluorescent and HID lamps, ballasts, and mercury-containing equipment.",
    regulatory:
      "40 CFR Part 273 streamlines collection and transport but accumulation time and labelling requirements still apply.",
    industries: ["Property managers", "Schools", "Healthcare facilities", "Manufacturing"],
  },
  {
    slug: "contaminated",
    name: "Contaminated Materials",
    summary:
      "Spent absorbents, oily rags, sorbent booms, and PPE soaked with regulated chemicals.",
    regulatory:
      "Classification follows the contaminant. The mixture and derived-from rules can pull otherwise non-hazardous material into RCRA — treat as hazardous until proven otherwise.",
    industries: ["Industrial cleanup", "Auto shops", "Spill response"],
  },
  {
    slug: "lab-pack",
    name: "Lab Pack Disposal",
    summary:
      "Small-container chemical inventories segregated and packed for compliant disposal.",
    regulatory:
      "Bulked into DOT-compliant overpacks by hazard class. Each container is logged on the manifest and tied to a certificate of disposal.",
    industries: ["Laboratories", "Dental practices", "Schools & universities", "R&D"],
  },
  {
    slug: "antifreeze",
    name: "Antifreeze & Coolant",
    summary:
      "Spent ethylene-glycol and propylene-glycol coolants from automotive and HVAC systems.",
    regulatory:
      "Not federally hazardous on its own, but easily picks up RCRA characteristics from contamination. Several states regulate it as universal or special waste.",
    industries: ["Automotive service", "HVAC contractors", "Fleet operators"],
  },
  {
    slug: "contaminated-soil",
    name: "Contaminated Soil",
    summary:
      "Soil impacted by petroleum, solvents, or other regulated releases.",
    regulatory:
      "Profiling drives disposal options. Non-hazardous impacted soil typically routes to a Subtitle D facility; characteristic-failing soil moves to Subtitle C.",
    industries: ["Environmental contractors", "UST removal", "Site remediation"],
  },
  {
    slug: "aerosols",
    name: "Aerosols & Compressed Gas",
    summary:
      "Aerosol cans, partially-full cylinders, and gases that need depressurization or recycling.",
    regulatory:
      "Aerosols qualify as universal waste under the 2019 federal rule when puncturing happens at a permitted facility. Compressed gas cylinders are managed by content and pressure.",
    industries: ["Manufacturing", "Print shops", "Pest control", "Construction"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero />
      <ServiceGrid />
      <PageCta />
    </>
  );
}

function PageHero() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-warm-white)",
        paddingTop: "5rem",
        paddingBottom: "3rem",
      }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <p
          className="text-xs font-semibold uppercase"
          style={{ color: "var(--color-orange)", letterSpacing: "0.12em" }}
        >
          Services
        </p>
        <h1
          className="mt-4 font-bold tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 1.5rem + 4vw, 4.5rem)",
            color: "var(--color-charcoal)",
          }}
        >
          Hazardous Waste Services
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--color-forest)" }}
        >
          We handle the waste streams that small businesses generate every day —
          paint and solvents, used oil, universal waste, lab packs, and more.
          Standard streams price instantly. Complex streams route to our specialist
          team for a 24-hour quote.
        </p>
      </div>
    </section>
  );
}

function ServiceGrid() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-warm-white)",
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {STREAMS.map((stream) => (
            <ServiceCard key={stream.slug} stream={stream} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ stream }: { stream: Stream }) {
  return (
    <article
      className="flex flex-col bg-white p-7"
      style={{
        border: "1px solid var(--color-sand)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-1 block size-3 shrink-0 rotate-45"
          style={{ backgroundColor: "var(--color-orange)" }}
          aria-hidden
        />
        <h2
          className="text-2xl font-medium leading-tight"
          style={{ color: "var(--color-charcoal)" }}
        >
          {stream.name}
        </h2>
      </div>

      <p className="mt-4 leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
        {stream.summary}
      </p>

      <p
        className="mt-4 rounded-md p-4 text-sm leading-relaxed"
        style={{
          backgroundColor: "var(--color-warm-white)",
          color: "var(--color-forest)",
        }}
      >
        <span
          className="mr-1.5 font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-orange)", fontSize: "0.7rem" }}
        >
          Regulatory
        </span>
        {stream.regulatory}
      </p>

      <div className="mt-5">
        <p
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-charcoal)" }}
        >
          Industries served
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {stream.industries.map((industry) => (
            <li
              key={industry}
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: "var(--color-sand)",
                color: "var(--color-forest)",
              }}
            >
              {industry}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function PageCta() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-charcoal)",
        color: "#FFFFFF",
      }}
    >
      <div style={{ height: "4px", backgroundColor: "var(--color-orange)" }} />
      <div
        className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
        style={{ paddingTop: "var(--space-section-sm)", paddingBottom: "var(--space-section-sm)" }}
      >
        <h2
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(1.75rem, 1rem + 2.5vw, 2.5rem)" }}
        >
          Get a quote for your waste stream.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
          Most standard streams price instantly. No phone call required.
        </p>
        <Button asChild size="lg" className="mt-8 font-medium">
          <Link href="/#quote">
            Get an Instant Quote
            <ArrowRight className="ml-1 size-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  );
}
