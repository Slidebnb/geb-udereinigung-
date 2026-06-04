import type { Metadata } from 'next';
import Link from 'next/link';
import GoogleAdsConversion from '@/components/tracking/GoogleAdsConversion';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Vielen Dank für Ihre Anfrage | Huwa Gebäudereinigung',
  description: 'Wir haben Ihre Anfrage erhalten und melden uns zeitnah persönlich bei Ihnen.',
  robots: { index: false, follow: false },
};

export default function DankePage() {
  return (
    <>
      {/* Conversion nur auf dieser Seite – niemals global */}
      <GoogleAdsConversion />

      <section
        className="min-h-[80vh] flex items-center justify-center py-20"
        style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}
      >
        <div className="container mx-auto max-w-lg text-center px-4">
          {/* Icon */}
          <div className="w-24 h-24 rounded-full bg-green/20 border-2 border-green/40 flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Headline */}
          <h1 className="text-white text-3xl md:text-4xl font-black mb-4 leading-tight">
            Vielen Dank für<br />
            <span className="gradient-text">Ihre Anfrage!</span>
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed mb-3">
            Wir haben Ihre Anfrage erhalten und melden uns <strong className="text-white">innerhalb von 24 Stunden</strong> persönlich bei Ihnen.
          </p>
          <p className="text-slate-400 text-base mb-10">
            Unser Team prüft Ihren Bedarf und erstellt ein individuelles Angebot für Ihr Objekt.
          </p>

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { icon: '🕐', label: 'Antwort in 24 h' },
              { icon: '📋', label: 'Persönliches Angebot' },
              { icon: '✅', label: 'Kostenlos & unverbindlich' },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs text-slate-300 font-medium leading-tight text-center">{item.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="btn-primary flex items-center justify-center gap-2 py-3.5 px-6"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              Direkt anrufen: {siteConfig.phone}
            </a>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-white/70 border border-white/20 hover:bg-white/5 hover:text-white transition-colors"
            >
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
