import type { Profile } from "@/lib/types";
import SectionHeading from "./SectionHeading";

export default function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="border-b border-white/5 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Mission 01 — Who Am I" title="About" />

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="text-white/70 leading-relaxed">{profile.story}</p>

            <div className="mt-8 rounded-lg border border-white/10 bg-charcoal-900/60 p-5 font-mono text-sm text-accent-cyan">
              {profile.philosophy}
            </div>

            <div className="mt-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                Education
              </p>
              <p className="mt-2 text-white">{profile.education.degree}</p>
              <p className="text-white/60">{profile.education.institution}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.education.relevantAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              How I Build
            </p>
            <ol className="mt-4 space-y-6">
              {profile.howIBuild.map((step) => (
                <li key={step.step} className="flex gap-4">
                  <span className="font-display text-lg text-accent-blue">
                    {step.step}
                  </span>
                  <div>
                    <p className="font-medium text-white">{step.title}</p>
                    <p className="text-sm text-white/60">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
