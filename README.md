# TRUTHSTAKE

*"Stake on truth. Challenge ambiguity. Let GenLayer machine consensus decide."*

---

A decentralized Web3 dispute and protocol arbitration protocol: operators interpret ambiguous protocol statements, back their interpretation with a GEN bond, defend against adversarial challenges citing real-world evidence, and let a GenLayer Intelligent Contract reach multi-validator consensus on the verdict.

- **Frontend:** [TruthStake App](https://truthstake.vercel.app)
- **API & Indexer:** Fastify API & Postgres Background Indexer
- **Intelligent Contract:** [`0x02e8ce1Eb09D689e51c555490BfDC6CAd922C8b3`](https://studio.genlayer.com/contract/0x02e8ce1Eb09D689e51c555490BfDC6CAd922C8b3) (GenLayer StudioNet)
- **Contract Source:** [`contracts/truthstake/contract.py`](contracts/truthstake/contract.py)
- **Security Audit:** [`docs/audit_report.md`](docs/audit_report.md) — 100% Invariants Verified

---

## Live On-Chain Deployment & Verified Transactions

The TruthStake intelligent contract is live on GenLayer StudioNet (`chainId: 61999`). All core transaction types have been executed and finalized with unanimous multi-validator consensus:

| Contract / Action | Address / Transaction Hash | StudioNet Explorer Link |
|---|---|---|
| **Intelligent Contract** | `0x02e8ce1Eb09D689e51c555490BfDC6CAd922C8b3` | [View Contract](https://studio.genlayer.com/contract/0x02e8ce1Eb09D689e51c555490BfDC6CAd922C8b3) |
| **Contract Deployment** | `0x822f130eb2981df5210031a1a2db7f0e0a31e7957f0889eadf1c09ff0b9837cf` | [View Deployment Tx](https://studio.genlayer.com/tx/0x822f130eb2981df5210031a1a2db7f0e0a31e7957f0889eadf1c09ff0b9837cf) |
| **register_protocol** | `0x957f53060854becae2ff6be635c8ded53fd25ed0a9382e31398d725587effb89` | [View Register Tx](https://studio.genlayer.com/tx/0x957f53060854becae2ff6be635c8ded53fd25ed0a9382e31398d725587effb89) |
| **create_claim** (10 GEN Bond) | `0x7f2ea5004a782a15e1d9bbbb4b847875e0aeb6e1e4df234dd7713238fc96a961` | [View Create Claim Tx](https://studio.genlayer.com/tx/0x7f2ea5004a782a15e1d9bbbb4b847875e0aeb6e1e4df234dd7713238fc96a961) |
| **submit_evidence** (Claim #1) | `0x79b710724576176235311af21063309a3501c8945124cabe35c1b02b7de3ee81` | [View Evidence Tx](https://studio.genlayer.com/tx/0x79b710724576176235311af21063309a3501c8945124cabe35c1b02b7de3ee81) |
| **submit_challenge** (10 GEN Stake) | `0xebb974a3e082ab93cfbdad92a90136a6409ef661bd325cfb1a08a4fd889b86bb` | [View Challenge Tx](https://studio.genlayer.com/tx/0xebb974a3e082ab93cfbdad92a90136a6409ef661bd325cfb1a08a4fd889b86bb) |

---

## Author & Contributor

- **Sole Author & Architect:** Single contributor project. All design, smart contract development, deterministic test harnesses, backend indexer, and user interface designed and maintained independently.

---

## Why GenLayer is Indispensable Here

TRUTHSTAKE's central action — deciding whether a claimant's interpretation of an ambiguous protocol statement is faithful, given real contradicting evidence a challenger has staked GEN against — is not a numeric price lookup, not a fixed formula, and not something either party (or a centralized operator) can be trusted to answer fairly, because both sides have a direct financial incentive to answer in their own favor.

This is exactly the class of problem GenLayer exists to solve: a judgment that requires real-world evidence and natural-language reasoning, but whose **OUTPUT must be as tamper-resistant, deterministic, and non-repudiable as a smart contract's**.

### Why Centralized Systems and Standard Oracles Fail:
1. **Centralized Operator Risk:** If a centralized server picked the verdict, that server's operator — or anyone who compromised it — could resolve every dispute in their own favor.
2. **Oracle Limitations:** Traditional oracles (Chainlink, Pyth) provide numeric data feeds, not semantic evaluation of protocol whitepapers, governance proposals, or documentation excerpts.
3. **GenLayer Solution:** GenLayer's multi-validator consensus removes single points of failure. Independent validators independently fetch live evidence, verify provenance hashes, run comparative equivalence prompts, and commit on-chain verdicts backed by validator stake.

---

## Provably Non-Authoritative Architecture

The backend and frontend are provably non-authoritative:

- **Indexer (`apps/api/src/indexer/index.ts`):** Only reads the contract (`client.readContract`) and mirrors state into Postgres CACHE tables for query efficiency. It holds no wallet, no private key, and no ability to call state-changing methods.
- **API (`apps/api/src/routes/*.ts`):** Serves cached read views. It has no route that mutates claim or verdict state.
- **Direct Wallet Signing (`apps/web/lib/contract.ts`):** Every fund-moving, state-changing action (`create_claim`, `submit_challenge`, `submit_for_judgment`, `raise_appeal`, `finalize_settlement`) is a direct, user-wallet-signed transaction to the GenLayer contract.
- **Autonomous Settlement:** Even if the API and frontend were offline, every dispute already on-chain resolves and pays out according to validator consensus.

---

## The Adversarial Dispute Lifecycle

```
[ Claimant ] ──── Locks 10+ GEN ────> [ OPEN CLAIM ]
                                            │
                                            ▼ (Adversarial Window)
[ Challenger ] ── Locks Matching GEN ─> [ CHALLENGED ]
                                            │
                                            ▼
                               [ SUBMIT FOR JUDGMENT ]
                                            │
               ┌────────────────────────────┴────────────────────────────┐
               ▼                                                         ▼
    [ Validator 1: Fetch ]                                    [ Validator 2: Fetch ]
               │                                                         │
   [ Deterministic Excerpt ]                                 [ Deterministic Excerpt ]
               │                                                         │
    [ LLM Semantic Ruling ]                                   [ LLM Semantic Ruling ]
               └────────────────────────────┬────────────────────────────┘
                                            │
                                            ▼
                           [ EQUIVALENCE CONSENSUS REACHED ]
                                            │
                                            ▼
                                 [ 24h APPEAL WINDOW ]
                                            │
                                            ▼
                          [ AUTOMATED ON-CHAIN PAYOUT ]
```

1. **Stake & Claim:** Claimant locks a minimum 10 GEN bond defending a specific interpretation of a protocol spec.
2. **Adversarial Challenge:** Anyone can stake matching GEN citing contradicting documentation, code, or governance votes.
3. **GenLayer Consensus Round:** The contract triggers independent validator web fetches. The pages are normalized, SHA-256 hashed, and excerpted deterministically without prompt-injection risk.
4. **Equivalence Principle:** Validators reach consensus on decision-relevant outcomes (verdict and payout distribution within tolerance).
5. **Appeal Round:** A 24-hour window allows triggering a fresh independent validator witness round with new evidence.
6. **Settlement:** The contract's internal `_send_gen` releases funds directly to the winning party's wallet.

---

## Project Structure

```
truthstake/
├── contracts/
│   └── truthstake/        # Intelligent Contract (contract.py)
├── apps/
│   ├── web/               # Next.js App Router frontend (Obsidian & Emerald/Violet)
│   └── api/               # Fastify backend + Postgres indexer worker
├── tests/                 # Deterministic invariant & adversarial test suite
├── scripts/               # Live integration test scripts for StudioNet
├── docs/                  # Architecture specs & formal audit report
├── deploy/                # Fly.io deployment configs & Dockerfiles
└── package.json           # pnpm monorepo root
```

---

## Getting Started

### Prerequisites
- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Python 3.10+ (for running contract invariant test suites)

### 1. Installation
```bash
pnpm install
```

### 2. Environment Setup
```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

Set the contract address and secrets in `apps/web/.env.local` and `apps/api/.env`:
```env
NEXT_PUBLIC_TRUTHSTAKE_CONTRACT_ADDRESS=0x02e8ce1Eb09D689e51c555490BfDC6CAd922C8b3
TRUTHSTAKE_CONTRACT_ADDRESS=0x02e8ce1Eb09D689e51c555490BfDC6CAd922C8b3
DATABASE_URL=postgresql://user:password@localhost:5432/truthstake
JWT_SIGNING_SECRET=your_super_secret_32_char_signing_key_here
```

### 3. Run Development Servers
```bash
# Generate Prisma Client
pnpm --filter @truthstake/api prisma:generate

# Start both Web and API in development mode
pnpm dev
```

---

## Verification & Audit Testing

### 1. Deterministic Contract Invariant & Adversarial Tests
Runs 65 tests covering SSRF prevention, deterministic HTML excerpting, griefing mitigations, and fund conservation math:
```bash
python -m unittest discover -s tests -v
```

### 2. CID & Vote Decoding Tests
```bash
node tests/test_cid.mjs
node tests/test_vote_decoding.mjs
```

---

## Security Audit Summary

A comprehensive post-build audit was conducted on `contracts/truthstake/contract.py`. Full findings are recorded in [`docs/audit_report.md`](docs/audit_report.md).

- **Format Compliance:** Strictly adheres to GenLayer Intelligent Contract format rules (`gl.Contract`, decorator usage, runner tag `# { "Depends": "py-genlayer:..." }`).
- **Web Response Handling:** Strictly decodes `.body.decode("utf-8")` as required by GenVM.
- **SSRF Defense:** Hardened URL validation blocking loopback, internal cloud metadata, CGNAT, and private network ranges.
- **Griefing Mitigation:** Enforces per-party evidence slots preventing either side from crowding out legitimate citations.
- **Economic Invariant:** Payout calculations strictly conserve deposits with zero remainder leakage.

---

## License

MIT © TruthStake. Built by the sole project author for the GenLayer ecosystem.
