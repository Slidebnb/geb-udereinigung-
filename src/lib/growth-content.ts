import type { ServiceKey } from '@/lib/operations-catalog';
import { seoLocations, seoLocalServices } from '@/lib/seo-locations';

const growthCities = seoLocations;
const growthLocalServices = seoLocalServices;

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
    description: 'Kostenlose PDF-Vorlage für Hausverwaltungen, WEGs und Vermieter: Leistungen, Intervalle, Nebenflächen und Dokumentation sauber festhalten.',
    audience: 'Hausverwaltungen, WEGs, Vermieter und Objektbetreuer',
    preview: ['Objekt- und Ansprechpartnerdaten', 'Regelleistungen für Treppen, Podeste, Handläufe und Eingangsbereiche', 'Intervalle, Sonderleistungen und Nachweisfelder'],
    benefits: ['Klare Grundlage für Angebote', 'Weniger Rückfragen vor Objektstart', 'Gut als Vorbereitung für eine Ausschreibung'],
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
    metaTitle: 'Winterdienst Dokumentation Vorlage PDF für 2026/2027',
    description: 'Kostenlose Vorlage für Einsatznachweise im Winterdienst: Wetter, Uhrzeit, Flächen, Streumittel und Besonderheiten nachvollziehbar dokumentieren.',
    audience: 'Eigentümer, Hausverwaltungen, Gewerbe und Objektbetreuer mit Räum- und Streupflicht',
    preview: ['Einsatzdatum, Wetter und Temperatur', 'Geräumte und gestreute Flächen', 'Streumittel, Hindernisse und Fotohinweise'],
    benefits: ['Hilft bei Nachweispflichten', 'Bessere Übersicht über Saison-Einsätze', 'Praktisch für Winterdienst-Verträge 2026/2027'],
    faq: [
      { question: 'Ist die Dokumentation verpflichtend?', answer: 'Die Anforderungen hängen vom Objekt und der Verantwortung ab. Eine nachvollziehbare Dokumentation ist in der Praxis sehr sinnvoll.' },
      { question: 'Kann Huwa den Winterdienst dokumentieren?', answer: 'Ja. Bei beauftragten Winterdienstleistungen werden Einsätze objektbezogen nachvollziehbar festgehalten.' },
      { question: 'Gilt die Vorlage für die Saison 2026/2027?', answer: 'Ja. Die Vorlage ist für die kommende Saison nutzbar und kann objektbezogen angepasst werden.' },
    ],
  },
  {
    slug: 'objektuebergabe-checkliste-pdf',
    documentKey: 'objektuebergabe_checkliste',
    title: 'Objektübergabe Checkliste PDF',
    metaTitle: 'Objektübergabe Checkliste PDF kostenlos herunterladen',
    description: 'Kostenlose Checkliste für eine saubere Objektübergabe: Zustände, Schlüssel, Zugangsdetails, Ansprechpartner und offene Punkte strukturiert erfassen.',
    audience: 'Hausverwaltungen, Eigentümer, Gewerbebetriebe und Dienstleister beim Objektstart',
    preview: ['Ansprechpartner, Objektbereiche und Flächen', 'Schlüssel, Codes, Alarm- und Zugangshinweise', 'Mängel, Fotos, offene Punkte und Startfreigabe'],
    benefits: ['Sicherer Objektstart', 'Weniger Missverständnisse bei der Übergabe', 'Gute Grundlage für Reinigung und Hausmeisterservice'],
    faq: [
      { question: 'Wann sollte die Checkliste genutzt werden?', answer: 'Vor Start einer neuen Betreuung, bei Dienstleisterwechsel oder wenn ein Objekt neu übernommen wird.' },
      { question: 'Kann Huwa eine Objektaufnahme durchführen?', answer: 'Ja. Wir prüfen Objektbereiche, Zugänge und Besonderheiten vor einem Angebot oder Objektstart.' },
      { question: 'Sind Fotos sinnvoll?', answer: 'Ja. Fotos helfen, Vorschaden und offene Punkte nachvollziehbar festzuhalten.' },
    ],
  },
  {
    slug: 'reinigungsplan-buero-vorlage',
    documentKey: 'reinigungsplan_buero',
    title: 'Reinigungsplan Büro Vorlage',
    metaTitle: 'Reinigungsplan Büro Vorlage als PDF',
    description: 'Kostenlose PDF-Vorlage für Büroreinigung: Räume, Intervalle, Aufgaben und Qualitätskontrolle übersichtlich planen.',
    audience: 'Büros, Praxen, Kanzleien und Gewerbebetriebe',
    preview: ['Arbeitsplätze, Sanitärbereiche, Küchen und Besprechungsräume', 'Tages-, Wochen- und Monatsaufgaben', 'Kontrollfelder für Qualität und Rückmeldung'],
    benefits: ['Klare Aufgaben für regelmäßige Reinigung', 'Bessere Vergleichbarkeit von Angeboten', 'Hilfreich für interne Abstimmung und Dienstleisterwechsel'],
    faq: [
      { question: 'Wie detailliert sollte ein Reinigungsplan sein?', answer: 'So detailliert, dass Aufgaben, Intervalle und Verantwortlichkeiten eindeutig sind, aber noch praktisch im Alltag bleiben.' },
      { question: 'Kann der Plan für Praxen genutzt werden?', answer: 'Ja, als Grundlage. Hygieneanforderungen müssen je nach Praxis separat berücksichtigt werden.' },
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
    serviceTitle: 'Büroreinigung',
    title: 'Büroreinigung Kosten',
    description: 'Kostenfaktoren für Büroreinigung in Praxen, Kanzleien, Verwaltungen und Gewerbeflächen.',
    factors: ['Bürofläche und Arbeitsplätze', 'Sanitär- und Küchenbereiche', 'Reinigungszeiten außerhalb des Betriebs', 'Intervall von wöchentlich bis täglich'],
    example: 'Regelmäßige Büroreinigung wird in der Praxis meist als monatliche Pauschale kalkuliert.',
    period: 'Monat',
  },
  {
    slug: 'winterdienst-kosten',
    serviceKey: 'winter',
    serviceTitle: 'Winterdienst',
    title: 'Winterdienst Kosten',
    description: 'Wie sich Winterdienst-Kosten für die Saison 2026/2027 zusammensetzen: Flächen, Bereitschaft, Einsätze und Streumittel.',
    factors: ['Räum- und Streufläche', 'Gehweg, Hof oder Parkfläche', 'Bereitschaft und Kontrollfahrten', 'Streumittelbedarf und Handarbeitsanteil'],
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
    serviceTitle: 'Gebäudereinigung',
    title: 'Gebäudereinigung Kosten',
    description: 'Überblick über Kostenfaktoren in der Gebäudereinigung: Flächen, Nutzung, Intervall und Leistungsumfang.',
    factors: ['Regelmäßig zu reinigende Flächen', 'Objektart und Publikumsverkehr', 'Sanitärbereiche, Abfallstellen und Sonderflächen', 'Gewünschte Qualitäts- und Dokumentationsstandards'],
    example: 'Bei laufender Gebäudereinigung ist ein abgestimmter Leistungsplan wichtiger als ein grober Quadratmeterpreis.',
    period: 'Monat',
  },
];

