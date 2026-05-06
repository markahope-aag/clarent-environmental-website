import Link from "next/link";
import { Logo } from "./Logo";

interface FooterLink {
  label: string;
  href: string;
}

const SERVICE_LINKS: FooterLink[] = [
  { label: "Paint & Solvent Waste",  href: "/services/paint-solvent/" },
  { label: "Used Oil & Filters",     href: "/services/used-oil/" },
  { label: "Universal Waste",        href: "/services/universal/" },
  { label: "Contaminated Materials", href: "/services/contaminated/" },
  { label: "Lab Pack Disposal",      href: "/services/lab-pack/" },
  { label: "Emergency Response",     href: "/services/emergency/" },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "How It Works", href: "/how-it-works/" },
  { label: "Industries",   href: "/industries/" },
  { label: "Resources",    href: "/resources/" },
  { label: "About",        href: "/about/" },
  { label: "Contact",      href: "/contact/" },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-charcoal)", color: "#FFFFFF" }}>
      {/* Top accent border */}
      <div style={{ height: "4px", backgroundColor: "var(--color-orange)" }} />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand column */}
          <div>
            <Logo size="md" variant="white" />
            <p className="mt-6 text-2xl font-medium leading-tight">
              Compliance made simple.
            </p>
            <p className="mt-3 text-white/70">
              Hazardous waste disposal for small businesses.
            </p>
            <address className="mt-6 not-italic text-sm text-white/60 leading-relaxed">
              2921 Landmark Place, Suite 215
              <br />
              Madison, WI 53713
            </address>
          </div>

          {/* Services column */}
          <FooterColumn heading="Services" links={SERVICE_LINKS} />

          {/* Company column */}
          <FooterColumn heading="Company" links={COMPANY_LINKS} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/60">
            © 2026 Clarent Environmental LLC. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/60">
            <Link href="/privacy/" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms/" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
        {heading}
      </h3>
      <ul className="mt-6 space-y-3 text-sm text-white/70">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
