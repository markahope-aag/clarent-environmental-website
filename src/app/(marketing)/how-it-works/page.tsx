import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList,
  Network,
  Wallet,
  FileCheck2,
  CalendarClock,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Generator intake, vendor selection, payment, documentation, and compliance scheduling — the full Clarent process from request to certificate of disposal.",
};

interface Step {
  number: string;
  title: string;
  icon: LucideIcon;
  body: string;
  bullets: string[];
}

const STEPS: Step[] = [
  {
    number: "1",
    title: "Generator intake",
    icon: ClipboardList,
    body:
      "Our guided intake captures the information a vendor needs to price the job: waste stream, volume, container type, accumulation start date, and generator status.",
    bullets: [
      "Most intake completes in under 5 minutes",
      "Adaptive flow — we only ask what's relevant for your waste type",
      "On-screen guidance for SQG / CESQG classification",
    ],
  },
  {
    number: "2",
    title: "Vendor selection",
    icon: Network,
    body:
      "Standard streams route through our pre-priced vendor network. Complex or unusual waste enters Lane 2 — a 24-hour specialist review with vetted operators in your region.",
    bullets: [
      "Curated network of licensed, insured vendors",
      "Geographic and waste-type matching",
      "Never a single-source surprise",
    ],
  },
  {
    number: "3",
    title: "Payment — 60 / 40 split",
    icon: Wallet,
    body:
      "Confirm the job with a 60% deposit. The remaining 40% bills the day before pickup once your vendor is locked in. No long-term contracts, no auto-renewals.",
    bullets: [
      "60% deposit confirms your slot",
      "40% balance billed before pickup",
      "Refund or reschedule if requirements change",
    ],
  },
  {
    number: "4",
    title: "Documentation",
    icon: FileCheck2,
    body:
      "Every job produces a complete compliance package, available in your portal as soon as it lands.",
    bullets: [
      "Uniform Hazardous Waste Manifest",
      "Certificate of Disposal",
      "Land Disposal Restriction notifications when required",
      "Permanent searchable repository",
    ],
  },
  {
    number: "5",
    title: "Compliance calendar",
    icon: CalendarClock,
    body:
      "Recurring service runs on your accumulation pattern. Get reminders before SQG accumulation limits or 90 / 180 / 270-day clocks expire.",
    bullets: [
      "Schedule recurring pickups by interval or volume",
      "Accumulation-time reminders with state overlays",
      "Annual report data export when audit season arrives",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero />
      <Steps />
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
          The Clarent process
        </p>
        <h1
          className="mt-4 font-bold tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 1.5rem + 4vw, 4.5rem)",
            color: "var(--color-charcoal)",
          }}
        >
          How It Works
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--color-forest)" }}
        >
          Five steps from request to documentation. Standard streams price
          instantly; complex waste gets a specialist quote in 24 hours.
        </p>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section
      className="bg-white"
      style={{
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <ol className="space-y-14">
          {STEPS.map((step) => (
            <StepRow key={step.number} step={step} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepRow({ step }: { step: Step }) {
  return (
    <li className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
      <div className="flex md:flex-col md:items-center">
        <span
          className="inline-flex size-14 items-center justify-center rounded-md"
          style={{
            backgroundColor: "var(--color-orange-tint)",
            color: "var(--color-orange)",
          }}
        >
          <step.icon className="size-7" aria-hidden />
        </span>
      </div>

      <div>
        <p
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-orange)" }}
        >
          Step {step.number}
        </p>
        <h2
          className="mt-1 text-3xl font-medium tracking-tight"
          style={{ color: "var(--color-charcoal)" }}
        >
          {step.title}
        </h2>
        <p className="mt-4 leading-relaxed" style={{ color: "var(--color-forest)" }}>
          {step.body}
        </p>
        <ul className="mt-5 space-y-2">
          {step.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2.5 text-sm"
              style={{ color: "var(--color-charcoal)" }}
            >
              <span
                className="mt-2 size-1.5 shrink-0 rotate-45"
                style={{ backgroundColor: "var(--color-orange)" }}
                aria-hidden
              />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </li>
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
          Ready to start your first request?
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
          Step 1 takes under five minutes. You&rsquo;ll have a quote on the screen
          before you finish your coffee.
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
