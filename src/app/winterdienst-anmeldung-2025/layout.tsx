import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Winterdienst 2025/2026 – Jetzt anmelden | Huwa Gebäudereinigung',
  description:
    'Jetzt für den Winterdienst 2025/2026 in Neuwied, Koblenz und Bendorf anmelden. Saisonvertrag, Räum- und Streupflicht, Dokumentation inklusive.',
  alternates: { canonical: `${siteConfig.url}/winterdienst-anmeldung-2025` },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
