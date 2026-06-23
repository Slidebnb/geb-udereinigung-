import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CalendarCheck, Leaf, ShieldCheck, Snowflake } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Saison 2026/2027 anmelden | Winterdienst & Gartenpflege | Huwa',
  description:
    'Saison 2026/2027 frühzeitig planen: Winterdienst oder Gartenpflege in Neuwied, Koblenz, Bendorf und Umgebung anmelden. Passende Saisonleistung auswählen.',
  alternates: { canonical: `${siteConfig.url}/saison-2026-2027` },
  openGraph: {
    title: 'Saison 2026/2027: Winterdienst oder Gartenpflege anmelden',
    description:
      'Wählen Sie die passende Saisonleistung: Winterdienst 2026/2027 oder Gartenpflege 2026/2027.',
    url: `${siteConfig.url}/saison-2026-2027`,
    type: 'website',
  },
};

const options = [
  {
    title: 'Winterdienst 2026/2027',
    href: '/winterdienst-anmeldung-2026',
    description:
      'Räum- und Streudienst für Gehwege, Einfahrten, Parkplätze, Eingänge und Gewerbeflächen.',
    details: ['Saisonvertrag', 'Räum- und Streupflicht', 'Einsatzdokumentation', 'Planbare Betreuung'],
    icon: Snowflake,
    tone: 'blue',
  },
  {
    title: 'Gartenpflege 2026/2027',
    href: '/gartenpflege-anmeldung-2026',
    description:
      'Heckenschnitt, Rasenpflege, Beetpflege, Laubentfernung und regelmäßige Pflege von Außenanlagen.',
    details: ['Hecken schneiden', 'Rasen mähen', 'Laub entfernen', 'Grünschnitt-Entsorgung'],
    icon: Leaf,
    tone: 'green',
  },
] as const;

export default function SaisonPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Saisonleistungen 2026/2027',
    itemListElement: options.map((option, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: option.title,
      url: `${siteConfig.url}${option.href}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden bg-[#071f3b] py-16 md:py-24 text-white">
        <div className="container mx-auto">
          <Breadcrumb dark items={[{ label: 'Saison 2026/2027' }]} />
          <div className="mt-8 grid lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.75fr)] gap-10 items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-blue-100">
                <CalendarCheck size={16} />
                Saisonplanung 2026/2027
              </div>
              <h1 className="mt-6 !text-4xl md:!text-6xl !tracking-normal">
                Welche Saisonleistung möchten Sie anmelden?
              </h1>
              <p className="mt-6 text-base md:text-lg leading-8 text-slate-300">
                Wählen Sie direkt zwischen Winterdienst und Gartenpflege. Danach erfassen wir nur die Angaben, die für die jeweilige Saisonleistung wirklich relevant sind.
              </p>
            </div>
            <div className="rounded-lg border border-white/12 bg-white/8 p-6 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 text-emerald-300" size={22} />
                <div>
                  <strong className="text-sm">Frühzeitig Kapazität sichern</strong>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Für wiederkehrende Saisonleistungen planen wir Routen, Termine und Objektumfang vorab.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-18 bg-slate-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {options.map((option) => {
              const Icon = option.icon;
              const isGreen = option.tone === 'green';
              return (
                <Link
                  key={option.href}
                  href={option.href}
                  className={`group block rounded-lg border bg-white p-6 md:p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${
                    isGreen ? 'border-emerald-100 hover:border-emerald-300' : 'border-blue-100 hover:border-blue-300'
                  }`}
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-lg ${isGreen ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                    <Icon size={28} />
                  </div>
                  <h2 className={`mt-6 !text-2xl !tracking-normal transition-colors ${isGreen ? 'group-hover:text-emerald-700' : 'group-hover:text-blue-700'}`}>
                    {option.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{option.description}</p>
                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    {option.details.map((detail) => (
                      <span key={detail} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                        {detail}
                      </span>
                    ))}
                  </div>
                  <span className={`mt-7 inline-flex items-center gap-2 text-sm font-bold ${isGreen ? 'text-emerald-700' : 'text-blue-700'}`}>
                    Jetzt anmelden <ArrowRight size={17} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
