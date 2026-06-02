import Link from 'next/link';
import Breadcrumb from './Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

interface ServicePageProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  features: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  breadcrumb: string;
  schema: object;
  cityLinks?: { href: string; label: string }[];
}

export default function ServicePage({ icon, title, subtitle, description, benefits, features, faq, breadcrumb, schema, cityLinks }: ServicePageProps) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Leistungen', href: '/leistungen' }, { label: breadcrumb }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="text-6xl mb-5">{icon}</div>
            <h1 className="text-white mb-4 leading-tight">{title}</h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">{subtitle}</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/angebot" className="btn-primary px-8 py-3.5">Kostenloses Angebot</Link>
              <a href={`tel:${siteConfig.phone}`} className="btn-white px-8 py-3.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="mb-6">Was beinhaltet unsere {title}?</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              {description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {features.map(f => (
                <div key={f.title} className="card p-5 hover:border-primary/30 transition-all duration-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-brand flex-shrink-0" />
                    <h4 className="font-bold text-dark text-sm">{f.title}</h4>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Benefits */}
            <div className="card p-6">
              <h3 className="mb-5 text-lg">Ihre Vorteile</h3>
              <ul className="space-y-3">
                {benefits.map(b => (
                  <li key={b} className="flex items-start gap-3 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA box */}
            <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
              <h3 className="text-white mb-2 text-lg">Kostenloses Angebot</h3>
              <p className="text-slate-300/80 text-sm mb-5">Individuelle Kalkulation – transparent, fair, ohne versteckte Kosten.</p>
              <Link href="/angebot" className="btn-primary w-full justify-center py-3">Angebot anfragen</Link>
              <a href={`tel:${siteConfig.phone}`} className="mt-3 flex items-center justify-center gap-2 text-blue-300/60 hover:text-white text-sm transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="mt-2 flex items-center justify-center gap-2 text-blue-300/60 hover:text-white text-sm transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {siteConfig.email}
              </a>
            </div>

            {/* Trust */}
            <div className="card p-6">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Zertifiziert & versichert</div>
              <div className="space-y-2">
                {['DGUV Ausgebildetes Personal', 'Betriebshaftpflicht', 'DSGVO Konform', 'Festpreisgarantie'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="section-padding" style={{ background: '#F8FAFC' }}>
          <div className="container mx-auto max-w-3xl">
            <h2 className="mb-10 text-center">Häufige Fragen zur {title}</h2>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            }) }} />
            <div className="space-y-3">
              {faq.map(f => (
                <details key={f.q} className="card p-5 group cursor-pointer">
                  <summary className="font-semibold text-dark cursor-pointer list-none flex justify-between items-center gap-4">
                    <span>{f.q}</span>
                    <svg className="w-5 h-5 text-primary/50 group-open:rotate-180 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                  </summary>
                  <p className="mt-4 text-gray-600 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {cityLinks && cityLinks.length > 0 && (
        <section className="section-padding bg-white border-t border-slate-100">
          <div className="container mx-auto">
            <h3 className="text-lg font-bold text-dark mb-5">Regionale Verfügbarkeit</h3>
            <div className="flex flex-wrap gap-3">
              {cityLinks.map(link => (
                <a key={link.href} href={link.href} className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/15 text-primary text-sm font-semibold rounded-full hover:bg-primary/10 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
