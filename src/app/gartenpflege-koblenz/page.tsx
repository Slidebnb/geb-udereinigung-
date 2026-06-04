import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gartenpflege Koblenz | Huwa – Zuverlässiger Hausmeisterservice',
  description: 'Professionelle Gartenpflege in Koblenz für Wohnanlagen, Hausverwaltungen und Gewerbe. Rasenpflege, Hecken, Rückschnitt, Laubentsorgung. Festpreisangebot.',
  alternates: { canonical: `${siteConfig.url}/gartenpflege-koblenz` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professionelle Gartenpflege in Koblenz für Wohnanlagen und Gewerbeimmobilien',
  url: `${siteConfig.url}/gartenpflege-koblenz`,
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
  { icon: '🌿', title: 'Rasenpflege',          desc: 'Regelmäßiges Mähen, Kantenstechen und Rasendüngung – damit Grünflächen in Wohnanlagen und Gewerbeobjekten gepflegt und attraktiv bleiben.' },
  { icon: '✂️', title: 'Hecken & Sträucher',   desc: 'Formschnitt und Rückschnitt von Hecken, Büschen und Ziersträuchern – termingerecht im Frühjahr und Herbst nach abgestimmtem Pflegeplan.' },
  { icon: '🍂', title: 'Laubentsorgung',        desc: 'Laubsammlung auf Gehwegen, Grünflächen und Innenhöfen – mit anschließender fachgerechter Entsorgung, auch für die Wintersaison.' },
  { icon: '🌳', title: 'Baumpflege & Schnitt',  desc: 'Fachgerechter Kronenrückschnitt und Entastung von Bäumen auf Privatgrundstücken und in Wohnanlagen – sicher und nach ggf. erforderlicher Genehmigung.' },
  { icon: '🔧', title: 'Hausmeisterdienste',    desc: 'Kombinierbar mit Hausmeisterleistungen: Mülltonnen, Beleuchtungscheck, Kleinreparaturen und Winterdienst aus einer Hand.' },
  { icon: '📋', title: 'Saisonaler Pflegeplan', desc: 'Wir erstellen einen individuellen Jahrespflegeplan für Ihre Anlage – transparente Terminplanung, feste Preise, keine Überraschungen.' },
];

const faqs = [
  {
    q: 'Welche Stadtteile in Koblenz betreuen Sie für Gartenpflege?',
    a: 'Wir sind in ganz Koblenz tätig – in Güls, Metternich, Moselweiß, Lützel, Kesselheim, der Innenstadt und in Ehrenbreitstein. Auch Gewerbegebiete und Randlagen gehören zu unserem Einsatzgebiet.',
  },
  {
    q: 'Können Sie Gartenpflege und Reinigung als Paket anbieten?',
    a: 'Ja – das ist einer unserer größten Vorteile. Als Anbieter von Gebäudereinigung und Hausmeisterdiensten können wir Gartenpflege, Treppenhausreinigung und Winterdienst in einem Paketvertrag kombinieren. Das spart Koordinationsaufwand und oft auch Kosten.',
  },
  {
    q: 'Übernehmen Sie auch Laubentsorgung im Herbst in Koblenz?',
    a: 'Ja. Laubbeseitigung auf Gehwegen, Parkplätzen und Grünflächen ist eine unserer Kernleistungen im Herbst. Wir disponieren die Einsätze zeitnah nach dem Laubfall, um Rutschgefahren auf Gehwegen zu minimieren.',
  },
  {
    q: 'Wie wird die Gartenpflege in Koblenz abgerechnet?',
    a: 'In der Regel nach einem Jahrespauschalbetrag auf Basis der Grundstücksgröße und des vereinbarten Leistungsumfangs. Einmalleistungen wie Frühjahrsschnitt werden separat als Festpreis angeboten. Wir besichtigen kostenlos und erstellen ein transparentes Angebot.',
  },
];

export default function GartenpflegeKoblenz() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Gartenpflege Koblenz' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Koblenz & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Gartenpflege <span className="gradient-text">Koblenz</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Zuverlässige Gartenpflege für Wohnanlagen, Hausverwaltungen und Gewerbeobjekte in Koblenz. Rasen, Hecken, Bäume, Laubentsorgung – wir übernehmen die komplette Außenpflege nach individuell abgestimmtem Pflegeplan und zu festen Preisen.
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
            <div className="section-label">Gartenpflege in Koblenz</div>
            <h2 className="mt-4 mb-6">Grünanlagen & Außenflächen<br /><span className="gradient-text">professionell gepflegt</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Koblenz liegt eingebettet zwischen Rhein und Mosel – gepflegte Außenanlagen sind für Wohnanlagen, Gewerbegebäude und öffentliche Einrichtungen in dieser Region besonders sichtbar und wertrelevant.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Wir übernehmen die Gartenpflege für Hausverwaltungen, WEGs und Gewerbebetriebe in ganz Koblenz – von der regelmäßigen Rasenmahd über Heckenschnitt bis zur Laubentsorgung im Herbst. Alle Leistungen lassen sich mit unseren Hausmeisterservices kombinieren.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Ein persönlicher Ansprechpartner koordiniert alle Termine. Auf Wunsch erhalten Sie einen Jahrespflegeplan mit allen vorgesehenen Einsatzterminen.
            </p>
            <Link href="/leistungen/gartenarbeiten" className="btn-outline inline-flex">
              Zur Leistungsseite Gartenarbeiten
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
            <h2 className="mt-4">Was die Gartenpflege <span className="gradient-text">umfasst</span></h2>
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

      {/* Related services */}
      <section className="section-padding bg-white">
        <div className="container mx-auto text-center">
          <div className="section-label mx-auto w-fit mb-4">Kombinierbar mit</div>
          <h2 className="mb-8">Alles aus einer Hand –<br /><span className="gradient-text">Hausmeisterservice in Koblenz</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/winterdienst-koblenz" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">❄️</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Winterdienst Koblenz</h3>
              <p className="text-slate-500 text-sm mt-1">Räum- und Streupflicht zuverlässig erfüllt</p>
            </Link>
            <Link href="/hausmeisterservice-koblenz" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🔧</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Hausmeisterservice Koblenz</h3>
              <p className="text-slate-500 text-sm mt-1">Hausmeistertätigkeiten & Kleinreparaturen</p>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
