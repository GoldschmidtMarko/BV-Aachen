# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML + Tailwind CSS (standalone CLI, `tailwind.config.js`, `styles/input.css` → `styles/output.css`). No build framework. Deployed by FTP via `cicd/upload_script.py` (allow-list, `#upload` / `#force` commit flags). Alemannen Cup registration posts to PHP (`php/register.php`). Confirmed by the user: keep this stack.

## Users

Primary: **new adult players** — students and newcomers to Aachen, often with previous league experience elsewhere, looking for where and when to play, whether their level fits, and how to join.

Secondary: existing members (training times, holiday closures), parents (youth training, currently waitlisted), Alemannen Cup participants from DE/BE/NL (dates, registration, results, venue).

## Product Purpose

Website of BV Aachen 2009 e.V., a pure badminton club in Aachen. It answers "can I play here, when, where, and how do I start?" and serves as the home of the club's teams and its annual Alemannen Cup tournament. Success: a new player finds the right session, understands the level expectations honestly, and gets in touch or joins.

## Positioning

Largest badminton club in Aachen and the region (~200 members), clearly competition-oriented in the adult section: five senior teams from Bezirksklasse to Verbandsliga plus youth teams (U19, U15) in BLV-NRW leagues. Free play draws former league players, students, and players from other clubs up to Regionalliga level. Hosts the international Alemannen Cup (~300 players from DE, BE, NL). Founded as a spin-off of TSV Alemannia Aachen.

## Operating Context

- Two halls: Laurensberg (Anne-Frank-Gymnasium Halle II, Hander Weg 89, 52072) and Burtscheid (Einhard-Gymnasium TH II, Malmedyer Str. 55, 52066).
- Summer (01.04–30.09) and winter schedules; weekday evenings 18:00–23:00. Session types: Kinder & Jugend Training, Anfänger Training, Mannschaftstraining, Freies Spiel (Senioren).
- NRW school holidays: Burtscheid open, Laurensberg closed; both closed over Christmas holidays.
- Monday team training is for team players only; Thursday beginner session and youth training have waiting lists (youth 9–12 months).
- Alemannen Cup: June weekend, Hexenkessel, Neuköllner Str. 9, 52068 Aachen; five disciplines, classes Elite/Premium/Standard/Basic/Fun (VL/LL/BL/BK/KL); flyers in DE/EN/NL/FR; results linked externally; photo galleries per year.
- Membership: paper form handed to a board member; questions to the treasurer.

## Capabilities and Constraints

- Bilingual DE (default) / EN via `data-lang` spans and `javascripts/language-toggle.js`.
- Pages: Start, Alemannen Cup, Mannschaften, Training, Mitglied werden, Kontakt, FAQ, Impressum, Datenschutz, Registration + Success.
- Team league badges link to dbv.turnier.de.
- Contact is role-based email addresses (vorsitz@, kassenwart@, jugendwart@, seniorentraining@ …).

## Brand Commitments

- Name: BV Aachen 2009 e.V. / "BVA 09".
- Logo: `images/Logo.png` — black-and-white shuttlecock on an orbit ellipse with "BVA 09" lettering.
- Tagline in use: "Leidenschaft. Leistung. Gemeinschaft."
- Voice: honest and direct, especially about level expectations for newcomers.

## Evidence on Hand

- Team photos: `images/teams/` (2022 and `2025/`); board portraits: `images/*.jpg`.
- Alemannen Cup photos: `images/alemancup24`, `alemancup25`, `alemancup26` (with thumbs).
- Hero video: `videos/startpage.mp4`.
- Sponsors: STAWAG (`images/stawag-logo-orange.svg`), regio iT (`images/Logo-regio iT-web.png`).
- FAQ text (Stand Juli 2024), membership PDFs in `files/`.
- No testimonials, member quotes, or statistics beyond those stated above; do not invent them.

## Product Principles

1. Answer the newcomer's first question fast: when and where can I play, and is it my level?
2. Be honest about level and waiting lists; set expectations rather than oversell.
3. Treat schedules and addresses as the core content, always current and scannable on a phone.
4. Show the club as real people and real teams, not stock imagery.
5. Keep German first, English equal.

## Accessibility & Inclusion

Bilingual audience (many international students). Gender-inclusive German wording is used (Spieler:innen). Mobile use at the hall entrance is common.
