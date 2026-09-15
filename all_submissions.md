# GenLayer Points Portal Submissions: TruthStake

This document contains pre-formatted submission entries for the GenLayer Points Portal, prepared in strict compliance with official category and explorer link rules.

---

## 1. Projects & Milestones Category

**Portal Category:** `Projects & Milestones` (20–4,000 pts)  
**Primary Tag:** `Dispute Resolution`  
**Secondary Tag:** `AI & Agents`  
**Focus Sub-Tags:** `Protocol Experiment`, `Dataset Verification`

### Title
**TruthStake — Protocol Dispute & Semantic Arbitration Arena on GenLayer**

### Links
- **Live DApp:** https://truthstake.vercel.app
- **Repository:** https://github.com/Dark-Brain07/TRUTHSTAKE
- **Contract Address:** `0x02e8ce1Eb09D689e51c555490BfDC6CAd922C8b3`
- **Explorer Link:** [View on GenLayer Studio](https://explorer-studio.genlayer.com/address/0x02e8ce1Eb09D689e51c555490BfDC6CAd922C8b3)

### Description
TruthStake is a decentralized Web3 protocol dispute and semantic interpretation arena powered by GenLayer's Equivalence Principle. 

In decentralized ecosystems, protocol documentation, governance proposals, and architectural invariants frequently contain ambiguities that lead to high-stakes arguments, contested liquidations, or conflicting claims. Traditional numeric oracles cannot parse English documentation, and centralized arbiters create severe counterparty risk.

TruthStake resolves this through an adversarial staking mechanism governed directly by GenLayer Intelligent Validators:
1. **Bonded Claim Staking:** An operator stakes a GEN bond asserting a specific factual or technical claim regarding a protocol's behavior (e.g., Uniswap v4 hook execution bitmasks or Aave v3 isolation debt ceilings).
2. **Adversarial Counter-Staking:** Anyone can challenge an active claim by depositing matching GEN and submitting real-world evidence (documentation URLs, commit links, official specs).
3. **GenLayer Multi-Validator Consensus:** The Intelligent Contract (`contracts/truthstake/contract.py`) triggers GenVM validators to independently fetch evidence pages (`gl.nondet.web.get`), compute deterministic byte hashes (`SHA-256`), normalize text, and evaluate natural-language semantic equivalence via LLM consensus (`strict_eq` and bucketed payout tolerance).
4. **Autonomous Non-Custodial Settlement:** Stakes are automatically disbursed directly to the winning party's wallet on-chain without any custodial intermediary or centralized off-chain backend.

The platform includes a Next.js 14 frontend deployed live on Vercel, a Fastify read-only indexer, and a 65-test deterministic and adversarial test suite covering SSRF defense, prompt-injection immunity, and slot griefing mitigations.

---

## 2. Tools & Infrastructure Category

**Portal Category:** `Tools & Infrastructure` (50–2,500 pts)  
**Primary Tag:** `Dispute Resolution`  
**Secondary Tag:** `AI & Agents`

#### TruthStake Intelligent Contract

**Title:** TruthStake Intelligent Dispute Arbiter & Evidence Consensus Engine
**Description:**
TruthStake is an intelligent smart contract (`class TruthStake(gl.Contract)`) deployed on GenLayer StudioNet that provides autonomous, multi-validator semantic judgment over complex real-world claims. The contract features a deterministic evidence normalization pipeline, per-party evidence slot protection against griefing attacks, robust URL sanitization (`_is_safe_evidence_url`), SHA-256 provenance hashing, and equivalence consensus verification across independent GenVM validators. Payout conservation is strictly enforced at the byte level with zero funds locked in unresolved states.

- **Contract Address:** `0x02e8ce1Eb09D689e51c555490BfDC6CAd922C8b3`
- **Explorer Link:** [View on GenLayer Studio](https://explorer-studio.genlayer.com/address/0x02e8ce1Eb09D689e51c555490BfDC6CAd922C8b3)
- **Source Code:** [View on GitHub](https://github.com/Dark-Brain07/TRUTHSTAKE/blob/main/contracts/truthstake/contract.py)

---

## 3. Documentation & Educational Content Category

**Portal Category:** `Documentation / Educational Content`  
**Primary Tag:** `Developer Tools`  
**Secondary Tag:** `Dispute Resolution`

### Title
**TruthStake Architecture, Threat Model & Security Audit**

### Links
- **Architecture & Invariant Spec:** https://github.com/Dark-Brain07/TRUTHSTAKE/blob/main/README.md
- **Security Audit & Invariant Verification:** https://github.com/Dark-Brain07/TRUTHSTAKE/blob/main/docs/audit_report.md
- **Evidence Packet & Proof Matrix:** https://github.com/Dark-Brain07/TRUTHSTAKE/blob/main/docs/evidence-packet.md
- **GenLayer Integration & Capability Matrix:** https://github.com/Dark-Brain07/TRUTHSTAKE/blob/main/docs/genlayer.md

### Description
Comprehensive technical documentation, security audit, and formal analysis detailing how GenLayer's Equivalence Principle is practically applied to adversarial arbitration. Details the mathematical proofs for partial payout conservation, SSRF defense mechanics against host evasion, prompt-injection isolation techniques, and the complete step-by-step verification runbook for independent researchers.

---

## 4. Live On-Chain Transaction Proofs (GenLayer StudioNet)

| Transaction Action | Transaction Hash | StudioNet Explorer Link |
|---|---|---|
| **Contract Deployment** | `0x822f130eb2981df5210031a1a2db7f0e0a31e7957f0889eadf1c09ff0b9837cf` | [View Deployment Tx](https://studio.genlayer.com/tx/0x822f130eb2981df5210031a1a2db7f0e0a31e7957f0889eadf1c09ff0b9837cf) |
| **register_protocol** | `0x957f53060854becae2ff6be635c8ded53fd25ed0a9382e31398d725587effb89` | [View Register Tx](https://studio.genlayer.com/tx/0x957f53060854becae2ff6be635c8ded53fd25ed0a9382e31398d725587effb89) |
| **create_claim** (10 GEN Bond) | `0x7f2ea5004a782a15e1d9bbbb4b847875e0aeb6e1e4df234dd7713238fc96a961` | [View Create Claim Tx](https://studio.genlayer.com/tx/0x7f2ea5004a782a15e1d9bbbb4b847875e0aeb6e1e4df234dd7713238fc96a961) |
| **submit_evidence** (Claim #1) | `0x79b710724576176235311af21063309a3501c8945124cabe35c1b02b7de3ee81` | [View Evidence Tx](https://studio.genlayer.com/tx/0x79b710724576176235311af21063309a3501c8945124cabe35c1b02b7de3ee81) |
| **submit_challenge** (10 GEN Stake) | `0xebb974a3e082ab93cfbdad92a90136a6409ef661bd325cfb1a08a4fd889b86bb` | [View Challenge Tx](https://studio.genlayer.com/tx/0xebb974a3e082ab93cfbdad92a90136a6409ef661bd325cfb1a08a4fd889b86bb) |
