export default function HowItWorksPage() {
  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full space-y-8">
      <div>
        <div className="font-data-label text-xs uppercase tracking-widest text-primary mb-1">
          Arbitration Protocol Spec
        </div>
        <h1 className="font-headline-lg text-3xl font-extrabold text-on-surface">How TruthStake Works</h1>
        <p className="font-body-md text-sm text-on-surface-variant mt-1">
          TruthStake is a decentralized protocol dispute arena where operators investigate protocol
          commitments, build competing interpretations backed by real evidence, stake GEN on their arguments,
          and let GenLayer machine consensus resolve the outcome.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="font-headline-md text-lg font-bold text-on-surface border-b border-outline-variant/60 pb-3">
          The 7-Step Protocol Lifecycle
        </h2>
        <ol className="space-y-4 font-body-md text-sm text-on-surface">
          <li className="flex items-start gap-3">
            <span className="font-code-sm text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              01
            </span>
            <div>
              <strong>Identify Protocol Ambiguity:</strong> Discover an ambiguous statement in protocol documentation,
              whitepapers, governance proposals, or smart contract behavior.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-code-sm text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              02
            </span>
            <div>
              <strong>Stake &amp; Create Claim:</strong> Publish your canonical interpretation backed by a GEN bond (min 10 GEN).
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-code-sm text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              03
            </span>
            <div>
              <strong>Adversarial Challenge Window:</strong> Other operators investigate, submit evidence URLs, and can stake
              a matching challenge against your interpretation.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-code-sm text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              04
            </span>
            <div>
              <strong>GenLayer Consensus Round:</strong> When submitted for judgment, GenLayer validators independently fetch
              the cited evidence pages live, compute deterministic excerpts, and reach consensus via LLM equivalence.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-code-sm text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              05
            </span>
            <div>
              <strong>Appeal &amp; Independent Witness Round:</strong> Reached verdicts enter a 24-hour appeal window.
              Anyone can trigger a fresh GenVM validator round with new corroborating evidence.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-code-sm text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              06
            </span>
            <div>
              <strong>Trustless Settlement:</strong> Funds automatically disperse to the winning party directly from the
              contract. No multi-sig, backend, or operator can override or steal the payout.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-code-sm text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              07
            </span>
            <div>
              <strong>On-Chain Reputation:</strong> Successful claimants and challengers earn verifiable reputation recorded
              on-chain and indexed on the seasonal leaderboards.
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
