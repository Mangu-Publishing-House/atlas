import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as terms, f as has, h as searchTerms, p as isSatellite, r as F } from "./router-CuAIWwh2.mjs";
import { t as Input } from "./input-DXDJZ7JK.mjs";
import { t as Badge } from "./badge-DjdIpQqb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/authority-CPrG8gvq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "lit",
		label: "Literature"
	},
	{
		id: "fic",
		label: "Fiction"
	},
	{
		id: "rom",
		label: "Romance"
	},
	{
		id: "poly",
		label: "Polyhierarchy"
	},
	{
		id: "top",
		label: "Top-level"
	}
];
function matchFilter(t, f) {
	if (f === "lit") return has(t, F.LIT);
	if (f === "fic") return has(t, F.FICTION);
	if (f === "rom") return has(t, F.ROMANCE);
	if (f === "poly") return has(t, F.POLY);
	if (f === "top") return has(t, F.TOP);
	return true;
}
function Authority() {
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(0);
	const pageSize = 40;
	const rows = (0, import_react.useMemo)(() => {
		return (q.trim() ? searchTerms(q, 400) : terms).filter((t) => matchFilter(t, filter));
	}, [q, filter]);
	const pages = Math.max(1, Math.ceil(rows.length / pageSize));
	const slice = rows.slice(page * pageSize, (page + 1) * pageSize);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Authority file"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "Every authorized preferred term. Type exactly — including parentheses and diacritics. This table is the spell-check source for the engine."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-3 md:flex-row md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => {
						setQ(e.target.value);
						setPage(0);
					},
					placeholder: "Filter preferred terms",
					"aria-label": "Filter preferred terms",
					className: "md:max-w-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setFilter(f.id);
							setPage(0);
						},
						className: `h-9 rounded-full border px-3 text-xs ${filter === f.id ? "border-paper bg-paper text-accent-fg" : "border-border text-muted hover:text-fg"}`,
						children: f.label
					}, f.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs tabular-nums text-subtle",
				children: [rows.length.toLocaleString(), " terms"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-x-auto rounded-lg border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[36rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-surface text-xs uppercase tracking-wide text-subtle",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Preferred term"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Depth"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "NT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Flags"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: slice.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border hover:bg-elevated/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/term/$slug",
									params: { slug: encodeURIComponent(t.l) },
									className: "hover:text-accent",
									children: t.l
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2.5 font-mono tabular-nums text-muted",
								children: t.d
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2.5 font-mono tabular-nums text-muted",
								children: t.nt.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-1",
									children: [
										has(t, F.POLY) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "accent",
											children: "poly"
										}) : null,
										has(t, F.TOP) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "warn",
											children: "top"
										}) : null,
										isSatellite(t) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "warn",
											children: "sat"
										}) : null
									]
								})
							})
						]
					}, t.i)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 px-3 text-muted disabled:opacity-30",
						disabled: page === 0,
						onClick: () => setPage((p) => Math.max(0, p - 1)),
						children: "Previous"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-subtle",
						children: [
							page + 1,
							" / ",
							pages
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 px-3 text-muted disabled:opacity-30",
						disabled: page >= pages - 1,
						onClick: () => setPage((p) => p + 1),
						children: "Next"
					})
				]
			})
		]
	});
}
//#endregion
export { Authority as component };
