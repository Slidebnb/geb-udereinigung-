'use client';
import { useEffect, useRef } from 'react';

interface TaglineRevealProps {
  lines: string[];
  className?: string;
}

export default function TaglineReveal({ lines, className = '' }: TaglineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('[data-word]'));
    const observers: IntersectionObserver[] = [];

    spans.forEach((span, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              span.style.color = 'rgba(255,255,255,1)';
              span.style.opacity = '1';
            }, i * 55);
            obs.disconnect();
          }
        },
        { threshold: 0.6, rootMargin: '0px 0px -10% 0px' }
      );
      obs.observe(span);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const segments = lines.flatMap((line, li) => {
    const words = line.split(' ').map((word, wi) => ({ word, key: `${li}-${wi}`, br: false as const }));
    if (li < lines.length - 1) {
      return [...words, { word: '', key: `br-${li}`, br: true as const }];
    }
    return words;
  });

  return (
    <div ref={containerRef} className={className}>
      {segments.map(({ word, key, br }) =>
        br ? (
          <br key={key} />
        ) : (
          <span
            key={key}
            data-word
            className="inline-block"
            style={{
              color: 'rgba(255,255,255,0.22)',
              opacity: 1,
              transition: 'color 0.5s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {word}&nbsp;
          </span>
        )
      )}
    </div>
  );
}
