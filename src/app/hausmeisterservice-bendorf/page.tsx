import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Hausmeisterservice in Bendorf | Huwa Gebäudedienste',
  description: 'Zuverlässiger Hausmeisterservice in Bendorf für Hausverwaltungen, Gewerbe und Wohnanlagen. Feste Abläufe, klare Absprachen und kostenloses Angebot.',
  alternates: { canonical: `${siteConfig.url}/hausmeisterservice-bendorf` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professioneller Hausmeisterservice in Bendorf für Eigentümer, WEGs und private Vermieter',
  url: `${siteConfig.url}/hausmeisterservice-bendorf`,
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
  areaServed: { '@type': 'City', name: 'Bendorf' },
  priceRange: '€€',
};

const services = [
  { icon: '🔧', title: 'Instandhaltung',       desc: 'Regelmäßige Kontrollgänge und sofortige Behebung von Kleinschäden – in Bendorfs Wohnanlagen und Mehrfamilienhäusern mit kurzen Reaktionszeiten.' },
  { icon: '🌿', title: 'Außenpflege',           desc: 'Rasenmähen, Heckenschnitt, Laubharken und Wegepflege rund um Ihre Immobilie in Bendorf, Sayn oder Mülhofen – saisonal und nach Bedarf.' },
  { icon: '🗑️', title: 'Müllmanagement',        desc: 'Tonne raus, Tonne rein – zuverlässige Müllbewirtschaftung und saubere Entsorgungsbereiche für Bendorfer Wohn- und Gewerbeobjekte.' },
  { icon: '❄️', title: 'Winterdienst',          desc: 'Räum- und Streudienst für Ihre Bendorfer Immobilie – auf Gehwegen, Zufahrten und Parkflächen, auch an Wochenenden und Feiertagen.' },
  { icon: '🔍', title: 'Objektkontrolle',       desc: 'Begehung mit Schadensbericht an Hausverwaltung oder Eigentümer – präventive Kontrolle verhindert teure Folgeschäden.' },
  { icon: '🛠️', title: 'Kleinreparaturen',     desc: 'Leuchtmittelwechsel, Türeinstellungen, Schlossservice und einfache Montagearbeiten – schnell erledigt ohne langen Handwerkervorlauf.' },
];

const faqs = [
  {
    q: 'Betreuen Sie auch kleine Wohnanlagen mit nur wenigen Einheiten in Bendorf?',
    a: 'Ja. Gerade für kleine Wohnanlagen mit 4–12 Einheiten in Bendorf, Sayn oder Mülhofen, die keinen eigenen Hausmeister beschäftigen können, sind wir der ideale externe Dienstleister. Flexible Leistungspakete machen auch kleine Objekte wirtschaftlich betreibbar.',
  },
  {
    q: 'Können Sie Hausmeisterservice und Treppenhausreinigung kombinieren?',
    a: 'Ja – und das lohnt sich sogar. Als Komplettpaket aus Hausmeisterservice und Treppenhausreinigung bieten wir günstigere Konditionen als zwei separate Aufträge. Alles läuft über einen Ansprechpartner und eine Rechnung.',
  },
  {
    q: 'Sind Sie in Sayn und Stromberg tätig?',
    a: 'Ja. Wir betreuen Objekte in Bendorf-Kernstadt sowie in Sayn, Mülhofen und Stromberg. Als regionaler Dienstleister aus Neuwied kennen wir die Bendorfer Lagen gut und sind schnell vor Ort.',
  },
  {
    q: 'Was passiert bei einem Notfall an meiner Bendorfer Immobilie?',
    a: 'Bei dringenden Fällen – wie einem Wasserrohrbruch, einer defekten Heizung im Winter oder einer beschädigten Eingangsanlage – sind wir schnellstmöglich vor Ort und koordinieren die nötigen Maßnahmen. Für Stammkunden haben wir eine direkte Kontaktnummer für Dringlichkeitsfälle.',
  },
];

export default function HausmeisterserviceBendorf() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Hausmeisterservice Bendorf' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Bendorf & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Hausmeisterservice <span className="gradient-text">Bendorf</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Verlässlicher Hausmeisterservice für Wohnanlagen, Eigentümer und Hausverwaltungen in Bendorf. Wir kümmern uns um Instandhaltung, Außenpflege, Müllbewirtschaftung und Winterdienst – in Bendorf-Kernstadt, Sayn, Mülhofen und Stromberg.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/angebot?service=Hausmeisterdienste&city=Bendorf&source=regional-page" className="btn-primary px-8 py-3.5">Kostenloses Angebot</Link>
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
            <div className="section-label">Ihr Partner in Bendorf</div>
            <h2 className="mt-4 mb-6">Hausmeisterservice für Bendorf –<br /><span className="gradient-text">nah, flexibel & verlässlich</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Viele Eigentümer und kleine WEGs in Bendorf suchen einen verlässlichen externen Hausmeisterdienst – jemanden, der regelmäßig nach dem Rechten schaut, kleinere Aufgaben selbst erledigt und größere Schäden frühzeitig meldet. Genau das sind wir.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Als Dienstleister aus Neuwied sind wir geografisch nah und können schnell auf Anfragen aus Bendorf, Sayn, Mülhofen und Stromberg reagieren. Unsere Hausmeister kennen die typischen Objekte in der Region und wissen, worauf es ankommt.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Wir kombinieren Hausmeisterservice auf Wunsch mit Treppenhausreinigung und Winterdienst – alles aus einer Hand, ein Ansprechpartner, eine monatliche Rechnung. Das vereinfacht den Verwaltungsaufwand erheblich.
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
            <div className="section-label mx-auto w-fit">Leistungen in Bendorf</div>
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
            <Link href="/angebot?service=Hausmeisterdienste&city=Bendorf&source=regional-page" className="btn-primary inline-flex">Jetzt Angebot anfordern</Link>
          </div>
        </div>
      </section>

      {/* Nearby locations */}
      <section className="section-padding bg-white">
        <div className="container mx-auto text-center">
          <div className="section-label mx-auto w-fit mb-4">Auch in Ihrer Nähe verfügbar</div>
          <h2 className="mb-8">Hausmeisterservice auch in <span className="gradient-text">Neuwied & Koblenz</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/hausmeisterservice-neuwied" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🔧</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Hausmeisterservice Neuwied</h3>
              <p className="text-slate-500 text-sm mt-1">Für Hausverwaltungen, WEGs und Eigentümer in Neuwied</p>
            </Link>
            <Link href="/hausmeisterservice-koblenz" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🔧</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Hausmeisterservice Koblenz</h3>
              <p className="text-slate-500 text-sm mt-1">Objektbetreuung für Wohnanlagen und Gewerbe in Koblenz</p>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
