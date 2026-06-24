import type { ServiceKey } from '@/lib/operations-catalog';

const growthCities = [
  { name: 'Neuwied', slug: 'neuwied' },
  { name: 'Koblenz', slug: 'koblenz' },
  { name: 'Bendorf', slug: 'bendorf' },
  { name: 'Hoehr-Grenzhausen', slug: 'hoehr-grenzhausen' },
  { name: 'Haiger', slug: 'haiger' },
  { name: 'Vallendar', slug: 'vallendar' },
  { name: 'Westerwald', slug: 'westerwald' },
  { name: 'Puderbach', slug: 'puderbach' },
  { name: 'Dierdorf', slug: 'dierdorf' },
] as const;

const growthLocalServices = [
  { key: 'gebaudereinigung', label: 'Gebaeudereinigung', offerValue: 'Gebaeudereinigung' },
  { key: 'bueroeinigung', label: 'Bueroreinigung', offerValue: 'Bueroreinigung' },
  { key: 'treppenhausreinigung', label: 'Treppenhausreinigung', offerValue: 'Treppenhausreinigung' },
  { key: 'hausmeisterservice', label: 'Hausmeisterservice', offerValue: 'Hausmeisterdienste' },
  { key: 'winterdienst', label: 'Winterdienst', offerValue: 'Winterdienst' },
] as const;

export type DownloadLandingPage = {
  slug: string;
  documentKey: string;
  title: string;
  metaTitle: string;
  description: string;
  audience: string;
  preview: string[];
  benefits: string[];
  faq: { question: string; answer: string }[];
};

