import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { caseStudies, getCaseStudy } from '@/lib/growth-content';
import { siteConfig } from '@/lib/site';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title} | Huwa Fallstudie`,
    description: study.description,
    alternates: { canonical: `${siteConfig.url}/fallstudien/${study.slug}` },
    openGraph: { title: study.title, description: study.description, url: `${siteConfig.url}/fallstudien/${study.slug}`, images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', title: study.title, description: study.description, images: ['/opengraph-image'] },
  };
}

export default async function FallstudiePage({ params }: { params: Params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const quoteHref = `/angebot?service=${encodeURIComponent(study.service)}&city=${encodeURIComponent(study.city)}&source=fallstudie`;

  return (
    <>
      <section className="bg-[#071f3b] py-16 md:py-24 text-white">
        <div className="container mx-auto">
          <Breadcrumb dark items={[{ label: 'Fallstudien', href: '/fallstudien' }, { label: study.title }]} />
          <div className="mt-8 max-w-3xl">
            <div className="text-sm font-semibold text-primary">{study.objectType} · {study.city}</div>
            <h1 className="mt-4 !text-4xl md:!text-5xl !tracking-normal">{study.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">{study.description}</p>
          </div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <div className="card p-6 md:p-8"><h2 className="!text-2xl !tracking-normal">Ausgangslage</h2><p className="mt-4 text-sm leading-7 text-slate-600">{study.challenge}</p></div>
            <div className="card p-6 md:p-8">
              <h2 className="!text-2xl !tracking-normal">Vorgehen</h2>
              <ul className="mt-5 space-y-3">{study.solution.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" /> {item}</li>)}</ul>
            </div>
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6 md:p-8"><h2 className="!text-2xl !tracking-normal">Ergebnis</h2><p className="mt-4 text-sm leading-7 text-slate-700">{study.result}</p></div>
          </div>
          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:sticky lg:top-28">
            <h2 className="!text-xl !tracking-normal">Aehnliches Objekt?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Wir pruefen Ihr Objekt persoenlich und erstellen eine passende Leistungsbeschreibung.</p>
            <Link href={quoteHref} className="btn-primary mt-6 w-full justify-center">Angebot anfragen <ArrowRight size={16} /></Link>
            <Link href="/preisrechner" className="btn-outline mt-3 w-full justify-center">Preis schaetzen</Link>
          </aside>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
