import raw from "@/data/taxonomy.json";

export const F = {
  TOP: 1,
  POLY: 2,
  FICTION: 4,
  LIT: 8,
  MUSIC: 16,
  VISUAL: 32,
  MOTION: 64,
  RADIO: 128,
  CARTO: 256,
  LAW: 512,
  SOUND: 1024,
  REL: 2048,
  CNF: 4096,
  COMICS: 8192,
  POETRY: 16384,
  DRAMA: 32768,
  CARRIER: 65536,
  REJECT: 131072,
  ROMANCE: 262144,
  SFF: 524288,
  MYSTERY: 1048576,
  NF: 2097152,
  INSTR: 4194304,
} as const;

export type Term = {
  i: number;
  l: string;
  bt: number[];
  nt: number[];
  d: number;
  n: number;
  f: number;
};

type Dump = {
  source: string;
  generated: string;
  n: number;
  rels: number;
  poly: number;
  tops: number[];
  terms: Term[];
};

const dump = raw as Dump;

export const SOURCE = dump.source;
export const GENERATED = dump.generated;
export const TERM_COUNT = dump.n;
export const REL_COUNT = dump.rels;
export const POLY_COUNT = dump.poly;
export const terms: Term[] = dump.terms;
export const topIds: number[] = dump.tops;

const byLabel = new Map<string, Term>();
for (const t of terms) byLabel.set(t.l, t);

export function getTerm(i: number): Term | undefined {
  return terms[i];
}

export function getByLabel(label: string): Term | undefined {
  return byLabel.get(label);
}

export function has(t: Term, flag: number): boolean {
  return (t.f & flag) !== 0;
}

export function slugify(label: string): string {
  return encodeURIComponent(label);
}

export function fromSlug(slug: string): Term | undefined {
  try {
    return getByLabel(decodeURIComponent(slug));
  } catch {
    return getByLabel(slug);
  }
}

export type Carrier = "print" | "ebook" | "audio" | "other";

export type Issue = {
  level: "error" | "warn" | "hint";
  code: string;
  message: string;
};

const EXCEPT_TOPS = new Set([
  "Anthologies",
  "Large print books",
  "Miniature books",
  "Multilingual works",
  "Tactile works",
]);

const SCRIPT_OK = new Set([
  "Screenplays",
  "Television plays",
  "Radio plays",
  "Radio scripts",
  "Librettos",
  "Comics scripts",
  "Promptbooks",
  "Drama",
]);

export function isSatellite(t: Term): boolean {
  if (SCRIPT_OK.has(t.l)) return false;
  const lit =
    has(t, F.LIT) ||
    has(t, F.FICTION) ||
    has(t, F.COMICS) ||
    has(t, F.DRAMA) ||
    has(t, F.POETRY) ||
    has(t, F.CNF);
  if (lit) return false;
  return (
    has(t, F.MUSIC) ||
    has(t, F.MOTION) ||
    has(t, F.RADIO) ||
    has(t, F.CARTO) ||
    has(t, F.LAW)
  );
}

