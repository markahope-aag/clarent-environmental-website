"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./Logo";

interface NavItem {
  label: string;
  href: string;
}

const NAV: NavItem[] = [
  { label: "Services",     href: "/services/" },
  { label: "Industries",   href: "/industries/" },
  { label: "How It Works", href: "/how-it-works/" },
  { label: "Resources",    href: "/resources/" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur"
      style={{
        backgroundColor: "rgb(255 255 255 / 0.95)",
        borderBottom: "2px solid var(--color-orange)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" aria-label="Clarent Environmental — Home">
          <Logo size="md" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-[var(--color-orange)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="font-medium">
            <Link href="/#quote">Get a Quote</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-charcoal)] md:hidden"
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="top" className="h-[100dvh] p-6">
            <SheetHeader>
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <div className="flex items-center justify-between">
                <Logo size="md" />
              </div>
            </SheetHeader>
            <nav
              className="mt-12 flex flex-col gap-6"
              aria-label="Mobile primary"
            >
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-medium transition-colors hover:text-[var(--color-orange)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-12">
              <Button asChild className="w-full font-medium" size="lg">
                <Link href="/#quote" onClick={() => setOpen(false)}>
                  Get a Quote
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
