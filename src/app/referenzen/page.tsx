import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import BeforeAfterSlider from '@/components/features/BeforeAfterSlider';
import CTABanner from '@/components/home/CTABanner';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Referenzen & Projekte | Huwa Gebäudereinigung',
  description:
    'Überzeugen Sie sich von unserer Arbeit: Referenzprojekte, Vorher-Nachher-Vergleiche und Kundenstimmen aus Düsseldorf, Köln und ganz NRW.',
  alternates: { canonical: `${siteConfig.url}/referenzen` },
};

const projects = [
  { title: 'Büroreinigung Bürokomplex', location: 'Düsseldorf-Stadtmitte', category: 'Büroreinigung', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', desc: 'Tägliche Unterhaltsreinigung von 3.200 m² Bürofläche für ein Beratungsunternehmen.' },
  { title: 'Treppenhausreinigung Wohnanlage', location: 'Köln-Ehrenfeld', category: 'Treppenhausreinigung', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', desc: 'Wöchentliche Treppenhausreinigung für eine Wohnanlage mit 48 Einheiten.' },
  { title: 'Bauendreinigung Neubau', location: 'Neuss', category: 'Baureinigung', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80', desc: 'Bezugsfertige Bauendreinigung eines neu errichteten Ärztehauses.' },
  { title: 'Glasfassade Geschäftshaus', location: 'Duisburg', category: 'Glasreinigung', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80', desc: 'Quartalsweise Reinigung einer 900 m² großen Glasfassade per Osmose-Technik.' },
  { title: 'Winterdienst Gewerbepark', location: 'Essen', category: 'Winterdienst', image: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&w=800&q=80', desc: 'Räum- und Streudienst für einen Gewerbepark inkl. lückenloser Dokumentation.' },
  { title: 'Grünpflege Wohnquartier', location: 'Wuppertal', category: 'Gartenarbeiten', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80', desc: 'Ganzjährige Grünpflege und Außenanlagenbetreuung für ein Wohnquartier.' },
];

export default async function ReferenzenPage() {
  let testimonials: { id: string; name: string; role: string | null; company: string | null; content: string; rating: number; location: string | null }[] = [];
  try {
    testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    testimonials = [];
  }

  return (
    <>
      <section className="bg-primary-50 border-b border-primary-100 py-8">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'Referenzen' }]} />
          <h1 className="mt-4 mb-2">Referenzen & Projekte</h1>
          <p className="text-gray-600 max-w-2xl">
            Über 500 Kunden vertrauen auf Huwa. Hier finden Sie eine Auswahl unserer Projekte aus Düsseldorf, Köln und der gesamten Region.
          </p>
        </div>
      </section>

      {/* Before / After */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge bg-primary-50 text-primary mb-3">Vorher / Nachher</span>
            <h2 className="mb-4">Ergebnisse, die überzeugen</h2>
            <p className="text-gray-600">Ziehen Sie den Regler und sehen Sie den Unterschied, den professionelle Reinigung macht.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <BeforeAfterSlider
              alt="Bodenreinigung"
              beforeImage="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=30&blur=8"
              afterImage="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80"
            />
            <BeforeAfterSlider
              alt="Fassadenreinigung"
              beforeImage="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=30&sat=-80"
              afterImage="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
            />
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge bg-primary-50 text-primary mb-3">Projekte</span>
            <h2 className="mb-4">Eine Auswahl unserer Arbeiten</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <article key={p.title} className="card overflow-hidden">
                <img src={p.image} alt={`${p.title} in ${p.location}`} className="h-48 w-full object-cover" loading="lazy" />
                <div className="p-6">
                  <span className="badge bg-primary-50 text-primary text-xs mb-3">{p.category}</span>
                  <h3 className="text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">📍 {p.location}</p>
                  <p className="text-sm text-gray-600">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="badge bg-green-50 text-green-700 mb-3">Kundenstimmen</span>
              <h2 className="mb-2">Das sagen unsere Kunden</h2>
              <div className="flex items-center justify-center gap-2 text-gray-600 mt-3">
                <span className="text-accent text-xl">★★★★★</span>
                <span className="font-bold">4.9 / 5</span>
                <span className="text-gray-500">· 127+ Bewertungen</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="card p-6">
                  <div className="flex gap-1 mb-3" aria-label={`${t.rating} von 5 Sternen`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-accent">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">„{t.content}"</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">
                      {[t.role, t.company].filter(Boolean).join(', ')}
                      {t.location ? ` · ${t.location}` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
