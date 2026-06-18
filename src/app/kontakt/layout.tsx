import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kontakt | Huwa Gebäudedienste',
  description: 'Kontaktieren Sie Huwa Gebäudedienste in Neuwied per Telefon, WhatsApp oder Formular. Wir melden uns persönlich zu Ihrer Anfrage.',
  alternates: { canonical: `${siteConfig.url}/kontakt` },
  openGraph: { url: `${siteConfig.url}/kontakt`, images: ['/opengraph-image'] },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}
