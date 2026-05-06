import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INDUSTRIES } from "../page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) return { title: "Industry" };
  return {
    title: industry.name,
    description: industry.summary,
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) notFound();

  return (
    <>
      <section
        style={{
          backgroundColor: "var(--color-warm-white)",
          paddingTop: "5rem",
          paddingBottom: "3rem",
        }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/industries/"
            className="inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--color-forest)" }}
          >
            <ChevronLeft className="size-4" aria-hidden />
            All industries
          </Link>

          <p
            className="mt-8 text-xs font-semibold uppercase"
            style={{ color: "var(--color-orange)", letterSpacing: "0.12em" }}
          >
            Industry
          </p>
          <h1
            className="mt-4 font-bold tracking-tight"
            style={{
              fontSize: "clamp(2.25rem, 1.25rem + 3.5vw, 4rem)",
              color: "var(--color-charcoal)",
            }}
          >
            {industry.name}
          </h1>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--color-forest)" }}>
            {industry.summary}
          </p>
        </div>
      </section>

      <section
        className="bg-white"
        style={{
          paddingTop: "var(--space-section-sm)",
          paddingBottom: "var(--space-section)",
        }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="text-2xl font-medium tracking-tight"
            style={{ color: "var(--color-charcoal)" }}
          >
            Common waste streams
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {industry.wasteTypes.map((type) => (
              <li
                key={type}
                className="flex items-start gap-2.5 rounded-md p-3"
                style={{ backgroundColor: "var(--color-warm-white)" }}
              >
                <span
                  className="mt-1.5 size-2 shrink-0 rotate-45"
                  style={{ backgroundColor: "var(--color-orange)" }}
                  aria-hidden
                />
                <span style={{ color: "var(--color-charcoal)" }}>{type}</span>
              </li>
            ))}
          </ul>

          <div
            className="mt-12 rounded-lg p-8 text-center"
            style={{ backgroundColor: "var(--color-warm-white)" }}
          >
            <h3
              className="text-xl font-medium"
              style={{ color: "var(--color-charcoal)" }}
            >
              Detailed industry guide coming soon.
            </h3>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "var(--color-forest)" }}>
              In the meantime, get an instant quote for any waste stream listed above.
            </p>
            <Button asChild size="lg" className="mt-6 font-medium">
              <Link href="/#quote">
                Get an Instant Quote
                <ArrowRight className="ml-1 size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
