import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Unterhaltsreinigung Düsseldorf | Regelmäßige Reinigung | Huwa',
  description: 'Professionelle Unterhaltsreinigung in Düsseldorf. Regelmäßige Reinigung nach Plan für Büros, Praxen und Gewerberäume. Jetzt Angebot anfragen!',
};

export default function UnterhaltsreinigungPage() {
  return (
    <ServicePage
      icon="🔄"
      title="Unterhaltsreinigung"
      breadcrumb="Unterhaltsreinigung"
      subtitle="Regelmäßige Reinigung nach Plan – damit Ihre Räume dauerhaft sauber, hygienisch und gepflegt bleiben. Individuelle Reinigungsintervalle nach Ihrem Bedarf."
      description={`Die Unterhaltsreinigung – auch Regelmäßige Reinigung oder Wartungsreinigung genannt – ist die kontinuierliche Pflege Ihrer Räume, die für ein dauerhaft sauberes und hygienisches Erscheinungsbild sorgt.

Im Gegensatz zur einmaligen Grundreinigung ist die Unterhaltsreinigung ein langfristiger Service, der nach einem individuell abgestimmten Plan durchgeführt wird. Intervalle und Leistungsumfang werden gemeinsam mit Ihnen festgelegt – täglich für stark frequentierte Bereiche, wöchentlich für Büros mit weniger Besucherverkehr oder zweiwöchentlich für Räume mit geringem Reinigungsbedarf.

Huwa bietet Unterhaltsreinigung für alle Arten von Objekten: Büros und Praxen, Einzelhandelsgeschäfte, Gastronomiebetriebe, Kindergärten, Schulen, Industriebetriebe und vieles mehr. Ein festes Reinigungsteam gewährleistet gleichbleibende Qualität.`}
      benefits={[
        'Feste Reinigungskräfte für Ihr Objekt',
        'Gleichbleibende Qualität durch festes Team',
        'Flexible Intervalle anpassbar',
        'Transparente Leistungsdokumentation',
        'Keine Personalaufwand für Sie',
        'Inkl. Urlaubsvertretung',
        'Monatliche Abrechnung',
        'Sofort kündbar – keine Mindestlaufzeit',
      ]}
      features={[
        { title: 'Böden reinigen', desc: 'Staubsaugen, Kehren und Feuchtwischen aller Bodenbeläge.' },
        { title: 'Oberflächen abstauben', desc: 'Schreibtische, Regale, Fensterbänke und alle horizontalen Flächen.' },
        { title: 'Papierkörbe leeren', desc: 'Entleerung und ggf. Auskleiden aller Abfallbehälter.' },
        { title: 'Sanitärpflege', desc: 'WC, Waschbecken und Armaturen reinigen und desinfizieren.' },
        { title: 'Küchenpflege', desc: 'Küchenflächen, Spüle, Kaffeemaschine und Kühlschrank außen reinigen.' },
        { title: 'Türen & Schalter', desc: 'Fingerabdrücke von Türen, Lichtschaltern und Griffen entfernen.' },
      ]}
      faq={[
        { q: 'Was ist der Unterschied zwischen Unterhaltsreinigung und Grundreinigung?', a: 'Die Unterhaltsreinigung ist die regelmäßige Pflegereinigung, die oberflächliche Sauberkeit gewährleistet. Die Grundreinigung ist eine intensive Tiefenreinigung und wird einmalig oder jährlich durchgeführt. Ideal ist die Kombination: regelmäßige Unterhaltsreinigung plus gelegentliche Grundreinigung.' },
        { q: 'Kann ich den Reinigungsintervall anpassen?', a: 'Ja, absolut. Wir passen den Reinigungsintervall jederzeit an Ihre Bedürfnisse an – auch saisonal. Wenn z.B. weniger Mitarbeiter im Büro sind, können wir die Häufigkeit reduzieren.' },
        { q: 'Haben wir immer dieselben Reinigungskräfte?', a: 'Ja, bei der Unterhaltsreinigung arbeiten Sie immer mit denselben Personen zusammen, die Ihr Objekt kennen. Im Krankheitsfall stellen wir eine eingewiesene Vertretung.' },
        { q: 'Kann ich auch kurzfristig zusätzliche Reinigungen beauftragen?', a: 'Ja, unsere Kunden können kurzfristig Zusatzreinigungen anfragen, z.B. vor Betriebsbesichtigungen oder nach Veranstaltungen.' },
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Unterhaltsreinigung Düsseldorf',
        provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
        description: 'Regelmäßige Unterhaltsreinigung für Büros, Praxen und Gewerberäume in Düsseldorf.',
        areaServed: siteConfig.serviceAreas,
        serviceType: 'Unterhaltsreinigung',
      }}
    />
  );
}
