import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { getSettings } from '@/lib/get-settings';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhyUs from '@/components/home/WhyUs';
import CTABanner from '@/components/home/CTABanner';
import type { HeroData } from '@/components/home/Hero';
import type { ServicesData } from '@/components/home/Services';
import type { WhyUsData } from '@/components/home/WhyUs';
import type { CTAData } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Gebäudereinigung Neuwied & Koblenz | Huwa Gebäudereinigung',
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.zip,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: siteConfig.geo.latitude, longitude: siteConfig.geo.longitude },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '14:00' },
  ],
  priceRange: '€€',
  areaServed: siteConfig.serviceAreas,
  sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
};

const steps = [
  {
    num: '01',
    icon: '📞',
    title: 'Kontakt aufnehmen',
    desc: 'Kurzer Anruf oder Nachricht genügt – wir antworten innerhalb von 24 Stunden persönlich.',
    color: 'bg-primary/8 border-primary/20',
    textColor: 'text-primary',
  },
  {
    num: '02',
    icon: '🔍',
    title: 'Kostenlose Besichtigung',
    desc: 'Wir schauen uns Ihr Objekt an und erstellen ein transparentes Festpreisangebot – ohne versteckte Kosten.',
    color: 'bg-green/8 border-green/20',
    textColor: 'text-green',
  },
  {
    num: '03',
    icon: '✨',
    title: 'Sauberkeit genießen',
    desc: 'Unser Team startet pünktlich und gründlich – mit Reinigungsprotokoll und festem Ansprechpartner.',
    color: 'bg-primary/8 border-primary/20',
    textColor: 'text-primary',
  },
];

const cityLinks = [
  { href: '/gebaudereinigung-neuwied',     label: 'Neuwied',     icon: '🏙️', services: 'Alle Leistungen', primary: true },
  { href: '/gebaudereinigung-koblenz',     label: 'Koblenz',     icon: '🌉', services: 'Alle Leistungen', primary: true },
  { href: '/gebaudereinigung-bendorf',     label: 'Bendorf',     icon: '🏘️', services: 'Alle Leistungen', primary: true },
  { href: '/gebaudereinigung-andernach',   label: 'Andernach',   icon: '⛩️', services: '4 Leistungen',   primary: false },
  { href: '/gebaudereinigung-mayen',       label: 'Mayen',       icon: '🏰', services: '4 Leistungen',   primary: false },
  { href: '/gebaudereinigung-lahnstein',   label: 'Lahnstein',   icon: '🔱', services: '4 Leistungen',   primary: false },
  { href: '/gebaudereinigung-boppard',     label: 'Boppard',     icon: '🍷', services: '4 Leistungen',   primary: false },
  { href: '/gebaudereinigung-bad-neuenahr-ahrweiler', label: 'Bad Neuenahr', icon: '💧', services: '4 Leistungen', primary: false },
];

const quickLinks = [
  { href: '/treppenhausreinigung-neuwied', label: 'Treppenhausreinigung Neuwied',  icon: '🏠' },
  { href: '/bueroreinigung-koblenz',       label: 'Büroreinigung Koblenz',         icon: '💼' },
  { href: '/hausmeisterservice-neuwied',   label: 'Hausmeisterservice Neuwied',    icon: '🔧' },
  { href: '/winterdienst-neuwied',         label: 'Winterdienst Neuwied',          icon: '❄️' },
  { href: '/treppenhausreinigung-koblenz', label: 'Treppenhausreinigung Koblenz',  icon: '🏠' },
  { href: '/bueroreinigung-neuwied',       label: 'Büroreinigung Neuwied',         icon: '💼' },
];

