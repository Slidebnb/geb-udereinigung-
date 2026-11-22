'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroAnimator() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll<HTMLElement>('[data-hero-animate]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-hero-animate]'));

    gsap.set(els, { opacity: 0, y: 28 });

    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.08,
      ease: 'power2.out',
    });
  }, []);

  return null;
}
