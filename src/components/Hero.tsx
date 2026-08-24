"use client";

import { useEffect, useState } from "react";
import type { Profile } from "@/lib/types";

const BOOT_LINES = [
  { label: "PLAYER", getValue: (p: Profile) => p.name.toUpperCase() },
  { label: "ROLE", getValue: () => "IT / PROJECTS / AI / BUILDER" },
  { label: "LOCATION", getValue: (p: Profile) => p.location.toUpperCase() },
  { label: "SYSTEM STATUS", getValue: () => "ONLINE" }
];

export default function Hero({ profile }: { profile: Profile }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setVisibleLines(BOOT_LINES.length);
      return;
    }

    const timers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), 250 * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/5 px-6 pb-20 pt-28 sm:pt-36"
    >
      {/* subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="rounded-lg border border-white/10 bg-charcoal-900/60 p-5 font-mono text-sm">
          {BOOT_LINES.slice(0, visibleLines).map((line) => (
            <div key={line.label} className="flex gap-3 py-0.5">
              <span className="text-white/40">{line.label}:</span>
              <span
                className={
                  line.label === "SYSTEM STATUS"
                    ? "text-accent-green"
                    : "text-accent-cyan"
                }
              >
                {line.getValue(profile)}
              </span>
            </div>
          ))}
          <span
            aria-hidden
            className="mt-1 inline-block h-4 w-2 animate-pulse bg-accent-cyan align-middle"
          />
        </div>

        <h1 className="mt-10 font-display text-4xl font-semibold leading-tight text-white sm:text-6xl">
          {profile.hero.heading}
        </h1>
        <p className="mt-4 text-lg text-white/70 sm:text-xl">
          {profile.hero.subheading}
        </p>
        <p className="mt-2 max-w-xl text-white/50">
          {profile.hero.supportingText}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-md bg-accent-blue px-5 py-3 text-sm font-medium text-white transition hover:bg-accent-blue/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan"
          >
            {profile.hero.primaryCta}
          </a>
          <a
            href="#contact"
            className="rounded-md border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan"
          >
            {profile.hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
