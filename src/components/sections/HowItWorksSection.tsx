import { ClipboardList, Receipt, Truck, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  number: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    icon: ClipboardList,
    number: "1",
    title: "Describe Your Waste",
    body:
      "Use our guided intake wizard to classify your waste stream and certify the details. Most businesses complete intake in under 5 minutes.",
  },
  {
    icon: Receipt,
    number: "2",
    title: "Get Your Instant Quote",
    body:
      "Receive an instant price for standard waste streams. Lane 2 complex wastes get a quote within 24 hours. Pay a 60% deposit to confirm.",
  },
  {
    icon: Truck,
    number: "3",
    title: "We Handle Everything",
    body:
      "Your licensed vendor picks up on schedule. We manage all manifests, certificates of disposal, and compliance documentation.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-white" style={{ paddingTop: "var(--space-section)", paddingBottom: "var(--space-section)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 1rem + 3vw, 3rem)",
              color: "var(--color-charcoal)",
            }}
          >
            How It Works
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--color-forest)" }}>
            From request to documentation in three steps.
          </p>
        </div>

        <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
          {STEPS.map((step, index) => (
            <li key={step.number} className="relative flex flex-col">
              <div className="flex items-center gap-4">
                <span
                  className="inline-flex size-12 items-center justify-center rounded-md"
                  style={{
                    backgroundColor: "var(--color-orange-tint)",
                    color: "var(--color-orange)",
                  }}
                >
                  <step.icon className="size-6" aria-hidden />
                </span>
                <span
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-orange)" }}
                >
                  Step {step.number}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-medium" style={{ color: "var(--color-charcoal)" }}>
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed" style={{ color: "var(--color-forest)" }}>
                {step.body}
              </p>

              {index < STEPS.length - 1 && (
                <ArrowRight
                  className="absolute -right-3 top-6 hidden size-6 shrink-0 md:block"
                  style={{ color: "var(--color-sand)" }}
                  aria-hidden
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
