'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Protocol {
  id: string;
  date: string;
  type: string;
  location: string;
  duration: string | null;
  staff: string | null;
  notes: string | null;
  status: string;
  tasks: string;
  customer: { name: string | null; email: string };
}

function parseTasks(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [raw];
  } catch {
    return raw ? [raw] : [];
  }
}

export default function ProtokollDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [protocol, setProtocol] = useState<Protocol | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/portal/protokolle/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('Protokoll nicht gefunden');
        return r.json();
      })
      .then(data => {
        setProtocol(data);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [id]);

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-400">Protokoll wird geladen…</div>
      </div>
    );
  }

  if (error || !protocol) {
    return (
      <div className="bg-white rounded-xl p-8 text-center shadow-sm">
        <p className="text-red-500 mb-4">{error || 'Protokoll nicht gefunden.'}</p>
        <button onClick={() => router.back()} className="text-primary text-sm hover:underline">← Zurück</button>
      </div>
    );
  }

  const tasks = parseTasks(protocol.tasks);
  const date = new Date(protocol.date);
  const dateStr = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const dateStrLong = date.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      {/* Screen toolbar */}
      <div className="print:hidden mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/portal/protokolle" className="text-gray-500 hover:text-primary text-sm flex items-center gap-1">
            ← Alle Protokolle
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-600">Protokoll vom {dateStr}</span>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0C2340] text-white rounded-xl text-sm font-medium hover:bg-[#1B3E62] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Als PDF speichern
        </button>
      </div>

      {/* Print-optimiertes Protokoll */}
      <div
        id="protokoll-pdf"
        className="bg-white rounded-2xl shadow-sm p-8 max-w-3xl mx-auto print:shadow-none print:rounded-none print:p-6 print:max-w-none"
      >
        {/* Logo Header */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-[#0C2340]">
          <div className="flex items-center gap-4">
            {/* SVG Logo */}
            <div className="w-14 h-14 rounded-xl bg-[#0C2340] flex items-center justify-center flex-shrink-0">
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8h4v7h6V8h4v16h-4v-6h-6v6H6V8z" fill="#4BB8F5"/>
                <path d="M22 8h1.5l2.5 5 2.5-5H30v16h-3.5v-8l-2 4h-1l-2-4v8H18V8h4z" fill="white" opacity="0.85"/>
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold text-[#0C2340]">Huwa <span className="text-[#4BB8F5]">Gebäudedienste</span></div>
              <div className="text-xs text-gray-500 tracking-wide uppercase mt-0.5">Gebäudereinigung & Hausmeisterdienste</div>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500">
            <div className="font-bold text-[#0C2340] text-sm mb-1">Reinigungsprotokoll</div>
            <div>Mittelweg 24, 56566 Neuwied</div>
            <div>Tel: 02601 9131820</div>
            <div>info@huwa-gebaeudedienste.de</div>
          </div>
        </div>

        {/* Protokoll-Titel */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#0C2340] text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            <span>✓</span> {protocol.status}
          </div>
          <h1 className="text-2xl font-bold text-[#0C2340] mb-1">{protocol.type}</h1>
          <p className="text-gray-500 text-sm">{dateStrLong}</p>
        </div>

        {/* Einsatz-Details */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Standort', value: protocol.location },
            { label: 'Dauer', value: protocol.duration || '–' },
            { label: 'Mitarbeiter', value: protocol.staff || '–' },
          ].map(item => (
            <div key={item.label} className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{item.label}</div>
              <div className="text-sm font-medium text-[#0C2340]">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Aufgaben */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Durchgeführte Aufgaben</div>
          {tasks.length > 0 ? (
            <div className="space-y-2">
              {tasks.map((task, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-[#2DC94E]/5 rounded-lg border border-[#2DC94E]/15">
                  <span className="w-5 h-5 rounded-full bg-[#2DC94E] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-700">{task}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Keine Aufgaben eingetragen.</p>
          )}
        </div>

        {/* Notizen */}
        {protocol.notes && (
          <div className="mb-8">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Notizen</div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap">
              {protocol.notes}
            </div>
          </div>
        )}

        {/* Bestätigung */}
        <div className="border-t border-gray-100 pt-6 mt-6">
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Auftraggeber</div>
              <div className="text-sm text-gray-700">
                <div className="font-medium">{protocol.customer.name || '–'}</div>
                <div className="text-gray-500">{protocol.customer.email}</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Auftragnehmer</div>
              <div className="text-sm text-gray-700">
                <div className="font-medium">Huwa Gebäudereinigung & Hausmeisterdienste</div>
                <div className="text-gray-500">Mittelweg 24, 56566 Neuwied</div>
                <div className="text-gray-500 mt-3 text-xs">
                  Datum: {dateStr}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-8">
            <div>
              <div className="border-t border-gray-300 pt-2 mt-8 text-xs text-gray-400">Unterschrift Auftraggeber</div>
            </div>
            <div>
              <div className="border-t border-gray-300 pt-2 mt-8 text-xs text-gray-400">Unterschrift Huwa Gebäudedienste</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
          Huwa Gebäudereinigung & Hausmeisterdienste · Mittelweg 24, 56566 Neuwied · 02601 9131820 · huwa-gebaeudedienste.de
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white; }
          @page { margin: 1.5cm; size: A4; }
        }
      `}</style>
    </>
  );
}
