import type { BuildLabData } from "@/lib/types";
import SectionHeading from "./SectionHeading";

export default function BuildLab({ data }: { data: BuildLabData }) {
  return (
    <section id="build-lab" className="border-b border-white/5 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Mission 05 — Build Lab"
          title="Build Lab"
          description={data.intro}
        />

        <div className="grid gap-6 sm:grid-cols-3">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-accent-green/20 bg-charcoal-900/60 p-6"
            >
              <p className="font-mono text-xs text-accent-green">
                {item.status}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-white/40">{item.category}</p>
              <p className="mt-3 text-sm text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
