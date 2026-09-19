//#region node_modules/.nitro/vite/services/ssr/assets/policy-JK_ESYG7.js
var RULES = [
	{
		id: "R1",
		title: "Authorized labels only",
		body: "Assign only preferred terms from this authority. Never a used-for variant, a translation of the heading, or a house nickname."
	},
	{
		id: "R2",
		title: "One to four terms",
		body: "Assign 1–4 LCGFT terms per title record. One is acceptable. More than four usually means subjects or tropes leaked in."
	},
	{
		id: "R3",
		title: "Most specific true term",
		body: "If Paranormal romance fiction is true, assign it. Add Romance fiction only when a system cannot explode narrower-term links."
	},
	{
		id: "R4",
		title: "No useless top-level",
		body: "Do not assign Literature, Music, or Visual works to a trade monograph except Anthologies, Large print books, Miniature books, Multilingual works, or Tactile works when literally true."
	},
	{
		id: "R5",
		title: "Form plus genre",
		body: "Pair them when both are true: Novels + Horror fiction; Short stories + Science fiction; Graphic novels + Superhero comics."
	},
	{
		id: "R6",
		title: "Polyhierarchy is allowed",
		body: "If two parents are independently true, both specific terms may be assigned. Do not assign every ancestor."
	},
	{
		id: "R7",
		title: "No moving-image on a book",
		body: "Do not assign motion picture, television, radio, or recorded-music terms to a print or ebook novel."
	},
	{
		id: "R8",
		title: "Audience is not genre",
		body: "Do not assign children’s or YA as LCGFT. Use ONIX audience. There is no “children’s fiction” heading."
	},
	{
		id: "R9",
		title: "Language is not genre",
		body: "Do not put the edition language in LCGFT except Multilingual works, when the object is genuinely multilingual."
	},
	{
		id: "R10",
		title: "Translations share Tier 1",
		body: "LCGFT strings travel with the work. Do not translate the heading into Tamil, Hindi, or any other edition language inside the LCGFT field."
	},
	{
		id: "R11",
		title: "Anthologies",
		body: "Assign Anthologies plus the dominant genre or form of the contents."
	},
	{
		id: "R12",
		title: "Series may drift",
		body: "Tag each volume on its own terms. A series that moves from romance into thriller is allowed to change tags."
	},
	{
		id: "R13",
		title: "Generated literature",
		body: "Computer-generated literature is assigned only when generation is a constitutive fact of the object — never as a default or a slur."
	}
];
var TIERS = [
	{
		tier: "Tier 1 — LCGFT",
		q: "What the work is",
		rule: "This authority. 1–4 authorized terms. Required on every record."
	},
	{
		tier: "Tier 2 — House facet",
		q: "How we sell it",
		rule: "Heat, trope, shelf, market. Local. Never labeled as LCGFT."
	},
	{
		tier: "Tier 3 — Edition",
		q: "Which object",
		rule: "Language, script, format, accessibility profile, imprint."
	}
];
var EXAMPLES = [
	{
		work: "English contemporary category romance, print and EPUB",
		tags: ["Novels", "Romance fiction"],
		note: "Tier 2 may hold contemporary, workplace, heat. Audience adult. Language eng."
	},
	{
		work: "Tamil translation of the same romance",
		tags: ["Novels", "Romance fiction"],
		note: "Same Tier 1. Language tam. Do not translate the LCGFT string."
	},
	{
		work: "Paranormal romance with vampires, trade paperback",
		tags: [
			"Novels",
			"Paranormal romance fiction",
			"Vampire fiction"
		],
		note: "Do not add Horror fiction unless horror is also constitutive."
	},
	{
		work: "Fantasy plus romance (trade “romantasy”)",
		tags: [
			"Novels",
			"Fantasy fiction",
			"Romance fiction"
		],
		note: "No official romantasy heading. Both genres because both are constitutive."
	},
	{
		work: "Cozy mystery short-story collection",
		tags: ["Short stories", "Cozy mysteries"],
		note: "Skip Detective and mystery fiction unless the system cannot explode NT."
	},
	{
		work: "LitRPG progression fantasy",
		tags: ["Novels", "LitRPG (Fiction)"],
		note: "Already sits under Fantasy fiction and Science fiction."
	},
	{
		work: "Memoir of a chef",
		tags: ["Memoirs"],
		note: "Not Cookbooks unless the object is actually a cookbook."
	},
	{
		work: "Shōnen manga volume, English edition",
		tags: ["Shōnen manga", "Manga"],
		note: "Add a genre comics term if constitutive. Audience is ONIX, not LCGFT."
	},
	{
		work: "Same work as an audiobook manifestation",
		tags: ["Audiobooks"],
		note: "Plus the work’s literary terms. Separate ISBN record."
	},
	{
		work: "Holiday anthology, mixed festivals",
		tags: ["Anthologies", "Short stories"],
		note: "Add a festival-fiction term only if that festival constitutes the collection."
	}
];
var SLICES = [
	{
		name: "Romance list",
		menu: "Novels; Romance fiction; optional Paranormal romance fiction / Queer fiction family / Historical fiction / Erotic fiction"
	},
	{
		name: "Mystery / crime",
		menu: "Novels or Short stories; Detective and mystery fiction or Cozy mysteries or Noir fiction or Thrillers (Fiction)"
	},
	{
		name: "SFF list",
		menu: "Novels; Science fiction or Fantasy fiction or Horror fiction + official narrower terms as true"
	},
	{
		name: "Literary / upmarket",
		menu: "Novels; Domestic fiction / Psychological fiction / Historical fiction / Experimental fiction as true"
	},
	{
		name: "Poetry list",
		menu: "Poetry + specific form when dominant"
	},
	{
		name: "Comics / manga",
		menu: "Manga or Manhwa or Graphic novels + official genre comic term"
	},
	{
		name: "Narrative nonfiction",
		menu: "Memoirs or True crime stories or Travel writing or Essays"
	},
	{
		name: "Children’s picture",
		menu: "Picture books; optional Nursery rhymes / Alphabet books / Folk tales. Audience is ONIX."
	},
	{
		name: "Audio program",
		menu: "Audiobooks + the work terms"
	}
];
var ROMANCE_TIER1 = [
	"Romance fiction",
	"Paranormal romance fiction",
	"Romantic plays",
	"Romance comics",
	"Erotic fiction",
	"Boys love (Fiction)"
];
var ROMANCE_TIER2 = [
	"Contemporary",
	"Historical / Regency",
	"Romantic suspense",
	"Dark romance",
	"Sports romance",
	"Workplace / billionaire",
	"Small town",
	"Heat / spice / open-door",
	"Fake dating and other tropes"
];
//#endregion
export { SLICES as a, RULES as i, ROMANCE_TIER1 as n, TIERS as o, ROMANCE_TIER2 as r, EXAMPLES as t };
