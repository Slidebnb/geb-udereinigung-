import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import LeistungenGrid from '@/components/features/LeistungenGrid';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Alle Leistungen | Gebäudereinigung Neuwied | Huwa',
  description: 'Büroreinigung, Glasreinigung, Grundreinigung, Hausmeisterdienste, Winterdienst & mehr in Neuwied, Koblenz und Bendorf. Festpreisangebot anfordern!',
  alternates: { canonical: `${siteConfig.url}/leistungen` },
};

export default function LeistungenPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Leistungen' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Unsere Leistungen</div>
            <h1 className="text-white mb-4">Alles aus einer Hand –<br /><span className="gradient-text">10 Leistungsbereiche</span></h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Von der täglichen Unterhaltsreinigung bis zum kompletten Hausmeisterservice. Ihr verlässlicher Partner in Neuwied, Koblenz und Bendorf.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid with filter */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <LeistungenGrid />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
