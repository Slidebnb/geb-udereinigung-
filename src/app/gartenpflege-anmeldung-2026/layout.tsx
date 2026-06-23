import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Gartenpflege 2026/2027 anmelden | Hecken, Rasen & mehr | Huwa Neuwied',
  description:
    'Jetzt für die Gartenpflege-Saison 2026/2027 in Neuwied, Koblenz, Westerwald und Haiger anmelden. Hecken schneiden, Rasen mähen, Unkraut entfernen, Laub und mehr – Saisonvertrag sichern.',
  keywords: ['Gartenpflege 2026/2027', 'Hecken schneiden Neuwied', 'Rasenmähen Koblenz', 'Gartenpflege Westerwald', 'Gartenservice Haiger', 'Gartenpflege Saisonvertrag'],
  alternates: { canonical: `${siteConfig.url}/gartenpflege-anmeldung-2026` },
  openGraph: {
    title: 'Gartenpflege Saison 2026/2027 anmelden | Hecken, Rasen, Unkraut | Huwa Neuwied',
    description: 'Saisonvertrag sichern: Hecken schneiden, Rasenmähen, Unkraut entfernen und mehr in Neuwied, Koblenz, Westerwald und Haiger.',
    url: `${siteConfig.url}/gartenpflege-anmeldung-2026`,
    type: 'website',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Gartenpflege Saisonvertrag 2026/2027',
  description: 'Professionelle Gartenpflege in Neuwied, Koblenz, Westerwald und Haiger. Hecken schneiden, Rasenmähen, Unkraut entfernen, Laubentfernung und mehr – Saisonvertrag 2026/2027.',
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
    telephone: '+4926019131820',
    url: siteConfig.url,
  },
  areaServed: siteConfig.serviceAreas.map((name) => ({
    '@type': name === 'Westerwald' ? 'AdministrativeArea' : 'City',
    name,
  })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Gartenpflege-Leistungen 2026/2027',
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
