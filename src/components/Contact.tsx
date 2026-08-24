import type { SiteConfig } from "@/lib/types";
import { isPlaceholder } from "@/lib/content";
import SectionHeading from "./SectionHeading";

export default function Contact({ config }: { config: SiteConfig }) {
  const { contact } = config;

  const channels = [
    {
      label: "Email",
      value: contact.email,
      href: isPlaceholder(contact.email) ? null : `mailto:${contact.email}`
    },
    {
      label: "GitHub",
      value: contact.github,
      href: isPlaceholder(contact.github) ? null : contact.github
    },
    {
      label: "LinkedIn",
      value: contact.linkedin,
      href: isPlaceholder(contact.linkedin) ? null : contact.linkedin
    },
    {
      label: "Phone",
      value: contact.phone,
      href: isPlaceholder(contact.phone) ? null : `tel:${contact.phone}`
    }
  ];

  const confirmed = channels.filter((c) => c.href);

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          eyebrow="Mission 06 — Contact"
          title="Let's Connect"
          description="Open to opportunities across IT, project coordination, and software/AI building."
        />

        {confirmed.length > 0 ? (
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {confirmed.map((c) => (
              <a
                key={c.label}
                href={c.href ?? "#"}
                target={c.label === "Email" || c.label === "Phone" ? undefined : "_blank"}
                rel={c.label === "Email" || c.label === "Phone" ? undefined : "noreferrer"}
                className="rounded-md border border-white/15 px-5 py-3 text-sm text-white transition hover:border-accent-cyan hover:text-accent-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
              >
                {c.label}
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-md border border-white/10 bg-charcoal-900/60 px-5 py-4 text-sm text-white/50">
            Contact details are being finalized — check back soon.
          </p>
        )}

        {!isPlaceholder(contact.handle) && (
          <p className="mt-6 font-mono text-xs text-white/40">
            {contact.handle}
          </p>
        )}
      </div>
    </section>
  );
}
