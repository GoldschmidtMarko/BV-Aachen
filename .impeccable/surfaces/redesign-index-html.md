---
version: 1
slug: "redesign-index-html"
primary_target: "redesign/index.html"
related_targets: ["redesign/training.html","redesign/teams.html","redesign/alemannencup.html"]
---

# Surface brief: BV Aachen redesign mock (Start, Training, Mannschaften, Alemannen Cup)

Scope: full-site redesign mock under `redesign/`; live pages untouched until approved. Mode: Persuade (Start, Cup), Operate-leaning (Training schedule).
Audience: new adult players first. Action: find a session that fits your level, then write to vorsitz@ / seniorentraining@. Proof: real team photos, real schedule, real league levels, real cup photos.
Constraints: static HTML, German first with EN toggle, FTP deploy, no invented stats.

## Direction contract

THESIS: The club told in the grammar of a BWF TV broadcast — score bug, lower-third name plates, stat plates, the net line as horizon. Refuses the category default of a video hero with centred title plus identical gradient cards.

OWN-WORLD: Broadcast plates in deep jersey navy (#0B1B2B) with white type, jersey petrol (#0F7C8F) owning whole bands, hall-floor orange (#E8632B) spent only on LIVE/now and the primary action. Archivo at varied widths (expanded caps for plates, condensed for names), Martian Mono tabular digits for every time and score. Plates are hard-edged with a slanted leading edge like TV graphics; one thin white net line runs across each page.

STORY: A newcomer sees real players mid-rally, reads "what's on tonight" in a live score bug, understands the level ladder from Bezirksklasse to Verbandsliga, and knows which email to write.

FIRST VIEWPORT: Full-bleed action photo (cup25 lunge) as the "broadcast feed". Top-left persistent score bug: BVA 09 crest plate | LIVE dot + current/next session computed from the schedule. Bottom-left lower third: huge "BV AACHEN" plate, second plate "2009 e.V. · Aachens größter Badmintonverein". Bottom-right: two action plates "Trainingszeiten" (orange, primary) and "Mitspielen?". Net line crosses at 62% height.

FORM: BWF broadcast graphics package; position 7 on the re-rolled grounded list; seed key 58e2ffc2 (reroll 1). Raises: loteria → every session named and numbered; deep dive → monospaced tabular digits on one axis; indoor sun → the net line as the single horizon; shader portal → one signature stinger wipe (language switch / page entry).

Signature interaction: live score bug that knows what is on right now; lower-thirds wipe in via clip-path once on first view.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
