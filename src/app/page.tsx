export default function HomePage() {
  return (
    <main className="flex flex-1 items-center justify-center p-12">
      <section className="max-w-2xl space-y-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]">
          Clarent Environmental
        </p>
        <h1
          className="font-medium leading-[0.95] tracking-tight"
          style={{ fontSize: "var(--text-display)" }}
        >
          Site bootstrapped.
        </h1>
        <p
          className="text-[var(--color-muted-foreground)]"
          style={{ fontSize: "var(--text-base)" }}
        >
          Stack ready: Next.js 16, React 19, Hono API, Sanity Studio at{" "}
          <code className="font-mono">/studio/</code>, Supabase, HubSpot, Resend.
        </p>
      </section>
    </main>
  );
}
