import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as ArrowRight } from "../_libs/lucide-react.mjs";
import { _ as terms, a as STATS, f as has, i as SOURCE, r as F, u as getByLabel } from "./router-CuAIWwh2.mjs";
import { t as Button } from "./button-DAZ-pYnP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CgNevys-.js
var import_jsx_runtime = require_jsx_runtime();
var PINNED = [
	"Literature",
	"Fiction",
	"Creative nonfiction",
	"Sound recordings",
	"Instructional and educational works",
	"Religious materials",
	"Visual works",
	"Music"
];
function Home() {
	const tops = PINNED.map((l) => getByLabel(l)).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.18em] text-subtle",
				children: "MANGU Publishing House"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-medium tracking-tight md:text-5xl",
				children: "Atlas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: "Enterprise catalog authority for Library of Congress Genre/Form Terms. Search the closed graph, walk the forest, and assign 1–4 authorized terms to a work — without inventing headings."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-8 grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					[STATS.terms.toLocaleString(), "Preferred terms"],
					[STATS.rels.toLocaleString(), "Broader-term links"],
					[String(STATS.tops), "Top-level families"],
					[STATS.poly.toLocaleString(), "Polyhierarchical"]
				].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-4 md:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs uppercase tracking-wide text-subtle",
						children: l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-3xl tabular-nums tracking-tight",
						children: n
					})]
				}, l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/assign",
							children: ["Assign a work ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/authority",
							children: "Browse authority"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/coverage",
							children: "Coverage plan"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Priority families"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border rounded-lg border border-border bg-surface",
					children: tops.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/term/$slug",
						params: { slug: encodeURIComponent(t.l) },
						className: "flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-elevated",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.l }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs tabular-nums text-subtle",
							children: [t.n.toLocaleString(), " descendants"]
						})]
					}) }, t.i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-12 grid gap-4 md:grid-cols-3",
				children: [
					[
						"Literature",
						STATS.literature,
						"Novels, stories, poems, plays, comics — the operational root for the list."
					],
					[
						"Fiction",
						STATS.fiction,
						"Commercial spine. Romance fiction has one official narrower term."
					],
					[
						"Comics",
						STATS.comics,
						"Manga, manhwa, graphic novels, and genre comics sit here."
					]
				].map(([name, n, blurb]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-border bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg",
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-sm tabular-nums text-accent",
							children: [n.toLocaleString(), " terms in family"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: blurb
						})
					]
				}, name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-12 max-w-2xl text-xs text-subtle",
				children: [
					"Source: ",
					SOURCE,
					". ",
					terms.filter((t) => has(t, F.TOP)).length,
					" top-level terms. Closed graph — every broader term is itself authorized. LCGFT answers what a resource is, never what it is about."
				]
			})
		]
	});
}
//#endregion
export { Home as component };
