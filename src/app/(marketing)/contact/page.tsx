"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, CalendarCheck2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const contactSchema = z.object({
  name:    z.string().min(1, "Name is required"),
  email:   z.string().email("Enter a valid email"),
  message: z.string().min(1, "Message is required"),
});

type ContactForm = z.infer<typeof contactSchema>;

const INITIAL: ContactForm = { name: "", email: "", message: "" };

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  return (
    <>
      <PageHero />
      <ContactBlock />
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
          Contact
        </p>
        <h1
          className="mt-4 font-bold tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 1.5rem + 4vw, 4.5rem)",
            color: "var(--color-charcoal)",
          }}
        >
          Talk to us.
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--color-forest)" }}
        >
          For waste disposal quotes, use the instant quote tool on the homepage.
          For everything else — partnerships, vendor questions, press — reach
          out below or book a call.
        </p>
      </div>
    </section>
  );
}

function ContactBlock() {
  return (
    <section
      className="bg-white"
      style={{
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <Details />
        <ContactForm />
      </div>
    </section>
  );
}

function Details() {
  return (
    <div className="space-y-8">
      <DetailRow icon={MapPin} heading="Office">
        2921 Landmark Place, Suite 215
        <br />
        Madison, WI 53713
      </DetailRow>

      <DetailRow icon={Mail} heading="Email">
        <a
          href="mailto:mark.hope@clarentenvironmental.com"
          style={{ color: "var(--color-orange)" }}
          className="font-medium hover:underline"
        >
          mark.hope@clarentenvironmental.com
        </a>
      </DetailRow>

      <DetailRow icon={CalendarCheck2} heading="Book a call">
        <a
          href="https://meetings.hubspot.com/mark-hope2"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--color-orange)" }}
          className="font-medium hover:underline"
        >
          meetings.hubspot.com/mark-hope2
        </a>
      </DetailRow>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  heading,
  children,
}: {
  icon: typeof MapPin;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-md"
        style={{
          backgroundColor: "var(--color-orange-tint)",
          color: "var(--color-orange)",
        }}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-charcoal)" }}
        >
          {heading}
        </p>
        <div
          className="mt-1.5 text-sm leading-relaxed"
          style={{ color: "var(--color-forest)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm]       = useState<ContactForm>(INITIAL);
  const [errors, setErrors]   = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [status, setStatus]   = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function setField<K extends keyof ContactForm>(key: K, value: string): void {
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

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
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

  if (status === "success") {
    return (
      <div
        className="rounded-lg p-8"
        style={{ backgroundColor: "var(--color-warm-white)" }}
      >
        <h3
          className="text-xl font-medium"
          style={{ color: "var(--color-charcoal)" }}
        >
          Message received.
        </h3>
        <p className="mt-3 leading-relaxed" style={{ color: "var(--color-forest)" }}>
          Thanks for reaching out. We&rsquo;ll respond within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium underline-offset-4 hover:underline"
          style={{ color: "var(--color-orange)" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-5 rounded-lg p-6 sm:p-8"
      style={{
        backgroundColor: "var(--color-warm-white)",
        borderRadius: "var(--radius-lg)",
      }}
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="text-2xl font-medium" style={{ color: "var(--color-charcoal)" }}>
        Send a message
      </h2>

      <div className="space-y-1.5">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && (
          <p className="text-xs" style={{ color: "var(--color-orange-deep)" }} role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && (
          <p className="text-xs" style={{ color: "var(--color-orange-deep)" }} role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          className="flex w-full rounded-md border bg-white px-3 py-2 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50"
          style={{
            borderColor: "var(--color-sand)",
            color: "var(--color-charcoal)",
          }}
        />
        {errors.message && (
          <p className="text-xs" style={{ color: "var(--color-orange-deep)" }} role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full font-medium"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>

      {status === "error" && (
        <p className="text-sm" style={{ color: "var(--color-orange-deep)" }}>
          {errorMsg || "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}
