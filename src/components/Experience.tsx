import type { ExperienceEntry } from "@/lib/types";
import { isPlaceholder } from "@/lib/content";
import SectionHeading from "./SectionHeading";

export default function Experience({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <section id="experience" className="border-b border-white/5 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Mission 02 — Experience"
          title="Experience"
          description="Practical ICT exposure through internship work."
        />

        <div className="space-y-10">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="grid gap-6 border-l border-white/10 pl-6 sm:grid-cols-4"
            >
              <div className="sm:col-span-1">
                <p className="font-display text-lg text-white">
                  {entry.organization}
                </p>
                <p className="mt-1 text-sm text-white/50">{entry.type}</p>
                {!isPlaceholder(entry.roleLabel) && (
                  <p className="mt-1 text-sm text-accent-cyan">
                    {entry.roleLabel}
                  </p>
                )}
                {!isPlaceholder(entry.dateRange) && (
                  <p className="mt-1 font-mono text-xs text-white/40">
                    {entry.dateRange}
                  </p>
                )}
              </div>

              <div className="sm:col-span-3">
                <p className="text-white/70">{entry.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.responsibilities.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-charcoal-900/60 px-3 py-1 text-xs text-white/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {entry.networkingConcepts && entry.networkingConcepts.length > 0 && (
                  <div className="mt-4">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                      Networking concepts
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {entry.networkingConcepts.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-accent-blue/30 px-3 py-1 text-xs text-accent-cyan"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
