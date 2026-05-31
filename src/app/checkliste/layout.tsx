import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kostenlose Haustechnik-Checkliste für Hausverwaltungen | Huwa',
  description:
    'Jetzt kostenlos herunterladen: Die 12-Punkte Haustechnik-Checkliste für Hausverwaltungen und Eigentümergemeinschaften in Neuwied und Koblenz.',
  alternates: { canonical: `${siteConfig.url}/checkliste` },
  robots: { index: true, follow: true },
};

export default function ChecklisteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
