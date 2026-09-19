import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { searchTerms, slugify } from "@/lib/taxonomy";

export function CommandPalette() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const hits = useMemo(() => (q.trim() ? searchTerms(q, 8) : []), [q]);

  function go(label: string) {
    setOpen(false);
    setQ("");
    void navigate({ to: "/term/$slug", params: { slug: slugify(label) } });
  }

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
      <input
        value={q}
        suppressHydrationWarning
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 120);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && hits[0]) {
            e.preventDefault();
            go(hits[0].l);
          }
          if (e.key === "Escape") setOpen(false);
        }}
        placeholder="Jump to a preferred term"
        className="h-10 w-full rounded-sm border border-border-strong bg-elevated pl-9 pr-3 text-sm text-fg placeholder:text-muted outline-none focus:ring-2 focus:ring-accent/40"
        aria-label="Search LCGFT terms"
      />
      {open && hits.length > 0 ? (
        <ul className="absolute right-0 z-50 mt-1 max-h-80 w-full overflow-auto rounded-md border border-border bg-surface py-1 shadow-soft">
          {hits.map((t) => (
            <li key={t.i}>
              <button
                type="button"
                className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-elevated"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(t.l)}
              >
                <span>{t.l}</span>
                <span className="font-mono text-[0.65rem] text-subtle">d{t.d}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
