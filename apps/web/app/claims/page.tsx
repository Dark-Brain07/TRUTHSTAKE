"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";
import { env } from "@/lib/env";
import { contractReads } from "@/lib/contract";
import type { BackendClaim, Claim } from "@/lib/types";
import { mapBackendClaim } from "@/lib/types";
import { DifficultyBadge, StatusBadge, GenAmount } from "@/components/Badges";
import { usePolling } from "@/lib/use-polling";

const POLL_INTERVAL_MS = 8_000;

/**
 * Hunt Board reads from the backend's Postgres cache
 * (`GET /api/v1/claims`), NOT directly from GenLayer. The cache is kept
 * fresh by one centralized indexer process polling the contract every 5
 * minutes (apps/api/src/indexer) — every open browser tab polling GenLayer's
 * StudioNet RPC directly every 8s would multiply with concurrent users and
 * risk the shared RPC's rate limit; polling our own Fly-hosted API instead
 * doesn't touch GenLayer at all per page view. Contract reads/writes still
 * happen directly from the browser for anything that needs to be
 * authoritative (claim detail's action panel, create-claim).
 *
 * A claim created moments ago can be missing from that cache for up to one
 * indexer cycle. Mirrors claims/[id]/page.tsx's `reloadFromChain` fallback:
 * once per mount (never on every poll — that would recreate the exact
 * rate-limit risk the cache exists to avoid), compare the cache against
 * on-chain `get_claim_count`; any higher id the cache doesn't have yet is
 * fetched directly and merged in, so a just-created claim shows up on the
 * Hunt Board immediately instead of waiting out the indexer's cycle. The
 * next successful cache poll naturally supersedes these entries once the
 * indexer catches up (same id, cache copy wins — see the merge in `load`).
 */
export default function HuntBoardPage() {
  const [claims, setClaims] = useState<Claim[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      let cached: Claim[] = [];
      if (env.apiBaseUrl) {
        try {
          const rows = await apiGet<BackendClaim[]>("/api/v1/claims?limit=50");
          cached = rows.map(mapBackendClaim);
          setClaims((prev) => mergeClaims(cached, prev));
        } catch {
          // Backend cache is not reachable or not running — fall back to contract
        }
      }

      // Reconcile with or load directly from contract
      const totalCount = await contractReads.getClaimCount();
      const cachedIds = new Set(cached.map((c) => c.id));
      const missingIds: string[] = [];
      for (let id = totalCount; id >= 1; id--) {
        const idStr = String(id);
        if (!cachedIds.has(idStr)) missingIds.push(idStr);
      }

      if (missingIds.length > 0) {
        const fetched = await Promise.all(
          missingIds.map((id) => contractReads.getClaim(id) as Promise<Claim>),
        );
        setClaims((prev) => mergeClaims(fetched, prev));
      } else if (cached.length === 0) {
        setClaims([]);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load claims");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  usePolling(load, POLL_INTERVAL_MS);

  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const filteredClaims = claims?.filter((claim) => {
    if (filterCategory === "ALL") return true;
    if (filterCategory === "ACTIVE") return claim.status === "OPEN" || claim.status === "CHALLENGED";
    if (filterCategory === "RESOLVED") return claim.status.startsWith("RESOLVED");
    return true;
  });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 font-data-label text-xs uppercase tracking-widest text-primary mb-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live Arbitration Board
          </div>
          <h1 className="font-headline-lg text-3xl font-extrabold text-on-surface">
            Dispute Arena
          </h1>
          <p className="font-body-sm text-sm text-on-surface-variant mt-1">
            Explore active protocol interpretations, stake adversarial challenges, and track validator verdicts.
          </p>
        </div>
        <Link
          href="/claims/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-data-label text-xs uppercase tracking-wider rounded-xl font-bold shadow-md shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all self-start sm:self-center"
        >
          <span>+</span>
          <span>Stake New Claim</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "ALL", label: "All Cases" },
          { id: "ACTIVE", label: "Active Clashes (Open/Challenged)" },
          { id: "RESOLVED", label: "Resolved" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id)}
            className={`px-4 py-2 rounded-lg font-data-label text-xs uppercase tracking-wider transition-all ${
              filterCategory === tab.id
                ? "bg-primary text-on-primary font-bold shadow-sm"
                : "bg-surface-container-high/80 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest border border-outline-variant/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="border border-error/30 bg-error/10 text-error p-4 rounded-xl font-code-sm text-xs">
          {error}
        </div>
      )}

      {!claims && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 glass-card rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {filteredClaims && filteredClaims.length === 0 && (
        <div className="glass-card rounded-2xl p-14 text-center text-on-surface-variant font-body-md border border-outline-variant/60">
          <div className="text-3xl mb-3">⚖️</div>
          <div className="text-on-surface font-semibold mb-1">No investigations match this filter.</div>
          <div className="text-sm mb-4">Be the first to stake an interpretation on GenLayer.</div>
          <Link
            href="/claims/new"
            className="inline-block px-6 py-2.5 bg-primary text-on-primary font-data-label text-xs uppercase tracking-wider rounded-lg font-bold"
          >
            Stake New Claim
          </Link>
        </div>
      )}

      {filteredClaims && filteredClaims.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClaims.map((claim) => (
            <Link
              key={claim.id}
              href={`/claims/${claim.id}`}
              className="glass-card rounded-2xl flex flex-col p-5 gap-4 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-code-sm text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                    #{claim.id}
                  </span>
                  <span className="font-data-label text-xs text-on-surface font-bold uppercase tracking-wider">
                    {claim.protocol}
                  </span>
                </div>
                <DifficultyBadge difficulty={claim.difficulty} />
              </div>

              <div>
                <h3 className="font-headline-md text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {claim.subject}
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {claim.source_statement}
                </p>
              </div>

              {/* Stake balance summary pill */}
              <div className="bg-surface-container-highest/60 rounded-xl p-3 border border-outline-variant/40 space-y-1.5 mt-auto">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant text-[11px] uppercase tracking-wider font-data-label">Claim Bond</span>
                  <GenAmount baseUnits={claim.claim_bond_deposited} highlighted />
                </div>
                {claim.status === "CHALLENGED" && (
                  <div className="w-full h-1.5 rounded-full bg-surface-container-lowest overflow-hidden flex">
                    <div className="bg-primary h-full w-1/2" />
                    <div className="bg-secondary h-full w-1/2" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/40">
                <StatusBadge status={claim.status} />
                <span className="text-xs text-primary font-semibold group-hover:translate-x-0.5 transition-transform">
                  View Case →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Merges an authoritative batch of claims (`incoming`) into whatever the
 * board already had (`prev`), keyed by id. `incoming` wins on conflict —
 * used both for a fresh cache poll (cache always supersedes a stale
 * chain-only placeholder once the indexer catches up to that id) and for
 * the chain-reconciliation fallback (chain data wins over nothing, since
 * `prev` never has an entry for a still-uncached id). Sorted newest-id-first
 * to match the backend's `createdAt desc` ordering.
 */
function mergeClaims(incoming: Claim[], prev: Claim[] | null): Claim[] {
  const byId = new Map<string, Claim>();
  for (const claim of prev ?? []) byId.set(claim.id, claim);
  for (const claim of incoming) byId.set(claim.id, claim);
  return [...byId.values()].sort((a, b) => Number(b.id) - Number(a.id));
}
