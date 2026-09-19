import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { has, slugify, type Term, F, isSatellite } from "@/lib/taxonomy";
import { cn } from "@/lib/utils";

export function TermChip({
  term,
  onRemove,
  compact,
}: {
  term: Term;
  onRemove?: () => void;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated pl-2.5 pr-1 py-1 text-sm",
        compact && "py-0.5 text-xs",
      )}
    >
      <Link
        to="/term/$slug"
        params={{ slug: slugify(term.l) }}
        className="hover:text-accent"
      >
        {term.l}
      </Link>
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${term.l}`}
          className="grid size-7 place-items-center rounded-full text-muted hover:bg-surface hover:text-fg"
          onClick={onRemove}
        >
          ×
        </button>
      ) : null}
    </span>
  );
}

export function FlagRow({ term }: { term: Term }) {
  const bits: { label: string; tone: "muted" | "accent" | "ok" | "warn" | "danger" | "paper" }[] =
    [];
  if (has(term, F.TOP)) bits.push({ label: "Top-level", tone: "warn" });
  if (has(term, F.POLY)) bits.push({ label: "Polyhierarchy", tone: "accent" });
  if (isSatellite(term)) bits.push({ label: "Satellite", tone: "warn" });
  if (has(term, F.CARRIER)) bits.push({ label: "Carrier / form", tone: "paper" });
  if (has(term, F.FICTION)) bits.push({ label: "Fiction", tone: "ok" });
  if (has(term, F.ROMANCE)) bits.push({ label: "Romance", tone: "ok" });
  if (!bits.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {bits.map((b) => (
        <Badge key={b.label} tone={b.tone}>
          {b.label}
        </Badge>
      ))}
    </div>
  );
}
