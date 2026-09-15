import clsx from "clsx";
import type { ClaimStatus, Difficulty } from "@/lib/types";

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  EASY: "text-outline bg-outline/10 border-outline/30",
  AMBIGUOUS: "text-secondary bg-secondary/10 border-secondary/30",
  HARD: "text-tertiary-container bg-tertiary-container/10 border-tertiary-container/30",
  EXTREME: "text-error bg-error/10 border-error/30",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={clsx(
        "font-data-label text-data-label px-2 py-0.5 rounded uppercase border",
        DIFFICULTY_STYLES[difficulty],
      )}
    >
      {difficulty}
    </span>
  );
}

const STATUS_LABELS: Record<ClaimStatus, string> = {
  OPEN: "Open for Challenge",
  CHALLENGED: "Under Challenge",
  UNDER_REVIEW: "GenLayer Reviewing",
  PENDING_APPEAL: "Verdict Reached — Appeal Window Open",
  RESOLVED_MERGE: "Resolved — Interpretation Upheld",
  RESOLVED_REJECT: "Resolved — Challenge Won",
  RESOLVED_PARTIAL: "Resolved — Partial",
  NEEDS_HUMAN_REVIEW: "Needs Human Review",
  RESOLVED_DISPUTE_TIMEOUT: "Resolved — Timeout",
  EXPIRED: "Expired",
  WITHDRAWN: "Withdrawn",
};

export function StatusBadge({ status }: { status: ClaimStatus }) {
  const getBadgeStyle = () => {
    switch (status) {
      case "OPEN":
        return "text-primary border-primary/40 bg-primary/10";
      case "CHALLENGED":
        return "text-secondary border-secondary/40 bg-secondary/10";
      case "UNDER_REVIEW":
        return "text-tertiary border-tertiary/40 bg-tertiary/10";
      case "PENDING_APPEAL":
        return "text-tertiary border-tertiary/50 bg-tertiary/15";
      case "RESOLVED_MERGE":
        return "text-primary border-primary/50 bg-primary/20 font-semibold";
      case "RESOLVED_REJECT":
        return "text-secondary border-secondary/50 bg-secondary/20 font-semibold";
      case "NEEDS_HUMAN_REVIEW":
        return "text-error border-error/40 bg-error/10";
      default:
        return "text-on-surface-variant border-outline-variant/60 bg-surface-container-high/80";
    }
  };

  const isLive = status === "OPEN" || status === "CHALLENGED" || status === "UNDER_REVIEW";
  const pulseColor =
    status === "OPEN"
      ? "bg-primary"
      : status === "CHALLENGED"
      ? "bg-secondary"
      : "bg-tertiary";

  return (
    <span
      className={clsx(
        "font-data-label text-data-label px-2.5 py-1 rounded-md uppercase tracking-wider border flex items-center gap-2 w-fit shadow-sm",
        getBadgeStyle(),
      )}
    >
      {isLive && (
        <span className="relative flex h-2 w-2">
          <span className={clsx("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", pulseColor)} />
          <span className={clsx("relative inline-flex rounded-full h-2 w-2", pulseColor)} />
        </span>
      )}
      {STATUS_LABELS[status]}
    </span>
  );
}

export function GenAmount({ baseUnits, highlighted }: { baseUnits: string; highlighted?: boolean }) {
  const gen = Number(BigInt(baseUnits || "0")) / 1e18;
  return (
    <span
      className={clsx(
        "font-code-sm text-code-sm font-semibold",
        highlighted ? "text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" : "text-primary",
      )}
    >
      {gen.toLocaleString(undefined, { maximumFractionDigits: 2 })} GEN
    </span>
  );
}
