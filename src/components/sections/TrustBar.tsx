const ITEMS = [
  "SQG & CESQG Specialists",
  "Instant Online Quotes",
  "Licensed Vendor Network",
  "Full Compliance Documentation",
  "No Long-Term Contracts",
];

export function TrustBar() {
  return (
    <section
      className="bg-white"
      style={{
        borderTop: "1px solid var(--color-sand)",
        borderBottom: "1px solid var(--color-sand)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-6">
        <ul className="grid grid-cols-2 justify-items-center gap-x-8 gap-y-3 text-sm md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-10">
          {ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-center md:text-left"
              style={{ color: "var(--color-forest)" }}
            >
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "var(--color-orange)" }}
                aria-hidden
              />
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