export const caseStudies = [
  {
    slug: 'treppenhausreinigung-wohnanlage-neuwied',
    title: 'Treppenhausreinigung für eine Wohnanlage in Neuwied',
    description: 'Anonymes Beispiel: klare Intervalle, Nebenflächen und Qualitätskontrolle für eine Wohnanlage.',
    service: 'Treppenhausreinigung',
    city: 'Neuwied',
    objectType: 'Wohnanlage',
    challenge: 'Die Reinigung sollte verlaesslich, nachvollziehbar und ohne wechselnde Zuständigkeiten organisiert werden.',
    solution: ['Objektaufnahme mit Eingängen, Etagen und Nebenflächen', 'Leistungsverzeichnis mit festen Intervallen', 'Regelmäßige Sichtkontrolle und direkter Ansprechpartner'],
    result: 'Das Objekt erhält einen klaren Ablauf mit dokumentiertem Leistungsumfang und weniger Abstimmungsaufwand.',
  },
  {
    slug: 'bueroeinigung-gewerbe-koblenz',
    title: 'Büroreinigung für ein Gewerbeobjekt in Koblenz',
    description: 'Anonymes Beispiel: Reinigung außerhalb der Betriebszeiten mit abgestimmtem Reinigungsplan.',
    service: 'Bueroreinigung',
    city: 'Koblenz',
    objectType: 'Gewerbeobjekt',
    challenge: 'Die Reinigung musste zu den Arbeitszeiten passen und Sanitär- sowie Küchenbereiche zuverlässig abdecken.',
    solution: ['Reinigungsplan nach Raumgruppen', 'Abstimmung geeigneter Zeitfenster', 'Aufgabenplan für Tages- und Wochenleistungen'],
    result: 'Die Reinigung ist planbar, besser vergleichbar und für den laufenden Betrieb weniger störend.',
  },
  {
    slug: 'winterdienst-wohnanlage-westerwald',
    title: 'Winterdienst für eine Wohnanlage im Westerwald',
    description: 'Anonymes Beispiel: Saisonbetreuung mit Einsatzdokumentation für Gehwege und Zufahrten.',
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
    title: `Gebäudedienste in ${city.name}`,
    description: `Gebäudereinigung, Büroreinigung, Treppenhausreinigung, Hausmeisterservice und Winterdienst in ${city.name}. Kostenloses Angebot von Huwa anfordern.`,
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
