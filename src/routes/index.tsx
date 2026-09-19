import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { STATS, SOURCE, terms, has, F, getByLabel } from "@/lib/taxonomy";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

const PINNED = [
  "Literature",
  "Fiction",
  "Creative nonfiction",
  "Sound recordings",
  "Instructional and educational works",
  "Religious materials",
  "Visual works",
  "Music",
];

function Home() {
  const tops = PINNED.map((l) => getByLabel(l)).filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        MANGU Publishing House
      </p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight md:text-5xl">
        Atlas
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Enterprise catalog authority for Library of Congress Genre/Form Terms.
        Search the closed graph, walk the forest, and assign 1–4 authorized
        terms to a work — without inventing headings.
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          [STATS.terms.toLocaleString(), "Preferred terms"],
          [STATS.rels.toLocaleString(), "Broader-term links"],
          [String(STATS.tops), "Top-level families"],
          [STATS.poly.toLocaleString(), "Polyhierarchical"],
        ].map(([n, l]) => (
          <div
            key={l}
            className="rounded-lg border border-border bg-surface p-4 md:p-5"
          >
            <dt className="text-xs uppercase tracking-wide text-subtle">{l}</dt>
            <dd className="mt-1 font-display text-3xl tabular-nums tracking-tight">
              {n}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/assign">
            Assign a work <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/authority">Browse authority</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/coverage">Coverage plan</Link>
        </Button>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-xl">Priority families</h2>
        <ul className="mt-4 divide-y divide-border rounded-lg border border-border bg-surface">
          {tops.map((t) => (
            <li key={t!.i}>
              <Link
                to="/term/$slug"
                params={{ slug: encodeURIComponent(t!.l) }}
                className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-elevated"
              >
                <span>{t!.l}</span>
                <span className="font-mono text-xs tabular-nums text-subtle">
                  {t!.n.toLocaleString()} descendants
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          [
            "Literature",
            STATS.literature,
            "Novels, stories, poems, plays, comics — the operational root for the list.",
          ],
          [
            "Fiction",
            STATS.fiction,
            "Commercial spine. Romance fiction has one official narrower term.",
          ],
          [
            "Comics",
            STATS.comics,
            "Manga, manhwa, graphic novels, and genre comics sit here.",
          ],
        ].map(([name, n, blurb]) => (
          <article
            key={name as string}
            className="rounded-lg border border-border bg-surface p-5"
          >
            <h3 className="font-display text-lg">{name}</h3>
            <p className="mt-1 font-mono text-sm tabular-nums text-accent">
              {(n as number).toLocaleString()} terms in family
            </p>
            <p className="mt-3 text-sm text-muted">{blurb as string}</p>
          </article>
        ))}
      </section>

      <p className="mt-12 max-w-2xl text-xs text-subtle">
        Source: {SOURCE}. {terms.filter((t) => has(t, F.TOP)).length} top-level
        terms. Closed graph — every broader term is itself authorized. LCGFT
        answers what a resource is, never what it is about.
      </p>
    </div>
  );
}
