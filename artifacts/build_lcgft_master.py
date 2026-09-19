#!/usr/bin/env python3
"""Build MANGU LCGFT Master Taxonomy.docx"""

import json
import sys

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Inches, Pt, RGBColor

from lcgft_docx_helpers import (
    GOLD,
    INK,
    MUTED,
    NAVY,
    SLATE,
    add_header_footer,
    add_toc_field,
    add_bottom_border_para,
    bullet,
    configure_styles,
    p,
    set_cell_borders,
    set_cell_margins,
    set_run_font,
    set_table_widths,
    shade_cell,
    simple_table,
    tree_line,
)

sys.path.insert(0, "/home/workdir/artifacts")

SRC_JSON = "/home/workdir/artifacts/lcgft.json"
SRC_CHILDREN = "/home/workdir/artifacts/lcgft_children.json"
OUT = "/home/workdir/artifacts/MANGU_LCGFT_Master_Taxonomy.docx"

data = json.load(open(SRC_JSON))
children = json.load(open(SRC_CHILDREN))
terms = data["terms"]
TOPS = data["meta"]["top_level"]


def descendants(term, seen=None):
    if seen is None:
        seen = set()
    for c in children.get(term, []):
        if c not in seen:
            seen.add(c)
            descendants(c, seen)
    return seen


def depth_of(term, seen=None):
    if seen is None:
        seen = set()
    if term in seen:
        return 0
    seen.add(term)
    bts = terms[term]["bt"]
    if not bts:
        return 0
    return 1 + max(depth_of(b, seen.copy()) for b in bts)


DEPTH = {t: depth_of(t) for t in terms}
DESC_COUNT = {t: len(descendants(t)) for t in terms}
DIRECT = {t: len(children.get(t, [])) for t in terms}


def walk_tree(root, max_depth=12):
    def rec(term, level):
        if level > max_depth:
            return
        yield term, level
        for c in sorted(children.get(term, []), key=str.casefold):
            yield from rec(c, level + 1)

    yield from rec(root, 0)


def emit_tree(doc, root, heading_level=2):
    doc.add_heading(root, heading_level)
    bts = terms[root]["bt"]
    bits = []
    bits.append("Top-level term (no broader term)" if not bts else "BT: " + "; ".join(bts))
    bits.append(f"Direct NT: {DIRECT[root]}")
    bits.append(f"Unique descendants: {DESC_COUNT[root]}")
    bits.append(f"Depth from nearest top-level: {DEPTH[root]}")
    p(doc, "  ·  ".join(bits), size=9, italic=True, color=MUTED, space_after=6)
    if DIRECT[root] == 0:
        p(doc, "No narrower terms in this snapshot.", size=10, italic=True, color=SLATE, space_after=8)
        return
    for term, level in walk_tree(root):
        if level == 0:
            continue
        extra = f"  ({DESC_COUNT[term]})" if DESC_COUNT[term] else ""
        tree_line(doc, term, level, extra)
    p(doc, "", space_after=4)


