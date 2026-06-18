'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface TestimonialData {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  rating: number;
  location: string | null;
}

interface TestimonialsProps {
  reviews: TestimonialData[];
}

export default function Testimonials({ reviews }: TestimonialsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reviews.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from('.testimonial-title', {
        y: 30,
        duration: 0.7,
        scrollTrigger: { trigger: '.testimonial-title', start: 'top 85%', once: true },
      });
      gsap.from('.testimonial-card', {
        y: 40,
        scale: 0.97,
        duration: 0.6,
        stagger: 0.12,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const formattedRating = averageRating.toLocaleString('de-DE', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="testimonial-title text-center mb-12">
          <div className="section-label mx-auto w-fit">Kundenstimmen</div>
          <h2 className="mb-4">
            Was Kunden an <span className="gradient-text">der Zusammenarbeit schätzen</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="text-yellow-400 text-2xl" aria-label={`${formattedRating} von 5 Sternen`}>
              ★★★★★
            </span>
            <span className="font-black text-dark text-xl">{formattedRating}</span>
            <span className="text-gray-500">
              {reviews.length} veröffentlichte {reviews.length === 1 ? 'Kundenbewertung' : 'Kundenbewertungen'}
            </span>
          </div>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {reviews.map((review) => {
            const details = [review.role, review.company, review.location].filter(Boolean).join(' · ');
            const rating = Math.max(0, Math.min(5, review.rating));

            return (
              <article key={review.id} className="testimonial-card card p-7 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-0.5 mb-4" aria-label={`${rating} von 5 Sternen`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index} className={index < rating ? 'text-yellow-400' : 'text-gray-200'} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="text-gray-700 leading-relaxed mb-6 italic text-[15px]">
                  „{review.content}“
                </blockquote>
                <footer className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-dark text-sm">{review.name}</div>
                    {details ? <div className="text-xs text-gray-500">{details}</div> : null}
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
