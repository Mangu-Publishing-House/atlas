import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as cn, f as has, g as slugify, p as isSatellite, r as F } from "./router-CuAIWwh2.mjs";
import { t as Badge } from "./badge-DjdIpQqb.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assign-2SOt37Zl.js
var import_jsx_runtime = require_jsx_runtime();
function TermChip({ term, onRemove, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated pl-2.5 pr-1 py-1 text-sm", compact && "py-0.5 text-xs"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/term/$slug",
			params: { slug: slugify(term.l) },
			className: "hover:text-accent",
			children: term.l
		}), onRemove ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": `Remove ${term.l}`,
			className: "grid size-7 place-items-center rounded-full text-muted hover:bg-surface hover:text-fg",
			onClick: onRemove,
			children: "×"
		}) : null]
	});
}
function FlagRow({ term }) {
	const bits = [];
	if (has(term, F.TOP)) bits.push({
		label: "Top-level",
		tone: "warn"
	});
	if (has(term, F.POLY)) bits.push({
		label: "Polyhierarchy",
		tone: "accent"
	});
	if (isSatellite(term)) bits.push({
		label: "Satellite",
		tone: "warn"
	});
	if (has(term, F.CARRIER)) bits.push({
		label: "Carrier / form",
		tone: "paper"
	});
	if (has(term, F.FICTION)) bits.push({
		label: "Fiction",
		tone: "ok"
	});
	if (has(term, F.ROMANCE)) bits.push({
		label: "Romance",
		tone: "ok"
	});
	if (!bits.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		children: bits.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: b.tone,
			children: b.label
		}, b.label))
	});
}
var KEY = "mangu-atlas-assign";
function uid() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `d-${Math.random().toString(36).slice(2)}`;
}
function fresh() {
	return {
		id: uid(),
		title: "",
		language: "eng",
		carrier: "print",
		tags: [],
		facets: [],
		updated: Date.now()
	};
}
function readSaved() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed.saved) ? parsed.saved : [];
	} catch {
		return [];
	}
}
function writeSaved(saved) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(KEY, JSON.stringify({ saved }));
}
var useAssign = create((set, get) => ({
	hydrated: false,
	current: {
		id: "draft",
		title: "",
		language: "eng",
		carrier: "print",
		tags: [],
		facets: [],
		updated: 0
	},
	saved: [],
	hydrate: () => {
		if (get().hydrated) return;
		set({
			hydrated: true,
			saved: readSaved()
		});
	},
	setField: (key, value) => set((s) => ({ current: {
		...s.current,
		[key]: value,
		updated: Date.now()
	} })),
	addTag: (label) => set((s) => {
		if (s.current.tags.includes(label)) return s;
		return { current: {
			...s.current,
			tags: [...s.current.tags, label],
			updated: Date.now()
		} };
	}),
	removeTag: (label) => set((s) => ({ current: {
		...s.current,
		tags: s.current.tags.filter((t) => t !== label),
		updated: Date.now()
	} })),
	addFacet: (facet) => set((s) => {
		if (s.current.facets.includes(facet)) return s;
		return { current: {
			...s.current,
			facets: [...s.current.facets, facet],
			updated: Date.now()
		} };
	}),
	removeFacet: (facet) => set((s) => ({ current: {
		...s.current,
		facets: s.current.facets.filter((t) => t !== facet),
		updated: Date.now()
	} })),
	save: () => {
		const cur = {
			...get().current,
			id: get().current.id === "draft" ? uid() : get().current.id,
			updated: Date.now()
		};
		const saved = [cur, ...get().saved.filter((d) => d.id !== cur.id)].slice(0, 40);
		writeSaved(saved);
		set({
			current: cur,
			saved
		});
	},
	load: (id) => {
		const found = get().saved.find((d) => d.id === id);
		if (found) set({ current: { ...found } });
	},
	reset: () => set({ current: fresh() }),
	removeSaved: (id) => {
		const saved = get().saved.filter((d) => d.id !== id);
		writeSaved(saved);
		set({ saved });
	}
}));
//#endregion
export { TermChip as n, useAssign as r, FlagRow as t };
