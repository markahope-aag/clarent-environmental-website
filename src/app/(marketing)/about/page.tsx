import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Clarent Environmental is a Madison, Wisconsin platform built to make hazardous waste compliance simple for small businesses.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <Story />
      <WhyMarket />
      <Team />
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
          About
        </p>
        <h1
          className="mt-4 font-bold tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 1.5rem + 4vw, 4.5rem)",
            color: "var(--color-charcoal)",
          }}
        >
          Compliance made simple, for the businesses the big operators ignore.
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--color-forest)" }}
        >
          Clarent Environmental is a Madison, Wisconsin platform that pairs
          small-quantity generators with the right licensed vendor and handles
          the compliance documentation end to end.
        </p>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section
      className="bg-white"
      style={{
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section-sm)",
      }}
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          className="text-3xl font-medium tracking-tight"
          style={{ color: "var(--color-charcoal)" }}
        >
          Our story
        </h2>
        <div
          className="mt-6 space-y-5 text-lg leading-relaxed"
          style={{ color: "var(--color-forest)" }}
        >
          <p>
            Clarent was founded by Mark Hope, a former Army Special Operations
            officer and Coca-Cola Division President who spent two decades
            building operations in the Upper Midwest. He kept running into the
            same pattern: small businesses with regulated waste, no in-house
            compliance staff, and a hauler ecosystem optimised for industrial
            volume — not the auto shop on the corner.
          </p>
          <p>
            The decision to build Clarent came from a simple observation. The
            EPA frameworks for small quantity generators are clear. The
            disposal market is mature. The gap is between them: the workflow
            tooling, the pricing transparency, and the documentation discipline
            most small businesses can&rsquo;t justify staffing for.
          </p>
          <p>
            We built the platform to close that gap.
          </p>
        </div>
      </div>
    </section>
  );
}

function WhyMarket() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-warm-white)",
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section-sm)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <h2
          className="text-3xl font-medium tracking-tight"
          style={{ color: "var(--color-charcoal)" }}
        >
          Why this market
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Pillar
            heading="SQG focus"
            body="Small quantity generators are our entire focus, not a marketing afterthought stapled onto an industrial-scale operation."
          />
          <Pillar
            heading="Technology-enabled"
            body="A real platform — instant quotes, vendor selection, document repository — replaces the phone-tag sales process small businesses are stuck with."
          />
          <Pillar
            heading="Transparent pricing"
            body="Standard waste streams price from the same vendor rate database every time. No surprise invoices. No ambiguous fuel surcharges."
          />
        </div>
      </div>
    </section>
  );
}

function Pillar({ heading, body }: { heading: string; body: string }) {
  return (
    <article
      className="bg-white p-6"
      style={{
        border: "1px solid var(--color-sand)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <h3 className="text-lg font-medium" style={{ color: "var(--color-charcoal)" }}>
        {heading}
      </h3>
      <p className="mt-3 leading-relaxed" style={{ color: "var(--color-forest)" }}>
        {body}
      </p>
    </article>
  );
}

function Team() {
  return (
    <section
      className="bg-white"
      style={{
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section-sm)",
      }}
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          className="text-3xl font-medium tracking-tight"
          style={{ color: "var(--color-charcoal)" }}
        >
          The team
        </h2>
        <p className="mt-4 leading-relaxed" style={{ color: "var(--color-forest)" }}>
          Team profiles are managed in our content system and will appear here
          as we onboard. For now, you can reach Mark directly through the
          contact page.
        </p>
        <Button asChild variant="outline" className="mt-6 font-medium">
          <Link href="/contact/">Contact us</Link>
        </Button>
      </div>
    </section>
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
          See how it works in your shop.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
          Get an instant quote for any standard stream and watch the compliance
          documentation drop into your portal.
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
