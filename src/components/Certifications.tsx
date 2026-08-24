import type { CertificationsData } from "@/lib/types";
import SectionHeading from "./SectionHeading";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export default function Certifications({ data }: { data: CertificationsData }) {
  return (
    <section id="certifications" className="border-b border-white/5 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Verified Credentials"
          title="Certifications"
          description={data.intro}
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Completed
            </p>
            <div className="mt-4 space-y-4">
              {data.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-lg border border-accent-cyan/20 bg-charcoal-900/60 p-5"
                >
                  <p className="font-display text-base font-semibold text-white">
                    {cert.title}
                  </p>
                  <p className="mt-1 text-sm text-white/60">{cert.issuer}</p>
                  <p className="mt-2 font-mono text-xs text-accent-cyan">
                    Completed {formatDate(cert.date)}
                  </p>
                  <p className="mt-1 truncate font-mono text-[10px] text-white/30">
                    ID: {cert.credentialId}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Coursework in progress
            </p>
            <ul className="mt-4 space-y-2">
              {data.modulesInProgress.map((mod) => (
                <li
                  key={mod.title}
                  className="flex items-center justify-between rounded-md border border-white/10 px-4 py-2.5 text-sm"
                >
                  <span className="text-white/70">{mod.title}</span>
                  <span className="font-mono text-xs text-white/40">
                    {formatDate(mod.issuedOn)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
