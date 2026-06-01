import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Über uns | Huwa Gebäudereinigung Neuwied & Koblenz',
  description: `Huwa Gebäudereinigung – Ihr lokaler Partner in Neuwied, Koblenz und Bendorf. Seit ${siteConfig.foundingYear} für Gebäudereinigung, Hausmeisterdienste und Winterdienst. Familie Huwa.`,
  alternates: { canonical: `${siteConfig.url}/ueber-uns` },
};

const values = [
  { icon: '🏆', title: 'Qualität', desc: 'Jeder Einsatz wird mit höchster Sorgfalt durchgeführt. DGUV-geschultes Personal, geprüfte Reinigungsmittel und lückenlose Qualitätsprozesse.' },
  { icon: '🤝', title: 'Vertrauen',       desc: 'Unsere Kunden vertrauen uns ihre Immobilien an. Dieses Vertrauen nehmen wir ernst – mit Seriosität, Diskretion und Betriebshaftpflicht.' },
  { icon: '⚡', title: 'Zuverlässigkeit', desc: 'Pünktlichkeit ist keine Option, sondern Pflicht. Wir erscheinen zur vereinbarten Zeit und erledigen die Arbeit wie versprochen – ohne Ausreden.' },
];

const certs = ['DGUV Ausgebildet', 'Betriebshaftpflicht', 'Innungsmitglied Koblenz', 'DSGVO Konform', 'Geprüfte Qualität'];

export default function UeberUnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Über uns' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Über uns</div>
            <h1 className="text-white mb-4">Huwa Gebäudereinigung<br /><span className="gradient-text">& Hausmeisterdienste</span></h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Seit {siteConfig.foundingYear} sind wir Ihr vertrauenswürdiger Partner für professionelle Gebäudereinigung und Hausmeisterdienste in Neuwied, Koblenz und dem nördlichen Rheinland-Pfalz.
            </p>
          </div>
        </div>
      </section>

      {/* Story + stats */}
      <section className="section-padding bg-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-5">Unsere Geschichte</div>
            <h2 className="mb-6">Von der Idee zum <span className="gradient-text">führenden Reinigungsunternehmen</span></h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Gegründet im Jahr {siteConfig.foundingYear}, startete Huwa Gebäudereinigung als kleines Unternehmen in Neuwied – mit einem einfachen Versprechen: Qualität, Zuverlässigkeit und Kundenzufriedenheit an erster Stelle.
              </p>
              <p>
                Durch hervorragende Arbeit und treue Stammkunden wuchs das Unternehmen stetig. Heute betreuen wir über 500 zufriedene Kunden im Raum Neuwied, Koblenz und Bendorf mit einem erfahrenen, DGUV-geschulten Team.
              </p>
              <p>
                Was sich nicht verändert hat: unser persönlicher Einsatz, unsere hohen Qualitätsstandards und die Überzeugung, dass zufriedene Kunden und ein motiviertes Team der Schlüssel zum Erfolg sind.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: siteConfig.foundingYear.toString(), label: 'Gründungsjahr', color: 'text-primary' },
              { val: '20+',  label: 'Mitarbeiter',  color: 'text-green' },
              { val: '500+', label: 'Kunden',       color: 'text-primary' },
              { val: '4.9★', label: 'Google Rating', color: 'text-yellow-500' },
            ].map(({ val, label, color }) => (
              <div key={label} className="card p-6 text-center hover:border-primary/30 transition-all duration-200">
                <div className={`text-3xl font-black ${color} mb-1`}>{val}</div>
                <div className="text-gray-500 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: '#F8FAFC' }}>
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit">Unsere Werte</div>
            <h2 className="mt-4 mb-3">Was uns <span className="gradient-text">antreibt</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto">Diese Werte bestimmen jedes unserer Projekte – gegenüber Kunden, Mitarbeitern und Partnern.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map(v => (
              <div key={v.title} className="card p-8 text-center hover:border-primary/30 transition-all duration-200 group">
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">{v.icon}</div>
                <h3 className="text-xl font-bold text-dark mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — only the founder, others removed */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit">Unser Team</div>
            <h2 className="mt-4">Die Menschen hinter <span className="gradient-text">Huwa</span></h2>
          </div>
          <div className="max-w-sm mx-auto">
            <div className="card p-8 text-center hover:border-primary/30 transition-all duration-200">
              <div className="w-20 h-20 rounded-full bg-gradient-brand flex items-center justify-center text-white text-3xl font-black mx-auto mb-5">H</div>
              <h3 className="text-xl font-bold text-dark mb-1">Hasan Huseyin Unal</h3>
              <p className="text-primary font-semibold text-sm mb-4">Geschäftsführer & Gründer</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Mit über 15 Jahren Erfahrung in der Gebäudereinigung hat Hasan das Unternehmen von Grund auf aufgebaut. Er ist persönlich für die Qualitätssicherung verantwortlich und direkter Ansprechpartner für unsere Kunden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto text-center">
          <div className="section-label mx-auto w-fit mb-6">Zertifikate & Mitgliedschaften</div>
          <h2 className="text-white mb-10">Zertifiziert & <span className="gradient-text">vollversichert</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            {certs.map(cert => (
              <div key={cert} className="bg-white/8 border border-white/15 flex items-center gap-2.5 px-5 py-3 rounded-xl">
                <svg className="w-4 h-4 text-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                <span className="text-white/80 font-semibold text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
