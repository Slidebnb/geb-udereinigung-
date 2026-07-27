# Branchenlösungen SEO Design

## Ziel

Huwa erhält elf eigenständige, indexierbare Branchenlösungen für Arztpraxen, Banken, Fitnessstudios, Gastronomie, Hotels, Kanzleien, Kindergärten, Lager/Hallen, Markt- und Filialbetriebe, Treppenhäuser sowie Pflegeeinrichtungen.

## Architektur

Die Brancheninhalte liegen als typisierte Daten in einer zentralen `industry-solutions.ts`. Eine dynamische Next.js-Route rendert daraus alle Detailseiten. Dadurch bleiben H1, Metadaten, Breadcrumbs, FAQ-Struktur, interne Links und CTAs konsistent, während jede Branche eigene Suchintentionen und Leistungsbausteine erhält.

Die Übersicht `/branchenloesungen` verlinkt alle Branchen. Detailseiten erhalten Canonical, Open Graph/Twitter, Breadcrumb-JSON-LD, LocalBusiness-/Service-JSON-LD und sichtbare FAQs. Die Sitemap und HTML-Sitemap verwenden dieselbe zentrale Liste.

## Inhaltliche Regeln

- Jede Seite hat genau eine H1.
- Keine erfundenen Kunden, Bewertungen, Zertifizierungen, Mitarbeiterzahlen oder Garantien.
- Medizinische und pflegerische Inhalte beschreiben Reinigungs- und Organisationsleistungen, keine medizinische oder rechtliche Beratung.
- Aussagen wie „RKI-konform“, „zertifiziert“ oder „steril“ werden nur verwendet, wenn dafür im Repo ein belegbarer Unternehmensnachweis existiert. Andernfalls wird vorsichtig von Hygieneplan, dokumentierten Abläufen und objektbezogener Abstimmung gesprochen.
- Jeder CTA führt zu `/angebot?service=<service>` und übernimmt die Branchenlösung als Anfragekontext.

## SEO-Struktur pro Detailseite

1. Breadcrumb und H1 mit Branche plus Leistung.
2. Individueller Hero mit Suchintention und Angebots-CTA.
3. „Typische Anforderungen“ der Branche.
4. Konkrete Leistungsbausteine.
5. Ablauf von Objektaufnahme bis Qualitätskontrolle.
6. Branchenbezogene Vorteile ohne unbelegte Versprechen.
7. FAQ mit sichtbarer Darstellung und JSON-LD.
8. Verlinkung zu passenden Huwa-Leistungsseiten, Preisrechner, Download und Angebot.

## Teststrategie

- Ein datenbasierter Test prüft elf eindeutige Slugs, eindeutige H1-relevante Titel, Metadaten, FAQ-Daten und Angebotslinks.
- SEO-Audit prüft alle Sitemap-URLs auf `200`, Canonical, Description und fehlendes `noindex`.
- Build und Lint prüfen Next.js/TypeScript.
- Browserprüfung kontrolliert Übersicht, eine Detailseite und mobile Darstellung.