export function validateAssignment(
  labels: string[],
  opts: { carrier: Carrier },
): Issue[] {
  const issues: Issue[] = [];
  const seen = new Set<string>();
  const resolved: Term[] = [];

  for (const rawLabel of labels) {
    const label = rawLabel.trim();
    if (!label) continue;
    if (seen.has(label)) {
      issues.push({
        level: "error",
        code: "dup",
        message: `Duplicate term: ${label}`,
      });
      continue;
    }
    seen.add(label);
    const t = getByLabel(label);
    if (!t) {
      issues.push({
        level: "error",
        code: "unknown",
        message: `Not an authorized preferred term: “${label}”`,
      });
      continue;
    }
    resolved.push(t);
  }

  if (resolved.length > 4) {
    issues.push({
      level: "error",
      code: "max",
      message: "Assign 1–4 LCGFT terms. More than four usually means tropes or subjects leaked in.",
    });
  }

  if (resolved.length === 0) {
    issues.push({
      level: "warn",
      code: "empty",
      message: "Every title record needs at least one LCGFT term.",
    });
  }

  const hasForm = resolved.some(
    (t) =>
      t.l === "Novels" ||
      t.l === "Novellas" ||
      t.l === "Short stories" ||
      t.l === "Novelle" ||
      t.l === "Graphic novels" ||
      t.l === "Manga" ||
      t.l === "Picture books" ||
      t.l === "Poetry" ||
      t.l === "Drama" ||
      t.l === "Memoirs" ||
      t.l === "Essays" ||
      t.l === "Anthologies" ||
      has(t, F.CARRIER),
  );
  const hasGenre = resolved.some(
    (t) =>
      has(t, F.FICTION) ||
      has(t, F.ROMANCE) ||
      has(t, F.SFF) ||
      has(t, F.MYSTERY) ||
      has(t, F.CNF) ||
      has(t, F.COMICS),
  );
  if (hasGenre && !hasForm) {
    issues.push({
      level: "hint",
      code: "form",
      message: "Pair genre with form when both are true (Novels + Romance fiction).",
    });
  }

  for (const t of resolved) {
    if (has(t, F.TOP) && !EXCEPT_TOPS.has(t.l)) {
      issues.push({
        level: "warn",
        code: "broad",
        message: `“${t.l}” is a top-level family — too broad for a trade monograph.`,
      });
    }
    if (opts.carrier !== "other" && isSatellite(t)) {
      issues.push({
        level: "warn",
        code: "satellite",
        message: `“${t.l}” belongs to a satellite family (music, moving-image, radio, cartographic, or law). Unusual on a book record.`,
      });
    }
    if (opts.carrier === "audio" && t.l === "Audiobooks") continue;
    if (opts.carrier !== "audio" && t.l === "Audiobooks") {
      issues.push({
        level: "error",
        code: "carrier",
        message: "Audiobooks belongs on the audio manifestation, not print or ebook.",
      });
    }
  }

  if (opts.carrier === "audio" && !resolved.some((t) => t.l === "Audiobooks")) {
    issues.push({
      level: "hint",
      code: "audio",
      message: "Audio manifestations should include Audiobooks plus the work’s literary terms.",
    });
  }

  return issues;
}

export function searchTerms(q: string, limit = 40): Term[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  const starts: Term[] = [];
  const includes: Term[] = [];
  for (const t of terms) {
    const hay = t.l.toLowerCase();
    if (hay.startsWith(needle)) starts.push(t);
    else if (hay.includes(needle)) includes.push(t);
    if (starts.length >= limit) break;
  }
  return starts.concat(includes).slice(0, limit);
}

export function familyLabels(t: Term): string[] {
  const out: string[] = [];
  if (has(t, F.LIT)) out.push("Literature");
  if (has(t, F.FICTION)) out.push("Fiction");
  if (has(t, F.ROMANCE)) out.push("Romance");
  if (has(t, F.SFF)) out.push("Speculative");
  if (has(t, F.MYSTERY)) out.push("Mystery");
  if (has(t, F.COMICS)) out.push("Comics");
  if (has(t, F.POETRY)) out.push("Poetry");
  if (has(t, F.DRAMA)) out.push("Drama");
  if (has(t, F.CNF)) out.push("Creative NF");
  if (has(t, F.MUSIC)) out.push("Music");
  if (has(t, F.VISUAL)) out.push("Visual");
  if (has(t, F.MOTION)) out.push("Moving image");
  if (has(t, F.SOUND)) out.push("Sound");
  if (has(t, F.REL)) out.push("Religious");
  if (has(t, F.LAW)) out.push("Law");
  if (has(t, F.CARTO)) out.push("Cartographic");
  if (has(t, F.INSTR)) out.push("Instructional");
  if (has(t, F.NF)) out.push("Informational");
  return out;
}

export function parentsOf(t: Term): Term[] {
  return t.bt.map((i) => terms[i]).filter(Boolean);
}

export function childrenOf(t: Term): Term[] {
  return t.nt.map((i) => terms[i]).filter(Boolean);
}

/** One ancestral path (first BT at each step). */
export function breadcrumb(t: Term): Term[] {
  const path: Term[] = [];
  const seen = new Set<number>();
  let cur: Term | undefined = t;
  while (cur && !seen.has(cur.i)) {
    path.unshift(cur);
    seen.add(cur.i);
    cur = cur.bt.length ? terms[cur.bt[0]] : undefined;
  }
  return path;
}

export const STATS = {
  terms: TERM_COUNT,
  rels: REL_COUNT,
  poly: POLY_COUNT,
  tops: topIds.length,
  fiction: terms.filter((t) => has(t, F.FICTION)).length,
  literature: terms.filter((t) => has(t, F.LIT)).length,
  comics: terms.filter((t) => has(t, F.COMICS)).length,
  poetry: terms.filter((t) => has(t, F.POETRY)).length,
  drama: terms.filter((t) => has(t, F.DRAMA)).length,
  romance: terms.filter((t) => has(t, F.ROMANCE)).length,
};
