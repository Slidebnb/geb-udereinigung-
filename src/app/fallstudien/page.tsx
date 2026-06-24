import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2 } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { caseStudies } from '@/lib/growth-content';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Fallstudien Gebaeudereinigung & Objektbetreuung | Huwa',
  description: 'Anonyme Projektbeispiele von Huwa: Treppenhausreinigung, Bueroreinigung und Winterdienst fuer Wohnanlagen und Gewerbe.',
  alternates: { canonical: `${siteConfig.url}/fallstudien` },
  openGraph: { title: 'Fallstudien | Huwa Gebaeudedienste', description: 'Anonyme Projektbeispiele fuer Reinigung, Objektbetreuung und Winterdienst.', url: `${siteConfig.url}/fallstudien`, images: ['/opengraph-image'] },
};

export default function FallstudienPage() {
  return (
    <>
      <section className="bg-dark py-16 md:py-20 text-white">
        <div className="container mx-auto">
          <Breadcrumb dark items={[{ label: 'Fallstudien' }]} />
          <h1 className="mt-8">Fallstudien und Projektbeispiele</h1>
          <p className="mt-4 max-w-2xl text-slate-300">Anonyme Beispiele aus typischen Objektanfragen. Ohne Kundennamen, ohne erfundene Logos, dafuer mit nachvollziehbarem Ablauf.</p>
        </div>
      </section>
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto grid gap-5 md:grid-cols-3">
          {caseStudies.map((study) => (
            <Link key={study.slug} href={`/fallstudien/${study.slug}`} className="card p-6 transition-all hover:border-primary/30 hover:shadow-md">
              <Building2 className="mb-4 h-7 w-7 text-primary" />
              <div className="text-xs font-semibold uppercase text-primary">{study.service} · {study.city}</div>
              <h2 className="mt-3 !text-xl !tracking-normal">{study.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">{study.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Fallstudie lesen <ArrowRight size={15} /></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
