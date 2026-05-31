import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Glasreinigung Neuwied | Streifenfrei & Professionell | Huwa',
  description: 'Professionelle Glasreinigung in Neuwied. Fenster, Schaufenster, Glasfassaden – streifenfrei und glänzend. Jetzt Angebot anfragen!',
  alternates: { canonical: `${siteConfig.url}/leistungen/glasreinigung` },
};

export default function GlasreinigungPage() {
  return (
    <ServicePage
      icon="🪟"
      title="Glasreinigung"
      breadcrumb="Glasreinigung"
      subtitle="Streifenfreie, kristallklare Fenster und Glasflächen durch professionelle Reinigungstechnik. Für Privathäuser, Büros und gewerbliche Glasfassaden."
      description={`Saubere Fenster und Glasflächen sind ein wichtiger Teil des Erscheinungsbildes von Gebäuden. Verschmutzte Fensterscheiben lassen weniger Licht ein, wirken vernachlässigt und hinterlassen einen schlechten Eindruck bei Besuchern und Kunden.

Professionelle Glasreinigung unterscheidet sich grundlegend von der Hausfensterreinigung: Wir verwenden spezielle Reinigungsmittel, Abzieher und Wasserfedern, die streifenfreie Ergebnisse garantieren. Für schwer zugängliche Fenster und Hochhäuser setzen wir auf spezielle Teleskopstangen, Hebebühnen und – falls nötig – Seiltechnik.

Huwa reinigt Glasflächen aller Art: Bürofenster, Schaufenster, Glasdächer, Wintergärten, Glasfassaden und Außenspiegel. Wir bieten sowohl Einmalreinigungen als auch regelmäßige Glasreinigungsverträge an.`}
      benefits={[
        'Streifenfreie Reinigungsergebnisse garantiert',
        'Alle Gebäudehöhen – auch Hochhäuser',
        'Innen- und Außenreinigung',
        'Spezielle Technik für Glasfassaden',
        'Umweltfreundliche Reinigungsmittel',
        'Flexible Termine auch am Wochenende',
        'Günstige Jahresverträge verfügbar',
      ]}
      features={[
        { title: 'Büro- & Privatfenster', desc: 'Klassische Fensterreinigung innen und außen für ein strahlend helles Raumgefühl.' },
        { title: 'Schaufenster', desc: 'Tadellos saubere Schaufenster, die Ihre Produkte und Ihr Geschäft ins beste Licht rücken.' },
        { title: 'Glasfassaden', desc: 'Großflächige Glasfassaden von Bürogebäuden mit professioneller Ausstattung.' },
        { title: 'Glasdächer & Wintergärten', desc: 'Reinigung von Glasdächern und Wintergärten inkl. schwer zugänglicher Stellen.' },
        { title: 'Hochdruckreinigung', desc: 'Hartnäckige Verschmutzungen an Außenglas mit Hochdrucktechnik entfernen.' },
        { title: 'Rahmen & Dichtungen', desc: 'Reinigung von Fensterrahmen, Fensterbänken und Dichtungen inklusive.' },
      ]}
      faq={[
        { q: 'Wie oft sollten Fenster professionell gereinigt werden?', a: 'Empfohlen werden 2–4 Mal im Jahr. Schaufenster sollten wöchentlich bis monatlich gereinigt werden, Bürofenster alle 4–8 Wochen.' },
        { q: 'Können Sie auch sehr hohe Fenster reinigen?', a: 'Ja, mit Teleskopstangen bis 12 Meter, Hebebühnen und Gerüsten können wir Glasflächen in jeder Höhe reinigen.' },
        { q: 'Reinigen Sie auch bei Regen?', a: 'Leichter Regen stört uns nicht, da wir mit Abziehern und streifenfreier Technik arbeiten. Bei starkem Regen verschieben wir den Termin einvernehmlich.' },
        { q: 'Sind die Reinigungsmittel für Spezialverglasungen geeignet?', a: 'Ja, wir verwenden für jede Art von Verglasung geeignete Mittel – auch für Sonnenschutz-, Wärmeschutz- und Sicherheitsglas.' },
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Glasreinigung Neuwied',
        provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
        description: 'Professionelle Glasreinigung für Fenster, Schaufenster und Glasfassaden in Neuwied und Rheinland-Pfalz.',
  
        areaServed: siteConfig.serviceAreas,
        serviceType: 'Glasreinigung',
      }}
    />
  );
}
