import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Hausmeisterdienste Neuwied | Ihr Hausmeister auf Abruf | Huwa',
  description: 'Professionelle Hausmeisterdienste in Neuwied. Reparaturen, Objektbetreuung, Müllentsorgung, Grünpflege – alles aus einer Hand. Jetzt anfragen!',
  alternates: { canonical: `${siteConfig.url}/leistungen/hausmeisterdienste` },
};

export default function HausmeisterdiensteePage() {
  return (
    <ServicePage
      icon="🔧"
      title="Hausmeisterdienste"
      breadcrumb="Hausmeisterdienste"
      subtitle="Ihr professioneller Hausmeister auf Abruf in Neuwied. Von der kleinen Reparatur bis zur vollständigen Objektbetreuung – schnell, zuverlässig und kompetent."
      description={`Ein guter Hausmeister ist für die Verwaltung von Immobilien unverzichtbar. Er sorgt für das reibungslose Funktionieren aller technischen Einrichtungen, kümmert sich um die Sauberkeit der Außenanlagen und ist bei Störungen und Notfällen der erste Ansprechpartner.

Huwa Hausmeisterdienste bieten Ihnen einen professionellen Rundum-Service für Ihre Immobilie. Wir übernehmen alle anfallenden Aufgaben eines klassischen Hausmeisters: technische Wartung, Grünpflege, Winterdienst, Müllentsorgung, kleine Reparaturen und vieles mehr – ohne dass Sie einen Vollzeit-Hausmeister beschäftigen müssen.

Unser Hausmeisterservice ist besonders für Hausverwaltungen, Wohnungseigentümergemeinschaften, Gewerbeimmobilien und Privatvermieter geeignet, die professionelle Betreuung zu kalkulierbaren Kosten wünschen.`}
      benefits={[
        'Kein eigenes Hauspersonal nötig',
        'Schnelle Reaktionszeiten',
        'Breites Leistungsspektrum aus einer Hand',
        'Transparente monatliche Kosten',
        'Ansprechpartner für Mieter und Eigentümer',
        'Notfallservice bei dringenden Störungen',
        'Dokumentation aller Maßnahmen',
        'Erfahrene Handwerker im Team',
      ]}
      features={[
        { title: 'Kleine Reparaturen', desc: 'Glühbirnenwechsel, kleine Ausbesserungsarbeiten, Türjustierungen und mehr.' },
        { title: 'Objektinspektion', desc: 'Regelmäßige Begehung und Kontrolle des gesamten Gebäudes und der Außenanlagen.' },
        { title: 'Müllentsorgung', desc: 'Aufstellen, Reinigen und Bereitstellen der Müllbehälter zu den Abholtagen.' },
        { title: 'Grünpflege', desc: 'Rasenmähen, Heckenschnitt, Laubbeseitigung und Pflege der Außenanlagen.' },
        { title: 'Winterdienst', desc: 'Schneeräumung und Streuen der Gehwege und Zufahrten im Winter.' },
        { title: 'Notfallbereitschaft', desc: 'Ansprechpartner bei Störungen wie Wasserrohrbruch oder Heizungsausfall.' },
      ]}
      faq={[
        { q: 'Für welche Immobilientypen eignet sich der Hausmeisterservice?', a: 'Unser Service eignet sich für Mehrfamilienhäuser, Wohnungseigentümergemeinschaften (WEG), Bürogebäude, Einkaufszentren, Industriebetriebe und jede Art von Gewerbeimmobilie.' },
        { q: 'Können Sie auch als Ansprechpartner für Mieter fungieren?', a: 'Ja, auf Wunsch übernehmen wir die Kommunikation mit Mietern bei Störungen und Wartungsanfragen. Wir sind der erste Ansprechpartner vor Ort.' },
        { q: 'Bieten Sie auch Notfalleinsätze an?', a: 'Ja, für dringende Störungen bieten wir einen Notfalldienst an. Die genauen Bereitschaftszeiten werden im Vertrag vereinbart.' },
        { q: 'Was kostet ein Hausmeisterservice?', a: 'Abhängig von Objektgröße und Leistungsumfang. Wir erstellen individuelle Monatspauschalen, die planbare Kosten garantieren. Gerne besuchen wir Ihr Objekt für ein kostenloses Angebot.' },
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Hausmeisterdienste Neuwied',
        provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
        description: 'Professionelle Hausmeisterdienste und Objektbetreuung in Neuwied.',
  
        areaServed: siteConfig.serviceAreas,
        serviceType: 'Hausmeisterdienste',
      }}
    />
  );
}
