'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Plus, Save } from 'lucide-react';
import { AdminPageHeader, AdminPanel, AdminStatus, EmptyState } from '@/components/admin/AdminUi';
import { useOperations } from '@/components/admin/useOperations';
import { formatEuro, type PricingResult } from '@/lib/pricing-engine';
import { getCalculatorConfig, serviceCalculatorConfigs, type CalculatorAnswers, type CalculatorField } from '@/lib/service-calculator-config';
import type { ServiceKey } from '@/lib/operations-catalog';

export default function KalkulationPage() {
  const { data, loading, create } = useOperations();
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');
  const [serviceKey, setServiceKey] = useState<ServiceKey>('unterhalt');
  const config = useMemo(() => getCalculatorConfig(serviceKey), [serviceKey]);
  const [answers, setAnswers] = useState<CalculatorAnswers>(config.defaults);
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [objectId, setObjectId] = useState('');
  const [costs, setCosts] = useState({ travelCostPerVisit: 0, equipmentFlatPerMonth: 0, riskPercent: 0 });
  const [result, setResult] = useState<PricingResult | null>(null);
  const [previewError, setPreviewError] = useState('');
  const [previewing, setPreviewing] = useState(true);

  useEffect(() => { setAnswers(config.defaults); setStep(0); setTitle(`${config.title} – neue Kalkulation`); }, [config]);
  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setPreviewing(true);
      try {
        const response = await fetch('/api/admin/operations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'previewCalculation', serviceKey, answers, ...costs }), signal: controller.signal });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || 'Vorschau fehlgeschlagen.');
        setResult(payload); setPreviewError('');
      } catch (error) { if (!controller.signal.aborted) { setResult(null); setPreviewError(error instanceof Error ? error.message : 'Vorschau fehlgeschlagen.'); } }
      finally { if (!controller.signal.aborted) setPreviewing(false); }
    }, 220);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [serviceKey, answers, costs]);

  async function saveCalculation() {
    try {
      await create({ action: 'calculation', title, customerId, objectId, serviceKey, answers, ...costs });
      setMessage('Kalkulation wurde mit Eingaben, Kostenbasis und Ergebnis unveränderlich gespeichert.');
      setShowForm(false);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Speichern fehlgeschlagen.'); }
  }

  return <>
    <AdminPageHeader title="Kalkulation" description="Jede Leistung hat eigene Mengen- und Aufwandsfaktoren. Preise entstehen ausschließlich aus den hinterlegten Kosten- und Leistungswerten." action={<button className="admin-button" onClick={() => setShowForm(true)}><Plus size={16} /> Neue Kalkulation</button>} />
    {showForm ? <div className="admin-grid"><div className="admin-stack">
      <AdminPanel title="Kalkulationskopf" description="Kunde und Objekt können sofort oder später zugeordnet werden."><div className="admin-form"><div className="admin-form-grid"><div className="admin-field"><label>Titel *</label><input value={title} onChange={event => setTitle(event.target.value)} /></div><div className="admin-field"><label>Dienstleistung</label><select value={serviceKey} onChange={event => setServiceKey(event.target.value as ServiceKey)}>{serviceCalculatorConfigs.map(service => <option value={service.key} key={service.key}>{service.title}</option>)}</select></div><div className="admin-field"><label>Kunde</label><select value={customerId} onChange={event => setCustomerId(event.target.value)}><option value="">Noch nicht zugeordnet</option>{data.customers.map(customer => <option value={customer.id} key={customer.id}>{customer.company || customer.name}</option>)}</select></div><div className="admin-field"><label>Objekt</label><select value={objectId} onChange={event => setObjectId(event.target.value)}><option value="">Noch nicht zugeordnet</option>{data.objects.filter(object => !customerId || object.customerId === customerId).map(object => <option value={object.id} key={object.id}>{object.name} · {object.city}</option>)}</select></div></div></div></AdminPanel>
      <AdminPanel title={`Leistungsaufnahme: ${config.title}`} description="Die Eingaben wechseln vollständig mit der gewählten Dienstleistung."><div className="admin-tabs mb-6">{config.groups.map((label, index) => <button type="button" className={step === index ? 'active' : ''} key={label} onClick={() => setStep(index)}>{index + 1}. {label}</button>)}</div><div className="admin-form"><div className="admin-form-grid">{config.fields.filter(field => field.group === step).map(field => <AdminCalculatorField key={field.key} field={field} value={answers[field.key]} onChange={value => setAnswers(current => ({ ...current, [field.key]: value }))} />)}</div><div className="flex justify-between gap-3"><button type="button" className="admin-button admin-button-secondary" disabled={step === 0} onClick={() => setStep(value => Math.max(0, value - 1))}><ChevronLeft size={15} /> Zurück</button>{step < 2 ? <button type="button" className="admin-button" onClick={() => setStep(value => Math.min(2, value + 1))}>Weiter <ChevronRight size={15} /></button> : null}</div></div></AdminPanel>
      <AdminPanel title="Objektbezogene Kosten" description="Nur tatsächliche Kosten des konkreten Auftrags eintragen. Null bedeutet: kein zusätzlicher Ansatz."><div className="admin-form-grid p-5"><NumberInput label="Fahrtkosten je Einsatz netto" value={costs.travelCostPerVisit} onChange={travelCostPerVisit => setCosts(current => ({ ...current, travelCostPerVisit }))} /><NumberInput label={`Geräte-/Entsorgungskosten pro ${config.resultPeriod.toLowerCase()}`} value={costs.equipmentFlatPerMonth} onChange={equipmentFlatPerMonth => setCosts(current => ({ ...current, equipmentFlatPerMonth }))} /><NumberInput label="Objektbezogener Risikopuffer" value={costs.riskPercent} unit="%" onChange={riskPercent => setCosts(current => ({ ...current, riskPercent }))} /></div></AdminPanel>
    </div><div className="admin-stack">
      <AdminPanel title="Kundenergebnis" description="Dieser gerundete Korridor enthält keine internen Stunden- oder Margenwerte.">{previewing ? <EmptyState title="Kalkulation läuft" text="Die Eingaben werden geprüft." /> : previewError ? <div className="p-5 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-md">{previewError}</div> : result ? <div className="p-5"><div className="text-xs text-slate-500 mb-2">Pauschalpreisspanne netto pro {result.period}</div><div className="text-2xl font-bold text-blue-700">{formatEuro(result.publicMin)} – {formatEuro(result.publicMax)}</div><p className="mt-3 text-xs leading-5 text-slate-500">{result.summary}</p></div> : null}</AdminPanel>
      <AdminPanel title="Interne Wirtschaftlichkeit">{result ? <><div className="admin-list"><Value label="Produktive Zeit inkl. Rüsten" value={`${result.monthlyHours.toFixed(2)} Std.`} /><Value label="Lohnkosten" value={formatEuro(result.laborCost)} /><Value label="Materialkosten" value={formatEuro(result.materialCost)} /><Value label="Fahrtkosten" value={formatEuro(result.travelCost)} /><Value label="Geräte / Entsorgung" value={formatEuro(result.equipmentCost)} /><Value label="Direkte Kosten" value={formatEuro(result.directCost)} /><Value label={`Zielumsatz netto / ${result.period}`} value={formatEuro(result.netMonthly)} /><Value label="Effektiver Verrechnungssatz" value={`${result.effectiveHourlyRate.toFixed(2)} €/Std.`} /><Value label="Deckungsmarge" value={`${result.marginPercent.toFixed(1)} %`} /></div><div className="p-5 pt-2 flex flex-wrap gap-2"><AdminStatus tone={result.meetsHourlyFloor ? 'success' : 'danger'}>{result.meetsHourlyFloor ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />} 38-€-Grenze</AdminStatus><AdminStatus tone={result.meetsMinimumMargin ? 'success' : 'danger'}>{result.meetsMinimumMargin ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />} 20-%-Marge</AdminStatus></div></> : <EmptyState title="Noch kein Ergebnis" text="Bitte Eingaben und Leistungsstandard prüfen." />}</AdminPanel>
      <button className="admin-button justify-center" disabled={!result || !title.trim()} onClick={saveCalculation}><Save size={16} /> Kalkulation speichern</button>
    </div></div> : null}
    {message ? <p className="my-5 text-sm text-emerald-700">{message}</p> : null}
    <div className="mt-6"><AdminPanel title="Gespeicherte Kalkulationen">{loading ? <EmptyState title="Kalkulationen werden geladen" text="Einen Moment bitte." /> : data.calculations.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Nummer</th><th>Titel</th><th>Kunde / Objekt</th><th>Netto</th><th>Stundensatz</th><th>Marge</th></tr></thead><tbody>{data.calculations.map(item => <tr key={item.id}><td>{item.calculationNumber}</td><td>{item.title}</td><td>{item.customer?.company || item.customer?.name || item.object?.name || 'Offen'}</td><td>{formatEuro(item.netTotal)}</td><td><AdminStatus tone={item.effectiveHourlyRate >= 38 ? 'success' : 'danger'}>{item.effectiveHourlyRate.toFixed(2)} €</AdminStatus></td><td><AdminStatus tone={item.marginPercent >= 20 ? 'success' : 'danger'}>{item.marginPercent.toFixed(1)} %</AdminStatus></td></tr>)}</tbody></table></div> : <EmptyState title="Noch keine Kalkulation" text="Beginnen Sie mit einem Objekt oder einer freien Anfrage." />}</AdminPanel></div>
  </>;
}

function AdminCalculatorField({ field, value, onChange }: { field: CalculatorField; value: string | number | boolean; onChange: (value: string | number | boolean) => void }) { return <div className="admin-field"><label>{field.label}</label>{field.type === 'select' ? <select value={String(value)} onChange={event => { const option = field.options?.find(item => String(item.value) === event.target.value); onChange(option?.value ?? event.target.value); }}>{field.options?.map(option => <option value={String(option.value)} key={String(option.value)}>{option.label}</option>)}</select> : <input type="number" min={field.min} max={field.max} step={field.step ?? 1} value={Number(value)} onChange={event => onChange(Number(event.target.value))} />}{field.help ? <small>{field.help}</small> : null}</div>; }
function NumberInput({ label, value, onChange, unit = '€' }: { label: string; value: number; onChange: (value: number) => void; unit?: string }) { return <div className="admin-field"><label>{label}</label><div className="flex items-center gap-2"><input type="number" min="0" step="0.1" value={value} onChange={event => onChange(Number(event.target.value))} /><span className="text-xs text-slate-500">{unit}</span></div></div>; }
function Value({ label, value }: { label: string; value: string }) { return <div className="admin-list-row"><span>{label}</span><strong>{value}</strong></div>; }
