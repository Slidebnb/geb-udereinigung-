'use client';

import { useState, useMemo } from 'react';
import FaqAccordion from './FaqAccordion';
import type { FAQ } from '@/lib/faqs';

export default function FaqSearch({ faqs, categories }: { faqs: FAQ[]; categories: string[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return faqs;
    const q = query.toLowerCase();
    return faqs.filter(f =>
      f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [faqs, query]);

  const visibleCategories = query.trim()
    ? Array.from(new Set(filtered.map(f => f.category)))
    : categories;

  return (
    <div>
      {/* Search */}
      <div className="relative mb-10">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
        </div>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Fragen durchsuchen…"
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-700 placeholder-gray-400 text-sm"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
            aria-label="Suche löschen"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium">Keine Ergebnisse für „{query}"</p>
          <p className="text-sm mt-1">Versuchen Sie einen anderen Suchbegriff oder stellen Sie uns Ihre Frage direkt.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {visibleCategories.map(category => {
            const items = filtered.filter(f => f.category === category);
            if (!items.length) return null;
            return (
              <div key={category}>
                <h2 className="mb-6 text-dark">{category}
                  {query && <span className="ml-2 text-sm font-normal text-gray-400">({items.length})</span>}
                </h2>
                <FaqAccordion items={items} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
