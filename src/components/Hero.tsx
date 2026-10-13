"use client";

import { useEffect, useState } from "react";
import type { Profile } from "@/lib/types";
import Skyline from "./Skyline";

function useTypedRoles(roles: string[]) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (roles.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(roles.join(" • "));
      return;
    }

    let role = 0;
    let count = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = roles[role];
      count += deleting ? -1 : 1;
      setText(full.slice(0, count));

      let delay = deleting ? 35 : 70;
      if (!deleting && count === full.length) {
        deleting = true;
        delay = 1700;
      } else if (deleting && count === 0) {
        deleting = false;
        role = (role + 1) % roles.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [roles]);

  return text;
}

export default function Hero({ profile, githubUrl }: { profile: Profile; githubUrl?: string }) {
  const roles = profile.positioningPrimary.split(" • ").filter(Boolean);
  const typed = useTypedRoles(roles);

  const nameParts = profile.name.split(" ");
  const first = nameParts[0];
  const last = nameParts[nameParts.length - 1];

  return (
    <section
      id="top"
      className="relative flex min-h-[90vh] items-center overflow-hidden px-6 pb-40 pt-28 sm:pb-56 sm:pt-32"
    >
      <div aria-hidden className="hero-beam" />
      <Skyline />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-accent-green">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-green" />
          System status: online · {profile.location}
        </p>

        <h1
          aria-label={profile.name}
          className="mt-6 font-display font-bold uppercase leading-[0.88] tracking-tight"
        >
          <span aria-hidden className="block text-6xl text-white sm:text-8xl lg:text-9xl">
            {first}
          </span>
          <span aria-hidden className="text-outline block text-6xl sm:text-8xl lg:text-9xl">
            {last}
          </span>
        </h1>

        <p className="mt-8 font-mono text-base sm:text-lg" aria-hidden>
          <span className="text-accent-cyan/80">ryan@portfolio</span>
          <span className="text-white/40">:~$ </span>
          <span className="text-white">{typed}</span>
          <span className="caret" />
        </p>
        <p className="sr-only">{profile.positioningPrimary}</p>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
          {profile.hero.supportingText}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#projects" className="btn-clip btn-clip-primary">
            {profile.hero.primaryCta} <span aria-hidden>↗</span>
          </a>
          <a href="#contact" className="btn-clip btn-clip-ghost">
            {profile.hero.secondaryCta}
          </a>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-white/50 transition hover:text-accent-cyan"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
