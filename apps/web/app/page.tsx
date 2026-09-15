import Link from "next/link";

const PROTOCOL_STEPS = [
  {
    num: "01",
    title: "Stake & Claim",
    desc: "Lock GEN backing an exact interpretation of a protocol spec, whitepaper, or governance rule.",
    icon: "📜",
    tag: "Claimant Bond",
  },
  {
    num: "02",
    title: "Adversarial Challenge",
    desc: "Challengers stake matching GEN presenting contradicting URLs, transactions, or official statements.",
    icon: "⚔️",
    tag: "Evidence Staked",
  },
  {
    num: "03",
    title: "GenLayer Consensus",
    desc: "Independent GenVM validators fetch evidence pages, hash provenance, and evaluate natural language equivalence.",
    icon: "🧠",
    tag: "Strict Equivalence",
  },
  {
    num: "04",
    title: "On-Chain Settlement",
    desc: "Contract distributes pooled stakes and updates verifiable on-chain reputation automatically.",
    icon: "⚡",
    tag: "Instant Payout",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 sm:px-12 border-b border-outline-variant/60 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary font-data-label text-xs uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>GenLayer StudioNet • Intelligent Arbitration</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
            Decentralized Protocol Disputes. <br />
            <span className="text-gradient-hero">Settled by Machine Consensus.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-on-surface-variant font-body-md text-base sm:text-lg leading-relaxed">
            Stake GEN on your interpretation of ambiguous protocol specifications. Defend against adversarial
            counter-claims with verified evidence. Let GenLayer&apos;s multi-validator LLM consensus deliver
            tamper-proof on-chain verdicts without centralized oracles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/claims"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-data-label text-sm uppercase tracking-wider rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all"
            >
              Enter Dispute Arena ⚔️
            </Link>
            <Link
              href="/claims/new"
              className="w-full sm:w-auto px-8 py-3.5 bg-surface-container-high/90 text-on-surface hover:text-primary font-data-label text-sm uppercase tracking-wider rounded-xl border border-outline-variant hover:border-primary/40 transition-all font-semibold"
            >
              Stake New Claim +
            </Link>
          </div>

          {/* Interactive Live Dispute Arena Showcase Card */}
          <div className="pt-10 max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl p-6 text-left shadow-2xl relative overflow-hidden border border-outline-variant/80">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/60 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-primary/10 border border-primary/30 text-primary rounded-md font-data-label text-xs uppercase font-bold">
                    ACTIVE DUEL #01
                  </span>
                  <span className="text-sm font-semibold text-on-surface">Uniswap v4: PoolManager Hook Architecture</span>
                </div>
                <div className="flex items-center gap-2 font-data-label text-xs text-secondary bg-secondary/10 px-3 py-1 rounded-md border border-secondary/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
                  <span>Challenged • 20.00 GEN Pool</span>
                </div>
              </div>

              <p className="text-sm text-on-surface-variant font-body-md mb-5 leading-relaxed">
                &quot;Hook contract addresses encode execution permission bitmasks into the address prefix itself,
                enforcing deterministic validation during pool creation.&quot;
              </p>

              {/* Stake balance ratio bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-code-sm">
                  <span className="text-primary font-semibold">Claimant Stake: 10.00 GEN (50%)</span>
                  <span className="text-secondary font-semibold">Challenger Stake: 10.00 GEN (50%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-surface-container-lowest overflow-hidden flex">
                  <div className="bg-primary h-full w-1/2" />
                  <div className="bg-secondary h-full w-1/2" />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-outline-variant/40 flex flex-wrap items-center justify-between gap-3 text-xs font-code-sm text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span>🏛️ Evidence Verified:</span>
                  <span className="text-on-surface font-semibold">docs.uniswap.org (SHA-256 Hashed)</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <span>🤖 GenVM Verdict:</span>
                  <span className="font-semibold">Equivalence Consensus Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Metrics Grid */}
      <section className="px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card rounded-xl p-5 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-primary font-headline-lg mb-1">
              100%
            </div>
            <div className="font-data-label text-xs uppercase tracking-wider text-on-surface-variant">
              Validator Equivalence
            </div>
          </div>
          <div className="glass-card rounded-xl p-5 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-secondary font-headline-lg mb-1">
              0 Oracles
            </div>
            <div className="font-data-label text-xs uppercase tracking-wider text-on-surface-variant">
              Decentralized GenVM
            </div>
          </div>
          <div className="glass-card rounded-xl p-5 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-tertiary font-headline-lg mb-1">
              24h
            </div>
            <div className="font-data-label text-xs uppercase tracking-wider text-on-surface-variant">
              Appeal Witness Window
            </div>
          </div>
          <div className="glass-card rounded-xl p-5 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-on-surface font-headline-lg mb-1">
              Non-Custodial
            </div>
            <div className="font-data-label text-xs uppercase tracking-wider text-on-surface-variant">
              Direct Wallet Settlement
            </div>
          </div>
        </div>
      </section>

      {/* 4-Stage Operational Loop */}
      <section className="px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block font-data-label text-xs uppercase tracking-widest text-primary mb-2">
            The Truth Verification Lifecycle
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
            How TruthStake Resolves Ambiguity
          </h2>
          <p className="max-w-2xl mx-auto text-on-surface-variant text-sm mt-2">
            Traditional smart contracts cannot parse complex documentation or resolve nuanced governance disputes.
            TruthStake leverages GenLayer&apos;s Equivalence Principle to bridge the gap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROTOCOL_STEPS.map((step) => (
            <div
              key={step.num}
              className="glass-card rounded-xl p-6 flex flex-col justify-between hover:border-primary/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="font-code-sm text-xs px-2 py-0.5 rounded bg-surface-container-highest text-primary font-bold">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-headline-md text-base font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-on-surface-variant font-body-sm">
                  {step.desc}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-outline-variant/40">
                <span className="font-data-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action footer banner */}
      <section className="px-6 sm:px-12 max-w-5xl mx-auto text-center">
        <div className="glass-card rounded-2xl p-10 sm:p-14 border border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-transparent pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-4">
            Ready to challenge or defend protocol truth?
          </h2>
          <p className="max-w-xl mx-auto text-on-surface-variant text-sm sm:text-base mb-8 leading-relaxed">
            Browse the active disputes across Uniswap, EigenLayer, Aave, and more. Put your analysis to work with real on-chain stake.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/claims"
              className="px-8 py-3 bg-primary text-on-primary font-data-label text-sm uppercase tracking-wider rounded-xl font-bold hover:bg-primary-fixed-dim transition-all shadow-md shadow-primary/20"
            >
              Browse Active Disputes
            </Link>
            <Link
              href="/how-it-works"
              className="px-8 py-3 bg-surface-container-highest text-on-surface font-data-label text-sm uppercase tracking-wider rounded-xl border border-outline-variant hover:border-on-surface transition-all"
            >
              Read Architecture Spec
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
