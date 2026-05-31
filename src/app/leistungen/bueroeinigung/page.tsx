import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Büroreinigung Neuwied | Täglich & Zuverlässig | Huwa',
  description: 'Professionelle Büroreinigung in Neuwied. Tägliche oder wöchentliche Reinigung für saubere, hygienische Arbeitsplätze. Jetzt kostenlos anfragen!',
  alternates: { canonical: `${siteConfig.url}/leistungen/bueroeinigung` },
};

export default function BueroeinigungPage() {
  return (
    <ServicePage
      icon="💼"
      title="Büroreinigung"
      breadcrumb="Büroreinigung"
      subtitle="Professionelle Büroreinigung für saubere, hygienische Arbeitsplätze in Neuwied. Mehr Produktivität, weniger Krankenstand – alles aus einer Hand."
      description={`Ein sauberes Büro ist die Grundlage für produktives Arbeiten. Studien belegen, dass Mitarbeiter in einer hygienischen Umgebung produktiver sind, sich wohler fühlen und seltener krank werden. Gleichzeitig hinterlässt ein gepflegtes Büro bei Kunden und Geschäftspartnern einen professionellen Eindruck.

Huwa Büroreinigung bietet maßgeschneiderte Reinigungspakete für Büros jeder Größe – vom kleinen Büro mit 3 Mitarbeitern bis zum Großraumbüro mit 200 Arbeitsplätzen. Wir reinigen außerhalb Ihrer Arbeitszeiten, damit Ihr Betrieb nicht gestört wird.

Unser erfahrenes Team reinigt alle Bereiche Ihres Büros: Büroräume, Besprechungszimmer, Küchenbereiche, Sanitäranlagen, Empfangsbereiche und Flure. Wir verwenden professionelle Reinigungsmittel und moderne Ausrüstung für maximale Hygiene.`}
      benefits={[
        'Reinigung außerhalb Ihrer Arbeitszeiten',
        'Feste Reinigungskraft für Ihr Büro',
        'Flexible Intervalle: täglich bis monatlich',
        'Keine Urlaubs- oder Krankheitsvertretung nötig',
        'Professionelle Reinigungsmittel',
        'Qualitätskontrolle durch Vorarbeiter',
        'Faire monatliche Abrechnung',
        'Kurzfristige Terminänderungen möglich',
      ]}
      features={[
        { title: 'Büroräume & Arbeitsplätze', desc: 'Reinigung von Schreibtischen, Oberflächen, Computern, Telefonen und Tastaturen.' },
        { title: 'Besprechungsräume', desc: 'Saubere Meetingräume für professionelle Meetings und Kundengespräche.' },
        { title: 'Küchenbereiche', desc: 'Reinigung der Teeküche inkl. Mikrowelle, Kaffeemaschine, Kühlschrank und Spüle.' },
        { title: 'Sanitäranlagen', desc: 'Gründliche Reinigung und Desinfektion aller WC-Bereiche und Waschräume.' },
        { title: 'Empfang & Flure', desc: 'Repräsentative Eingangsbereiche, die einen positiven ersten Eindruck machen.' },
        { title: 'Bodenreinigung', desc: 'Staubsaugen, Wischen und Polieren aller Bodenbeläge – Teppich, Parkett, Laminat, Fliesen.' },
      ]}
      faq={[
        { q: 'Wann reinigen Sie – vor oder nach der Arbeitszeit?', a: 'Wir passen uns Ihren Arbeitszeiten an. Die meisten unserer Kunden bevorzugen eine Reinigung früh morgens (ab 6 Uhr) oder abends (ab 18 Uhr). Auf Wunsch reinigen wir auch an Wochenenden.' },
        { q: 'Haben wir immer denselben Reinigungsmitarbeiter?', a: 'Ja, bei Huwa arbeiten Sie immer mit denselben Mitarbeitern, die Ihr Büro und Ihre Wünsche kennen. Im Krankheitsfall stellen wir eine geschulte Vertretung.' },
        { q: 'Was kostet Büroreinigung pro Monat?', a: 'Die Kosten hängen von Bürogröße, Reinigungsintervall und gewünschtem Leistungsumfang ab. Im Schnitt liegen die Kosten für regelmäßige Büroreinigung bei 0,80–1,40 € pro m² pro Reinigung. Wir erstellen Ihnen gerne ein individuelles Angebot.' },
        { q: 'Werden auch Fenster gereinigt?', a: 'Fensterreinigung kann auf Wunsch als Zusatzleistung gebucht werden. Wir reinigen Fenster innen regelmäßig und Fenster außen auf Anfrage.' },
        { q: 'Wie lange im Voraus muss ich kündigen?', a: 'Unsere Reinigungsverträge können monatlich gekündigt werden. Wir setzen auf flexible Laufzeiten, damit Sie keine langen Bindungen eingehen müssen.' },
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Büroreinigung Neuwied',
        provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
        description: 'Professionelle Büroreinigung für saubere, hygienische Arbeitsplätze in Neuwied und Rheinland-Pfalz.',
        areaServed: siteConfig.serviceAreas,
        serviceType: 'Büroreinigung',
      }}
    />
  );
}
