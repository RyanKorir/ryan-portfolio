import type { SkillsData, SkillLevel } from "@/lib/types";
import SectionHeading from "./SectionHeading";

const LEVEL_DOTS: Record<SkillLevel, number> = {
  familiar: 1,
  "working-knowledge": 2,
  "hands-on": 3,
  "project-experience": 2
};

function LevelIndicator({ level }: { level: SkillLevel }) {
  const filled = LEVEL_DOTS[level];
  return (
    <span className="flex gap-0.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i < filled ? "bg-accent-cyan" : "bg-white/15"
          }`}
        />
      ))}
    </span>
  );
}

export default function Skills({ data }: { data: SkillsData }) {
  return (
    <section id="skills" className="border-b border-white/5 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Mission 04 — Skills"
          title="Skills"
          description="Organized by area, with an honest read on depth — not every technology gets claimed as expertise."
        />

        <div className="grid gap-8 sm:grid-cols-2">
          {data.categories.map((category) => (
            <div
              key={category.id}
              className="rounded-lg border border-white/10 bg-charcoal-900/60 p-6"
            >
              <p className="font-display text-sm font-semibold uppercase tracking-wide text-white">
                {category.label}
              </p>
              <ul className="mt-4 space-y-2.5">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center justify-between text-sm text-white/70"
                  >
                    <span>{skill.name}</span>
                    <LevelIndicator level={skill.level} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-white/40">
          {Object.entries(data.levelDefinitions).map(([level, def]) => (
            <span key={level}>
              <span className="text-white/60">{level}</span>: {def}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