def main():
    doc = Document()
    configure_styles(doc)
    sec = doc.sections[0]
    sec.page_width = Inches(8.5)
    sec.page_height = Inches(11)
    sec.top_margin = Inches(0.85)
    sec.bottom_margin = Inches(0.75)
    sec.left_margin = Inches(0.75)
    sec.right_margin = Inches(0.75)
    sec.header_distance = Inches(0.4)
    sec.footer_distance = Inches(0.4)
    sec.different_first_page_header_footer = True
    sec.first_page_header.paragraphs[0].text = ""
    sec.first_page_footer.paragraphs[0].text = ""
    add_header_footer(sec)

    for _ in range(3):
        p(doc, "", space_after=0)
    kicker = p(doc, "MANGU PUBLISHING HOUSE", size=12, bold=True, color=GOLD, align="center", space_after=6)
    add_bottom_border_para(kicker, "B8944A", "18")
    p(doc, "LCGFT Master Taxonomy", size=32, bold=True, color=NAVY, align="center", space_before=16, space_after=4)
    p(
        doc,
        "Complete authority file, hierarchical forest, and catalog application bible",
        size=14,
        italic=True,
        color=SLATE,
        align="center",
        space_after=16,
    )

    stats = doc.add_table(rows=1, cols=4)
    stats.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_widths(stats, [1620, 1620, 1620, 1620])
    labels = [
        ("2,684", "Authorized terms"),
        ("3,405", "BT relationships"),
        ("27", "Top-level families"),
        ("695", "Polyhierarchical terms"),
    ]
    for i, (n, lab) in enumerate(labels):
        cell = stats.rows[0].cells[i]
        cell.text = ""
        shade_cell(cell, "1B365D")
        set_cell_margins(cell, 80, 80, 60, 60)
        set_cell_borders(cell, "1B365D", "4")
        a = cell.paragraphs[0]
        a.alignment = WD_ALIGN_PARAGRAPH.CENTER
        a.paragraph_format.space_after = Pt(0)
        r = a.add_run(n)
        set_run_font(r, "Calibri", 18, True, False, GOLD)
        b = cell.add_paragraph()
        b.alignment = WD_ALIGN_PARAGRAPH.CENTER
        b.paragraph_format.space_after = Pt(0)
        r = b.add_run(lab)
        set_run_font(r, "Calibri", 8, False, False, RGBColor(230, 230, 235))

    p(doc, "", space_after=10)
    p(doc, "Version 1.0   ·   15 September 2026   ·   Internal working authority", size=11, color=SLATE, align="center", space_after=2)
    p(
        doc,
        "Source vocabulary: Library of Congress Genre/Form Terms (LCGFT)\n"
        "Linked Data Service SKOS export  ·  Companion official list updated December 2025\n"
        "Hierarchy compiled 19 August 2026  ·  2,681 preferred terms extracted",
        size=10,
        color=MUTED,
        align="center",
        space_after=14,
    )
    p(
        doc,
        "This document is the house spine for every MANGU title record. It does not invent terms. "
        "It organizes the official LCGFT vocabulary so editors, the book engine, metadata operators, "
        "and language-edition leads assign the same authorized forms — in English and in every other language of the list.",
        align="justify",
    )

    doc.add_page_break()
    doc.add_heading("Contents", 1)
    p(
        doc,
        "Open this file in Microsoft Word and update the field below (right-click → Update Field → Update entire table) "
        "to generate live page numbers. A manual outline is printed under the field so the document is usable before the field is refreshed.",
        size=10,
        italic=True,
        color=SLATE,
    )
    toc_p = doc.add_paragraph()
    add_toc_field(toc_p)
    p(doc, "Manual outline", size=12, bold=True, color=NAVY, space_before=14, space_after=6)
    for line in [
        "Part I — Operator briefing: what this bible is, and how MANGU uses it",
        "Part II — Architecture of LCGFT: families, depth, polyhierarchy, statistics",
        "Part III — Publishing-priority families (Literature through adaptation/audio)",
        "Part IV — Catalog policy: assignment rules, encoding, worked examples",
        "Part V — Coverage planning and the local overlay",
        "Part VI — Complete hierarchical forest (every authorized term under its BT)",
        "Part VII — A–Z authority file",
        "Part VIII — Working indexes (polyhierarchy, fiction leaves, reject classes)",
        "Appendix A — Data dictionary for the book engine",
        "Appendix B — Source, versioning, and prohibited actions",
    ]:
        bullet(doc, line)

    # PART I
    doc.add_page_break()
    doc.add_heading("Part I — Operator briefing", 1)
    doc.add_heading("1. What this document is", 2)
    p(
        doc,
        "This is MANGU’s master genre/form authority. It contains every authorized LCGFT preferred term available in the "
        "compiled snapshot (2,681 terms), every broader-term relationship (3,401), the inverted narrower-term forest, and "
        "the house rules for applying those terms to titles that MANGU originates, translates, or distributes.",
        align="justify",
    )
    p(
        doc,
        "LCGFT answers one question only: what is this resource? It does not answer what the resource is about. "
        "“Romance fiction” describes the work. “World War II” or “arranged marriage” would be subjects (LCSH or a house "
        "subject scheme), not LCGFT. Mixing the two is the most common catalog error and it is forbidden in MANGU records.",
        align="justify",
    )

    doc.add_heading("2. Why LCGFT, not a homemade genre list", 2)
    for t in [
        "It is the national (and increasingly international) controlled vocabulary for genre and form. Libraries, OverDrive/Libby, Ingram, and many ONIX recipients already understand 655 $2 lcgft.",
        "It is language-agnostic. The same authorized English-preferred term attaches to a Hindi edition, a Tamil edition, and an English edition of the same work. That is how a multi-language list stays coherent.",
        "It is polyhierarchical and stable. Terms have documented broader/narrower relationships. A family can be exploded without inventing a private tree that later collides with LOC.",
        "Alignment with “~2,800 LCGFT subgenres” means we use these terms. It does not mean we have coined 2,800 extra labels.",
    ]:
        bullet(doc, t)

    doc.add_heading("3. What LCGFT will not do for a trade publisher", 2)
    p(
        doc,
        "LCGFT is deliberately coarse on commercial romance and commercial fantasy. “Romance fiction” has exactly one official "
        "narrower term: Paranormal romance fiction. There is no authorized LCGFT for contemporary romance, historical romance, "
        "romantic suspense, dark romance, sports romance, or billionaire romance. Those are market facets. They belong in "
        "MANGU’s local overlay (Tier 2), never as fake LCGFT values.",
        align="justify",
    )
    p(
        doc,
        "The same limit applies to “romantasy,” “cozy fantasy,” and most tropes. LitRPG (Fiction) is authorized. Climate fiction "
        "is authorized (under Ecofiction). Tropes are not genres. Tropes never go in the LCGFT field.",
        align="justify",
    )

    doc.add_heading("4. Three-tier tagging model (house rule)", 2)
    simple_table(
        doc,
        ["Tier", "Question it answers", "Rule"],
        [
            ["Tier 1 — LCGFT", "What the work is", "This bible. 1–4 authorized terms per title. Required on every record."],
            ["Tier 2 — MANGU facet", "How we sell it", "Heat, trope cluster, audience shelf, market. Local. Never labeled as LCGFT."],
            ["Tier 3 — Work / edition", "Which object", "Language, script, format (print / EPUB / audiobook), accessibility profile, imprint."],
        ],
        [1800, 2000, 3160],
    )
    p(doc, "", space_after=8)

    doc.add_heading("5. Catalog targets this bible supports", 2)
    p(
        doc,
        "House target for October 2026–December 2027: on the order of 6,000 English titles and 6,000 titles across the other "
        "language programs, covering the LCGFT-aligned literature families rather than inventing a parallel private taxonomy. "
        "Mix guidance remains approximately 60 percent romance / commercial fiction / proven demand shelves, with the remainder "
        "spread across the rest of the literature forest and a controlled slice of creative nonfiction. Quality bar is not "
        "“trash volume.” LCGFT tagging is how volume stays navigable.",
        align="justify",
    )

    doc.add_heading("6. How to read a relationship in this document", 2)
    p(
        doc,
        "BT (broader term) means “this term is a kind of that term.” NT (narrower term) is the inverse. A term may have more "
        "than one BT — that is polyhierarchy, not a data error. Example: Apocalyptic fiction is both Science fiction and "
        "Survival fiction. A MANGU record that is genuinely both should carry the most specific authorized terms that are true, "
        "not every ancestor.",
        align="justify",
    )
    p(
        doc,
        "Top-level terms have no BT. There are 26 of them. For a trade book program the operational top of the world is "
        "Literature, with Creative nonfiction, Instructional and educational works, Recreational works, Religious materials, "
        "and Sound recordings as the next most relevant families.",
        align="justify",
    )

    # PART II
    doc.add_heading("Part II — Architecture of LCGFT", 1)
    doc.add_heading("7. Snapshot statistics", 2)
    simple_table(
        doc,
        ["Measure", "Value"],
        [
            ["Preferred terms in this snapshot", "2,681"],
            ["Terms that have at least one broader term", "2,655"],
            ["Top-level terms (no broader term)", "26"],
            ["Broader-term relationships", "3,401"],
            ["Terms with two or more broader terms", "693"],
            ["Maximum number of broader terms on one term", "4"],
            ["Maximum depth from a top-level term", "7"],
            ["Terms at depth 1", "301"],
            ["Terms at depth 2", "1,096"],
            ["Terms at depth 3", "960"],
            ["Terms at depth 4", "266"],
            ["Terms at depth 5+", "32"],
            ["BT labels missing from the preferred list", "0 (closed graph)"],
            ["Official companion PDF", "GENRE-FORM.pdf, updated December 2025"],
            ["Compilation date of this hierarchy", "19 August 2026"],
        ],
        [4200, 2760],
    )
    p(
        doc,
        "Most live cataloguing happens at depth 2 and depth 3. Depth-0 (top-level) terms are almost never assigned to a trade "
        "monograph. “Literature” on a novel is true and useless. “Romance fiction” is the correct specificity for a category "
        "romance; “Paranormal romance fiction” is the correct specificity when the paranormal element is constitutive.",
        align="justify",
        space_before=10,
    )

    doc.add_heading("8. The 27 top-level families", 2)
    p(
        doc,
        "Descendant counts are unique terms reachable by following narrower-term links. Because of polyhierarchy a term can sit "
        "in more than one family; descendant totals therefore overlap and must not be added together to “get 2,681.”",
        size=10,
        italic=True,
        color=SLATE,
    )
    relevance = {
        "Literature": "Core — every novel, story, poem, play, comic",
        "Creative nonfiction": "Core — memoir, essay, true crime, travel",
        "Sound recordings": "Core for audiobook / podcast objects",
        "Instructional and educational works": "Selective — cookbooks, self-help, courseware",
        "Religious materials": "Selective — only when the work is religious in form",
        "Recreational works": "Selective — humor, puzzles, activity",
        "Visual works": "Satellite — covers, comics-as-art, film/TV adaptations",
        "Music": "Satellite — scores, recorded music, not prose",
        "Informational works": "Satellite — reference, reports; rarely trade narrative",
        "Discursive works": "Satellite — criticism, interviews, speeches",
        "Derivative works": "Cross-cutting form (adaptations, abridgments, translations)",
        "Ephemera": "Rare in the list",
        "Commemorative works": "Rare — festschriften, memorial volumes",
        "Dance": "Out of scope unless a dance publication",
        "Cartographic materials": "Out of scope unless a map product",
        "Law materials": "Out of scope unless a law list is opened",
        "Tactile works": "Format flag (braille, tactile) — use when true",
        "Manuscripts": "Format / archival — not a trade genre",
        "Miniature books": "Format flag",
        "Large print books": "Format flag — use when true",
        "Multilingual works": "Format / linguistic flag",
        "Microform materials": "Carrier — not used for new trade",
        "Incunabula": "Historical carrier — not used for new trade",
        "Anthologies": "Form flag — use when the object is an anthology",
        "Marsiyas": "Specific poetic/religious form; assign only when true",
        "Vox pop radio programs": "Radio form — not a book genre",
    }
    fam_rows = []
    for t in sorted(TOPS, key=lambda x: (-DESC_COUNT[x], x.casefold())):
        fam_rows.append([t, str(DIRECT[t]), str(DESC_COUNT[t]), relevance.get(t, "See forest")])
    simple_table(doc, ["Top-level family", "Direct NT", "Unique descendants", "MANGU relevance"], fam_rows, [2200, 1000, 1400, 2360])

    doc.add_heading("9. Polyhierarchy is a feature", 2)
    p(
        doc,
        "693 terms have more than one broader term. Typical patterns: a genre expressed in more than one form (Apocalyptic fiction "
        "under both Science fiction and Survival fiction); a form that is also instructional (Educational films); a cultural form "
        "that is both music and dance. When assigning, pick the terms that are true of the work at the most useful specificity. "
        "Do not assign every ancestor. Do not pick only one parent if the work honestly lives in two genre families.",
        align="justify",
    )

    doc.add_heading("10. Form versus genre inside LCGFT", 2)
    p(
        doc,
        "LCGFT mixes genre (romance, horror, science fiction) with form (novels, short stories, comics, audiobooks, large print books). "
        "MANGU records should normally carry both when both are true: a paranormal romance novel is Novels + Romance fiction + "
        "Paranormal romance fiction. An audiobook of the same work, as a separate manifestation, adds Audiobooks. Do not put "
        "Audiobooks on the print ISBN record.",
        align="justify",
    )

    # PART III
    doc.add_heading("Part III — Publishing-priority families", 1)
    p(
        doc,
        "This part is the editorial map. Full official trees for every family appear in Part VI. What follows is the subset a "
        "trade list actually lives in, with house notes on specificity and on the local overlay.",
        align="justify",
    )

    doc.add_heading("11. Literature — the operational root", 2)
    p(
        doc,
        "Literature is the top-level family for novels, stories, poems, plays, comics, folk literature, and a handful of named "
        "story traditions. Direct children of Literature that matter to the list:",
        align="justify",
    )
    for a, b in [
        ("Fiction", "Primary bucket for almost all narrative prose. Assign a narrower fiction term whenever one is true."),
        ("Novels / Novellas / Short stories / Novelle", "Form. Novels is a narrower term of Fiction, not a sibling of Literature."),
        ("Poetry", "Large form-heavy family. Use a specific form (Sonnets, Haiku, Ghazals (Poetry)) when the book is formally that thing."),
        ("Drama", "Plays, including religious drama, verse drama, screenplays published as literature."),
        ("Comics (Graphic works)", "Manga, manhwa, graphic novels, webcomics, genre comics."),
        ("Folk literature", "Folk tales, legends, myths, folk poetry — only when the work is that tradition."),
        ("Romances", "Medieval / chivalric romances. Not modern category romance. Modern category romance is Romance fiction."),
        ("Satirical literature / Parodies / Pastiches", "Use when satire or parody is the constitutive form."),
        ("Computer-generated literature", "Authorized. Use when generation is part of what the object is, not as a quality slur."),
    ]:
        bullet(doc, f"{a} — {b}")

    doc.add_heading("12. Fiction — commercial spine", 2)
    p(
        doc,
        "Fiction has 87 direct narrower terms in this snapshot. That is the authorized commercial map. Terms listed below are "
        "official LCGFT preferred labels and must be typed exactly.",
        align="justify",
    )

    clusters = [
        (
            "Romance and intimacy",
            [
                "Romance fiction",
                "Paranormal romance fiction",
                "Erotic fiction",
                "Boys love (Fiction)",
                "Queer fiction, and its official narrower terms: Gay fiction, Lesbian fiction, Bisexual fiction, Transgender fiction, Asexual fiction, Aromantic fiction, Genderqueer fiction, Intersex fiction",
            ],
            "Romance fiction is the authorized home for category and trade romance. Heat, setting-era, and trope do not get their own LCGFT term. Boys love (Fiction) is authorized and distinct from Gay fiction. Do not collapse them.",
        ),
        (
            "Crime, mystery, thriller",
            [
                "Detective and mystery fiction",
                "Cozy mysteries",
                "Noir fiction",
                "City mysteries",
                "Forensic fiction",
                "Thrillers (Fiction)",
                "Spy fiction",
                "Gangster fiction",
                "Legal fiction (Literature)",
                "Prison fiction",
                "Cryptologic fiction",
            ],
            "Cozy mysteries is official. “Domestic thriller” is not. Use Thrillers (Fiction) plus Psychological fiction when both are true.",
        ),
        (
            "Speculative",
            [
                "Science fiction; Fantasy fiction; Horror fiction; Paranormal fiction",
                "Dystopian fiction; Apocalyptic fiction; Cyberpunk fiction; Steampunk fiction",
                "Afrofuturist fiction; Africanfuturist fiction (both official; not synonyms)",
                "Climate fiction (BT Ecofiction); Ecofiction; Nature fiction",
                "LitRPG (Fiction); Portal fantasy fiction; Time-travel fiction",
                "Space operas (Fiction); Superhero fiction; Alternative histories (Fiction); Utopian fiction",
                "Monster fiction family, including Vampire fiction, Werewolf fiction, Zombie fiction, Witch fiction",
            ],
            "LitRPG (Fiction) is official and sits under both Fantasy fiction and Science fiction. “Romantasy” is not official — tag Fantasy fiction + Romance fiction when both are constitutive.",
        ),
        (
            "Historical, social, domestic",
            [
                "Historical fiction; Domestic fiction; Coming-of-age fiction",
                "Campus fiction; School fiction; Political fiction; Social problem fiction; Proletarian fiction",
                "War fiction; Military fiction; Western fiction; Urban fiction; Road fiction; Sea fiction; Pastoral fiction",
            ],
            "Historical fiction does not specify a century. Era belongs in subject or in the local overlay.",
        ),
        (
            "Form-forward fiction",
            [
                "Novels; Novellas; Novelle; Short stories; Flash fiction; Linked stories",
                "Epistolary fiction; Diary fiction; Frame stories; Choose-your-own stories; Hypertext fiction",
                "Experimental fiction; Novels in verse; Stories in rhyme; Serialized fiction",
                "Light novels; Cell phone novels; Fan fiction; Fictional autobiographies; Romans à clef; Nonfiction novels",
            ],
            "A short-story collection is Short stories. A novel-in-stories may be Linked stories + Novels. Light novels is official.",
        ),
        (
            "Other authorized fiction terms",
            [
                "Action and adventure fiction; Animal fiction; Bible fiction; Biographical fiction; Bizarro fiction",
                "Christmas fiction; Easter fiction; Passover fiction",
                "Confessional fiction; Dialect fiction; Didactic fiction; Ethnographic fiction",
                "Fishing fiction; Hunting fiction; Folk tales (when the work is a folk tale)",
                "Gothic fiction; Humorous fiction; Magic realist fiction; Martial arts fiction",
                "Mathematical fiction; Medical fiction; Mythological fiction; Nonsense fiction",
                "Picaresque fiction; Philosophical fiction; Pornographic fiction; Psychological fiction",
                "Religious fiction (Christian fiction and festival-specific narrower terms)",
                "Samurai fiction; Scar literature; Sensation fiction; Sports fiction; Survival fiction; Theatrical fiction",
            ],
            "Festival fiction terms are official. Use them when the festival is constitutive of the work, not when a scene happens to fall on a holiday.",
        ),
    ]
    for title, items, note in clusters:
        doc.add_heading(title, 3)
        for it in items:
            bullet(doc, it)
        p(doc, "House note. " + note, size=10, italic=True, color=SLATE, space_before=4)

    doc.add_heading("13. Romance — official spine versus house shelf", 2)
    p(doc, "Official LCGFT romance-adjacent terms that may appear in Tier 1:", align="justify")
    for t in [
        "Romance fiction",
        "Paranormal romance fiction",
        "Romantic plays",
        "Romance comics",
        "Romance films / Romance television programs (adaptation records only)",
        "Love poetry / Love songs / Love letters (only when the work is that form)",
        "Arthurian romances / Romances (medieval narrative form — not modern category romance)",
        "Romantic comedy films / Romantic comedy television programs (adaptation records only)",
    ]:
        bullet(doc, t)
    p(
        doc,
        "Everything else — contemporary, historical, regency, western romance, romantic suspense, dark romance, sports romance, "
        "workplace, small town, billionaire, mafia, cowboy, rockstar, fake dating as a shelf, spice level, “open door,” "
        "“closed door” — is Tier 2. It may be stored, filtered, and marketed. It may never be written into the LCGFT field and "
        "it may never be presented to a library, ONIX genre slot, or retailer as if it were Library of Congress vocabulary.",
        align="justify",
    )
    p(
        doc,
        "Recommended default for a category romance novel: Novels + Romance fiction. Add Paranormal romance fiction when the "
        "paranormal element is constitutive. Add Historical fiction when the historical setting is constitutive and not merely "
        "costume. Add official terms from the Queer fiction family when those terms are true of the work as a work.",
        align="justify",
    )

    doc.add_heading("14. Comics, manga, manhwa, graphic novels", 2)
    p(
        doc,
        "Comics (Graphic works) is the parent. Graphic novels, Manga, Manhwa, Webcomics, Fotonovelas are official narrower terms. "
        "Manga itself has official narrower terms: Shōnen manga, Shōjo manga, Seinen manga, Boys love (Manga), Yuri manga, "
        "Isekai manga. Genre comics (Romance comics, Horror comics, Superhero comics, Science fiction comics, and the rest) are "
        "assigned in addition when true. Assign the two most specific true terms, not the entire ancestor chain.",
        align="justify",
    )

    doc.add_heading("15. Poetry and drama", 2)
    p(
        doc,
        "Poetry is a large, form-heavy family (sonnets, ghazals, haiku, tanka, free verse, spoken word poetry, novels in verse as "
        "a crossover). Assign the specific form when the book is that form. “Poetry” alone is acceptable for a mixed collection "
        "with no dominant form. Drama follows the same rule: Comedy plays, Tragedies (Drama), Religious drama, Screenplays, "
        "Radio plays, One-act plays, Verse drama are official. Closet drama is official and means drama not intended for "
        "performance — do not use it as a joke about unsold scripts.",
        align="justify",
    )

    doc.add_heading("16. Creative nonfiction", 2)
    p(
        doc,
        "Official direct children include Biographies, Counterfactual histories, Cronicas, Diaries, Essays, Flash nonfiction, "
        "Nonfiction novels, Personal narratives, Sports writing, Travel writing, True adventure stories, and True crime stories. "
        "Memoirs is a narrower term of Autobiographies, which is a narrower term of Biographies. “Memoir” in trade speech is "
        "Memoirs, not Creative nonfiction as a lead term.",
        align="justify",
    )

    doc.add_heading("17. Children’s and instructional-adjacent", 2)
    p(
        doc,
        "LCGFT does not have “children’s fiction” as a term. Audience is not genre. Children’s picture books are Picture books "
        "(under Illustrated works). Board books, Alphabet books, Nursery rhymes, Toy and movable books, High interest-low "
        "vocabulary books, and Readers (Publications) are official forms. A middle-grade fantasy novel is Fantasy fiction + "
        "Novels; audience is a Tier 3 / ONIX audience code, not an LCGFT value. Do not invent “Children’s fiction” in the LCGFT field.",
        align="justify",
    )

    doc.add_heading("18. Audiobooks, sound, and the recorded object", 2)
    p(
        doc,
        "Audiobooks is an official term (BT Sound recordings). Children’s audiobooks and Talking books are official. The print "
        "manifestation and the audio manifestation are different records. The audio record carries Audiobooks plus the same "
        "literary LCGFT terms as the work. Do not put Sound recordings on a print book. Podcasts is official and sits under both "
        "Sound recordings and Video recordings.",
        align="justify",
    )

    doc.add_heading("19. Adaptation and moving-image satellites", 2)
    p(
        doc,
        "If MANGU originates or distributes an adaptation, use the official adaptation terms: Adaptations, Film adaptations, "
        "Television adaptations, Comics adaptations, Graphic novel adaptations, Novelizations, Theatrical adaptations, Radio "
        "adaptations. Genre terms exist in parallel for film and television (Romance films, Science fiction television programs). "
        "Those terms describe the moving-image work, not the source novel. A novel that was later filmed does not become a Romance film.",
        align="justify",
    )

    # PART IV
    doc.add_heading("Part IV — Catalog policy", 1)
    doc.add_heading("20. Assignment rules (normative)", 2)
    rules = [
        "Assign only authorized preferred terms from this bible. Never a used-for variant, never a translation of the term, never a house nickname.",
        "Assign 1–4 LCGFT terms per title record. One is acceptable. More than four usually means the record is describing subjects or tropes.",
        "Prefer the most specific true term. If Paranormal romance fiction is true, assign it. Romance fiction may still be added when the work must collocate with the broader romance shelf in a system that does not explode NT links.",
        "Do not assign a top-level term (Literature, Music, Visual works) to a trade monograph except Anthologies, Large print books, Miniature books, Multilingual works, or Tactile works when those forms are literally true of the object.",
        "Always pair a genre term with a form term when both are true (Novels + Horror fiction; Short stories + Science fiction; Graphic novels + Superhero comics).",
        "Polyhierarchy: if two parents are independently true, both specific terms may be assigned.",
        "Do not assign moving-image, radio, or music terms to a print or ebook novel.",
        "Do not assign audience (children, young adult) as LCGFT. Use ONIX audience / house audience.",
        "Do not assign language as LCGFT except Multilingual works, when the object is genuinely multilingual.",
        "Translations: LCGFT terms travel with the work. Do not translate the LCGFT string into the edition language inside the LCGFT field.",
        "Anthologies: assign Anthologies plus the dominant genre/form of the contents.",
        "Series: tag each volume on its own terms. A series that drifts from romance into thriller is allowed to change tags.",
        "Computer-generated literature is assigned only when generation is a constitutive fact of the object.",
    ]
    for i, r in enumerate(rules, 1):
        bullet(doc, f"R{i}. {r}")

    doc.add_heading("21. Encoding", 2)
    simple_table(
        doc,
        ["Context", "Rule"],
        [
            ["MARC bibliographic", "655  7 $a Romance fiction. $2 lcgft"],
            ["MARC authority pattern", "LCCN begins gf… ; 040 $f lcgft"],
            ["ONIX 3", "Store LCGFT in a house-controlled subject repeat. Do not overload BISAC/THEMA codes with LCGFT strings. Crosswalk separately."],
            ["Book engine schema", "work.lcgft[]: exact preferred-term strings. work.mangu_facets[]: Tier 2. manifestation.form_flags[]: audiobook, large print, braille."],
            ["Display label", "Always the preferred term, including parenthetical qualifiers: Thrillers (Fiction), Comics (Graphic works)."],
            ["URIs", "When a URI is stored, use the id.loc.gov/authorities/genreForms token. Labels in this bible are the display form."],
        ],
        [2000, 4960],
    )
    p(doc, "", space_after=8)

    doc.add_heading("22. Worked examples", 2)
    simple_table(
        doc,
        ["Work / manifestation", "Tier 1 (LCGFT)", "Notes"],
        [
            ["English contemporary category romance, print and EPUB", "Novels; Romance fiction", "Tier 2 may hold contemporary, workplace, heat-3. Audience adult. Language eng."],
            ["Tamil translation of the same romance", "Novels; Romance fiction", "Same Tier 1. Language tam. Do not translate the LCGFT string."],
            ["Paranormal romance with vampires, trade paperback", "Novels; Paranormal romance fiction; Vampire fiction", "Do not add Horror fiction unless horror is also constitutive."],
            ["Fantasy + romance (“romantasy”) adult novel", "Novels; Fantasy fiction; Romance fiction", "No official “romantasy.” Both genres assigned because both are constitutive."],
            ["Cozy mystery short-story collection", "Short stories; Cozy mysteries", "Do not also assign Detective and mystery fiction unless the system cannot explode NT."],
            ["LitRPG progression fantasy", "Novels; LitRPG (Fiction)", "Already sits under Fantasy fiction and Science fiction."],
            ["Memoir of a chef", "Memoirs", "Not Cookbooks unless the object is actually a cookbook."],
            ["Shōnen manga volume, English edition", "Shōnen manga; Manga", "Add a genre comics term if constitutive. Audience is ONIX, not LCGFT."],
            ["Same work as an audiobook manifestation", "Audiobooks + the work’s literary terms", "Separate ISBN / ASIN record."],
            ["Holiday anthology, multiple religions", "Anthologies; Short stories", "Add a festival-fiction term only if that festival constitutes the collection."],
        ],
        [2200, 2200, 2560],
    )
    p(doc, "", space_after=8)

    doc.add_heading("23. Quality control checks before a record ships", 2)
    for t in [
        "Every LCGFT string matches a preferred term in Part VII exactly, including capitalization, parentheses, and diacritics.",
        "No trope, heat rating, BISAC heading, or audience word is in the LCGFT field.",
        "No moving-image term is on a book record.",
        "Form + genre pair present for narrative prose (Novels or Short stories or Novellas, plus a genre).",
        "Language editions of one work share the same LCGFT set.",
        "If more than four LCGFT terms are present, an editor has signed the exception.",
    ]:
        bullet(doc, t)

    # PART V
    doc.add_heading("Part V — Coverage planning", 1)
    doc.add_heading("24. Alignment with a multi-thousand-title list", 2)
    p(
        doc,
        "“Cover ~2,800 LCGFT-aligned subgenres” is a claim about the spine, not a requirement that the house originate a title "
        "in every heading. Hundreds of headings are music forms, map types, liturgical books, or film/radio genres. Those headings "
        "exist in this bible so the engine can reject them on a book record and so a future music or moving-image imprint does not "
        "start from a scrap list.",
        align="justify",
    )
    p(
        doc,
        "Operational coverage for a trade literature program is the Literature family (646 unique descendants), the Creative "
        "nonfiction family (32), the book-relevant slice of Instructional and educational works, the book-relevant slice of "
        "Religious materials, plus form flags (Anthologies, Large print books, Audiobooks, Picture books, Graphic novels). "
        "That is the pool from which a 60 percent romance/commercial-fiction mix is drawn — and it is why Romance fiction must "
        "be faceted locally rather than waited-for from LOC.",
        align="justify",
    )

    doc.add_heading("25. Suggested default menus by list slice", 2)
    simple_table(
        doc,
        ["List slice", "Default Tier 1 menu"],
        [
            ["Romance list", "Novels; Romance fiction; optional Paranormal romance fiction / Queer fiction family / Historical fiction / Erotic fiction"],
            ["Mystery / crime list", "Novels or Short stories; Detective and mystery fiction or Cozy mysteries or Noir fiction or Thrillers (Fiction)"],
            ["SFF list", "Novels; Science fiction or Fantasy fiction or Horror fiction + official narrower terms as true"],
            ["Literary / upmarket", "Novels; Domestic fiction / Psychological fiction / Historical fiction / Experimental fiction as true"],
            ["Poetry list", "Poetry + specific form when dominant"],
            ["Comics / manga list", "Manga or Manhwa or Graphic novels + official genre comic term"],
            ["Narrative nonfiction", "Memoirs or True crime stories or Travel writing or Essays"],
            ["Children’s picture list", "Picture books; optional Nursery rhymes / Alphabet books / Folk tales"],
            ["Audio program", "Audiobooks + the work terms"],
        ],
        [2200, 4760],
    )
    p(doc, "", space_after=8)

    doc.add_heading("26. Local overlay (Tier 2) — kept off the authority file", 2)
    p(
        doc,
        "The overlay is necessary because LCGFT will not grow at the speed of the romance market. House rule: every Tier 2 value "
        "has a written definition, an owner, and a crosswalk note back to the LCGFT term it sits under. No Tier 2 value is allowed "
        "to reuse an official LCGFT string with a different meaning. No Tier 2 value is exported in a 655 $2 lcgft field.",
        align="justify",
    )

    # PART VI
    doc.add_page_break()
    doc.add_heading("Part VI — Complete hierarchical forest", 1)
    p(
        doc,
        "Every authorized preferred term appears below under each of its broader terms. Because 693 terms have more than one "
        "parent, those terms appear more than once. That repetition is correct. Indentation is narrower-term depth from the heading "
        "you are under, not absolute depth from a top-level term. Sort at every level is alphabetical, case-insensitive.",
        align="justify",
    )
    p(
        doc,
        "How to read a line: the label is the preferred term. A muted numeral in parentheses is the count of unique descendants "
        "under that node (omitted when zero). Leaf terms have no children in this snapshot.",
        size=10,
        italic=True,
        color=SLATE,
    )
    for top in TOPS:
        emit_tree(doc, top, 2)

    doc.add_page_break()
    doc.add_heading("Priority mid-level trees (repeated for operators)", 2)
    p(
        doc,
        "The following nodes already appear inside the top-level forests above. They are repeated here because they are the nodes "
        "editors actually open. The trees are official and complete.",
        align="justify",
    )
    for node in [
        "Fiction",
        "Novels",
        "Short stories",
        "Romance fiction",
        "Detective and mystery fiction",
        "Science fiction",
        "Fantasy fiction",
        "Horror fiction",
        "Paranormal fiction",
        "Queer fiction",
        "Religious fiction",
        "Poetry",
        "Drama",
        "Comics (Graphic works)",
        "Manga",
        "Graphic novels",
        "Creative nonfiction",
        "Biographies",
        "Autobiographies",
        "Folk literature",
        "Folk tales",
        "Picture books",
        "Audiobooks",
        "Adaptations",
    ]:
        if node in terms:
            emit_tree(doc, node, 3)

    # PART VII
    doc.add_page_break()
    doc.add_heading("Part VII — A–Z authority file", 1)
    p(
        doc,
        "Every authorized preferred term in the snapshot, in case-insensitive alphabetical order. Broader terms are the official "
        "BT set. Depth is the longest simple path to a top-level term. NT is the count of direct narrower terms. Use this table "
        "as the spell-check source for the engine.",
        align="justify",
    )
    az_rows = []
    for t in sorted(terms.keys(), key=str.casefold):
        bts = terms[t]["bt"]
        bt_s = "; ".join(bts) if bts else "— (top-level)"
        az_rows.append([t, bt_s, str(DEPTH[t]), str(DIRECT[t])])
    simple_table(doc, ["Preferred term", "Broader term(s)", "Depth", "Direct NT"], az_rows, [2600, 3160, 600, 600])

    # PART VIII
    doc.add_page_break()
    doc.add_heading("Part VIII — Working indexes", 1)
    doc.add_heading("27. Multi-parent terms (polyhierarchy index)", 2)
    p(
        doc,
        "All 693 terms with two or more broader terms. Use this index when a record looks “double tagged” and you need to know "
        "whether the vocabulary itself sits in two families.",
        align="justify",
    )
    mp_rows = []
    for t in sorted(terms.keys(), key=str.casefold):
        bts = terms[t]["bt"]
        if len(bts) > 1:
            mp_rows.append([t, str(len(bts)), "; ".join(bts)])
    simple_table(doc, ["Preferred term", "n BT", "Broader terms"], mp_rows, [2600, 700, 3660])
    p(doc, "", space_after=8)

    doc.add_heading("28. Leaf terms under Fiction", 2)
    p(
        doc,
        "Fiction-descended terms with no narrower term of their own. These are the most specific official fiction headings available today.",
        align="justify",
    )
    fic_desc = descendants("Fiction")
    fic_leaves = sorted([t for t in fic_desc if DIRECT[t] == 0], key=str.casefold)
    for t in fic_leaves:
        bullet(doc, t)

    doc.add_heading("29. Terms the book engine should reject on a prose-monograph record", 2)
    p(
        doc,
        "A non-exhaustive but operational reject-class. If a proposed LCGFT value’s family is one of the following and the carrier "
        "is a print or ebook monograph, the engine flags the record for a human. Exceptions exist (a book of maps; a printed score; "
        "a screenplay published as literature — Drama / Screenplays is allowed).",
        align="justify",
    )
    for t in [
        "Most of Music and all recorded-music genre terms on a prose book record",
        "Motion pictures / Television programs / Radio programs families, except when the object is a published screenplay, teleplay, or radio script (use Screenplays, Television plays, Radio plays, Radio scripts)",
        "Cartographic materials, except a book that is constitutively an atlas or map",
        "Law materials, except a trade book that is actually a statute, restatement, or law-for-laypersons object",
        "Microform materials or Incunabula as lead terms on a new trade title",
        "Carrier terms that describe a different ISBN (Audiobooks on a print ISBN; Large print books on a standard-print ISBN)",
    ]:
        bullet(doc, t)

    doc.add_heading("Appendix A — Data dictionary for the book engine", 1)
    simple_table(
        doc,
        ["Field", "Type", "Rule"],
        [
            ["work.lcgft", "array of string", "Exact preferred terms from Part VII. 1–4 values. Required."],
            ["work.lcgft_primary", "string", "First term; predominant genre/form, following LCGFT Manual J 113."],
            ["work.mangu_facets", "array of string", "Tier 2 controlled values. Separate authority. Never copied into work.lcgft."],
            ["work.audience", "enum", "ONIX audience code or house equivalent. Not LCGFT."],
            ["work.language", "ISO 639-3 / BCP 47", "Edition language. Not LCGFT unless Multilingual works is true of the object."],
            ["manifestation.form_flags", "array of string", "Subset of LCGFT form terms that describe this carrier: Audiobooks, Large print books, Braille books, Picture books, Board books."],
            ["work.derivative_flags", "array of string", "Adaptations, Translations, Novelizations, Abridgments — only when the object is that derivative."],
            ["authority.snapshot_id", "string", "lcgft-2025-12 / compiled-2026-08-19. Stored so later LOC updates can be diffed."],
        ],
        [2000, 1800, 3160],
    )
    p(doc, "", space_after=8)

    doc.add_heading("Appendix B — Source, versioning, and prohibited actions", 1)
    p(
        doc,
        "Source of terms and relationships: Library of Congress Linked Data Service, authorities/genreForms SKOS bulk export, "
        "compiled into a BT list on 19 August 2026. Companion official printed list: Library of Congress, Genre/Form Terms PDF, "
        "updated December 2025, at https://www.loc.gov/aba/publications/FreeLCGFT/GENRE-FORM.pdf. Live headings, scope notes, "
        "and URIs: https://id.loc.gov/authorities/genreForms.",
        align="justify",
    )
    p(
        doc,
        "This snapshot contains 2,681 preferred terms, 3,401 broader-term relationships, and 26 top-level terms. It is a closed "
        "graph: every broader term used in the snapshot is itself an authorized preferred term.",
        align="justify",
    )
    p(doc, "This document is not allowed to:", size=11, bold=True, color=NAVY, space_before=8)
    for t in [
        "Invent, rename, or locally respell an LCGFT preferred term.",
        "Treat a used-for reference, a translation, or a BISAC/THEMA heading as if it were LCGFT.",
        "Claim WCAG, EPUB Accessibility 1.1, EAA, or retailer certification on the basis of a genre tag.",
        "Declare a title “children’s” or “YA” via LCGFT.",
        "Put a moving-image or recorded-music heading on a prose monograph record.",
        "Be cited as the Library of Congress. It is a house working bible derived from LOC data.",
    ]:
        bullet(doc, t)
    p(
        doc,
        "When LOC issues a monthly LCGFT list that adds, cancels, or revises a heading, the engine snapshot is rebuilt, this bible "
        "is recompiled, and in-flight records using a cancelled heading are queued for remapping. No editor remaps by memory.",
        align="justify",
        space_before=8,
    )
    p(doc, "— end of MANGU LCGFT Master Taxonomy v1.0 —", size=11, italic=True, color=MUTED, align="center", space_before=24)

    doc.save(OUT)
    print("wrote", OUT)


if __name__ == "__main__":
    main()
