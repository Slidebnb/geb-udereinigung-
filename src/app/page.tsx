import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { getSettings } from '@/lib/get-settings';
import { prisma } from '@/lib/prisma';
import TaglineReveal from '@/components/home/TaglineReveal';
import ScrollReveal from '@/components/home/ScrollReveal';
import HeroAnimator from '@/components/home/HeroAnimator';

export const metadata: Metadata = {
  title: 'Gebäudereinigung Neuwied & Koblenz für Gewerbekunden | Huwa',
  description:
    'Festpreisgarantie für Hausverwaltungen, WEGs und Facility Manager in Neuwied, Koblenz und Region. Direkter Ansprechpartner, kostenlose Objektbesichtigung. Jetzt anfragen.',
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Gebäudereinigung Neuwied & Koblenz | Huwa',
    description:
      'Festpreisgarantie für Hausverwaltungen, WEGs und Facility Manager. Kostenlose Objektbesichtigung in Neuwied, Koblenz und Region.',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Huwa Gebäudereinigung' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gebäudereinigung Neuwied & Koblenz | Huwa',
    description: 'Festpreisgarantie für Hausverwaltungen, WEGs und Facility Manager.',
    images: ['/og'],
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteConfig.url}/#localbusiness`,
  name: siteConfig.name,
  description: metadata.description as string,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  image: `${siteConfig.url}/logo.png`,
  sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.zip,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '14:00',
    },
  ],
  priceRange: '€€',
  areaServed: siteConfig.serviceAreas,
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Nehmen Sie auch Privathaushalte an?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein. Wir fokussieren uns ausschließlich auf gewerbliche Objekte: Hausverwaltungen, WEGs, Bürogebäude und Einzelhandel.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie läuft eine kostenlose Objektbesichtigung ab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wir vereinbaren einen Termin, schauen uns Ihr Objekt gemeinsam an und erstellen danach ein schriftliches Festpreisangebot. Das ist für Sie völlig kostenfrei und unverbindlich.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie wird der Preis kalkuliert?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Preis basiert auf Fläche, Reinigungsrhythmus und Leistungsumfang. Sie erhalten einen Festpreis — keine Stundensätze, keine Überraschungen auf der Rechnung.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Reinigungsrhythmen bieten Sie an?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Täglich, 2x wöchentlich, wöchentlich oder 14-täglich — je nach Ihrem Bedarf. Auch Kombilösungen sind möglich.',
      },
    },
    {
      '@type': 'Question',
      name: 'In welchen Regionen sind Sie tätig?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Schwerpunkt Neuwied, Koblenz, Bendorf und Umgebung (Rheinland-Pfalz). Für größere Objekte oder Rahmenverträge sprechen Sie uns an.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie schnell können Sie nach Vertragsabschluss starten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In der Regel innerhalb von 10 bis 14 Werktagen nach Vertragsunterzeichnung. Bei dringendem Bedarf finden wir oft auch schnellere Lösungen.',
      },
    },
  ],
};

const SERVICES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21"/>
      </svg>
    ),
    title: 'Gebäudereinigung',
    desc: 'Professionelle Reinigung für Wohn- und Gewerbeimmobilien — innen und außen.',
    href: '/leistungen/gebaeudereinigung',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>
      </svg>
    ),
    title: 'Hausmeisterdienste',
    desc: 'Vollservice für Hausverwaltungen: Wartung, Kontrolle, Kleinreparaturen.',
    href: '/leistungen/hausmeisterdienste',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
      </svg>
    ),
    title: 'Glasreinigung',
    desc: 'Fassaden, Schaufenster und Innenverglasung — streifenfrei und termingerecht.',
    href: '/leistungen/glasreinigung',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
      </svg>
    ),
    title: 'Unterhaltsreinigung',
    desc: 'Regelmäßige Reinigung auf Festpreisbasis — täglich, wöchentlich oder 14-täglich.',
    href: '/leistungen/unterhaltsreinigung',
  },
];

const TARGET_GROUPS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21"/>
      </svg>
    ),
    label: 'Hausverwaltungen',
    desc: 'WEG-Verwaltungen und Miethausverwaltungen ab 20 Einheiten.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
      </svg>
    ),
    label: 'WEG-Verwalter',
    desc: 'Gemeinschaftseigentum: Treppenhäuser, Tiefgaragen, Außenanlagen.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"/>
      </svg>
    ),
    label: 'Büro & Gewerbe',
    desc: 'Bürogebäude und Verwaltungsgebäude ab 300 m² Nutzfläche.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-3.75a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375z"/>
      </svg>
    ),
    label: 'Einzelhandel',
    desc: 'Ladenflächen, Schaufenster und Nebenflächen regelmäßig gepflegt.',
  },
];

