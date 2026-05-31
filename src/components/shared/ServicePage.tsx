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
}

export default function ServicePage({ icon, title, subtitle, description, benefits, features, faq, breadcrumb, schema }: ServicePageProps) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'Leistungen', href: '/leistungen' }, { label: breadcrumb }]} />
          <div className="mt-6 max-w-3xl">
            <div className="text-5xl mb-4">{icon}</div>
            <h1 className="text-white mb-3">{title}</h1>
            <p className="text-blue-200 text-lg leading-relaxed">{subtitle}</p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding">
        <div className="container mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="mb-4">Was beinhaltet unsere {title}?</h2>
            <div className="prose prose-gray max-w-none">
              {description.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {features.map(f => (
                <div key={f.title} className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-1">{f.title}</h4>
                  <p className="text-sm text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="mb-4">Ihre Vorteile</h3>
              <ul className="space-y-3">
                {benefits.map(b => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary rounded-xl p-6 text-white">
              <h3 className="text-white mb-3">Kostenloses Angebot</h3>
              <p className="text-blue-200 text-sm mb-4">Fordern Sie jetzt Ihr individuelles Angebot an – wir melden uns innerhalb von 24 Stunden.</p>
              <Link href="/angebot" className="btn-primary w-full justify-center">Angebot anfragen</Link>
              <a href={`tel:${siteConfig.phone}`} className="mt-3 flex items-center justify-center gap-2 text-blue-200 hover:text-accent text-sm transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                {siteConfig.phone}
              </a>
            </div>

            <div className="card p-6 border border-accent-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-accent text-xl">★★★★★</span>
                <span className="font-bold">4.9 / 5</span>
              </div>
              <p className="text-sm text-gray-600 italic">"Absolut zufrieden! Pünktlich, gründlich und zu einem fairen Preis. Klare Empfehlung!"</p>
              <p className="text-xs text-gray-400 mt-2">— Kundin aus Düsseldorf, Google</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto max-w-3xl">
            <h2 className="mb-8 text-center">Häufige Fragen zur {title}</h2>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            }) }} />
            <div className="space-y-4">
              {faq.map(f => (
                <details key={f.q} className="card p-5 group">
                  <summary className="font-semibold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                    {f.q}
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
