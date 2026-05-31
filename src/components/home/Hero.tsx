import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function Hero() {
  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-800 to-transparent opacity-50" />

      <div className="relative container mx-auto py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent text-sm font-medium px-4 py-2 rounded-full mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
            Seit {siteConfig.foundingYear} – Ihr Partner in {siteConfig.address.city}
          </div>
          <h1 className="text-white mb-6">
            Professionelle<br/>
            <span className="text-accent">Gebäudereinigung</span><br/>
            & Hausmeisterdienste
          </h1>
          <p className="text-blue-200 text-lg mb-8 leading-relaxed max-w-lg">
            Wir sorgen für makellose Sauberkeit in Büros, Wohnhäusern und Gewerbeimmobilien – zuverlässig, gründlich und zu fairen Preisen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link href="/angebot" className="btn-primary text-base px-8 py-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              Kostenloses Angebot
            </Link>
            <a href={`tel:${siteConfig.phone}`} className="btn-white text-base px-8 py-4">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              Jetzt anrufen
            </a>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: '500+', label: 'Zufriedene Kunden' },
              { val: '15+', label: 'Jahre Erfahrung' },
              { val: '4.9★', label: 'Google Bewertung' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center bg-white/10 rounded-xl p-3">
                <div className="text-2xl font-bold text-accent">{val}</div>
                <div className="text-xs text-blue-200 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🏢', title: 'Gebäudereinigung', desc: 'Innen & Außen' },
                  { icon: '🪟', title: 'Glasreinigung', desc: 'Kristallklar' },
                  { icon: '🏗️', title: 'Baureinigung', desc: 'Nach Renovierung' },
                  { icon: '🔧', title: 'Hausmeister', desc: 'Alles aus einer Hand' },
                  { icon: '❄️', title: 'Winterdienst', desc: 'Räumen & Streuen' },
                  { icon: '🌿', title: 'Gartenarbeiten', desc: 'Pflege & Gestaltung' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors">
                    <div className="text-3xl mb-2">{icon}</div>
                    <div className="text-white font-semibold text-sm">{title}</div>
                    <div className="text-blue-200 text-xs">{desc}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-accent rounded-xl p-4 text-center">
                <p className="text-white font-bold">✓ Kostenlose Erstberatung</p>
                <p className="text-yellow-100 text-sm">Angebot innerhalb 24h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