export const downloadLandingPages: DownloadLandingPage[] = [
  {
    slug: 'leistungsverzeichnis-treppenhausreinigung-vorlage',
    documentKey: 'lv_treppenhausreinigung',
    title: 'Leistungsverzeichnis Treppenhausreinigung Vorlage',
    metaTitle: 'Leistungsverzeichnis Treppenhausreinigung Vorlage als PDF',
    description: 'Kostenlose PDF-Vorlage fuer Hausverwaltungen, WEGs und Vermieter: Leistungen, Intervalle, Nebenflaechen und Dokumentation sauber festhalten.',
    audience: 'Hausverwaltungen, WEGs, Vermieter und Objektbetreuer',
    preview: ['Objekt- und Ansprechpartnerdaten', 'Regelleistungen fuer Treppen, Podeste, Handlaeufe und Eingangsbereiche', 'Intervalle, Sonderleistungen und Nachweisfelder'],
    benefits: ['Klare Grundlage fuer Angebote', 'Weniger Rueckfragen vor Objektstart', 'Gut als Vorbereitung fuer eine Ausschreibung'],
    faq: [
      { question: 'Ist die Vorlage ein fertiger Vertrag?', answer: 'Nein. Die Vorlage hilft bei der Leistungsbeschreibung und ersetzt keine rechtliche Vertragspruefung.' },
      { question: 'Kann ich eigene Leistungen ergaenzen?', answer: 'Ja. Die Vorlage ist bewusst so aufgebaut, dass Objektbesonderheiten und Zusatzleistungen ergaenzt werden koennen.' },
      { question: 'Warum muss ich meine E-Mail angeben?', answer: 'Damit der Download-Link zugestellt werden kann und wir nachvollziehen, welche Unterlagen angefragt wurden.' },
    ],
  },
  {
    slug: 'winterdienst-dokumentation-vorlage',
    documentKey: 'winterdienst_dokumentation',
    title: 'Winterdienst Dokumentation Vorlage',
    metaTitle: 'Winterdienst Dokumentation Vorlage PDF fuer 2026/2027',
    description: 'Kostenlose Vorlage fuer Einsatznachweise im Winterdienst: Wetter, Uhrzeit, Flaechen, Streumittel und Besonderheiten nachvollziehbar dokumentieren.',
    audience: 'Eigentuemer, Hausverwaltungen, Gewerbe und Objektbetreuer mit Raeum- und Streupflicht',
    preview: ['Einsatzdatum, Wetter und Temperatur', 'Geraeumte und gestreute Flaechen', 'Streumittel, Hindernisse und Fotohinweise'],
    benefits: ['Hilft bei Nachweispflichten', 'Bessere Uebersicht ueber Saison-Einsaetze', 'Praktisch fuer Winterdienst-Vertraege 2026/2027'],
    faq: [
      { question: 'Ist die Dokumentation verpflichtend?', answer: 'Die Anforderungen haengen vom Objekt und der Verantwortung ab. Eine nachvollziehbare Dokumentation ist in der Praxis sehr sinnvoll.' },
      { question: 'Kann Huwa den Winterdienst dokumentieren?', answer: 'Ja. Bei beauftragten Winterdienstleistungen werden Einsaetze objektbezogen nachvollziehbar festgehalten.' },
      { question: 'Gilt die Vorlage fuer die Saison 2026/2027?', answer: 'Ja. Die Vorlage ist fuer die kommende Saison nutzbar und kann objektbezogen angepasst werden.' },
    ],
  },
  {
    slug: 'objektuebergabe-checkliste-pdf',
    documentKey: 'objektuebergabe_checkliste',
    title: 'Objektuebergabe Checkliste PDF',
    metaTitle: 'Objektuebergabe Checkliste PDF kostenlos herunterladen',
    description: 'Kostenlose Checkliste fuer eine saubere Objektuebergabe: Zustaende, Schluessel, Zugangsdetails, Ansprechpartner und offene Punkte strukturiert erfassen.',
    audience: 'Hausverwaltungen, Eigentuemer, Gewerbebetriebe und Dienstleister beim Objektstart',
    preview: ['Ansprechpartner, Objektbereiche und Flaechen', 'Schluessel, Codes, Alarm- und Zugangshinweise', 'Maengel, Fotos, offene Punkte und Startfreigabe'],
    benefits: ['Sicherer Objektstart', 'Weniger Missverstaendnisse bei der Uebergabe', 'Gute Grundlage fuer Reinigung und Hausmeisterservice'],
    faq: [
      { question: 'Wann sollte die Checkliste genutzt werden?', answer: 'Vor Start einer neuen Betreuung, bei Dienstleisterwechsel oder wenn ein Objekt neu uebernommen wird.' },
      { question: 'Kann Huwa eine Objektaufnahme durchfuehren?', answer: 'Ja. Wir pruefen Objektbereiche, Zugaenge und Besonderheiten vor einem Angebot oder Objektstart.' },
      { question: 'Sind Fotos sinnvoll?', answer: 'Ja. Fotos helfen, Vorschaden und offene Punkte nachvollziehbar festzuhalten.' },
    ],
  },
  {
    slug: 'reinigungsplan-buero-vorlage',
    documentKey: 'reinigungsplan_buero',
    title: 'Reinigungsplan Buero Vorlage',
    metaTitle: 'Reinigungsplan Buero Vorlage als PDF',
    description: 'Kostenlose PDF-Vorlage fuer Bueroreinigung: Raeume, Intervalle, Aufgaben und Qualitaetskontrolle uebersichtlich planen.',
    audience: 'Bueros, Praxen, Kanzleien und Gewerbebetriebe',
    preview: ['Arbeitsplaetze, Sanitärbereiche, Kuechen und Besprechungsraeume', 'Tages-, Wochen- und Monatsaufgaben', 'Kontrollfelder fuer Qualitaet und Rueckmeldung'],
    benefits: ['Klare Aufgaben fuer regelmaessige Reinigung', 'Bessere Vergleichbarkeit von Angeboten', 'Hilfreich fuer interne Abstimmung und Dienstleisterwechsel'],
    faq: [
      { question: 'Wie detailliert sollte ein Reinigungsplan sein?', answer: 'So detailliert, dass Aufgaben, Intervalle und Verantwortlichkeiten eindeutig sind, aber noch praktisch im Alltag bleiben.' },
      { question: 'Kann der Plan fuer Praxen genutzt werden?', answer: 'Ja, als Grundlage. Hygieneanforderungen muessen je nach Praxis separat beruecksichtigt werden.' },
      { question: 'Erstellt Huwa individuelle Reinigungsplaene?', answer: 'Ja. Bei einem Angebot stimmen wir den Plan passend zu Objekt, Nutzung und Zeiten ab.' },
    ],
  },
];

