import { Zap, FileCheck2, CalendarX, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Differentiator {
  icon: LucideIcon;
  title: string;
  body: string;
}

const ITEMS: Differentiator[] = [
  {
    icon: Zap,
    title: "Instant Quotes",
    body:
      "Most competitors require a callback. We price standard waste streams immediately, 24 hours a day.",
  },
  {
    icon: FileCheck2,
    title: "Full Documentation",
    body:
      "Manifests, certificates of disposal, LDR notifications — every document available in your portal.",
  },
  {
    icon: CalendarX,
    title: "No Long-Term Contracts",
    body:
      "Schedule when you need service. No annual minimums, no auto-renewal traps.",
  },
  {
    icon: Target,
    title: "SQG Specialists",
    body:
      "Unlike the large operators, small quantity generators are our entire focus. Not an afterthought.",
  },
];

export function WhySection() {
  return (
    <section
      className="bg-white"
      style={{
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
            Why Clarent Environmental
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--color-forest)" }}>
            We&rsquo;re not a phone bank. We&rsquo;re a platform.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {ITEMS.map((item) => (
            <article
              key={item.title}
              className="flex gap-5 p-6"
              style={{
                backgroundColor: "var(--color-warm-white)",
                borderLeft: "3px solid var(--color-orange)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <span
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-md"
                style={{
                  backgroundColor: "var(--color-orange-tint)",
                  color: "var(--color-orange)",
                }}
              >
                <item.icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-xl font-medium" style={{ color: "var(--color-charcoal)" }}>
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed" style={{ color: "var(--color-forest)" }}>
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
