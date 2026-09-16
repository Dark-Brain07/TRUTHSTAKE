"use client";

import Link from "next/link";
import { useWallet } from "@/lib/wallet-context";

function truncate(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function MobileHeader() {
  const { address, isConnecting, connect } = useWallet();

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-surface-container/95 backdrop-blur-md border-b border-outline-variant/60 md:hidden">
      <Link href="/" className="flex items-center gap-2 font-headline-md font-bold text-on-surface">
        <div className="w-8 h-8 rounded-lg overflow-hidden border border-outline-variant/60 shadow-sm flex items-center justify-center">
          <img src="/logo-mark.png" alt="TruthStake" className="w-full h-full object-cover" />
        </div>
        <span className="tracking-wider">TRUTH<span className="text-primary">STAKE</span></span>
      </Link>
      <button
        onClick={address ? undefined : connect}
        disabled={isConnecting}
        className="font-data-label text-xs bg-surface-container-highest text-primary px-3 py-1.5 rounded-lg border border-outline-variant hover:border-primary/50 transition-colors disabled:opacity-60"
      >
        {address ? truncate(address) : isConnecting ? "Connecting…" : "Connect Wallet"}
      </button>
    </header>
  );
}
