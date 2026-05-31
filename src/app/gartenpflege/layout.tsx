import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gartenpflege Neuwied & Koblenz | Hecken, Rasen, Unkraut | Huwa',
  description:
    'Professionelle Gartenpflege in Neuwied, Koblenz und Bendorf. Hecken schneiden, Rasen mähen, Unkraut entfernen, Lauben und mehr. Jetzt Angebot anfordern.',
  alternates: { canonical: `${siteConfig.url}/gartenpflege` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
