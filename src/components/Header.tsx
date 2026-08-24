"use client";

import { useState } from "react";
import type { Profile } from "@/lib/types";

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#build-lab", label: "Build Lab" },
  { href: "#contact", label: "Contact" }
];

export default function Header({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-navy-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-widest text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
        >
          {initials}
          <span className="text-accent-cyan">.</span>
        </a>

        <nav className="hidden gap-8 sm:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/70 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
        >
          <span className="sr-only">Toggle menu</span>
          <span
            className={`h-px w-5 bg-white transition ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-white transition ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-1 border-t border-white/5 bg-navy-950 px-6 py-4 sm:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
