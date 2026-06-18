import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Winterdienst in Koblenz | Huwa Gebäudedienste',
  description: 'Zuverlässiger Winterdienst in Koblenz für Hausverwaltungen, Gewerbe und Wohnanlagen. Feste Abläufe, klare Absprachen und kostenloses Angebot.',
  alternates: { canonical: `${siteConfig.url}/winterdienst-koblenz` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professioneller Winterdienst in Koblenz – Schneeräumung und Streudienst für Hausverwaltungen und Gewerbeobjekte',
  url: `${siteConfig.url}/winterdienst-koblenz`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.zip,
    addressLocality: siteConfig.address.city,
    addressRegion: 'Rheinland-Pfalz',
    addressCountry: 'DE',
  },
  areaServed: { '@type': 'City', name: 'Koblenz' },
  priceRange: '€€',
};

const services = [
  { icon: '❄️', title: 'Schneeräumung',             desc: 'Manuelle und maschinelle Räumung aller relevanten Flächen in Koblenz – Gehwege, Stellplätze, Zufahrten und Eingangsbereiche von Wohn- und Gewerbeobjekten.' },
  { icon: '🧂', title: 'Abstumpfen & Enteisen',     desc: 'Ausbringen von Granulat, Sand oder ökologischen Taumitteln – abgestimmt auf die kommunalen Vorschriften der Stadt Koblenz.' },
  { icon: '📋', title: 'Dokumentation',              desc: 'Lückenlose Protokollierung aller Winterdienseinsätze in Koblenz – Datum, Uhrzeit, Streumittel und bearbeitete Flächen werden festgehalten.' },
  { icon: '⚖️', title: 'Verkehrssicherungspflicht', desc: 'Vollständige Übernahme der Räum- und Streupflicht für Ihr Koblenzer Objekt – Sie sind rechtlich abgesichert, wir sorgen für die Ausführung.' },
  { icon: '🏢', title: 'Gewerbeobjekte',             desc: 'Schneeräumung für Koblenzer Gewerbeparks, Bürokomplexe und Einzelhandelsflächen – pünktlich zur Öffnung, auch an Wochenenden und Feiertagen.' },
  { icon: '📅', title: 'Saisonpauschale',            desc: 'Transparenter Saisonpreis für die komplette Winterperiode in Koblenz – keine Überraschungen, klare Kalkulation von Anfang an.' },
];

const faqs = [
  {
    q: 'Welche Flächen reinigen Sie im Rahmen des Winterdienstes in Koblenz?',
    a: 'Wir räumen Gehwege entlang Ihres Grundstücks, Hauszugänge, Treppenstufen außen, Tiefgarageneinfahrten, Stellplätze und interne Erschließungswege. Den genauen Leistungsumfang stimmen wir beim Besichtigungstermin gemeinsam mit Ihnen ab.',
  },
  {
    q: 'Sind Sie auch in allen Koblenzer Stadtteilen tätig?',
    a: 'Ja – wir decken die gesamte Stadt Koblenz ab, inklusive Güls, Metternich, Moselweiß, Lützel, Kesselheim, Ehrenbreitstein und der Altstadt. Unsere Winterdienstrouten sind nach geografischer Lage optimiert, damit alle Objekte rechtzeitig geräumt werden.',
  },
  {
    q: 'Was ist ein Saisonvertrag und was ist enthalten?',
    a: 'Ein Saisonvertrag deckt alle Winterdiensteinsätze von November bis März ab – unabhängig davon, wie oft wir ausrücken müssen. Sie zahlen einen festen Monatsbetrag und müssen sich um nichts weiter kümmern. Dokumentation, Streumittel und Arbeit sind im Preis enthalten.',
  },
  {
    q: 'Wir haben mehrere Objekte in Koblenz – gibt es Sammelkonditionen?',
    a: 'Ja. Für Hausverwaltungen mit mehreren Objekten in Koblenz bieten wir günstigere Saisonpauschalen und eine gemeinsame Rechnung. Alle Einsätze werden objektbezogen dokumentiert und separat ausgewiesen.',
  },
];

