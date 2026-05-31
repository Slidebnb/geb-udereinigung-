import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Gartenpflege Anmeldung Saison 2026 | Hecken, Rasen & mehr | Huwa Neuwied',
  description:
    'Jetzt für die Gartenpflege-Saison 2026 in Neuwied, Koblenz und Bendorf anmelden. Hecken schneiden, Rasen mähen, Unkraut entfernen, Lauben und mehr – Saisonvertrag sichern.',
  keywords: ['Gartenpflege 2026', 'Hecken schneiden Neuwied', 'Rasenmähen Koblenz', 'Unkraut entfernen Bendorf', 'Gartenservice Neuwied', 'Gartenpflege Saisonvertrag'],
  alternates: { canonical: `${siteConfig.url}/gartenpflege-anmeldung-2026` },
  openGraph: {
    title: 'Gartenpflege Saison 2026 anmelden | Hecken, Rasen, Unkraut | Huwa Neuwied',
    description: 'Saisonvertrag sichern: Hecken schneiden, Rasenmähen, Unkraut entfernen und mehr in Neuwied, Koblenz und Bendorf.',
    url: `${siteConfig.url}/gartenpflege-anmeldung-2026`,
    type: 'website',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Gartenpflege Saisonvertrag 2026',
  description: 'Professionelle Gartenpflege in Neuwied, Koblenz und Bendorf. Hecken schneiden, Rasenmähen, Unkraut entfernen, Laubentfernung und mehr – Saisonvertrag 2026.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Huwa Gebäudereinigung & Hausmeisterdienste',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mittelweg 24',
      addressLocality: 'Neuwied',
      postalCode: '56566',
      addressCountry: 'DE',
    },
    telephone: '+492601913182',
    url: siteConfig.url,
  },
  areaServed: [
    { '@type': 'City', name: 'Neuwied' },
    { '@type': 'City', name: 'Koblenz' },
    { '@type': 'City', name: 'Bendorf' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Gartenpflege-Leistungen 2026',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hecken schneiden' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rasenmähen' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Unkraut entfernen' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Laubentfernung' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Strauchschnitt' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Grünschnitt-Entsorgung' } },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="schema-gartenpflege-2026"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
