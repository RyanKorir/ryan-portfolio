export interface Credential {
  title: string;
  detail: string;
}

export default function CredentialStrip({ items }: { items: Credential[] }) {
  return (
    <div className="relative z-10 border-y border-white/10 bg-navy-950/80 backdrop-blur">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.title} className="border-l border-white/5 px-6 py-6 first:border-l-0 sm:first:border-l lg:first:border-l-0">
            <span className="mb-3 block h-[2px] w-8 bg-accent-cyan" />
            <p className="font-display text-base font-semibold text-white sm:text-lg">{item.title}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-white/40">{item.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
