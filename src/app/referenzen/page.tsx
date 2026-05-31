import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Referenzen & Projekte | Huwa Gebäudereinigung',
  description: 'Überzeugen Sie sich von unserer Arbeit: Referenzprojekte und Kundenstimmen aus Neuwied, Koblenz und Bendorf.',
  alternates: { canonical: `${siteConfig.url}/referenzen` },
};

const projects = [
  { title: 'Büroreinigung Verwaltungsgebäude', location: 'Neuwied',    category: 'Büroreinigung',        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', desc: 'Tägliche Unterhaltsreinigung von 2.400 m² Bürofläche für ein regionales Unternehmen.' },
  { title: 'Treppenhausreinigung Wohnanlage',  location: 'Koblenz',    category: 'Treppenhausreinigung', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', desc: 'Wöchentliche Treppenhausreinigung für eine Wohnanlage mit 36 Einheiten.' },
  { title: 'Bauendreinigung Neubau',           location: 'Bendorf',    category: 'Baureinigung',         image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80', desc: 'Bezugsfertige Bauendreinigung eines neu errichteten Ärztehauses.' },
  { title: 'Glasfassade Geschäftshaus',        location: 'Koblenz',    category: 'Glasreinigung',        image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80', desc: 'Quartalsweise Reinigung einer 750 m² großen Glasfassade per Osmose-Technik.' },
  { title: 'Winterdienst Gewerbepark',         location: 'Neuwied',    category: 'Winterdienst',         image: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&w=800&q=80', desc: 'Räum- und Streudienst für einen Gewerbepark inkl. lückenloser Dokumentation.' },
  { title: 'Grünpflege Wohnquartier',          location: 'Andernach',  category: 'Gartenarbeiten',       image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80', desc: 'Ganzjährige Grünpflege und Außenanlagenbetreuung für ein Wohnquartier.' },
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
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'radial-gradient(ellipse at 30% 50%, #0D2137 0%, #050D1A 100%)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(75,184,245,0.07)_0%,transparent_60%)] pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Referenzen' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label-dark mb-4">Referenzen</div>
            <h1 className="text-white mb-4">Projekte, auf die wir<br /><span className="gradient-text">stolz sind</span></h1>
            <p className="text-blue-200/70 text-lg">Über 500 Kunden in Neuwied, Koblenz und Bendorf vertrauen auf Huwa. Hier finden Sie eine Auswahl unserer abgeschlossenen Projekte.</p>
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit">Projekte</div>
            <h2 className="mt-4">Eine Auswahl unserer <span className="gradient-text">Arbeiten</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map(p => (
              <article key={p.title} className="card overflow-hidden group hover:border-primary/30 transition-all duration-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={`${p.title} in ${p.location}`} className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="p-6">
                  <span className="inline-block bg-primary/8 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">{p.category}</span>
                  <h3 className="text-base font-bold text-dark mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-sm text-gray-400 mb-2 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    {p.location}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DB testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding" style={{ background: '#F8FAFC' }}>
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <div className="section-label mx-auto w-fit">Kundenstimmen</div>
              <h2 className="mt-4">Das sagen unsere <span className="gradient-text">Kunden</span></h2>
              <div className="flex items-center justify-center gap-3 mt-3">
                <span className="text-yellow-400 text-xl tracking-tight">★★★★★</span>
                <span className="font-black text-dark">4.9</span>
                <span className="text-gray-400 text-sm">/5 · 127+ Bewertungen</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map(t => (
                <div key={t.id} className="card p-6 hover:border-primary/30 transition-all duration-200">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4 text-sm leading-relaxed">„{t.content}"</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-bold text-dark text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">
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
