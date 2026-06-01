import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kontakt | Gebäudereinigung Neuwied & Koblenz | Huwa',
  description:
    'Huwa Gebäudereinigung in Neuwied kontaktieren – per Telefon, E-Mail oder WhatsApp. Antwort innerhalb von 24 Stunden. Kostenlose Erstberatung.',
  alternates: { canonical: `${siteConfig.url}/kontakt` },
  openGraph: {
    title: 'Kontakt | Huwa Gebäudereinigung Neuwied',
    description: 'Rufen Sie uns an oder schreiben Sie uns – wir melden uns innerhalb von 24 Stunden mit einem kostenlosen Angebot.',
    url: `${siteConfig.url}/kontakt`,
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
