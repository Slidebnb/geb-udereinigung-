'use client';

import { useRef, useState, useCallback } from 'react';

interface Props {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Vorher',
  afterLabel = 'Nachher',
  alt,
}: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = () => (dragging.current = true);
  const onPointerUp = () => (dragging.current = false);
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-xl select-none cursor-ew-resize shadow-lg"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* After (background) */}
      <img src={afterImage} alt={`${alt} – ${afterLabel}`} className="absolute inset-0 w-full h-full object-cover" />
      <span className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">{afterLabel}</span>

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img
          src={beforeImage}
          alt={`${alt} – ${beforeLabel}`}
          className="absolute inset-0 h-full object-cover"
          style={{ width: containerRef.current?.offsetWidth ?? '100%' }}
        />
        <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">{beforeLabel}</span>
      </div>

      {/* Handle */}
      <div className="absolute top-0 bottom-0" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
        <div className="w-1 h-full bg-white shadow-md" />
        <button
          type="button"
          aria-label="Vergleichsregler"
          onPointerDown={onPointerDown}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-4 3 4 3m8-6l4 3-4 3" /></svg>
        </button>
      </div>

      {/* Range fallback for accessibility / mobile tap */}
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Vorher-Nachher-Vergleich"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2/3 accent-accent opacity-0 md:opacity-100"
      />
    </div>
  );
}
