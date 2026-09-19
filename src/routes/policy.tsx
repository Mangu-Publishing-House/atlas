import { createFileRoute, Link } from "@tanstack/react-router";
import { EXAMPLES, RULES, TIERS } from "@/lib/policy";

export const Route = createFileRoute("/policy")({ component: Policy });

function Policy() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl tracking-tight">Catalog policy</h1>
      <p className="mt-2 text-muted">
        LCGFT answers what the resource <em>is</em>. It does not answer what it
        is about. Mixing the two is the most common catalog error.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-xl">Three-tier model</h2>
        <ul className="mt-4 space-y-3">
          {TIERS.map((t) => (
            <li key={t.tier} className="rounded-lg border border-border bg-surface p-4">
              <p className="font-medium">{t.tier}</p>
              <p className="mt-1 text-sm text-muted">{t.q}</p>
              <p className="mt-2 text-sm">{t.rule}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl">Normative rules</h2>
        <ol className="mt-4 space-y-4">
          {RULES.map((r) => (
            <li key={r.id} className="border-l-2 border-border pl-4">
              <p className="font-mono text-xs text-subtle">{r.id}</p>
              <h3 className="font-display text-lg">{r.title}</h3>
              <p className="mt-1 text-sm text-muted">{r.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl">Worked examples</h2>
        <ul className="mt-4 space-y-3">
          {EXAMPLES.map((ex) => (
            <li key={ex.work} className="rounded-lg border border-border bg-surface p-4">
              <p className="text-sm">{ex.work}</p>
              <p className="mt-2 flex flex-wrap gap-2">
                {ex.tags.map((tag) => (
                  <Link
                    key={tag}
                    to="/term/$slug"
                    params={{ slug: encodeURIComponent(tag) }}
                    className="rounded-full border border-border px-2.5 py-1 text-xs hover:border-accent"
                  >
                    {tag}
                  </Link>
                ))}
              </p>
              <p className="mt-2 text-xs text-subtle">{ex.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
