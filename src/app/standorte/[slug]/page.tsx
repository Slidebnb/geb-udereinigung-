import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CallbackForm from '@/components/lead/CallbackForm';
import { getLocationHub, locationHubs } from '@/lib/growth-content';
import { siteConfig } from '@/lib/site';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return locationHubs.map((hub) => ({ slug: hub.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const hub = getLocationHub(slug);
  if (!hub) return {};
  return {
    title: `${hub.title} | Huwa Gebaeudedienste`,
    description: hub.description,
    alternates: { canonical: `${siteConfig.url}${hub.path}` },
    openGraph: { title: hub.title, description: hub.description, url: `${siteConfig.url}${hub.path}`, images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', title: hub.title, description: hub.description, images: ['/opengraph-image'] },
  };
}

export default async function StandortPage({ params }: { params: Params }) {
  const { slug } = await params;
  const hub = getLocationHub(slug);
  if (!hub) notFound();
  const quoteHref = `/angebot?city=${encodeURIComponent(hub.name)}&source=standort-hub`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    url: `${siteConfig.url}${hub.path}`,
    areaServed: hub.name,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.zip,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-[#071f3b] py-16 md:py-24 text-white">
        <div className="container mx-auto">
          <Breadcrumb dark items={[{ label: 'Standorte' }, { label: hub.name }]} />
          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-2 text-primary"><MapPin size={18} /> Einsatzgebiet</div>
            <h1 className="mt-4 !text-4xl md:!text-5xl !tracking-normal">Gebaeudereinigung und Objektbetreuung in {hub.name}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">{hub.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={quoteHref} className="btn-primary">Kostenloses Angebot</Link>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="btn-white"><Phone size={16} /> {siteConfig.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <h2 className="mb-5 !text-2xl !tracking-normal">Leistungen in {hub.name}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {hub.services.map((service) => (
                <Link key={service.href} href={service.href} className="card p-5 transition-all hover:border-primary/30 hover:shadow-md">
                  <h3 className="!text-lg !tracking-normal">{service.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">Regionale Seite mit Leistungsumfang, FAQ und direktem Angebotslink fuer {hub.name}.</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Mehr erfahren <ArrowRight size={15} /></span>
                </Link>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
              <h2 className="!text-2xl !tracking-normal">Warum lokal abstimmen?</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">Objektart, Tourenplanung, Saisonbedarf und Zugangszeiten unterscheiden sich je Standort. Deshalb klaeren wir vor einem Angebot, welche Leistungen fuer Ihr Objekt in {hub.name} sinnvoll sind.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/leistungsuebersicht-download" className="btn-outline">Leistungsuebersicht PDF</Link>
                <Link href="/fallstudien" className="btn-outline">Fallstudien ansehen</Link>
              </div>
            </div>
          </div>
          <CallbackForm source={`standort-${hub.slug}`} compact />
        </div>
      </section>
    </>
  );
}
