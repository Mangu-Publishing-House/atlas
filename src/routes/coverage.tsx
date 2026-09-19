import { createFileRoute, Link } from "@tanstack/react-router";
import { ROMANCE_TIER1, ROMANCE_TIER2, SLICES } from "@/lib/policy";
import { STATS } from "@/lib/taxonomy";

export const Route = createFileRoute("/coverage")({ component: Coverage });

function Coverage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl tracking-tight">Coverage planning</h1>
      <p className="mt-2 text-muted">
        Alignment with ~2,800 LCGFT headings is a claim about the spine, not a
        requirement to originate a title in every music form or map type.
        Operational coverage for a trade list is Literature (
        {STATS.literature.toLocaleString()} terms in family), creative
        nonfiction, and a handful of form flags.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-xl">Default menus by list slice</h2>
        <ul className="mt-4 divide-y divide-border rounded-lg border border-border bg-surface">
          {SLICES.map((s) => (
            <li key={s.name} className="px-4 py-3">
              <p className="text-sm font-medium">{s.name}</p>
              <p className="mt-1 text-sm text-muted">{s.menu}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl">Romance — official vs house</h2>
        <p className="mt-2 text-sm text-muted">
          Romance fiction has exactly one official narrower term: Paranormal
          romance fiction. Everything else is Tier 2.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-4">
            <h3 className="text-xs uppercase tracking-wide text-subtle">
              Tier 1 (may appear in 655)
            </h3>
            <ul className="mt-3 space-y-1.5">
              {ROMANCE_TIER1.map((t) => (
                <li key={t}>
                  <Link
                    className="text-sm hover:text-accent"
                    to="/term/$slug"
                    params={{ slug: encodeURIComponent(t) }}
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4">
            <h3 className="text-xs uppercase tracking-wide text-subtle">
              Tier 2 (never LCGFT)
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {ROMANCE_TIER2.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <p className="mt-10 text-sm text-muted">
        Mix guidance: about 60 percent romance / commercial fiction / proven
        demand shelves; remainder across the literature forest and a controlled
        slice of creative nonfiction. Quality bar is not volume for its own
        sake.
      </p>
    </div>
  );
}
