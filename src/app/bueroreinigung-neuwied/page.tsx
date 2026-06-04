import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Büroreinigung in Neuwied | Huwa Gebäudereinigung',
  description: 'Zuverlässige Büroreinigung in Neuwied für Hausverwaltungen, Gewerbe und Wohnanlagen. Feste Abläufe, klare Absprachen und kostenloses Angebot.',
  alternates: { canonical: `${siteConfig.url}/bueroreinigung-neuwied` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professionelle Büroreinigung in Neuwied für Büros, Arztpraxen, Kanzleien und Verwaltungen',
  url: `${siteConfig.url}/bueroreinigung-neuwied`,
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
  { icon: '💼', title: 'Büroreinigung',       desc: 'Regelmäßige Unterhaltsreinigung aller Büroräume – Schreibtische, Bodenbeläge, Oberflächen und Schalter täglich oder wöchentlich je nach Bedarf.' },
  { icon: '🚿', title: 'Sanitärreinigung',    desc: 'Hygienische Grundreinigung von WC-Anlagen, Waschbecken und Armaturen – inklusive Desinfektion und Auffrischung der Verbrauchsmaterialien.' },
  { icon: '☕', title: 'Teeküche & Kantine',  desc: 'Reinigung von Teeküchen, Pausenräumen und Kantinen – Oberflächen, Kühlschrank, Mikrowelle und Spülbereich werden gründlich gepflegt.' },
  { icon: '🏛️', title: 'Empfang & Flure',    desc: 'Repräsentativer Eingangsbereich und Flure immer in bestem Zustand – Böden, Türen, Glaselemente und Möbel werden sorgfältig gereinigt.' },
  { icon: '🧹', title: 'Bodenreinigung',      desc: 'Maschinelle Pflege von Hartböden, Teppichen und Laminat – von der einfachen Unterhaltsreinigung bis zur intensiven Grundreinigung.' },
  { icon: '🪟', title: 'Fensterreinigung',    desc: 'Streifenfreie Fensterreinigung für Büroräume und Schaufronten – auf Wunsch mit Osmose-Technik ohne chemische Rückstände.' },
];

const faqs = [
  {
    q: 'Wie oft sollte eine Büroreinigung in Neuwied stattfinden?',
    a: 'Das hängt von der Nutzungsintensität ab. Für Büros mit hohem Publikumsverkehr – wie Arztpraxen oder Behörden – empfehlen wir tägliche Reinigung. Kleinere Büros kommen oft mit 2–3 Einsätzen pro Woche gut aus. Wir beraten Sie gerne nach einer kostenlosen Besichtigung.',
  },
  {
    q: 'Können Sie auch außerhalb der Bürozeiten reinigen?',
    a: 'Ja. Wir reinigen bevorzugt früh morgens vor Arbeitsbeginn oder abends nach Büroschluss, damit der laufende Betrieb nicht gestört wird. Termine außerhalb der Kernzeiten sind für uns Standard.',
  },
  {
    q: 'Gibt es einen festen Ansprechpartner für unser Büro in Neuwied?',
    a: 'Jeder Kunde erhält bei uns einen festen Objektleiter. Dieser kennt Ihr Büro, Ihre Wünsche und ist direkt erreichbar – ohne Call-Center oder Weiterleitungen.',
  },
  {
    q: 'In welchen Stadtteilen von Neuwied sind Sie tätig?',
    a: 'Wir betreuen Büros in ganz Neuwied – inklusive Heddesdorf, Heimbach-Weis, Engers, Gladbach, Irlich und allen weiteren Stadtteilen. Als Neuwieder Unternehmen kennen wir die Region sehr gut.',
  },
];

export default function BueroeinigungNeuwied() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Büroreinigung Neuwied' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Neuwied & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Büroreinigung <span className="gradient-text">Neuwied</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Professionelle Büroreinigung für Arztpraxen, Kanzleien, Verwaltungsgebäude und Büroflächen in Neuwied. Feste Reinigungszeiten, klar dokumentierte Abläufe und ein persönlicher Ansprechpartner – damit Ihr Büro jeden Morgen sauber und einladend ist.
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
            <div className="section-label">Büroreinigung in Neuwied</div>
            <h2 className="mt-4 mb-6">Sauberkeit, die den<br /><span className="gradient-text">Arbeitsalltag erleichtert</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Ein gepflegtes Büro wirkt nicht nur professionell auf Kunden und Besucher – es sorgt auch für Wohlbefinden und Produktivität im Arbeitsalltag. Wir übernehmen die regelmäßige Unterhaltsreinigung Ihrer Büroflächen in Neuwied, damit Sie sich auf das Wesentliche konzentrieren können.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Wir betreuen Büros, Arztpraxen, Kanzleien und Verwaltungsgebäude in allen Neuwieder Stadtteilen: Heddesdorf, Heimbach-Weis, Engers, Gladbach, Irlich und der Innenstadt. Als lokales Unternehmen sind wir schnell vor Ort und kennen die typischen Anforderungen der Neuwieder Geschäftswelt.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Unsere Reinigungskräfte arbeiten nach festem Ablaufplan – zuverlässig, diskret und zu den vereinbarten Zeiten. Auf Wunsch erstellen wir monatliche Reinigungsprotokolle für Ihre Unterlagen.
            </p>
            <Link href="/leistungen/bueroeinigung" className="btn-outline inline-flex">
              Zur Leistungsseite Büroreinigung
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
            <h2 className="mt-4">Was wir bei der Büroreinigung <span className="gradient-text">übernehmen</span></h2>
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
          <h2 className="mb-8">Büroreinigung auch in <span className="gradient-text">Koblenz & Bendorf</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/bueroreinigung-koblenz" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">💼</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Büroreinigung Koblenz</h3>
              <p className="text-slate-500 text-sm mt-1">Für Unternehmen, Behörden und Praxen in Koblenz</p>
            </Link>
            <Link href="/bueroreinigung-bendorf" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">💼</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Büroreinigung Bendorf</h3>
              <p className="text-slate-500 text-sm mt-1">Für Büros, Praxen und Gewerbe in Bendorf</p>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
