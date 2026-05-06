interface Testimonial {
  quote: string;
  author: string;
  role: string;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We used to dread dealing with our solvent waste. Clarent quoted us in two minutes and had it picked up the next week. Couldn't be easier.",
    author: "Shop Manager",
    role: "Auto Repair",
    location: "Madison, WI",
  },
  {
    quote:
      "The documentation portal alone is worth it. All our manifests in one place for every audit.",
    author: "Office Manager",
    role: "Dental Practice",
    location: "Milwaukee, WI",
  },
  {
    quote:
      "We shopped around and Clarent was 30% cheaper. No surprises on the invoice either.",
    author: "Owner",
    role: "Machine Shop",
    location: "Janesville, WI",
  },
];

export function TestimonialsSection() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-warm-white)",
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 1rem + 3vw, 3rem)",
              color: "var(--color-charcoal)",
            }}
          >
            Trusted by Small Businesses Across the Region
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <figure
              key={idx}
              className="flex flex-col bg-white p-7"
              style={{
                border: "1px solid var(--color-sand)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <span
                className="font-bold leading-none"
                style={{
                  color: "var(--color-orange)",
                  fontSize: "4rem",
                  lineHeight: "0.6",
                }}
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote
                className="mt-4 flex-1 leading-relaxed"
                style={{ color: "var(--color-charcoal)" }}
              >
                {t.quote}
              </blockquote>
              <figcaption
                className="mt-6 border-t pt-4 text-sm"
                style={{
                  borderColor: "var(--color-sand)",
                  color: "var(--color-forest)",
                }}
              >
                <span className="font-medium" style={{ color: "var(--color-charcoal)" }}>
                  {t.author}
                </span>
                <span className="block text-xs">
                  {t.role} · {t.location}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
