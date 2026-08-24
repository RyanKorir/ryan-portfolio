interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-white/60">{description}</p>
      )}
    </div>
  );
}
