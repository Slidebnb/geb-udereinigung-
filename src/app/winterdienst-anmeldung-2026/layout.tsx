import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Winterdienst 2026/2027 – Jetzt anmelden | Huwa Gebäudereinigung',
  description:
    'Jetzt für den Winterdienst 2026/2027 in Neuwied, Koblenz, Westerwald und Haiger anmelden. Saisonvertrag, Räum- und Streupflicht, lückenlose Dokumentation inklusive. Früh anmelden – begrenzte Kapazität.',
  keywords: ['Winterdienst 2026', 'Winterdienst Neuwied', 'Räumdienst Koblenz', 'Winterdienst Westerwald', 'Winterdienst Haiger', 'Saisonvertrag Winterdienst', 'Räum- und Streupflicht'],
  alternates: { canonical: `${siteConfig.url}/winterdienst-anmeldung-2026` },
  openGraph: {
    title: 'Winterdienst 2026/2027 jetzt anmelden | Huwa Gebäudereinigung Neuwied',
    description: 'Saisonvertrag sichern: Räumung, Streuung und lückenlose Dokumentation für Ihre Objekte in Neuwied, Koblenz, Westerwald und Haiger.',
    url: `${siteConfig.url}/winterdienst-anmeldung-2026`,
    type: 'website',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Winterdienst Saisonvertrag 2026/2027',
  description: 'Professioneller Winterdienst in Neuwied, Koblenz, Westerwald und Haiger. Räumung und Streuung mit lückenloser Dokumentation – Saisonvertrag 2026/2027.',
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
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${siteConfig.url}/winterdienst-anmeldung-2026`,
    serviceType: 'Online-Anmeldung',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="schema-winterdienst-2026"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
