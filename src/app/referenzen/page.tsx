import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/lib/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Referenzen | Gebäudereinigung Neuwied & Koblenz | Huwa',
  description: 'Referenzprojekte von Huwa Gebäudereinigung in Neuwied, Koblenz & Bendorf. Büroreinigung, Treppenhausreinigung, Glasreinigung, Winterdienst & Hausmeisterdienste.',
  alternates: { canonical: `${siteConfig.url}/referenzen` },
};

const serviceAreas = [
  { icon: '🏢', title: 'Büroreinigung',         desc: 'Unterhaltsreinigung von Büros, Praxen und Gewerbeeinheiten – täglich, wöchentlich oder nach Bedarf.' },
  { icon: '🏠', title: 'Treppenhausreinigung',  desc: 'Wöchentliche Reinigung von Treppenhäusern, Eingängen und Gemeinschaftsflächen für WEGs und Hausverwaltungen.' },
  { icon: '🪟', title: 'Glasreinigung',         desc: 'Fenster, Schaufenster und Glasfassaden – streifenfrei mit Osmose-Reinwasser-Technik.' },
  { icon: '🏗️', title: 'Baureinigung',          desc: 'Grob- und Feinreinigung nach Bau- oder Renovierungsarbeiten – bezugsfertig übergeben.' },
  { icon: '❄️', title: 'Winterdienst',          desc: 'Räum- und Streudienst für Zufahrten, Parkplätze und Gehwege – auch früh morgens und am Wochenende.' },
  { icon: '🌿', title: 'Gartenarbeiten',        desc: 'Ganzjährige Außenanlagenbetreuung: Rasenmähen, Heckenpflege, Laubbeseitigung und Beete.' },
  { icon: '🔧', title: 'Hausmeisterdienste',    desc: 'Objektbetreuung, Kleinreparaturen, Kontrollgänge und Müllentsorgung für Wohn- und Gewerbeimmobilien.' },
  { icon: '✨', title: 'Grundreinigung',        desc: 'Intensive Tiefenreinigung – ideal nach Einzug, Auszug oder Renovierung.' },
];

export default async function ReferenzenPage() {
  let testimonials: { id: string; name: string; role: string | null; company: string | null; content: string; rating: number; location: string | null }[] = [];
  try {
    testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    testimonials = [];
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Referenzen' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Referenzen</div>
            <h1 className="text-white mb-4">Leistungen, auf die wir<br /><span className="gradient-text">stolz sind</span></h1>
            <p className="text-slate-300 text-lg">Wir reinigen und betreuen Objekte in Neuwied, Koblenz, Bendorf und der gesamten Region. Hier finden Sie einen Überblick über unsere Leistungsbereiche.</p>
          </div>
        </div>
      </section>

      {/* Leistungsübersicht */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit">Unsere Leistungen</div>
            <h2 className="mt-4">Was wir für Sie <span className="gradient-text">leisten</span></h2>
            <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">Referenzdetails stellen wir auf Anfrage gerne zur Verfügung. Sprechen Sie uns an.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {serviceAreas.map((s, i) => (
              <div key={s.title} className={`card p-6 hover:border-${i % 2 === 0 ? 'primary' : 'green'}/30 transition-all duration-200`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${i % 2 === 0 ? 'bg-primary/8' : 'bg-green/8'}`}>{s.icon}</div>
                <h3 className="text-sm font-bold text-dark mb-2">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referenz auf Anfrage */}
      <section className="section-padding" style={{ background: '#F8FAFC' }}>
        <div className="container mx-auto max-w-3xl text-center">
          <div className="section-label mx-auto w-fit mb-4">Referenzanfrage</div>
          <h2 className="mb-4">Referenzen <span className="gradient-text">auf Anfrage</span></h2>
          <p className="text-gray-500 text-base mb-8 leading-relaxed">
            Wir nennen Ihnen gerne konkrete Referenzobjekte in Ihrer Region – nach vorheriger Absprache und mit Einverständnis unserer Kunden. Sprechen Sie uns einfach an.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary px-8 py-3.5">Referenzen anfragen</Link>
            <a href={`tel:${siteConfig.phone}`} className="btn-outline px-8 py-3.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* DB testimonials — nur wenn echte Bewertungen vorhanden */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <div className="section-label mx-auto w-fit">Kundenstimmen</div>
              <h2 className="mt-4">Das sagen unsere <span className="gradient-text">Kunden</span></h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map(t => (
                <div key={t.id} className="card p-6 hover:border-primary/30 transition-all duration-200">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4 text-sm leading-relaxed">„{t.content}"</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-bold text-dark text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">
                      {[t.role, t.company].filter(Boolean).join(', ')}
                      {t.location ? ` · ${t.location}` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
