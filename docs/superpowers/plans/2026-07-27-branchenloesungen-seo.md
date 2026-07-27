# Branchenlösungen SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elf echte, individuelle und technisch saubere Branchenlösungen für Huwa veröffentlichen, ohne die bestehende Leistungs-/Stadtseitenlogik zu duplizieren.

**Architecture:** Eine typisierte `industry-solutions.ts` liefert Brancheninhalte, Slugs, SEO-Daten und Verlinkungen. `/branchenloesungen` und `/branchenloesungen/[slug]` rendern daraus Übersicht und Detailseiten; Sitemap und HTML-Sitemap beziehen ihre Routen aus derselben Datenquelle.

**Tech Stack:** Next.js App Router, TypeScript, React Server Components, bestehende `siteConfig`, `Breadcrumb`, `seo-routes`, Tailwind CSS, `tsx`-Smoke-Test.

## Global Constraints

- Jede Seite hat genau eine H1.
- Keine erfundenen Kunden, Bewertungen, Zertifizierungen, Mitarbeiterzahlen oder Garantien.
- Medizinische und pflegerische Inhalte beschreiben Reinigungs- und Organisationsleistungen, keine medizinische oder rechtliche Beratung.
- Preise bleiben im bestehenden Preisrechner und werden nicht in Branchen-Seiten neu berechnet.
- Die elf Branchen werden über eine zentrale Datenquelle gepflegt.
- Öffentliche CTAs verwenden `/angebot?service=<service>`; interne Werte wie Stundenlohn und Marge bleiben unsichtbar.

### Task 1: Branchen-Datenquelle und Regressionstest

**Files:**
- Create: `src/lib/industry-solutions.ts`
- Create: `scripts/industry-solutions-test.ts`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

Der Test importiert die Datenquelle und prüft exakt elf eindeutige Slugs, individuelle SEO-Titel/Beschreibungen, mindestens drei Leistungsbausteine je Branche, mindestens drei FAQs und einen gültigen Angebotslink.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx scripts/industry-solutions-test.ts`
Expected: FAIL, weil `src/lib/industry-solutions.ts` noch nicht existiert.

- [ ] **Step 3: Write minimal implementation**

Implementiere `IndustrySolution` mit `slug`, `title`, `shortTitle`, `serviceKey`, `metaTitle`, `metaDescription`, `hero`, `challenge`, `features`, `process`, `benefits`, `faqs`, `relatedLinks` und `image`. Lege diese Slugs an:

```text
arztpraxis
bank
fitnessstudio
gastronomie
hotel
kanzlei
kindergarten
lager-hallen
markt-filialbetriebe
treppenhaus
pflegeeinrichtung
```

Verwende nur belegbare Huwa-Aussagen und verlinke auf bestehende Leistungen wie Büro-, Unterhalts-, Glas-, Grund-, Treppenhaus-, Hausmeister- und Winterdienstseiten.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx scripts/industry-solutions-test.ts`
Expected: PASS mit elf geprüften Branchen.

- [ ] **Step 5: Commit**

```bash
git add src/lib/industry-solutions.ts scripts/industry-solutions-test.ts package.json
git commit -m "feat: add industry solution content source"
```

### Task 2: Öffentliche Übersicht und Detailroute

**Files:**
- Create: `src/app/branchenloesungen/page.tsx`
- Create: `src/app/branchenloesungen/[slug]/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write the failing route test**

Erweitere den Datenquellentest um die erwarteten Pfade `/branchenloesungen` und `/branchenloesungen/<slug>`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx scripts/industry-solutions-test.ts`
Expected: FAIL, weil die Routen noch nicht existieren.

- [ ] **Step 3: Write minimal implementation**

Baue eine responsive Übersicht mit H1 „Branchenlösungen für professionelle Gebäudedienste“, elf Karten und klarer Anfrageführung. Baue eine Detailseite mit `generateStaticParams`, `generateMetadata`, genau einer H1, Breadcrumbs, Hero, Leistungsbausteinen, Ablauf, Vorteilen, sichtbaren FAQs und einem CTA zu `/angebot?service=<serviceKey>&industry=<slug>`.

Nutze `Service`- und `FAQPage`-JSON-LD nur mit den sichtbaren Inhalten. Nutze das bestehende OG-Bild als Fallback. Keine riesigen Textblöcke und keine Referenztexte kopieren.

- [ ] **Step 4: Run verification**

Run: `npm run lint` and `DATABASE_URL="file:./dev.db" npm run build`
Expected: both commands exit with code 0.

- [ ] **Step 5: Commit**

```bash
git add src/app/branchenloesungen src/app/globals.css
git commit -m "feat: add industry solution landing pages"
```

### Task 3: Sitemap, Navigation und interne Verlinkung

**Files:**
- Modify: `src/lib/seo-routes.ts`
- Modify: `src/app/sitemap/page.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/app/leistungen/page.tsx`

- [ ] **Step 1: Write the failing route-list test**

Erweitere den Datenquellentest um die Forderung, dass alle elf Branchenpfade in `publicSeoRoutes` enthalten sind.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx scripts/industry-solutions-test.ts`
Expected: FAIL, weil `industrySolutionSeoRoutes` noch fehlt.

- [ ] **Step 3: Write minimal implementation**

Erzeuge `industrySolutionSeoRoutes` aus der zentralen Datenquelle und füge sie in `publicSeoRoutes` ein. Ergänze in der HTML-Sitemap eine Gruppe „Branchenlösungen“, im Footer einen kompakten Linkblock und auf der Leistungsübersicht einen unaufdringlichen Branchenlösungs-Link.

- [ ] **Step 4: Run verification**

Run: `npx tsx scripts/industry-solutions-test.ts` and `npm run seo:audit` with a running local production server.
Expected: PASS; alle Branchenpfade sind in XML- und HTML-Sitemap.

- [ ] **Step 5: Commit**

```bash
git add src/lib/seo-routes.ts src/app/sitemap/page.tsx src/components/layout/Footer.tsx src/app/leistungen/page.tsx scripts/industry-solutions-test.ts
git commit -m "feat: expose industry solutions in internal SEO navigation"
```

### Task 4: Browser-QA und Gesamtverifikation

**Files:**
- Modify: `scripts/seo-audit.mjs` only if a concrete missing assertion is found.

- [ ] **Step 1: Run full checks**

Run: `npm run lint`, `npx tsx scripts/industry-solutions-test.ts`, `DATABASE_URL="file:./dev.db" npm run build`.

- [ ] **Step 2: Run browser checks**

Prüfe `/branchenloesungen`, `/branchenloesungen/arztpraxis` und `/branchenloesungen/hotel` auf Desktop und eine Detailseite mobil. Prüfe Navigation, H1, CTA, FAQ und keine Überlappung.

- [ ] **Step 3: Run SEO audit**

Starte den lokalen Production-Server mit `DATABASE_URL="file:./dev.db" NEXTAUTH_SECRET="local-seo-audit-secret"` und führe `node scripts/seo-audit.mjs` aus.

- [ ] **Step 4: Commit verification notes**

```bash
git status --short
git log --oneline -5
```

