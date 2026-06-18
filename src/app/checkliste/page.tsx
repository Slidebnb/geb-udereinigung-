'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Download, FileCheck2, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { publicDownloadCatalog } from '@/lib/operations-catalog';

export default function ChecklistePage() {
  const [selected, setSelected] = useState<(typeof publicDownloadCatalog)[number]>(publicDownloadCatalog[0]);
  const [submitted, setSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError('');
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch('/api/checkliste', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, documentKey: selected.key, source: 'downloadbibliothek', privacy: form.privacy === 'on', newsletter: form.newsletter === 'on' }) });
    const result = await response.json(); setLoading(false);
    if (!response.ok) { setError(result.error || 'Download konnte nicht vorbereitet werden.'); return; }
    setDownloadUrl(result.downloadUrl); setSubmitted(true); window.open(result.downloadUrl, '_blank');
  }
  return <>
    <section className="bg-[#071f3b] py-12 md:py-16 text-white"><div className="container mx-auto"><Breadcrumb dark items={[{ label: 'Checklisten' }]} /><div className="mt-6 max-w-3xl"><h1 className="!text-4xl md:!text-5xl !tracking-normal">Kostenlose Checklisten für saubere Objektabläufe</h1><p className="mt-5 text-base md:text-lg leading-8 text-slate-300">Praktische PDF-Vorlagen für Hausverwaltungen, Eigentümer und Gewerbebetriebe. Direkt einsetzbar und ohne Fachjargon.</p></div></div></section>
    <section className="py-14 md:py-20 bg-slate-50"><div className="container mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-start"><div><h2 className="!text-2xl !tracking-normal mb-6">Checkliste auswählen</h2><div className="grid gap-3">{publicDownloadCatalog.map(item => <button key={item.key} onClick={() => { setSelected(item); setSubmitted(false); }} className={`w-full text-left bg-white border rounded-lg p-5 transition-all ${selected.key === item.key ? 'border-blue-500 shadow-md ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300'}`}><div className="flex gap-4"><div className={`w-10 h-10 rounded-md grid place-items-center shrink-0 ${selected.key === item.key ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'}`}><FileCheck2 size={20} /></div><div><h3 className="!text-base !tracking-normal">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p></div></div></button>)}</div><div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-600"><span className="flex gap-2"><CheckCircle2 size={17} className="text-emerald-600" /> Kostenlos</span><span className="flex gap-2"><Download size={17} className="text-emerald-600" /> Sofort als PDF</span><span className="flex gap-2"><ShieldCheck size={17} className="text-emerald-600" /> Datenschutzkonform</span></div></div>
      <aside className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 md:p-8 lg:sticky lg:top-28">{submitted ? <div className="text-center py-4"><div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-700 grid place-items-center"><CheckCircle2 size={26} /></div><h2 className="!text-xl !tracking-normal mt-5">Ihre Checkliste ist bereit</h2><p className="mt-3 text-sm leading-6 text-slate-500">Der Download wurde geöffnet. Zusätzlich haben wir Ihnen einen sieben Tage gültigen Link per E-Mail gesendet.</p><a href={downloadUrl} target="_blank" rel="noreferrer" className="btn-primary w-full justify-center rounded-lg mt-6"><Download size={17} /> PDF herunterladen</a><Link href="/angebot" className="btn-outline w-full justify-center rounded-lg mt-3">Kostenloses Angebot anfragen</Link></div> : <><h2 className="!text-xl !tracking-normal">{selected.title}</h2><p className="mt-2 text-sm text-slate-500">Bitte geben Sie Ihre Daten für den persönlichen Download-Link ein.</p><form onSubmit={submit} className="mt-6 space-y-4"><div><label className="label">Name *</label><input name="name" required minLength={2} className="input-field" /></div><div><label className="label">Firma / WEG</label><input name="company" className="input-field" /></div><div><label className="label">E-Mail *</label><input name="email" type="email" required className="input-field" /></div><label className="flex gap-3 text-sm leading-5 text-slate-600"><input name="privacy" type="checkbox" required className="mt-1" /><span>Ich stimme der Verarbeitung gemäß <Link href="/datenschutz" className="text-blue-700 underline">Datenschutzerklärung</Link> zu.</span></label><label className="flex gap-3 text-sm leading-5 text-slate-600"><input name="newsletter" type="checkbox" className="mt-1" /><span>Ich möchte freiwillig weitere Tipps erhalten.</span></label>{error ? <p className="text-sm text-red-600">{error}</p> : null}<button disabled={loading} className="btn-primary w-full justify-center rounded-lg disabled:opacity-50">{loading ? 'Wird vorbereitet …' : 'Checkliste herunterladen'} <Download size={17} /></button></form></>}</aside>
    </div></section>
  </>;
}
