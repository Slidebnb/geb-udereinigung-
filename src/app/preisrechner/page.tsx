'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// ─── Price tables ────────────────────────────────────────────────────────────

const PREISE = {
  bueroreinigung:       { base: 1.10, daily: 1.0, twice: 0.9, weekly: 1.0, bimonthly: 1.1 },
  unterhaltsreinigung:  { base: 1.05 },
  grundreinigung:       { base: 6.0 },
  baureinigung:         { base: 5.0 },
  treppenhausreinigung: { base: 45, perEtage: 35, aufzug: 15 },
  glasreinigung:        { standard: 4, gross: 7, schaufenster: 9 },
  hausmeisterservice:   { klein: 180, mittel: 320, gross: 550 },
  winterdienst:         { base: 0.35 },
  gartenarbeiten:       { base: 0.25 },
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────

type ServiceKey =
  | 'bueroreinigung'
  | 'unterhaltsreinigung'
  | 'grundreinigung'
  | 'baureinigung'
  | 'treppenhausreinigung'
  | 'glasreinigung'
  | 'hausmeisterservice'
  | 'winterdienst'
  | 'gartenarbeiten';

interface ServiceOption {
  key: ServiceKey;
  label: string;
  icon: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { key: 'bueroreinigung',       label: 'Büroreinigung',            icon: '💼' },
  { key: 'treppenhausreinigung', label: 'Treppenhausreinigung',     icon: '🏠' },
  { key: 'glasreinigung',        label: 'Glasreinigung / Fenster',  icon: '🪟' },
  { key: 'grundreinigung',       label: 'Grundreinigung',           icon: '✨' },
  { key: 'unterhaltsreinigung',  label: 'Unterhaltsreinigung',      icon: '🔄' },
  { key: 'baureinigung',         label: 'Baureinigung',             icon: '🏗️' },
  { key: 'hausmeisterservice',   label: 'Hausmeisterservice',       icon: '🔧' },
  { key: 'winterdienst',         label: 'Winterdienst',             icon: '❄️' },
  { key: 'gartenarbeiten',       label: 'Gartenarbeiten',           icon: '🌿' },
];

// ─── Calculation ─────────────────────────────────────────────────────────────

interface CalcParams {
  service: ServiceKey | null;
  flaeche: number;
  haeufigkeitBuero: 'daily' | 'twice' | 'weekly' | 'bimonthly';
  etagen: number;
  treppEtagen: number;
  treppHaeufigkeit: 'weekly' | 'twice';
  treppAufzug: boolean;
  glasFenster: number;
  glasGroesse: 'standard' | 'gross' | 'schaufenster';
  hausGroesse: 'klein' | 'mittel' | 'gross';
  hausUmfang: 'basis' | 'standard' | 'komplett';
  winterFlaeche: number;
  winterTyp: 'gehwege' | 'parkplatz' | 'beides';
  gartenFlaeche: number;
  gartenHaeufigkeit: 'weekly' | 'bimonthly' | 'monthly';
}

type PriceResult =
  | { type: 'range'; low: number; high: number; unit: string }
  | { type: 'request' }
  | null;

function calculate(p: CalcParams): PriceResult {
  if (!p.service) return null;

  const round = (n: number) => Math.round(n / 5) * 5;
  const range = (base: number, unit: string): PriceResult => ({
    type: 'range',
    low: round(base * 0.8),
    high: round(base * 1.2),
    unit,
  });

  switch (p.service) {
    case 'bueroreinigung': {
      const freq =
        p.haeufigkeitBuero === 'daily'   ? PREISE.bueroreinigung.daily   :
        p.haeufigkeitBuero === 'twice'   ? PREISE.bueroreinigung.twice   :
        p.haeufigkeitBuero === 'weekly'  ? PREISE.bueroreinigung.weekly  :
                                           PREISE.bueroreinigung.bimonthly;
      const etageMulti = 1 + Math.max(0, p.etagen - 1) * 0.10;
      const base = p.flaeche * PREISE.bueroreinigung.base * freq * etageMulti;
      return range(base, '/Monat');
    }

    case 'unterhaltsreinigung': {
      const etageMulti = 1 + Math.max(0, p.etagen - 1) * 0.10;
      const base = p.flaeche * PREISE.unterhaltsreinigung.base * etageMulti;
      return range(base, '/Monat');
    }

    case 'grundreinigung': {
      const base = p.flaeche * PREISE.grundreinigung.base;
      return range(base, 'einmalig');
    }

    case 'baureinigung': {
      const base = p.flaeche * PREISE.baureinigung.base;
      return range(base, 'einmalig');
    }

    case 'treppenhausreinigung': {
      const freq = p.treppHaeufigkeit === 'twice' ? 2 : 1;
      const aufzugAdd = p.treppAufzug ? PREISE.treppenhausreinigung.aufzug : 0;
      const base =
        (PREISE.treppenhausreinigung.base +
          (p.treppEtagen - 1) * PREISE.treppenhausreinigung.perEtage +
          aufzugAdd) *
        freq;
      return range(base, '/Monat');
    }

    case 'glasreinigung': {
      const pricePerFenster =
        p.glasGroesse === 'gross'        ? PREISE.glasreinigung.gross       :
        p.glasGroesse === 'schaufenster' ? PREISE.glasreinigung.schaufenster :
                                           PREISE.glasreinigung.standard;
      const base = p.glasFenster * pricePerFenster;
      return range(base, 'einmalig');
    }

    case 'hausmeisterservice': {
      const sizeBase =
        p.hausGroesse === 'gross'  ? PREISE.hausmeisterservice.gross  :
        p.hausGroesse === 'mittel' ? PREISE.hausmeisterservice.mittel :
                                     PREISE.hausmeisterservice.klein;
      const umfangMulti =
        p.hausUmfang === 'komplett' ? 1.4 :
        p.hausUmfang === 'standard' ? 1.15 : 1.0;
      const base = sizeBase * umfangMulti;
      return range(base, '/Monat');
    }

    case 'winterdienst':
      return { type: 'request' };

    case 'gartenarbeiten': {
      const freqMulti =
        p.gartenHaeufigkeit === 'weekly'   ? 4 :
        p.gartenHaeufigkeit === 'bimonthly' ? 2 : 1;
      const base = p.gartenFlaeche * PREISE.gartenarbeiten.base * freqMulti;
      return range(base, '/Monat');
    }

    default:
      return null;
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PreisrechnerPage() {
  const [service, setService] = useState<ServiceKey | null>(null);

  // Shared
  const [flaeche, setFlaeche] = useState(200);
  const [etagen, setEtagen] = useState(1);

  // Büro / Unterhalts
  const [haeufigkeitBuero, setHaeufigkeitBuero] = useState<'daily' | 'twice' | 'weekly' | 'bimonthly'>('weekly');

  // Treppenhaus
  const [treppEtagen, setTreppEtagen] = useState(3);
  const [treppHaeufigkeit, setTreppHaeufigkeit] = useState<'weekly' | 'twice'>('weekly');
  const [treppAufzug, setTreppAufzug] = useState(false);

  // Glas
  const [glasFenster, setGlasFenster] = useState(20);
  const [glasGroesse, setGlasGroesse] = useState<'standard' | 'gross' | 'schaufenster'>('standard');

  // Hausmeister
  const [hausGroesse, setHausGroesse] = useState<'klein' | 'mittel' | 'gross'>('mittel');
  const [hausUmfang, setHausUmfang] = useState<'basis' | 'standard' | 'komplett'>('standard');

  // Winterdienst
  const [winterFlaeche, setWinterFlaeche] = useState(500);
  const [winterTyp, setWinterTyp] = useState<'gehwege' | 'parkplatz' | 'beides'>('gehwege');

  // Garten
  const [gartenFlaeche, setGartenFlaeche] = useState(300);
  const [gartenHaeufigkeit, setGartenHaeufigkeit] = useState<'weekly' | 'bimonthly' | 'monthly'>('bimonthly');

  const result = useMemo<PriceResult>(
    () =>
      calculate({
        service,
        flaeche, haeufigkeitBuero, etagen,
        treppEtagen, treppHaeufigkeit, treppAufzug,
        glasFenster, glasGroesse,
        hausGroesse, hausUmfang,
        winterFlaeche, winterTyp,
        gartenFlaeche, gartenHaeufigkeit,
      }),
    [
      service, flaeche, haeufigkeitBuero, etagen,
      treppEtagen, treppHaeufigkeit, treppAufzug,
      glasFenster, glasGroesse,
      hausGroesse, hausUmfang,
      winterFlaeche, winterTyp,
      gartenFlaeche, gartenHaeufigkeit,
    ]
  );

  const flaecheServices: ServiceKey[] = ['bueroreinigung', 'unterhaltsreinigung', 'grundreinigung', 'baureinigung'];

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}
      >
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-4">Preisrechner</div>
            <h1 className="text-white mb-4">
              Was kostet{' '}
              <span className="gradient-text">Ihre Reinigung?</span>
            </h1>
            <p className="text-slate-300 text-lg">
              Erhalten Sie in wenigen Sekunden eine erste Orientierung – kostenlos, unverbindlich
              und ohne Anmeldung. Wählen Sie einfach Ihre Leistung und geben Sie die Details an.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container mx-auto max-w-3xl">

          {/* Step 1: Service selection */}
          <div className="card p-8 mb-6">
            <h2 className="text-xl font-bold text-dark mb-2">Welche Leistung benötigen Sie?</h2>
            <p className="text-gray-500 text-sm mb-6">Wählen Sie eine Leistungsart aus.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SERVICE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setService(opt.key)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${
                    service === opt.key
                      ? 'border-primary bg-primary/8 text-primary shadow-sm'
                      : 'border-slate-200 text-gray-600 hover:border-primary/40 hover:bg-primary/4'
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="text-center leading-tight">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Details */}
          {service && (
            <div className="card p-8 mb-6">
              <h2 className="text-xl font-bold text-dark mb-2">Details eingeben</h2>
              <p className="text-gray-500 text-sm mb-6">
                Je genauer Ihre Angaben, desto realistischer die Schätzung.
              </p>

              <div className="space-y-6">

                {/* Fläche – for bueroreinigung, unterhalts, grund, bau */}
                {flaecheServices.includes(service) && (
                  <>
                    <div>
                      <label className="label">
                        Fläche in m²
                        <span className="ml-2 font-black text-primary">{flaeche} m²</span>
                      </label>
                      <input
                        type="range" min={20} max={2000} step={10}
                        value={flaeche}
                        onChange={(e) => setFlaeche(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>20 m²</span><span>2.000 m²</span>
                      </div>
                    </div>

                    {/* Häufigkeit only for buero & unterhalts */}
                    {(service === 'bueroreinigung' || service === 'unterhaltsreinigung') && (
                      <div>
                        <label className="label">Häufigkeit</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {([
                            ['daily',    'Täglich'],
                            ['twice',    '2× wöchentlich'],
                            ['weekly',   '1× wöchentlich'],
                            ['bimonthly','2× monatlich'],
                          ] as [typeof haeufigkeitBuero, string][]).map(([val, lbl]) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setHaeufigkeitBuero(val)}
                              className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                                haeufigkeitBuero === val
                                  ? 'border-primary bg-primary/8 text-primary'
                                  : 'border-slate-200 text-gray-600 hover:border-primary/40'
                              }`}
                            >
                              {lbl}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="label">
                        Anzahl Etagen (ab EG, +10% pro Etage)
                        <span className="ml-2 font-black text-primary">{etagen}</span>
                      </label>
                      <input
                        type="range" min={1} max={10} step={1}
                        value={etagen}
                        onChange={(e) => setEtagen(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>EG</span><span>10 Etagen</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Treppenhaus */}
                {service === 'treppenhausreinigung' && (
                  <>
                    <div>
                      <label className="label">
                        Anzahl Etagen
                        <span className="ml-2 font-black text-primary">{treppEtagen}</span>
                      </label>
                      <input
                        type="range" min={1} max={8} step={1}
                        value={treppEtagen}
                        onChange={(e) => setTreppEtagen(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>1 Etage</span><span>8 Etagen</span>
                      </div>
                    </div>

                    <div>
                      <label className="label">Häufigkeit</label>
                      <div className="flex gap-3">
                        {([
                          ['weekly', '1× wöchentlich'],
                          ['twice',  '2× wöchentlich'],
                        ] as [typeof treppHaeufigkeit, string][]).map(([val, lbl]) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setTreppHaeufigkeit(val)}
                            className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                              treppHaeufigkeit === val
                                ? 'border-primary bg-primary/8 text-primary'
                                : 'border-slate-200 text-gray-600 hover:border-primary/40'
                            }`}
                          >
                            {lbl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={treppAufzug}
                        onClick={() => setTreppAufzug(!treppAufzug)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${treppAufzug ? 'bg-primary' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${treppAufzug ? 'translate-x-5' : ''}`} />
                      </button>
                      <span className="text-sm font-medium text-gray-700">Mit Aufzugreinigung (+15 €/Monat)</span>
                    </div>
                  </>
                )}

                {/* Glasreinigung */}
                {service === 'glasreinigung' && (
                  <>
                    <div>
                      <label className="label">
                        Anzahl Fenster / Glasflächen
                        <span className="ml-2 font-black text-primary">{glasFenster}</span>
                      </label>
                      <input
                        type="range" min={5} max={200} step={5}
                        value={glasFenster}
                        onChange={(e) => setGlasFenster(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>5</span><span>200</span>
                      </div>
                    </div>

                    <div>
                      <label className="label">Fenstergröße</label>
                      <div className="grid grid-cols-3 gap-3">
                        {([
                          ['standard',     'Standard',    '≤ 1 m²'],
                          ['gross',        'Groß',        '1–3 m²'],
                          ['schaufenster', 'Schaufenster','> 3 m²'],
                        ] as [typeof glasGroesse, string, string][]).map(([val, lbl, sub]) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setGlasGroesse(val)}
                            className={`flex flex-col items-center px-3 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                              glasGroesse === val
                                ? 'border-primary bg-primary/8 text-primary'
                                : 'border-slate-200 text-gray-600 hover:border-primary/40'
                            }`}
                          >
                            <span className="font-bold">{lbl}</span>
                            <span className="text-xs opacity-70">{sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Hausmeisterservice */}
                {service === 'hausmeisterservice' && (
                  <>
                    <div>
                      <label className="label">Objektgröße</label>
                      <div className="grid grid-cols-3 gap-3">
                        {([
                          ['klein',  'Kleine WEG',  '< 8 Einheiten'],
                          ['mittel', 'Mittlere WEG', '8–20 Einheiten'],
                          ['gross',  'Große Anlage', '> 20 Einheiten'],
                        ] as [typeof hausGroesse, string, string][]).map(([val, lbl, sub]) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setHausGroesse(val)}
                            className={`flex flex-col items-center px-3 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                              hausGroesse === val
                                ? 'border-primary bg-primary/8 text-primary'
                                : 'border-slate-200 text-gray-600 hover:border-primary/40'
                            }`}
                          >
                            <span className="font-bold">{lbl}</span>
                            <span className="text-xs opacity-70">{sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="label">Leistungsumfang</label>
                      <div className="grid grid-cols-3 gap-3">
                        {([
                          ['basis',    'Basis',    'Grundleistungen'],
                          ['standard', 'Standard', 'Erweitertes Paket'],
                          ['komplett', 'Komplett', 'Rundum-Service'],
                        ] as [typeof hausUmfang, string, string][]).map(([val, lbl, sub]) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setHausUmfang(val)}
                            className={`flex flex-col items-center px-3 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                              hausUmfang === val
                                ? 'border-primary bg-primary/8 text-primary'
                                : 'border-slate-200 text-gray-600 hover:border-primary/40'
                            }`}
                          >
                            <span className="font-bold">{lbl}</span>
                            <span className="text-xs opacity-70">{sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Winterdienst */}
                {service === 'winterdienst' && (
                  <>
                    <div>
                      <label className="label">
                        Zu räumende Fläche m²
                        <span className="ml-2 font-black text-primary">{winterFlaeche} m²</span>
                      </label>
                      <input
                        type="range" min={50} max={5000} step={50}
                        value={winterFlaeche}
                        onChange={(e) => setWinterFlaeche(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>50 m²</span><span>5.000 m²</span>
                      </div>
                    </div>

                    <div>
                      <label className="label">Flächentyp</label>
                      <div className="grid grid-cols-3 gap-3">
                        {([
                          ['gehwege',   'Gehwege'],
                          ['parkplatz', 'Parkplatz'],
                          ['beides',    'Beides'],
                        ] as [typeof winterTyp, string][]).map(([val, lbl]) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setWinterTyp(val)}
                            className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                              winterTyp === val
                                ? 'border-primary bg-primary/8 text-primary'
                                : 'border-slate-200 text-gray-600 hover:border-primary/40'
                            }`}
                          >
                            {lbl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Gartenarbeiten */}
                {service === 'gartenarbeiten' && (
                  <>
                    <div>
                      <label className="label">
                        Gartenfläche m²
                        <span className="ml-2 font-black text-primary">{gartenFlaeche} m²</span>
                      </label>
                      <input
                        type="range" min={50} max={3000} step={50}
                        value={gartenFlaeche}
                        onChange={(e) => setGartenFlaeche(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>50 m²</span><span>3.000 m²</span>
                      </div>
                    </div>

                    <div>
                      <label className="label">Häufigkeit</label>
                      <div className="grid grid-cols-3 gap-3">
                        {([
                          ['weekly',    'Wöchentlich'],
                          ['bimonthly', '2× monatlich'],
                          ['monthly',   'Monatlich'],
                        ] as [typeof gartenHaeufigkeit, string][]).map(([val, lbl]) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setGartenHaeufigkeit(val)}
                            className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                              gartenHaeufigkeit === val
                                ? 'border-primary bg-primary/8 text-primary'
                                : 'border-slate-200 text-gray-600 hover:border-primary/40'
                            }`}
                          >
                            {lbl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {result && (
            <div className="rounded-2xl border-2 border-primary/30 bg-white p-8 shadow-lg">
              {result.type === 'request' ? (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">❄️</span>
                    <h3 className="text-lg font-bold text-dark">Winterdienst – Saisonpreis</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Der Winterdienst-Preis hängt stark von der Saison, der Lage und den lokalen
                    Gegebenheiten ab. Wir erstellen Ihnen kostenlos ein exaktes Saisonangebot.
                  </p>
                  <Link href="/angebot" className="btn-primary">
                    Kostenloses Angebot anfragen
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Ihre Schätzung
                      </p>
                      <p
                        className="text-4xl font-black tracking-tight"
                        style={{ backgroundImage: 'linear-gradient(135deg, #4BB8F5 0%, #2DC94E 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                      >
                        ca. {result.low.toLocaleString('de-DE')} – {result.high.toLocaleString('de-DE')} €
                      </p>
                      <p className="text-gray-500 font-medium mt-1">{result.unit}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mb-6">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      <span className="font-semibold text-gray-700">Hinweis: </span>
                      Diese Schätzung basiert auf Richtwerten und dient nur zur ersten Orientierung.
                      Das tatsächliche Angebot kann je nach Objekt, Verschmutzungsgrad und
                      Anforderungen abweichen. Wir besichtigen kostenlos und erstellen ein exaktes
                      Festpreisangebot.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/angebot" className="btn-primary">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      Kostenloses Angebot anfragen
                    </Link>
                    <Link href="/kontakt" className="btn-outline text-sm">
                      Rückruf anfordern
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}

          {!service && (
            <div className="text-center py-10 text-gray-400 text-sm">
              Wählen Sie oben eine Leistungsart, um Ihre Schätzung zu erhalten.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