export type CostPage = {
  slug: string;
  serviceKey: ServiceKey;
  serviceTitle: string;
  title: string;
  description: string;
  factors: string[];
  example: string;
  period: 'Monat' | 'Auftrag' | 'Saison';
};

export const costPages: CostPage[] = [
  {
    slug: 'treppenhausreinigung-kosten',
    serviceKey: 'treppenhaus',
    serviceTitle: 'Treppenhausreinigung',
    title: 'Treppenhausreinigung Kosten',
    description: 'Welche Faktoren die Kosten der Treppenhausreinigung beeinflussen und wie Hausverwaltungen realistisch planen.',
    factors: ['Anzahl der Etagen und Eingänge', 'Reinigungsintervall', 'Aufzüge, Keller und Gemeinschaftsflächen', 'Nutzungsintensität und Verschmutzung'],
    example: 'Mehrfamilienhäuser werden meist als monatliche Pauschale angeboten, nachdem Etagen, Eingänge und Nebenflächen geprüft wurden.',
    period: 'Monat',
  },
  {
    slug: 'bueroeinigung-kosten',
    serviceKey: 'buero',
    serviceTitle: 'Bueroreinigung',
    title: 'Bueroreinigung Kosten',
    description: 'Kostenfaktoren fuer Bueroreinigung in Praxen, Kanzleien, Verwaltungen und Gewerbeflaechen.',
    factors: ['Bueroflaeche und Arbeitsplätze', 'Sanitär- und Küchenbereiche', 'Reinigungszeiten ausserhalb des Betriebs', 'Intervall von wöchentlich bis täglich'],
    example: 'Regelmäßige Bueroreinigung wird in der Praxis meist als monatliche Pauschale kalkuliert.',
    period: 'Monat',
  },
  {
    slug: 'winterdienst-kosten',
    serviceKey: 'winter',
    serviceTitle: 'Winterdienst',
    title: 'Winterdienst Kosten',
    description: 'Wie sich Winterdienst-Kosten fuer die Saison 2026/2027 zusammensetzen: Flaechen, Bereitschaft, Einsaetze und Streumittel.',
    factors: ['Raeum- und Streuflaeche', 'Gehweg, Hof oder Parkfläche', 'Bereitschaft und Kontrollfahrten', 'Streumittelbedarf und Handarbeitsanteil'],
    example: 'Winterdienst wird sinnvoll als Saisonpauschale mit klarer Leistungsbeschreibung und Dokumentation angeboten.',
    period: 'Saison',
  },
  {
    slug: 'glasreinigung-kosten',
    serviceKey: 'glas',
    serviceTitle: 'Glasreinigung',
    title: 'Glasreinigung Kosten',
    description: 'Was Glasreinigung kostet und welche Rolle Glasfläche, Rahmen, Erreichbarkeit und Verschmutzung spielen.',
    factors: ['Glasfläche und zu reinigende Seiten', 'Rahmenreinigung und Falze', 'Leiter, Hubsteiger oder Spezialzugang', 'Viele kleine Scheiben oder große Glasfronten'],
    example: 'Glasreinigung wird häufig als Auftragspreis kalkuliert, abhängig von Fläche und Zugänglichkeit.',
    period: 'Auftrag',
  },
  {
    slug: 'gebaeudereinigung-kosten',
    serviceKey: 'unterhalt',
    serviceTitle: 'Gebaeudereinigung',
    title: 'Gebaeudereinigung Kosten',
    description: 'Ueberblick ueber Kostenfaktoren in der Gebaeudereinigung: Flaechen, Nutzung, Intervall und Leistungsumfang.',
    factors: ['Regelmaessig zu reinigende Flaechen', 'Objektart und Publikumsverkehr', 'Sanitaerbereiche, Abfallstellen und Sonderflaechen', 'Gewuenschte Qualitaets- und Dokumentationsstandards'],
    example: 'Bei laufender Gebaeudereinigung ist ein abgestimmter Leistungsplan wichtiger als ein grober Quadratmeterpreis.',
    period: 'Monat',
  },
];

