import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as searchTerms, u as getByLabel, y as validateAssignment } from "./router-CuAIWwh2.mjs";
import { t as Button } from "./button-DAZ-pYnP.mjs";
import { t as Input } from "./input-DXDJZ7JK.mjs";
import { t as Badge } from "./badge-DjdIpQqb.mjs";
import { n as TermChip, r as useAssign } from "./assign-2SOt37Zl.mjs";
import { r as ROMANCE_TIER2 } from "./policy-JK_ESYG7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assign-Ca7ClOke.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CARRIERS = [
	{
		id: "print",
		label: "Print"
	},
	{
		id: "ebook",
		label: "EPUB"
	},
	{
		id: "audio",
		label: "Audiobook"
	},
	{
		id: "other",
		label: "Other"
	}
];
function Assign() {
	const { current, saved, hydrate, setField, addTag, removeTag, addFacet, removeFacet, save, load, reset, removeSaved } = useAssign();
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	const hits = (0, import_react.useMemo)(() => q.trim() ? searchTerms(q, 8) : [], [q]);
	const issues = (0, import_react.useMemo)(() => validateAssignment(current.tags, { carrier: current.carrier }), [current.tags, current.carrier]);
	const ok = issues.filter((i) => i.level === "error").length === 0 && current.tags.length > 0;
	const marc = current.tags.map((t) => `655  7 $a ${t}. $2 lcgft`).join("\n");
	const json = JSON.stringify({
		title: current.title || null,
		language: current.language,
		carrier: current.carrier,
		"work.lcgft": current.tags,
		"work.lcgft_primary": current.tags[0] ?? null,
		"work.mangu_facets": current.facets
	}, null, 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Assign"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: "Tag a work with 1–4 official LCGFT terms. Tropes and heat stay in Tier 2. Language editions share Tier 1."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-muted",
						children: "Working title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: current.title,
						onChange: (e) => setField("title", e.target.value),
						placeholder: "Title of the work"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-muted",
						children: "Language (BCP 47 / ISO)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: current.language,
						onChange: (e) => setField("language", e.target.value),
						placeholder: "eng"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "mb-2 text-sm text-muted",
					children: "Carrier"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: CARRIERS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setField("carrier", c.id),
						className: `h-11 rounded-sm border px-4 text-sm ${current.carrier === c.id ? "border-paper bg-paper text-accent-fg" : "border-border text-muted hover:text-fg"}`,
						children: c.label
					}, c.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm text-muted",
						children: "Add LCGFT term"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-1.5",
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Start typing a preferred term",
						onKeyDown: (e) => {
							if (e.key === "Enter" && hits[0]) {
								e.preventDefault();
								addTag(hits[0].l);
								setQ("");
							}
						}
					}),
					hits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-1 overflow-hidden rounded-md border border-border bg-surface",
						children: hits.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-elevated",
							onClick: () => {
								addTag(t.l);
								setQ("");
							},
							children: [t.l, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[0.65rem] text-subtle",
								children: ["d", t.d]
							})]
						}) }, t.i))
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: current.tags.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-subtle",
					children: "No Tier 1 terms yet."
				}) : current.tags.map((label) => {
					const t = getByLabel(label);
					return t ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TermChip, {
						term: t,
						onRemove: () => removeTag(label)
					}, label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "danger",
						children: label
					}, label);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg",
						children: "Tier 2 — house facets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Never exported as 655 $2 lcgft."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: ROMANCE_TIER2.map((f) => {
							const on = current.facets.includes(f);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => on ? removeFacet(f) : addFacet(f),
								className: `h-9 rounded-full border px-3 text-xs ${on ? "border-accent bg-accent/15 text-fg" : "border-border text-muted"}`,
								children: f
							}, f);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "Validator"
				}), issues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ok",
					children: "No issues. Ready to encode."
				}) : issues.map((iss, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: `rounded-md border px-3 py-2 text-sm ${iss.level === "error" ? "border-danger/40 text-danger" : iss.level === "warn" ? "border-warn/40 text-warn" : "border-border text-muted"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-2 font-mono text-[0.65rem] uppercase",
						children: iss.level
					}), iss.message]
				}, i))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => save(),
					disabled: !current.tags.length,
					children: "Save draft"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => reset(),
					children: "New record"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs uppercase tracking-wide text-subtle",
						children: "MARC"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-2 overflow-x-auto font-mono text-xs text-muted",
						children: marc || "—"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs uppercase tracking-wide text-subtle",
						children: "Engine JSON"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-2 overflow-x-auto font-mono text-xs text-muted",
						children: json
					})]
				})]
			}),
			ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-ok",
				children: [
					"Record is valid for a ",
					current.carrier,
					" manifestation."
				]
			}) : null
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "Saved drafts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: saved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-subtle",
					children: "Nothing saved on this device."
				}) : saved.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-md border border-border bg-surface p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "block w-full text-left text-sm hover:text-accent",
							onClick: () => load(d.id),
							children: d.title || "Untitled"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: d.tags.slice(0, 3).join(" · ") || "No terms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-2 text-xs text-muted hover:text-danger",
							onClick: () => removeSaved(d.id),
							children: "Remove"
						})
					]
				}, d.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-xs text-subtle",
				children: [
					"Drafts stay in this browser.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/policy",
						className: "underline decoration-border underline-offset-2",
						children: "Assignment rules"
					})
				]
			})
		] })]
	});
}
//#endregion
export { Assign as component };
