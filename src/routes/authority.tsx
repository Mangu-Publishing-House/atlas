import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { F, has, isSatellite, searchTerms, terms, type Term } from "@/lib/taxonomy";

export const Route = createFileRoute("/authority")({ component: Authority });

const FILTERS = [
  { id: "all", label: "All" },
  { id: "lit", label: "Literature" },
  { id: "fic", label: "Fiction" },
  { id: "rom", label: "Romance" },
  { id: "poly", label: "Polyhierarchy" },
  { id: "top", label: "Top-level" },
] as const;

function matchFilter(t: Term, f: string): boolean {
  if (f === "lit") return has(t, F.LIT);
  if (f === "fic") return has(t, F.FICTION);
  if (f === "rom") return has(t, F.ROMANCE);
  if (f === "poly") return has(t, F.POLY);
  if (f === "top") return has(t, F.TOP);
  return true;
}

function Authority() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [page, setPage] = useState(0);
  const pageSize = 40;

  const rows = useMemo(() => {
    const base = q.trim() ? searchTerms(q, 400) : terms;
    return base.filter((t) => matchFilter(t, filter));
  }, [q, filter]);

  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const slice = rows.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl tracking-tight">Authority file</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Every authorized preferred term. Type exactly — including parentheses
        and diacritics. This table is the spell-check source for the engine.
      </p>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(0);
          }}
          placeholder="Filter preferred terms"
          aria-label="Filter preferred terms"
          className="md:max-w-sm"
        />
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setFilter(f.id);
                setPage(0);
              }}
              className={`h-9 rounded-full border px-3 text-xs ${
                filter === f.id
                  ? "border-paper bg-paper text-accent-fg"
                  : "border-border text-muted hover:text-fg"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs tabular-nums text-subtle">
        {rows.length.toLocaleString()} terms
      </p>

      <div className="mt-3 overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-subtle">
            <tr>
              <th className="px-3 py-2 font-medium">Preferred term</th>
              <th className="px-3 py-2 font-medium">Depth</th>
              <th className="px-3 py-2 font-medium">NT</th>
              <th className="px-3 py-2 font-medium">Flags</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((t) => (
              <tr key={t.i} className="border-t border-border hover:bg-elevated/50">
                <td className="px-3 py-2.5">
                  <Link
                    to="/term/$slug"
                    params={{ slug: encodeURIComponent(t.l) }}
                    className="hover:text-accent"
                  >
                    {t.l}
                  </Link>
                </td>
                <td className="px-3 py-2.5 font-mono tabular-nums text-muted">
                  {t.d}
                </td>
                <td className="px-3 py-2.5 font-mono tabular-nums text-muted">
                  {t.nt.length}
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {has(t, F.POLY) ? <Badge tone="accent">poly</Badge> : null}
                    {has(t, F.TOP) ? <Badge tone="warn">top</Badge> : null}
                    {isSatellite(t) ? <Badge tone="warn">sat</Badge> : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <button
          type="button"
          className="h-11 px-3 text-muted disabled:opacity-30"
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
        >
          Previous
        </button>
        <span className="tabular-nums text-subtle">
          {page + 1} / {pages}
        </span>
        <button
          type="button"
          className="h-11 px-3 text-muted disabled:opacity-30"
          disabled={page >= pages - 1}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