export const caseStudies = [
  {
    slug: 'treppenhausreinigung-wohnanlage-neuwied',
    title: 'Treppenhausreinigung fuer eine Wohnanlage in Neuwied',
    description: 'Anonymes Beispiel: klare Intervalle, Nebenflaechen und Qualitaetskontrolle fuer eine Wohnanlage.',
    service: 'Treppenhausreinigung',
    city: 'Neuwied',
    objectType: 'Wohnanlage',
    challenge: 'Die Reinigung sollte verlaesslich, nachvollziehbar und ohne wechselnde Zuständigkeiten organisiert werden.',
    solution: ['Objektaufnahme mit Eingängen, Etagen und Nebenflächen', 'Leistungsverzeichnis mit festen Intervallen', 'Regelmäßige Sichtkontrolle und direkter Ansprechpartner'],
    result: 'Das Objekt erhält einen klaren Ablauf mit dokumentiertem Leistungsumfang und weniger Abstimmungsaufwand.',
  },
  {
    slug: 'bueroeinigung-gewerbe-koblenz',
    title: 'Bueroreinigung fuer ein Gewerbeobjekt in Koblenz',
    description: 'Anonymes Beispiel: Reinigung ausserhalb der Betriebszeiten mit abgestimmtem Reinigungsplan.',
    service: 'Bueroreinigung',
    city: 'Koblenz',
    objectType: 'Gewerbeobjekt',
    challenge: 'Die Reinigung musste zu den Arbeitszeiten passen und Sanitär- sowie Küchenbereiche zuverlässig abdecken.',
    solution: ['Reinigungsplan nach Raumgruppen', 'Abstimmung geeigneter Zeitfenster', 'Aufgabenplan fuer Tages- und Wochenleistungen'],
    result: 'Die Reinigung ist planbar, besser vergleichbar und für den laufenden Betrieb weniger störend.',
  },
  {
    slug: 'winterdienst-wohnanlage-westerwald',
    title: 'Winterdienst fuer eine Wohnanlage im Westerwald',
    description: 'Anonymes Beispiel: Saisonbetreuung mit Einsatzdokumentation fuer Gehwege und Zufahrten.',
    service: 'Winterdienst',
    city: 'Westerwald',
    objectType: 'Wohnanlage',
    challenge: 'Für die Saison 2026/2027 sollten Räum- und Streupflichten klar geregelt und dokumentiert werden.',
    solution: ['Flaechenabgrenzung vor Saisonstart', 'Saisonkalkulation mit Bereitschaft und Einsätzen', 'Dokumentation von Wetter, Uhrzeit, Fläche und Streumittel'],
    result: 'Die Verantwortlichkeiten sind vor der Saison geklärt und Einsätze lassen sich nachvollziehen.',
  },
];

export const locationHubs = growthCities
  .map((city) => ({
    ...city,
    path: `/standorte/${city.slug}`,
    title: `Gebaeudedienste in ${city.name}`,
    description: `Gebaeudereinigung, Bueroreinigung, Treppenhausreinigung, Hausmeisterservice und Winterdienst in ${city.name}. Kostenloses Angebot von Huwa anfordern.`,
    services: growthLocalServices.map((service) => ({
      ...service,
      href: `/${service.key}-${city.slug}`,
    })),
  }));

export function getDownloadLandingPage(slug: string) {
  return downloadLandingPages.find((page) => page.slug === slug) || null;
}

export function getCostPage(slug: string) {
  return costPages.find((page) => page.slug === slug) || null;
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug) || null;
}

export function getLocationHub(slug: string) {
  return locationHubs.find((hub) => hub.slug === slug) || null;
}
