import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gebäudereinigung Düsseldorf | Professionell & Zuverlässig | Huwa',
  description: 'Professionelle Gebäudereinigung in Düsseldorf und NRW. Außenfassaden, Eingangsbereiche, Tiefgaragen – alles aus einer Hand. Kostenlos anfragen!',
  alternates: { canonical: `${siteConfig.url}/leistungen/gebaeudereinigung` },
};

export default function GebaeudereinigungPage() {
  return (
    <ServicePage
      icon="🏢"
      title="Gebäudereinigung"
      breadcrumb="Gebäudereinigung"
      subtitle="Professionelle Reinigung von Bürogebäuden, Wohnhäusern und Gewerbeimmobilien in Düsseldorf und NRW – zuverlässig, gründlich und zu fairen Preisen."
      description={`Gebäudereinigung ist weit mehr als das bloße Entfernen von sichtbarem Schmutz. Professionelle Gebäudereinigung schützt Ihre Immobilie, verlängert die Lebensdauer von Oberflächen und sorgt für ein einladendes Erscheinungsbild, das bei Mitarbeitern, Kunden und Besuchern einen positiven Eindruck hinterlässt.

Huwa Gebäudereinigung bietet maßgeschneiderte Reinigungslösungen für Bürogebäude, Wohnhäuser, Einkaufszentren, Industriehallen und jede Art von Gewerbeimmobilie. Mit moderner Ausrüstung, zertifizierten Reinigungsmitteln und geschultem Personal garantieren wir höchste Reinigungsqualität.

Unsere Gebäudereinigung umfasst alle Bereiche Ihres Objektes: von der Außenfassade über Eingangsbereiche und Treppenhäuser bis hin zu Tiefgaragen und Kelleranlagen. Wir arbeiten nach individuellem Plan – täglich, wöchentlich, monatlich oder nach Bedarf.`}
      benefits={[
        'Über 15 Jahre Erfahrung in der Gebäudereinigung',
        'Geschultes und zuverlässiges Personal',
        'Umweltfreundliche Reinigungsmittel',
        'Flexible Reinigungsintervalle',
        'Versichert und haftpflichtgesichert',
        'Kostenloses Erstgespräch und Angebot',
        'Regelmäßige Qualitätskontrollen',
        'Transparente Preisgestaltung',
      ]}
      features={[
        { title: 'Außenfassadenreinigung', desc: 'Professionelle Reinigung von Fassaden, Klinker, Putz und anderen Außenoberflächen.' },
        { title: 'Eingangsbereiche & Foyers', desc: 'Repräsentative Eingangsbereiche, die einen bleibenden positiven Eindruck hinterlassen.' },
        { title: 'Tiefgaragen & Parkhäuser', desc: 'Gründliche Reinigung von Parkdecks, inkl. Ölflecken und Reifenabrieb.' },
        { title: 'Treppenhäuser', desc: 'Regelmäßige Reinigung von Treppen, Handläufen und Gemeinschaftsflächen.' },
        { title: 'Sanitäranlagen', desc: 'Hygienische Reinigung und Desinfektion aller WC- und Waschräume.' },
        { title: 'Außenanlagen', desc: 'Reinigung von Gehwegen, Einfahrten, Terrassen und Außenbereichen.' },
      ]}
      faq={[
        { q: 'Wie oft sollte eine Gebäudereinigung stattfinden?', a: 'Die Häufigkeit hängt von der Nutzungsintensität ab. Bürogebäude werden meist täglich bis wöchentlich gereinigt, Wohnhäuser wöchentlich bis monatlich. Wir beraten Sie gerne und erstellen einen individuellen Reinigungsplan.' },
        { q: 'Welche Gebäudetypen reinigen Sie?', a: 'Wir reinigen alle Arten von Immobilien: Bürogebäude, Wohnhäuser, Einkaufszentren, Industriehallen, Krankenhäuser, Schulen, Hotels und mehr.' },
        { q: 'Wie schnell kann ich ein Angebot erhalten?', a: 'Nach einer kostenlosen Besichtigung erhalten Sie innerhalb von 24–48 Stunden ein detailliertes und verbindliches Angebot.' },
        { q: 'Verwenden Sie umweltfreundliche Reinigungsmittel?', a: 'Ja, wir setzen bevorzugt auf ökologische, biologisch abbaubare Reinigungsmittel, die ebenso effektiv wie umweltschonend sind.' },
        { q: 'Kann ich einen festen Ansprechpartner haben?', a: 'Ja, bei Huwa hat jeder Kunde einen festen Ansprechpartner, der Ihr Objekt und Ihre Anforderungen kennt.' },
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Gebäudereinigung Düsseldorf',
        provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
        description: 'Professionelle Gebäudereinigung für Bürogebäude, Wohnhäuser und Gewerbeimmobilien in Düsseldorf und NRW.',
        areaServed: siteConfig.serviceAreas,
        serviceType: 'Gebäudereinigung',
      }}
    />
  );
}
