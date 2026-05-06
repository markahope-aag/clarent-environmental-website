import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface QA {
  question: string;
  answer: string;
}

const FAQS: QA[] = [
  {
    question: "Do I need an EPA ID number to use Clarent?",
    answer:
      "Most businesses already have an EPA ID if they generate any regulated waste. If not, we can help you register in EPA's RCRAInfo system as part of your first pickup.",
  },
  {
    question: "How are you different from just calling a disposal company directly?",
    answer:
      "We source from a curated network of vendors to find the best pricing for your waste type and location. Our portal gives you instant quotes, tracked pickups, and a complete compliance document repository — none of which you'd get from a cold call to a hauler.",
  },
  {
    question: "What waste types do you handle?",
    answer:
      "We handle the most common SQG and CESQG streams: paint and solvent waste, used oil and filters, universal waste, contaminated absorbents, lab packs, antifreeze, and more. Complex or unusual streams go to our specialist review team.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Standard waste streams are priced instantly from our vendor rate database. Complex or unusual waste goes through a 24-hour quote process. You pay 60% upfront to confirm your pickup, with the balance due before the pickup date.",
  },
  {
    question: "What documentation do I receive?",
    answer:
      "Every job produces a complete compliance package: uniform hazardous waste manifest, certificate of disposal, and any required LDR notifications. All documents are available in your portal immediately.",
  },
  {
    question: "What states do you serve?",
    answer:
      "We currently focus on Wisconsin and the Upper Midwest, with vendor coverage expanding nationally. Enter your state in the quote form and we'll confirm coverage.",
  },
  {
    question: "What if my waste doesn't match standard categories?",
    answer:
      "Non-standard, mixed, or high-hazard waste goes to our Lane 2 process: we gather additional information, request specialist vendor pricing, and return a custom quote within 24 hours.",
  },
  {
    question: "Do you offer recurring service?",
    answer:
      "Yes. After your first pickup, you can schedule recurring service or set up reminders based on your accumulation patterns.",
  },
];

export function FAQSection() {
  return (
    <section
      className="bg-white"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 1rem + 3vw, 3rem)",
              color: "var(--color-charcoal)",
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12 w-full">
          {FAQS.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              style={{ borderColor: "var(--color-sand)" }}
            >
              <AccordionTrigger
                className="text-left text-lg font-medium"
                style={{ color: "var(--color-charcoal)" }}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                className="leading-relaxed"
                style={{ color: "var(--color-forest)" }}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
