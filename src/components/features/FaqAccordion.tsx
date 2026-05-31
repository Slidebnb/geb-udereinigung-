'use client';

import { useState } from 'react';

interface Item {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-primary">{item.question}</span>
              <svg
                className={`w-5 h-5 text-accent shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-gray-600 leading-relaxed">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
