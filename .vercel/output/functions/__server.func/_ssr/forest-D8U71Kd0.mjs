import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as ChevronRight } from "../_libs/lucide-react.mjs";
import { b as cn, d as getTerm, s as childrenOf, u as getByLabel, v as topIds } from "./router-CuAIWwh2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forest-D8U71Kd0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Node({ term, depth }) {
	const kids = childrenOf(term);
	const [open, setOpen] = (0, import_react.useState)(depth === 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-1",
		style: { paddingLeft: depth * 14 },
		children: [kids.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-expanded": open,
			"aria-label": open ? "Collapse" : "Expand",
			className: "mt-0.5 grid size-8 shrink-0 place-items-center rounded-sm text-subtle hover:bg-elevated hover:text-fg",
			onClick: () => setOpen((o) => !o),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: cn("size-4 transition-transform duration-150", open && "rotate-90") })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-8 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/term/$slug",
			params: { slug: encodeURIComponent(term.l) },
			className: "min-h-8 flex-1 py-1.5 hover:text-accent",
			children: [term.l, term.n ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-2 font-mono text-[0.65rem] text-subtle",
				children: term.n
			}) : null]
		})]
	}), open && kids.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: kids.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
		term: c,
		depth: depth + 1
	}, c.i)) }) : null] });
}
function Forest() {
	const literature = getByLabel("Literature");
	const [active, setActive] = (0, import_react.useState)(literature?.i ?? topIds[0] ?? 0);
	const root = getTerm(active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Hierarchical forest"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "Every authorized term under each broader term. Polyhierarchical terms appear under every parent. Expand a family; open a heading for the full record."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 lg:grid-cols-[15rem_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-1 lg:block lg:overflow-visible",
					children: topIds.map((id) => {
						const t = getTerm(id);
						if (!t) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setActive(id),
							className: cn("h-10 shrink-0 truncate rounded-sm border px-3 text-left text-sm lg:mb-1 lg:w-full", active === id ? "border-paper bg-paper text-accent-fg" : "border-border text-muted hover:text-fg"),
							children: t.l
						}, id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-border bg-surface p-3 md:p-4",
					children: root ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
						term: root,
						depth: 0
					}) }) : null
				})]
			})
		]
	});
}
//#endregion
export { Forest as component };
