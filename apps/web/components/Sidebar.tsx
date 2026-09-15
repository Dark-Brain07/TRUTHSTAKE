import Link from "next/link";
import { WalletButton } from "./WalletButton";

const NAV_ITEMS = [
  { href: "/claims", label: "Dispute Arena", icon: "⚔️" },
  { href: "/my-cases", label: "My Staked Cases", icon: "📁" },
  { href: "/leaderboard", label: "Consensus Leaderboard", icon: "🏆" },
  { href: "/protocols", label: "Protocol Registry", icon: "🏛️" },
  { href: "/profile", label: "Operator Profile", icon: "👤" },
] as const;

const FOOTER_ITEMS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/settings", label: "Settings" },
] as const;

export function Sidebar() {
  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 h-screen z-40 py-6 w-64 bg-surface-container/95 backdrop-blur-md border-r border-outline-variant/60 shadow-xl">
      <div className="px-5 mb-6">
        <Link href="/" className="flex items-center gap-3 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <span className="text-xl">⚖️</span>
          </div>
          <div>
            <div className="font-headline-md text-lg tracking-wider font-extrabold text-on-surface flex items-center gap-1.5">
              <span>TRUTH</span>
              <span className="text-primary">STAKE</span>
            </div>
            <div className="font-data-label text-[10px] text-on-surface-variant uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              GenLayer StudioNet
            </div>
          </div>
        </Link>
        <WalletButton />
        <Link
          href="/claims/new"
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold py-2.5 px-4 rounded-lg font-data-label text-data-label shadow-md shadow-primary/20 hover:shadow-primary/40 hover:brightness-110 transition-all uppercase tracking-wider"
        >
          <span>+</span>
          <span>Stake New Claim</span>
        </Link>
      </div>

      <div className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1 font-data-label text-[10px] uppercase tracking-widest text-on-surface-variant/70">
          Navigation
        </div>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/80 border border-transparent hover:border-outline-variant/40 transition-all font-medium text-sm group"
          >
            <span className="text-base group-hover:scale-110 transition-transform">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="px-3 mt-auto pt-4 border-t border-outline-variant/40 space-y-1">
        {FOOTER_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-all"
          >
            {item.label}
          </Link>
        ))}
        <div className="pt-2 px-3">
          <div className="text-[10px] font-code-sm text-on-surface-variant/50">
            Intelligent Arbitration v0.3.11
          </div>
        </div>
      </div>
    </nav>
  );
}
