import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gartenpflege Anmeldung 2026 | Hecken, Rasen & mehr | Huwa Gebäudereinigung',
  description:
    'Jetzt für die Gartenpflege-Saison 2026 in Neuwied, Koblenz und Bendorf anmelden. Hecken schneiden, Rasen mähen, Unkraut entfernen und mehr – Saisonvertrag sichern.',
  alternates: { canonical: `${siteConfig.url}/gartenpflege-anmeldung-2026` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
