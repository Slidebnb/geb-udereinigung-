import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { getSettings } from '@/lib/get-settings';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhyUs from '@/components/home/WhyUs';
import Testimonials from '@/components/home/Testimonials';
import CTABanner from '@/components/home/CTABanner';
import type { HeroData } from '@/components/home/Hero';
import type { ServicesData } from '@/components/home/Services';
import type { WhyUsData } from '@/components/home/WhyUs';
import type { CTAData } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Gebäudereinigung Neuwied & Koblenz | Huwa Gebäudedienste',
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
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '100', bestRating: '5' },
  priceRange: '€€',
  areaServed: siteConfig.serviceAreas,
  sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
};

export default async function HomePage() {
  const settings = await getSettings();

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
      <Services data={servicesData} />
      <WhyUs data={whyUsData} />
      <Testimonials />

      {/* Beliebte Leistungen in Ihrer Nähe */}
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit">Ihr Einzugsgebiet</div>
            <h2 className="mt-4">Beliebte Leistungen <span className="gradient-text">in Ihrer Nähe</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              { href: '/gebaudereinigung-neuwied',       label: 'Gebäudereinigung Neuwied',       sub: 'Wohnanlagen & Gewerbe' },
              { href: '/gebaudereinigung-koblenz',       label: 'Gebäudereinigung Koblenz',       sub: 'Büros & Hausverwaltungen' },
              { href: '/treppenhausreinigung-neuwied',   label: 'Treppenhausreinigung Neuwied',   sub: 'Für WEGs & Vermieter' },
              { href: '/treppenhausreinigung-koblenz',   label: 'Treppenhausreinigung Koblenz',   sub: 'Regelmäßig & zuverlässig' },
              { href: '/bueroeinigung-koblenz',          label: 'Büroreinigung Koblenz',          sub: 'Praxen, Kanzleien & Büros' },
              { href: '/bueroeinigung-neuwied',          label: 'Büroreinigung Neuwied',          sub: 'Täglich oder wöchentlich' },
              { href: '/hausmeisterservice-neuwied',     label: 'Hausmeisterservice Neuwied',     sub: 'Rundum-Betreuung' },
              { href: '/winterdienst-neuwied',           label: 'Winterdienst Neuwied',           sub: 'Räum- & Streudienst' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="card p-5 hover:border-primary/30 hover:shadow-md transition-all group">
                <div className="font-bold text-dark text-sm group-hover:text-primary transition-colors mb-1">{item.label}</div>
                <div className="text-xs text-gray-500">{item.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="section-padding bg-white">
        <div className="container mx-auto text-center">
          <div className="section-label mx-auto w-fit">Einzugsgebiet</div>
          <h2 className="mt-4 mb-3">Wir kommen zu Ihnen –<br /><span className="gradient-text">regional & zuverlässig</span></h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-10 text-lg">
            Im gesamten Raum Neuwied, Koblenz und Bendorf sowie umliegenden Gemeinden.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {siteConfig.serviceAreas.map(city => (
              <span key={city} className="flex items-center gap-1.5 bg-primary/5 border border-primary/15 text-primary font-semibold px-4 py-2 rounded-full text-sm">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                {city}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-sm mb-6">Nicht dabei? Wir kommen auch zu Ihnen!</p>
          <Link href="/kontakt" className="btn-primary inline-flex">Anfrage stellen</Link>
        </div>
      </section>

      {/* Blog preview */}
      <section className="section-padding" style={{ background: '#F8FAFC' }}>
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="section-label">Ratgeber</div>
              <h2 className="mt-3">Tipps &{' '}<span className="gradient-text">Wissenswertes</span></h2>
            </div>
            <Link href="/blog" className="btn-outline hidden sm:inline-flex">Alle Artikel</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'Büroreinigung: Warum Sauberkeit am Arbeitsplatz entscheidend ist', slug: 'professionelle-bueroeinigung-sauberkeit-am-arbeitsplatz', cat: 'Büroreinigung', date: '2024-11-10' },
              { title: 'Winterdienst: Was Eigentümer und Vermieter wissen müssen', slug: 'winterdienst-2024-2025-pflichten-eigentuemer-vermieter', cat: 'Winterdienst', date: '2024-10-20' },
              { title: 'Grundreinigung vs. Unterhaltsreinigung: Was ist der Unterschied?', slug: 'grundreinigung-vs-unterhaltsreinigung-unterschiede', cat: 'Reinigungswissen', date: '2024-09-15' },
            ].map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 group hover:border-primary/30 transition-all duration-200">
                <span className="inline-block bg-primary/8 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">{post.cat}</span>
                <h3 className="text-base font-bold text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                <div className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/blog" className="btn-outline">Alle Artikel</Link>
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

      <CTABanner data={ctaData} />
    </>
  );
}
