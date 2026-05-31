import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhyUs from '@/components/home/WhyUs';
import Testimonials from '@/components/home/Testimonials';
import PriceCalculator from '@/components/home/PriceCalculator';
import CTABanner from '@/components/home/CTABanner';
import BeforeAfterSlider from '@/components/features/BeforeAfterSlider';
import AvailabilityCalendar from '@/components/features/AvailabilityCalendar';
import Newsletter from '@/components/features/Newsletter';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `${siteConfig.name} | Professionelle Gebäudereinigung in Düsseldorf`,
  description: siteConfig.description,
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.zip,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: siteConfig.geo.latitude, longitude: siteConfig.geo.longitude },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '14:00' },
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '127', bestRating: '5' },
  priceRange: '€€',
  areaServed: siteConfig.serviceAreas,
  sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Hero />
      <Services />

      {/* Stats banner */}
      <section className="py-12 bg-primary-50 border-y border-primary-100">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: '500+', label: 'Zufriedene Kunden' },
            { val: '15+', label: 'Jahre Erfahrung' },
            { val: '10', label: 'Leistungsbereiche' },
            { val: '100%', label: 'Qualitätsgarantie' },
          ].map(({ val, label }) => (
            <div key={label}>
              <div className="text-3xl md:text-4xl font-bold text-primary">{val}</div>
              <div className="text-gray-600 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <WhyUs />
      <PriceCalculator />
      <Testimonials />

      {/* Service areas */}
      <section className="section-padding bg-white">
        <div className="container mx-auto text-center">
          <h2 className="mb-4">Unser Einzugsgebiet</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Wir sind im gesamten Rheinland aktiv und bedienen Kunden in folgenden Städten und der Umgebung:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {siteConfig.serviceAreas.map(city => (
              <span key={city} className="badge bg-primary-50 text-primary text-base px-4 py-2">
                📍 {city}
              </span>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-4">Nicht dabei? Kontaktieren Sie uns – wir kommen auch zu Ihnen!</p>
          <Link href="/kontakt" className="mt-6 inline-block btn-primary">Anfrage stellen</Link>
        </div>
      </section>

      {/* Blog preview */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="badge bg-primary-50 text-primary mb-2">Ratgeber</span>
              <h2>Tipps & Wissenswertes</h2>
            </div>
            <Link href="/blog" className="btn-secondary hidden sm:flex">Alle Artikel</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Büroreinigung: Warum Sauberkeit am Arbeitsplatz entscheidend ist', slug: 'professionelle-bueroeinigung-sauberkeit-am-arbeitsplatz', cat: 'Büroreinigung', date: '2024-11-10' },
              { title: 'Winterdienst: Was Eigentümer und Vermieter wissen müssen', slug: 'winterdienst-2024-2025-pflichten-eigentuemer-vermieter', cat: 'Winterdienst', date: '2024-10-20' },
              { title: 'Grundreinigung vs. Unterhaltsreinigung: Was ist der Unterschied?', slug: 'grundreinigung-vs-unterhaltsreinigung-unterschiede', cat: 'Reinigungswissen', date: '2024-09-15' },
            ].map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 group">
                <span className="badge bg-primary-50 text-primary text-xs mb-3">{post.cat}</span>
                <h3 className="text-base font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                <div className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/blog" className="btn-secondary">Alle Artikel</Link>
          </div>
        </div>
      </section>

      {/* Before / After gallery */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge bg-primary-50 text-primary mb-3">Vorher / Nachher</span>
            <h2 className="mb-4">Sehen Sie den Unterschied</h2>
            <p className="text-gray-600">Ziehen Sie den Regler und überzeugen Sie sich von der Qualität unserer Reinigung.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <BeforeAfterSlider
              alt="Bodenreinigung Vorher Nachher"
              beforeImage="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=30&blur=8"
              afterImage="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80"
            />
            <BeforeAfterSlider
              alt="Glasreinigung Vorher Nachher"
              beforeImage="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=30&sat=-80"
              afterImage="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
            />
          </div>
        </div>
      </section>

      {/* Availability calendar */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge bg-primary-50 text-primary mb-3">Verfügbarkeit</span>
            <h2 className="mb-3">Wunschtermin prüfen</h2>
            <p className="text-gray-600">Wählen Sie Ihren Wunschtermin und fragen Sie ihn direkt unverbindlich an.</p>
          </div>
          <AvailabilityCalendar />
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <Newsletter />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
