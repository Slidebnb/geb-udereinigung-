import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Baureinigung Neuwied | Baufeinreinigung nach Renovierung | Huwa',
  description: 'Professionelle Baureinigung in Neuwied. Grobreinigung und Feinreinigung nach Bau- und Renovierungsarbeiten. Schnell und gründlich für die Übergabe.',
  alternates: { canonical: `${siteConfig.url}/leistungen/baureinigung` },
};

export default function BaureinigungPage() {
  return (
    <ServicePage
      icon="🔨"
      title="Baureinigung"
      breadcrumb="Baureinigung"
      subtitle="Professionelle Baufein- und Grobreinigung nach Baumaßnahmen und Renovierungen. Wir machen Ihr Objekt bezugsfertig – schnell, gründlich und zuverlässig."
      description={`Nach Bau-, Renovierungs- oder Umbauarbeiten sieht jede Immobilie aus wie eine Baustelle: Baustaub auf allen Oberflächen, Kalkflecken auf Scheiben, Mörtelreste auf Böden, Klebereste von Schutzfolien und vieles mehr. Die fachgerechte Baureinigung ist ein eigenständiges Fachgebiet, das spezielles Know-how und Ausrüstung erfordert.

Huwa führt Baureinigungen in zwei Phasen durch: In der Grobreinigung werden gröbere Baumaterialreste, Abfälle und Verpackungsmaterialien entfernt. In der anschließenden Baufeinreinigung werden alle Oberflächen detailliert gereinigt: Scheiben von Kalk befreit, Böden aufbereitet, Sanitäranlagen erstmals gereinigt und alle Details erledigt.

Das Ergebnis: Ihr Objekt ist ready für die Übergabe oder den Einzug – ohne Spur von der Baustelle.`}
      benefits={[
        'Zweistufiger Prozess: Grob- und Feinreinigung',
        'Spezialmaschinen für Baustaub',
        'Kalkflecken-Entfernung von Scheiben',
        'Bodenbelagsreinigung und -pflege',
        'Schnelle Einsatzbereitschaft',
        'Große Teams für kurzfristige Termine',
        'Entsorgung von Baumüll auf Anfrage',
        'Abnahmeprotokoll verfügbar',
      ]}
      features={[
        { title: 'Grobreinigung', desc: 'Entfernung von Bauschutt, Verpackungen, groben Baumaterialresten und Folien.' },
        { title: 'Baufeinreinigung', desc: 'Detailreinigung aller Oberflächen: Böden, Wände, Fenster, Türen, Sanitär.' },
        { title: 'Glasreinigung nach Bau', desc: 'Professionelle Entfernung von Kalkflecken, Kleberesten und Bauschmutz.' },
        { title: 'Bodenaufbereitung', desc: 'Reinigung und Erstpflege von Parkett, Fliesen, Laminat und anderen Belägen.' },
        { title: 'Sanitäranlagen', desc: 'Erstmalige Reinigung und Desinfektion aller WC- und Nassbereiche.' },
        { title: 'Staubsaugen & Lüftung', desc: 'Entfernung von Baustaub aus allen Ritzen, Lüftungen und schwer zugänglichen Stellen.' },
      ]}
      faq={[
        { q: 'Wann sollte die Baureinigung stattfinden?', a: 'Die Grobreinigung erfolgt nach Abschluss der Rohbauarbeiten, die Feinreinigung kurz vor der Übergabe oder dem Einzug. Wir koordinieren uns gerne mit Ihrer Bauleitung.' },
        { q: 'Wie schnell können Sie nach Baufertigstellung kommen?', a: 'Wir sind in der Regel innerhalb von 2–5 Werktagen einsatzbereit. Für größere Projekte empfehlen wir eine frühzeitige Terminabsprache.' },
        { q: 'Können Sie auch Baumüll entsorgen?', a: 'Ja, auf Anfrage organisieren wir die Entsorgung von Baumüll und Verpackungsmaterialien gegen einen Aufpreis.' },
        { q: 'Was kostet eine Baureinigung?', a: 'Ab ca. 1,80–3,50 € pro m² für die Feinreinigung, abhängig vom Verschmutzungsgrad und Leistungsumfang. Für ein genaues Angebot nehmen Sie gerne Kontakt auf.' },
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Baureinigung Neuwied',
        provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
        description: 'Professionelle Baureinigung nach Baumaßnahmen und Renovierungen in Neuwied.',
  
        areaServed: siteConfig.serviceAreas,
        serviceType: 'Baureinigung',
      }}
    />
  );
}
