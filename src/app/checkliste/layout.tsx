import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kostenlose Checklisten für Hausverwaltungen & Eigentümer | Huwa',
  description:
    'Kostenlose PDF-Checklisten für Haustechnik, Objektübergabe, Qualitätskontrolle, Winterdienst und Gartenpflege herunterladen.',
  alternates: { canonical: `${siteConfig.url}/checkliste` },
  robots: { index: true, follow: true },
};

export default function ChecklisteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