const TRUST_ITEMS = [
  { value: 'Seit 2023', label: 'in der Region tätig' },
  { value: 'Festpreis', label: 'garantiert schriftlich' },
  { value: '24 h', label: 'Reaktionszeit' },
  { value: '1', label: 'fester Ansprechpartner' },
];

const USPS = [
  {
    num: '01',
    title: 'Festpreisgarantie',
    desc: 'Kein Stundenlohn, kein Risiko. Ihr Preis steht vor dem ersten Handgriff fest — transparent, schriftlich, bindend.',
  },
  {
    num: '02',
    title: 'Zuverlässige Termine',
    desc: 'Reinigung zum vereinbarten Zeitpunkt — ohne Absagen, ohne Nachfragen. Sie planen, wir halten ein.',
  },
  {
    num: '03',
    title: 'Fester Ansprechpartner',
    desc: 'Direkter Kontakt, schnelle Reaktion. Sie erreichen immer dieselbe Person — kein Call-Center, keine Warteschleife.',
  },
];

const STEPS = [
  { num: '01', title: 'Anfrage stellen', desc: 'Kurzer Anruf oder Online-Anfrage. Wir antworten innerhalb von 24 Stunden persönlich.' },
  { num: '02', title: 'Kostenlose Besichtigung', desc: 'Wir schauen uns Ihr Objekt an und erstellen ein transparentes Festpreisangebot — ohne versteckte Kosten.' },
  { num: '03', title: 'Vertragsstart', desc: 'Nach Vertragsunterzeichnung starten wir meist innerhalb von 2 Wochen — mit festem Reinigungsplan.' },
];

const FAQS = [
  {
    q: 'Nehmen Sie auch Privathaushalte an?',
    a: 'Nein. Wir fokussieren uns ausschließlich auf gewerbliche Objekte: Hausverwaltungen, WEGs, Bürogebäude und Einzelhandel. So können wir die Qualität liefern, die gewerbliche Kunden erwarten.',
  },
  {
    q: 'Wie läuft eine kostenlose Objektbesichtigung ab?',
    a: 'Wir vereinbaren einen Termin, schauen uns Ihr Objekt gemeinsam an und erstellen danach ein schriftliches Festpreisangebot. Das ist für Sie völlig kostenfrei und unverbindlich.',
  },
  {
    q: 'Wie wird der Preis kalkuliert?',
    a: 'Der Preis basiert auf Fläche, Reinigungsrhythmus und Leistungsumfang. Sie erhalten einen Festpreis — keine Stundensätze, keine Überraschungen auf der Rechnung.',
  },
  {
    q: 'Welche Reinigungsrhythmen bieten Sie an?',
    a: 'Täglich, 2x wöchentlich, wöchentlich oder 14-täglich — je nach Ihrem Bedarf. Auch Kombilösungen sind möglich.',
  },
  {
    q: 'In welchen Regionen sind Sie tätig?',
    a: 'Schwerpunkt Neuwied, Koblenz, Bendorf und Umgebung (Rheinland-Pfalz). Für größere Objekte oder Rahmenverträge sprechen Sie uns an.',
  },
  {
    q: 'Wie schnell können Sie nach Vertragsabschluss starten?',
    a: 'In der Regel innerhalb von 10 bis 14 Werktagen nach Vertragsunterzeichnung. Bei dringendem Bedarf finden wir oft auch schnellere Lösungen.',
  },
];

const ChevronRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
  </svg>
);

