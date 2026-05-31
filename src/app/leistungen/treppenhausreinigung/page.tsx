import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Treppenhausreinigung Düsseldorf | Regelmäßig & Gründlich | Huwa',
  description: 'Professionelle Treppenhausreinigung in Düsseldorf. Zuverlässige Reinigung von Treppenhäusern, Fluren und Gemeinschaftsflächen. Jetzt Angebot anfragen!',
};

export default function TreppenhausreinigungPage() {
  return (
    <ServicePage
      icon="🏗️"
      title="Treppenhausreinigung"
      breadcrumb="Treppenhausreinigung"
      subtitle="Gepflegte Treppenhäuser und Gemeinschaftsflächen steigern den Wert Ihrer Immobilie. Zuverlässige, regelmäßige Reinigung nach individuellem Reinigungsplan."
      description={`Das Treppenhaus ist die Visitenkarte eines Mehrfamilienhauses. Ein gepflegtes Treppenhaus zeigt Bewohnern und Besuchern, dass die Immobilie gut verwaltet wird und schafft ein angenehmes Wohnklima. Vernachlässigte Treppenhäuser hingegen führen zu Beschwerden, reduzieren den Immobilienwert und können durch rutschige Böden sogar zu Unfällen führen.

Huwa Gebäudereinigung übernimmt die regelmäßige Reinigung von Treppenhäusern in Mehrfamilienhäusern, Bürogebäuden und Gewerbeimmobilien. Wir reinigen nach einem individuellen Reinigungsplan – wöchentlich, zweiwöchentlich oder monatlich.

Neben dem eigentlichen Treppenhaus reinigen wir auch alle angrenzenden Gemeinschaftsbereiche: Kellerabgänge, Müllräume, Fahrradkeller und Waschküchen.`}
      benefits={[
        'Zuverlässige Reinigung nach Plan',
        'Schlüsselübergabe möglich',
        'Protokollierte Reinigungsdokumentation',
        'Sofortmeldung von Schäden',
        'Faire Monatspauschalen',
        'Kurzfristige Abrufleistungen',
        'Langfristige Verlässlichkeit',
      ]}
      features={[
        { title: 'Treppen & Podeste', desc: 'Fegen und feuchtes Wischen aller Treppenstufen und Treppenabsätze.' },
        { title: 'Handläufe & Geländer', desc: 'Abstauben und Wischen der Handläufe und Geländerstäbe.' },
        { title: 'Briefkastenanlage', desc: 'Reinigung der Briefkastenanlage und des Eingangsbereichs.' },
        { title: 'Flure & Gänge', desc: 'Reinigung aller Flure und Gänge im gesamten Gebäude.' },
        { title: 'Keller & Nebenräume', desc: 'Reinigung von Kellerabgängen, Fahrradkellern und Waschküchen.' },
        { title: 'Türen & Lichtschalter', desc: 'Wischpflege von Türen, Türgriffen, Klingelanlage und Lichtschaltern.' },
      ]}
      faq={[
        { q: 'Wer ist für die Treppenhausreinigung verantwortlich?', a: 'Als Eigentümer oder Vermieter sind Sie für die Sauberkeit der Gemeinschaftsflächen verantwortlich. Sie können diese Pflicht an Mieter übertragen (Treppenputzplan) oder an uns als professionellen Dienstleister.' },
        { q: 'Wie oft sollte ein Treppenhaus gereinigt werden?', a: 'Bei Häusern mit bis zu 6 Parteien reicht meist eine wöchentliche Reinigung. Bei stärker frequentierten Häusern empfehlen wir 2x wöchentlich.' },
        { q: 'Können Sie auch den Hausschlüssel erhalten?', a: 'Ja, viele unserer Kunden übergeben uns einen Schlüssel, damit wir unabhängig von Anwesenheit reinigen können. Wir gehen verantwortungsvoll damit um.' },
        { q: 'Was kostet Treppenhausreinigung?', a: 'Abhängig von Anzahl der Etagen, Parteien und Reinigungsintervall. Einfamilienhaus-Treppenhäuser ab ca. 30 € pro Reinigung. Gerne erstellen wir ein individuelles Angebot.' },
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Treppenhausreinigung Düsseldorf',
        provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
        description: 'Professionelle Treppenhausreinigung für Mehrfamilienhäuser und Bürogebäude in Düsseldorf.',
        areaServed: siteConfig.serviceAreas,
        serviceType: 'Treppenhausreinigung',
      }}
    />
  );
}