export default function WinterdienstKoblenz() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Winterdienst Koblenz' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Koblenz & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Winterdienst <span className="gradient-text">Koblenz</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Verlässlicher Winterdienst für Wohn- und Gewerbeobjekte in Koblenz – mit Saisonpauschale, lückenloser Dokumentation und vollständiger Übernahme der Verkehrssicherungspflicht. In allen Koblenzer Stadtteilen, von Güls bis Kesselheim.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/angebot?service=Winterdienst&city=Koblenz&source=regional-page" className="btn-primary px-8 py-3.5">Kostenloses Angebot</Link>
              <a href={`tel:${siteConfig.phone}`} className="btn-white px-8 py-3.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label">Winterdienst in Koblenz</div>
            <h2 className="mt-4 mb-6">Räum- und Streupflicht<br /><span className="gradient-text">in professionellen Händen</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Als Eigentümer oder Verwalter von Immobilien in Koblenz sind Sie gesetzlich verpflichtet, öffentliche Gehwege und Zugänge zu Ihrem Gebäude bei Schnee und Eis von Glätte zu befreien. Die Verletzung dieser Pflicht kann zu erheblichen Haftungsansprüchen führen. Wir übernehmen diese Verantwortung zuverlässig für Sie.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Koblenz liegt in einer Region, in der die Wintersaison von November bis März dauern kann. Wir kennen die lokalen Gegebenheiten, die städtischen Anforderungen an Streumittel und die kritischen Flächen rund um Ihre Immobilie. Unsere Routen in Koblenz sind so optimiert, dass alle Objekte frühzeitig versorgt werden.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Mit unserem Saisonvertrag wissen Sie genau, was Sie im Winter zahlen – unabhängig von der Anzahl der Einsätze. Das schafft Planungssicherheit und schützt Sie bei harten Wintern vor unerwarteten Kosten.
            </p>
            <Link href="/leistungen/winterdienst" className="btn-outline inline-flex">
              Zur Leistungsseite Winterdienst
            </Link>
          </div>
          <div className="space-y-4">
            {faqs.map(item => (
              <details key={item.q} className="card p-5 group cursor-pointer">
                <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center gap-4 text-sm">
                  <span>{item.q}</span>
                  <svg className="w-4 h-4 text-primary/50 group-open:rotate-180 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mx-auto w-fit">Leistungen in Koblenz</div>
            <h2 className="mt-4">Was der Winterdienst <span className="gradient-text">umfasst</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={s.title} className={`card p-6 hover:border-${i % 2 === 0 ? 'primary' : 'green'}/30 transition-all`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${i % 2 === 0 ? 'bg-primary/8' : 'bg-green/8'}`}>{s.icon}</div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/angebot?service=Winterdienst&city=Koblenz&source=regional-page" className="btn-primary inline-flex">Jetzt Angebot anfordern</Link>
          </div>
        </div>
      </section>

      {/* Nearby locations */}
      <section className="section-padding bg-white">
        <div className="container mx-auto text-center">
          <div className="section-label mx-auto w-fit mb-4">Auch in Ihrer Nähe verfügbar</div>
          <h2 className="mb-8">Winterdienst auch in <span className="gradient-text">Neuwied & Bendorf</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/winterdienst-neuwied" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">❄️</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Winterdienst Neuwied</h3>
              <p className="text-slate-500 text-sm mt-1">Schneeräumung für Eigentümer und Gewerbe in Neuwied</p>
            </Link>
            <Link href="/winterdienst-bendorf" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">❄️</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Winterdienst Bendorf</h3>
              <p className="text-slate-500 text-sm mt-1">Räum- und Streudienst für Eigentümer in Bendorf</p>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
