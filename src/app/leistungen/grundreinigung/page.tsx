import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Grundreinigung Düsseldorf | Tiefenreinigung | Huwa',
  description: 'Professionelle Grundreinigung in Düsseldorf. Intensive Tiefenreinigung für Wohnungen, Büros und Gewerberäume. Bei Einzug, Auszug oder nach Renovierung. Angebot anfordern!',
};

export default function GrundreinigungPage() {
  return (
    <ServicePage
      icon="✨"
      title="Grundreinigung"
      breadcrumb="Grundreinigung"
      subtitle="Intensive Tiefenreinigung für einen makellosen Neustart. Perfekt bei Einzug, Auszug, nach Renovierung oder für die jährliche Intensivreinigung Ihrer Räume."
      description={`Eine Grundreinigung ist die intensivste Form der Reinigung und geht weit über die alltägliche Unterhaltsreinigung hinaus. Während die reguläre Reinigung sichtbare Oberflächen sauber hält, entfernt die Grundreinigung auch hartnäckige Ablagerungen, Fett, Kalk und eingetrockneten Schmutz aus allen Winkeln und Bereichen.

Bei Huwa setzen wir für die Grundreinigung auf professionelle Profi-Reinigungsmaschinen, spezielle Reinigungschemikalien und erfahrene Reinigungsprofis. Wir reinigen von oben nach unten, von innen nach außen – kein Winkel wird ausgelassen.

Die Grundreinigung eignet sich besonders bei Einzug in eine neue Wohnung oder ein neues Büro, beim Auszug für die Übergabe, nach längerer Nichtnutzung, nach Bau- oder Renovierungsarbeiten sowie als jährliche Intensivreinigung.`}
      benefits={[
        'Komplette Tiefenreinigung aller Bereiche',
        'Professionelle Reinigungsmaschinen',
        'Hartnäckige Flecken werden entfernt',
        'Bodenbeläge aufbereitet und gepflegt',
        'Sanitärdesinfektion inklusive',
        'Küche inklusive Gerätereinigung',
        'Fensterreinigung auf Wunsch',
        'Abnahmeprotokoll auf Wunsch',
      ]}
      features={[
        { title: 'Böden & Fliesen', desc: 'Intensivreinigung, Entkalkung, Wachsen und Polieren aller Bodenbeläge.' },
        { title: 'Küche intensiv', desc: 'Backofen, Dunstabzug, Kühlschrank, Schränke innen und außen.' },
        { title: 'Sanitärdesinfektion', desc: 'Entkalkung von Armaturen, Desinfizierung von WC, Dusche und Waschbecken.' },
        { title: 'Wände & Türen', desc: 'Reinigung von Wänden, Türblättern, Türzargen, Griffen und Lichtschaltern.' },
        { title: 'Heizkörper & Lüftung', desc: 'Entstauben und Reinigen von Heizkörpern, Lüftungsgittern und Rolladenleisten.' },
        { title: 'Fenster & Rahmen', desc: 'Gründliche Reinigung von Fensterscheiben, Rahmen und Fensterbänken innen.' },
      ]}
      faq={[
        { q: 'Wie lange dauert eine Grundreinigung?', a: 'Abhängig von der Größe und dem Verschmutzungsgrad. Eine 80m²-Wohnung dauert ca. 4–8 Stunden. Büros und größere Objekte werden oft über mehrere Tage gereinigt.' },
        { q: 'Was unterscheidet Grundreinigung von normaler Reinigung?', a: 'Bei der Grundreinigung werden auch schwer zugängliche Stellen, Geräte von innen, Innenseiten von Schränken und hartnäckige Ablagerungen entfernt. Es handelt sich um eine vollständige Tiefenreinigung.' },
        { q: 'Brauche ich eine Grundreinigung beim Einzug?', a: 'Ja, empfohlen. Auch wenn eine Wohnung optisch sauber wirkt, können alte Ablagerungen, Keime und Schmutz an unzugänglichen Stellen vorhanden sein. Eine professionelle Grundreinigung gibt Ihnen einen hygienischen Neustart.' },
        { q: 'Übernehmen Sie auch die Endreinigung bei Mietverträgen?', a: 'Ja, wir erstellen professionelle Übergabereinigungen, die den Ansprüchen der Vermieter genügen. Auf Wunsch stellen wir ein Abnahmeprotokoll aus.' },
        { q: 'Was kostet eine Grundreinigung?', a: 'Ab ca. 150 € für kleine Räume. Der genaue Preis richtet sich nach Größe, Zustand und Leistungsumfang. Wir erstellen Ihnen gerne ein unverbindliches Angebot.' },
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Grundreinigung Düsseldorf',
        provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
        description: 'Professionelle Grundreinigung und Tiefenreinigung in Düsseldorf für Wohnungen, Büros und Gewerberäume.',
        areaServed: siteConfig.serviceAreas,
        serviceType: 'Grundreinigung',
      }}
    />
  );
}
