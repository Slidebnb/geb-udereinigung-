import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { industrySolutions } from '@/lib/industry-solutions';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Branchenlösungen für professionelle Gebäudedienste | Huwa',
  description: 'Reinigung und Objektbetreuung für Arztpraxen, Büros, Hotels, Kanzleien, Kitas, Hallen, Pflegeeinrichtungen und weitere Gewerbeobjekte in der Region.',
  alternates: { canonical: `${siteConfig.url}/branchenloesungen` },
  openGraph: {
    title: 'Branchenlösungen für professionelle Gebäudedienste | Huwa',
    description: 'Branchenspezifische Reinigung und Objektbetreuung für Gewerbeobjekte.',
    url: `${siteConfig.url}/branchenloesungen`,
    images: ['/opengraph-image'],
  },
  twitter: { card: 'summary_large_image', images: ['/opengraph-image'] },
};

export default function BranchenloesungenPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-dark py-20 text-white md:py-28">
        <div className="container relative z-10 mx-auto">
          <Breadcrumb dark items={[{ label: 'Branchenlösungen' }]} />
          <div className="mt-10 max-w-4xl">
            <div className="section-label mb-5">Branchenspezifische Leistungen</div>
            <h1 className="mb-6 text-white">Gebäudedienste, die zu Ihrem Betrieb passen</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Jede Branche hat andere Abläufe, sensible Bereiche und Anforderungen an Planung und Dokumentation. Huwa entwickelt den Leistungsumfang passend zu Ihrem Objekt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/angebot?source=branchenloesungen" className="btn-primary">Objekt besprechen <ArrowRight size={17} /></Link>
              <Link href="/preisrechner?source=branchenloesungen" className="btn-outline border-white/30 text-white hover:border-white hover:bg-white hover:text-dark">Preis schätzen</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container mx-auto">
          <div className="mb-10 max-w-2xl">
            <p className="section-label mb-3">Unsere Einsatzbereiche</p>
            <h2>Reinigung und Betreuung für unterschiedliche Objektarten</h2>
            <p className="mt-4 leading-7 text-slate-600">Wählen Sie den Bereich, der Ihrem Objekt am nächsten kommt. Die Detailseiten zeigen typische Leistungsbausteine und den Weg zu einer individuellen Anfrage.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {industrySolutions.map((solution) => (
              <article key={solution.slug} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <div className="relative h-44 overflow-hidden bg-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={solution.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-sm font-semibold text-white">{solution.shortTitle}</span>
                </div>
                <div className="flex min-h-[245px] flex-col p-6">
                  <h2 className="!text-2xl !tracking-normal">{solution.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{solution.hero}</p>
                  <ul className="mt-5 space-y-2">
                    {solution.features.slice(0, 2).map((feature) => <li key={feature.title} className="flex gap-2 text-sm text-slate-600"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />{feature.title}</li>)}
                  </ul>
                  <Link href={`/branchenloesungen/${solution.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Branchenlösung ansehen <ArrowRight size={16} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto grid gap-8 rounded-3xl bg-[#0c2340] p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <h2 className="!text-3xl !tracking-normal text-white">Ihr Objekt ist individuell?</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">Dann klären wir Flächen, Nutzungszeiten, Zugänge und gewünschte Intervalle direkt mit Ihnen. Sie erhalten einen nachvollziehbaren Leistungsumfang statt einer pauschalen Standardliste.</p>
          </div>
          <Link href="/angebot?source=branchenloesungen" className="btn-primary justify-center whitespace-nowrap">Angebot anfragen <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}
