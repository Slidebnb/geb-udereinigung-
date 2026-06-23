import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Preisrechner | Sofort-Schätzung | Huwa Gebäudedienste',
  description:
    'Berechnen Sie jetzt schnell und unkompliziert eine erste Schätzung für Ihre Gebäudereinigung in Neuwied, Koblenz, Westerwald und Haiger.',
  alternates: { canonical: `${siteConfig.url}/preisrechner` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
