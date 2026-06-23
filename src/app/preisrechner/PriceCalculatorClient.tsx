'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, ClipboardCheck, RefreshCw, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import {
  buildPublicCalculatorSnapshot,
  formatCalculatorValue,
  getCalculatorConfig,
  getCalculatorFieldIssues,
  getQuoteContext,
  isServiceKey,
  serviceCalculatorConfigs,
  type CalculatorAnswers,
  type CalculatorField,
  type CalculatorValue,
} from '@/lib/service-calculator-config';
import type { ServiceKey } from '@/lib/operations-catalog';

const euro = (value: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

type PublicEstimate = { min: number; max: number; period: string; summary?: string; snapshot?: string };
type CalculatorTransfer = {
  serviceKey: ServiceKey;
  serviceTitle: string;
  answers: CalculatorAnswers;
  estimate: PublicEstimate | null;
  publicSnapshot: string;
  area: string;
  frequency: string;
  createdAt: string;
};

const CALCULATOR_TRANSFER_PREFIX = 'huwa:preisrechner:';

export default function PriceCalculatorClient({ initialEstimate }: { initialEstimate: PublicEstimate | null }) {
  const [serviceKey, setServiceKey] = useState<ServiceKey>('unterhalt');
  const config = useMemo(() => getCalculatorConfig(serviceKey), [serviceKey]);
  const [answers, setAnswers] = useState<CalculatorAnswers>(config.defaults);
  const [step, setStep] = useState(0);
  const [requestVersion, setRequestVersion] = useState(0);
  const [estimate, setEstimate] = useState<PublicEstimate | null>(initialEstimate);
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>(initialEstimate ? 'ready' : 'idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('serviceKey');
    if (requested && isServiceKey(requested)) setServiceKey(requested);
  }, []);

  useEffect(() => {
    setAnswers(config.defaults);
    setStep(0);
    setError('');
    setEstimate(config.key === 'unterhalt' ? initialEstimate : null);
    setState(config.key === 'unterhalt' && initialEstimate ? 'ready' : 'idle');
  }, [config, initialEstimate]);

  const issues = useMemo(() => getCalculatorFieldIssues(serviceKey, answers), [serviceKey, answers]);
  const canCalculate = issues.length === 0;

  useEffect(() => {
    if (!canCalculate) {
      setEstimate(null);
      setState('idle');
      setError('');
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setState('loading');
      try {
        const response = await fetch('/api/public-price', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ serviceKey, answers }),
          signal: controller.signal,
        });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || 'Die Schätzung konnte nicht erstellt werden.');
        setEstimate(payload);
        setError('');
        setState('ready');
      } catch (err) {
        if (!controller.signal.aborted) {
          setEstimate(null);
          setError(err instanceof Error ? err.message : 'Die Schätzung konnte nicht erstellt werden.');
          setState('error');
        }
      }
    }, 260);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [serviceKey, answers, requestVersion, canCalculate]);

  const fields = config.fields.filter(field => field.group === step);
  const quoteHref = useMemo(() => {
    const quoteContext = getQuoteContext(serviceKey, answers);
    const transferId = `${serviceKey}-${Date.now().toString(36)}`;
    const params = new URLSearchParams({
      service: config.title,
      source: 'preisrechner',
      calculatorServiceKey: serviceKey,
      calculatorPeriod: estimate?.period || config.resultPeriod,
      calculatorTransferId: transferId,
    });
    if (quoteContext.area) params.set('area', quoteContext.area);
    if (quoteContext.frequency) params.set('frequency', quoteContext.frequency);
    if (estimate) {
      params.set('estimatedMin', String(estimate.min));
      params.set('estimatedMax', String(estimate.max));
      params.set('calculatorSummary', estimate.summary || '');
      params.set('calculatorSnapshot', estimate.snapshot || buildPublicCalculatorSnapshot(serviceKey, answers));
    }
    return `/angebot?${params.toString()}`;
  }, [answers, config.resultPeriod, config.title, estimate, serviceKey]);

  const saveCalculatorTransfer = () => {
    if (typeof window === 'undefined') return;
    const url = new URL(quoteHref, window.location.origin);
    const transferId = url.searchParams.get('calculatorTransferId');
    if (!transferId) return;

    const quoteContext = getQuoteContext(serviceKey, answers);
    const fullPublicSnapshot = config.fields
      .map(field => `${field.label}: ${formatCalculatorValue(field, answers[field.key] ?? '')}`)
      .join(' | ');
    const transfer: CalculatorTransfer = {
      serviceKey,
      serviceTitle: config.title,
      answers,
      estimate,
      publicSnapshot: fullPublicSnapshot || estimate?.snapshot || buildPublicCalculatorSnapshot(serviceKey, answers),
      area: quoteContext.area,
      frequency: quoteContext.frequency,
      createdAt: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem(`${CALCULATOR_TRANSFER_PREFIX}${transferId}`, JSON.stringify(transfer));
    } catch {
      // The URL still carries the essential fallback values if browser storage is unavailable.
    }
  };

  return (
    <>
      <section className="bg-[#071f3b] py-12 md:py-16 text-white">
        <div className="container mx-auto">
          <Breadcrumb dark items={[{ label: 'Preisrechner' }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="!text-4xl md:!text-5xl !tracking-normal">Pauschalpreis realistisch einschätzen</h1>
            <p className="mt-5 text-base md:text-lg leading-8 text-slate-300">
              Wählen Sie die Dienstleistung aus und erfassen Sie nur die Angaben, die für diese Leistung wirklich zählen. Angezeigt wird ausschließlich eine unverbindliche Pauschalspanne.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-18 bg-slate-50">
        <div className="container mx-auto grid xl:grid-cols-[minmax(0,1.25fr)_minmax(330px,.75fr)] gap-8 items-start">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 border-b border-slate-100">
              <label className="label">Dienstleistung</label>
              <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {serviceCalculatorConfigs.map(item => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setServiceKey(item.key)}
                    className={`text-left rounded-lg border p-4 transition-colors ${serviceKey === item.key ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-200 hover:border-blue-200 text-slate-700'}`}
                  >
                    <span className="block text-sm font-semibold">{item.title}</span>
                    <span className="mt-1 block text-xs text-slate-500">{item.resultPeriod}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-start gap-3">
                <ClipboardCheck size={20} className="text-blue-700 mt-0.5 shrink-0" />
                <div>
                  <h2 className="!text-xl !tracking-normal">{config.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{config.intro}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 border-b border-slate-200" aria-label="Berechnungsschritte">
              {config.groups.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setStep(index)}
                  className={`min-h-16 px-3 py-3 text-xs md:text-sm font-semibold border-b-2 transition-colors ${step === index ? 'border-blue-600 text-blue-700 bg-blue-50/60' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  <span className="block text-[10px] text-slate-400 mb-1">Schritt {index + 1}</span>
                  {label}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-7">
                <h2 className="!text-2xl !tracking-normal">{config.groups[step]}</h2>
                <p className="mt-2 text-sm text-slate-500">Diese Fragen sind speziell für {config.title} ausgewählt.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {fields.map(field => (
                  <PublicField
                    key={field.key}
                    field={field}
                    value={answers[field.key]}
                    onChange={value => setAnswers(current => ({ ...current, [field.key]: value }))}
                  />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <button type="button" className="btn-secondary rounded-lg" disabled={step === 0} onClick={() => setStep(value => Math.max(0, value - 1))}>
                  <ArrowLeft size={16} /> Zurück
                </button>
                {step < config.groups.length - 1 ? (
                  <button type="button" className="btn-primary rounded-lg" onClick={() => setStep(value => Math.min(config.groups.length - 1, value + 1))}>
                    Weiter <ArrowRight size={16} />
                  </button>
                ) : (
                  <Link className={`btn-primary rounded-lg ${!estimate ? 'pointer-events-none opacity-50' : ''}`} href={quoteHref} onClick={saveCalculatorTransfer}>
                    Angebot anfragen <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <aside className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden xl:sticky xl:top-28">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500"><Calculator size={17} /> {config.resultLabel}</div>
              {state === 'idle' ? (
                <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4">
                  <strong className="text-sm text-slate-900">Angaben prüfen</strong>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{issues[0] || 'Die Schätzung startet automatisch, sobald alle nötigen Angaben plausibel sind.'}</p>
                </div>
              ) : state === 'loading' ? (
                <div className="mt-5 animate-pulse space-y-3" aria-live="polite">
                  <div className="h-10 bg-slate-100 rounded-md" />
                  <div className="h-4 w-2/3 bg-slate-100 rounded" />
                  <p className="text-sm text-slate-500">Schätzung wird aktualisiert...</p>
                </div>
              ) : state === 'error' ? (
                <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4">
                  <strong className="text-sm text-amber-900">Berechnung nicht möglich</strong>
                  <p className="mt-2 text-sm leading-6 text-amber-800">{error}</p>
                  <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700" onClick={() => setRequestVersion(value => value + 1)}>
                    <RefreshCw size={15} /> Erneut berechnen
                  </button>
                </div>
              ) : estimate ? (
                <>
                  <div className="mt-4 text-3xl md:text-4xl font-bold text-[#1768e5] leading-tight">{euro(estimate.min)} - {euro(estimate.max)}</div>
                  <div className="mt-2 text-sm font-medium text-slate-600">netto pro {estimate.period}</div>
                  {estimate.summary ? <p className="mt-5 text-sm leading-6 text-slate-500">Grundlage: {estimate.summary}</p> : null}
                </>
              ) : null}
              <p className="mt-5 text-sm leading-6 text-slate-500">
                Die Spanne ist unverbindlich bis zur Objektprüfung. Sie sehen hier nur den für Kunden relevanten Pauschalkorridor.
              </p>
              <Link href={quoteHref} aria-disabled={!estimate} className={`btn-primary mt-7 w-full justify-center rounded-lg ${!estimate ? 'pointer-events-none opacity-50' : ''}`} onClick={saveCalculatorTransfer}>
                Verbindliches Angebot anfragen <ArrowRight size={17} />
              </Link>
            </div>
            <div className="px-6 md:px-8 py-5 bg-slate-50 border-t border-slate-200 space-y-3 text-xs leading-5 text-slate-500">
              <span className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-600 shrink-0" /> {config.trustNote}</span>
              <span className="flex gap-2"><ShieldCheck size={16} className="text-emerald-600 shrink-0" /> Keine Preiszusage ohne Objektprüfung</span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function PublicField({ field, value, onChange }: { field: CalculatorField; value: CalculatorValue | undefined; onChange: (value: CalculatorValue) => void }) {
  return (
    <div className="admin-field">
      <label>{field.label}{field.required ? ' *' : ''}</label>
      <div className="relative">
        {field.type === 'select' ? (
          <select
            className="input-field"
            value={String(value ?? '')}
            onChange={event => {
              const option = field.options?.find(item => String(item.value) === event.target.value);
              onChange(option?.value ?? event.target.value);
            }}
          >
            {field.options?.map(option => <option key={String(option.value)} value={String(option.value)}>{option.label}</option>)}
          </select>
        ) : field.type === 'checkbox' ? (
          <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 px-4 text-sm text-slate-700">
            <input type="checkbox" checked={Boolean(value)} onChange={event => onChange(event.target.checked)} />
            Ja, berücksichtigen
          </label>
        ) : (
          <input
            className="input-field"
            type="number"
            min={field.min}
            max={field.max}
            step={field.step ?? 1}
            value={value === undefined ? '' : String(value)}
            onChange={event => onChange(event.target.value === '' ? '' : Number(event.target.value))}
          />
        )}
        {field.unit && field.type === 'number' ? <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">{field.unit}</span> : null}
      </div>
      {field.help ? <p className="mt-2 text-xs leading-5 text-slate-500">{field.help}</p> : null}
    </div>
  );
}
