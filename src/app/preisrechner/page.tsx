'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
const formatEuro = (value: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);

const publicServices = [
  ['buero','Büroreinigung','m²'], ['unterhalt','Unterhaltsreinigung','m²'], ['treppenhaus','Treppenhausreinigung','m²'], ['glas','Glasreinigung','m²'], ['grund','Grundreinigung','m²'], ['bau','Baureinigung','m²'], ['hausmeister','Hausmeisterservice','Std.'], ['winter','Winterdienst','m²'], ['garten','Gartenpflege','Std.'],
] as const;
type ServiceKey = (typeof publicServices)[number][0];

const frequencies = [{ value: 1, label: 'Einmal pro Monat' }, { value: 2, label: 'Alle zwei Wochen' }, { value: 4.33, label: 'Einmal pro Woche' }, { value: 8.66, label: 'Zweimal pro Woche' }, { value: 21.65, label: 'Montag bis Freitag' }];

export default function PreisrechnerPage() {
  const [serviceKey, setServiceKey] = useState<ServiceKey>('unterhalt');
  const [quantity, setQuantity] = useState(500);
  const [visits, setVisits] = useState(4.33);
  const service = publicServices.find(item => item[0] === serviceKey) || publicServices[0];
  const [estimate, setEstimate] = useState({ min: 0, max: 0, loading: true });
  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch('/api/public-price', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ serviceKey, quantity, visitsPerMonth: visits }), signal: controller.signal });
        if (!response.ok) throw new Error();
        const result = await response.json();
        setEstimate({ min: result.min, max: result.max, loading: false });
      } catch { if (!controller.signal.aborted) setEstimate(current => ({ ...current, loading: false })); }
    }, 180);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [serviceKey, quantity, visits]);
  const quoteHref = `/angebot?service=${encodeURIComponent(service[1])}&source=preisrechner&estimatedMin=${estimate.min}&estimatedMax=${estimate.max}`;
  return <>
    <section className="bg-[#071f3b] py-12 md:py-16 text-white"><div className="container mx-auto"><Breadcrumb dark items={[{ label: 'Preisrechner' }]} /><div className="mt-6 max-w-3xl"><h1 className="!text-4xl md:!text-5xl !tracking-normal">Reinigungskosten realistisch einschätzen</h1><p className="mt-5 text-base md:text-lg leading-8 text-slate-300">Erhalten Sie einen unverbindlichen Pauschalkorridor. Der verbindliche Preis entsteht nach Prüfung von Objekt, Leistung und Intervall.</p></div></div></section>
    <section className="py-14 md:py-20 bg-slate-50"><div className="container mx-auto grid lg:grid-cols-[1.15fr_.85fr] gap-8 items-start"><div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm"><h2 className="!text-2xl !tracking-normal mb-7">Angaben zum Auftrag</h2><div className="space-y-6"><div><label className="label">Dienstleistung</label><select className="input-field" value={serviceKey} onChange={event => setServiceKey(event.target.value as ServiceKey)}>{publicServices.map(item => <option value={item[0]} key={item[0]}>{item[1]}</option>)}</select></div><div><label className="label">{service[2] === 'Std.' ? 'Geplanter Aufwand je Einsatz in Stunden' : `Fläche je Einsatz in ${service[2]}`}</label><input className="input-field" type="number" min="1" value={quantity} onChange={event => setQuantity(Math.max(1, Number(event.target.value)))} /></div><div><label className="label">Gewünschtes Intervall</label><select className="input-field" value={visits} onChange={event => setVisits(Number(event.target.value))}>{frequencies.map(item => <option value={item.value} key={item.value}>{item.label}</option>)}</select></div></div><div className="mt-8 pt-6 border-t border-slate-100 grid sm:grid-cols-3 gap-4 text-sm text-slate-600"><span className="flex gap-2"><CheckCircle2 size={17} className="text-emerald-600" /> Unverbindlich</span><span className="flex gap-2"><ShieldCheck size={17} className="text-emerald-600" /> Keine versteckten Kosten</span><span className="flex gap-2"><Building2 size={17} className="text-emerald-600" /> Objektbezogen</span></div></div>
      <aside className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden lg:sticky lg:top-28"><div className="p-6 md:p-8"><div className="text-sm font-semibold text-slate-500">Geschätzte Monatspauschale netto</div><div className="mt-3 text-3xl md:text-4xl font-bold text-[#1768e5] leading-tight">{estimate.loading || !estimate.max ? 'Wird berechnet …' : `${formatEuro(estimate.min)} – ${formatEuro(estimate.max)}`}</div><p className="mt-5 text-sm leading-6 text-slate-500">Die Spanne berücksichtigt übliche Leistungswerte, Rüstzeit, Anfahrt, Material und einen wirtschaftlich tragfähigen Sicherheitspuffer.</p><Link href={quoteHref} aria-disabled={!estimate.max} className={`btn-primary mt-7 w-full justify-center rounded-lg ${!estimate.max ? 'pointer-events-none opacity-50' : ''}`}>Verbindliches Angebot anfragen <ArrowRight size={17} /></Link></div><div className="px-6 md:px-8 py-5 bg-slate-50 border-t border-slate-200 text-xs leading-5 text-slate-500">Die Berechnung ist keine Preiszusage. Zugänglichkeit, Verschmutzung, Leistungsumfang und besondere Anforderungen können den Pauschalpreis verändern.</div></aside>
    </div></section>
  </>;
}
