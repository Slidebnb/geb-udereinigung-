'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

// Deterministische "Verfügbarkeit": Wochenenden begrenzt, sonst frei.
function availabilityFor(date: Date): 'frei' | 'wenig' | 'belegt' {
  const day = date.getDay();
  if (day === 0) return 'belegt'; // Sonntag
  if (day === 6) return 'wenig'; // Samstag
  const seed = (date.getDate() * 7 + date.getMonth() * 3) % 10;
  if (seed < 2) return 'belegt';
  if (seed < 4) return 'wenig';
  return 'frei';
}

export default function AvailabilityCalendar() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(null);

  const firstWeekday = (view.getDay() + 6) % 7; // Montag = 0
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();

  const canGoPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));

  const statusStyles: Record<string, string> = {
    frei: 'bg-green-100 text-green-800 hover:bg-green-200',
    wenig: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
    belegt: 'bg-gray-100 text-gray-400 cursor-not-allowed',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => canGoPrev && setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          disabled={!canGoPrev}
          aria-label="Vorheriger Monat"
          className="w-9 h-9 rounded-lg flex items-center justify-center disabled:opacity-30 hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h3 className="font-bold text-primary">{MONTHS[view.getMonth()]} {view.getFullYear()}</h3>
        <button
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          aria-label="Nächster Monat"
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
        {WEEKDAYS.map((w) => <div key={w}>{w}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const past = date < today;
          const status = availabilityFor(date);
          const disabled = past || status === 'belegt';
          const isSelected = selected?.getTime() === date.getTime();
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => setSelected(date)}
              className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
                past ? 'text-gray-300 cursor-not-allowed' : statusStyles[status]
              } ${isSelected ? 'ring-2 ring-primary' : ''}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-200" /> Frei</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-200" /> Wenig</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-200" /> Belegt</span>
      </div>

      {selected && (
        <div className="mt-5 p-4 bg-primary-50 rounded-xl text-center">
          <p className="text-sm text-gray-600 mb-2">
            Gewünschter Termin: <strong className="text-primary">{selected.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}</strong>
          </p>
          <Link
            href={`/angebot?termin=${selected.toISOString().slice(0, 10)}`}
            className="btn-primary text-sm w-full justify-center"
          >
            Termin anfragen
          </Link>
        </div>
      )}
    </div>
  );
}
