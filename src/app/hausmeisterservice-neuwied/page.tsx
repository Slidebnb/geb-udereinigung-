import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Hausmeisterservice in Neuwied | Huwa Gebäudedienste',
  description: 'Zuverlässiger Hausmeisterservice in Neuwied für Hausverwaltungen, Gewerbe und Wohnanlagen. Feste Abläufe, klare Absprachen und kostenloses Angebot.',
  alternates: { canonical: `${siteConfig.url}/hausmeisterservice-neuwied` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professioneller Hausmeisterservice in Neuwied für Hausverwaltungen, WEGs und Eigentümer',
  url: `${siteConfig.url}/hausmeisterservice-neuwied`,
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
  { icon: '🔧', title: 'Instandhaltung',       desc: 'Regelmäßige Objektkontrolle und Behebung kleiner Mängel: defekte Beleuchtung, lockere Handläufe, klemmende Türen und mehr – bevor Mieter sich beschweren.' },
  { icon: '🌿', title: 'Außenanlagen',          desc: 'Pflege von Grünflächen, Rasenmähen, Heckenschnitt, Laubbeseitigung und Wintervorbereitung der Außenbereiche rund ums Gebäude.' },
  { icon: '🗑️', title: 'Müllmanagement',        desc: 'Mülltonnen bereitstellen und zurückstellen, Entsorgungsbereiche sauber halten und Fehlwürfe korrigieren – für eine ordentliche Anlage.' },
  { icon: '❄️', title: 'Winterdienst',          desc: 'Schneeräumung und Streudienst für Zufahrten, Gehwege und Parkplätze in Neuwied – zuverlässig ab den frühen Morgenstunden.' },
  { icon: '🔍', title: 'Objektkontrolle',       desc: 'Systematische Rundgänge zur Schadenserkennung, Sicherheitskontrolle und Dokumentation des Gebäudezustands – mit Bericht an die Hausverwaltung.' },
  { icon: '🛠️', title: 'Kleine Reparaturen',   desc: 'Glühbirnen wechseln, Türen einstellen, Schließanlagen prüfen, Hinweisschilder anbringen und weitere handwerkliche Kleinarbeiten ohne lange Wartezeiten.' },
];

const faqs = [
  {
    q: 'Was genau übernimmt der Hausmeisterservice in Neuwied?',
    a: 'Unser Hausmeisterservice umfasst alle typischen Aufgaben rund um die Objektbetreuung: Instandhaltungsrundgänge, Außenpflege, Müllbewirtschaftung, Winterdienst, Schlüsselservice und kleinere Reparaturen. Den genauen Leistungsumfang stimmen wir individuell mit Ihnen oder Ihrer Hausverwaltung ab.',
  },
  {
    q: 'Können Sie mehrere Objekte einer Hausverwaltung in Neuwied betreuen?',
    a: 'Ja – das ist sogar unsere Stärke. Wir betreuen mehrere Objekte einer Verwaltung mit einheitlichen Standards, einem zentralen Ansprechpartner und einer übersichtlichen monatlichen Abrechnung. Für Hausverwaltungen mit mehreren Neuwieder Objekten bieten wir Sammelkonditionen.',
  },
  {
    q: 'Wie wird die Arbeit des Hausmeisterservice dokumentiert?',
    a: 'Alle durchgeführten Tätigkeiten werden erfasst und monatlich zusammengefasst. Sie erhalten einen Tätigkeitsbericht, der auch als Nachweis gegenüber Eigentümern oder bei Versicherungsfragen dient.',
  },
  {
    q: 'Übernehmen Sie auch den Winterdienst für Neuwieder Objekte?',
    a: 'Ja. Wir bieten den Winterdienst als eigenständige Leistung oder kombiniert mit dem Hausmeisterservice an. Für Eigentümer und Hausverwaltungen in Neuwied übernehmen wir die komplette Räum- und Streupflicht – inklusive Dokumentation.',
  },
];

export default function HausmeisterserviceNeuwied() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Hausmeisterservice Neuwied' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Neuwied & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Hausmeisterservice <span className="gradient-text">Neuwied</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Kompetenter Hausmeisterservice für Hausverwaltungen, WEGs und Eigentümer in Neuwied. Wir übernehmen Instandhaltung, Außenpflege, Müllbewirtschaftung und Winterdienst – damit Ihr Objekt immer in einwandfreiem Zustand ist, ohne dass Sie sich darum kümmern müssen.
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
            <div className="section-label">Hausmeisterservice in Neuwied</div>
            <h2 className="mt-4 mb-6">Ihr verlässlicher<br /><span className="gradient-text">Hausmeister in Neuwied</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Ein guter Hausmeisterservice ist mehr als jemand, der Glühbirnen wechselt. Als Ihr Hausmeisterdienst in Neuwied sind wir das erste Auge vor Ort: Wir erkennen Schäden früh, reagieren auf Mieteranliegen und sorgen dafür, dass Ihr Gebäude stets ordentlich und betriebssicher ist.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Wir sind in allen Neuwieder Stadtteilen tätig – Heddesdorf, Heimbach-Weis, Engers, Gladbach, Irlich und der Innenstadt. Unser Team ist fest im Objekt eingeplant, sodass alle Mitarbeiter Ihr Gebäude kennen und keine Einweisung bei jedem Einsatz nötig ist.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Wir arbeiten eng mit Hausverwaltungen zusammen und bieten auf Wunsch kombinierte Pakete aus Hausmeisterservice, Treppenhausreinigung und Winterdienst – alles aus einer Hand, übersichtlich abgerechnet.
            </p>
            <Link href="/leistungen/hausmeisterdienste" className="btn-outline inline-flex">
              Zur Leistungsseite Hausmeisterdienste
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
            <h2 className="mt-4">Was der Hausmeisterservice <span className="gradient-text">übernimmt</span></h2>
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
          <h2 className="mb-8">Hausmeisterservice auch in <span className="gradient-text">Koblenz & Bendorf</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/hausmeisterservice-koblenz" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🔧</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Hausmeisterservice Koblenz</h3>
              <p className="text-slate-500 text-sm mt-1">Objektbetreuung für Wohnanlagen und Gewerbe in Koblenz</p>
            </Link>
            <Link href="/hausmeisterservice-bendorf" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🔧</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Hausmeisterservice Bendorf</h3>
              <p className="text-slate-500 text-sm mt-1">Hausmeisterdienste für Eigentümer und WEGs in Bendorf</p>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
