import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kostenloses Angebot anfordern | Gebäudereinigung Neuwied | Huwa',
  description:
    'Jetzt kostenloses Angebot für Gebäudereinigung, Hausmeisterdienste oder Winterdienst anfordern – in Neuwied, Koblenz und Bendorf. Antwort innerhalb von 24 Stunden.',
  alternates: { canonical: `${siteConfig.url}/angebot` },
  openGraph: {
    title: 'Kostenloses Angebot | Huwa Gebäudereinigung Neuwied',
    description: 'Leistung wählen, Objektdetails angeben, Angebot erhalten – kostenlos und unverbindlich. Antwort in 24h.',
    url: `${siteConfig.url}/angebot`,
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
