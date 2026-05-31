import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function CTABanner() {
  return (
    <section className="section-padding bg-accent">
      <div className="container mx-auto text-center">
        <h2 className="text-white mb-4">Bereit für eine professionelle Reinigung?</h2>
        <p className="text-yellow-50 text-lg mb-8 max-w-xl mx-auto">
          Fordern Sie jetzt Ihr kostenloses Angebot an – wir melden uns innerhalb von 24 Stunden.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/angebot" className="btn-white text-base px-8 py-4">
            Kostenloses Angebot
          </Link>
          <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-accent transition-colors text-base">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
