'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

interface BeforeAfterProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
}

export default function BeforeAfter({
  before,
  after,
  beforeLabel = 'Vorher',
  afterLabel = 'Nachher',
  alt,
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // percentage 0-100
  const [dragging, setDragging] = useState(false);

  const getPosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = useCallback(() => setDragging(true), []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (dragging) getPosition(e.clientX);
    },
    [dragging, getPosition]
  );

  const onMouseUp = useCallback(() => setDragging(false), []);

  const onTouchStart = useCallback(() => setDragging(true), []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (dragging && e.touches[0]) getPosition(e.touches[0].clientX);
    },
    [dragging, getPosition]
  );

  const onTouchEnd = useCallback(() => setDragging(false), []);

  // Global mouse-up so dragging stops even outside element
  useEffect(() => {
    const handleUp = () => setDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl select-none cursor-col-resize"
      style={{ aspectRatio: '4/3' }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Vorher (full width, background) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={before}
        alt={`${alt} – ${beforeLabel}`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        loading="lazy"
      />

      {/* Nachher (clipped to left side) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={after}
          alt={`${alt} – ${afterLabel}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%', maxWidth: 'none' }}
          draggable={false}
          loading="lazy"
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      />

      {/* Drag handle */}
      <button
        type="button"
        className="absolute top-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-xl border-2 border-primary text-primary transition-transform hover:scale-110 focus:outline-none"
        style={{ left: `${position}%`, transform: 'translate(-50%, -50%)' }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        aria-label="Slider bewegen"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.5 12l4-4v8l-4-4zm7 0l-4 4V8l4 4z" />
        </svg>
      </button>

      {/* Labels */}
      <span className="absolute bottom-3 left-3 z-10 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute bottom-3 right-3 z-10 bg-primary/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
        {afterLabel}
      </span>
    </div>
  );
}
