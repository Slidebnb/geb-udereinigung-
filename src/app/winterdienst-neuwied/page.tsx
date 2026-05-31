import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Winterdienst in Neuwied | Huwa Gebäudedienste',
  description: 'Zuverlässiger Winterdienst in Neuwied für Hausverwaltungen, Gewerbe und Wohnanlagen. Feste Abläufe, klare Absprachen und kostenloses Angebot.',
  alternates: { canonical: `${siteConfig.url}/winterdienst-neuwied` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professioneller Winterdienst in Neuwied – Schneeräumung und Streudienst für Eigentümer, Hausverwaltungen und Gewerbe',
  url: `${siteConfig.url}/winterdienst-neuwied`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.zip,
    addressLocality: 'Neuwied',
    addressRegion: 'Rheinland-Pfalz',
    addressCountry: 'DE',
  },
  areaServed: { '@type': 'City', name: 'Neuwied' },
  priceRange: '€€',
};

const services = [
  { icon: '❄️', title: 'Schneeräumung',         desc: 'Manuelle und maschinelle Schneeräumung von Gehwegen, Einfahrten, Zugängen und Parkplätzen – verlässlich ab Schneefall und vor Arbeitsbeginn.' },
  { icon: '🧂', title: 'Streudienst',            desc: 'Abstumpfen und Enteisen mit zugelassenen Streumitteln – auf öffentlichen Gehwegen nach kommunalen Vorgaben, auf Privatflächen nach Bedarf.' },
  { icon: '📋', title: 'Dokumentation',          desc: 'Lückenloser Einsatznachweis mit Datum, Uhrzeit und eingesetztem Streumittel – als Beleg für die Erfüllung der Verkehrssicherungspflicht.' },
  { icon: '⚖️', title: 'Verkehrssicherungspflicht', desc: 'Wir übernehmen Ihre gesetzliche Räum- und Streupflicht vollständig – sodass Sie im Schadensfall rechtlich abgesichert sind.' },
  { icon: '🏢', title: 'Gewerbeflächen',         desc: 'Großflächige Schneeräumung von Firmengeländen, Parkhäusern und Gewerbezufahrten in Neuwied – mit eigenem Maschinenpark.' },
  { icon: '📅', title: 'Saisonvertrag',           desc: 'Fester Saisonvertrag von November bis März – klarer Preis, keine Überraschungen, garantierter Service an allen relevanten Tagen.' },
];

const faqs = [
  {
    q: 'Ab wann wird in Neuwied geräumt?',
    a: 'Wir beginnen in der Regel ab 6:00 Uhr morgens bei entsprechenden Wetterbedingungen. Bei angekündigtem starken Schneefall starten wir noch früher. Für Gewerbekunden mit frühem Öffnungsbeginn bieten wir individuelle Abfahrtszeiten ab 5:00 Uhr an.',
  },
  {
    q: 'Wer haftet, wenn trotz Streudienst jemand ausrutscht?',
    a: 'Wenn wir als Dienstleister Ihre Räum- und Streupflicht im Rahmen eines Vertrages übernehmen, gehen die Haftungspflichten auf uns über – vorausgesetzt, wir kommen unserer vertraglich vereinbarten Leistung nach. Wir dokumentieren alle Einsätze lückenlos, damit Sie im Streitfall abgesichert sind.',
  },
  {
    q: 'Was kostet der Winterdienst in Neuwied?',
    a: 'Der Preis richtet sich nach Fläche, Lage, Häufigkeit der Einsätze und gewünschtem Leistungsumfang. Wir bieten Saisonpauschalen, die alle Einsätze von November bis März abdecken. Damit wissen Sie von Anfang an, was Sie im Winter bezahlen – unabhängig davon, wie oft wir ausrücken müssen.',
  },
  {
    q: 'Kann ich den Winterdienst nur für eine Saison beauftragen?',
    a: 'Ja. Wir bieten Saisonverträge für eine Wintersaison an. Wer uns über mehrere Jahre beauftragt, profitiert von Folgerabatt und hat Priorität bei der Routenplanung – was in schneereichen Wintern von Vorteil ist.',
  },
];

export default function WinterdienstNeuwied() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Winterdienst Neuwied' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Neuwied & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Winterdienst <span className="gradient-text">Neuwied</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Zuverlässiger Winterdienst für Eigentümer, Hausverwaltungen und Gewerbetreibende in Neuwied. Wir übernehmen Schneeräumung, Streudienst und Dokumentation – und damit Ihre komplette Verkehrssicherungspflicht im Winter.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/angebot" className="btn-primary px-8 py-3.5">Kostenloses Angebot</Link>
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
            <div className="section-label">Winterdienst in Neuwied</div>
            <h2 className="mt-4 mb-6">Sicher durch den Winter –<br /><span className="gradient-text">wir räumen für Sie</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              In Neuwied gilt: Eigentümer und Vermieter sind gesetzlich verpflichtet, Gehwege und Zugänge zu ihren Grundstücken von Schnee und Eis zu befreien. Wer dieser Pflicht nicht nachkommt, haftet bei Unfällen. Wir übernehmen diese Verantwortung für Sie – verlässlich, dokumentiert und zu festen Saisonpreisen.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Wir sind in allen Neuwieder Stadtteilen tätig: Heddesdorf, Heimbach-Weis, Engers, Gladbach, Irlich und der Innenstadt. Unsere Winterdienstrouten sind so geplant, dass alle Objekte rechtzeitig vor Arbeitsbeginn geräumt und gestreut sind.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Alle Einsätze werden mit Uhrzeit, Datum und verwendetem Streumittel dokumentiert. Dieses Protokoll erhalten Sie auf Wunsch monatlich und dient als rechtssicherer Nachweis.
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
            <div className="section-label mx-auto w-fit">Leistungen in Neuwied</div>
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
            <Link href="/angebot" className="btn-primary inline-flex">Jetzt Angebot anfordern</Link>
          </div>
        </div>
      </section>

      {/* Nearby locations */}
      <section className="section-padding bg-white">
        <div className="container mx-auto text-center">
          <div className="section-label mx-auto w-fit mb-4">Auch in Ihrer Nähe verfügbar</div>
          <h2 className="mb-8">Winterdienst auch in <span className="gradient-text">Koblenz & Bendorf</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/winterdienst-koblenz" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">❄️</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Winterdienst Koblenz</h3>
              <p className="text-slate-500 text-sm mt-1">Schneeräumung für Wohn- und Gewerbeobjekte in Koblenz</p>
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
