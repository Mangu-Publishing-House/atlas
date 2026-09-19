import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlagRow } from "@/components/term-chip";
import {
  breadcrumb,
  childrenOf,
  familyLabels,
  fromSlug,
  parentsOf,
} from "@/lib/taxonomy";
import { useAssign } from "@/store/assign";

export const Route = createFileRoute("/term/$slug")({ component: TermPage });

function TermPage() {
  const { slug } = Route.useParams();
  const term = fromSlug(slug);
  const addTag = useAssign((s) => s.addTag);

  if (!term) {
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl">Unknown heading</h1>
        <p className="mt-2 text-muted">
          “{decodeURIComponent(slug)}” is not in this snapshot.
        </p>
        <Button asChild className="mt-6">
          <Link to="/authority">Return to authority</Link>
        </Button>
      </div>
    );
  }

  const crumbs = breadcrumb(term);
  const parents = parentsOf(term);
  const kids = childrenOf(term);
  const families = familyLabels(term);

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs text-subtle">
        {crumbs.map((c, i) => (
          <span key={c.i} className="flex items-center gap-1">
            {i > 0 ? <span>/</span> : null}
            <Link
              to="/term/$slug"
              params={{ slug: encodeURIComponent(c.l) }}
              className="hover:text-fg"
            >
              {c.l}
            </Link>
          </span>
        ))}
      </nav>

      <p className="text-xs uppercase tracking-[0.16em] text-subtle">
        Preferred term
      </p>
      <h1 className="mt-1 font-display text-3xl tracking-tight md:text-4xl">
        {term.l}
      </h1>
      <div className="mt-4">
        <FlagRow term={term} />
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-md border border-border bg-surface p-3">
          <dt className="text-xs text-subtle">Depth</dt>
          <dd className="font-mono tabular-nums">{term.d}</dd>
        </div>
        <div className="rounded-md border border-border bg-surface p-3">
          <dt className="text-xs text-subtle">Direct NT</dt>
          <dd className="font-mono tabular-nums">{term.nt.length}</dd>
        </div>
        <div className="rounded-md border border-border bg-surface p-3">
          <dt className="text-xs text-subtle">Descendants</dt>
          <dd className="font-mono tabular-nums">{term.n}</dd>
        </div>
      </dl>

      {families.length ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {families.map((f) => (
            <Badge key={f}>{f}</Badge>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" onClick={() => addTag(term.l)}>
          Add to assignment
        </Button>
        <Button asChild variant="outline">
          <Link to="/assign">Open assign</Link>
        </Button>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-lg">Broader term{parents.length === 1 ? "" : "s"}</h2>
        {parents.length === 0 ? (
          <p className="mt-2 text-sm text-muted">Top-level — no broader term.</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {parents.map((p) => (
              <li key={p.i}>
                <Link
                  className="text-sm hover:text-accent"
                  to="/term/$slug"
                  params={{ slug: encodeURIComponent(p.l) }}
                >
                  {p.l}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg">Narrower terms</h2>
        {kids.length === 0 ? (
          <p className="mt-2 text-sm text-muted">Leaf heading — no narrower terms.</p>
        ) : (
          <ul className="mt-2 columns-1 gap-x-8 sm:columns-2">
            {kids.map((c) => (
              <li key={c.i} className="break-inside-avoid py-1">
                <Link
                  className="text-sm hover:text-accent"
                  to="/term/$slug"
                  params={{ slug: encodeURIComponent(c.l) }}
                >
                  {c.l}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10 rounded-lg border border-border bg-surface p-5">
        <h2 className="font-display text-lg">Encoding</h2>
        <pre className="mt-3 overflow-x-auto font-mono text-xs text-muted">
{`655  7 $a ${term.l}. $2 lcgft
work.lcgft[]: "${term.l}"`}
        </pre>
      </section>
    </div>
  );
}
