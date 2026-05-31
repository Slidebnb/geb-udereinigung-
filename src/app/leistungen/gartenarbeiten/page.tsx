import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gartenarbeiten Neuwied | Professionelle Gartenpflege | Huwa',
  description: 'Professionelle Gartenarbeiten in Neuwied. Rasenmähen, Heckenschnitt, Laubentsorgung und mehr. Ganzjährige Gartenpflege vom Profi. Jetzt anfragen!',
  alternates: { canonical: `${siteConfig.url}/leistungen/gartenarbeiten` },
};

export default function GartenarbeitenPage() {
  return (
    <ServicePage
      icon="🌿"
      title="Gartenarbeiten"
      breadcrumb="Gartenarbeiten"
      subtitle="Professionelle Gartenpflege das ganze Jahr. Rasenmähen, Heckenschnitt, Laubbeseitigung und Beetpflege – damit Ihr Außenbereich immer gepflegt und einladend wirkt."
      description={`Ein gepflegter Garten und gepflegte Außenanlagen sind das Aushängeschild jeder Immobilie. Ob Privatgarten, Gemeinschaftsanlage oder Gewerbegrundstück – Huwa Gartenarbeiten sorgt ganzjährig für Ordnung und Schönheit in Ihren Außenbereichen.

Unser Team aus erfahrenen Gartenarbeitern und Fachkräften übernimmt alle anfallenden Gartenarbeiten: von der regelmäßigen Rasenpflege über den Heckenschnitt bis hin zur saisonalen Beetpflege und Laubbeseitigung. Wir arbeiten mit professionellem Gerät und haben immer das richtige Werkzeug dabei.

Besonders gefragt sind unsere Jahresverträge für regelmäßige Gartenpflege: Sie vereinbaren mit uns ein Paket, wir kommen nach Plan und Ihr Garten ist immer in bestem Zustand – ohne dass Sie selbst Zeit und Kraft investieren müssen.`}
      benefits={[
        'Ganzjährige Gartenpflege nach Plan',
        'Professionelles Gartengerät',
        'Erfahrene Gartenfachkräfte',
        'Entsorgung von Grünabfällen',
        'Flexible Jahresverträge',
        'Auch für große Außenanlagen',
        'Sofort- und Einmaleinsätze möglich',
        'Faire Pauschalpreise',
      ]}
      features={[
        { title: 'Rasenpflege', desc: 'Regelmäßiges Mähen, Kantenstechen, Lüften und Düngen für einen satten grünen Rasen.' },
        { title: 'Heckenschnitt', desc: 'Professioneller Schnitt von Hecken, Sträuchern und Formgehölzen.' },
        { title: 'Laubbeseitigung', desc: 'Saisonale Laubentsorgung im Herbst – auf Gehwegen, im Garten und in den Beeten.' },
        { title: 'Beetpflege', desc: 'Unkraut jäten, Boden lockern, Pflanzen setzen und pflegen.' },
        { title: 'Baumschnitt', desc: 'Fachgerechter Obstbaumschnitt und Kronenpflege für gesunde Bäume.' },
        { title: 'Frühjahrsputz', desc: 'Komplette Gartenaufbereitung im Frühjahr nach der Winterpause.' },
      ]}
      faq={[
        { q: 'Wie oft sollte der Rasen gemäht werden?', a: 'Im Frühjahr und Sommer empfehlen wir das Mähen alle 1–2 Wochen. Im Herbst reicht monatlich. Wir passen den Intervall an Ihre Rasensorte und den Wuchs an.' },
        { q: 'Können Sie auch größere Grundstücke betreuen?', a: 'Ja, wir betreuen Grundstücke jeder Größe – von kleinen Privatgärten bis zu großen Gewerbegeländen mit mehreren Hektar.' },
        { q: 'Entsorgen Sie auch Grünschnitt und Laub?', a: 'Ja, wir nehmen den Grünschnitt, Laub und Gartenabfälle mit und entsorgen sie fachgerecht. Dies ist in unseren Paketen enthalten.' },
        { q: 'Was kostet regelmäßige Gartenpflege?', a: 'Ab ca. 60–150 € pro Besuch, abhängig von Grundstücksgröße und Leistungsumfang. Mit Jahresvertrag erhalten Sie attraktive Rabatte.' },
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Gartenarbeiten Neuwied',
        provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
        description: 'Professionelle Gartenarbeiten und Gartenpflege in Neuwied und Rheinland-Pfalz.',
  
        areaServed: siteConfig.serviceAreas,
        serviceType: 'Gartenarbeiten',
      }}
    />
  );
}
