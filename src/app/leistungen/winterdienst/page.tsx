import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Winterdienst Neuwied | Räumen & Streuen | Huwa',
  description: 'Zuverlässiger Winterdienst in Neuwied. Räum- und Streupflicht übernehmen lassen. Haftungsschutz für Eigentümer und Vermieter. Jetzt anfragen!',
  alternates: { canonical: `${siteConfig.url}/leistungen/winterdienst` },
};

export default function WinterdienstPage() {
  return (
    <ServicePage
      icon="❄️"
      title="Winterdienst"
      breadcrumb="Winterdienst"
      subtitle="Wir übernehmen Ihre gesetzliche Räum- und Streupflicht. Zuverlässig, auch früh morgens und an Wochenenden – für Ihren Haftungsschutz und Ihre Sicherheit."
      description={`Als Grundstückseigentümer oder Vermieter sind Sie gesetzlich verpflichtet, angrenzende Gehwege bei Schnee und Glätte zu räumen und zu streuen. Wer dieser Pflicht nicht nachkommt, haftet bei Unfällen persönlich – mit teils erheblichen finanziellen Konsequenzen.

Huwa Winterdienst übernimmt diese Pflicht vollständig für Sie: Wir räumen Schnee, streuen abstumpfende Mittel und dokumentieren jeden Einsatz – auch früh morgens, an Wochenenden und Feiertagen. Mit uns sind Sie rechtlich auf der sicheren Seite.

Unser Winterdienst deckt alle relevanten Bereiche ab: Gehwege, Zufahrten, Parkplätze, Fußgängerwege auf dem Grundstück und Treppenaufgänge. Wir arbeiten mit umweltfreundlichem Streusplitt und Salz und dokumentieren alle Einsätze digital.`}
      benefits={[
        'Übernahme der gesetzlichen Räumpflicht',
        'Rechtssicherer Haftungsschutz',
        'Einsätze ab 4:00 Uhr morgens',
        '7 Tage die Woche verfügbar',
        'Digitale Einsatzdokumentation',
        'Umweltfreundliche Streumittel',
        'Feste Saison-Pauschalen',
        'Kurzfristige Reaktion auf Wetterwarnungen',
      ]}
      features={[
        { title: 'Schneeräumung', desc: 'Gründliche Schneeräumung mit Schaufeln, Schneeschiebern und Maschinen.' },
        { title: 'Streuservice', desc: 'Streuen mit abstumpfenden Mitteln (Splitt, Sand) und Salz bei Glatteis.' },
        { title: 'Zufahrten & Parkplätze', desc: 'Räumung von Zu- und Abfahrten, Parkflächen und Betriebsgeländen.' },
        { title: 'Dokumentation', desc: 'Digitale Dokumentation jedes Einsatzes mit Uhrzeit, Maßnahmen und Fotos.' },
        { title: 'Dachschnee', desc: 'Auf Anfrage: Entfernung von Dachschnee zur Vermeidung von Schäden.' },
        { title: 'Notfalleinsätze', desc: 'Schnelle Reaktion bei plötzlichem Wintereinbruch außerhalb geplanter Touren.' },
      ]}
      faq={[
        { q: 'Wann beginnt der Winterdienst morgens?', a: 'Unsere Teams starten je nach Wetterlage bereits ab 4:00 Uhr, um sicherzustellen, dass alle Wege bis 7:00 Uhr (werktags) geräumt und gestreut sind.' },
        { q: 'Welche Streumittel verwenden Sie?', a: 'Wir verwenden primär Streusplitt und Sand als abstumpfende Mittel, ergänzt durch Streusalz bei extremen Glättebedingungen. Auf Wunsch verwenden wir ausschließlich salzfreie, umweltfreundliche Mittel.' },
        { q: 'Was passiert, wenn es nachts schneit?', a: 'Wir beobachten Wetterwarnungen und reagieren automatisch. Bei angesagtem Schnee stehen unsere Teams frühmorgens bereit.' },
        { q: 'Kann ich den Winterdienst als Saison-Paket buchen?', a: 'Ja, wir bieten Saison-Pakete von Oktober bis März zu festen monatlichen Kosten an – unabhängig davon, wie oft Schnee fällt.' },
        { q: 'Übernehmen Sie den Winterdienst auch für Privatpersonen?', a: 'Ja, wir betreuen sowohl Privathaushalte als auch Wohnhäuser, Gewerbeimmobilien und große Betriebsgeländes.' },
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Winterdienst Neuwied',
        provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
        description: 'Zuverlässiger Winterdienst in Neuwied – Räumen, Streuen und Dokumentieren für Ihren Haftungsschutz.',
  
        areaServed: siteConfig.serviceAreas,
        serviceType: 'Winterdienst',
      }}
    />
  );
}
