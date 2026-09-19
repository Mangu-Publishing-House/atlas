import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { childrenOf, getByLabel, getTerm, topIds, type Term } from "@/lib/taxonomy";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/forest")({ component: Forest });

function Node({ term, depth }: { term: Term; depth: number }) {
  const kids = childrenOf(term);
  const [open, setOpen] = useState(depth === 0);
  return (
    <li>
      <div className="flex items-start gap-1" style={{ paddingLeft: depth * 14 }}>
        {kids.length ? (
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Collapse" : "Expand"}
            className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-sm text-subtle hover:bg-elevated hover:text-fg"
            onClick={() => setOpen((o) => !o)}
          >
            <ChevronRight
              className={cn("size-4 transition-transform duration-150", open && "rotate-90")}
            />
          </button>
        ) : (
          <span className="size-8 shrink-0" />
        )}
        <Link
          to="/term/$slug"
          params={{ slug: encodeURIComponent(term.l) }}
          className="min-h-8 flex-1 py-1.5 hover:text-accent"
        >
          {term.l}
          {term.n ? (
            <span className="ml-2 font-mono text-[0.65rem] text-subtle">{term.n}</span>
          ) : null}
        </Link>
      </div>
      {open && kids.length ? (
        <ul>
          {kids.map((c) => (
            <Node key={c.i} term={c} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function Forest() {
  const literature = getByLabel("Literature");
  const [active, setActive] = useState(literature?.i ?? topIds[0] ?? 0);
  const root = getTerm(active);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl tracking-tight">Hierarchical forest</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Every authorized term under each broader term. Polyhierarchical terms
        appear under every parent. Expand a family; open a heading for the full
        record.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <div className="flex gap-2 overflow-x-auto pb-1 lg:block lg:overflow-visible">
          {topIds.map((id) => {
            const t = getTerm(id);
            if (!t) return null;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className={cn(
                  "h-10 shrink-0 truncate rounded-sm border px-3 text-left text-sm lg:mb-1 lg:w-full",
                  active === id
                    ? "border-paper bg-paper text-accent-fg"
                    : "border-border text-muted hover:text-fg",
                )}
              >
                {t.l}
              </button>
            );
          })}
        </div>
        <div className="rounded-lg border border-border bg-surface p-3 md:p-4">
          {root ? (
            <ul>
              <Node term={root} depth={0} />
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
