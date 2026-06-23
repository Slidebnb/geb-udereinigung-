'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowRight, Building2, CheckCircle2, Download, FileText, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { serviceModules } from '@/lib/document-generator/service-modules';
import { siteConfig } from '@/lib/site';

const targetGroups = ['Hausverwaltungen', 'Gewerbeobjekte', 'Eigentümer', 'WEGs', 'Büros und Praxen'];
const faqItems = [
  {
    q: 'Was ist in der Leistungsübersicht enthalten?',
    a: 'Die PDF zeigt die wichtigsten Leistungsbereiche von Gebäudereinigung, Hausmeisterdienst, Gartenpflege, Winterdienst, Fensterreinigung, Treppenhausreinigung, Bauendreinigung und Objektbetreuung.',
  },
  {
    q: 'Ist die Leistungsübersicht ein Angebot?',
    a: 'Nein. Die PDF dient zur Orientierung. Ein verbindliches Angebot erstellen wir erst nach Objektprüfung, Leistungsabstimmung und Terminplanung.',
  },
  {
    q: 'Für wen eignet sich der Download?',
    a: 'Besonders für Hausverwaltungen, Gewerbebetriebe, Eigentümer, WEGs und Objektverantwortliche, die Leistungen vergleichen oder intern vorbereiten möchten.',
  },
];

export default function LeistungsuebersichtDownloadPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', privacy: false, newsletter: false });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/acquisition-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Download konnte nicht vorbereitet werden.');
      setDownloadUrl(result.downloadUrl);
      setSubmitted(true);
      window.open(result.downloadUrl, '_blank');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Download konnte nicht vorbereitet werden.');
    } finally {
      setLoading(false);
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Leistungsübersicht Gebäudereinigung als PDF',
    description: 'Kostenlose Leistungsübersicht für Gebäudereinigung, Hausmeisterservice, Gartenpflege und Winterdienst.',
    url: `${siteConfig.url}/leistungsuebersicht-download`,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phone,
      areaServed: siteConfig.serviceAreas,
    },
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <Script id="schema-leistungsuebersicht-download" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden bg-[#071f3b] py-16 md:py-24 text-white">
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-50 to-transparent" />
        <div className="container mx-auto relative grid lg:grid-cols-[minmax(0,1fr)_430px] gap-10 items-center">
          <div>
            <Breadcrumb dark items={[{ label: 'Leistungsübersicht PDF' }]} />
            <h1 className="mt-8 !text-4xl md:!text-5xl !tracking-normal max-w-3xl">
              Leistungsübersicht für Gebäudereinigung, Hausmeisterservice & Winterdienst als PDF
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl">
              Laden Sie eine professionelle Übersicht der Huwa Gebäudedienste herunter. Ideal zur internen Vorbereitung, zum Vergleich von Leistungsbereichen und für die erste Objektplanung.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
              {['Kostenloses PDF', 'Mit Leistungsbereichen', 'Für Hausverwaltungen & Gewerbe'].map(item => (
                <span key={item} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2">
                  <CheckCircle2 size={16} className="text-emerald-400" /> {item}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-white text-slate-900 shadow-2xl">
            <div className="border-b border-slate-100 p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-md bg-blue-50 text-blue-700"><FileText size={22} /></div>
                <div>
                  <h2 className="!text-xl !tracking-normal">PDF direkt herunterladen</h2>
                  <p className="mt-1 text-sm text-slate-500">Download-Link sofort und zusätzlich per E-Mail.</p>
                </div>
              </div>
            </div>
            {submitted ? (
              <div className="p-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-700"><CheckCircle2 size={28} /></div>
                <h3 className="mt-5 !text-xl !tracking-normal">Ihre Leistungsübersicht ist bereit</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">Der Download wurde geöffnet. Der Link ist sieben Tage gültig und wurde zusätzlich per E-Mail versendet.</p>
                <a href={downloadUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full justify-center rounded-lg">
                  <Download size={17} /> PDF herunterladen
                </a>
                <Link href="/angebot?source=leistungsuebersicht-download" className="btn-outline mt-3 w-full justify-center rounded-lg">
                  Angebot anfragen <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} className="p-6 space-y-4">
                <div>
                  <label className="label">Name *</label>
                  <input className="input-field" required minLength={2} value={form.name} onChange={event => setForm(current => ({ ...current, name: event.target.value }))} />
                </div>
                <div>
                  <label className="label">Firma / WEG</label>
                  <input className="input-field" value={form.company} onChange={event => setForm(current => ({ ...current, company: event.target.value }))} />
                </div>
                <div>
                  <label className="label">E-Mail *</label>
                  <input className="input-field" type="email" required value={form.email} onChange={event => setForm(current => ({ ...current, email: event.target.value }))} />
                </div>
                <label className="flex gap-3 text-sm leading-5 text-slate-600">
                  <input className="mt-1" type="checkbox" required checked={form.privacy} onChange={event => setForm(current => ({ ...current, privacy: event.target.checked }))} />
                  <span>Ich stimme der Verarbeitung gemäß <Link href="/datenschutz" className="text-blue-700 underline">Datenschutzerklärung</Link> zu.</span>
                </label>
                <label className="flex gap-3 text-sm leading-5 text-slate-600">
                  <input className="mt-1" type="checkbox" checked={form.newsletter} onChange={event => setForm(current => ({ ...current, newsletter: event.target.checked }))} />
                  <span>Ich möchte freiwillig weitere Tipps und Vorlagen erhalten.</span>
                </label>
                {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
                <button disabled={loading} className="btn-primary w-full justify-center rounded-lg disabled:opacity-50">
                  {loading ? 'PDF wird vorbereitet ...' : 'Leistungsübersicht herunterladen'} <Download size={17} />
                </button>
              </form>
            )}
          </aside>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-slate-50">
        <div className="container mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-10 items-start">
          <div>
            <h2 className="!text-3xl !tracking-normal">Was Sie mit der PDF bekommen</h2>
            <p className="mt-5 text-slate-600 leading-8">
              Die Leistungsübersicht zeigt kompakt, welche Arbeiten rund um Reinigung, Objektbetreuung und Saisonleistungen möglich sind. Sie ist bewusst ohne Preise aufgebaut, weil jedes Objekt anders ist.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {targetGroups.map(group => (
                <div key={group} className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                  {group}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 md:p-7 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <Building2 size={22} className="text-blue-700" />
              <div>
                <h3 className="!text-xl !tracking-normal">Enthaltene Leistungsbereiche</h3>
                <p className="mt-1 text-sm text-slate-500">Auszug aus der öffentlichen Huwa Leistungsübersicht.</p>
              </div>
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              {serviceModules.map((module, index) => (
                <div key={module.key} className="rounded-md bg-slate-50 px-4 py-3">
                  <span className="text-xs font-bold text-blue-700">{String(index + 1).padStart(2, '0')}</span>
                  <h4 className="mt-1 font-semibold text-slate-900">{module.title}</h4>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{module.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto grid lg:grid-cols-[1fr_420px] gap-10 items-start">
          <div>
            <h2 className="!text-3xl !tracking-normal">Häufige Fragen zum Download</h2>
            <div className="mt-7 space-y-4">
              {faqItems.map(item => (
                <div key={item.q} className="rounded-lg border border-slate-200 p-5">
                  <h3 className="!text-lg !tracking-normal">{item.q}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-lg bg-[#071f3b] p-7 text-white lg:sticky lg:top-28">
            <ShieldCheck size={28} className="text-emerald-400" />
            <h2 className="mt-5 !text-2xl !tracking-normal">Danach direkt Objekt anfragen</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Wenn die Leistungsbereiche passen, können Sie anschließend ein kostenloses Angebot anfordern. Wir prüfen Objekt, Turnus und gewünschte Leistungen persönlich.
            </p>
            <Link href="/angebot?source=leistungsuebersicht-download" className="btn-primary mt-7 w-full justify-center rounded-lg">
              Angebot anfragen <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