export default async function HomePage() {
  const [settings, testimonials] = await Promise.all([
    getSettings(),
    prisma.testimonial
      .findMany({ where: { published: true }, orderBy: { createdAt: 'desc' }, take: 6 })
      .catch(() => [] as { id: string; name: string; role?: string | null; company?: string | null; content: string; rating: number }[]),
  ]);
  void settings;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <HeroAnimator />

      {/* ─────────── 1. HERO ─────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050D1A]">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(75,184,245,1) 1px, transparent 1px), linear-gradient(90deg, rgba(75,184,245,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
          aria-hidden="true"
        />
        {/* CSS ambient glow — top right */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top right, rgba(75,184,245,0.08) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />
        {/* CSS ambient glow — bottom left */}
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at bottom left, rgba(45,201,78,0.05) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 container mx-auto px-4 md:px-6 pt-36 pb-28 md:pt-44">
          {/* Badge */}
          <div
            data-hero-animate
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">
              Nur für Gewerbekunden
            </span>
          </div>

          {/* H1 — Gradient B5, mit Geo */}
          <h1
            data-hero-animate
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6"
            style={{ maxWidth: '700px', textWrap: 'balance' }}
          >
            <span
              className="block"
              style={{
                background: 'linear-gradient(90deg, #FFFFFF 0%, #9B9B9B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Gebäudereinigung
            </span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(90deg, #FFFFFF 20%, #9B9B9B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              in Neuwied & Koblenz
            </span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(90deg, #4BB8F5 0%, #2DC94E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              für gewerbliche Objekte.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            data-hero-animate
            className="text-lg md:text-xl text-white/55 mb-10 leading-relaxed"
            style={{ maxWidth: '560px', textWrap: 'pretty' }}
          >
            Hausverwaltungen, WEGs und Facility Manager vertrauen auf unsere
            Festpreisgarantie — mit direktem Ansprechpartner.
          </p>

          {/* CTAs */}
          <div data-hero-animate className="flex flex-wrap gap-4">
            <Link href="/angebot" className="btn-primary text-base py-3.5 px-7 cursor-pointer">
              Objekt kostenlos anfragen
              <ChevronRight />
            </Link>
            <a href={`tel:${siteConfig.phone}`} className="btn-ghost text-base py-3.5 px-7 cursor-pointer">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              {siteConfig.phone}
            </a>
          </div>

          {/* Trust micro-badges */}
          <div data-hero-animate className="flex flex-wrap gap-x-6 gap-y-2 mt-10">
            {['Festpreisgarantie schriftlich', 'Antwort in 24 Stunden', 'Kostenlose Objektbesichtigung', 'Direkter Ansprechpartner'].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/40">
                <svg className="w-4 h-4 text-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/>
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" aria-hidden="true">
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─────────── 2. TRUST STRIP ─────────── */}
      <section className="bg-[#0D1008] border-y border-white/6 py-5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center items-center">
            {TRUST_ITEMS.map(({ value, label }, i) => (
              <div key={label} className="flex items-center">
                <div className="px-6 py-3 text-center">
                  <div className="text-white font-extrabold text-xl leading-none tracking-tight">{value}</div>
                  <div className="text-white/35 text-xs mt-0.5 leading-tight">{label}</div>
                </div>
                {i < TRUST_ITEMS.length - 1 && (
                  <div className="w-px h-10 bg-white/8 self-center" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 3. SERVICES ─────────── */}
      <section className="section-mid">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
              Unsere Leistungen
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white" style={{ maxWidth: '520px', textWrap: 'balance' }}>
              Alles aus einer Hand für gewerbliche Objekte.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(({ icon, title, desc, href }, i) => (
              <ScrollReveal key={title} delay={i * 80}>
                <Link
                  href={href}
                  className="card-dark group flex flex-col gap-4 p-6 h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a14] rounded-2xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-all duration-300">
                    {icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary text-sm font-semibold">
                    Mehr erfahren
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                    </svg>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-8 text-center" delay={320}>
            <Link href="/leistungen" className="btn-ghost inline-flex cursor-pointer">
              Alle Leistungen ansehen
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────── 4. FÜR WEN ─────────── */}
      <section className="section-dark">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold block mb-3">
              Unsere Zielgruppe
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white" style={{ maxWidth: '520px', margin: '0 auto', textWrap: 'balance' }}>
              Wir arbeiten ausschließlich für Gewerbekunden.
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto leading-relaxed">
              Kein Privathaushalt. Das erlaubt uns die Qualität und Zuverlässigkeit,
              die gewerbliche Kunden erwarten.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TARGET_GROUPS.map(({ icon, label, desc }, i) => (
              <ScrollReveal key={label} delay={i * 80}>
                <div className="card-dark p-6 h-full flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                    {icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">{label}</div>
                    <div className="text-white/40 text-sm leading-relaxed">{desc}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 5. TAGLINE REVEAL (B11 Pflicht) ─────────── */}
      <section className="section-dark py-32 md:py-44 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <TaglineReveal
            lines={[
              'Hausverwaltungen, WEGs und Facility Manager:',
              'Ihr Objekt verdient Reinigung,',
              'die wirklich funktioniert.',
            ]}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight"
          />
        </div>
      </section>

      {/* ─────────── 6. WARUM HUWA ─────────── */}
      <section className="section-mid">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal className="mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
              Unsere Versprechen
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white" style={{ maxWidth: '480px', textWrap: 'balance' }}>
              Warum Hausverwaltungen auf Huwa vertrauen.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {USPS.map(({ num, title, desc }, i) => (
              <ScrollReveal key={num} delay={i * 100}>
                <div>
                  <div
                    className="text-7xl font-black leading-none mb-6 select-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(201,168,76,0.35) 0%, rgba(201,168,76,0) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                    aria-hidden="true"
                  >
                    {num}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
                  <p className="text-white/50 leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 7. WIE ES FUNKTIONIERT ─────────── */}
      <section className="section-dark" id="wie-es-funktioniert">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal className="mb-16 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
              Einfacher Prozess
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white" style={{ maxWidth: '480px', margin: '0 auto', textWrap: 'balance' }}>
              In 3 Schritten zu Ihrem Reinigungspartner.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {STEPS.map(({ num, title, desc }, i) => (
              <ScrollReveal key={num} delay={i * 120}>
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/8 border border-primary/20 mb-6">
                    <span className="text-xl font-black text-primary">{num}</span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
                  <p className="text-white/50 leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-14 text-center" delay={360}>
            <Link href="/angebot" className="btn-primary text-base py-3.5 px-8 cursor-pointer">
              Jetzt kostenlos anfragen
              <ChevronRight />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────── 8. TESTIMONIALS (aus DB) ─────────── */}
      {testimonials.length > 0 && (
        <section className="section-mid">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollReveal className="mb-14">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold block mb-3">
                Referenzen
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Was Kunden sagen.
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((t, i) => (
                <ScrollReveal key={t.id} delay={i * 70}>
                  <article className="card-dark p-6 h-full flex flex-col gap-4">
                    <div className="flex gap-0.5" aria-label={`${t.rating} von 5 Sternen`}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} className={`w-4 h-4 ${j < t.rating ? 'text-gold' : 'text-white/15'}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-white/70 text-sm leading-relaxed flex-1">
                      &ldquo;{t.content}&rdquo;
                    </blockquote>
                    <footer>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      {(t.role || t.company) && (
                        <div className="text-white/35 text-xs">{[t.role, t.company].filter(Boolean).join(', ')}</div>
                      )}
                    </footer>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────── 9. FAQ ─────────── */}
      <section className="section-dark" id="faq">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <ScrollReveal className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
              Häufige Fragen
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white" style={{ textWrap: 'balance' }}>
              Antworten auf Ihre Fragen.
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <ScrollReveal key={q} delay={i * 55}>
                <details className="card-dark group">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none text-white font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
                    {q}
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 group-open:rotate-180 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                    </svg>
                  </summary>
                  <p className="px-5 pb-5 text-white/55 leading-relaxed text-sm border-t border-white/6 pt-4">{a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 10. FINAL CTA ─────────── */}
      <section className="section-mid" id="kontakt">
        <div className="container mx-auto px-4 md:px-6">
          <div
            className="relative rounded-3xl overflow-hidden p-8 md:p-14 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(75,184,245,0.06) 0%, transparent 50%, rgba(45,201,78,0.04) 100%)',
              border: '1px solid rgba(75,184,245,0.12)',
            }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold block mb-6">
              Jetzt starten
            </span>

            <ScrollReveal>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-white mb-6"
                style={{ maxWidth: '640px', margin: '0 auto 1.5rem', textWrap: 'balance' }}
              >
                Bereit für professionelle Gebäudereinigung?
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <p className="text-white/50 mb-10 max-w-lg mx-auto leading-relaxed">
                Vereinbaren Sie jetzt eine kostenlose Objektbesichtigung. Wir erstellen Ihnen
                ein verbindliches Festpreisangebot — ohne Verpflichtung.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/angebot" className="btn-primary text-base py-3.5 px-8 cursor-pointer">
                  Kostenlose Objektbesichtigung anfragen
                  <ChevronRight />
                </Link>
                <a href={`tel:${siteConfig.phone}`} className="btn-ghost text-base py-3.5 px-8 cursor-pointer">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                  </svg>
                  {siteConfig.phone}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
