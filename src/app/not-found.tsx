import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden | Huwa Gebäudereinigung',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section
      className="min-h-[80vh] flex items-center justify-center py-20"
      style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}
    >
      <div className="container mx-auto max-w-lg text-center px-4">
        <div className="text-8xl font-black text-white/10 leading-none mb-4">404</div>
        <h1 className="text-white text-3xl font-black mb-4">
          Seite nicht <span className="gradient-text">gefunden</span>
        </h1>
        <p className="text-slate-300 text-lg mb-10">
          Diese Seite existiert leider nicht. Vielleicht wurde sie verschoben oder die Adresse ist falsch.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary flex items-center justify-center gap-2 py-3.5 px-6">
            Zurück zur Startseite
          </Link>
          <Link
            href="/angebot"
            className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-white/70 border border-white/20 hover:bg-white/5 hover:text-white transition-colors"
          >
            Angebot anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
