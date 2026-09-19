import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TermChip } from "@/components/term-chip";
import {
  getByLabel,
  searchTerms,
  validateAssignment,
  type Carrier,
} from "@/lib/taxonomy";
import { ROMANCE_TIER2 } from "@/lib/policy";
import { useAssign } from "@/store/assign";

export const Route = createFileRoute("/assign")({ component: Assign });

const CARRIERS: { id: Carrier; label: string }[] = [
  { id: "print", label: "Print" },
  { id: "ebook", label: "EPUB" },
  { id: "audio", label: "Audiobook" },
  { id: "other", label: "Other" },
];

function Assign() {
  const {
    current,
    saved,
    hydrate,
    setField,
    addTag,
    removeTag,
    addFacet,
    removeFacet,
    save,
    load,
    reset,
    removeSaved,
  } = useAssign();
  const [q, setQ] = useState("");
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  const hits = useMemo(() => (q.trim() ? searchTerms(q, 8) : []), [q]);
  const issues = useMemo(
    () => validateAssignment(current.tags, { carrier: current.carrier }),
    [current.tags, current.carrier],
  );
  const errors = issues.filter((i) => i.level === "error");
  const ok = errors.length === 0 && current.tags.length > 0;

  const marc = current.tags.map((t) => `655  7 $a ${t}. $2 lcgft`).join("\n");
  const json = JSON.stringify(
    {
      title: current.title || null,
      language: current.language,
      carrier: current.carrier,
      "work.lcgft": current.tags,
      "work.lcgft_primary": current.tags[0] ?? null,
      "work.mangu_facets": current.facets,
    },
    null,
    2,
  );

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Assign</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Tag a work with 1–4 official LCGFT terms. Tropes and heat stay in
          Tier 2. Language editions share Tier 1.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Working title</span>
            <Input
              value={current.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="Title of the work"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Language (BCP 47 / ISO)</span>
            <Input
              value={current.language}
              onChange={(e) => setField("language", e.target.value)}
              placeholder="eng"
            />
          </label>
        </div>

        <fieldset className="mt-4">
          <legend className="mb-2 text-sm text-muted">Carrier</legend>
          <div className="flex flex-wrap gap-2">
            {CARRIERS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setField("carrier", c.id)}
                className={`h-11 rounded-sm border px-4 text-sm ${
                  current.carrier === c.id
                    ? "border-paper bg-paper text-accent-fg"
                    : "border-border text-muted hover:text-fg"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6">
          <label className="text-sm text-muted">Add LCGFT term</label>
          <Input
            className="mt-1.5"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Start typing a preferred term"
            onKeyDown={(e) => {
              if (e.key === "Enter" && hits[0]) {
                e.preventDefault();
                addTag(hits[0].l);
                setQ("");
              }
            }}
          />
          {hits.length > 0 ? (
            <ul className="mt-1 overflow-hidden rounded-md border border-border bg-surface">
              {hits.map((t) => (
                <li key={t.i}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-elevated"
                    onClick={() => {
                      addTag(t.l);
                      setQ("");
                    }}
                  >
                    {t.l}
                    <span className="font-mono text-[0.65rem] text-subtle">d{t.d}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {current.tags.length === 0 ? (
            <p className="text-sm text-subtle">No Tier 1 terms yet.</p>
          ) : (
            current.tags.map((label) => {
              const t = getByLabel(label);
              return t ? (
                <TermChip key={label} term={t} onRemove={() => removeTag(label)} />
              ) : (
                <Badge key={label} tone="danger">
                  {label}
                </Badge>
              );
            })
          )}
        </div>

        <div className="mt-8">
          <h2 className="font-display text-lg">Tier 2 — house facets</h2>
          <p className="mt-1 text-sm text-muted">Never exported as 655 $2 lcgft.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ROMANCE_TIER2.map((f) => {
              const on = current.facets.includes(f);
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => (on ? removeFacet(f) : addFacet(f))}
                  className={`h-9 rounded-full border px-3 text-xs ${
                    on
                      ? "border-accent bg-accent/15 text-fg"
                      : "border-border text-muted"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <section className="mt-8 space-y-2">
          <h2 className="font-display text-lg">Validator</h2>
          {issues.length === 0 ? (
            <p className="text-sm text-ok">No issues. Ready to encode.</p>
          ) : (
            issues.map((iss, i) => (
              <p
                key={i}
                className={`rounded-md border px-3 py-2 text-sm ${
                  iss.level === "error"
                    ? "border-danger/40 text-danger"
                    : iss.level === "warn"
                      ? "border-warn/40 text-warn"
                      : "border-border text-muted"
                }`}
              >
                <span className="mr-2 font-mono text-[0.65rem] uppercase">{iss.level}</span>
                {iss.message}
              </p>
            ))
          )}
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={() => save()} disabled={!current.tags.length}>
            Save draft
          </Button>
          <Button type="button" variant="outline" onClick={() => reset()}>
            New record
          </Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-4">
            <h3 className="text-xs uppercase tracking-wide text-subtle">MARC</h3>
            <pre className="mt-2 overflow-x-auto font-mono text-xs text-muted">
              {marc || "—"}
            </pre>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4">
            <h3 className="text-xs uppercase tracking-wide text-subtle">Engine JSON</h3>
            <pre className="mt-2 overflow-x-auto font-mono text-xs text-muted">{json}</pre>
          </div>
        </div>
        {ok ? (
          <p className="mt-3 text-xs text-ok">
            Record is valid for a {current.carrier} manifestation.
          </p>
        ) : null}
      </div>

      <aside>
        <h2 className="font-display text-lg">Saved drafts</h2>
        <ul className="mt-3 space-y-2">
          {saved.length === 0 ? (
            <li className="text-sm text-subtle">Nothing saved on this device.</li>
          ) : (
            saved.map((d) => (
              <li key={d.id} className="rounded-md border border-border bg-surface p-3">
                <button
                  type="button"
                  className="block w-full text-left text-sm hover:text-accent"
                  onClick={() => load(d.id)}
                >
                  {d.title || "Untitled"}
                </button>
                <p className="mt-1 text-xs text-subtle">
                  {d.tags.slice(0, 3).join(" · ") || "No terms"}
                </p>
                <button
                  type="button"
                  className="mt-2 text-xs text-muted hover:text-danger"
                  onClick={() => removeSaved(d.id)}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="mt-6 text-xs text-subtle">
          Drafts stay in this browser.{" "}
          <Link to="/policy" className="underline decoration-border underline-offset-2">
            Assignment rules
          </Link>
        </p>
      </aside>
    </div>
  );
}
