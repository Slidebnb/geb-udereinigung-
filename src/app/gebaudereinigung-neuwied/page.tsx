import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Gebäudereinigung Neuwied | Huwa – Ihr lokaler Partner',
  description: 'Professionelle Gebäudereinigung in Neuwied: Büroreinigung, Treppenhausreinigung, Glasreinigung, Hausmeisterdienste & Winterdienst. Kostenlose Besichtigung & Festpreisangebot.',
  alternates: { canonical: `${siteConfig.url}/gebaudereinigung-neuwied` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professionelle Gebäudereinigung in Neuwied und Umgebung',
  url: `${siteConfig.url}/gebaudereinigung-neuwied`,
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
  { icon: '🏢', title: 'Gebäudereinigung',    desc: 'Außen- und Innenbereiche von Büro- und Gewerbegebäuden, Verwaltungsgebäuden und Wohnhäusern.' },
  { icon: '💼', title: 'Büroreinigung',        desc: 'Regelmäßige Unterhaltsreinigung von Büroflächen, Sanitäranlagen und Gemeinschaftsbereichen.' },
  { icon: '🏠', title: 'Treppenhausreinigung', desc: 'Wöchentliche Treppenhausreinigung mit Protokoll – für WEGs und Hausverwaltungen in Neuwied.' },
  { icon: '🪟', title: 'Glasreinigung',        desc: 'Fenster, Schaufenster und Glasfassaden – streifenfrei und auf Wunsch mit Osmose-Technik.' },
  { icon: '🔧', title: 'Hausmeisterdienste',   desc: 'Objektbetreuung, kleine Reparaturen, Müllentsorgung und Sichtkontrollen für Ihr Gebäude.' },
  { icon: '❄️', title: 'Winterdienst',         desc: 'Räumen und Streuen auf Zufahrten, Gehwegen und Parkplätzen – auch früh morgens und am Wochenende.' },
];

export default async function GebaudereinigungNeuwied() {
  const reviewSummary = await prisma.testimonial.aggregate({
    where: { published: true },
    _avg: { rating: true },
    _count: { id: true },
  }).catch(() => null);
  const stats = [
    { val: '100+', label: 'Kunden in Neuwied' },
    { val: '6', label: 'Jahre Erfahrung' },
    ...(reviewSummary?._avg.rating && reviewSummary._count.id > 0
      ? [{
          val: `${reviewSummary._avg.rating.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}★`,
          label: `${reviewSummary._count.id} Kundenbewertungen`,
        }]
      : []),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Gebäudereinigung Neuwied' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Neuwied & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Gebäudereinigung <span className="gradient-text">Neuwied</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Ihr zuverlässiger Partner für professionelle Gebäudereinigung, Hausmeisterdienste und Winterdienst in Neuwied. Wir kennen die Region – und die Bedürfnisse von Hausverwaltungen, Gewerbetreibenden und Eigentümergemeinschaften vor Ort.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/angebot?service=Geb%C3%A4udereinigung&city=Neuwied&source=regional-page" className="btn-primary px-8 py-3.5">Kostenloses Angebot</Link>
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
            <div className="section-label">Warum Huwa in Neuwied?</div>
            <h2 className="mt-4 mb-6">Lokale Präsenz –<br /><span className="gradient-text">persönlicher Service</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Als Reinigungsunternehmen mit Sitz in Neuwied kennen wir die Anforderungen der lokalen Objekte, Hausverwaltungen und Gewerbekunden. Kurze Wege bedeuten schnelle Reaktion – ob für regelmäßige Reinigung oder dringende Einsätze.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Wir betreuen Bürogebäude, Wohnanlagen, Praxen, Gewerbeobjekte und Treppenhäuser in ganz Neuwied und den Stadtteilen Heddesdorf, Heimbach-Weis, Feldkirchen, Engers und Umgebung.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Jeder Auftrag wird von einem festen Ansprechpartner begleitet – keine Call-Center, kein Weiterverbinden. Direkt, persönlich, verlässlich.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-5">
              {stats.map(s => (
                <div key={s.label} className="card p-5 text-center">
                  <div className="text-3xl font-black text-primary mb-1">{s.val}</div>
                  <div className="text-slate-500 text-xs font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Wie schnell können Sie in Neuwied starten?', a: 'Nach einem Vor-Ort-Termin und Auftragserteilung starten wir in der Regel innerhalb weniger Tage. Bei dringenden Anfragen finden wir meist eine schnelle Lösung.' },
              { q: 'Betreuen Sie auch kleine Objekte in Neuwied?', a: 'Ja. Wir reinigen Objekte aller Größen – von einzelnen Treppenhäusern über kleine Büros bis zu großen Gewerbekomplexen.' },
              { q: 'Gibt es einen festen Ansprechpartner?', a: 'Für jedes Objekt in Neuwied gibt es einen festen Objektleiter. So kennt Ihr Team Ihr Gebäude und Ihre Wünsche.' },
              { q: 'Kommen Sie auch in die Stadtteile?', a: 'Ja – wir sind in ganz Neuwied aktiv, inklusive Heddesdorf, Heimbach-Weis, Feldkirchen, Engers, Irlich und weiteren Stadtteilen.' },
            ].map(item => (
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
            <h2 className="mt-4">Was wir in Neuwied <span className="gradient-text">anbieten</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={s.title} className={`card p-6 hover:border-${i % 2 === 0 ? 'primary' : 'green'}/30 transition-all`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${i % 2 === 0 ? 'bg-primary/8' : 'bg-green/8'}`}>{s.icon}</div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{s.title} Neuwied</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/leistungen" className="btn-outline inline-flex">Alle Leistungen ansehen</Link>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Kostenloser Download</div>
            <h3 className="text-lg font-bold text-dark">12-Punkte Haustechnik-Checkliste für Hausverwaltungen</h3>
            <p className="text-gray-500 text-sm mt-1">Was muss wann geprüft werden? Jetzt kostenlos herunterladen.</p>
          </div>
          <Link href="/checkliste" className="btn-primary whitespace-nowrap shrink-0">Kostenlos herunterladen →</Link>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
