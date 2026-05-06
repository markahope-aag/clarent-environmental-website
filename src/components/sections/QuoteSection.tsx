"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WASTE_TYPES = [
  { value: "paint_solvent",       label: "Paint / Solvent" },
  { value: "used_oil",            label: "Used Oil" },
  { value: "universal_waste",     label: "Universal Waste" },
  { value: "contaminated_materials", label: "Contaminated Materials" },
  { value: "lab_waste",           label: "Lab Waste" },
  { value: "other",               label: "Other" },
];

const QUANTITIES = [
  { value: "lt_1_drum",   label: "Less than 1 drum" },
  { value: "1_5_drums",   label: "1–5 drums" },
  { value: "5_10_drums",  label: "5–10 drums" },
  { value: "gt_10_drums", label: "More than 10 drums" },
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

const leadFormSchema = z.object({
  company:   z.string().min(1, "Business name is required"),
  email:     z.string().email("Enter a valid email address"),
  state:     z.string().min(1, "Select your state"),
  wasteType: z.string().min(1, "Select a waste type"),
  quantity:  z.string().min(1, "Select an estimated quantity"),
});

type LeadForm = z.infer<typeof leadFormSchema>;

const TRUST_SIGNALS = [
  "Instant pricing for standard streams",
  "24-hour quotes for complex waste",
  "Pay only 60% to reserve your pickup",
];

const INITIAL: LeadForm = {
  company: "",
  email: "",
  state: "",
  wasteType: "",
  quantity: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteSection() {
  const [form, setForm]       = useState<LeadForm>(INITIAL);
  const [errors, setErrors]   = useState<Partial<Record<keyof LeadForm, string>>>({});
  const [status, setStatus]   = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  function setField<K extends keyof LeadForm>(key: K, value: string): void {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const result = leadFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LeadForm, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof LeadForm;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      setStatus("success");
      setForm(INITIAL);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      setErrorMsg(message);
      setStatus("error");
    }
  }

  return (
    <section
      id="quote"
      className="scroll-mt-20"
      style={{
        backgroundColor: "var(--color-charcoal)",
        color: "#FFFFFF",
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(2rem, 1rem + 3vw, 3rem)" }}
          >
            Get an Instant Quote
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">
            Tell us what you have. Most standard waste streams are priced
            immediately. No phone call required.
          </p>

          <ul className="mt-8 space-y-3">
            {TRUST_SIGNALS.map((signal) => (
              <li key={signal} className="flex items-center gap-3 text-white/85">
                <Check className="size-5 shrink-0" style={{ color: "var(--color-orange)" }} />
                {signal}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="bg-white p-6 sm:p-8"
          style={{
            color: "var(--color-charcoal)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-elevated)",
          }}
        >
          <h3 className="text-2xl font-medium">Start Your Request</h3>

          {status === "success" ? (
            <SuccessState onReset={() => setStatus("idle")} />
          ) : (
            <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
              <Field label="Business name" htmlFor="company" error={errors.company}>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  required
                  value={form.company}
                  onChange={(e) => setField("company", e.target.value)}
                  aria-invalid={Boolean(errors.company)}
                />
              </Field>

              <Field label="Email address" htmlFor="email" error={errors.email}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="State" htmlFor="state" error={errors.state}>
                  <NativeSelect
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={(e) => setField("state", e.target.value)}
                    aria-invalid={Boolean(errors.state)}
                  >
                    <option value="">Select…</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </NativeSelect>
                </Field>

                <Field label="Estimated quantity" htmlFor="quantity" error={errors.quantity}>
                  <NativeSelect
                    id="quantity"
                    name="quantity"
                    value={form.quantity}
                    onChange={(e) => setField("quantity", e.target.value)}
                    aria-invalid={Boolean(errors.quantity)}
                  >
                    <option value="">Select…</option>
                    {QUANTITIES.map((q) => (
                      <option key={q.value} value={q.value}>{q.label}</option>
                    ))}
                  </NativeSelect>
                </Field>
              </div>

              <Field label="Waste type" htmlFor="wasteType" error={errors.wasteType}>
                <NativeSelect
                  id="wasteType"
                  name="wasteType"
                  value={form.wasteType}
                  onChange={(e) => setField("wasteType", e.target.value)}
                  aria-invalid={Boolean(errors.wasteType)}
                >
                  <option value="">Select…</option>
                  {WASTE_TYPES.map((w) => (
                    <option key={w.value} value={w.value}>{w.label}</option>
                  ))}
                </NativeSelect>
              </Field>

              <Button
                type="submit"
                size="lg"
                className="w-full font-medium"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Submitting…" : "Get Instant Quote"}
              </Button>

              {status === "error" && (
                <p className="text-sm" style={{ color: "var(--color-orange-deep)" }}>
                  {errorMsg || "Something went wrong. Please try again."}
                </p>
              )}

              <p className="text-xs leading-relaxed text-[var(--color-forest)]">
                No commitment required. We&rsquo;ll respond within 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && (
        <p className="text-xs" style={{ color: "var(--color-orange-deep)" }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function NativeSelect({
  children,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={
        "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 " +
        (className ?? "")
      }
      style={{
        borderColor: "var(--color-sand)",
        color: "var(--color-charcoal)",
      }}
    >
      {children}
    </select>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-6 space-y-4">
      <div
        className="flex items-center gap-3 rounded-md p-4"
        style={{ backgroundColor: "var(--color-orange-tint)" }}
      >
        <Check className="size-5 shrink-0" style={{ color: "var(--color-orange)" }} />
        <p className="text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
          Request received. We&rsquo;ll be in touch within 24 hours.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="text-sm font-medium underline-offset-4 hover:underline"
        style={{ color: "var(--color-forest)" }}
      >
        Submit another request
      </button>
    </div>
  );
}