export default async function HomePage() {
  const [settings, blogPosts] = await Promise.all([
    getSettings(),
    prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' }, take: 3, select: { title: true, slug: true, category: true, createdAt: true, excerpt: true } }).catch(() => []),
  ]);

  function parseSection<T>(key: string): Partial<T> {
    const raw = settings[key];
    if (!raw) return {};
    try { return JSON.parse(raw) as Partial<T>; } catch { return {}; }
  }

  const heroData     = parseSection<HeroData>('hp_hero');
  const servicesData = parseSection<ServicesData>('hp_services');
  const whyUsData    = parseSection<WhyUsData>('hp_whyus');
  const ctaData      = parseSection<CTAData>('hp_cta');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Hero data={heroData} />

      {/* ── Wie es funktioniert ── */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="absolute top-[-80px] right-[-80px] w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #4BB8F5, transparent 70%)' }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #2DC94E, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #4BB8F5, transparent 70%)' }} />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit">So einfach geht&apos;s</div>
            <h2 className="mt-4 text-white">In 3 Schritten zu <span className="gradient-text">Ihrem sauberen Objekt</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary/40 via-green/50 to-primary/40 z-0" />
            {steps.map((s) => (
              <div key={s.num} className="relative z-10 card-glass rounded-2xl p-8 text-center group hover:scale-[1.02] hover:bg-white/12 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-3xl mb-4 bg-white/10 shadow-glow-blue group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {s.icon}
                </div>
                <div className={`text-xs font-black uppercase tracking-widest mb-2 ${s.textColor}`}>{s.num}</div>
                <h3 className="text-lg font-black text-white mb-3">{s.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/angebot" className="btn-primary inline-flex px-10 py-4 text-base">Jetzt kostenloses Angebot anfragen</Link>
          </div>
        </div>
      </section>

      <Services data={servicesData} />
      <WhyUs data={whyUsData} />

      {/* ── Regionale Präsenz ── */}
      <section className="section-padding bg-slate-50 bg-dot-grid">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mx-auto w-fit">Einzugsgebiet</div>
            <h2 className="mt-4">Wir kommen zu Ihnen –<br /><span className="gradient-text">in Ihrer Region</span></h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">Neuwied, Koblenz und Bendorf sind unsere Heimat. Wir betreuen aber die gesamte Region.</p>
          </div>

          {/* City cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {cityLinks.map((c) => (
              <Link key={c.href} href={c.href}
                className={`group flex flex-col items-center gap-2 p-5 rounded-2xl border text-center transition-all duration-200 hover:scale-[1.02] ${
                  c.primary
                    ? 'bg-white border-primary/25 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(75,184,245,0.18)]'
                    : 'bg-white border-slate-100 hover:border-primary/25 hover:shadow-md'
                }`}>
                <span className="text-3xl">{c.icon}</span>
                <div className="font-bold text-dark text-sm group-hover:text-primary transition-colors">{c.label}</div>
                <div className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  c.primary ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'
                }`}>{c.services}</div>
              </Link>
            ))}
          </div>

          {/* Quick service links */}
          <div className="border-t border-slate-100 pt-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">Beliebte Anfragen</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickLinks.map((q) => (
                <Link key={q.href} href={q.href}
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/3 transition-all group">
                  <span className="text-xl flex-shrink-0">{q.icon}</span>
                  <span className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">{q.label}</span>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-primary ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div className="bg-dark py-5 border-y border-white/5">
        <div className="container mx-auto flex flex-wrap justify-center gap-x-10 gap-y-3">
          {[
            { icon: '🛡️', text: 'Betriebshaftpflicht' },
            { icon: '📋', text: 'DGUV Ausgebildet' },
            { icon: '🏛️', text: 'Innungsmitglied Koblenz' },
            { icon: '🔒', text: 'DSGVO Konform' },
            { icon: '💰', text: 'Festpreisgarantie' },
          ].map((t) => (
            <div key={t.text} className="flex items-center gap-2 text-white/60 text-sm font-medium">
              <span className="text-base">{t.icon}</span>
              {t.text}
            </div>
          ))}
        </div>
      </div>

      {/* ── Blog ── */}
      {blogPosts.length > 0 && (
        <section className="section-padding" style={{ background: '#F8FAFC' }}>
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <div className="section-label">Ratgeber</div>
                <h2 className="mt-3">Tipps & <span className="gradient-text">Wissenswertes</span></h2>
              </div>
              <Link href="/blog" className="btn-outline hidden sm:inline-flex">Alle Artikel</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {blogPosts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 group hover:border-primary/30 transition-all duration-200">
                  <span className="inline-block bg-primary/8 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">{post.category}</span>
                  <h3 className="text-base font-bold text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  {post.excerpt && <p className="text-sm text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>}
                  <div className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link href="/blog" className="btn-outline">Alle Artikel</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Lead Magnet ── */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #EEF4FB 0%, #F0FBF4 100%)' }}>
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-10 md:p-14">
                <span className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-5">
                  Kostenloser Download
                </span>
                <h3 className="text-2xl font-black text-dark mb-3 leading-tight">
                  12-Punkte Haustechnik-Checkliste<br />
                  <span className="text-primary">für Hausverwaltungen</span>
                </h3>
                <ul className="space-y-2.5 mb-8">
                  {[
                    'Alle 12 Prüfpunkte auf einen Blick',
                    'Praxisnah & sofort einsetzbar',
                    'Für WEGs & Hausverwaltungen',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/checkliste" className="btn-primary inline-flex px-8 py-3.5">
                  Kostenlos herunterladen →
                </Link>
              </div>
              <div className="hidden md:flex items-center justify-center p-10 bg-white/40">
                {/* Mini preview of checklist */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-56 border border-slate-100">
                  <div className="px-4 py-3" style={{ background: 'linear-gradient(90deg, #0C2340 0%, #1B3E62 100%)' }}>
                    <div className="flex items-center gap-2">
                      <svg width="18" height="16" viewBox="0 0 42 38" fill="none"><path d="M21 2L6 16h6v18h18V16h6L21 2z" fill="#4BB8F5" opacity="0.9"/><path d="M21 2L30 11l8 5-7-7-10-7z" fill="#2DC94E"/></svg>
                      <span className="text-white text-xs font-black">HUWA</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    {['Gebäudehülle', 'Haustechnik', 'Gemeinschaftsb.', 'Brandschutz'].map((cat, i) => (
                      <div key={cat} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded border-2 border-slate-300 flex-shrink-0" />
                        <span className="text-[10px] text-slate-600 font-medium">{i + 1 * 3 - 2}–{i * 3 + 3} {cat}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-slate-100 text-[9px] text-slate-400 text-center">12 Prüfpunkte</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner data={ctaData} />
    </>
  );
}
