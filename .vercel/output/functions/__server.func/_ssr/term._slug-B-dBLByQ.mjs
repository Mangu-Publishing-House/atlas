import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as familyLabels, l as fromSlug, m as parentsOf, n as Route, o as breadcrumb, s as childrenOf } from "./router-CuAIWwh2.mjs";
import { t as Button } from "./button-DAZ-pYnP.mjs";
import { t as Badge } from "./badge-DjdIpQqb.mjs";
import { r as useAssign, t as FlagRow } from "./assign-2SOt37Zl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/term._slug-B-dBLByQ.js
var import_jsx_runtime = require_jsx_runtime();
function TermPage() {
	const { slug } = Route.useParams();
	const term = fromSlug(slug);
	const addTag = useAssign((s) => s.addTag);
	if (!term) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Unknown heading"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-muted",
				children: [
					"“",
					decodeURIComponent(slug),
					"” is not in this snapshot."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/authority",
					children: "Return to authority"
				})
			})
		]
	});
	const crumbs = breadcrumb(term);
	const parents = parentsOf(term);
	const kids = childrenOf(term);
	const families = familyLabels(term);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mb-4 flex flex-wrap items-center gap-1 text-xs text-subtle",
				children: crumbs.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [i > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/term/$slug",
						params: { slug: encodeURIComponent(c.l) },
						className: "hover:text-fg",
						children: c.l
					})]
				}, c.i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.16em] text-subtle",
				children: "Preferred term"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-3xl tracking-tight md:text-4xl",
				children: term.l
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlagRow, { term })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6 grid grid-cols-3 gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-surface p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-subtle",
							children: "Depth"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono tabular-nums",
							children: term.d
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-surface p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-subtle",
							children: "Direct NT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono tabular-nums",
							children: term.nt.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-surface p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-subtle",
							children: "Descendants"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono tabular-nums",
							children: term.n
						})]
					})
				]
			}),
			families.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-1.5",
				children: families.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: f }, f))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => addTag(term.l),
					children: "Add to assignment"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/assign",
						children: "Open assign"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-lg",
					children: ["Broader term", parents.length === 1 ? "" : "s"]
				}), parents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Top-level — no broader term."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1",
					children: parents.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "text-sm hover:text-accent",
						to: "/term/$slug",
						params: { slug: encodeURIComponent(p.l) },
						children: p.l
					}) }, p.i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "Narrower terms"
				}), kids.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Leaf heading — no narrower terms."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 columns-1 gap-x-8 sm:columns-2",
					children: kids.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "break-inside-avoid py-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "text-sm hover:text-accent",
							to: "/term/$slug",
							params: { slug: encodeURIComponent(c.l) },
							children: c.l
						})
					}, c.i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 rounded-lg border border-border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "Encoding"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-3 overflow-x-auto font-mono text-xs text-muted",
					children: `655  7 $a ${term.l}. $2 lcgft
work.lcgft[]: "${term.l}"`
				})]
			})
		]
	});
}
//#endregion
export { TermPage as component };
