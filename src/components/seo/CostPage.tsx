import Link from 'next/link';
import { Calculator, CheckCircle2, HelpCircle } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CallbackForm from '@/components/lead/CallbackForm';
import { calculateConfiguredServicePrice } from '@/lib/configured-pricing';
import type { CostPage as CostPageData } from '@/lib/growth-content';
import { prisma } from '@/lib/prisma';
import { getCalculatorConfig } from '@/lib/service-calculator-config';

const euro = (value: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

export default async function CostPage({ page }: { page: CostPageData }) {
  const config = getCalculatorConfig(page.serviceKey);
  const setting = await prisma.servicePriceSetting.findUnique({ where: { serviceKey: page.serviceKey } }).catch(() => null);
  const result = setting?.active ? calculateConfiguredServicePrice(page.serviceKey, config.defaults, setting) : null;
  const quoteHref = `/angebot?service=${encodeURIComponent(config.title)}&source=kosten-seite`;
  const calculatorHref = `/preisrechner?serviceKey=${page.serviceKey}`;
  const faqs = [
    ['Warum gibt es keine festen Standardpreise?', 'Weil Objektgroesse, Nutzung, Intervall und Zugaenglichkeit den Aufwand deutlich veraendern koennen.'],
    ['Ist die Online-Schaetzung verbindlich?', 'Nein. Sie ist eine Orientierung bis zur Objektpruefung und Angebotsabstimmung.'],
    ['Wie bekomme ich einen genauen Preis?', 'Senden Sie eine Anfrage mit Objektangaben oder fordern Sie einen Rueckruf an.'],
  ];
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="bg-[#071f3b] py-14 md:py-20 text-white">
        <div className="container mx-auto">
          <Breadcrumb dark items={[{ label: 'Kosten' }, { label: page.title }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <h1 className="!text-4xl md:!text-5xl !tracking-normal">{page.title}</h1>
              <p className="mt-5 max-w-2xl text-base md:text-lg leading-8 text-slate-300">{page.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={calculatorHref} className="btn-primary">Preis online schaetzen</Link>
                <Link href={quoteHref} className="btn-white">Angebot anfragen</Link>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/8 p-6">
              <div className="rounded-xl bg-white p-6 text-slate-900">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-500"><Calculator size={17} /> Oeffentliche Orientierung</div>
                {result ? (
                  <>
                    <div className="text-3xl font-bold text-primary">{euro(result.publicMin)} - {euro(result.publicMax)}</div>
                    <div className="mt-1 text-sm text-slate-500">netto pro {result.period}, unverbindlich bis Objektpruefung</div>
                  </>
                ) : (
                  <p className="text-sm leading-6 text-slate-600">Die konkrete Spanne wird nach Leistung, Umfang und Objekt geprueft.</p>
                )}
                <p className="mt-4 text-xs leading-5 text-slate-500">Kunden sehen nur Pauschalspannen. Interne Kalkulationswerte bleiben verborgen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
          <div className="space-y-8">
            <div>
              <h2 className="mb-5 !text-2xl !tracking-normal">Was beeinflusst die Kosten?</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {page.factors.map((factor) => <div key={factor} className="card p-5"><CheckCircle2 className="mb-3 h-6 w-6 text-primary" /><p className="text-sm font-semibold text-slate-800">{factor}</p></div>)}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
              <h2 className="!text-2xl !tracking-normal">Realistisch statt Blindpreis</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{page.example}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">Eine genaue Pauschale entsteht erst, wenn Flaechen, Zugaenge, Intervall und besondere Anforderungen bekannt sind. Deshalb ist die Online-Schaetzung ein guter Start, aber kein verbindliches Angebot.</p>
            </div>
            <div>
              <h2 className="mb-5 !text-2xl !tracking-normal">Haeufige Fragen</h2>
              <div className="space-y-3">
                {faqs.map(([question, answer]) => (
                  <details key={question} className="card p-5">
                    <summary className="flex cursor-pointer list-none gap-3 font-semibold text-slate-800"><HelpCircle size={18} className="shrink-0 text-primary" /> {question}</summary>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
          <CallbackForm source={`kosten-${page.slug}`} compact defaultService={config.title} />
        </div>
      </section>
    </>
  );
}
