import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as STATS } from "./router-CuAIWwh2.mjs";
import { a as SLICES, n as ROMANCE_TIER1, r as ROMANCE_TIER2 } from "./policy-JK_ESYG7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coverage-CQnCUpcR.js
var import_jsx_runtime = require_jsx_runtime();
function Coverage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Coverage planning"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-muted",
				children: [
					"Alignment with ~2,800 LCGFT headings is a claim about the spine, not a requirement to originate a title in every music form or map type. Operational coverage for a trade list is Literature (",
					STATS.literature.toLocaleString(),
					" terms in family), creative nonfiction, and a handful of form flags."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Default menus by list slice"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border rounded-lg border border-border bg-surface",
					children: SLICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: s.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: s.menu
						})]
					}, s.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Romance — official vs house"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Romance fiction has exactly one official narrower term: Paranormal romance fiction. Everything else is Tier 2."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs uppercase tracking-wide text-subtle",
								children: "Tier 1 (may appear in 655)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-1.5",
								children: ROMANCE_TIER1.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									className: "text-sm hover:text-accent",
									to: "/term/$slug",
									params: { slug: encodeURIComponent(t) },
									children: t
								}) }, t))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs uppercase tracking-wide text-subtle",
								children: "Tier 2 (never LCGFT)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-1.5 text-sm text-muted",
								children: ROMANCE_TIER2.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t }, t))
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-muted",
				children: "Mix guidance: about 60 percent romance / commercial fiction / proven demand shelves; remainder across the literature forest and a controlled slice of creative nonfiction. Quality bar is not volume for its own sake."
			})
		]
	});
}
//#endregion
export { Coverage as component };
