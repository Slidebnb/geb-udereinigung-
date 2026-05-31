import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Über uns | Huwa Gebäudereinigung & Hausmeisterdienste',
  description: `Seit ${siteConfig.foundingYear} Ihr zuverlässiger Partner für Gebäudereinigung und Hausmeisterdienste in Neuwied, Koblenz und Bendorf. Erfahren Sie mehr über unser Team und unsere Werte.`,
};

const team = [
  { name: 'Hasan Huseyin Unal', role: 'Geschäftsführer & Gründer', initial: 'H', desc: 'Mit über 15 Jahren Erfahrung in der Gebäudereinigung hat Hasan das Unternehmen von Grund auf aufgebaut und ist auch heute noch persönlich für die Qualitätssicherung verantwortlich.' },
  { name: 'Maria Wagner', role: 'Leiterin Büroreinigung', initial: 'M', desc: 'Maria koordiniert alle Büroreinigungseinsätze und sorgt für reibungslose Abläufe. Ihre Leidenschaft: perfekte Sauberkeit und ein motiviertes Team.' },
  { name: 'Klaus Richter', role: 'Hausmeister & Technik', initial: 'K', desc: 'Klaus ist unser Experte für Hausmeisterdienstleistungen und technische Wartungsaufgaben. Er ist bekannt für seine schnelle Reaktionszeit und handwerkliche Kompetenz.' },
];

export default function UeberUnsPage() {
  return (
    <>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'Über uns' }]} />
          <h1 className="text-white mt-6 mb-3">Über Huwa Gebäudereinigung</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Seit {siteConfig.foundingYear} sind wir Ihr vertrauenswürdiger Partner für professionelle Gebäudereinigung und Hausmeisterdienste in Neuwied, Koblenz und dem nördlichen Rheinland-Pfalz.</p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="badge bg-primary-50 text-primary mb-4">Unsere Geschichte</span>
            <h2 className="mb-4">Von der Idee zum führenden Reinigungsunternehmen</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Gegründet im Jahr {siteConfig.foundingYear}, startete Huwa Gebäudereinigung als kleines Ein-Mann-Unternehmen in Neuwied. Mit einem einfachen Versprechen: Qualität, Zuverlässigkeit und Kundenzufriedenheit an erster Stelle.
              </p>
              <p>
                Durch hervorragende Arbeit und treue Stammkunden wuchs das Unternehmen stetig. Heute beschäftigt Huwa über 20 qualifizierte Mitarbeiter und betreut mehr als 500 zufriedene Kunden im Raum Neuwied, Koblenz und Bendorf.
              </p>
              <p>
                Was sich nicht verändert hat: unser persönlicher Einsatz, unsere hohen Qualitätsstandards und die Überzeugung, dass zufriedene Kunden und zufriedene Mitarbeiter der Schlüssel zum Erfolg sind.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: siteConfig.foundingYear.toString(), label: 'Gründungsjahr' },
              { val: '20+', label: 'Mitarbeiter' },
              { val: '500+', label: 'Kunden' },
              { val: '4.9★', label: 'Google Rating' },
            ].map(({ val, label }) => (
              <div key={label} className="bg-primary-50 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-primary">{val}</div>
                <div className="text-gray-600 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="badge bg-accent-50 text-accent-600 mb-3">Unsere Werte</span>
            <h2 className="mb-3">Was uns antreibt</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Diese Werte sind die Grundlage jedes Einsatzes und bestimmen, wie wir mit Kunden, Mitarbeitern und Partnern umgehen.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏆', title: 'Qualität', desc: 'Jeder Einsatz wird mit höchster Sorgfalt durchgeführt. Wir machen keine halben Sachen – entweder es ist perfekt oder wir kommen noch einmal.' },
              { icon: '🤝', title: 'Vertrauen', desc: 'Unsere Kunden vertrauen uns ihre Immobilien an. Dieses Vertrauen nehmen wir ernst – mit Seriosität, Diskretion und professionellem Verhalten.' },
              { icon: '⚡', title: 'Zuverlässigkeit', desc: 'Pünktlichkeit ist keine Option, sondern Pflicht. Wir erscheinen zur vereinbarten Zeit und erledigen die Arbeit wie versprochen.' },
            ].map(v => (
              <div key={v.title} className="card p-8 text-center">
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="mb-3">{v.title}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="badge bg-primary-50 text-primary mb-3">Unser Team</span>
            <h2>Die Menschen hinter Huwa</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map(m => (
              <div key={m.name} className="card p-6 text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">{m.initial}</div>
                <h3 className="text-lg mb-1">{m.name}</h3>
                <p className="text-accent font-medium text-sm mb-3">{m.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="mb-8">Zertifikate & Mitgliedschaften</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['DGUV Ausgebildet', 'Haftpflicht­versichert', 'Innungsmitglied', 'ISO 9001 Prozesse', 'DSGVO konform'].map(cert => (
              <div key={cert} className="bg-white border border-gray-200 rounded-xl px-6 py-4 font-semibold text-gray-700">
                ✓ {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
