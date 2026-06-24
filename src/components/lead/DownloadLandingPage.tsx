'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle2, Download, FileText, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import type { DownloadLandingPage } from '@/lib/growth-content';

export default function DownloadLandingPage({ page }: { page: DownloadLandingPage }) {
  const [submitted, setSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch('/api/checkliste', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        documentKey: page.documentKey,
        source: page.slug,
        privacy: form.privacy === 'on',
        newsletter: form.newsletter === 'on',
      }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError(result.error || 'Download konnte nicht vorbereitet werden.');
      return;
    }
    setDownloadUrl(result.downloadUrl);
    setSubmitted(true);
    window.open(result.downloadUrl, '_blank');
  }

  return (
    <>
      <section className="bg-[#071f3b] py-14 md:py-20 text-white">
        <div className="container mx-auto">
          <Breadcrumb dark items={[{ label: 'Downloads', href: '/checkliste' }, { label: page.title }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <h1 className="!text-4xl md:!text-5xl !tracking-normal">{page.title}</h1>
              <p className="mt-5 max-w-2xl text-base md:text-lg leading-8 text-slate-300">{page.description}</p>
              <div className="mt-7 flex flex-wrap gap-4 text-sm text-slate-200">
                <span className="flex gap-2"><CheckCircle2 size={17} className="text-emerald-400" /> Kostenlos als PDF</span>
                <span className="flex gap-2"><ShieldCheck size={17} className="text-emerald-400" /> Ohne interne Preise</span>
                <span className="flex gap-2"><FileText size={17} className="text-emerald-400" /> Fuer {page.audience}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/8 p-6 shadow-2xl">
              <div className="rounded-xl bg-white p-6 text-slate-900">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary"><FileText size={22} /></div>
                  <div>
                    <strong>PDF-Vorschau</strong>
                    <p className="text-xs text-slate-500">Inhalte der Vorlage</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {page.preview.map((item) => <li key={item} className="flex gap-2 text-sm text-slate-600"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" /> {item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container mx-auto grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
              {page.benefits.map((benefit) => <div key={benefit} className="card p-5"><CheckCircle2 className="mb-3 h-6 w-6 text-primary" /><p className="text-sm font-semibold text-slate-800">{benefit}</p></div>)}
            </div>
            <div className="card p-6 md:p-8">
              <h2 className="!text-2xl !tracking-normal">Was Sie mit der Vorlage vorbereiten</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Die PDF hilft, Objektinformationen, Leistungsumfang und naechste Schritte strukturiert zu erfassen. Dadurch lassen sich Angebote besser vergleichen und eine spaetere Objektaufnahme gezielter vorbereiten.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/angebot?source=download-template" className="btn-primary">Angebot anfragen</Link>
                <Link href="/preisrechner" className="btn-outline">Preis schaetzen</Link>
              </div>
            </div>
            <div>
              <h2 className="mb-5 !text-2xl !tracking-normal">Haeufige Fragen</h2>
              <div className="space-y-3">
                {page.faq.map((item) => (
                  <details key={item.question} className="card p-5">
                    <summary className="cursor-pointer list-none font-semibold text-slate-800">{item.question}</summary>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
            {submitted ? (
              <div className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-700"><CheckCircle2 size={26} /></div>
                <h2 className="mt-5 !text-xl !tracking-normal">Ihr Download ist bereit</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">Der Link wurde geoeffnet und zusaetzlich per E-Mail gesendet.</p>
                <a href={downloadUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full justify-center rounded-lg"><Download size={17} /> PDF herunterladen</a>
              </div>
            ) : (
              <>
                <h2 className="!text-xl !tracking-normal">PDF kostenlos herunterladen</h2>
                <p className="mt-2 text-sm text-slate-500">Name, Firma und E-Mail genuegen. Newsletter bleibt freiwillig.</p>
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div><label className="label">Name *</label><input name="name" required minLength={2} className="input-field" /></div>
                  <div><label className="label">Firma / WEG</label><input name="company" className="input-field" /></div>
                  <div><label className="label">E-Mail *</label><input name="email" type="email" required className="input-field" /></div>
                  <label className="flex gap-3 text-sm leading-5 text-slate-600"><input name="privacy" type="checkbox" required className="mt-1" /><span>Ich stimme der Verarbeitung gemaess <Link href="/datenschutz" className="text-primary underline">Datenschutzerklaerung</Link> zu.</span></label>
                  <label className="flex gap-3 text-sm leading-5 text-slate-600"><input name="newsletter" type="checkbox" className="mt-1" /><span>Ich moechte freiwillig weitere Tipps erhalten.</span></label>
                  {error ? <p className="text-sm text-red-600">{error}</p> : null}
                  <button disabled={loading} className="btn-primary w-full justify-center rounded-lg disabled:opacity-50">{loading ? 'Wird vorbereitet...' : 'PDF herunterladen'} <Download size={17} /></button>
                </form>
              </>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
