"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { isPlaceholder } from "@/lib/content";
import SectionHeading from "./SectionHeading";

function deriveFilters(projects: Project[]): string[] {
  const set = new Set<string>();
  projects.forEach((p) => set.add(p.category));
  return ["All", ...Array.from(set)];
}

export default function Projects({ projects }: { projects: Project[] }) {
  const filters = useMemo(() => deriveFilters(projects), [projects]);
  const [active, setActive] = useState("All");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const visible =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="border-b border-white/5 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Mission 03 — Projects"
          title="Featured Projects"
          description="Curated work, separate from raw GitHub activity."
        />

        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`rounded-full border px-4 py-1.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan ${
                active === f
                  ? "border-accent-blue bg-accent-blue/15 text-white"
                  : "border-white/10 text-white/60 hover:border-white/25 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <article
              key={project.id}
              className="flex flex-col justify-between rounded-lg border border-white/10 bg-charcoal-900/60 p-6 transition hover:border-white/25"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="shrink-0 rounded-full border border-accent-green/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-accent-green">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-white/40">{project.category}</p>
                <p className="mt-1 font-mono text-xs text-accent-cyan">
                  {project.status}
                </p>
                <p className="mt-3 text-sm text-white/70">
                  {project.shortDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-white/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setOpenProject(project)}
                  className="text-sm text-accent-cyan underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
                >
                  Details
                </button>
                {!isPlaceholder(project.githubUrl) && (
                  <a
                    href={project.githubUrl ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {!isPlaceholder(project.demoUrl) && (
                  <a
                    href={project.demoUrl ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline"
                  >
                    View Project
                  </a>
                )}
                {!isPlaceholder(project.demoUrlSecondary) && (
                  <a
                    href={project.demoUrlSecondary ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline"
                  >
                    Shop
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-10 text-center text-white/50">
            No projects in this category yet.
          </p>
        )}
      </div>

      {openProject && (
        <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </section>
  );
}

function ProjectModal({
  project,
  onClose
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-lg border border-white/10 bg-charcoal-900 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h3
            id="project-modal-title"
            className="font-display text-2xl font-semibold text-white"
          >
            {project.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="rounded p-1 text-white/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
          >
            ✕
          </button>
        </div>
        <p className="mt-1 font-mono text-xs text-accent-cyan">
          {project.category} · {project.status}
        </p>

        <dl className="mt-6 space-y-5 text-sm">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Problem
            </dt>
            <dd className="mt-1 text-white/70">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Solution
            </dt>
            <dd className="mt-1 text-white/70">{project.solution}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Current state
            </dt>
            <dd className="mt-1 text-white/70">{project.currentState}</dd>
          </div>
          {!isPlaceholder(project.whatRyanLearned) && (
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                What Ryan learned
              </dt>
              <dd className="mt-1 text-white/70">{project.whatRyanLearned}</dd>
            </div>
          )}
          {!isPlaceholder(project.roadmap) && (
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                Roadmap
              </dt>
              <dd className="mt-1 text-white/70">{project.roadmap}</dd>
            </div>
          )}
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Technologies
            </dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-white/60"
                >
                  {tech}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex gap-4">
          {!isPlaceholder(project.githubUrl) && (
            <a
              href={project.githubUrl ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-white/15 px-4 py-2 text-sm text-white hover:border-white/30"
            >
              View on GitHub
            </a>
          )}
          {!isPlaceholder(project.demoUrl) && (
            <a
              href={project.demoUrl ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-accent-blue px-4 py-2 text-sm text-white hover:bg-accent-blue/80"
            >
              View Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
