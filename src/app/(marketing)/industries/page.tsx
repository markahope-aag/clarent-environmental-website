import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Compliant hazardous waste service for auto shops, dental practices, laboratories, machine shops, dry cleaners, printers, manufacturers, and contractors.",
};

export interface IndustryHeroImage {
  src: string;
  alt: string;
  credit: string;
  creditUrl: string;
}

export interface Industry {
  slug: string;
  name: string;
  summary: string;
  wasteTypes: string[];
  heroImage?: IndustryHeroImage | undefined;
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "auto-body-shops",
    name: "Auto & Body Shops",
    summary:
      "Paint, solvent, and used-oil generators with steady accumulation. We handle every common stream the average shop produces.",
    wasteTypes: ["Paint & solvents", "Used oil & filters", "Antifreeze", "Aerosols", "Contaminated absorbents"],
  },
  {
    slug: "dental-practices",
    name: "Dental Practices",
    summary:
      "Amalgam, x-ray fixers, sharps, and pharmaceutical waste — all of it segregated and documented for compliance reviews.",
    wasteTypes: ["Amalgam", "X-ray fixer", "Pharmaceutical waste", "Universal waste", "Lab packs"],
  },
  {
    slug: "laboratories",
    name: "Laboratories",
    summary:
      "Research, clinical, and analytical labs with mixed inventories. Lab pack disposal, formaldehyde, and reactive chemistry handled.",
    wasteTypes: ["Lab packs", "Reactive chemistry", "Solvent waste", "Acids & bases", "Universal waste"],
  },
  {
    slug: "machine-shops",
    name: "Machine Shops",
    summary:
      "Cutting fluids, parts washers, grinding swarf, and used oil. Volume disposal at small-shop pricing.",
    wasteTypes: ["Used oil", "Cutting & coolant fluid", "Parts-washer solvent", "Contaminated swarf"],
  },
  {
    slug: "dry-cleaners",
    name: "Dry Cleaners",
    summary:
      "Perchloroethylene, hydrocarbon solvent waste, and spent filters. Compliance handled end-to-end.",
    wasteTypes: ["PERC waste", "Hydrocarbon solvents", "Spent filters", "Contaminated PPE"],
  },
  {
    slug: "printing-imaging",
    name: "Printing & Imaging",
    summary:
      "Offset, screen, and digital print shops generate ink, plate-developer, and solvent waste. We pick up on cycle.",
    wasteTypes: ["Inks & solvents", "Developer & fixer", "Universal waste", "Aerosols"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    summary:
      "Light manufacturing and assembly facilities — paint booths, electroplating, lubricants. Quote sheets stay current.",
    wasteTypes: ["Paint booth waste", "Electroplating sludge", "Used oil", "Universal waste", "Spent acids"],
  },
  {
    slug: "contractors",
    name: "Contractors",
    summary:
      "General, environmental, and remediation contractors managing one-off and project-based hazardous waste.",
    wasteTypes: ["Contaminated soil", "Lead paint debris", "Asbestos-related materials", "Spill cleanup waste"],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero />
      <Grid />
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
          Who we serve
        </p>
        <h1
          className="mt-4 font-bold tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 1.5rem + 4vw, 4.5rem)",
            color: "var(--color-charcoal)",
          }}
        >
          Industries
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--color-forest)" }}
        >
          Small businesses generate predictable streams. We meet you where the
          waste is — paint booths, dental ops, machine shops, lab benches,
          remediation sites.
        </p>
      </div>
    </section>
  );
}

function Grid() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-warm-white)",
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Link
      href={`/industries/${industry.slug}/`}
      className="group block bg-white p-6 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        border: "1px solid var(--color-sand)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <h2
        className="text-xl font-medium leading-tight"
        style={{ color: "var(--color-charcoal)" }}
      >
        {industry.name}
      </h2>
      <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-forest)" }}>
        {industry.summary}
      </p>

      <div className="mt-5">
        <p
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-orange)" }}
        >
          Common streams
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {industry.wasteTypes.map((type) => (
            <li
              key={type}
              className="rounded-full px-2.5 py-1 text-xs"
              style={{
                backgroundColor: "var(--color-warm-white)",
                color: "var(--color-forest)",
              }}
            >
              {type}
            </li>
          ))}
        </ul>
      </div>

      <span
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-all group-hover:gap-2.5"
        style={{ color: "var(--color-orange)" }}
      >
        Learn more
        <ArrowRight className="size-4" aria-hidden />
      </span>
    </Link>
  );
}
