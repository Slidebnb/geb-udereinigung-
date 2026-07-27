import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardCheck, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { industrySolutions, getIndustrySolution } from '@/lib/industry-solutions';
import { siteConfig } from '@/lib/site';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return industrySolutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getIndustrySolution(slug);
  if (!solution) return {};
  return {
    title: solution.metaTitle,
    description: solution.metaDescription,
    alternates: { canonical: `${siteConfig.url}/branchenloesungen/${solution.slug}` },
    openGraph: { title: solution.metaTitle, description: solution.metaDescription, url: `${siteConfig.url}/branchenloesungen/${solution.slug}`, images: [solution.image] },
    twitter: { card: 'summary_large_image', title: solution.metaTitle, description: solution.metaDescription, images: [solution.image] },
  };
}

export default async function BranchenloesungDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const solution = getIndustrySolution(slug);
  if (!solution) notFound();

  const pageUrl = `${siteConfig.url}/branchenloesungen/${solution.slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: solution.title,
      serviceType: 'Gebäudedienstleistung',
      description: solution.metaDescription,
      url: pageUrl,
      provider: { '@type': 'LocalBusiness', name: siteConfig.legalName, url: siteConfig.url, telephone: siteConfig.phone },
      areaServed: siteConfig.serviceAreas.map((area) => ({ '@type': 'Place', name: area })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: solution.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Branchenlösungen', item: `${siteConfig.url}/branchenloesungen` },
        { '@type': 'ListItem', position: 3, name: solution.title, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />)}
      <section className="relative overflow-hidden bg-dark py-16 text-white md:py-24">
        <div className="container relative z-10 mx-auto">
          <Breadcrumb dark items={[{ label: 'Branchenlösungen', href: '/branchenloesungen' }, { label: solution.shortTitle }]} />
          <div className="mt-9 grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div className="max-w-3xl">
              <div className="section-label mb-5">Branchenspezifische Gebäudedienste</div>
              <h1 className="mb-6 text-white">{solution.title}</h1>
              <p className="text-lg leading-8 text-slate-300 md:text-xl">{solution.hero}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={solution.ctaHref} className="btn-primary">Objekt besprechen <ArrowRight size={17} /></Link>
                <Link href="/kontakt" className="btn-outline border-white/30 text-white hover:border-white hover:bg-white hover:text-dark">Kontakt aufnehmen</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={solution.image} alt="" className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="section-label mb-3">Passend geplant</p>
            <h2>Was in Ihrem Objekt zählt</h2>
            <p className="mt-5 leading-7 text-slate-600">{solution.challenge}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {solution.features.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <CheckCircle2 size={21} className="text-primary" />
                <h2 className="mt-4 !text-xl !tracking-normal">{feature.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="section-label mb-3">So läuft die Abstimmung</p>
            <h2>Von der Objektaufnahme zum klaren Leistungsplan</h2>
            <div className="mt-7 space-y-5">
              {solution.process.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{index + 1}</div>
                  <div><h3 className="!text-lg !tracking-normal">{step.title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{step.description}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-sm md:p-9">
            <div className="flex items-center gap-3"><ShieldCheck className="text-primary" /><h2 className="!text-2xl !tracking-normal">Ihr Nutzen</h2></div>
            <ul className="mt-6 space-y-4">{solution.benefits.map((benefit) => <li key={benefit} className="flex gap-3 text-sm leading-6 text-slate-700"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green" />{benefit}</li>)}</ul>
            <div className="mt-8 border-t border-slate-100 pt-6"><div className="flex items-center gap-3"><ClipboardCheck size={19} className="text-primary" /><span className="text-sm font-semibold text-dark">Leistungsumfang nachvollziehbar abstimmen</span></div><p className="mt-2 text-sm leading-6 text-slate-500">Alle Details werden vor Beginn gemeinsam festgelegt und können bei Bedarf angepasst werden.</p></div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto grid gap-12 lg:grid-cols-[1fr_.85fr]">
          <div>
            <p className="section-label mb-3">Häufige Fragen</p>
            <h2>Was Auftraggeber vorab wissen möchten</h2>
            <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
              {solution.faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer list-none pr-8 text-base font-semibold text-dark marker:hidden">{faq.question}<span className="float-right text-primary transition group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{faq.answer}</p></details>)}
            </div>
          </div>
          <aside className="rounded-3xl bg-[#0c2340] p-8 text-white md:p-10">
            <p className="section-label mb-4">Nächster Schritt</p>
            <h2 className="!text-3xl !tracking-normal text-white">Besprechen wir Ihr Objekt</h2>
            <p className="mt-4 leading-7 text-slate-300">Senden Sie uns die wichtigsten Eckdaten. Wir melden uns zur Abstimmung des passenden Leistungsumfangs.</p>
            <Link href={solution.ctaHref} className="btn-primary mt-7 w-full justify-center">Angebot anfragen <ArrowRight size={17} /></Link>
            <Link href="/leistungsuebersicht-download" className="mt-4 inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-slate-300 hover:text-white">Leistungsübersicht als PDF <ArrowRight size={15} /></Link>
          </aside>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
