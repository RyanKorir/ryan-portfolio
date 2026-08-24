import type { Profile } from "@/lib/types";

export default function Footer({ profile }: { profile: Profile }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-white/40 sm:flex-row">
        <span>
          © {year} {profile.name}
        </span>
        <span className="text-accent-green">SYSTEM STATUS: ONLINE</span>
      </div>
    </footer>
  );
}
